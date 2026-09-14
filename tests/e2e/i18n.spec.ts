import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
test.use({ reducedMotion: 'reduce' });

test('Spanish default, language switching, navigation and reading view', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('[data-ready="true"]')).toBeVisible();
  await expect(page).toHaveURL(/\/$/);
  await expect(page.locator('html')).toHaveAttribute('lang', 'es');
  await expect(page.getByRole('region', { name: 'Ventana de Perfil' })).toBeVisible();
  await expect(page.locator('.professional-actions').getByRole('link', { name: 'Proyectos', exact: true })).toBeVisible();
  await page.locator('.professional-actions').getByRole('link', { name: 'Experiencia', exact: true }).click();
  await expect(page).toHaveURL(/\/experience\/$/);
  await expect(page.getByRole('heading', { name: 'Mi recorrido hasta hoy.' })).toBeVisible();
  await expect(page.locator('link[hreflang="en"]')).toHaveAttribute('href', 'https://antoniomdm.dev/en/experience/');
  await page.getByRole('link', { name: 'English', exact: true }).click();
  await expect(page).toHaveURL(/\/en\/experience\/$/);
  await expect(page.locator('html')).toHaveAttribute('lang', 'en');
  await expect(page.getByRole('heading', { name: 'The journey so far.' })).toBeVisible();
  await page.locator('[data-desktop-app="projects"]').click();
  await page.locator('.project-card').click();
  await expect(page).toHaveURL(/\/en\/projects\/platform934\/$/);
  await page.reload();
  await expect(page.locator('html')).toHaveAttribute('lang', 'en');
  await page.getByRole('link', { name: 'Español', exact: true }).click();
  await expect(page).toHaveURL(/\/projects\/platform934\/$/);
  await expect(page.getByRole('heading', { name: 'Decisiones y trade-offs' })).toBeVisible();
  await page.goto('/cv/?view=reading');
  await page.getByRole('link', { name: 'English', exact: true }).click();
  await expect(page).toHaveURL(/\/en\/cv\/\?view=reading$/);
  await expect(page.locator('html')).toHaveClass('reading');
  await expect(page.getByRole('link', { name: 'Text CV — English' })).toHaveAttribute('href', '/en/cv.txt');
});

test('both languages publish complete static HTML, notes, feeds and CVs', async ({ browser, request }) => {
  const context = await browser.newContext({ javaScriptEnabled: false });
  const page = await context.newPage();
  for (const locale of ['es', 'en']) {
    const prefix = locale === "en" ? "/en" : "";
    await page.goto(`http://127.0.0.1:${process.env.ANTONIOS_E2E_PORT ?? '4321'}${prefix}/experience/`);
    await expect(page.locator('html')).toHaveAttribute('lang', locale);
    await expect(page.locator('.timeline-item')).toHaveCount(9);
    await page.getByRole('link', { name: locale === 'es' ? 'English' : 'Español', exact: true }).click();
    await expect(page.locator('html')).toHaveAttribute('lang', locale === 'es' ? 'en' : 'es');
    await page.goto(`http://127.0.0.1:${process.env.ANTONIOS_E2E_PORT ?? '4321'}${prefix}/notes/os-foundation/`);
    await expect(page.getByRole('heading', { name: locale === 'es' ? 'Un portfolio, dos formas de explorar' : 'One portfolio, two ways to explore' })).toBeVisible();
    const cv = await (await request.get(`${prefix}/cv.txt`)).text();
    expect(cv).toContain(locale === 'es' ? 'título no obtenido' : 'degree not awarded');
    const rss = await (await request.get(`${prefix}/rss.xml`)).text();
    expect(rss).toContain(`<language>${locale}</language>`);
    expect(rss).toContain(`${prefix}/notes/os-foundation/`);
  }
  await context.close();
});

test('Spanish mobile layout and translated accessibility controls', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/');
  await expect(page.locator('[data-ready="true"]')).toBeVisible();
  await expect(page.getByRole('link', { name: 'English', exact: true })).toBeVisible();
  expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBe(390);
  expect((await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21aa']).analyze()).violations).toEqual([]);
  await page.locator('.professional-actions').getByRole('link', { name: 'Proyectos', exact: true }).click();
  await page.getByRole('button', { name: 'Minimizar Proyectos' }).click();
  await page.getByRole('button', { name: 'Restaurar Proyectos', exact: true }).click();
  await expect(page.locator('[data-window="projects"]')).toBeVisible();
  await page.screenshot({ path: 'test-results/spanish-mobile.png', fullPage: true });
});

test('canonical locale routes and Spanish compatibility documents preserve route state', async ({ page, request }) => {
  for (const path of ['/es/', '/en/', '/es/architecture/', '/en/architecture/', '/es/projects/platform934/', '/en/projects/platform934/']) {
    const response = await request.get(path); expect(response.status(), path).toBe(200);
  }
  const fallback = await (await request.get('/es/architecture/')).text();
  expect(fallback).toContain('noindex,follow');
  expect(fallback).toContain('https://antoniomdm.dev/architecture/');
  await page.goto('/es/projects/platform934/?source=legacy#overview');
  await expect(page).toHaveURL(/\/projects\/platform934\/\?source=legacy#overview$/);
  await expect(page.locator('[data-ready="true"]')).toBeVisible();
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute('href', 'https://antoniomdm.dev/projects/platform934/');
  await page.getByRole('link', { name: 'English', exact: true }).click();
  await expect(page).toHaveURL(/\/en\/projects\/platform934\/\?source=legacy#overview$/);
  await page.goto('/es/architecture/');
  await expect(page.getByRole('heading', { name: 'La arquitectura es una secuencia continua de decisiones.' })).toBeVisible();
  await page.goto('/en/architecture/');
  await expect(page.getByRole('heading', { name: 'Architecture is a continuous sequence of decisions.' })).toBeVisible();
});
