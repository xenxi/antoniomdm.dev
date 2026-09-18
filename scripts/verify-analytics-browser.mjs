import { readFile } from 'node:fs/promises';
import { extname, resolve, sep } from 'node:path';
import { chromium } from '@playwright/test';

const distRoot = resolve('dist');
const contentTypes = {
  '.css': 'text/css',
  '.html': 'text/html',
  '.ico': 'image/x-icon',
  '.js': 'text/javascript',
  '.json': 'application/json',
  '.png': 'image/png',
  '.svg': 'image/svg+xml',
  '.webp': 'image/webp',
  '.woff2': 'font/woff2',
};

function artifactPath(url) {
  let pathname = decodeURIComponent(new URL(url).pathname);
  if (pathname.endsWith('/')) pathname += 'index.html';
  const path = resolve(distRoot, `.${pathname}`);
  if (path !== distRoot && !path.startsWith(`${distRoot}${sep}`)) {
    throw new Error('Analytics browser check rejected a path outside dist.');
  }
  return path;
}

async function dataLayerEvents(page) {
  return page.evaluate(() =>
    (window.dataLayer ?? [])
      .map((entry) => Array.from(entry))
      .filter((entry) => entry[0] === 'event')
      .map((entry) => ({ name: entry[1], params: entry[2] })),
  );
}

const browser = await chromium.launch({ headless: true });
const context = await browser.newContext({ viewport: { width: 1440, height: 900 } });
const googleRequests = [];

await context.route('https://www.googletagmanager.com/**', async (route) => {
  googleRequests.push(route.request().url());
  await route.fulfill({
    status: 200,
    contentType: 'text/javascript',
    body: 'window.__ANTONIOS_GA4_TEST_STUB__ = true;',
  });
});
await context.route('https://github.com/**', (route) =>
  route.fulfill({ status: 200, contentType: 'text/html', body: '<title>GitHub</title>' }),
);
await context.route('https://antoniomdm.dev/**', async (route) => {
  try {
    const path = artifactPath(route.request().url());
    const body = await readFile(path);
    await route.fulfill({
      status: 200,
      contentType: contentTypes[extname(path)] ?? 'application/octet-stream',
      body,
    });
  } catch {
    await route.fulfill({ status: 404, body: 'Not found' });
  }
});

const page = await context.newPage();

// Case A: rejection keeps every Google resource offline while client navigation works.
await page.goto('https://antoniomdm.dev/');
await page.locator('#analytics-consent-panel').waitFor({ state: 'visible' });
await page.getByRole('button', { name: 'Rechazar' }).click();
await page.locator('[data-desktop-app="projects"]').click();
await page.waitForURL('https://antoniomdm.dev/projects/');
if (googleRequests.length !== 0) throw new Error('GA4 loaded after rejection.');

