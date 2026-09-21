import type { AnalyticsEvent, AnalyticsLanguage } from './events';

type DepthName = 'article_50_percent' | 'article_complete';
type DepthEvent = Extract<AnalyticsEvent, { params: { article_slug: string; language: AnalyticsLanguage } }> & { name: DepthName };

export function createArticleProgressTracker(articleSlug: string, language: AnalyticsLanguage, track: (event: DepthEvent) => boolean) {
  const sent = new Set<DepthName>();
  return (progress: number): number => {
    for (const [threshold, name] of [[0.5, 'article_50_percent'], [0.9, 'article_complete']] as const) {
      if (progress >= threshold && !sent.has(name)) {
        const event: DepthEvent = { name, params: { article_slug: articleSlug, language } };
        if (track(event)) sent.add(name);
      }
    }
    return sent.size;
  };
}
