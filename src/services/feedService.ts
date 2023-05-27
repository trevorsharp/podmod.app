import { XMLParser, XMLBuilder } from 'fast-xml-parser';
import type { X2jOptions, XmlBuilderOptions } from 'fast-xml-parser';
import { feedSchema } from '../types/feeds';
import type { FeedData } from '../types/feeds';
import { getValue } from '../utils/getValue';

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

    const openInPodModLink = `<a href="http://${host}/api/feed/${feedId}/decode">Open in podmod</a>`;

    feed.rss.channel.item = feed.rss.channel.item.map((item) => {
      if (getValue(item.description))
        item.description = { cdata: `${getValue(item.description)}\n \n${openInPodModLink}` };

      if (getValue(item['itunes:summary']))
        item['itunes:summary'] = {
          cdata: `${getValue(item['itunes:summary'])}\n \n${openInPodModLink}`,
        };

      return item;
    });
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
