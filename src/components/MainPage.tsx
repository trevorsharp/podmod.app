import { useEffect, useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { compressModConfig } from '~/services/compressionService';
import { api } from '~/utils/api';
import CopyFeedButton from './CopyFeedButton';
import FeedPreview from './FeedPreview';
import Form from './Form';
import type { NextPage } from 'next';
import type { ModConfig } from '~/types/ModConfig';

const MainPage: NextPage = () => {
  const [modConfig, setModConfig] = useState<ModConfig | undefined>(undefined);
  const [feedId, setFeedId] = useState<string>('');

  const { data: sourceFeedData } = api.feed.getFeedForSources.useQuery(
    { sources: modConfig?.sources ?? [] },
    { enabled: !!modConfig, retry: 1, refetchOnWindowFocus: false }
  );

  useEffect(() => {
    if (modConfig) void compressModConfig(modConfig).then((newFeedId) => setFeedId(newFeedId));
  }, [modConfig]);

  return (
    <>
      <Head>
        <title>podmod.app</title>
      </Head>

      <div className="flex min-h-screen justify-center p-8">
        <div className="flex flex-col items-center justify-center gap-16 2xl:flex-row 2xl:items-start">
          <div className="2xl:min-h-screen-minus-padding flex max-w-5xl flex-col justify-center gap-12">
            <div className="flex max-w-5xl flex-wrap justify-between gap-6 sm:flex-nowrap">
              <Link className="flex gap-2" href="/">
                <h1 className="text-5xl font-extrabold text-podmod">podmod.app</h1>
                <h1 className="text-xl font-extrabold">BETA</h1>
              </Link>
              <CopyFeedButton
                textToCopy={`${window.location.origin}/${feedId}/feed`}
                disabled={!feedId}
              />
            </div>
            <Form setModConfig={setModConfig} />
          </div>
          <FeedPreview sourceFeedData={sourceFeedData} modConfig={modConfig} />
        </div>
      </div>
    </>
  );
};

export default MainPage;
