import Head from 'next/head';
import type { NextPage } from 'next';
import Link from 'next/link';
import FeedPreview from '~/components/FeedPreview';
import Form from '~/components/Form';
import { api } from '~/utils/api';
import { useState } from 'react';
import type { ModConfig } from '~/types/ModConfig';
import CopyButton from './CopyButton';

const MainPage: NextPage = () => {
  const [modConfig, setModConfig] = useState<ModConfig | undefined>(undefined);

  const { data: sourceFeedData } = api.feed.getFeedForSources.useQuery(
    { sources: modConfig?.sources ?? [] },
    { enabled: !!modConfig, retry: 1, refetchOnWindowFocus: false }
  );

  const feedId = api.feed.getFeedId.useQuery(
    { modConfig },
    { enabled: !!modConfig, retry: 1, refetchOnWindowFocus: false }
  );

  console.log(feedId.data);

  return (
    <>
      <Head>
        <title>podmod.app</title>
      </Head>

      <main className="flex min-h-screen justify-center p-8">
        <div className="flex flex-col items-center justify-center gap-16 2xl:flex-row 2xl:items-start">
          <div className="2xl:min-h-screen-minus-padding flex max-w-5xl flex-col justify-center gap-12">
            <div className="flex max-w-5xl flex-wrap justify-between gap-6 sm:flex-nowrap">
              <Link className="flex gap-2" href="/">
                <h1 className="text-5xl font-extrabold text-podmod">podmod.app</h1>
                <h1 className="text-xl font-extrabold">BETA</h1>
              </Link>
              <CopyButton
                defaultText="Copy Feed URL"
                textToCopy={`${window.location.origin}/${feedId.data ?? ''}/feed`}
                disabled={feedId.isLoading || !feedId.data}
              />
            </div>
            <Form setModConfig={setModConfig} />
          </div>
          <FeedPreview sourceFeedData={sourceFeedData} modConfig={modConfig} />
        </div>
      </main>
    </>
  );
};

export default MainPage;
