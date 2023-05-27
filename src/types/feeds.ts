import z from 'zod';

const stringOrCDATA = z
  .string()
  .min(1)
  .or(
    z.object({
      cdata: z.string().min(1),
    })
  );

const feedSchema = z
  .object({
    '?xml': z.object({}).passthrough(),
    rss: z
      .object({
        channel: z
          .object({
            title: stringOrCDATA,
            'atom:link': z
              .object({
                _href: z.string(),
              })
              .passthrough()
              .optional(),
            'itunes:image': z
              .object({
                _href: z.string(),
              })
              .passthrough()
              .optional(),
            item: z.array(
              z
                .object({
                  title: stringOrCDATA,
                  description: stringOrCDATA.optional(),
                  'itunes:title': stringOrCDATA.optional(),
                  'itunes:summary': stringOrCDATA.optional(),
                  'itunes:duration': z.string().or(z.number()).optional(),
                  enclosure: z
                    .object({
                      _url: z.string().optional(),
                    })
                    .passthrough()
                    .optional(),
                })
                .passthrough()
            ),
          })
          .passthrough(),
      })
      .passthrough(),
  })
  .passthrough();

type StringOrCDATA = z.infer<typeof stringOrCDATA>;
type FeedData = z.infer<typeof feedSchema>;

export { feedSchema };
export type { FeedData, StringOrCDATA };
