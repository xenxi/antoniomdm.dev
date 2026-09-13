import { test, expect, type Page } from '@playwright/test';
import { unlockBefore } from './career-fixture';
import AxeBuilder from '@axe-core/playwright';
import { chapters, missionById } from '../../src/arcade/campaign';

test.use({ reducedMotion: 'reduce', launchOptions: { args: ['--enable-unsafe-swiftshader'] } });
test('a stylesheet failure returns to the launcher and explicit retry recovers', async ({ page }) => {
  await page.goto('/en/arcade/'); await expect(page.locator('[data-ready="true"]')).toBeVisible();
  await page.route('**/arcade.*.css', route => route.abort());
  await page.getByRole('button', { name: 'ENTER' }).click();
  await expect(page.getByRole('status')).toContainText('Arcade could not load');
  await page.unroute('**/arcade.*.css');
  await page.getByRole('button', { name: 'ENTER' }).click();
  await expect(page.getByRole('region', { name: 'AntoñiOS Career Mode' })).toBeVisible();
});
async function enter(page: Page, path = '/en/arcade/') {
  await page.goto(path); await expect(page.locator('[data-ready="true"]')).toBeVisible();
  await page.getByRole('button', { name: 'ENTER', exact: false }).click();
  await expect(page.getByRole('region', { name: 'AntoñiOS Career Mode' })).toBeVisible();
}
async function dismiss(page: Page) { await page.getByRole('button', { name: 'Return to mission', exact: true }).click(); }
async function resolveEvent(page: Page) {
  const dialog = page.getByRole('dialog');
  if (await dialog.getByRole('button', { name: 'Accept', exact: true }).count()) {
    await dialog.getByRole('button', { name: 'Accept', exact: true }).click();
    await dialog.getByRole('button', { name: 'Restore the verified public URL' }).click();
  } else if (await dialog.getByRole('button', { name: 'Remember the rings' }).count()) await dialog.getByRole('button', { name: 'Remember the rings' }).click();
  else if (await dialog.getByRole('button', { name: 'Welcome, Emma' }).count()) await dialog.getByRole('button', { name: 'Welcome, Emma' }).click();
  else if (await dialog.getByRole('button', { name: 'Go home', exact: true }).count()) await dialog.getByRole('button', { name: 'Go home', exact: true }).click();
  else await dialog.getByRole('button', { name: 'Notify the team and ask for cover' }).click();
  await dismiss(page);
}

test('keyboard movement, collision, touch controls, save and language continuation', async ({ page }) => {
  await enter(page); await page.getByRole('button', { name: 'New game', exact: false }).click();
  const map = page.locator('.godot-world'); await expect(map).toHaveAttribute('data-engine', 'ready', { timeout: 60000 }); await map.focus();
  await expect(map).toHaveAttribute('data-map', 'town');
  await page.keyboard.press('e');
  await expect(map).toHaveAttribute('data-map', 'freelance'); await map.focus();
  await page.keyboard.press('ArrowUp'); await expect(map).toHaveAttribute('data-player', '4,6');
  await page.keyboard.press('ArrowLeft'); await page.keyboard.press('ArrowDown');
  await expect(map).toHaveAttribute('data-player', '3,7');
  await page.keyboard.press('e'); await expect(page.getByRole('dialog')).toContainText('Just change one button');
  await page.locator('[data-choice="input"]').click(); await expect(page.locator('.career-feedback')).toContainText('required field');
  await page.getByRole('button', { name: 'Close', exact: true }).click();
  await page.locator('.career-world').getByRole('link', { name: 'Español', exact: true }).click();
  await expect(page).toHaveURL('/arcade/?career=continue');
  await expect(page.locator('html')).toHaveAttribute('lang', 'es');
  await expect(page.locator('.godot-world')).toHaveAttribute('data-player', '3,7');
  await page.getByRole('button', { name: 'Caminar al este', exact: true }).click();
  await expect(page.locator('.godot-world')).toHaveAttribute('data-player', '4,7');
  await page.getByRole('button', { name: 'Pausar', exact: true }).click();
  await expect(page.getByRole('heading', { name: 'En pausa', exact: true })).toBeVisible();
  await page.getByRole('button', { name: 'Volver al juego', exact: true }).last().click();
  await page.locator('.career-quest-panel').getByRole('button', { name: 'Abrir misión del terminal' }).click();
  await page.locator('[data-choice="button"]').click();
  await page.getByRole('button', { name: 'Volver a la misión' }).click();
  await expect(page.getByRole('dialog')).toContainText('Cliente freelance');
  await page.getByRole('button', { name: 'Aceptar', exact: true }).click();
  await page.getByRole('button', { name: 'Restaurar la URL pública verificada' }).click();
  await page.getByRole('button', { name: 'Volver a la misión' }).click();
  await expect(page.locator('.career-quest-panel').getByRole('button', { name: 'Volver a la ciudad', exact: false })).toBeVisible();
  await page.getByRole('link', { name: 'Ver experiencia completa' }).click();
  await expect(page).toHaveURL('/experience/#freelance');
  await expect(page.locator('#freelance')).toBeVisible();
  await expect(page.locator('#freelance')).toHaveAttribute('open', '');
});

