import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

test.use({ reducedMotion: 'reduce' });

for (const locale of ['es', 'en']) for (const width of [1440, 1280, 1024, 768, 390]) {
  test(`Aura composition, accessible content and translations: ${locale} at ${width}`, async ({ page }) => {
    await page.setViewportSize({ width, height: width === 390 ? 844 : 1000 });
    await page.goto(locale === 'es' ? '/' : '/en/');
    await expect(page.locator('[data-ready="true"]')).toBeVisible();
    const profile = page.locator('[data-window="about"]');
    await expect(profile).toHaveClass(/active/);
    await expect(page.locator('[data-window]')).toHaveCount(width >= 1280 ? 3 : 1);
    await expect(page.locator('.pixel-portrait img')).toHaveAccessibleName(locale === 'es'
      ? 'Retrato pixel: desarrollador con gafas y jersey azul trabajando con un portátil'
      : 'Pixel portrait: developer with glasses and a blue sweater working at a laptop');
    await expect(profile.locator('img')).toHaveCount(1);
    await expect(profile.locator('.profile-loaded')).toHaveText(locale === 'es' ? 'PERFIL.EXE / EN LÍNEA' : 'PROFILE.EXE / ONLINE');
    await expect(profile.locator('.system-profile')).not.toContainText(/Remoto|Remote|España|Spain/);
    expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBe(width);
    if (width >= 1280) {
      const main = (await profile.boundingBox())!;
      for (const id of ['terminal', 'projects']) {
        const side = (await page.locator(`[data-window="${id}"]`).boundingBox())!;
        expect(side.x).toBeGreaterThan(main.x + main.width);
      }
      await expect(page.locator('.project-thumbnail')).toBeVisible();
    }
    expect((await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21aa']).analyze()).violations).toEqual([]);
    await page.screenshot({ path: `test-results/aura/${locale}-${width}.png`, fullPage: true });
    await profile.locator('.profile-stack a').scrollIntoViewIfNeeded();
    await profile.locator('.profile-stack a').click();
    await expect(page).toHaveURL(`${locale === 'en' ? '/en' : ''}/profile/competencies/`);
    await expect(profile.locator('[data-profile-section]')).toHaveAttribute('data-profile-section', 'competencies');
  });
}

test('Aura side apps keep real focus, dock state and terminal commands across responsive changes', async ({ page, context }) => {
  await page.goto('/en/'); await expect(page.locator('[data-ready="true"]')).toBeVisible();
  await expect(page).toHaveURL('/en/');
  await page.locator('[data-window="terminal"] .titlebar').click();
  await expect(page.locator('[data-window="terminal"]')).toHaveClass(/active/);
  const command = page.getByRole('textbox', { name: 'Terminal command' });
  await command.fill('reboot'); await command.press('Enter');
  await expect(page.getByRole('log')).toContainText('Have you tried turning it off and on again?');
  await page.getByRole('button', { name: 'Minimize Terminal', exact: true }).click();
  await expect(page.getByRole('button', { name: 'Restore Terminal', exact: true })).toHaveClass(/is-minimized/);
  await page.getByRole('button', { name: 'Restore Terminal', exact: true }).click();
  await expect(page.getByRole('log')).toContainText('Have you tried turning it off and on again?');
  await page.getByRole('button', { name: 'Close Projects', exact: true }).click();
  await page.setViewportSize({ width: 390, height: 844 });
  await page.setViewportSize({ width: 1440, height: 1000 });
  await expect(page.locator('[data-window="projects"]')).toHaveCount(0);
  await context.setOffline(true);
  await expect(page.locator('.system-ready')).toHaveAccessibleName('Network offline');
  await context.setOffline(false);
  await expect(page.locator('.system-ready')).toHaveAccessibleName('Network online');
  await page.getByRole('button', { name: 'Enable system audio', exact: true }).click();
  await expect(page.getByRole('button', { name: 'Mute sound', exact: true })).toHaveAttribute('aria-pressed', 'true');
});

test('Aura mobile touch taps open apps, restore windows and enter and exit Arcade', async ({ browser, baseURL }) => {
  const context = await browser.newContext({ baseURL, viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true, reducedMotion: 'reduce' });
  const page = await context.newPage();
  await page.goto('/en/'); await expect(page.locator('[data-ready="true"]')).toBeVisible();
  await page.locator('.professional-actions a[href="/en/projects/"]').tap();
  await expect(page.locator('[data-window="projects"]')).toHaveClass(/active/);
  await page.getByRole('button', { name: 'Minimize Projects', exact: true }).tap();
  await expect(page.locator('[data-window="projects"]')).toBeHidden();
  await page.getByRole('button', { name: 'Restore Projects', exact: true }).tap();
  await expect(page.locator('[data-window="projects"]')).toBeVisible();
  await page.getByRole('button', { name: 'Open launcher', exact: true }).tap();
  await page.locator('.launcher nav a[href="/en/arcade/"]').tap();
  await page.getByRole('button', { name: 'ENTER' }).tap();
  await expect(page.getByRole('region', { name: 'AntoñiOS Career Mode' })).toBeVisible();
  await page.getByRole('button', { name: 'Return to desktop' }).tap();
  await expect(page.locator('[data-window="arcade"]')).toBeVisible();
  await context.close();
});