// Case B: consent enables one tracker per document and semantic events.
await page.locator('#analytics-consent-settings').click();
await page.getByRole('button', { name: 'Aceptar medición' }).click();
await page.waitForFunction(() => window.__ANTONIOS_GA4_TEST_STUB__ === true);
await page.locator('a[href="/projects/platform934/"]').first().click();
await page.waitForURL('https://antoniomdm.dev/projects/platform934/');
const popupPromise = page.waitForEvent('popup');
await page.locator('[data-project-destination="website"]').click();
const projectPopup = await popupPromise;
await projectPopup.close();
await page.locator('[data-desktop-app="lab"]').click();
await page.waitForURL('https://antoniomdm.dev/ai-lab/');
await page.locator('a[href="/ai-lab/platform934/"]').first().click();
await page.waitForURL('https://antoniomdm.dev/ai-lab/platform934/');
await page.locator('[data-desktop-app="architecture"]').click();
await page.waitForURL('https://antoniomdm.dev/architecture/');
const firstDocumentEvents = await dataLayerEvents(page);
await page.locator('a[href="/architecture/vehicle-read-model/"]').first().click();
await page.waitForURL('https://antoniomdm.dev/architecture/vehicle-read-model/');
await page.evaluate(() => {
  document
    .querySelector('[data-language="en"]')
    ?.addEventListener('click', (event) => event.preventDefault(), {
      capture: true,
      once: true,
    });
});
await page.locator('[data-language="en"]').click();
const secondDocumentEvents = await dataLayerEvents(page);
await page.goto('https://antoniomdm.dev/en/architecture/vehicle-read-model/');
await page.locator('[data-desktop-app="about"]').click();
await page.waitForURL('https://antoniomdm.dev/en/profile/');
const githubPopupPromise = page.waitForEvent('popup');
await page.getByRole('link', { name: 'GitHub ↗' }).first().click();
const githubPopup = await githubPopupPromise;
await githubPopup.close();
await page.locator('[data-desktop-app="arcade"]').click();
await page.waitForURL('https://antoniomdm.dev/en/arcade/');
await page.getByRole('button', { name: /ENTER/ }).click();
await page.locator('.career-start').waitFor();
await page.getByRole('button', { name: /New game/ }).click();
const thirdDocumentEvents = await dataLayerEvents(page);

const allEvents = [
  ...firstDocumentEvents,
  ...secondDocumentEvents,
  ...thirdDocumentEvents,
];
const eventNames = allEvents.map((event) => event.name);
for (const expected of [
  'page_view',
  'project_view',
  'project_external_link',
  'ai_lab_view',
  'ai_lab_case_view',
  'case_study_view',
  'language_change',
  'github_click',
  'arcade_open',
  'arcade_game_start',
]) {
  if (!eventNames.includes(expected)) {
    throw new Error(`Missing browser event: ${expected}; received ${eventNames.join(', ')}`);
  }
}

const projectView = firstDocumentEvents.find((event) => event.name === 'project_view');
if (
  projectView?.params?.project_id !== 'platform934' ||
  projectView.params.project_name !== 'Platform934' ||
  projectView.params.source_section !== 'projects'
) {
  throw new Error('project_view parameters do not match the opened project.');
}
const projectExternal = firstDocumentEvents.find(
  (event) => event.name === 'project_external_link',
);
if (
  projectExternal?.params?.destination !== 'website' ||
  'url' in (projectExternal?.params ?? {})
) {
  throw new Error('project_external_link leaked or misclassified its destination.');
}
if (eventNames.filter((name) => name === 'project_view').length !== 1) {
  throw new Error('One project opening produced duplicate project_view events.');
}
for (const event of allEvents) {
  if (
    event.name === 'page_view' &&
    (String(event.params?.page_path).includes('?') ||
      String(event.params?.page_path).includes('#') ||
      String(event.params?.page_location).includes('?') ||
      String(event.params?.page_location).includes('#'))
  ) {
    throw new Error('A page_view leaked a query string or hash.');
  }
}
if (googleRequests.length !== 3) {
  throw new Error(
    `Expected exactly one Google tracker request per consented document; received ${googleRequests.length}.`,
  );
}

// Case C: revocation blocks later events and navigation remains functional.
await page.getByRole('button', { name: /Return to desktop/ }).click();
await page.locator('#analytics-consent-settings').click();
await page.getByRole('button', { name: 'Reject' }).click();
const eventsAfterRevoke = (await dataLayerEvents(page)).length;
await page.locator('[data-desktop-app="projects"]').click();
await page.waitForURL('https://antoniomdm.dev/en/projects/');
if ((await dataLayerEvents(page)).length !== eventsAfterRevoke) {
  throw new Error('An analytics event was emitted after revocation.');
}

console.log(
  JSON.stringify({
    cases: ['reject', 'accept-and-navigate', 'revoke'],
    googleTrackerRequests: googleRequests.length,
    events: eventNames,
  }),
);
await browser.close();
