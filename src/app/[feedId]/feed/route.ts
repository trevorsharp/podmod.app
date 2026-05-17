import { NextResponse } from "next/server";
import { decompressModConfig } from "~/services/compressionService";
import { buildFeed, fetchFeedData } from "~/services/feedService";
import { applyMods } from "~/services/modService";

type Context = { params: Promise<{ feedId: string }> };

const GET = async (request: Request, { params }: Context) => {
  try {
    const { feedId } = await params;

    const host = request.headers.get("host") ?? "";

    const modConfig = decompressModConfig(feedId);
    if (!modConfig) {
      return new NextResponse("Bad Request - Invalid feed id", { status: 400 });
    }

    const feedData = await fetchFeedData(modConfig.sources);
    if (!feedData) throw new Error("Could not find feed data for sources");

    const moddedFeedData = applyMods(feedData, modConfig);
    const feed = buildFeed(moddedFeedData, feedId, host);

    return new NextResponse(feed, { headers: { "Cache-Control": "max-age=900" } });
  } catch (errorMessage) {
    console.error(errorMessage);
    return new NextResponse((errorMessage as string | undefined) ?? "Unexpected Error", {
      status: 500,
    });
  }
};

export { GET };
