import { test, expect, type Page } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import { mkdir } from 'node:fs/promises';
import { getArchitectureCases } from '../../src/data/professional';

test.use({ reducedMotion: 'reduce' });

const screenshotDirectory = 'test-results/a5';
const ids = ['vehicle-read-model', 'testing-infrastructure', 'event-summaries', 'legacy-modernization', 'service-boundaries-and-ddd', 'incident-diagnosis-agent'] as const;
const route = (locale: 'es' | 'en', id?: string) => `${locale === 'en' ? '/en' : ''}/architecture/${id ? `${id}/` : ''}`;

async function ready(page: Page, path: string) {
  await page.goto(path);
  await expect(page.locator('[data-ready="true"]')).toBeVisible();
  await expect(page.locator('[data-window="architecture"]')).toBeVisible();
}

for (const locale of ['es', 'en'] as const) {
  test(`A5 architecture index opens in ${locale} with the complete decision map`, async ({ page }) => {
    await ready(page, route(locale));
    await expect(page.locator('html')).toHaveAttribute('lang', locale);
    await expect(page.locator('.architecture-card')).toHaveCount(6);
    const expected = getArchitectureCases(locale);
    await expect(page.locator('.architecture-card h3')).toHaveText(expected.map(item => item.title));
    await expect(page.locator('.architecture-index')).toContainText(locale === 'es' ? 'La arquitectura es una secuencia continua de decisiones.' : 'Architecture is a continuous sequence of decisions.');
  });

  for (const id of ids) {
    test(`A5 ${locale} direct route renders ${id}`, async ({ page }) => {
      await ready(page, route(locale, id));
      const expected = getArchitectureCases(locale).find(item => item.id === id)!;
      await expect(page.locator('[data-architecture-case]')).toHaveAttribute('data-architecture-case', id);
      await expect(page.locator('.case-header h1')).toHaveText(expected.title);
      await expect(page.locator('#context, #problem, #decision, #tradeoffs, #result, #learning')).toHaveCount(6);
      await expect(page.locator('.architecture-relations')).toBeVisible();
      await expect(page.locator('.architecture-diagram')).toHaveAttribute('aria-labelledby', `${id}-diagram-title`);
      await expect(page.locator('.architecture-diagram')).toHaveAttribute('aria-describedby', `${id}-diagram-description`);
    });
  }
}

test('A5 index, case, locale and browser history navigation work', async ({ page }) => {
  await ready(page, route('en'));
  await page.locator('.architecture-card').first().click();
  await expect(page).toHaveURL(route('en', 'vehicle-read-model'));
  await expect(page.locator('.case-header h1')).toHaveText('Vehicle read model');
  await page.getByRole('link', { name: 'Español' }).click();
  await expect(page).toHaveURL(route('es', 'vehicle-read-model'));
  await expect(page.locator('.case-header h1')).toHaveText('Modelo de lectura de vehículos');
  await page.goBack();
  await expect(page).toHaveURL(route('en', 'vehicle-read-model'));
  await page.goBack();
  await expect(page).toHaveURL(route('en'));
  await page.goForward();
  await expect(page).toHaveURL(route('en', 'vehicle-read-model'));
});

