import { expect, test } from '@playwright/test';

test.use({ launchOptions: { args: ['--enable-unsafe-swiftshader'] } });
test('native town animates at rest and freezes every ambient layer on pause and reduced motion', async ({ page }) => {
  test.setTimeout(90_000);
  const errors: string[] = [];
  page.on('pageerror', error => errors.push(error.message));
  page.on('console', message => { if (message.type() === 'error') errors.push(message.text()); });
  await page.goto('/arcade/?nativeArcade=1');
  await expect(page.locator('[data-ready="true"]')).toBeVisible();
  await page.locator('.arcade-launcher button').click();
  await expect(page.locator('.native-arcade .godot-world')).toHaveAttribute('data-engine', 'ready', { timeout: 60_000 });
  const canvas = page.frameLocator('.godot-frame').locator('canvas');
  const command = (value: Record<string, unknown>) => page.locator('.godot-frame').evaluate((element, command) => {
    (element as HTMLIFrameElement).contentWindow!.postMessage({ channel: 'antonios:godot:v1', type: 'command', command }, location.origin);
  }, value);
  await page.waitForTimeout(1500);
  const moving = await canvas.screenshot();
  await page.waitForTimeout(600);
  expect((await canvas.screenshot()).equals(moving)).toBe(false);
  await canvas.screenshot({ path: 'test-results/living-town-native.png' });
  await command({ type: 'pause' });
  await page.waitForTimeout(250);
  const paused = await canvas.screenshot();
  await page.waitForTimeout(600);
  expect((await canvas.screenshot()).equals(paused)).toBe(true);
  await command({ type: 'configuration', reducedMotion: true });
  await command({ type: 'resume' });
  await page.waitForTimeout(250);
  const reduced = await canvas.screenshot();
  await page.waitForTimeout(600);
  expect((await canvas.screenshot()).equals(reduced)).toBe(true);
  expect(errors).toEqual([]);
});
