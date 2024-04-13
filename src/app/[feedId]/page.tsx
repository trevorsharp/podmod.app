import MainPage from "~/components/MainPage";
import { decompressModConfig } from "~/services/compressionService";

type PageProps = {
  params: {
    feedId: string;
  };
};

const Page = async ({ params }: PageProps) => {
  const modConfig = await decompressModConfig(params.feedId);
  return <MainPage initialModConfig={modConfig} />;
};

export default Page;
