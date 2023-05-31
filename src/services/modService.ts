import type { ModConfig } from '@/types/ModConfig';
import type { FeedData } from '@/types/FeedData';
import type { FeedItem } from '@/types/FeedItem';
import { getValue } from '@/utils/getValue';

const applyMods = (feed: FeedData, modConfig: ModConfig) => {
  const channel = feed.rss.channel;

  if (modConfig.title) {
    channel.title = { cdata: modConfig.title };
  }

  if (modConfig.imageUrl) {
    channel['itunes:image'] = { ...channel['itunes:image'], _href: modConfig.imageUrl };
  }

  modConfig.episodeMods.forEach((mod) => {
    if (mod.type === 'includes-text')
      channel.item = channel.item.filter((item) =>
        getValue(item.title).toLowerCase().includes(mod.option1.toLowerCase())
      );

    if (mod.type === 'excludes-text')
      channel.item = channel.item.filter(
        (item) => !getValue(item.title).toLowerCase().includes(mod.option1.toLowerCase())
      );

    if (mod.type === 'replace-text')
      channel.item = channel.item.map((item) =>
        updateTitle(
          item,
          getValue(item.title).replaceRegex(
            new RegExp(mod.option1.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&'), 'ig'),
            mod.option2
          )
        )
      );

    if (mod.type === 'remove-text')
      channel.item = channel.item.map((item) =>
        updateTitle(
          item,
          getValue(item.title).replaceRegex(
            new RegExp(mod.option1.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&'), 'ig'),
            ''
          )
        )
      );

    if (mod.type === 'prepend-text')
      channel.item = channel.item.map((item) =>
        updateTitle(
          item,
          getValue(item.title).replaceRegex(new RegExp('^', 'ig'), `${mod.option1} `)
        )
      );

    if (mod.type === 'append-text')
      channel.item = channel.item.map((item) =>
        updateTitle(
          item,
          getValue(item.title).replaceRegex(new RegExp('$', 'ig'), ` ${mod.option1}`)
        )
      );

    if (mod.type === 'matches-regex')
      channel.item = channel.item.filter(
        (item) => getValue(item.title).match(new RegExp(mod.option1, mod.option2)) !== null
      );

    if (mod.type === 'replace-regex')
      channel.item = channel.item.map((item) =>
        updateTitle(
          item,
          getValue(item.title).replaceRegex(new RegExp(mod.option1, mod.option2), mod.option3)
        )
      );

    if (mod.type === 'remove-regex')
      channel.item = channel.item.map((item) =>
        updateTitle(
          item,
          getValue(item.title).replaceRegex(new RegExp(mod.option1, mod.option2), '')
        )
      );

    if (mod.type === 'minimum-duration')
      channel.item = channel.item.filter(
        (item) =>
          (parseDuration(item['itunes:duration']) ?? 0) >= getSeconds(mod.option1, mod.option2)
      );

    if (mod.type === 'maximum-duration')
      channel.item = channel.item.filter(
        (item) =>
          (parseDuration(item['itunes:duration']) ?? Infinity) <=
          getSeconds(mod.option1, mod.option2)
      );
  });

  return feed;
};

const updateTitle = (item: FeedItem, title: string): FeedItem => ({
  ...item,
  title: { cdata: title.trim() },
  'itunes:title': { cdata: title.trim() },
});

const getSeconds = (duration: number, units: 'seconds' | 'minutes' | 'hours') => {
  switch (units) {
    case 'seconds':
      return duration;
    case 'minutes':
      return duration * 60;
    case 'hours':
      return duration * 3600;
  }
};

const parseDuration = (duration: number | string | undefined) => {
  if (duration === undefined) return duration;
  if (typeof duration === 'number') return duration;

  if (!duration.match(/^([0-9]{1,2}:){0,2}[0-9]{1,2}$/)) return 0;

  let durationParts = duration.split(':');

  if (durationParts.length === 1) durationParts = ['0', '0', ...durationParts];
  else if (durationParts.length === 2) durationParts = ['0', ...durationParts];

  return (
    Number.parseInt(durationParts[0] ?? '0') * 3600 +
    Number.parseInt(durationParts[1] ?? '0') * 60 +
    Number.parseInt(durationParts[2] ?? '0')
  );
};

export { applyMods };