test('tapping an elevated terminal sprite walks to it and opens its mission', async ({ page }) => {
  await unlockBefore(page, 'signlab'); await page.setViewportSize({ width: 390, height: 844 }); await enter(page);
  await page.locator('[data-chapter="signlab"]').click();
  await expect(page.locator('.godot-world')).toHaveAttribute('data-engine', 'ready', { timeout: 60000 });
  const map = page.frameLocator('.godot-frame').locator('canvas'); const box = (await map.boundingBox())!;
  await map.click({ position: { x: 170 / 480 * box.width, y: 174 / 320 * box.height } });
  await expect(page.getByRole('dialog')).toContainText('Connect the interaction');
  await expect(page.locator('.godot-world')).not.toHaveAttribute('data-player', '4,7');
});

test('all chapters, personal unlocks and the seven-phase boss are playable end to end', async ({ page }) => {
  test.setTimeout(120000);
  await enter(page);
  for (const chapter of chapters) {
    await page.locator(`[data-chapter="${chapter.id}"]`).click();
    for (const id of chapter.missions) {
      await page.locator('.career-quest-panel').getByRole('button', { name: 'Open terminal mission' }).click();
      const mission = missionById[id];
      for (const choice of mission.sequence ?? [mission.choices.find(choice => choice.accepted)!.id]) await page.locator(`[data-choice="${choice}"]`).click();
      await dismiss(page);
    }
    // Every required event is exposed before the next chapter can be entered.
    const expectedEvents = chapter.id === 'freelance' || chapter.id === 'la-salle' ? 1 : chapter.id === 'alcatel-lucent' || chapter.id === 'anexia' || chapter.id === 'domingo-alonso' || chapter.id === 'system-recovery' ? 2 : chapter.id === 'nokia' ? 1 : 0;
    for (let i = 0; i < expectedEvents; i++) { await expect(page.getByRole('dialog')).toBeVisible(); await resolveEvent(page); }
    await expect(page.locator('.career-success')).toContainText('Level complete');
    if (chapter.id === 'system-recovery') {
      await expect(page.locator('.career-quest-panel')).toContainText('System recovered');
      await expect(page.locator('.career-quest-panel')).toContainText('Career in progress');
      await page.screenshot({ path: 'test-results/career-recovered.png', fullPage: true });
    }
    await page.getByRole('button', { name: 'Menu', exact: true }).click();
  }
  await expect(page.locator('.career-chapter.is-complete')).toHaveCount(10);
});

