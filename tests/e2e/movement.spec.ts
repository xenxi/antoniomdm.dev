import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

test.use({ reducedMotion: 'no-preference', launchOptions: { args: ['--enable-unsafe-swiftshader'] } });
for (const engine of ['desktop', 'mobile']) test(`${engine}: animated continuous walking, map shortcut, touch hold and interruption`, async ({ page }) => {
  test.setTimeout(60000);
  const errors: string[] = []; page.on('pageerror', e => errors.push(e.message));
  await page.goto('/arcade/'); await expect(page.locator('[data-ready="true"]')).toBeVisible();
  await page.locator('.arcade-launcher button').click();
  await page.getByRole('button', { name: 'Nueva partida', exact: false }).click();
  const world = page.locator('.godot-world');
  await expect(world).toHaveAttribute('data-engine', 'ready', { timeout: 60000 });
  await expect(world).toHaveAttribute('data-zoom', '1');
  const canvas = page.frameLocator('.godot-frame').locator('canvas');
  await canvas.focus(); await page.keyboard.down('ArrowRight');
  await expect.poll(async () => Number((await world.getAttribute('data-player'))!.split(',')[0])).toBeGreaterThanOrEqual(7);
  await page.keyboard.up('ArrowRight');
  // Allow the last acknowledged step to settle, then verify release stops walking.
  await page.waitForTimeout(180); const stopped = await world.getAttribute('data-player');
  await page.waitForTimeout(240); await expect(world).toHaveAttribute('data-player', stopped!);
  await canvas.press('m'); await expect(world).toHaveAttribute('data-zoom', '2');
  await canvas.press('m'); await expect(world).toHaveAttribute('data-zoom', '1');
  const east = page.getByRole('button', { name: 'Caminar al este', exact: true });
  await east.scrollIntoViewIfNeeded();
  const box = (await east.boundingBox())!, before = Number(stopped!.split(',')[0]);
  await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2); await page.mouse.down();
  await expect.poll(async () => Number((await world.getAttribute('data-player'))!.split(',')[0])).toBeGreaterThanOrEqual(before + 2);
  await page.mouse.up();
  await page.getByRole('button', { name: 'Pausar', exact: true }).click();
  const paused = await world.getAttribute('data-player'); await page.keyboard.press('ArrowDown');
  await expect(world).toHaveAttribute('data-player', paused!);
  await page.locator('.career-paused button').click();
  await expect(world).toHaveAttribute('data-player', paused!);
  await page.locator('.career-world').evaluate(el => { el.scrollTop = 0; });
  await page.screenshot({ path: `test-results/job-route-playing-${engine}.png`, fullPage: true });
  if (engine === 'mobile') {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.screenshot({ path: 'test-results/job-route-mobile.png', fullPage: true });
    expect(await page.locator('.career-world').evaluate(el => el.scrollWidth <= el.clientWidth)).toBe(true);
  }
  expect((await new AxeBuilder({ page }).include('.career-world').withTags(['wcag2a', 'wcag2aa', 'wcag21aa']).analyze()).violations).toEqual([]);
  expect(errors).toEqual([]);
});
