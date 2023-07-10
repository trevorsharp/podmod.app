import { useEffect, useState } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { compressModConfig } from '~/services/compressionService';
import { api } from '~/utils/api';
import CopyFeedButton from './CopyFeedButton';
import FeedPreview from './FeedPreview';
import Form from './Form';
import type { NextPage } from 'next';
import type { ModConfig } from '~/types/ModConfig';

const MainPage: NextPage = () => {
  const router = useRouter();

  const [modConfig, setModConfig] = useState<ModConfig | undefined>(undefined);
  const [feedId, setFeedId] = useState<string>('');

  const { data: sourceFeedData } = api.feed.getFeedForSources.useQuery(
    { sources: modConfig?.sources ?? [] },
    { enabled: !!modConfig, retry: 1, refetchOnWindowFocus: false }
  );

  useEffect(() => {
    if (modConfig) compressModConfig(modConfig).then(setFeedId);
  }, [modConfig]);

  return (
    <>
      <Head>
        <title>podmod.app</title>
      </Head>

      <div className="flex min-h-screen items-start p-8 2xl:items-center">
        <div className="flex flex-col items-center justify-center gap-16 2xl:flex-row">
          <div className="flex max-w-5xl flex-col justify-center gap-12">
            <div className="flex max-w-5xl flex-wrap justify-between gap-6 sm:flex-nowrap">
              <div className="flex gap-2">
                <button
                  className="rounded focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-podmod"
                  type="button"
                  onClick={() => router.replace('/').then(() => router.reload())}
                >
                  <h1 className="text-3xl font-extrabold text-podmod xs:text-5xl">podmod.app</h1>{' '}
                </button>
                <h1 className="text:lg font-extrabold xs:text-xl">BETA</h1>
              </div>
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
