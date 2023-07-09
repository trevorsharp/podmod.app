import type z from 'zod';
import type stringOrCDATA from '~/schemas/stringOrCDATA';

type StringOrCDATA = z.infer<typeof stringOrCDATA>;

export type { StringOrCDATA };
