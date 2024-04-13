import { compress, decompress } from "brotli-compress";
import modConfigSchema from "~/schemas/modConfig";
import type { ModConfig } from "~/types/ModConfig";

const compressModConfig = async (modConfig: ModConfig): Promise<string> => {
  const compressedText = await compress(Buffer.from(JSON.stringify(modConfig)));
  return Buffer.from(compressedText).toString("hex");
};

const decompressModConfig = async (compressedText: string): Promise<ModConfig> => {
  const decompressedText = await decompress(Buffer.from(compressedText, "hex"));
  const rawModConfig = JSON.parse(Buffer.from(decompressedText).toString()) as unknown;
  const modConfig = modConfigSchema.safeParse(rawModConfig);

  if (!modConfig.success) throw `Error - Invalid configuration - ${modConfig.error.message}`;

  return modConfig.data;
};

export { compressModConfig, decompressModConfig };
