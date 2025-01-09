"use server";

import "server-only";
import brotli from "brotli";
import modConfigSchema from "~/schemas/modConfig";
import type { ModConfig } from "~/types/ModConfig";

const { compress, decompress } = brotli as {
  compress: (buffer: Buffer, options?: never) => Uint8Array;
  decompress: (buffer: Buffer, outputSize?: number) => Uint8Array;
};

const compressModConfig = (modConfig: ModConfig): string => {
  const decompressedString = JSON.stringify(modConfig);
  const decompressedData = Buffer.from(decompressedString);

  const compressedData = compress(decompressedData);
  const compressedString = Buffer.from(compressedData.buffer).toString("hex");

  return compressedString;
};

const decompressModConfig = (compressedText: string): ModConfig | undefined => {
  try {
    const compressedData = Buffer.from(compressedText, "hex");

    const decompressedData = decompress(compressedData);
    const decompressedText = Buffer.from(decompressedData.buffer).toString();

    const modConfig = JSON.parse(decompressedText) as unknown;

    return modConfigSchema.parse(modConfig);
  } catch {
    return undefined;
  }
};

export { compressModConfig, decompressModConfig };
