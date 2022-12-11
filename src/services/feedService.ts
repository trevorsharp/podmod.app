import { XMLParser, XMLBuilder } from 'fast-xml-parser';
import type { X2jOptions, XmlBuilderOptions } from 'fast-xml-parser';
import z from 'zod';

const xmlOptions: Partial<X2jOptions> & Partial<XmlBuilderOptions> = {
  ignoreAttributes: false,
  attributeNamePrefix: '_',
  allowBooleanAttributes: true,
  cdataPropName: 'cdata',
  suppressBooleanAttributes: false,
};

const parser = new XMLParser(xmlOptions);
const builder = new XMLBuilder(xmlOptions);

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
            item: z.array(
              z
                .object({
                  title: stringOrCDATA,
                  'itunes:duration': z.string().or(z.number()).optional(),
                })
                .passthrough()
            ),
          })
          .passthrough(),
      })
      .passthrough(),
  })
  .passthrough();

type FeedData = z.infer<typeof feedSchema>;

const fetchFeed = (url: string) =>
  fetch(url)
    .then((x) => x.text())
    .catch(() => {
      throw 'Could not pull feed data';
    });

const parseFeed = (rawFeedData: string) => {
  const parsedFeedData = parser.parse(rawFeedData);
  const feedData = feedSchema.safeParse(parsedFeedData);

  console.log(parsedFeedData.rss);

  if (!feedData.success) throw `Invalid feed - ${feedData.error}`;

  return feedData.data;
};

const buildFeed = (feedData: FeedData) => builder.build(feedData);

const mergeFeeds = (mainFeed: FeedData, additionalFeeds: FeedData[]) => {
  const newFeed = JSON.parse(JSON.stringify(mainFeed)) as FeedData;

  additionalFeeds.forEach((feed) => {
    newFeed.rss = { ...feed.rss, ...newFeed.rss };
    newFeed.rss.channel.item.push(...feed.rss.channel.item);
  });

  return newFeed;
};

export { fetchFeed, parseFeed, buildFeed, mergeFeeds };
export type { FeedData };
