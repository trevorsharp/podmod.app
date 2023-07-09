import Image from 'next/image';
import EpisodeCard from './components/EpisodeCard';
import { getValue } from '~/utils/getValue';
import parseDuration from '~/utils/parseDuration';
import { applyMods } from '~/services/modService';
import type { FeedData } from '~/types/FeedData';
import type { ModConfig } from '~/types/ModConfig';

type FeedPreviewProps = {
  feedData: FeedData;
  modConfig: ModConfig;
};

const FeedPreview = ({ feedData: unmoddifiedFeedData, modConfig }: FeedPreviewProps) => {
  const feedData = applyMods(unmoddifiedFeedData, modConfig);

  const coverImageUrl = feedData.rss.channel['itunes:image']?._href;
  const feedTitle = getValue(feedData.rss.channel.title);
  const episodes = feedData.rss.channel.item.sort((a, b) =>
    a.pubDate && b.pubDate && new Date(a.pubDate).toISOString() > new Date(b.pubDate).toISOString()
      ? -1
      : 1
  );

  return (
    <div className="flex max-h-[90vh] max-w-md flex-col items-center gap-12 overflow-y-auto rounded-lg border border-neutral-300 px-6 py-10 dark:border-neutral-400 md:max-w-4xl xl:max-w-sm">
      <div className="flex flex-col items-center justify-center gap-8 md:flex-row md:gap-12 xl:flex-col xl:gap-8">
        {coverImageUrl && (
          <div className="relative aspect-square w-7/12 overflow-hidden rounded-lg md:w-1/4 xl:w-7/12 ">
            <Image src={coverImageUrl} alt="Podcast Feed Cover Image" fill />
          </div>
        )}
        <div className="flex max-w-fit flex-col items-center md:items-start xl:items-center">
          <h2 className="text-center text-xl font-semibold">{feedTitle}</h2>
          <p className="text-md">{episodes.length} Episodes</p>
        </div>
      </div>
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
    </div>
  );
};

export default FeedPreview;
