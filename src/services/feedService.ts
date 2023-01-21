import { XMLParser, XMLBuilder } from 'fast-xml-parser';
import type { X2jOptions, XmlBuilderOptions } from 'fast-xml-parser';
import { feedSchema } from '../types/feeds';
import type { FeedData } from '../types/feeds';

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

const buildFeed = (feed: FeedData) => builder.build(feed) as string;

const mergeFeeds = (mainFeed: FeedData, additionalFeeds: FeedData[]): FeedData => {
  if (additionalFeeds.length === 0) return mainFeed;

  const newFeed = feedSchema.parse(JSON.parse(JSON.stringify(mainFeed)));

  additionalFeeds.forEach((feed) => {
    newFeed.rss = { ...feed.rss, ...newFeed.rss };
    newFeed.rss.channel.item.push(...feed.rss.channel.item);
  });

  return newFeed;
};

export { fetchFeed, parseFeed, buildFeed, mergeFeeds };
