import { test, expect } from '@playwright/test';
import { completeEvent, newGame, selectChapter } from '../../src/arcade/engine';
import { mapWalkable } from '../../src/arcade/pixel-map';
import { makeCompanyMap } from '../../src/arcade/company-scenes';

test.use({ launchOptions: { args: ['--enable-unsafe-swiftshader'] } });

test('native keys prioritize the latest direction and release cleanly', async ({ page }) => {
  test.setTimeout(60000);
  const state = { ...selectChapter(newGame(), 'xul'), cleared: ['freelance'], timed: false };
  await page.addInitScript(save => localStorage.setItem('antonios:career:v1', save), JSON.stringify(state));
  await page.goto('/en/arcade/'); await page.locator('.arcade-launcher button').click(); await page.locator('[data-chapter="xul"]').click();
  const world = page.locator('.godot-world'), canvas = page.frameLocator('.godot-frame').locator('canvas');
  await expect(world).toHaveAttribute('data-engine', 'ready', { timeout: 60000 });
  const position = async () => (await world.getAttribute('data-player'))!.split(',').map(Number);
  await canvas.focus(); await page.keyboard.down('ArrowDown');
  await expect.poll(async () => (await position())[1]).toBeGreaterThanOrEqual(8);
  await page.keyboard.down('ArrowRight');
  await expect.poll(async () => (await position())[0]).toBeGreaterThanOrEqual(5);
  await page.keyboard.up('ArrowRight'); await page.keyboard.up('ArrowDown');
  await page.waitForTimeout(200);
  const stopped = await position();
  expect(mapWalkable(makeCompanyMap('xul', 'en', 'XUL'), stopped[0], stopped[1])).toBe(true);
  await page.waitForTimeout(300); expect(await position()).toEqual(stopped);
  await page.getByRole('button', { name: 'Pause', exact: true }).click();
  await page.keyboard.down('ArrowLeft'); await page.keyboard.up('ArrowLeft');
  await page.locator('.career-paused button').click();
  await page.waitForTimeout(300); expect(await position()).toEqual(stopped);
});

test('interior animation freezes for reduced motion and resumes with no scene reload', async ({ page }) => {
  test.setTimeout(60000);
  const state = { ...completeEvent(newGame(), 'freelance'), timed: false };
  await page.addInitScript(save => localStorage.setItem('antonios:career:v1', save), JSON.stringify(state));
  await page.emulateMedia({ reducedMotion: 'no-preference' });
  await page.goto('/arcade/'); await page.locator('.arcade-launcher button').click(); await page.locator('[data-chapter="freelance"]').click();
  const world = page.locator('.godot-world'), canvas = page.frameLocator('.godot-frame').locator('canvas');
  await expect(world).toHaveAttribute('data-engine', 'ready', { timeout: 60000 });
  if (await world.getAttribute('data-zoom') === '2') await page.locator('.godot-zoom').click();
  await expect(page.locator('.godot-viewport')).toHaveAttribute('aria-busy', 'false');
  await page.waitForTimeout(400);
  const first = await canvas.screenshot(); await page.waitForTimeout(450);
  expect((await canvas.screenshot()).equals(first)).toBe(false);
  await page.emulateMedia({ reducedMotion: 'reduce' }); await page.waitForTimeout(250);
  const still = await canvas.screenshot(); await page.waitForTimeout(450);
  expect((await canvas.screenshot()).equals(still)).toBe(true);
  await page.locator('.career-scene').screenshot({ path: 'test-results/interior-polish.png' });
  await page.emulateMedia({ reducedMotion: 'no-preference' }); await page.waitForTimeout(450);
  expect((await canvas.screenshot()).equals(still)).toBe(false);
});

test('releasing an older touch does not cancel the new direction', async ({ page }) => {
  test.setTimeout(60000);
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/arcade/'); await page.locator('.arcade-launcher button').click();
  await page.getByRole('button', { name: 'Nueva partida', exact: true }).click();
  const world = page.locator('.godot-world');
  await expect(world).toHaveAttribute('data-engine', 'ready', { timeout: 60000 });
  const session = await page.context().newCDPSession(page);
  await page.locator('.career-dpad').scrollIntoViewIfNeeded();
  const east = await page.locator('.direction-right').boundingBox(), south = await page.locator('.direction-down').boundingBox();
  const a = { id: 1, x: east!.x + east!.width / 2, y: east!.y + east!.height / 2 }, b = { id: 2, x: south!.x + south!.width / 2, y: south!.y + south!.height / 2 };
  await session.send('Input.dispatchTouchEvent', { type: 'touchStart', touchPoints: [a] });
  await expect(page.locator('.direction-right')).toHaveClass(/is-held/);
  await expect.poll(async () => Number((await world.getAttribute('data-player'))!.split(',')[0])).toBeGreaterThan(4);
  await session.send('Input.dispatchTouchEvent', { type: 'touchStart', touchPoints: [a, b] });
  await expect(page.locator('.direction-down')).toHaveClass(/is-held/);
  await session.send('Input.dispatchTouchEvent', { type: 'touchEnd', touchPoints: [a] });
  await expect(page.locator('.direction-down')).toHaveClass(/is-held/);
  const y = Number((await world.getAttribute('data-player'))!.split(',')[1]);
  await expect.poll(async () => Number((await world.getAttribute('data-player'))!.split(',')[1])).toBeGreaterThan(y);
  await session.send('Input.dispatchTouchEvent', { type: 'touchEnd', touchPoints: [] });
  await expect(page.locator('.career-dpad .is-held')).toHaveCount(0);
  const stopped = await world.getAttribute('data-player'); await page.waitForTimeout(300);
  await expect(world).toHaveAttribute('data-player', stopped!);
});
