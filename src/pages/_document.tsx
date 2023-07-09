import { Html, Head, Main, NextScript } from 'next/document';

const Document = () => (
  <Html lang="en" className="tiny:text-tiny mobile:text-mobile normal:text-normal text-base">
    <Head>
      <meta
        name="description"
        content="Modify any podcast feed with custom filters, artwork, titles, and more!"
      />
      <meta name="theme-color" content="#348CC4" />
      <link rel="shortcut icon" href="/favicon.ico" />
      <link rel="apple-touch-icon" sizes="112x112" href="/apple-touch-icon.png" />
    </Head>
    <body className="bg-podmod-dark">
      <main className="bg-white text-neutral-800 dark:bg-neutral-900 dark:text-white">
        <Main />
        <NextScript />
      </main>
    </body>
  </Html>
);

export default Document;
