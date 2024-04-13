import z from "zod";
import mod from "./mod";
import url from "./url";

const modConfig = z.object({
  version: z.custom<`v${number}`>((val) => /^v\d+$/g.test(val as string)),
  sources: z.array(url).min(1),
  title: z
    .string()
    .min(1)
    .or(z.literal(""))
    .optional()
    .transform((val) => (val === "" ? undefined : val)),
  imageUrl: url
    .or(z.literal(""))
    .optional()
    .transform((val) => (val === "" ? undefined : val)),
  mods: z.array(mod).optional(),
});

export default modConfig;
