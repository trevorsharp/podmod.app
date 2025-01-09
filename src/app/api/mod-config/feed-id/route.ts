import { NextResponse } from "next/server";
import modConfigSchema from "~/schemas/modConfig";
import { compressModConfig } from "~/services/compressionService";

const POST = async (request: Request) => {
  try {
    const body = (await request.json()) as unknown;

    const { data: modConfig, error } = modConfigSchema.safeParse(body);
    if (error) {
      return new NextResponse("Bad Request - Invalid mod config", { status: 400 });
    }

    const feedId = compressModConfig(modConfig);
    if (!feedId) {
      return new NextResponse("Bad Request - Could not compress mod config", { status: 400 });
    }

    return new NextResponse(feedId, { headers: { "Cache-Control": "max-age=86400" } });
  } catch (errorMessage) {
    console.error(errorMessage);
    return new NextResponse((errorMessage as string | undefined) ?? "Unexpected Error", {
      status: 500,
    });
  }
};

export { POST };
