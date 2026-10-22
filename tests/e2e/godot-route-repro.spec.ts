import { test, expect } from '@playwright/test';
import { buildings } from '../../src/arcade/town';
import { clickCanvasPoint, clickCompanyObject, dumpGodotDebugBestEffort, enableGodotE2EDebug, unlockBefore, waitForGodotInteraction } from './career-fixture';

// Focused, single-route reproductions. Run either with --repeat-each=100 to
// preserve the bridge timeline for every failure without coupling it to the
// full campaign progression.
// Reproducciones focales de una sola ruta. Ejecútalas con --repeat-each=100
// para conservar la cronología del bridge de cada fallo sin acoplarla a toda
// la progresión de campaña.
test.use({ reducedMotion: 'reduce', launchOptions: { args: ['--enable-unsafe-swiftshader'] } });
test.beforeEach(async ({ page }) => enableGodotE2EDebug(page));
test.afterEach(async ({ page }, testInfo) => { if (testInfo.status !== testInfo.expectedStatus) await dumpGodotDebugBestEffort(page, testInfo, 'focused-route'); });

test('focused freelance terminal route keeps the pending interaction through every movement acknowledgement', async ({ page }) => {
  await page.goto('/en/arcade/');
  await page.getByRole('button', { name: 'ENTER', exact: false }).click();
  await page.locator('[data-chapter="freelance"]').click();
  await expect(page.locator('.godot-world')).toHaveAttribute('data-engine', 'ready', { timeout: 60_000 });
  await clickCompanyObject(page, 'freelance', 'terminal', true);
  await waitForGodotInteraction(page, 'terminal', 'Just change one button');
});

test('focused town signlab route records Godot dispatch and the React map transition', async ({ page }) => {
  await unlockBefore(page, 'signlab');
  await page.goto('/en/arcade/');
  await page.getByRole('button', { name: 'ENTER', exact: false }).click();
  await page.getByRole('button', { name: 'Continue', exact: true }).click();
  const world = page.locator('.godot-world');
  await expect(world).toHaveAttribute('data-map', 'town');
  await expect(world).toHaveAttribute('data-engine', 'ready', { timeout: 60_000 });
  const signlab = buildings.find(building => building.id === 'signlab')!;
  await clickCanvasPoint(page, { x: signlab.sign[0], y: signlab.sign[1] }, 'signlab');
  await expect(page.locator('.career-game-heading h1')).toContainText('Signlab', { timeout: 30_000 });
});
