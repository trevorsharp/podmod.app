import Head from 'next/head';
import type { NextPage } from 'next';
import FeedPreview from '~/components/FeedPreview';
import Form from '~/components/Form';
import { api } from '~/utils/api';
import { useState } from 'react';
import type { ModConfig } from '~/types/ModConfig';

const MainPage: NextPage = () => {
  const [modConfig, setModConfig] = useState<ModConfig | undefined>(undefined);

  const feedData = api.feed.getFeedForSources.useQuery(
    { sources: modConfig?.sources ?? [] },
    { enabled: !!modConfig, retry: 1, refetchOnWindowFocus: false }
  );

  return (
    <>
      <Head>
        <title>podmod.app</title>
        <meta name="description" content="Modify your favorite podcast feeds" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex justify-center p-8">
        <div className="flex flex-col items-center justify-center gap-16 xl:flex-row xl:items-start">
          <div className="flex max-w-4xl flex-col gap-12">
            <div className="flex max-w-4xl justify-between">
              <h1 className="text-2xl font-bold">podmod.app</h1>
              <button>Open In Podcasts</button>
            </div>
            <Form setModConfig={setModConfig} />
          </div>
          {modConfig && feedData.data && (
            <FeedPreview feedData={feedData.data} modConfig={modConfig} />
          )}
        </div>
      </main>
    </>
  );
};

export default MainPage;
