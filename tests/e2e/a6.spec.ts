import { test, expect, type Page } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import { mkdir } from 'node:fs/promises';

test.use({ reducedMotion: 'reduce' });
const screenshotDirectory = 'docs/quality/a6/screenshots/a6';
const route = (locale: 'es' | 'en') => `${locale === 'en' ? '/en' : ''}/projects/platform934/`;

async function ready(page: Page, locale: 'es' | 'en') {
  await page.goto(route(locale));
  await expect(page.locator('[data-ready="true"]')).toBeVisible();
  await expect(page.locator('[data-platform934]')).toBeVisible();
}

for (const locale of ['es', 'en'] as const) {
  test(`A6 Platform934 ${locale} has the locked product story`, async ({ page }) => {
    await ready(page, locale);
    await expect(page.locator('html')).toHaveAttribute('lang', locale);
    await expect(page.locator('h1')).toHaveText('Platform934');
    await expect(page.locator('.platform-card')).toHaveCount(5);
    await expect(page.locator('.platform-card')).toContainText(locale === 'es' ? ['Móvil', 'Web', 'TV Web', 'Google TV nativo', 'Flutter TV'] : ['Mobile', 'Web', 'TV Web', 'Native Google TV', 'Flutter TV']);
    await expect(page.locator('.platform-card').filter({ hasText: 'TV Web' })).toContainText('Preact');
    await expect(page.locator('.platform-card').filter({ hasText: 'TV Web' })).toContainText(/Preact/);
    await expect(page.locator('#native-tv')).toBeVisible();
    await expect(page.locator('#boundary')).toContainText('Jellyfin');
    await expect(page.locator('#api')).toContainText('.NET');
    await expect(page.locator('#api')).toContainText('Semantic Kernel');
    await expect(page.locator('#api')).toContainText('LiteLLM');
    for (const capability of locale === 'es' ? ['Crear listas', 'Modificar listas', 'Discusión de películas', 'Explicación de películas'] : ['Create lists', 'Modify lists', 'Film discussion', 'Film explanation']) await expect(page.locator('#agent')).toContainText(capability);
    await expect(page.locator('#agent')).toContainText(locale === 'es' ? 'IMPLEMENTADO' : 'IMPLEMENTED');
    await expect(page.locator('#agent')).toContainText(/MCP.*(not implemented|no está implementado)/i);
    for (const metric of ['~44–45 ms', '~144–146 ms', '0']) await expect(page.locator('#performance')).toContainText(metric);
    await expect(page.locator('#learnings li')).toHaveCount(5);
    await expect(page.locator('#product-ai')).toBeVisible();
    await expect(page.locator('#agentic-engineering')).toBeVisible();
    for (const status of locale === 'es' ? ['VALIDADO', 'IMPLEMENTADO', 'EN DESARROLLO', 'HISTÓRICO'] : ['VALIDATED', 'IMPLEMENTED', 'IN PROGRESS', 'HISTORICAL']) await expect(page.locator('#status')).toContainText(status);
    await expect(page.locator('#relations')).not.toContainText(/Domingo Alonso|vehicle-read-model|testing-infrastructure/);
  });
}

test('A6 direct navigation, locale history and required accessibility work', async ({ page }) => {
  await ready(page, 'en');
  await page.getByRole('link', { name: 'Español' }).click();
  await expect(page).toHaveURL(route('es'));
  await page.goBack(); await expect(page).toHaveURL(route('en'));
  const result = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21aa']).analyze();
  expect(result.violations).toEqual([]);
});

test('A6 responsive pages do not overflow and expose no-JS content', async ({ page, browser }) => {
  for (const [width, height] of [[1440, 1000], [820, 1180], [390, 844], [320, 740]] as const) {
    await page.setViewportSize({ width, height }); await ready(page, 'es');
    expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(width);
  }
  const context = await browser.newContext({ javaScriptEnabled: false }); const noJs = await context.newPage();
  await noJs.goto(`http://127.0.0.1:${process.env.ANTONIOS_E2E_PORT ?? '4321'}${route('es')}`);
  await expect(noJs.locator('[data-platform934]')).toContainText('Platform934');
  await expect(noJs.locator('#landscape')).toBeVisible(); await expect(noJs.locator('#status')).toBeVisible();
  await context.close();
});

test('A6 writes the committed QA screenshots', async ({ page }) => {
  await mkdir(screenshotDirectory, { recursive: true });
  const capture = async (locale: 'es' | 'en', file: string, width: number, height: number, anchor?: string) => { await page.setViewportSize({ width, height }); await ready(page, locale); if (anchor) await page.locator(anchor).scrollIntoViewIfNeeded(); await page.screenshot({ path: `${screenshotDirectory}/${file}`, fullPage: true }); };
  await capture('es', '01-platform934-es-desktop.png', 1440, 1000);
  await capture('en', '02-platform934-en-desktop.png', 1440, 1000);
  await capture('es', '03-platform934-architecture-es.png', 1440, 1000, '#landscape');
  await capture('es', '04-platform934-native-tv-es.png', 1440, 1000, '#native-tv');
  await capture('es', '05-platform934-agent-es.png', 1440, 1000, '#agent');
  await capture('es', '06-platform934-mobile-es.png', 390, 844);
  await capture('es', '07-platform934-tablet-es.png', 820, 1180);
});
