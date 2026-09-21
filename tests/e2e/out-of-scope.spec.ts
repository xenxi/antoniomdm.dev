import { expect, test } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

test('publishes the unified bilingual Blog, article SEO, RSS and the AntoñiOS editor', async ({ page, request }) => {
  await page.goto('/blog/');
  await expect(page.getByRole('heading', { level: 1 })).toContainText('OUT OF');
  await expect(page.locator('.oos-claim')).toHaveText('Ideas que siguen ejecutándose cuando se cierra el ticket.');
  expect((await new AxeBuilder({ page }).analyze()).violations.filter(item => item.impact === 'critical' || item.impact === 'serious')).toEqual([]);
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute('href', 'https://antoniomdm.dev/blog/');
  await page.getByRole('link', { name: /La pregunta se queda/ }).first().click();
  await expect(page).toHaveURL(/\/blog\/la-pregunta-se-queda\/$/);
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute('href', 'https://antoniomdm.dev/blog/la-pregunta-se-queda/');
  await expect(page.locator('link[hreflang="en"]')).toHaveAttribute('href', 'https://antoniomdm.dev/en/blog/the-question-remains/');
  await expect(page.locator('meta[property="og:type"]')).toHaveAttribute('content', 'article');
  await expect(page.locator('meta[property="og:description"]')).toHaveAttribute('content', /Cerrar una historia no siempre cierra la pregunta/);
  expect(await page.locator('script[type="application/ld+json"]').textContent()).toContain('BlogPosting');
  await expect(page.locator('.oos-scope')).toBeVisible();
  await expect(page.locator('.oos-block')).toHaveCount(0);
  await expect(page.locator('.oos-article__facts')).toContainText('3 min de lectura');
  await expect(page.locator('.oos-article__body > p').last()).toHaveText('La historia puede terminar sin llevarse la pregunta por delante.');
  await expect(page.locator('.oos-article')).not.toContainText('Seguir explorando.');
  await expect(page.locator('[data-ad-position]')).toHaveCount(0);
  expect((await new AxeBuilder({ page }).analyze()).violations.filter(item => item.impact === 'critical' || item.impact === 'serious')).toEqual([]);

  await page.goto('/en/blog/the-question-remains/');
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('The question remains');
  await expect(page.getByRole('link', { name: 'ES', exact: true })).toHaveAttribute('href', 'https://antoniomdm.dev/blog/la-pregunta-se-queda/');
  await expect(page.locator('.oos-article__body > p').last()).toHaveText('The story can end without taking the question with it.');

  const rss = await request.get('/blog/rss.xml');
  expect(rss.ok()).toBe(true);
  expect(await rss.text()).toContain('Cerrar una historia no siempre cierra la pregunta');

  const sitemap = await request.get('/sitemap.xml');
  expect(sitemap.ok()).toBe(true);
  const sitemapText = await sitemap.text();
  expect(sitemapText).toContain('/blog/la-pregunta-se-queda/');
  expect(sitemapText).toContain('/en/blog/the-question-remains/');

  await page.goto('/blog/app/');
  await expect(page.locator('[data-window="blog"]')).toBeVisible();
  await expect(page.locator('.blog-editor')).toBeVisible();
  const read = page.getByRole('link', { name: /Abrir artículo/ });
  await expect(read).toHaveAttribute('href', /utm_source=antonios.*utm_medium=portfolio.*utm_campaign=blog/);
});

test('keeps the editorial article readable on a narrow viewport', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/blog/la-pregunta-se-queda/');
  await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
  const body = await page.locator('body').evaluate(element => ({ scrollWidth: element.scrollWidth, clientWidth: element.clientWidth }));
  expect(body.scrollWidth).toBeLessThanOrEqual(body.clientWidth + 1);
});
