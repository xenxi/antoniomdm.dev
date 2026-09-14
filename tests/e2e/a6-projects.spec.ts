import { expect, test, type Page } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

const cards = (page: Page) => page.locator('.project-card, .project-card-secondary');

const projectNames = [
  'Platform934',
  'Platform934 API',
  'Stream Optimizer',
  'Devagon Alley',
  'Luna Tartas',
  'Koso',
  'Luna Studio',
  'AntoñiOS',
  'bio-cli / bio-dev-card',
];

test('A6.6 Projects landing exposes the locked portfolio and ecosystem filters', async ({ page }) => {
  await page.goto('/en/projects/');
  await expect(page.locator('[data-ready="true"]')).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Personal Engineering Labs' })).toBeVisible();
  await expect(page.locator('.project-card, .project-card-secondary')).toHaveCount(9);
  await page.getByRole('button', { name: 'Media Engineering', exact: true }).click();
  await expect(page.locator('.project-card, .project-card-secondary')).toHaveCount(4);
  await expect(page.locator('.project-card-secondary h2').filter({ hasText: 'Stream Optimizer' })).toBeVisible();
  await page.getByRole('button', { name: 'Commerce / Product Engineering', exact: true }).click();
  await expect(page.locator('.project-card, .project-card-secondary')).toHaveCount(3);
  await page.getByRole('button', { name: 'Personal Developer Experience', exact: true }).click();
  await expect(page.locator('.project-card, .project-card-secondary')).toHaveCount(2);
  await page.getByRole('button', { name: 'All projects', exact: true }).click();
  await expect(page.locator('.project-card, .project-card-secondary')).toHaveCount(9);
  await expect(page.locator('.project-status').filter({ hasText: 'BETA' }).first()).toBeVisible();
  await expect(page.getByText('DESIGNED / PLANNED', { exact: true })).toBeVisible();
});

test('A6.6 localized project routes preserve the existing Platform934 case study', async ({ page }) => {
  await page.goto('/en/projects/platform934/');
  await expect(page.locator('html')).toHaveAttribute('lang', 'en');
  await expect(page.locator('h1', { hasText: 'Platform934' })).toBeVisible();
  await expect(page.getByText('Jellyfin', { exact: true }).first()).toBeVisible();
  await page.goto('/en/projects/koso/');
  await expect(page.locator('a[href*="koso-cosas-originales"]')).toContainText('Beta / temporary preview');
  await page.goto('/en/projects/luna-studio/');
  await expect(page.getByText('DESIGNED / PLANNED', { exact: true })).toBeVisible();
});

test('A6.6 project registry has exact names, counts, keyboard filters and coherent focus', async ({ page }) => {
  await page.goto('/en/projects/');
  await expect(page.locator('[data-ready="true"]')).toBeVisible();
  await expect(cards(page)).toHaveCount(9);
  for (const name of projectNames) await expect(page.locator('.project-card h2, .project-card-secondary h2').filter({ hasText: name }).first()).toBeVisible();

  const filters = [
    ['Media Engineering', 4, ['Platform934', 'Platform934 API', 'Stream Optimizer', 'Devagon Alley']],
    ['Commerce / Product Engineering', 3, ['Luna Tartas', 'Koso', 'Luna Studio']],
    ['Personal Developer Experience', 2, ['AntoñiOS', 'bio-cli / bio-dev-card']],
  ] as const;
  for (const [name, count, visibleNames] of filters) {
    const filter = page.getByRole('button', { name, exact: true });
    await filter.focus();
    await expect(filter).toBeFocused();
    await page.keyboard.press('Enter');
    await expect(filter).toHaveAttribute('aria-pressed', 'true');
    await expect(cards(page)).toHaveCount(count);
    for (const projectName of visibleNames) await expect(cards(page).filter({ hasText: projectName }).first()).toBeVisible();
    await expect(page.locator(':focus')).toHaveText(name);
  }
  const all = page.getByRole('button', { name: 'All projects', exact: true });
  await all.focus();
  await page.keyboard.press('Space');
  await expect(all).toHaveAttribute('aria-pressed', 'true');
  await expect(cards(page)).toHaveCount(9);
  await expect(all).toBeFocused();
});

