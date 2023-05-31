import type { z } from 'zod';
import type mod from '@/schemas/mod';

type ModType = z.infer<typeof mod>['type'];

export type { ModType };
