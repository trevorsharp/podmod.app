import z from "zod";
import stringOrCDATA from "./stringOrCDATA";

const item = z
  .object({
    title: stringOrCDATA,
    pubDate: z.string().optional(),
    "itunes:title": stringOrCDATA.optional(),
    "itunes:duration": z.string().or(z.number()).optional(),
    enclosure: z
      .object({
        _url: z.string().optional(),
      })
      .passthrough()
      .optional(),
    "podmod-key": z
      .string()
      .optional()
      .transform(() => crypto.randomUUID()),
  })
  .passthrough();

const feed = z
  .object({
    "?xml": z.object({}).passthrough().optional(),
    rss: z
      .object({
        channel: z
          .object({
            title: stringOrCDATA,
            link: z.string().optional(),
            "atom:link": z
              .object({
                _href: z.string(),
              })
              .passthrough()
              .optional(),
            "itunes:image": z
              .object({
                _href: z.string(),
              })
              .passthrough()
              .optional(),
            item: z.array(item).or(item.transform((singleItem) => [singleItem])),
          })
          .passthrough(),
      })
      .passthrough(),
  })
  .passthrough();

export default feed;
