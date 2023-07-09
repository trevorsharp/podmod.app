import type { z } from 'zod';
import type modConfig from '~/schemas/modConfig';

type ModConfig = z.infer<typeof modConfig>;

export type { ModConfig };
