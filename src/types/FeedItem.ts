import type { FeedData } from './FeedData';

type FeedItem = FeedData['rss']['channel']['item'][number];

export type { FeedItem };
