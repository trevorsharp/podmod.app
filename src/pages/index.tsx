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
      <main className="flex justify-center p-8">
        <Form />
      </main>
    </>
  );
};

export default Home;
