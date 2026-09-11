import { chromium } from '@playwright/test';
import lighthouse from 'lighthouse';
import { gzipSync } from 'node:zlib';
import { mkdir, writeFile } from 'node:fs/promises';

const directory = 'docs/quality/a6';
await mkdir(directory, { recursive: true });
const baseUrl = process.env.A6_PERFORMANCE_URL ?? 'http://127.0.0.1:4321';
const browser = await chromium.launch({ args: ['--remote-debugging-port=9222'] });
try {
  const page = await browser.newPage();
  const responses = [];
  page.on('response', response => responses.push(response));
  await page.goto(`${baseUrl}/projects/platform934/`);
  await page.locator('[data-ready="true"]').waitFor();
  await page.waitForLoadState('networkidle');
  const assets = await Promise.all(responses.map(async response => {
    const body = await response.body();
    const type = response.request().resourceType();
    return { path: new URL(response.url()).pathname, type, bytes: body.length, gzip: ['document', 'stylesheet', 'script'].includes(type) ? gzipSync(body).length : body.length };
  }));
  const result = await lighthouse(`${baseUrl}/projects/platform934/`, { port: 9222, output: ['json', 'html'], logLevel: 'error', onlyCategories: ['performance', 'accessibility', 'best-practices', 'seo'] });
  const report = {
    date: new Date().toISOString(), route: '/projects/platform934/', environment: baseUrl.includes('4322') ? 'local production preview' : 'local development server', assets,
    initialJsGzip: assets.filter(asset => asset.type === 'script').reduce((sum, asset) => sum + asset.gzip, 0),
    routeTransferEstimate: assets.reduce((sum, asset) => sum + asset.gzip, 0),
    arcadeBootRequests: assets.filter(asset => /\/Arcade\.|\/arcade\//.test(asset.path)),
    audioBootRequests: assets.filter(asset => /\.(mp3|wav|ogg)$/.test(asset.path)),
    lighthouse: result ? Object.fromEntries(Object.entries(result.lhr.categories).map(([id, value]) => [id, Math.round(value.score * 100)])) : null,
    lighthouseTransfer: result?.lhr.audits['total-byte-weight'].numericValue ?? null,
  };
  await writeFile(`${directory}/performance.json`, JSON.stringify(report, null, 2));
  if (result) await writeFile(`${directory}/lighthouse.html`, result.report[1]);
  console.log(JSON.stringify(report));
} finally { await browser.close(); }