test('A6.6 project editorial boundaries and approved CTAs are visible', async ({ page }) => {
  const assertions = [
    ['/en/projects/platform934-api/', ['private backend', 'agent gateway'], []],
    ['/en/projects/stream-optimizer/', ['n8n coordinates', 'FFmpeg worker'], ['It is a microservices platform']],
    ['/en/projects/devagon-alley/', ['private application distribution', 'update service'], ['It is a public marketplace', 'It is a commercial app store', 'It is a Google Play replacement']],
    ['/en/projects/luna-tartas/', ['static generation'], ['The implementation uses SSR']],
    ['/en/projects/koso/', ['Beta / temporary preview'], []],
    ['/en/projects/luna-studio/', ['Current: Luna Studio', 'DESIGNED / PLANNED'], ['It currently manages Koso']],
    ['/en/projects/antonios/', ['historical Flutter', 'Astro', 'Preact', 'TypeScript'], []],
    ['/en/projects/bio-cli/', ['small', 'No download, popularity or usage metrics'], ['downloads', 'popularity metrics']],
  ] as const;
  for (const [route, required, forbidden] of assertions) {
    await page.goto(route);
    const body = (await page.locator('body').innerText()).toLowerCase();
    for (const text of required) expect(body).toContain(text.toLowerCase());
    for (const text of forbidden) expect(body).not.toContain(text.toLowerCase());
  }

  await page.goto('/en/projects/luna-tartas/');
  await expect(page.locator('a[href="https://lunatartas.es/"]')).toBeVisible();
  await page.goto('/en/projects/koso/');
  await expect(page.locator('a[href="https://koso-cosas-originales.xenxi-85.chatgpt.site/"]')).toContainText('Beta / temporary preview');
  await page.goto('/en/projects/antonios/');
  await expect(page.locator('a[href="https://antoniomdm.dev/"]')).toBeVisible();
  for (const route of ['/en/projects/platform934-api/', '/en/projects/stream-optimizer/', '/en/projects/devagon-alley/', '/en/projects/luna-studio/']) {
    await page.goto(route);
    await expect(page.locator('a[href^="https://"]')).toHaveCount(0);
  }
});

test('A6.6 project navigation preserves detail routes and browser history', async ({ page }) => {
  await page.goto('/en/projects/');
  await page.getByRole('link', { name: /Stream Optimizer/ }).first().click();
  await expect(page).toHaveURL(/\/en\/projects\/stream-optimizer\/$/);
  await expect(page.locator('h1')).toHaveText('Stream Optimizer');
  await page.goBack();
  await expect(page).toHaveURL(/\/en\/projects\/$/);
  await expect(page.locator('h1')).toHaveText('Personal Engineering Labs');
  await page.goForward();
  await expect(page.locator('h1')).toHaveText('Stream Optimizer');
});

test('A6.6 representative project pages pass Axe with no serious or critical violations', async ({ page }) => {
  for (const route of ['/projects/', '/en/projects/', '/en/projects/platform934-api/', '/en/projects/luna-studio/', '/en/projects/koso/']) {
    await page.goto(route);
    const result = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21aa']).analyze();
    expect(result.violations.filter(item => item.impact === 'serious' || item.impact === 'critical'), route).toEqual([]);
  }
});

test('A6.6 projects remain discoverable and representative details work without JavaScript', async ({ browser }) => {
  const context = await browser.newContext({ javaScriptEnabled: false });
  const page = await context.newPage();
  await page.goto('/en/projects/');
  await expect(page.locator('.project-card, .project-card-secondary')).toHaveCount(9);
  for (const name of projectNames) await expect(page.locator('.project-card h2, .project-card-secondary h2').filter({ hasText: name }).first()).toBeVisible();
  for (const route of ['/en/projects/platform934-api/', '/en/projects/stream-optimizer/', '/en/projects/luna-studio/', '/en/projects/koso/']) {
    await page.goto(route);
    await expect(page.locator('h1')).toBeVisible();
    await expect(page.locator('.project-detail')).toContainText(/Architectural decision|Decisión arquitectónica/i);
    await expect(page.locator('.project-detail .project-status')).toBeVisible();
  }
  await context.close();
});

test('A6.6 projects fit desktop, tablet and mobile without horizontal overflow', async ({ page }) => {
  for (const [width, height] of [[1440, 900], [768, 1024], [390, 844]] as const) {
    await page.setViewportSize({ width, height });
    for (const route of ['/en/projects/', '/en/projects/stream-optimizer/', '/en/projects/luna-studio/', '/en/projects/koso/']) {
      await page.goto(route);
      expect(await page.evaluate(() => document.documentElement.scrollWidth), `${route} at ${width}`).toBeLessThanOrEqual(width);
      await expect(page.locator('h1')).toBeVisible();
      await expect(page.locator('.project-detail .project-status, .project-card .project-status, .project-card-secondary .project-status').first()).toBeVisible();
    }
  }
  await page.goto('/en/projects/');
  await expect(page.getByText('DESIGNED / PLANNED', { exact: true })).toBeVisible();
  await expect(page.getByText('Stream Optimizer → automation and media processing', { exact: true })).toBeVisible();
});
