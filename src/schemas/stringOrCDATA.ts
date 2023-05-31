import { z } from 'zod';

const stringOrCDATA = z
  .string()
  .min(1)
  .or(
    z.object({
      cdata: z.string().min(1),
    })
  );

export default stringOrCDATA;
