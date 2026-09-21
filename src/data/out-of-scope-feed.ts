import rss from '@astrojs/rss';
import type { Locale } from '../i18n/core';
import { getOutOfScopeArticles, localizedArticlePath } from './out-of-scope';

export async function outOfScopeRss(locale: Locale) {
  const articles = await getOutOfScopeArticles(locale);
  return rss({
    title: 'Out of Context · AntoñiOS',
    description: locale === 'en' ? 'Questions, experiments and engineering notes.' : 'Preguntas, experimentos y notas de ingeniería.',
    site: 'https://antoniomdm.dev',
    customData: `<language>${locale}</language>`,
    items: articles.map(article => ({
      title: article.title,
      description: article.summary,
      pubDate: new Date(article.date),
      link: localizedArticlePath(article),
      categories: article.tags,
    })),
  });
}
