import { type NextPage } from 'next';
import Head from 'next/head';
import Form from '@/components/Form';

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>podmod.app</title>
        <meta name="description" content="Modify your favorite podcast feeds" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex min-h-screen w-full flex-col items-center justify-center">
        <Form />
      </main>
    </>
  );
};

export default Home;
