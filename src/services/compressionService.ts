import createCompress from 'compress-brotli';
import modConfigSchema from '@/schemas/modConfig';
import type { ModConfig } from '@/types/ModConfig';

const { compress, decompress } = createCompress();

const compressModConfig = (modConfig: ModConfig): Promise<string> =>
  compress(JSON.stringify(modConfig)).then((result) => result.toString('base64url'));

const decompressModConfig = (compressedText: string): Promise<ModConfig> =>
  decompress(Buffer.from(compressedText, 'base64url'))
    .then((decompressedText) => modConfigSchema.parse(JSON.parse(decompressedText)))
    .catch((error) => {
      throw `Error - Invalid configuration - ${error.message}`;
    });

export { compressModConfig, decompressModConfig };
