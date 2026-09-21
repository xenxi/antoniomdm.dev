import type { Locale } from '../../i18n/core';

export interface LocalizedArticle { locale: Locale; slug: string }

export const outOfScopePath = (slug = '') => `/blog/${slug ? `${slug}/` : ''}`;

export function localizedArticlePath(article: LocalizedArticle): string {
  return `${article.locale === 'en' ? '/en' : ''}${outOfScopePath(article.slug)}`;
}

export const outOfScopeUtmPath = (article: LocalizedArticle) =>
  `${localizedArticlePath(article)}?utm_source=antonios&utm_medium=portfolio&utm_campaign=blog`;
