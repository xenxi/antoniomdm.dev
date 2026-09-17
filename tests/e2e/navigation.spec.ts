import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

test.use({ reducedMotion: 'reduce' });

test('desktop status widget, keyboard hint and AntoñiOS branding are bilingual', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('[data-ready="true"]')).toBeVisible();
  const status = page.locator('.desktop-status');
  await expect(status).toBeVisible();
  await expect(status).toContainText('TODO FUNCIONA.');
  await expect(status).toContainText('No preguntes por qué...');
  await expect(status).toContainText('SYSTEM STATUS: PROBABLY FINE');
  const hint = page.locator('.desktop-hint');
  await expect(hint).toBeVisible();
  await expect(hint).toContainText('Abre una aplicación...');
  await expect(hint).toContainText('Ctrl + K');
  const brand = page.locator('.window-status .antonios-brand').first();
  await expect(brand.locator('.antonios-brand-base')).toHaveText('Antoñ');
  await expect(brand.locator('.antonios-brand-accent')).toHaveText('iOS');
  const accent = await brand.locator('.antonios-brand-accent').evaluate(element => getComputedStyle(element).color);
  const base = await brand.locator('.antonios-brand-base').evaluate(element => getComputedStyle(element).color);
  expect(accent).not.toBe(base);
  await page.goto('/en/');
  await expect(page.locator('[data-ready="true"]')).toBeVisible();
  await expect(page.locator('.desktop-status')).toContainText('EVERYTHING WORKS.');
  await expect(page.locator('.desktop-status')).toContainText("Don't ask why...");
  await expect(page.locator('.desktop-hint')).toContainText('Open an application...');
});

test('Ctrl+K opens the launcher and Escape respects overlay priority', async ({ page }) => {
  await page.goto('/en/');
  await expect(page.locator('[data-ready="true"]')).toBeVisible();
  const about = page.locator('[data-window="about"]');
  await expect(about).toBeVisible();
  await page.keyboard.press('Control+k');
  await expect(page.getByRole('region', { name: 'Application launcher' })).toBeVisible();
  await expect(page.getByRole('textbox', { name: 'Find an application' })).toBeFocused();
  await page.keyboard.press('Escape');
  await expect(page.getByRole('region', { name: 'Application launcher' })).toHaveCount(0);
  await expect(about).toBeVisible();
  await expect(about).toHaveClass(/active/);
});

test('arrow keys navigate inside the application launcher', async ({ page }) => {
  await page.goto('/en/');
  await expect(page.locator('[data-ready="true"]')).toBeVisible();
  await page.keyboard.press('Control+k');
  const search = page.getByRole('textbox', { name: 'Find an application' });
  await expect(search).toBeFocused();
  await page.keyboard.press('ArrowDown');
  const inList = () => page.evaluate(() => Boolean(document.activeElement?.closest('.launcher nav a')));
  expect(await inList()).toBe(true);
  const first = await page.evaluate(() => document.activeElement?.textContent?.trim());
  await page.keyboard.press('ArrowDown');
  expect(await inList()).toBe(true);
  const second = await page.evaluate(() => document.activeElement?.textContent?.trim());
  expect(second).not.toBe(first);
  await page.keyboard.press('ArrowUp');
  expect(await page.evaluate(() => document.activeElement?.textContent?.trim())).toBe(first);
  await page.locator('.launcher nav a').first().focus();
  await page.keyboard.press('ArrowRight');
  expect(await inList()).toBe(true);
  await search.focus();
  await page.keyboard.press('ArrowLeft');
  await expect(search).toBeFocused();
  await page.locator('.launcher nav a[href="/en/projects/"]').focus();
  await page.keyboard.press('Enter');
  await expect(page.locator('.launcher')).toHaveCount(0);
  await expect(page.locator('[data-window="projects"]')).toBeVisible();
});

test('arrow keys navigate the desktop and Enter opens the selected app', async ({ page }) => {
  await page.goto('/en/');
  await expect(page.locator('[data-ready="true"]')).toBeVisible();
  for (let attempts = 0; attempts < 6 && await page.locator('.window.active:not([hidden])').count(); attempts++) await page.keyboard.press('Escape');
  await expect(page.locator('.window.active')).toHaveCount(0);
  await page.locator('[data-desktop-app="about"]').focus();
  await page.keyboard.press('ArrowDown');
  await expect(page.locator('[data-desktop-app="background"]')).toBeFocused();
  await page.keyboard.press('ArrowDown');
  await expect(page.locator('[data-desktop-app="architecture"]')).toBeFocused();
  await page.keyboard.press('ArrowUp');
  await expect(page.locator('[data-desktop-app="background"]')).toBeFocused();
  await page.keyboard.press('ArrowDown');
  await page.keyboard.press('Enter');
  await expect(page.locator('[data-window="architecture"]')).toBeVisible();
  await expect(page).toHaveURL(/\/architecture\/$/);
});

test('an active window captures arrow navigation and keeps focus inside', async ({ page }) => {
  await page.goto('/en/architecture/');
  await expect(page.locator('[data-ready="true"]')).toBeVisible();
  const win = page.locator('[data-window="architecture"]');
  await expect(win).toHaveClass(/active/);
  await win.focus();
  await page.keyboard.press('ArrowDown');
  const inside = () => page.evaluate(() => Boolean(document.activeElement?.closest('[data-window="architecture"]')));
  expect(await inside()).toBe(true);
  const first = await page.evaluate(() => document.activeElement?.textContent?.trim().slice(0, 40));
  await page.keyboard.press('ArrowRight');
  expect(await inside()).toBe(true);
  const second = await page.evaluate(() => document.activeElement?.textContent?.trim().slice(0, 40));
  expect(second).not.toBe(first);
  for (const key of ['ArrowDown', 'ArrowLeft', 'ArrowUp', 'ArrowRight']) {
    await page.keyboard.press(key);
    expect(await inside()).toBe(true);
  }
});

test('Tab and inputs keep their native arrow behaviour', async ({ page }) => {
  await page.goto('/en/');
  await expect(page.locator('[data-ready="true"]')).toBeVisible();
  await page.locator('.brand').focus();
  await page.keyboard.press('Tab');
  await expect(page.locator('.system-menu button')).toBeFocused();
  await page.goto('/en/terminal/');
  await expect(page.locator('[data-ready="true"]')).toBeVisible();
  const input = page.getByRole('textbox', { name: 'Terminal command' });
  await input.fill('reboot');
  await input.press('Enter');
  await input.press('ArrowUp');
  await expect(input).toHaveValue('reboot');
  await expect(input).toBeFocused();
});

test('keyboard continues from the last clicked element and closing a window is safe', async ({ page }) => {
  const errors: string[] = [];
  page.on('pageerror', error => errors.push(error.message));
  await page.goto('/en/projects/');
  await expect(page.locator('[data-ready="true"]')).toBeVisible();
  const win = page.locator('[data-window="projects"]');
  const filter = page.getByRole('button', { name: 'All projects', exact: true });
  await filter.click();
  await expect(filter).toBeFocused();
  await page.keyboard.press('ArrowRight');
  expect(await page.evaluate(() => Boolean(document.activeElement?.closest('[data-window="projects"]')))).toBe(true);
  await page.getByRole('button', { name: 'Close Projects', exact: true }).click();
  await expect(win).toHaveCount(0);
  expect(errors).toEqual([]);
});

test('desktop overlays keep the page accessible', async ({ page }) => {
  await page.goto('/en/');
  await expect(page.locator('[data-ready="true"]')).toBeVisible();
  expect((await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21aa']).analyze()).violations).toEqual([]);
});
