import z from 'zod';
import regex from './regex';
import regexFlags from './regexFlags';

const mod = z
  .object({
    type: z.literal('includes-text'),
    text: z.string(),
  })
  .or(
    z.object({
      type: z.literal('excludes-text'),
      text: z.string().min(1, 'Must contain at least 1 character'),
    })
  )
  .or(
    z.object({
      type: z.literal('replace-text'),
      text: z.string().min(1, 'Must contain at least 1 character'),
      replace: z.string(),
    })
  )
  .or(
    z.object({
      type: z.literal('remove-text'),
      text: z.string().min(1, 'Must contain at least 1 character'),
    })
  )
  .or(
    z.object({
      type: z.literal('prepend-text'),
      text: z.string().min(1, 'Must contain at least 1 character'),
    })
  )
  .or(
    z.object({
      type: z.literal('append-text'),
      text: z.string().min(1, 'Must contain at least 1 character'),
    })
  )
  .or(
    z.object({
      type: z.literal('matches-regex'),
      regex: regex,
      regexFlags: regexFlags,
    })
  )
  .or(
    z.object({
      type: z.literal('replace-regex'),
      regex: regex,
      regexFlags: regexFlags,
      replace: z.string(),
    })
  )
  .or(
    z.object({
      type: z.literal('remove-regex'),
      regex: regex,
      regexFlags: regexFlags,
    })
  )
  .or(
    z.object({
      type: z.literal('minimum-duration'),
      duration: z.preprocess(
        (val) => (typeof val === 'string' ? val.trim() : val?.toString()),
        z
          .string()
          .regex(/^[0-9]+$/, 'Must be an integer')
          .transform((val) => parseInt(val.trim()))
      ),
      units: z.literal('seconds').or(z.literal('minutes')).or(z.literal('hours')),
    })
  )
  .or(
    z.object({
      type: z.literal('maximum-duration'),
      duration: z.preprocess(
        (val) => (typeof val === 'string' ? val.trim() : val?.toString()),
        z
          .string()
          .regex(/^[0-9]+$/, 'Must be an integer')
          .transform((val) => parseInt(val.trim()))
      ),
      units: z.literal('seconds').or(z.literal('minutes')).or(z.literal('hours')),
    })
  );

export default mod;
