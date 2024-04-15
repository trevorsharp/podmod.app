import { NextResponse } from "next/server";
import { decompressModConfig } from "~/services/compressionService";
import { buildFeed, fetchFeedData } from "~/services/feedService";
import { applyMods } from "~/services/modService";

export const revalidate = 15 * 60;

const GET = async (request: Request, { params }: { params: { feedId: string } }) => {
  try {
    const { feedId } = params;

    const host = request.headers.get("host") ?? "";
    const searchParams =
      host && request.url ? new URL(`http://${host}${request.url}`).searchParams : undefined;

    const modConfig = await decompressModConfig(feedId);
    const feedData = await fetchFeedData(modConfig.sources, searchParams);
    if (!feedData) throw "Could not find feed data for sources";

    const moddedFeedData = applyMods(feedData, modConfig);
    const feed = buildFeed(moddedFeedData, feedId, host);

    return feed;
  } catch (errorMessage) {
    console.error(errorMessage);
    return new NextResponse((errorMessage as string | undefined) ?? "Unexpected Error", {
      status: 500,
    });
  }
};

export { GET };
