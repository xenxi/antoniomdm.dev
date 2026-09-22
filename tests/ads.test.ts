import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';
import {
  canLoadAdSense,
  canRenderAds,
  createAdsConfig,
  hasValidAdsClient,
} from '../src/config/ads';

const publisherId = 'ca-pub-2673939834159464';
const simulatedSlotId = '0'.repeat(10);

describe('AdSense integration contract', () => {
  it('publishes exactly the authorized ads.txt entry', () => {
    expect(readFileSync('public/ads.txt', 'utf8')).toBe(
      'google.com, pub-2673939834159464, DIRECT, f08c47fec0942fa0\n',
    );
  });

  it('is disabled by default and rejects incomplete or malformed configuration', () => {
    const defaults = createAdsConfig({});
    expect(defaults).toEqual({
      enabled: false,
      clientId: undefined,
      articleSlotId: undefined,
    });
    expect(canLoadAdSense(defaults)).toBe(false);
    expect(canRenderAds(defaults)).toBe(false);
    expect(
      canRenderAds({ enabled: true, clientId: publisherId }),
    ).toBe(false);
    expect(
      canRenderAds({
        enabled: true,
        clientId: 'pub-2673939834159464',
        articleSlotId: simulatedSlotId,
      }),
    ).toBe(false);
  });

  it('recognizes the production client and requires every value for a real unit', () => {
    expect(hasValidAdsClient({ clientId: publisherId })).toBe(true);
    expect(
      canLoadAdSense({ enabled: false, clientId: publisherId }),
    ).toBe(true);
    expect(
      canRenderAds({
        enabled: true,
        clientId: publisherId,
        articleSlotId: simulatedSlotId,
      }),
    ).toBe(true);
  });

  it('keeps one semantic article unit and no unit on either landing or portfolio', () => {
    const article = readFileSync(
      'src/components/out-of-scope/Article.astro',
      'utf8',
    );
    const landing = readFileSync(
      'src/components/out-of-scope/Landing.astro',
      'utf8',
    );
    const portfolio = readFileSync('src/layouts/Shell.astro', 'utf8');
    const slot = readFileSync(
      'src/components/out-of-scope/AdSlot.astro',
      'utf8',
    );

    expect(article.match(/<AdSlot\b/g)).toHaveLength(1);
    expect(article).toContain('position="article-end"');
    expect(landing).not.toMatch(/AdSlot|adsbygoogle/);
    expect(portfolio).not.toMatch(/AdSlot|AdSenseLoader|adsbygoogle/);
    expect(slot.match(/<ins\b/g)).toHaveLength(1);
    expect(slot).toContain("'PUBLICIDAD'");
    expect(slot).toContain("'ADVERTISEMENT'");
  });

  it('centralizes one loader and uses CSS to move the same node responsively', () => {
    const layout = readFileSync('src/layouts/OutOfScopeLayout.astro', 'utf8');
    const loader = readFileSync(
      'src/components/out-of-scope/AdSenseLoader.astro',
      'utf8',
    );
    const styles = readFileSync('src/styles/out-of-scope.css', 'utf8');

    expect(layout.match(/<AdSenseLoader\b/g)).toHaveLength(1);
    expect(loader.match(/adsbygoogle\.js\?client=/g)).toHaveLength(1);
    expect(styles).toContain('@media (min-width: 1180px)');
    expect(styles).toContain('grid-template-columns: minmax(0, 740px)');
    expect(styles).toContain('position: sticky');
  });
});
