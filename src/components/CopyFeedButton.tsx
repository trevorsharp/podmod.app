"use client";

import { useState } from "react";
import { LinkIcon } from "@heroicons/react/20/solid";
import { compressModConfig } from "~/services/compressionService";
import type { ModConfig } from "~/types/ModConfig";

const defaultButtonText = "Copy Feed URL";

type ButtonProps = {
  modConfig: ModConfig;
};

const CopyFeedButton = ({ modConfig }: ButtonProps) => {
  const [buttonText, setButtonText] = useState<string>(defaultButtonText);

  const onClick = () =>
    compressModConfig(modConfig)
      .then((feedId) => `${window.location.origin}/${feedId}/feed`)
      .then((textToCopy) => navigator.clipboard.writeText(textToCopy))
      .then(() => {
        setButtonText("Copied!");
        setTimeout(() => setButtonText(defaultButtonText), 2000);
      });

  return (
    <button
      className="h-fit w-full rounded-md bg-podmod px-4 py-3 text-sm font-semibold text-white shadow-sm  hover:bg-podmod-dark focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-podmod sm:w-48"
      type="button"
      onClick={onClick}
    >
      <div className="flex items-center justify-center gap-3">
        <LinkIcon className="h-4 w-4" />
        <span className="whitespace-nowrap">{buttonText}</span>
      </div>
    </button>
  );
};

export default CopyFeedButton;
