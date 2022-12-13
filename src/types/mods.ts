import z from 'zod';

const regexRegex = /^.*$/;

const regexOptionsRegex = /^(d|g|i|m|s|u|y)*$/;

const modConfigSchema = z.object({
  version: z.custom<`v${number}`>((val) => /^v\d+$/g.test(val as string)),
  sources: z.array(z.string()).min(1),
  title: z.string().optional(),
  imageUrl: z.string().url().optional(),
  episodeMods: z.array(
    z
      .object({
        type: z.literal('includes-text'),
        text: z.string().min(1),
      })
      .or(
        z.object({
          type: z.literal('excludes-text'),
          text: z.string().min(1),
        })
      )
      .or(
        z.object({
          type: z.literal('replace-text'),
          text: z.string().min(1),
          replace: z.string().min(1),
        })
      )
      .or(
        z.object({
          type: z.literal('remove-text'),
          text: z.string().min(1),
        })
      )
      .or(
        z.object({
          type: z.literal('prepend-text'),
          text: z.string().min(1),
        })
      )
      .or(
        z.object({
          type: z.literal('append-text'),
          text: z.string().min(1),
        })
      )
      .or(
        z.object({
          type: z.literal('matches-regex'),
          regex: z.string().regex(regexRegex),
          regexOptions: z.string().regex(regexOptionsRegex),
        })
      )
      .or(
        z.object({
          type: z.literal('replace-regex'),
          regex: z.string().regex(regexRegex),
          regexOptions: z.string().regex(regexOptionsRegex),
          replace: z.string().min(1),
        })
      )
      .or(
        z.object({
          type: z.literal('remove-regex'),
          regex: z.string().regex(regexRegex),
          regexOptions: z.string().regex(regexOptionsRegex),
        })
      )
      .or(
        z.object({
          type: z.literal('minimum-duration'),
          duration: z.number().int().min(0),
          units: z.literal('seconds').or(z.literal('minutes')).or(z.literal('hours')),
        })
      )
      .or(
        z.object({
          type: z.literal('maximum-duration'),
          duration: z.number().int().min(0),
          units: z.literal('seconds').or(z.literal('minutes')).or(z.literal('hours')),
        })
      )
  ),
});

type ModConfig = z.infer<typeof modConfigSchema>;

export { modConfigSchema };
export type { ModConfig };
