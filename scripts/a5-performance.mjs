import { chromium } from '@playwright/test';
import lighthouse from 'lighthouse';
import { gzipSync } from 'node:zlib';
import { mkdir, writeFile } from 'node:fs/promises';

const directory = 'docs/quality/a5';
await mkdir(directory, { recursive: true });
const browser = await chromium.launch({ args: ['--remote-debugging-port=9222'] });
try {
  const page = await browser.newPage();
  const responses = [];
  page.on('response', response => responses.push(response));
  await page.goto('http://127.0.0.1:4321/');
  await page.locator('[data-ready="true"]').waitFor();
  await page.waitForLoadState('networkidle');
  const assets = await Promise.all(responses.map(async response => {
    const body = await response.body();
    const type = response.request().resourceType();
    return { path: new URL(response.url()).pathname, type, bytes: body.length, gzip: ['document', 'stylesheet', 'script'].includes(type) ? gzipSync(body).length : body.length };
  }));
  const result = await lighthouse('http://127.0.0.1:4321/', { port: 9222, output: ['json', 'html'], logLevel: 'error', onlyCategories: ['performance', 'accessibility', 'best-practices', 'seo'] });
  const report = {
    date: new Date().toISOString(),
    assets,
    initialJsGzip: assets.filter(asset => asset.type === 'script').reduce((sum, asset) => sum + asset.gzip, 0),
    homeGzipEstimate: assets.reduce((sum, asset) => sum + asset.gzip, 0),
    deferredBootRequests: assets.filter(asset => /\/Arcade\.|\/arcade\/|\.(mp3|wav|ogg)$/.test(asset.path)),
    lighthouse: Object.fromEntries(Object.entries(result.lhr.categories).map(([id, value]) => [id, Math.round(value.score * 100)])),
    lighthouseTransfer: result.lhr.audits['total-byte-weight'].numericValue,
    lcp: result.lhr.audits['largest-contentful-paint'].numericValue,
    cls: result.lhr.audits['cumulative-layout-shift'].numericValue,
  };
  await writeFile(`${directory}/performance.json`, JSON.stringify(report, null, 2));
  await writeFile(`${directory}/lighthouse.html`, result.report[1]);
  console.log(JSON.stringify(report));
} finally {
  await browser.close();
}
