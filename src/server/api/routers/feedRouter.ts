import { z } from 'zod';
import { createTRPCRouter, publicProcedure } from '~/server/api/trpc';
import url from '~/schemas/url';
import modConfigSchema from '~/schemas/modConfig';
import { fetchFeedData } from '~/services/feedService';
import { compressModConfig } from '~/services/compressionService';

const feedRouter = createTRPCRouter({
  getFeedForSources: publicProcedure
    .input(z.object({ sources: z.array(url) }))
    .query(({ input }) => fetchFeedData(input.sources)),
  getFeedId: publicProcedure
    .input(z.object({ modConfig: modConfigSchema.optional() }))
    .query(({ input }) => (input.modConfig ? compressModConfig(input.modConfig) : '')),
});

export default feedRouter;
