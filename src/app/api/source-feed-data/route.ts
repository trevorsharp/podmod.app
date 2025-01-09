import { NextResponse } from "next/server";
import { z } from "zod";
import { fetchFeedData } from "~/services/feedService";

const POST = async (request: Request) => {
  try {
    const body = (await request.json()) as unknown;

    const { data: urls, error } = z.array(z.string().url()).safeParse(body);
    if (error) {
      return new NextResponse("Bad Request - Invalid urls", { status: 400 });
    }

    const feedData = await fetchFeedData(urls);
    if (!feedData) {
      return new NextResponse("Bad Request - Invalid sources", { status: 400 });
    }

    return new NextResponse(JSON.stringify(feedData), {
      headers: { "Cache-Control": "max-age=900", "Content-Type": "application/json" },
    });
  } catch (errorMessage) {
    console.error(errorMessage);
    return new NextResponse((errorMessage as string | undefined) ?? "Unexpected Error", {
      status: 500,
    });
  }
};

export { POST };
