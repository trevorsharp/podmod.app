import type { NextApiRequest, NextApiResponse } from 'next';
import { buildFeed, fetchFeed, mergeFeeds, parseFeed } from '@/services/feedService';
import { decompressModConfig } from '@/services/compressionService';
import { applyMods } from '@/services/modService';
import type { FeedData } from '@/types/FeedData';

const getFeed = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { host } = req.headers;
    const { feedId } = req.query;
    if (typeof feedId !== 'string') return res.status(400).send('Missing Feed Id');

    const modConfig = await decompressModConfig(feedId);

    const [firstFeed, ...otherFeeds] = await Promise.all(
      modConfig.sources.map((source) =>
        fetchFeed(source).then((rawFeedData) => parseFeed(rawFeedData))
      ) as unknown as [FeedData, ...FeedData[]]
    );

    const mergedFeed = mergeFeeds(firstFeed, otherFeeds);
    const moddedFeed = applyMods(mergedFeed, modConfig);
    const feed = buildFeed(moddedFeed, feedId, host);

    return res.status(200).send(feed);
  } catch (error) {
    console.error(error);
    return res.status(500).send(error);
  }
};

export default getFeed;
