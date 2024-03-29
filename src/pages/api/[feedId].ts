import { decompressModConfig } from '~/services/compressionService';
import { buildFeed, fetchFeedData } from '~/services/feedService';
import { applyMods } from '~/services/modService';
import type { NextApiRequest, NextApiResponse } from 'next';

const getFeed = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { feedId } = req.query;
    if (typeof feedId !== 'string') return res.status(400).send('Missing Feed Id');

    const { host } = req.headers;
    const searchParams =
      host && req.url ? new URL(`http://${host}${req.url}`).searchParams : undefined;

    const modConfig = await decompressModConfig(feedId);
    const feedData = await fetchFeedData(modConfig.sources, searchParams);
    const moddedFeedData = applyMods(feedData, modConfig);
    const feed = buildFeed(moddedFeedData, feedId, host);

    return res.status(200).send(feed);
  } catch (error) {
    console.error(error);
    return res.status(500).send(error);
  }
};

export default getFeed;
