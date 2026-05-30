import type z from "zod";
import type modConfig from "@shared/schemas/modConfig";

type ModConfig = z.infer<typeof modConfig>;

export type { ModConfig };
