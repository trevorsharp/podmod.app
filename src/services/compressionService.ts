import { compress, decompress } from "brotli-compress";
import modConfigSchema from "~/schemas/modConfig";
import type { ModConfig } from "~/types/ModConfig";

const compressModConfig = async (modConfig: ModConfig): Promise<string> => {
  const compressedText = await compress(Buffer.from(JSON.stringify(modConfig)));
  return Buffer.from(compressedText).toString("hex");
};

const decompressModConfig = async (compressedText: string): Promise<ModConfig | undefined> =>
  decompress(Buffer.from(compressedText, "hex"))
    .then((decompressedText) => Buffer.from(decompressedText).toString())
    .then(JSON.parse)
    .then((data) => modConfigSchema.parse(data))
    .catch(() => undefined);

export { compressModConfig, decompressModConfig };
