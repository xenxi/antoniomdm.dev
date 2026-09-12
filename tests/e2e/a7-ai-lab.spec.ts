import { test, expect, type Page } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import { getAiLabCases } from '../../src/data/aiLab';

test.use({ reducedMotion: 'reduce' });

const detailSlugs = ['platform934', 'incident-investigation', 'agentic-engineering'] as const;
const route = (locale: 'es' | 'en', slug?: string) => `${locale === 'en' ? '/en' : ''}/ai-lab/${slug ? `${slug}/` : ''}`;
const expected = (locale: 'es' | 'en', slug?: string) => getAiLabCases(locale).find(item => !slug || item.slug === slug)!;

async function ready(page: Page, path: string) {
  await page.goto(path);
  await expect(page.locator('[data-ready="true"]')).toBeVisible();
  await expect(page.locator('[data-ai-lab]')).toBeVisible();
}

for (const locale of ['es', 'en'] as const) {
  test(`A7 AI Lab landing ${locale} presents both axes and the locked hierarchy`, async ({ page }) => {
    await ready(page, route(locale));
    await expect(page.locator('html')).toHaveAttribute('lang', locale);
    await expect(page.locator('h1')).toHaveText(locale === 'es' ? 'IA aplicada con límites claros.' : 'Applied AI with explicit boundaries.');
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute('href', `https://antoniomdm.dev${route(locale)}`);
    await expect(page.locator('.ai-lab-axis')).toHaveCount(2);
    await expect(page.locator('.ai-lab-axis').first()).toContainText(locale === 'es' ? 'IA de producto' : 'Product AI');
    await expect(page.locator('.ai-lab-axis').nth(1)).toContainText(locale === 'es' ? 'Ingeniería agéntica' : 'Agentic Engineering');
    await expect(page.locator('.ai-lab-feature')).toContainText(locale === 'es' ? 'Investigación asistida de incidencias' : 'AI-assisted incident investigation');
    await expect(page.locator('.ai-lab-history')).toHaveCount(2);
    await expect(page.locator('.ai-lab-historical')).toContainText(locale === 'es' ? 'Antes de los LLM' : 'Before LLMs');
    await expect(page.locator('.ai-lab-principles li')).toHaveCount(7);
    await expect(page.locator('.ai-lab-boundaries')).toContainText(locale === 'es' ? 'Sin RAG' : 'No RAG');
    await expect(page.locator('.ai-lab-boundaries')).toContainText(locale === 'es' ? 'Sin MCP' : 'No MCP');
    await expect(page.locator('.ai-lab-boundaries')).toContainText(locale === 'es' ? 'Sin desarrollo autónomo' : 'No autonomous software development');
  });

  for (const slug of detailSlugs) {
    test(`A7 ${locale} direct route renders the ${slug} case`, async ({ page }) => {
      await ready(page, route(locale, slug));
      const item = expected(locale, slug);
      await expect(page.locator('[data-ai-lab-case]')).toHaveAttribute('data-ai-lab-case', item.id);
      await expect(page.locator('.ai-lab-case-header h1')).toHaveText(item.title);
      await expect(page.locator('link[rel="canonical"]')).toHaveAttribute('href', `https://antoniomdm.dev${route(locale, slug)}`);
      await expect(page.locator('.back-link')).toHaveAttribute('href', locale === 'es' ? '/ai-lab/' : '/en/ai-lab/');
    });
  }
}

test('A7 Platform934 deep AI case exposes the bounded product AI architecture', async ({ page }) => {
  await ready(page, route('en', 'platform934'));
  const item = expected('en', 'platform934');
  await expect(page.locator('.ai-lab-case-header h1')).toHaveText(item.title);
  await expect(page.locator('.ai-lab-architecture-group')).toHaveCount(3);
  await expect(page.locator('.ai-lab-diagram')).toContainText('Semantic Kernel');
  await expect(page.locator('.ai-lab-diagram')).toContainText('LiteLLM');
  await expect(page.locator('.ai-lab-diagram')).toContainText('Jellyfin');
  await expect(page.locator('.ai-lab-capability-grid article')).toHaveCount(item.capabilities.length);
  await expect(page.locator('.ai-lab-capability-grid')).toContainText('Gated notify_playback');
  await expect(page.locator('.ai-lab-capability-grid')).toContainText('Recommendations');
  await expect(page.locator('#taste')).toContainText('not a trained recommendation model');
  await expect(page.locator('#playback')).toContainText('not autonomous or backend-started playback');
  await expect(page.locator('.ai-lab-non-claims')).toContainText('No RAG');
  await expect(page.locator('.ai-lab-non-claims')).toContainText('No MCP');
  await expect(page.locator('.ai-lab-non-claims')).toContainText(/No autonomous agent/);
  await expect(page.locator('text=Semantic Kernel').first()).toBeVisible();
});

test('A7 professional incident case stays anonymized and provider/framework-neutral', async ({ page }) => {
  await ready(page, route('en', 'incident-investigation'));
  await expect(page.locator('.ai-lab-flow li')).toHaveCount(7);
  await expect(page.locator('.ai-lab-flow')).toContainText('traceId');
  await expect(page.locator('.ai-lab-flow')).toContainText('Communication / human decision');
  await expect(page.locator('.ai-lab-case')).toContainText('supervised engineering workflow');
  await expect(page.locator('.ai-lab-case')).toContainText('no autonomous production remediation');
  const body = await page.locator('.ai-lab-case').innerText();
  expect(body).not.toMatch(/Semantic Kernel|LiteLLM|LangChain|LangGraph|AutoGen|OpenAI/);
  expect(body).not.toMatch(/Domingo Alonso/);
  await expect(page.locator('.ai-lab-non-claims')).toContainText('No named professional framework or provider');
});

