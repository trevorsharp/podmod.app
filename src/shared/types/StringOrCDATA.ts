import type z from "zod";
import type stringOrCDATA from "@shared/schemas/stringOrCDATA";

type StringOrCDATA = z.infer<typeof stringOrCDATA>;

export type { StringOrCDATA };
