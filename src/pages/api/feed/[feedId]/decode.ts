import type { NextApiRequest, NextApiResponse } from 'next';
import { decompressModConfig } from '@/services/compressionService';

const getFeed = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { feedId } = req.query;
    if (typeof feedId !== 'string') return res.status(400).send('Missing Feed Id');

    const modConfig = await decompressModConfig(feedId);

    return res.status(200).send(JSON.stringify(modConfig, null, 2));
  } catch (error) {
    console.error(error);
    return res.status(500).send(error);
  }
};

export default getFeed;
