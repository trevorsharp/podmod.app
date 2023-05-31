import type z from 'zod';
import type feed from '@/schemas/feed';

type FeedData = z.infer<typeof feed>;

export type { FeedData };