test('a timed event interrupts a trace and resumes its exact sequence; pauses stop the timer', async ({ page }) => {
  await unlockBefore(page, 'la-salle'); await enter(page); await page.clock.install();
  await page.locator('[data-chapter="la-salle"]').click();
  await page.locator('.career-quest-panel').getByRole('button', { name: 'Open terminal mission' }).click();
  await page.locator('[data-choice="device"]').click();
  await page.clock.fastForward(17000);
  await expect(page.getByRole('dialog')).toContainText('Freelance client');
  await resolveEvent(page);
  await expect(page.getByRole('dialog')).toContainText('Step 2 / 4');
  await page.getByRole('button', { name: 'Close', exact: true }).click();
});

test('pausing a company stops its event timer', async ({ page }) => {
  await unlockBefore(page, 'nokia'); await enter(page); await page.clock.install();
  await page.locator('[data-chapter="nokia"]').click();
  await page.getByRole('button', { name: 'Pause', exact: true }).click();
  await page.clock.fastForward(60000); await expect(page.getByRole('dialog')).toHaveCount(0);
  await page.getByRole('button', { name: 'Resume game', exact: true }).last().click();
  await page.clock.fastForward(17000); await expect(page.getByRole('dialog')).toContainText('A cooperative adventure');
});

test('tour ends at thirty seconds without changing save progress', async ({ page }) => {
  await enter(page); await page.clock.install();
  await page.getByRole('button', { name: '30-second tour', exact: true }).click();
  await page.clock.runFor(11000); await expect(page.locator('.career-tour')).toContainText('Projects grow');
  await page.clock.runFor(10000); await expect(page.locator('.career-tour')).toContainText('Now you see the whole system');
  await page.clock.runFor(9000); await expect(page.locator('.career-chapter-grid')).toBeVisible();
  expect(await page.evaluate(() => localStorage.getItem('antonios:career:v1'))).toBeNull();
});

test('static Spanish and English launchers expose the real career and CV without JavaScript', async ({ browser }) => {
  const context = await browser.newContext({ javaScriptEnabled: false }); const page = await context.newPage();
  for (const prefix of ['', '/en']) {
    await page.goto(`http://127.0.0.1:${process.env.ANTONIOS_E2E_PORT ?? '4321'}${prefix}/arcade/`);
    await expect(page.getByRole('heading', { name: 'JOB ROUTE »' })).toBeVisible();
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute('href', `https://antoniomdm.dev${prefix}/arcade/`);
    const launcher = page.locator('.arcade-launcher'); await launcher.locator('summary').click();
    await expect(launcher.locator('li')).toHaveCount(9);
    await launcher.getByRole('link', { name: prefix ? 'View full CV' : 'Ver CV completo' }).click();
    await expect(page).toHaveURL(new RegExp(`${prefix}/cv/$`));
  }
  await context.close();
});

test('desktop and mobile scenes and dialogs meet accessibility and overflow checks', async ({ page }) => {
  await unlockBefore(page, 'anexia'); await enter(page);
  await page.screenshot({ path: 'test-results/career-menu.png', fullPage: true });
  expect((await new AxeBuilder({ page }).include('.career-world').withTags(['wcag2a', 'wcag2aa', 'wcag21aa']).analyze()).violations).toEqual([]);
  await page.locator('[data-chapter="anexia"]').click();
  await page.screenshot({ path: 'test-results/career-city.png', fullPage: true });
  await page.locator('.career-quest-panel').getByRole('button', { name: 'Open terminal mission' }).click();
  expect((await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21aa']).analyze()).violations).toEqual([]);
  await page.getByRole('button', { name: 'Close', exact: true }).click();
  await page.setViewportSize({ width: 390, height: 844 });
  await page.screenshot({ path: 'test-results/career-mobile.png', fullPage: true });
  expect(await page.locator('.career-world').evaluate(element => element.scrollWidth <= element.clientWidth)).toBe(true);
  expect((await new AxeBuilder({ page }).include('.career-world').withTags(['wcag2a', 'wcag2aa', 'wcag21aa']).analyze()).violations).toEqual([]);
});
