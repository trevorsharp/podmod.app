import createCompress from 'compress-brotli';
import { modConfigSchema } from '../types/mods';
import type { ModConfig } from '../types/mods';

const { compress, decompress } = createCompress();

const compressModConfig = (modConfig: ModConfig) =>
  compress(JSON.stringify(modConfig)).then((result) => result.toString('base64url'));

const decompressModConfig = (compressedText: string): Promise<ModConfig> =>
  decompress(Buffer.from(compressedText, 'base64url'))
    .then((decompressedText) => modConfigSchema.parse(JSON.parse(decompressedText)))
    .catch(() => {
      throw 'Error - Invalid configuration';
    });

export { compressModConfig, decompressModConfig };
