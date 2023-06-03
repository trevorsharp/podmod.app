import brotliPromise from 'brotli-wasm';
import modConfigSchema from '@/schemas/modConfig';
import type { ModConfig } from '@/types/ModConfig';

const compressModConfig = async (modConfig: ModConfig): Promise<string> => {
  const brotli = await brotliPromise;
  const compressedText = brotli.compress(Buffer.from(JSON.stringify(modConfig)));
  return Buffer.from(compressedText).toString('hex');
};

const decompressModConfig = async (compressedText: string): Promise<ModConfig> => {
  const brotli = await brotliPromise;
  const decompressedText = brotli.decompress(Buffer.from(compressedText, 'hex'));
  const rawModConfig = JSON.parse(Buffer.from(decompressedText).toString());
  const modConfig = modConfigSchema.safeParse(rawModConfig);

  if (!modConfig.success) throw `Error - Invalid configuration - ${modConfig.error}`;

  return modConfig.data;
};

export { compressModConfig, decompressModConfig };
