import { useEffect, useState } from 'react';
import Head from 'next/head';
import type { NextPage } from 'next';
import FeedPreview from '@/components/FeedPreview';
import { fetchFeedData } from '@/services/feedService';
import { decompressModConfig } from '@/services/compressionService';
import { applyMods } from '@/services/modService';
import type { FeedData } from '@/types/FeedData';
import Form from '@/components/Form';

const Home: NextPage = () => {
  const feedId =
    '1be100608dd315f3a28475cf8079a57e4383dbf67202d320348b4e571f755b7da8793f879f27af45b014abda82b10aea0d9fd3bdb0491e499b003a205a01c0e905fff8c9b40f592334746582efcfcda729eeebf8b8daa99f8e199cf38a7f3469c73158164e6fc58dedec1f6545bb967b443f5a9ed9ac613b65c65a4665202002dd10a94c107f4074f5ce948ee7f4005605af9813f7998fcfe3239bbc760ac1d69555b8c90b7003';

  const [feedData, setFeedData] = useState<FeedData | undefined>(undefined);

  useEffect(() => {
    fetch(`/api/feed/${feedId}/feedData`)
      .then((response) => response.json())
      .then((feedData) => setFeedData(feedData));
  }, [feedId]);

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
            <Form />
          </div>
          {feedData && <FeedPreview feedData={feedData} />}
        </div>
      </main>
    </>
  );
};

export default Home;
