"use client";

import { useEffect, useState } from "react";
import { LinkIcon } from "@heroicons/react/20/solid";
import type { ModConfig } from "~/types/ModConfig";

type ButtonProps = {
  modConfig: ModConfig;
};

const CopyFeedButton = ({ modConfig }: ButtonProps) => {
  const [feedId, setFeedId] = useState<string | undefined>(undefined);
  const [buttonText, setButtonText] = useState("Generate Feed");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setFeedId(undefined);
    setButtonText("Generate Feed");
  }, [JSON.stringify(modConfig)]);

  const generateFeed = async () => {
    setLoading(true);

    return await fetch(`/api/mod-config/feed-id`, {
      method: "POST",
      body: JSON.stringify(modConfig),
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => response.text())
      .then((newFeedId) => {
        setFeedId(newFeedId);
        setButtonText("Copy Feed URL");
      })
      .catch(() => {
        setButtonText("Failed to Generate");
        setTimeout(() => setButtonText("Generate Feed"), 2000);
      })
      .finally(() => setLoading(false));
  };

  const copyFeedUrl = async () => {
    await navigator.clipboard
      .writeText(`${window.location.origin}/${feedId}/feed`)
      .then(() => {
        setButtonText("Copied");
        setTimeout(() => setButtonText("Copy Feed URL"), 2000);
      })
      .catch(() => setButtonText("Failed to Copy"));
  };

  return (
    <button
      className="h-fit w-full rounded-md bg-podmod px-4 py-3 text-sm font-semibold text-white shadow-sm  hover:bg-podmod-dark focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-podmod sm:w-48"
      type="button"
      onClick={feedId ? copyFeedUrl : generateFeed}
      disabled={loading}
    >
      <div className="flex items-center justify-center gap-3">
        <LinkIcon className="h-4 w-4" />
        <span className="whitespace-nowrap">{loading ? "Loading..." : buttonText}</span>
      </div>
    </button>
  );
};

export default CopyFeedButton;
