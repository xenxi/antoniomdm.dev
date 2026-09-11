import lighthouse from 'lighthouse';
import { chromium } from '@playwright/test';
import { mkdir, writeFile } from 'node:fs/promises';

await mkdir('docs/quality', { recursive: true });
const chrome = await chromium.launch({ headless: true, args: ['--remote-debugging-port=9222'] });
try {
  const result = await lighthouse('http://127.0.0.1:4321/', {
    port: 9222, output: ['json', 'html'], logLevel: 'error',
    onlyCategories: ['performance', 'accessibility', 'best-practices', 'seo'],
  });
  if (!result) throw new Error('Lighthouse returned no result');
  await writeFile('docs/quality/lighthouse.json', result.report[0]);
  await writeFile('docs/quality/lighthouse.html', result.report[1]);
  const lhr = result.lhr;
  const summary = {
    date: lhr.fetchTime, url: lhr.finalDisplayedUrl, mode: 'mobile / default simulated throttling / local production preview',
    scores: Object.fromEntries(Object.entries(lhr.categories).map(([key, value]) => [key, Math.round(value.score * 100)])),
    lcp: lhr.audits['largest-contentful-paint'].numericValue, cls: lhr.audits['cumulative-layout-shift'].numericValue,
    failed: Object.values(lhr.audits).filter(audit => audit.score !== null && audit.score < 1).map(audit => ({ id: audit.id, title: audit.title, score: audit.score, displayValue: audit.displayValue })),
  };
  await writeFile('docs/quality/summary.json', JSON.stringify(summary, null, 2));
  console.log(JSON.stringify(summary, null, 2));
} finally { await chrome.close(); }
