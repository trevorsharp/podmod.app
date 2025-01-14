"use server";

import "server-only";
import { XMLBuilder, XMLParser } from "fast-xml-parser";
import feedSchema from "~/schemas/feed";
import type { X2jOptions, XmlBuilderOptions } from "fast-xml-parser";
import type { FeedData } from "~/types/FeedData";

const xmlOptions: Partial<X2jOptions> & Partial<XmlBuilderOptions> = {
  ignoreAttributes: false,
  attributeNamePrefix: "_",
  allowBooleanAttributes: true,
  cdataPropName: "cdata",
  suppressBooleanAttributes: false,
};

const parser = new XMLParser(xmlOptions);
const builder = new XMLBuilder(xmlOptions);

const buildFeed = (feed: FeedData, feedId: string, host?: string) => {
  if (host) {
    if (feed.rss.channel["atom:link"]?._href)
      feed.rss.channel["atom:link"]._href = `http://${host}/${feedId}/feed`;

    feed.rss.channel.link = `http://${host}/${feedId}`;
  }

  return builder.build(feed) as string;
};

const fetchFeedData = async (urls: string[]) => {
  const [firstFeed, ...otherFeeds] = await Promise.all(
    urls.map((urlString) => {
      const url = new URL(urlString);

      return fetch(url, {
        headers: {
          "Access-Control-Allow-Headers": "Content-Type",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "OPTIONS,POST,GET",
        },
        cache: "no-store",
      })
        .then((response) => response.text())
        .then((data) => parseFeed(data))
        .catch((error) => {
          console.error(error);
          return undefined;
        });
    }),
  );

  if (!firstFeed) return undefined;

  return mergeFeeds(
    firstFeed,
    otherFeeds?.filter((feed) => feed).map((feed) => feed!),
  );
};

const parseFeed = (rawFeed: string): FeedData | undefined => {
  const parsedFeed = parser.parse(rawFeed) as unknown;
  const { data: feedData, success } = feedSchema.safeParse(parsedFeed);
  return success ? feedData : undefined;
};

const mergeFeeds = (mainFeed: FeedData, additionalFeeds: FeedData[]) => {
  if (additionalFeeds.length === 0) return mainFeed;

  const newFeed: FeedData = feedSchema.parse(JSON.parse(JSON.stringify(mainFeed)));

  additionalFeeds.forEach((feed) => {
    newFeed.rss = { ...feed.rss, ...newFeed.rss };
    const newItems = feed.rss.channel.item.filter(
      (newItem) =>
        newFeed.rss.channel.item.findIndex(
          (existingItem) =>
            newItem.enclosure?._url !== undefined &&
            newItem.enclosure._url === existingItem.enclosure?._url,
        ) === -1,
    );
    newFeed.rss.channel.item.push(...newItems);
  });

  return newFeed;
};

export { buildFeed, fetchFeedData };
