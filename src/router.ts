import { Hono } from "hono";
import { serveStatic } from "hono/bun";
import { z } from "zod";
import env from "./env";
import { compressModConfig, decompressModConfig } from "./server/services/compressionService";
import { buildFeed, fetchFeedData } from "./server/services/feedService";
import { applyMods } from "./shared/modService";
import modConfigSchema from "./shared/schemas/modConfig";

const router = new Hono();

router.get("/", serveStatic({ path: `${env.UI_FOLDER_PATH}/index.html` }));
router.get("/*", serveStatic({ root: env.UI_FOLDER_PATH }));

router.post("/api/source-feed-data", async (context) => {
  try {
    const body = (await context.req.json()) as unknown;
    const { data: urls, error } = z.array(z.string().url()).safeParse(body);

    if (error) {
      return context.text("Bad Request - Invalid urls", 400);
    }

    const feedData = await fetchFeedData(urls);

    if (!feedData) {
      return context.text("Bad Request - Invalid sources", 400);
    }

    context.header("Cache-Control", "max-age=900");
    return context.json(feedData);
  } catch (error) {
    console.error(error);
    return context.text((error as string | undefined) ?? "Unexpected Error", 500);
  }
});

router.post("/api/mod-config/feed-id", async (context) => {
  try {
    const body = (await context.req.json()) as unknown;
    const { data: modConfig, error } = modConfigSchema.safeParse(body);

    if (error) {
      return context.text("Bad Request - Invalid mod config", 400);
    }

    const feedId = compressModConfig(modConfig);

    if (!feedId) {
      return context.text("Bad Request - Could not compress mod config", 400);
    }

    context.header("Cache-Control", "max-age=86400");
    return context.text(feedId);
  } catch (error) {
    console.error(error);
    return context.text((error as string | undefined) ?? "Unexpected Error", 500);
  }
});

router.get("/api/mod-config/:feedId", (context) => {
  try {
    const { feedId } = context.req.param();
    const modConfig = decompressModConfig(feedId);

    if (!modConfig) {
      return context.text("Bad Request - Invalid feed id", 400);
    }

    context.header("Cache-Control", "max-age=86400");
    return context.json(modConfig);
  } catch (error) {
    console.error(error);
    return context.text((error as string | undefined) ?? "Unexpected Error", 500);
  }
});

router.get("/:feedId/feed", async (context) => {
  try {
    const { feedId } = context.req.param();
    const { host } = new URL(context.req.url);

    const modConfig = decompressModConfig(feedId);

    if (!modConfig) {
      return context.text("Bad Request - Invalid feed id", 400);
    }

    const feedData = await fetchFeedData(modConfig.sources);

    if (!feedData) {
      throw new Error("Could not find feed data for sources");
    }

    const moddedFeedData = applyMods(feedData, modConfig);
    const feed = buildFeed(moddedFeedData, feedId, host);

    context.header("Cache-Control", "max-age=900");
    context.header("Content-Type", "application/rss+xml");
    return context.body(feed);
  } catch (error) {
    console.error(error);
    return context.text((error as string | undefined) ?? "Unexpected Error", 500);
  }
});

router.get("/*", serveStatic({ path: `${env.UI_FOLDER_PATH}/index.html` }));

export default router;
