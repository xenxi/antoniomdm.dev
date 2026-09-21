import type { Locale } from '../i18n/core';
import { outOfScopeRss } from './out-of-scope-feed';
export async function rssResponse(locale: Locale) {
  return outOfScopeRss(locale);
}
