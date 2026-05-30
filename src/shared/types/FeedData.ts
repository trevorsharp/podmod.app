import type z from "zod";
import type feed from "@shared/schemas/feed";

type FeedData = z.infer<typeof feed>;

export type { FeedData };
