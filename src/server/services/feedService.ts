import { XMLBuilder, XMLParser } from "fast-xml-parser";
import feedSchema from "@shared/schemas/feed";
import type { X2jOptions, XmlBuilderOptions } from "fast-xml-parser";
import type { FeedData } from "@shared/types/FeedData";

const xmlOptions: Partial<X2jOptions> & Partial<XmlBuilderOptions> = {
  ignoreAttributes: false,
  attributeNamePrefix: "_",
  allowBooleanAttributes: true,
  cdataPropName: "cdata",
  suppressBooleanAttributes: false,
};

const parser = new XMLParser(xmlOptions);
const builder = new XMLBuilder(xmlOptions);
const feedFetchTimeoutMs = 15_000;
const maxFeedSizeBytes = 25 * 1024 * 1024;

const buildFeed = (feed: FeedData, feedId: string, host?: string) => {
  if (host) {
    if (feed.rss.channel["atom:link"]?._href)
      feed.rss.channel["atom:link"]._href = `http://${host}/${feedId}/feed`;

    feed.rss.channel.link = `http://${host}/${feedId}`;
  }

  return builder.build(feed);
};

const fetchFeedData = async (urls: string[]) => {
  const [firstFeed, ...otherFeeds] = await Promise.all(
    urls.map(async (urlString) => {
      const abortController = new AbortController();
      const timeout = setTimeout(() => abortController.abort(), feedFetchTimeoutMs);

      try {
        const url = new URL(urlString);
        const response = await fetch(url, {
          headers: {
            "Access-Control-Allow-Headers": "Content-Type",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "OPTIONS,POST,GET",
          },
          cache: "no-store",
          signal: abortController.signal,
        });

        if (!response.ok) {
          console.error(
            `Could not fetch feed ${urlString}: ${response.status} ${response.statusText}`,
          );
          return undefined;
        }

        return parseFeed(await readFeedResponse(response, urlString));
      } catch (error) {
        console.error(`Could not fetch feed ${urlString}`, error);
        return undefined;
      } finally {
        clearTimeout(timeout);
      }
    }),
  );

  if (!firstFeed) return undefined;

  return mergeFeeds(
    firstFeed,
    otherFeeds?.filter((feed) => feed).map((feed) => feed!),
  );
};

const readFeedResponse = async (response: Response, urlString: string) => {
  const contentLength = response.headers.get("content-length");
  if (contentLength && Number(contentLength) > maxFeedSizeBytes) {
    throw new Error(`Feed ${urlString} is larger than ${maxFeedSizeBytes} bytes`);
  }

  if (!response.body) return response.text();

  const reader = response.body.getReader();
  const chunks: Uint8Array[] = [];
  let totalBytes = 0;

  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      totalBytes += value.byteLength;
      if (totalBytes > maxFeedSizeBytes) {
        throw new Error(`Feed ${urlString} exceeded ${maxFeedSizeBytes} bytes`);
      }

      chunks.push(value);
    }
  } finally {
    reader.releaseLock();
  }

  const feedBytes = new Uint8Array(totalBytes);
  let offset = 0;
  chunks.forEach((chunk) => {
    feedBytes.set(chunk, offset);
    offset += chunk.byteLength;
  });

  return new TextDecoder().decode(feedBytes);
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
