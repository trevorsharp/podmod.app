import { z } from 'zod';
import mod from './mod';
import url from './url';

const modConfig = z.object({
  version: z.custom<`v${number}`>((val) => /^v\d+$/g.test(val as string)),
  sources: z.custom<[string, ...string[]]>((val) => z.array(url).min(1).safeParse(val).success),
  title: z.string().optional(),
  imageUrl: url.optional(),
  episodeMods: z.array(mod),
});

export default modConfig;
