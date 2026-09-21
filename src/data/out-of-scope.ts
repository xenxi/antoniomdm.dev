import { getCollection, type CollectionEntry } from 'astro:content';
import type { ImageMetadata } from 'astro';
import type { Locale } from '../i18n/core';
import { outOfScopePath } from '../lib/out-of-scope/urls';
export { localizedArticlePath, outOfScopePath } from '../lib/out-of-scope/urls';

export type OutOfScopeEntry = CollectionEntry<'outOfScope'>;

export interface OutOfScopeCard {
  slug: string;
  title: string;
  summary: string;
  date: string;
  updated?: string;
  tags: string[];
  category: string;
  series?: string;
  cover?: ImageMetadata;
  coverAlt?: string;
  type: OutOfScopeEntry['data']['type'];
  readingTime: number;
  featured: boolean;
  translationKey: string;
  locale: Locale;
}

export function articleCanonical(article: Pick<OutOfScopeCard, 'locale' | 'slug'>): string {
  return `https://antoniomdm.dev${article.locale === 'en' ? '/en' : ''}${outOfScopePath(article.slug)}`;
}

function toCard(entry: OutOfScopeEntry): OutOfScopeCard {
  return {
    slug: entry.data.slug,
    title: entry.data.title,
    summary: entry.data.summary,
    date: entry.data.date.toISOString(),
    updated: entry.data.updated?.toISOString(),
    tags: entry.data.tags,
    category: entry.data.category,
    series: entry.data.series,
    cover: entry.data.cover,
    coverAlt: entry.data.coverAlt,
    type: entry.data.type,
    readingTime: entry.data.readingTime,
    featured: entry.data.featured,
    translationKey: entry.data.translationKey,
    locale: entry.data.locale,
  };
}

export async function getOutOfScopeEntries(locale?: Locale): Promise<OutOfScopeEntry[]> {
  const entries = await getCollection('outOfScope', ({ data }) => !data.draft);
  const seen = new Set<string>();
  for (const entry of entries) {
    const identity = `${entry.data.locale}:${entry.data.slug}`;
    if (seen.has(identity)) throw new Error(`Duplicate Blog article: ${identity}`);
    seen.add(identity);
  }
  return entries
    .filter(entry => !locale || entry.data.locale === locale)
    .sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());
}

export async function getOutOfScopeArticles(locale: Locale): Promise<OutOfScopeCard[]> {
  return (await getOutOfScopeEntries(locale)).map(toCard);
}

export async function findOutOfScopeTranslation(entry: OutOfScopeEntry, locale: Locale): Promise<OutOfScopeEntry | undefined> {
  return (await getOutOfScopeEntries(locale)).find(candidate => candidate.data.translationKey === entry.data.translationKey);
}
