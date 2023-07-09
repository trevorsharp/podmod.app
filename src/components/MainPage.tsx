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
        <div className="flex flex-col items-center justify-center gap-16 2xl:flex-row 2xl:items-start">
          <div className="2xl:min-h-screen-minus-padding flex max-w-5xl flex-col justify-center gap-12">
            <div className="flex max-w-5xl justify-between">
              <h1 className="text-5xl font-extrabold text-podmod">podmod.app</h1>
            </div>
            <Form setModConfig={setModConfig} />
          </div>
          <FeedPreview feedData={feedData.data} modConfig={modConfig} />
        </div>
      </main>
    </>
  );
};

export default MainPage;