test('A5 case relations resolve to experience, competency and achievement anchors', async ({ page }) => {
  await ready(page, route('es', 'testing-infrastructure'));
  const relations = page.locator('.architecture-relations');
  await relations.getByRole('link', { name: 'Domingo Alonso Group' }).click();
  await expect(page).toHaveURL(/\/experience\/#domingo-alonso$/);
  await expect(page.locator('#domingo-alonso')).toBeVisible();
  await ready(page, route('es', 'testing-infrastructure'));
  await page.locator('.architecture-relations').getByRole('link', { name: 'Testing / Ingeniería de calidad' }).click();
  await expect(page).toHaveURL(/\/profile\/competencies\/#testing-quality$/);
  await expect(page.locator('#testing-quality')).toBeVisible();
  await ready(page, route('es', 'testing-infrastructure'));
  await page.locator('.architecture-relations').getByRole('link', { name: 'Feedback de la suite de integración' }).click();
  await expect(page).toHaveURL(/\/profile\/achievements\/#integration-suite-feedback$/);
  await expect(page.locator('#integration-suite-feedback')).toBeVisible();
});

test('A5 content safety keeps every claim inside the editorial lock', async ({ page }) => {
  await ready(page, route('es', 'vehicle-read-model'));
  const vehicle = page.locator('.architecture-case');
  await expect(vehicle).toContainText('Outbox');
  await expect(vehicle).not.toContainText(/CQRS|Event Sourcing|Kafka|Service Bus|Redis|Elasticsearch|réplica/i);
  await expect(vehicle).not.toContainText(/\d+\s*(?:%|ms|segundos|seconds)/i);

  await ready(page, route('es', 'testing-infrastructure'));
  const testing = page.locator('.architecture-case');
  await expect(testing).toContainText('~60 minutos'); await expect(testing).toContainText('~2 minutos');
  await expect(testing).toContainText('valores aproximados'); await expect(testing).not.toContainText(/30\s*[×x]/i);

  await ready(page, route('en', 'event-summaries'));
  const events = page.locator('.architecture-case');
  await expect(events).toContainText('~1–2 synchronous API calls');
  await expect(events).toContainText('per relevant event'); await expect(events).toContainText('affected integrations');
  await expect(events).not.toContainText(/globally reduced|platform-wide|all events became/i);

  await ready(page, route('en', 'legacy-modernization'));
  const legacy = page.locator('.architecture-case');
  await expect(legacy).toContainText('recurring practice');
  await expect(legacy).not.toContainText(/\d+\s*(?:%|lines|minutes|hours)/i);
  await expect(legacy).toContainText('No mechanism is mandatory');
});

test('A5 diagrams expose conceptual labels without horizontal overflow', async ({ page }) => {
  for (const [width, height] of [[1440, 1000], [820, 1180], [390, 844], [320, 740]] as const) {
    await page.setViewportSize({ width, height });
    for (const id of ids) {
      await ready(page, route('es', id));
      await expect(page.locator('.architecture-diagram figcaption')).toBeVisible();
      expect(await page.evaluate(() => document.documentElement.scrollWidth), `${id} at ${width}`).toBeLessThanOrEqual(width);
    }
  }
});

test('A5 Axe checks pass on the index and required case pages', async ({ page }) => {
  for (const path of [route('es'), ...ids.map(id => route('es', id)), route('en', 'event-summaries')]) {
    await ready(page, path);
    const result = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21aa']).analyze();
    expect(result.violations, path).toEqual([]);
  }
});

test('A5 no-JS routes expose every index and case in both locales', async ({ browser }) => {
  const context = await browser.newContext({ javaScriptEnabled: false });
  const page = await context.newPage();
  const base = `http://127.0.0.1:${process.env.ANTONIOS_E2E_PORT ?? '4321'}`;
  for (const locale of ['es', 'en'] as const) {
    await page.goto(`${base}${route(locale)}`);
    await expect(page.locator('.architecture-card')).toHaveCount(6);
    for (const id of ids) {
      await page.goto(`${base}${route(locale, id)}`);
      await expect(page.locator('[data-architecture-case]')).toHaveAttribute('data-architecture-case', id);
      await expect(page.locator('#context')).toBeVisible(); await expect(page.locator('.architecture-relations')).toBeVisible();
    }
  }
  await context.close();
});

test('A5 writes the required visual QA screenshots', async ({ page }) => {
  await mkdir(screenshotDirectory, { recursive: true });
  const capture = async (path: string, file: string, width: number, height: number) => {
    await page.setViewportSize({ width, height }); await ready(page, path); await page.screenshot({ path: `${screenshotDirectory}/${file}`, fullPage: true });
  };
  await capture(route('es'), '01-architecture-index-es-desktop.png', 1440, 1000);
  await capture(route('es', 'vehicle-read-model'), '02-vehicle-read-model-es-desktop.png', 1440, 1000);
  await capture(route('es', 'testing-infrastructure'), '03-testing-infrastructure-es-desktop.png', 1440, 1000);
  await capture(route('es', 'event-summaries'), '04-event-summaries-es-desktop.png', 1440, 1000);
  await capture(route('es', 'legacy-modernization'), '05-legacy-modernization-es-desktop.png', 1440, 1000);
  await capture(route('en'), '06-architecture-index-en-desktop.png', 1440, 1000);
  await capture(route('es', 'vehicle-read-model'), '07-vehicle-read-model-mobile-es.png', 390, 844);
  await capture(route('es', 'event-summaries'), '08-event-summaries-mobile-es.png', 390, 844);
  await capture(route('es', 'legacy-modernization'), '09-legacy-modernization-tablet-es.png', 820, 1180);
});
