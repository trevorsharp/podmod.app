import MainPage from "~/components/MainPage";

type PageProps = {
  params: {
    feedId: string;
  };
};

const Page = async ({ params }: PageProps) => {
  return <MainPage initialFeedId={params.feedId} />;
};

export default Page;
