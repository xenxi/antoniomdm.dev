import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

for (const native of [false, true]) test(`character activities and coffee challenge (${native ? 'native' : 'published'} host)`, async ({ page }) => {
  test.setTimeout(90_000);
  const errors: string[] = [];
  page.on('pageerror', error => errors.push(error.message));
  await page.goto(`/en/arcade/${native ? '?nativeArcade=1' : ''}`);
  await expect(page.locator('[data-ready="true"]')).toBeVisible();
  await page.locator('.arcade-launcher button').click();
  if (!native) await page.getByRole('button', { name: 'New game', exact: false }).click();
  await expect(page.locator('.godot-world')).toHaveAttribute('data-engine', 'ready', { timeout: 60_000 });
  const activities = page.locator('.character-activities');
  await activities.locator('summary').click();
  await activities.getByRole('button', { name: 'Play guitar', exact: true }).click();
  await expect(activities.getByRole('button', { name: 'Play guitar', exact: true })).toHaveAttribute('aria-pressed', 'true');
  await page.locator('.godot-frame').screenshot({ path: `test-results/guitar-${native ? 'native' : 'published'}.png` });
  for (let cup = 1; cup <= 3; cup++) {
    const drink = activities.getByRole('button', { name: 'Drink coffee', exact: true });
    await expect(drink).toBeEnabled();
    await drink.click();
    await expect(activities.locator('h2')).toContainText(`${cup} / 3`);
  }
  await activities.getByRole('checkbox').check();
  await activities.getByRole('button', { name: 'Start challenge', exact: true }).click();
  await expect(activities.locator('.coffee-challenge')).toHaveAttribute('data-phase', 'playing');
  await expect(activities).toContainText('Relaxed mode');
  for (let hit = 1; hit <= 5; hit++) {
    // Use distinct deliberate presses, beyond the engine's repeat guard.
    await page.waitForTimeout(300);
    await activities.getByRole('button', { name: 'Capture moment', exact: true }).click();
    if (hit < 5) await expect(activities).toContainText(`Hits: ${hit} / 5`);
  }
  await expect(activities.getByRole('status')).toContainText('Five moments!');
  await activities.getByRole('checkbox').uncheck();
  await activities.getByRole('button', { name: 'Start challenge', exact: true }).click();
  await expect(activities).toContainText('The world slows down');
  await activities.getByRole('button', { name: 'Leave challenge', exact: true }).click();
  await expect(activities.locator('.coffee-challenge')).toHaveAttribute('data-phase', 'ready');
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await activities.getByRole('button', { name: 'Start challenge', exact: true }).click();
  await expect(activities).toContainText('Relaxed mode');
  expect((await new AxeBuilder({ page }).include('.character-activities').withTags(['wcag2a', 'wcag2aa', 'wcag21aa']).analyze()).violations).toEqual([]);
  expect(errors).toEqual([]);
});