test('A7 agentic engineering practice shows the disciplined workflow and verification lanes', async ({ page }) => {
  await ready(page, route('en', 'agentic-engineering'));
  await expect(page.locator('.ai-lab-flow li')).toHaveCount(6);
  await expect(page.locator('.ai-lab-flow')).toContainText('Evidence lock');
  await expect(page.locator('.ai-lab-flow')).toContainText('Versioned exact SHA');
  await expect(page.locator('.ai-lab-capability-grid article')).toHaveCount(7);
  await expect(page.locator('.ai-lab-capability-grid')).toContainText('Accessibility');
  await expect(page.locator('.ai-lab-capability-grid')).toContainText('No-JS');
  await expect(page.locator('.ai-lab-non-claims')).toContainText('Not autonomous software development');
  const body = await page.locator('.ai-lab-case').innerText();
  expect(body).not.toMatch(/fully autonomous|autonomous software development is/i);
});

test('A7 AI Lab opens as an app, reopens after closing and restores history', async ({ page }) => {
  await page.goto('/en/'); await expect(page.locator('[data-ready="true"]')).toBeVisible();
  await page.locator('[data-desktop-app="lab"]').click();
  const win = page.locator('[data-window="lab"]');
  await expect(win).toHaveClass(/active/); await expect(page).toHaveURL(/\/en\/ai-lab\/$/);
  await page.getByRole('button', { name: 'Close AI Lab' }).click();
  await expect(win).toHaveCount(0);
  await page.locator('[data-desktop-app="lab"]').dblclick();
  await expect(win).toBeVisible();
  await page.locator('.ai-lab-axis').first().click();
  await expect(page).toHaveURL(/\/en\/ai-lab\/platform934\/$/);
  await expect(page.locator('.ai-lab-case-header h1')).toHaveText(expected('en', 'platform934').title);
  await page.goBack(); await expect(page).toHaveURL(/\/en\/ai-lab\/$/);
  await page.goForward(); await expect(page).toHaveURL(/\/en\/ai-lab\/platform934\/$/);
});

test('A7 AI Lab switches locale while keeping the page', async ({ page }) => {
  await ready(page, route('en', 'agentic-engineering'));
  await page.getByRole('link', { name: 'Español' }).click();
  await expect(page).toHaveURL(/\/ai-lab\/agentic-engineering\/$/);
  await expect(page.locator('html')).toHaveAttribute('lang', 'es');
  await expect(page.locator('.ai-lab-case-header h1')).toHaveText(expected('es', 'agentic-engineering').title);
  await page.goBack(); await expect(page).toHaveURL(/\/en\/ai-lab\/agentic-engineering\/$/);
});

test('A7 AI Lab is keyboard operable with visible focus', async ({ page }) => {
  await ready(page, route('en'));
  const axis = page.locator('.ai-lab-axis').first();
  await axis.focus(); await expect(axis).toBeFocused();
  await page.keyboard.press('Enter');
  await expect(page).toHaveURL(/\/en\/ai-lab\/platform934\/$/);
  const back = page.locator('.back-link');
  await back.focus(); await expect(back).toBeFocused();
});

test('A7 AI Lab does not overflow horizontally at target sizes', async ({ page }) => {
  for (const [width, height] of [[1440, 900], [768, 1024], [390, 844]] as const) {
    await page.setViewportSize({ width, height });
    await ready(page, route('es'));
    expect(await page.evaluate(() => document.documentElement.scrollWidth), `landing ${width}`).toBeLessThanOrEqual(width);
    for (const slug of detailSlugs) {
      await ready(page, route('es', slug));
      expect(await page.evaluate(() => document.documentElement.scrollWidth), `${slug} ${width}`).toBeLessThanOrEqual(width);
    }
  }
});

test('A7 AI Lab passes Axe on landing and cases', async ({ page }) => {
  for (const path of [route('es'), ...detailSlugs.map(slug => route('es', slug)), route('en'), route('en', 'platform934')]) {
    await ready(page, path);
    const result = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21aa']).analyze();
    expect(result.violations, path).toEqual([]);
  }
});

test('A7 AI Lab exposes core content without JavaScript', async ({ browser }) => {
  const context = await browser.newContext({ javaScriptEnabled: false });
  const page = await context.newPage();
  const base = `http://127.0.0.1:${process.env.ANTONIOS_E2E_PORT ?? '4321'}`;
  for (const locale of ['es', 'en'] as const) {
    await page.goto(`${base}${route(locale)}`);
    await expect(page.locator('[data-ai-lab]')).toBeVisible();
    await expect(page.locator('h1')).toHaveText(locale === 'es' ? 'IA aplicada con límites claros.' : 'Applied AI with explicit boundaries.');
    await expect(page.locator('.ai-lab-axis')).toHaveCount(2);
    await expect(page.locator('.ai-lab-history')).toHaveCount(2);
    for (const slug of detailSlugs) {
      await page.goto(`${base}${route(locale, slug)}`);
      await expect(page.locator('[data-ai-lab-case]')).toHaveAttribute('data-ai-lab-case', expected(locale, slug).id);
    }
  }
  await context.close();
});
