import { NextResponse } from "next/server";
import { decompressModConfig } from "~/services/compressionService";

const GET = async (request: Request, { params }: { params: { feedId: string } }) => {
  try {
    const { feedId } = params;

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
