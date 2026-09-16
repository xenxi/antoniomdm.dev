import { test, expect } from '@playwright/test';
import { chapters } from '../../src/arcade/campaign';
import { completeEvent, newGame, updateProgress } from '../../src/arcade/engine';
import { dumpGodotDebug, dumpGodotDebugBestEffort, enableGodotE2EDebug, traceDomClick, unlockBefore } from './career-fixture';

test.use({ reducedMotion: 'reduce', launchOptions: { args: ['--enable-unsafe-swiftshader'] } });
test.beforeEach(async ({ page }) => enableGodotE2EDebug(page));
test.afterEach(async ({ page }, testInfo) => { if (testInfo.status !== testInfo.expectedStatus) await dumpGodotDebugBestEffort(page, testInfo); });

test('clock pauses, expires, can be disabled and survives the language switch', async ({ page }, testInfo) => {
  const state = updateProgress(completeEvent(newGame(), 'freelance'), { mission: 1, remaining: 5 });
  await page.addInitScript(save => { if (!localStorage.getItem('antonios:career:v1')) localStorage.setItem('antonios:career:v1', save); }, JSON.stringify(state));
  await page.clock.install();
  await page.goto('/en/arcade/'); await page.getByRole('button', { name: 'ENTER', exact: false }).click();
  await page.locator('[data-chapter="freelance"]').click();
  await expect(page.locator('.godot-world')).toHaveAttribute('data-engine', 'ready', { timeout: 60000 });
  await page.clock.runFor(2000);
  await page.getByRole('button', { name: 'Pause', exact: true }).click();
  await expect(page.getByRole('heading', { name: 'Paused', exact: true })).toBeVisible();
  const before = await page.locator('.quest-clock > span').textContent();
  await page.clock.fastForward(60000);
  await expect(page.locator('.quest-clock > span')).toHaveText(before!);
  await page.getByRole('button', { name: 'Resume game', exact: true }).last().click();
  await page.locator('.career-quest-panel').getByRole('button', { name: 'Open terminal mission' }).click();
  await expect(page.getByRole('dialog')).toBeVisible();
  const energyBeforeTimeout = Number(await page.locator('.quest-resources meter').getAttribute('value'));
  await dumpGodotDebug(page, testInfo, 'timer-before-runFor');
  await page.clock.runFor(6000);
  await dumpGodotDebug(page, testInfo, 'timer-after-runFor');
  await expect(page.locator('[data-choice="responsive-1"]')).toBeDisabled();
  await expect.poll(async () => Number(await page.locator('.quest-resources meter').getAttribute('value'))).toBeLessThan(energyBeforeTimeout);
  await page.getByRole('dialog').getByRole('button', { name: 'No time limit', exact: true }).click();
  await page.locator('[data-choice="responsive-1"]').click();
  { const button = page.getByRole('button', { name: 'Return to mission', exact: true }); await traceDomClick(button, 'company-timer-return-to-mission'); await button.click(); }
  await page.locator('.career-world').getByRole('link', { name: 'Español', exact: true }).click();
  await expect(page).toHaveURL('/arcade/?career=continue');
  await expect(page.locator('.quest-timing-toggle input')).not.toBeChecked();
  await expect(page.locator('.chapter-missions .is-current')).toContainText('La entrega también se usa con teclado');
});

test('failed flat incidents lose their reward, persist and still resolve the scene', async ({ page }) => {
  const state = updateProgress(completeEvent(newGame(), 'freelance'), { mission: 1, energy: 100 });
  await page.addInitScript(save => { if (!localStorage.getItem('antonios:career:v1')) localStorage.setItem('antonios:career:v1', save); }, JSON.stringify({ ...state, timed: false }));
  await page.goto('/en/arcade/'); await page.getByRole('button', { name: 'ENTER', exact: false }).click(); await page.locator('[data-chapter="freelance"]').click();
  await expect(page.locator('.godot-world')).toHaveAttribute('data-engine', 'ready', { timeout: 60000 });
  await page.locator('.career-scene').screenshot({ path: 'test-results/shared-flat-before.png' });
  for (const [id, correct] of [['leak', 0], ['cat', 1], ['foam', 2], ['noise', 0]] as const) {
    await page.locator(`[data-side="${id}"]`).click();
    await page.locator(`[data-side-choice="${(correct + 1) % 3}"]`).click();
    await expect(page.getByRole('dialog')).toContainText('Reward lost');
    await page.locator(`[data-side-choice="${correct}"]`).click();
    { const button = page.getByRole('button', { name: 'Return to mission', exact: true }); await traceDomClick(button, `company-side-return-${id}`); await button.click(); }
    await expect(page.locator(`[data-side="${id}"]`)).toBeDisabled();
  }
  await expect(page.locator('.quest-resources meter')).toHaveAttribute('value', '40');
  const saved = await page.evaluate(() => JSON.parse(localStorage.getItem('antonios:career:v1')!));
  expect(saved.chapters.freelance.side).toEqual(['leak', 'cat', 'foam', 'noise']);
  expect(saved.chapters.freelance.failedSide).toEqual(['leak', 'cat', 'foam', 'noise']);
  await page.locator('.career-scene').screenshot({ path: 'test-results/shared-flat-after.png' });
});

test('every company renders its own world with four listed missions', async ({ page }) => {
  test.setTimeout(120000);
  await unlockBefore(page, 'system-recovery');
  await page.goto('/en/arcade/'); await page.getByRole('button', { name: 'ENTER', exact: false }).click();
  for (const chapter of chapters) {
    await page.locator(`[data-chapter="${chapter.id}"]`).click();
    await expect(page.locator('.godot-world')).toHaveAttribute('data-engine', 'ready', { timeout: 60000 });
    await expect(page.locator('.godot-world')).toHaveAttribute('data-map', chapter.id);
    await expect(page.locator('.chapter-missions li')).toHaveCount(chapter.missions.length);
    await page.locator('.career-scene').screenshot({ path: `test-results/company-${chapter.id}.png` });
    const dialog = page.getByRole('dialog');
    if (await dialog.isVisible()) {
      const close = dialog.getByRole('button', { name: /^(?:Close|Return to mission)$/ });
      if (await close.count()) { const button = close.first(); await traceDomClick(button, `company-close-${chapter.id}`); await button.click(); }
    }
    await page.getByRole('button', { name: 'Menu', exact: true }).click();
  }
});
