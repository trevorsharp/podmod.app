import { z } from 'zod';
import stringOrCDATA from './stringOrCDATA';

const feed = z
  .object({
    '?xml': z.object({}).passthrough(),
    rss: z
      .object({
        channel: z
          .object({
            title: stringOrCDATA,
            link: z.string().optional(),
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
                  'itunes:title': stringOrCDATA.optional(),
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

export default feed;