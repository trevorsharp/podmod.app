"use client";

import formatDuration from "~/utils/formatDuration";

type EpisodeCardProps = {
  title: string;
  date?: string;
  duration?: number;
};

const EpisodeCard = ({ title, date, duration }: EpisodeCardProps) => {
  return (
    <div className="md:w-two-column flex flex-col gap-4 rounded-lg border border-neutral-300 p-4 2xl:max-w-full dark:border-neutral-600">
      <div className="flex justify-between text-sm font-semibold">
        <span>{date ? new Date(date).toLocaleDateString() : "—"}</span>
        <span>{duration ? formatDuration(duration) : ""}</span>
      </div>
      <span className="text-md font-semibold">{title}</span>
    </div>
  );
};

export default EpisodeCard;
