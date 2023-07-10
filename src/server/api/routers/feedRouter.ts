import z from 'zod';
import url from '~/schemas/url';
import { createTRPCRouter, publicProcedure } from '~/server/api/trpc';
import { fetchFeedData } from '~/services/feedService';

const feedRouter = createTRPCRouter({
  getFeedForSources: publicProcedure
    .input(z.object({ sources: z.array(url) }))
    .query(({ input }) => fetchFeedData(input.sources)),
});

export default feedRouter;
