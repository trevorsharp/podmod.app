import { NextResponse } from "next/server";
import { decompressModConfig } from "~/services/compressionService";

type Context = { params: Promise<{ feedId: string }> };

const GET = async (request: Request, { params }: Context) => {
  try {
    const { feedId } = await params;

    const modConfig = decompressModConfig(feedId);
    if (!modConfig) {
      return new NextResponse("Bad Request - Invalid feed id", { status: 400 });
    }

    return new NextResponse(JSON.stringify(modConfig), {
      headers: { "Cache-Control": "max-age=86400", "Content-Type": "application/json" },
    });
  } catch (errorMessage) {
    console.error(errorMessage);
    return new NextResponse((errorMessage as string | undefined) ?? "Unexpected Error", {
      status: 500,
    });
  }
};

export { GET };
