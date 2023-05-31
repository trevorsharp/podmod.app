import { XMLParser, XMLBuilder } from 'fast-xml-parser';
import type { X2jOptions, XmlBuilderOptions } from 'fast-xml-parser';
import feedSchema from '@/schemas/feed';
import type { FeedData } from '@/types/FeedData';

const xmlOptions: Partial<X2jOptions> & Partial<XmlBuilderOptions> = {
  ignoreAttributes: false,
  attributeNamePrefix: '_',
  allowBooleanAttributes: true,
  cdataPropName: 'cdata',
  suppressBooleanAttributes: false,
};

const parser = new XMLParser(xmlOptions);
const builder = new XMLBuilder(xmlOptions);

const fetchFeed = (url: string) =>
  fetch(url)
    .then((x) => x.text())
    .catch(() => {
      throw 'Error pulling source feed data';
    });

const parseFeed = (rawFeed: string): FeedData => {
  const parsedFeed = parser.parse(rawFeed);
  return feedSchema.parse(parsedFeed);
};

const buildFeed = (feed: FeedData, feedId: string, host?: string) => {
  if (host) {
    if (feed.rss.channel['atom:link']?._href)
      feed.rss.channel['atom:link']._href = `http://${host}/api/feed/${feedId}`;

    feed.rss.channel.link = `http://${host}/api/feed/${feedId}/decode`;
  }

  return builder.build(feed) as string;
};

const mergeFeeds = (mainFeed: FeedData, additionalFeeds: FeedData[]): FeedData => {
  if (additionalFeeds.length === 0) return mainFeed;

  const newFeed = feedSchema.parse(JSON.parse(JSON.stringify(mainFeed)));

  additionalFeeds.forEach((feed) => {
    newFeed.rss = { ...feed.rss, ...newFeed.rss };
    const newItems = feed.rss.channel.item.filter(
      (newItem) =>
        newFeed.rss.channel.item.findIndex(
          (existingItem) =>
            newItem.enclosure?._url !== undefined &&
            newItem.enclosure._url === existingItem.enclosure?._url
        ) === -1
    );
    newFeed.rss.channel.item.push(...newItems);
  });

  return newFeed;
};

export { fetchFeed, parseFeed, buildFeed, mergeFeeds };
