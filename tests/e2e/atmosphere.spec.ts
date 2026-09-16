import { clickCompanyObject, dumpGodotDebug, enableGodotE2EDebug } from './career-fixture';
import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

test.use({ launchOptions: { args: ['--enable-unsafe-swiftshader'] } });
test.beforeEach(async ({ page }) => enableGodotE2EDebug(page));
test.afterEach(async ({ page }, testInfo) => { if (testInfo.status !== testInfo.expectedStatus) await dumpGodotDebug(page, testInfo); });
test('Godot ambience animates water, pauses gameplay and obeys live reduced-motion changes', async ({ page }) => {
  test.setTimeout(90000);
  const errors: string[] = [];
  page.on('pageerror', error => errors.push(error.message));
  page.on('console', message => { if (message.type() === 'error') errors.push(message.text()); });
  await page.goto('/arcade/');
  await page.locator('.arcade-launcher button').click();
  await page.getByRole('button', { name: 'Nueva partida', exact: true }).click();
  const world = page.locator('.godot-world'), canvas = page.frameLocator('.godot-frame').locator('canvas');
  await expect(world).toHaveAttribute('data-engine', 'ready', { timeout: 60000 });
  await expect(world).toHaveAttribute('data-player', '4,6');
  const box = (await canvas.boundingBox())!;
  const fountain = () => page.screenshot({ clip: { x: box.x + 279 / 480 * box.width, y: box.y + 150 / 320 * box.height, width: 41 / 480 * box.width, height: 39 / 320 * box.height } });
  // Read actual rendered pixels: the pond must change while the player stands still.
  const first = await fountain(); await page.waitForTimeout(350);
  expect((await fountain()).equals(first)).toBe(false);
  // Closed shutters stay fixed while the rest of the scene animates.
  const shutter = () => page.screenshot({ clip: { x: box.x + 216 / 480 * box.width, y: box.y + 78 / 320 * box.height, width: 6 / 480 * box.width, height: 9 / 320 * box.height } });
  const closed = await shutter(); await page.waitForTimeout(350);
  expect((await shutter()).equals(closed)).toBe(true);
  await page.getByRole('button', { name: 'Pausar', exact: true }).click();
  await expect(world).toBeHidden();
  await page.keyboard.press('ArrowRight');
  await expect(world).toHaveAttribute('data-player', '4,6');
  await page.locator('.career-paused button').click();
  await page.emulateMedia({ reducedMotion: 'reduce' }); await page.waitForTimeout(300);
  const reduced = await canvas.screenshot(); await page.waitForTimeout(350);
  expect((await canvas.screenshot()).equals(reduced)).toBe(true);
  await page.emulateMedia({ reducedMotion: 'no-preference' }); await page.waitForTimeout(250);
  const resumed = await fountain(); await page.waitForTimeout(350);
  expect((await fountain()).equals(resumed)).toBe(false);
  await world.screenshot({ path: 'test-results/living-town.png' });
  expect(errors).toEqual([]);
});

for (const locale of ['es', 'en']) test(`hiring requirements ${locale}: inspect locked jobs, resume training, retain earned progress`, async ({ page }) => {
  test.setTimeout(60000);
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto(locale === 'es' ? '/arcade/' : '/en/arcade/');
  await page.locator('.arcade-launcher button').click();
  await page.getByRole('button', { name: locale === 'es' ? 'Nueva partida' : 'New game', exact: true }).click();
  const world = page.locator('.godot-world');
  await expect(world).toHaveAttribute('data-engine', 'ready', { timeout: 60000 });
  await page.locator('.job-shortcuts button').filter({ hasText: locale === 'es' ? 'Trabajos' : 'Jobs' }).click();
  await page.getByRole('dialog').getByRole('button', { name: /XUL/ }).click();
  const dialog = page.getByRole('dialog');
  await expect(dialog).toContainText(locale === 'es' ? 'Aún no te contratan' : 'Not hired yet');
  await expect(dialog).toContainText(locale === 'es' ? 'Solo es cambiar un botón' : 'Just change one button');
  await expect(world).toHaveAttribute('data-map', 'town');
  expect((await new AxeBuilder({ page }).include('.career-dialog').withTags(['wcag2a', 'wcag2aa']).analyze()).violations).toEqual([]);
  await dialog.screenshot({ path: `test-results/hiring-${locale}.png` });
  await dialog.getByRole('button', { name: locale === 'es' ? 'Continuar mi preparación' : 'Continue my preparation', exact: false }).click();
  await expect(world).toHaveAttribute('data-map', 'freelance');
  // The glowing exclamation is clickable, not merely decoration.

  await clickCompanyObject(page, 'freelance', 'terminal', true);
  await expect(dialog).toContainText(locale === 'es' ? 'Solo es cambiar un botón' : 'Just change one button');
  // Inspect earned mission progress while the required event is still pending.
  // Freeze its timer explicitly instead of racing the 200ms event trigger.
  const clockStart = new Date('2026-09-14T00:00:00Z');
  await page.clock.install({ time: clockStart });
  await page.clock.pauseAt(new Date(clockStart.getTime() + 1000));
  await dialog.locator('[data-choice="button"]').click();
  await page.clock.runFor(150);
  await dialog.getByRole('button').last().click();
  await page.locator('.job-shortcuts button').filter({ hasText: locale === 'es' ? 'Trabajos' : 'Jobs' }).click();
  await page.clock.runFor(150);
  await dialog.getByRole('button', { name: /XUL/ }).click();
  await page.clock.runFor(150);
  await expect(dialog).toContainText(locale === 'es' ? 'Demostrado' : 'Demonstrated');
  await expect(dialog).toContainText(locale === 'es' ? 'Habilidades por demostrar' : 'Skills to demonstrate');
  await expect(dialog).toContainText(locale === 'es' ? 'Maquetación contra reloj' : 'Layout against the clock');
});
