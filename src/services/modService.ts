import type { ModConfig } from '~/types/ModConfig';
import type { FeedData } from '~/types/FeedData';
import type { FeedItem } from '~/types/FeedItem';
import { getValue } from '~/utils/getValue';
import parseDuration from '~/utils/parseDuration';

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
        getValue(item.title).toLowerCase().includes(mod.text.toLowerCase())
      );

    if (mod.type === 'excludes-text')
      channel.item = channel.item.filter(
        (item) => !getValue(item.title).toLowerCase().includes(mod.text.toLowerCase())
      );

    if (mod.type === 'replace-text')
      channel.item = channel.item.map((item) =>
        updateTitle(
          item,
          getValue(item.title).replaceRegex(
            new RegExp(mod.text.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&'), 'ig'),
            mod.replace
          )
        )
      );

    if (mod.type === 'remove-text')
      channel.item = channel.item.map((item) =>
        updateTitle(
          item,
          getValue(item.title).replaceRegex(
            new RegExp(mod.text.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&'), 'ig'),
            ''
          )
        )
      );

    if (mod.type === 'prepend-text')
      channel.item = channel.item.map((item) =>
        updateTitle(item, getValue(item.title).replaceRegex(new RegExp('^', 'ig'), `${mod.text} `))
      );

    if (mod.type === 'append-text')
      channel.item = channel.item.map((item) =>
        updateTitle(item, getValue(item.title).replaceRegex(new RegExp('$', 'ig'), ` ${mod.text}`))
      );

    if (mod.type === 'matches-regex')
      channel.item = channel.item.filter(
        (item) => getValue(item.title).match(new RegExp(mod.regex, mod.regexFlags)) !== null
      );

    if (mod.type === 'replace-regex')
      channel.item = channel.item.map((item) =>
        updateTitle(
          item,
          getValue(item.title).replaceRegex(new RegExp(mod.regex, mod.regexFlags), mod.replace)
        )
      );

    if (mod.type === 'remove-regex')
      channel.item = channel.item.map((item) =>
        updateTitle(
          item,
          getValue(item.title).replaceRegex(new RegExp(mod.regex, mod.regexFlags), '')
        )
      );

    if (mod.type === 'minimum-duration')
      channel.item = channel.item.filter(
        (item) =>
          (parseDuration(item['itunes:duration']) ?? 0) >= getSeconds(mod.duration, mod.units)
      );

    if (mod.type === 'maximum-duration')
      channel.item = channel.item.filter(
        (item) =>
          (parseDuration(item['itunes:duration']) ?? Infinity) <=
          getSeconds(mod.duration, mod.units)
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

export { applyMods };
