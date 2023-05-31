import { z } from 'zod';
import regex from './regex';
import regexOptions from './regexOptions';

const mod = z
  .object({
    type: z.literal('includes-text'),
    option1: z.string().min(1),
  })
  .or(
    z.object({
      type: z.literal('excludes-text'),
      option1: z.string().min(1),
    })
  )
  .or(
    z.object({
      type: z.literal('replace-text'),
      option1: z.string().min(1),
      option2: z.string().min(1),
    })
  )
  .or(
    z.object({
      type: z.literal('remove-text'),
      option1: z.string().min(1),
    })
  )
  .or(
    z.object({
      type: z.literal('prepend-text'),
      option1: z.string().min(1),
    })
  )
  .or(
    z.object({
      type: z.literal('append-text'),
      option1: z.string().min(1),
    })
  )
  .or(
    z.object({
      type: z.literal('matches-regex'),
      option1: regex,
      option2: regexOptions,
    })
  )
  .or(
    z.object({
      type: z.literal('replace-regex'),
      option1: regex,
      option2: regexOptions,
      option3: z.string().min(1),
    })
  )
  .or(
    z.object({
      type: z.literal('remove-regex'),
      option1: regex,
      option2: regexOptions,
    })
  )
  .or(
    z.object({
      type: z.literal('minimum-duration'),
      option1: z.number().int().min(0),
      option2: z.literal('seconds').or(z.literal('minutes')).or(z.literal('hours')),
    })
  )
  .or(
    z.object({
      type: z.literal('maximum-duration'),
      option1: z.number().int().min(0),
      option2: z.literal('seconds').or(z.literal('minutes')).or(z.literal('hours')),
    })
  );

export default mod;
