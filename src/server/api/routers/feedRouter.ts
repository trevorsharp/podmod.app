import { z } from 'zod';
import { createTRPCRouter, publicProcedure } from '~/server/api/trpc';
import url from '~/schemas/url';
import { fetchFeedData } from '~/services/feedService';

const feedRouter = createTRPCRouter({
  getFeedForSources: publicProcedure
    .input(z.object({ sources: z.array(url) }))
    .query(({ input }) => {
      const sources = input.sources;
      return fetchFeedData(sources);
    }),
});

export default feedRouter;
