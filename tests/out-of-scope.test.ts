import { describe, expect, it, vi } from 'vitest';
import { readFileSync } from 'node:fs';
import { z } from 'astro/zod';
import { render } from 'preact-render-to-string';
import { h } from 'preact';
import { createOutOfScopeSchema } from '../src/lib/out-of-scope/schema';
import { localizedArticlePath, outOfScopeUtmPath } from '../src/lib/out-of-scope/urls';
import { canRenderAds } from '../src/config/ads';
import { appForPath, registry } from '../src/os/registry';
import { sanitizeAnalyticsEvent } from '../src/lib/analytics/events';
import { createArticleProgressTracker } from '../src/lib/analytics/article-progress';
import { OriginalScope, Question } from '../src/components/out-of-scope/EditorialBlocks';
import { formatLinkedInPost, linkedinDedupeKey, linkedinUrl } from '../scripts/out-of-scope-linkedin.mjs';

const validMetadata = {
  title: 'A useful question',
  summary: 'A hand-written editorial summary that is deliberately longer than forty characters.',
  date: '2026-09-20', slug: 'useful-question', locale: 'es', translationKey: 'useful-question',
  tags: ['Astro'], category: 'Architecture', type: 'exploration', readingTime: 5,
};

describe('Blog publishing contract', () => {
  it('validates required summaries, slugs, covers and LinkedIn modes', () => {
    const schema = createOutOfScopeSchema(z.string());
    expect(schema.parse(validMetadata)).toMatchObject({ draft: true, featured: false });
    expect(schema.safeParse({ ...validMetadata, summary: 'Too short' }).success).toBe(false);
    expect(schema.safeParse({ ...validMetadata, slug: 'Not Valid' }).success).toBe(false);
    expect(schema.safeParse({ ...validMetadata, cover: './cover.webp' }).success).toBe(false);
    expect(schema.safeParse({ ...validMetadata, linkedin: { enabled: true, mode: 'disabled' } }).success).toBe(false);
  });

  it('keeps clean canonicals while adding source-specific UTMs', () => {
    const es = { locale: 'es' as const, slug: 'useful-question' };
    const en = { locale: 'en' as const, slug: 'useful-question' };
    expect(localizedArticlePath(es)).toBe('/blog/useful-question/');
    expect(localizedArticlePath(en)).toBe('/en/blog/useful-question/');
    expect(outOfScopeUtmPath(es)).toBe('/blog/useful-question/?utm_source=antonios&utm_medium=portfolio&utm_campaign=blog');
    expect(linkedinUrl('https://antoniomdm.dev/blog/useful-question/?old=1#x')).toBe('https://antoniomdm.dev/blog/useful-question/?utm_source=linkedin&utm_medium=social&utm_campaign=blog');
  });

  it('formats review copy deterministically, supports overrides and exposes a duplicate key', () => {
    const generated = formatLinkedInPost({ title: 'A useful question', summary: validMetadata.summary, canonicalUrl: 'https://antoniomdm.dev/blog/useful-question/', locale: 'es' });
    expect(generated).toContain('He vuelto a esta pregunta en Out of Context:');
    expect(generated).toContain('utm_source=linkedin');
    expect(formatLinkedInPost({ title: 'x', summary: 'y', canonicalUrl: 'https://antoniomdm.dev/', text: 'Custom copy' })).toBe('Custom copy');
    expect(linkedinDedupeKey({ canonicalUrl: 'https://antoniomdm.dev/blog/useful-question/', publishedAt: '2026-09-20T10:00:00Z' })).toBe('blog/useful-question:2026-09-20');
  });

  it('registers the AntoñiOS preview without treating editorial routes as desktop articles', () => {
    expect(registry.blog.path).toBe('/blog/app/');
    expect(appForPath('/blog/app/')).toBe('blog');
    expect(appForPath('/blog/useful-question/')).toBeUndefined();
  });

  it('renders no advertising unless both future configuration values are present', () => {
    expect(canRenderAds({ enabled: false, clientId: undefined, articleSlotId: undefined })).toBe(false);
    expect(canRenderAds({ enabled: true, clientId: 'ca-pub-2673939834159464', articleSlotId: undefined })).toBe(false);
    expect(canRenderAds({ enabled: true, clientId: 'ca-pub-2673939834159464', articleSlotId: '0'.repeat(10) })).toBe(true);
  });

  it('accepts typed article events and rejects extra or private parameters', () => {
    const view = { name: 'article_view', params: { article_slug: 'useful-question', language: 'es' } };
    expect(sanitizeAnalyticsEvent(view)).toEqual(view);
    expect(sanitizeAnalyticsEvent({ ...view, params: { ...view.params, url: 'https://example.com/?private=1' } })).toBeUndefined();
    expect(sanitizeAnalyticsEvent({ name: 'article_external_link', params: { article_slug: 'useful-question', destination: 'example.com', language: 'en' } })).toBeTruthy();
  });

  it('emits depth events once and retries events refused before consent', () => {
    const track = vi.fn(() => true);
    const progress = createArticleProgressTracker('useful-question', 'es', track);
    expect(progress(.49)).toBe(0); expect(progress(.5)).toBe(1); expect(progress(.8)).toBe(1); expect(progress(.95)).toBe(2); expect(progress(1)).toBe(2);
    expect(track).toHaveBeenCalledTimes(2);
    const consent = vi.fn().mockReturnValueOnce(false).mockReturnValue(true);
    const retry = createArticleProgressTracker('useful-question', 'es', consent);
    expect(retry(.5)).toBe(0); expect(retry(.5)).toBe(1);
  });

  it('provides reusable scope and question MDX blocks', () => {
    const scope = render(h(OriginalScope, { original: 'Ship', beyond: 'Understand' }));
    const question = render(h(Question, { title: 'QUESTION', children: 'Why?' }));
    expect(scope).toContain('oos-scope'); expect(scope).toContain('Understand');
    expect(question).toContain('oos-block--question'); expect(question).toContain('Why?');
  });

  it('ships matching ES/EN content with manual summaries and one translation key', () => {
    const es = readFileSync('src/content/out-of-scope/es/la-pregunta-se-queda/index.mdx', 'utf8');
    const en = readFileSync('src/content/out-of-scope/en/the-question-remains/index.mdx', 'utf8');
    expect(es).toContain('summary:'); expect(en).toContain('summary:');
    expect(es).toContain('translationKey: "the-question-remains"');
    expect(en).toContain('translationKey: "the-question-remains"');
    expect(es).toContain('<OriginalScope'); expect(en).toContain('<OriginalScope');
    expect(es).not.toContain('<Observation'); expect(en).not.toContain('<Observation');
    expect(es).toContain('readingTime: 3'); expect(en).toContain('readingTime: 3');
    expect(es).toContain('La historia puede terminar sin llevarse la pregunta por delante.');
    expect(en).toContain('The story can end without taking the question with it.');
  });

  it('makes the editorial guide the persistent source of truth for agents', () => {
    const agents = readFileSync('AGENTS.md', 'utf8');
    const guide = readFileSync('docs/BLOG_EDITORIAL_GUIDE.md', 'utf8');
    expect(agents).toContain('docs/BLOG_EDITORIAL_GUIDE.md');
    expect(guide).toContain('fuente de verdad editorial');
    expect(guide).toContain('editorial source of truth');
    expect(guide).toContain('golden sample');
    expect(agents).toContain('La pregunta se queda');
    expect(agents).toContain('The question remains');
  });
});
