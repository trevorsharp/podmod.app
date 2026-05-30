import { brotliCompressSync, brotliDecompressSync } from "node:zlib";
import modConfigSchema from "@shared/schemas/modConfig";
import type { ModConfig } from "@shared/types/ModConfig";

const maxCompressedConfigBytes = 256 * 1024;
const maxDecompressedConfigBytes = 1024 * 1024;

const compressModConfig = (modConfig: ModConfig): string => {
  const decompressedString = JSON.stringify(modConfig);
  const decompressedData = Buffer.from(decompressedString);

  const compressedData = brotliCompressSync(decompressedData);
  const compressedString = compressedData.toString("hex");

  return compressedString;
};

const decompressModConfig = (compressedText: string): ModConfig | undefined => {
  try {
    if (compressedText.length % 2 !== 0 || !/^[\da-f]+$/i.test(compressedText)) {
      return undefined;
    }

    const compressedData = Buffer.from(compressedText, "hex");
    if (compressedData.byteLength > maxCompressedConfigBytes) {
      console.warn(`Rejected compressed mod config larger than ${maxCompressedConfigBytes} bytes`);
      return undefined;
    }

    const decompressedData = brotliDecompressSync(compressedData, {
      maxOutputLength: maxDecompressedConfigBytes,
    });
    if (decompressedData.byteLength > maxDecompressedConfigBytes) {
      console.warn(
        `Rejected decompressed mod config larger than ${maxDecompressedConfigBytes} bytes`,
      );
      return undefined;
    }

    const decompressedText = decompressedData.toString();

    const modConfig = JSON.parse(decompressedText) as unknown;

    return modConfigSchema.parse(modConfig);
  } catch {
    return undefined;
  }
};

export { compressModConfig, decompressModConfig };
