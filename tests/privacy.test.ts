import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';
import {
  privacyCanonical,
  privacyCopy,
  privacyPath,
} from '../src/data/privacy';

describe('privacy publishing contract', () => {
  it('keeps the configured Spanish URL and its English equivalent canonical', () => {
    expect(privacyPath('es')).toBe('/privacy/');
    expect(privacyPath('en')).toBe('/en/privacy/');
    expect(privacyCanonical('es')).toBe('https://antoniomdm.dev/privacy/');
    expect(privacyCanonical('en')).toBe('https://antoniomdm.dev/en/privacy/');
  });

  it('publishes complete, parallel Spanish and English policies', () => {
    expect(privacyCopy.es.sections).toHaveLength(14);
    expect(privacyCopy.en.sections).toHaveLength(14);
    for (const locale of ['es', 'en'] as const) {
      const policy = privacyCopy[locale];
      expect(policy.title).toBeTruthy();
      expect(policy.description.length).toBeGreaterThan(80);
      expect(new Set(policy.sections.map(section => section.id)).size).toBe(14);
      expect(policy.sections.every(section => section.title && section.paragraphs.length > 0)).toBe(true);
      expect(JSON.stringify(policy)).not.toMatch(/TODO|PLACEHOLDER/i);
    }
  });

  it('uses the shared layout for lang, canonical, hreflang and language navigation', () => {
    const page = readFileSync('src/components/PrivacyPage.astro', 'utf8');
    const layout = readFileSync('src/layouts/OutOfScopeLayout.astro', 'utf8');
    expect(page).toContain('canonical={privacyCanonical(locale)}');
    expect(page).toContain('href: privacyCanonical(alternateLocale)');
    expect(page).toContain('variant="legal"');
    expect(layout).toContain('<html lang={locale}>');
    expect(layout).toContain('hreflang="x-default"');
    expect(layout).toContain('data-language={alternate.locale}');
  });

  it('links all visible footers to the matching policy', () => {
    const desktop = readFileSync('src/components/Desktop.tsx', 'utf8');
    const layout = readFileSync('src/layouts/OutOfScopeLayout.astro', 'utf8');
    expect(desktop).toContain('class="privacy-link" href={href("/privacy/")}');
    expect(desktop).toContain('t("Privacy")');
    expect(layout).toContain("const privacy = en ? '/en/privacy/' : '/privacy/'");
    expect(layout).toContain("{en ? 'Privacy' : 'Privacidad'}");
  });

  it('reuses AnalyticsConsent and the official Google CMP revocation API', () => {
    const layout = readFileSync('src/layouts/OutOfScopeLayout.astro', 'utf8');
    const controls = readFileSync('src/components/PrivacyControls.astro', 'utf8');
    expect(layout.match(/<AnalyticsConsent\b/g)).toHaveLength(1);
    expect(layout.match(/<AdSenseLoader\b/g)).toHaveLength(1);
    expect(controls).toContain('googlefc.callbackQueue.push(googlefc.showRevocationMessage)');
    expect(controls).not.toMatch(/<script[^>]+src=/);
    expect(controls).not.toMatch(/document\.cookie/);
  });

  it('adds both indexable policy routes to the sitemap without adding RSS content', () => {
    const sitemap = readFileSync('src/pages/sitemap.xml.ts', 'utf8');
    const rssFiles = [
      'src/pages/rss.xml.ts',
      'src/pages/en/rss.xml.ts',
      'src/pages/out-of-scope/rss.xml.ts',
      'src/pages/en/out-of-scope/rss.xml.ts',
    ].map(file => readFileSync(file, 'utf8')).join('\n');
    expect(sitemap).toContain('/privacy/');
    expect(rssFiles).not.toMatch(/privacy/i);
  });
});
