import { test, expect } from '@playwright/test';
import { completeEvent, newGame, updateProgress } from '../../src/arcade/engine';

test.use({ reducedMotion: 'reduce', launchOptions: { args: ['--enable-unsafe-swiftshader'] } });

for (const locale of ['es', 'en']) test(`incident failure ${locale}: exhaustion, reload, language and recovery`, async ({ page }) => {
  test.setTimeout(90000);
  const l = (es: string, en: string) => locale === 'es' ? es : en;
  if (locale === 'es') await page.setViewportSize({ width: 390, height: 844 });
  const state = updateProgress(completeEvent(newGame(), 'freelance'), { mission: 1, energy: 15, remaining: 20 });
  await page.addInitScript(save => { if (!localStorage.getItem('antonios:career:v1')) localStorage.setItem('antonios:career:v1', save); }, JSON.stringify(state));
  await page.goto(locale === 'es' ? '/arcade/' : '/en/arcade/');
  await page.locator('.arcade-launcher button').click();
  await page.locator('[data-chapter="freelance"]').click();
  await page.locator('[data-side="noise"]').click();
  await expect(page.getByRole('dialog')).toContainText(l('Media hora para revisar la entrega', 'Half an hour to review the delivery'));
  await expect(page.getByRole('dialog')).not.toContainText(l('coronilla', 'balding'));
  await page.locator('[data-side-choice="1"]').click();
  await expect(page.getByRole('dialog')).toContainText(l('La entrega sale sin comprobar', 'The delivery goes out unchecked'));
  await expect(page.locator('[data-side-choice="0"]')).toBeDisabled();
  await expect(page.getByRole('dialog')).toContainText(l('Sin energía', 'Out of energy'));
  await page.getByRole('dialog').screenshot({ path: `test-results/quest-failure-${locale}.png` });
  if (locale === 'es') expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBe(390);
  await page.getByRole('dialog').getByRole('button', { name: l('Cerrar', 'Close'), exact: true }).click();
  await page.locator('.career-world').getByRole('link', { name: l('English', 'Español'), exact: true }).click();
  await page.reload();
  await page.locator('[data-side="noise"]').click();
  await expect(page.getByRole('dialog')).toContainText(l('Reward lost', 'Recompensa perdida'));
  await expect(page.locator('[data-side-choice="0"]')).toBeDisabled();
  await page.getByRole('dialog').getByRole('button', { name: l('Rest and restart the attempt', 'Descansar y reiniciar el intento'), exact: true }).click();
  await page.locator('[data-side-choice="0"]').click();
  await expect(page.getByRole('dialog')).toContainText(l('+0 Energy', '+0 Energía'));
  const saved = await page.evaluate(() => JSON.parse(localStorage.getItem('antonios:career:v1')!));
  expect(saved.chapters.freelance).toMatchObject({ mission: 1, energy: 100, failedSide: ['noise'], side: ['noise'] });
});

test('quick sequence errors cost energy, erase the route and require recovery', async ({ page }) => {
  test.setTimeout(90000);
  await page.goto('/en/arcade/?mission=distributed&chapter=domingo-alonso');
  await page.locator('.arcade-launcher button').click();
  await page.getByRole('dialog').getByRole('button', { name: 'No time limit', exact: true }).click();
  await page.locator('[data-choice="web"]').click();
  await expect(page.locator('.career-flow')).toContainText('WEB');
  await page.locator('[data-choice="sql"]').click();
  await expect(page.locator('.career-flow')).toBeEmpty();
  await expect(page.getByRole('dialog')).toContainText('Energy: 85/100');
  for (let i = 0; i < 6; i++) await page.locator('[data-choice="sql"]').click();
  await expect(page.locator('[data-choice="web"]')).toBeDisabled();
  await page.getByRole('button', { name: 'Rest and restart the attempt', exact: true }).last().click();
  await expect(page.locator('.career-flow')).toBeEmpty();
  for (const id of ['web', 'api', 'orders', 'pricing', 'sql']) await page.locator(`[data-choice="${id}"]`).click();
  await expect(page.getByRole('dialog')).toContainText('Mission cleared!');
});

test('Snake collisions have a cost and restarting does not refund it', async ({ page }) => {
  await page.goto('/en/arcade/?mission=nokia-snake&chapter=nokia');
  await page.locator('.arcade-launcher button').click();
  await page.getByRole('dialog').getByRole('button', { name: 'No time limit', exact: true }).click();
  await page.locator('.snake-controls').getByRole('button', { name: 'Left', exact: true }).click();
  await expect(page.getByRole('dialog')).toContainText('Energy: 85/100');
  await expect(page.locator('[data-choice="nokia-snake-0"]')).toBeDisabled();
  await page.getByRole('button', { name: 'Restart Snake', exact: true }).click();
  await expect(page.getByRole('dialog')).toContainText('Energy: 85/100');
});
