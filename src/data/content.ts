import { getCollection } from 'astro:content';
import type { ContentData } from './portfolio';
import type { Locale } from '../i18n/core';
import { getOutOfScopeArticles } from './out-of-scope';

export async function getContent(locale: Locale = 'es'): Promise<ContentData> {
  const entries = await getCollection('notes', ({ data }) => !data.draft);
  // Missing translations fail the build instead of silently publishing mixed languages.
  const slugs = new Set(entries.map(entry => entry.id.replace(/^(es|en)\//, '')));
  for (const slug of slugs) for (const language of ['es', 'en']) {
    if (!entries.some(entry => entry.id === `${language}/${slug}`)) throw new Error(`Missing ${language} note: ${slug}`);
  }
  const notes = entries.filter(entry => entry.id.startsWith(`${locale}/`)).sort((a,b) => b.data.date.valueOf() - a.data.date.valueOf()).map(entry => ({
    slug: entry.id.replace(/^(es|en)\//, ''), title: entry.data.title, description: entry.data.description,
    date: entry.data.date.toISOString(), updated: entry.data.updated?.toISOString(),
    tags: entry.data.tags, readingTime: entry.data.readingTime, canonical: entry.data.canonical,
    html: entry.rendered?.html ?? '',
  }));
  return { notes, outOfScope: await getOutOfScopeArticles(locale) };
}
