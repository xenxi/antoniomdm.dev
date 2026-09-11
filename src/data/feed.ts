import rss from '@astrojs/rss';
import { getContent } from './content';
import { localizedPath, translator, type Locale } from '../i18n/core';
export async function rssResponse(locale: Locale) {
  const content = await getContent(locale); const t = translator(locale);
  return rss({ title: `ANTONIOMDM ${t('Notes')}`, description: t('Software, architecture and build logs.'), site: 'https://antoniomdm.dev', customData: `<language>${locale}</language>`, items: content.notes.map(note => ({ title: note.title, description: note.description, pubDate: new Date(note.date), link: localizedPath(`/notes/${note.slug}/`, locale), categories: note.tags })) });
}
