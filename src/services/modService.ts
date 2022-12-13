import type { ModConfig } from '../types/mods';
import type { FeedData } from '../types/feeds';

type FeedItem = FeedData['rss']['channel']['item'][number];

declare global {
  interface String {
    replaceRegex(regex: RegExp, replacementText: string): string;
  }
}

Object.defineProperty(String.prototype, 'replaceRegex', {
  value: function (regex: RegExp, replacementText: string) {
    return regex.global
      ? this.replaceAll(regex, replacementText)
      : this.replace(regex, replacementText);
  },
  writable: true,
  configurable: true,
});

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
        getTitle(item).toLowerCase().includes(mod.text.toLowerCase())
      );

    if (mod.type === 'excludes-text')
      channel.item = channel.item.filter(
        (item) => !getTitle(item).toLowerCase().includes(mod.text.toLowerCase())
      );

    if (mod.type === 'replace-text')
      channel.item = channel.item.map((item) =>
        updateTitle(item, getTitle(item).replaceRegex(new RegExp(mod.text, 'ig'), mod.replace))
      );

    if (mod.type === 'remove-text')
      channel.item = channel.item.map((item) =>
        updateTitle(item, getTitle(item).replaceRegex(new RegExp(mod.text, 'ig'), ''))
      );

    if (mod.type === 'prepend-text')
      channel.item = channel.item.map((item) =>
        updateTitle(item, getTitle(item).replaceRegex(new RegExp('^', 'ig'), `${mod.text} `))
      );

    if (mod.type === 'append-text')
      channel.item = channel.item.map((item) =>
        updateTitle(item, getTitle(item).replaceRegex(new RegExp('$', 'ig'), ` ${mod.text}`))
      );

    if (mod.type === 'matches-regex')
      channel.item = channel.item.filter(
        (item) => getTitle(item).match(new RegExp(mod.regex, mod.regexOptions)) !== null
      );

    if (mod.type === 'replace-regex')
      channel.item = channel.item.map((item) =>
        updateTitle(
          item,
          getTitle(item).replaceRegex(new RegExp(mod.regex, mod.regexOptions), mod.replace)
        )
      );

    if (mod.type === 'remove-regex')
      channel.item = channel.item.map((item) =>
        updateTitle(item, getTitle(item).replaceRegex(new RegExp(mod.regex, mod.regexOptions), ''))
      );

    if (mod.type === 'minimum-duration')
      channel.item = channel.item.filter(
        (item) => parseDuration(item['itunes:duration']) ?? 0 >= getSeconds(mod.duration, mod.units)
      );

    if (mod.type === 'maximum-duration')
      channel.item = channel.item.filter(
        (item) =>
          parseDuration(item['itunes:duration']) ?? Infinity <= getSeconds(mod.duration, mod.units)
      );
  });

  return feed;
};

const updateTitle = (item: FeedItem, title: string): FeedItem => ({
  ...item,
  title: { cdata: title },
  'itunes:title': { cdata: title },
});

const getTitle = (item: FeedItem) =>
  typeof item.title === 'string' ? item.title : item.title.cdata;

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
