import type { NextApiRequest, NextApiResponse } from 'next';
import { compressModConfig } from '../../services/compressionService';
import { modConfigSchema } from '../../types/mods';

const getFeedId = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const modConfig = modConfigSchema.safeParse(req.body);

    if (!modConfig.success)
      return res.status(400).send({ message: 'Invalid Mod Config', error: modConfig.error });

    const feedId = await compressModConfig(modConfig.data);

    return res.status(200).send(feedId);
  } catch (error) {
    console.error(error);
    return res.status(500).send(error);
  }
};

export default getFeedId;
