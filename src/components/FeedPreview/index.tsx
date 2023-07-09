import Image from 'next/image';
import EpisodeCard from './components/EpisodeCard';
import { getValue } from '~/utils/getValue';
import parseDuration from '~/utils/parseDuration';
import { applyMods } from '~/services/modService';
import type { FeedData } from '~/types/FeedData';
import type { ModConfig } from '~/types/ModConfig';

type FeedPreviewProps = {
  sourceFeedData: FeedData | undefined;
  modConfig: ModConfig | undefined;
};

const FeedPreview = ({ sourceFeedData, modConfig }: FeedPreviewProps) => {
  if (!sourceFeedData || !modConfig)
    return (
      <div className="2xl:max-h-screen-minus-padding 2xl:min-h-screen-minus-padding flex max-w-md flex-col items-center justify-center md:max-w-4xl 2xl:max-w-sm">
        <div className="flex flex-col items-center gap-12 overflow-y-auto rounded-lg border border-neutral-300 px-6 py-10 dark:border-neutral-400">
          <div className="flex flex-col items-center justify-center gap-8 md:flex-row md:gap-12 2xl:flex-col 2xl:gap-8">
            <div className="relative aspect-square w-7/12 overflow-hidden rounded-lg md:w-1/4 2xl:w-7/12 ">
              <Image src="/logo.png" alt="Podcast Feed Cover Image" fill />
            </div>
            <div className="flex max-w-fit flex-col items-center gap-4 text-center md:items-start md:text-left 2xl:items-center 2xl:text-center">
              <h2 className="max-h-36 max-w-[20rem] overflow-hidden text-ellipsis text-xl font-semibold ">
                Modify Your Podcast Feeds!
              </h2>
              <p className="text-md font-light">Enter a source podcast URL to get started...</p>
            </div>
          </div>
          {/* Episode Card Placeholder */}
        </div>
      </div>
    );

  const feedData = applyMods(sourceFeedData, modConfig);

  const coverImageUrl = feedData.rss.channel['itunes:image']?._href;
  const feedTitle = getValue(feedData.rss.channel.title);
  const episodes = feedData.rss.channel.item.sort((a, b) =>
    a.pubDate && b.pubDate && new Date(a.pubDate).toISOString() > new Date(b.pubDate).toISOString()
      ? -1
      : 1
  );

  return (
    <div className="2xl:max-h-screen-minus-padding 2xl:min-h-screen-minus-padding flex max-w-md flex-col items-center justify-center md:max-w-4xl 2xl:max-w-sm">
      <div className="flex flex-col items-center gap-12 overflow-y-auto rounded-lg border border-neutral-300 px-6 py-10 dark:border-neutral-400">
        <div className="flex flex-col items-center justify-center gap-8 md:flex-row md:gap-12 2xl:flex-col 2xl:gap-8">
          {coverImageUrl && (
            <div className="relative aspect-square w-7/12 overflow-hidden rounded-lg md:w-1/4 2xl:w-7/12 ">
              <Image src={coverImageUrl} alt="Podcast Feed Cover Image" fill />
            </div>
          )}
          <div className="flex max-w-fit flex-col items-center gap-4 text-center md:items-start md:text-left 2xl:items-center 2xl:text-center">
            <h2 className="max-h-36 max-w-[20rem] overflow-hidden text-ellipsis text-xl font-semibold ">
              {feedTitle}
            </h2>
            <p className="text-md font-light">
              {episodes.length === 1
                ? '1 Episode'
                : episodes.length === 0
                ? 'No Episodes'
                : `${episodes.length} Episodes`}
            </p>
          </div>
        </div>
        {episodes.length > 0 && (
          <div className="flex flex-wrap justify-between gap-8">
            {episodes.map((episode) => (
              <EpisodeCard
                key={getValue(episode.title)}
                title={getValue(episode.title)}
                date={episode.pubDate}
                duration={parseDuration(episode['itunes:duration'])}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default FeedPreview;
