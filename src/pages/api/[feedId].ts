import type { NextApiRequest, NextApiResponse } from 'next';
import { buildFeed, fetchFeedData } from '~/services/feedService';
import { decompressModConfig } from '~/services/compressionService';
import { applyMods } from '~/services/modService';

const getFeed = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { host } = req.headers;
    const { feedId } = req.query;
    if (typeof feedId !== 'string') return res.status(400).send('Missing Feed Id');

    const modConfig = await decompressModConfig(feedId);
    const feedData = await fetchFeedData(modConfig.sources);
    const moddedFeedData = applyMods(feedData, modConfig);
    const feed = buildFeed(moddedFeedData, feedId, host);

    return res.status(200).send(feed);
  } catch (error) {
    console.error(error);
    return res.status(500).send(error);
  }
};

export default getFeed;
