import type { NextApiRequest, NextApiResponse } from 'next';
import { fetchFeedData } from '@/services/feedService';
import { decompressModConfig } from '@/services/compressionService';
import { applyMods } from '@/services/modService';

const getFeedData = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { feedId } = req.query;
    if (typeof feedId !== 'string') return res.status(400).send('Missing Feed Id');

    const modConfig = await decompressModConfig(feedId);
    const feedData = await fetchFeedData(modConfig.sources);
    const moddedFeedData = applyMods(feedData, modConfig);

    return res.status(200).send(moddedFeedData);
  } catch (error) {
    console.error(error);
    return res.status(500).send(error);
  }
};

export default getFeedData;
