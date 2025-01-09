"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import feed from "~/schemas/feed";
import modConfigSchema from "~/schemas/modConfig";
import CopyFeedButton from "./CopyFeedButton";
import FeedPreview from "./FeedPreview";
import Form from "./Form";
import type { FeedData } from "~/types/FeedData";
import type { ModConfig } from "~/types/ModConfig";

type MainPageProps = {
  initialFeedId?: string | undefined;
};

const MainPage = ({ initialFeedId }: MainPageProps) => {
  const router = useRouter();

  const [loading, setLoading] = useState(!!initialFeedId);
  const [modConfig, setModConfig] = useState<ModConfig | undefined>(undefined);
  const [sourceFeedData, setSourceFeedData] = useState<FeedData | undefined>(undefined);

  useEffect(() => {
    if (initialFeedId) {
      setLoading(true);
      fetch(`/api/mod-config/${initialFeedId}`)
        .then((response) => response.json())
        .then((data) => modConfigSchema.parse(data))
        .then((initialModConfig) => setModConfig(initialModConfig))
        .catch(() => router.push("/"));
    }
  }, [initialFeedId]);

  useEffect(() => {
    if (modConfig) {
      fetch(`/api/source-feed-data`, {
        method: "POST",
        body: JSON.stringify(modConfig.sources),
        headers: { "Content-Type": "application/json" },
      })
        .then((response) => response.json())
        .then((data) => feed.parse(data))
        .then((feedData) => setSourceFeedData(feedData))
        .catch(console.error)
        .finally(() => setLoading(false));
    }
  }, [JSON.stringify(modConfig?.sources)]);

  if (loading) {
    return (
      <div className="flex min-h-screen w-full justify-center p-24 text-xl font-extrabold xs:text-2xl">
        Loading Feed Data...
      </div>
    );
  }

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

          <Form modConfig={modConfig} setModConfig={setModConfig} />
        </div>

        <FeedPreview modConfig={modConfig} sourceFeedData={sourceFeedData} />
      </div>
    </div>
  );
};

export default MainPage;
