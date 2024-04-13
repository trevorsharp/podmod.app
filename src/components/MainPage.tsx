"use client";

import { useEffect, useState } from "react";
import { fetchFeedData } from "~/services/feedService";
import CopyFeedButton from "./CopyFeedButton";
import FeedPreview from "./FeedPreview";
import Form from "./Form";
import type { FeedData } from "~/types/FeedData";
import type { ModConfig } from "~/types/ModConfig";

type MainPageProps = {
  initialModConfig?: ModConfig | undefined;
};

const MainPage = ({ initialModConfig }: MainPageProps) => {
  const [modConfig, setModConfig] = useState<ModConfig | undefined>(initialModConfig);
  const [sourceFeedData, setSourceFeedData] = useState<FeedData | undefined>(undefined);

  useEffect(() => {
    if (modConfig) {
      const _ = fetchFeedData(modConfig?.sources).then((feedData) => setSourceFeedData(feedData));
    }
  }, [JSON.stringify(modConfig?.sources)]);

  return (
    <div className="flex min-h-screen items-start p-8 2xl:items-center">
      <div className="flex flex-col items-center justify-center gap-16 2xl:flex-row">
        <div className="flex max-w-5xl flex-col justify-center gap-12">
          <div className="flex max-w-5xl flex-wrap justify-between gap-6 sm:flex-nowrap">
            <div className="flex gap-2">
              <a
                className="rounded focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-podmod"
                href="/"
              >
                <h1 className="text-3xl font-extrabold text-podmod xs:text-5xl">podmod.app</h1>{" "}
              </a>
              <h1 className="text:lg font-extrabold xs:text-xl">BETA</h1>
            </div>

            {modConfig && sourceFeedData && <CopyFeedButton modConfig={modConfig} />}
          </div>

          <Form initialModConfig={initialModConfig} setModConfig={setModConfig} />
        </div>

        <FeedPreview modConfig={modConfig} sourceFeedData={sourceFeedData} />
      </div>
    </div>
  );
};

export default MainPage;
