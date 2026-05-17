import MainPage from "~/components/MainPage";

type PageProps = {
  params: Promise<{
    feedId: string;
  }>;
};

const Page = async ({ params }: PageProps) => {
  const { feedId } = await params;

  return <MainPage initialFeedId={feedId} />;
};

export default Page;
