import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import { readFile } from 'node:fs/promises';

// Geometry assertions measure layout, independently of the entrance animation.
test.use({ reducedMotion: 'reduce' });

test('desktop window lifecycle, drag, resize and exact restore', async ({ page }) => {
  await page.goto('/en/'); await expect(page.locator('[data-ready="true"]')).toBeVisible();
  await expect(page.getByRole('region', { name: 'Profile window' })).toBeVisible();
  await page.locator('[data-desktop-app="projects"]').dblclick();
  const win = page.locator('[data-window="projects"]'); await expect(win).toBeVisible();
  await expect(page).toHaveURL(/\/projects\/$/);
  const before = (await win.boundingBox())!;
  const title = (await win.locator('.titlebar').boundingBox())!;
  await page.mouse.move(title.x + 220, title.y + 20); await page.mouse.down(); await page.mouse.move(title.x + 130, title.y - 20, { steps: 8 }); await page.mouse.up();
  const moved = (await win.boundingBox())!; expect(moved.x).toBeCloseTo(before.x - 90); expect(moved.y).toBeCloseTo(before.y - 40);
  const handle = (await win.locator('.resize-se').boundingBox())!;
  await page.mouse.move(handle.x + 5, handle.y + 5); await page.mouse.down(); await page.mouse.move(handle.x + 75, handle.y + 45, { steps: 8 }); await page.mouse.up();
  const resized = (await win.boundingBox())!; expect(resized.width).toBeCloseTo(moved.width + 70); expect(resized.height).toBeCloseTo(moved.height + 40);
  await page.getByRole('button', { name: 'Maximize Projects', exact: true }).click();
  await expect(win).toHaveAttribute('data-state', 'maximized');
  const workspace = (await page.locator('.workspace').boundingBox())!; expect((await win.boundingBox())!.height).toBeCloseTo(workspace.height);
  await page.getByRole('button', { name: 'Restore size of Projects' }).click(); expect(await win.boundingBox()).toEqual(resized);
  await page.getByRole('button', { name: 'Minimize Projects' }).click(); await expect(win).toBeHidden();
  await page.getByRole('button', { name: 'Restore Projects', exact: true }).click(); await expect(win).toBeVisible(); expect(await win.boundingBox()).toEqual(resized);
  await page.getByRole('button', { name: 'Close Projects' }).click(); await expect(win).toHaveCount(0);
  await page.locator('[data-desktop-app="projects"]').dblclick(); await expect(win).toHaveCount(1); await expect(win).toBeVisible();
});

test('route deep links and browser Back / Forward work', async ({ page }) => {
  await page.goto('/en/projects/platform934/'); await expect(page.locator('[data-ready="true"]')).toBeVisible();
  await expect(page.locator('h1', { hasText: 'Platform934' })).toBeVisible();
  await page.locator('[data-desktop-app="notes"]').click(); await expect(page).toHaveURL(/\/notes\/$/);
  await page.goBack(); await expect(page.locator('[data-window="projects"]')).toHaveClass(/active/);
  await expect(page.locator('h1', { hasText: 'Platform934' })).toBeVisible();
  await page.goForward(); await expect(page.locator('[data-window="notes"]')).toHaveClass(/active/);
});

test('Arcade engine, wallpaper and audio are deferred until explicit entry', async ({ page }) => {
  const requests: string[] = []; page.on('request', request => requests.push(request.url()));
  await page.goto('/en/'); await expect(page.locator('[data-ready="true"]')).toBeVisible();
  expect(requests.filter(url => /\/Arcade\..*\.js|\/arcade\/world|\.mp3|flutter|\.dart/.test(url))).toEqual([]);
  await page.locator('[data-desktop-app="arcade"]').click(); await expect(page.getByRole('heading', { name: 'ARCADE MODE' })).toBeVisible();
  expect(requests.filter(url => /\/Arcade\..*\.js|\/arcade\/world|\.mp3/.test(url))).toEqual([]);
  await page.getByRole('button', { name: 'ENTER' }).click();
  await expect(page.getByRole('region', { name: 'Arcade preview' })).toBeVisible();
  expect(requests.some(url => /\/Arcade\..*\.js/.test(url))).toBe(true); expect(requests.some(url => /\.mp3/.test(url))).toBe(false);
  await page.getByRole('button', { name: 'Return to desktop' }).click(); await expect(page.locator('[data-window="arcade"]')).toBeVisible();
});

test('keyboard navigation, terminal and settings persistence', async ({ page }) => {
  await page.goto('/en/'); await expect(page.locator('[data-ready="true"]')).toBeVisible();
  await page.keyboard.press('Alt+l'); await expect(page.getByRole('textbox', { name: 'Find an application' })).toBeFocused();
  await page.getByRole('textbox', { name: 'Find an application' }).fill('terminal');
  await page.getByRole('navigation', { name: 'All applications' }).getByRole('link').click();
  await page.getByRole('textbox', { name: 'Terminal command' }).fill('projects'); await page.getByRole('textbox', { name: 'Terminal command' }).press('Enter');
  const win = page.locator('[data-window="projects"]'); await expect(win).toHaveClass(/active/);
  await win.focus(); const before = (await win.boundingBox())!; await page.keyboard.press('Alt+ArrowLeft'); expect((await win.boundingBox())!.x).toBeCloseTo(before.x - 20);
  await page.keyboard.press('Escape'); await expect(win).toBeHidden();
  await page.getByRole('link', { name: 'Open Settings', exact: true }).click();
  await page.getByRole('radio', { name: 'Midnight' }).check();
  await page.getByRole('checkbox', { name: 'Enable sound', exact: true }).check(); await page.reload();
  await expect(page.getByRole('radio', { name: 'Midnight' })).toBeChecked();
  await expect(page.getByRole('checkbox', { name: 'Enable sound', exact: true })).toBeChecked();
  await page.getByRole('button', { name: 'Reset desktop & preferences' }).click(); await expect(page.locator('.wallpaper-nebula')).toBeVisible();
});

test('mobile apps fill the workspace and switch from dock', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 }); await page.goto('/en/'); await expect(page.locator('[data-ready="true"]')).toBeVisible();
  await page.locator('.professional-actions').getByRole('link', { name: 'Projects', exact: true }).click();
  const win = page.locator('[data-window="projects"]'); const rect = (await win.boundingBox())!;
  expect(rect.x).toBe(0); expect(rect.width).toBe(390);
  expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBe(390);
  await page.getByRole('button', { name: 'Minimize Projects' }).click(); await expect(win).toBeHidden();
  await page.getByRole('button', { name: 'Restore Projects', exact: true }).click(); await expect(win).toBeVisible();
  await page.screenshot({ path: 'test-results/mobile.png', fullPage: true });
});

test('static HTML, notes, CV and SEO exist without JavaScript', async ({ browser }) => {
  const context = await browser.newContext({ javaScriptEnabled: false }); const page = await context.newPage();
  await page.goto(`http://127.0.0.1:${process.env.ANTONIOS_E2E_PORT ?? '4321'}/en/projects/platform934/`); await expect(page.locator('h1', { hasText: 'Platform934' })).toBeVisible();
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute('href', 'https://antoniomdm.dev/en/projects/platform934/');
  await page.goto(`http://127.0.0.1:${process.env.ANTONIOS_E2E_PORT ?? '4321'}/en/notes/os-foundation/`); await expect(page.getByRole('heading', { name: 'One portfolio, two ways to explore' })).toBeVisible();
  await page.goto(`http://127.0.0.1:${process.env.ANTONIOS_E2E_PORT ?? '4321'}/en/cv/`); await expect(page.getByRole('heading', { name: 'Antonio Manuel Díaz Moreno' })).toBeVisible();
  await context.close();
});

test('main routes and machine-readable outputs respond', async ({ request }) => {
  for (const path of ['/', '/es/', '/en/', '/projects/', '/es/projects/', '/en/projects/', '/projects/platform934/', '/es/experience/', '/en/notes/', '/es/architecture/', '/en/architecture/', '/es/ai/', '/en/contact/', '/lab/', '/about/', '/es/cv/', '/en/arcade/', '/es/settings/', '/en/terminal/', '/rss.xml', '/es/rss.xml', '/en/rss.xml', '/sitemap.xml', '/robots.txt', '/llms.txt', '/es/llms.txt', '/en/llms.txt', '/cv.txt', '/es/cv.txt', '/en/cv.txt', '/social.png']) {
    const response = await request.get(path); expect(response.status(), path).toBe(200);
  }
  const sitemap = await (await request.get('/sitemap.xml')).text(); expect(sitemap).toContain('/projects/platform934/');
  const rss = await (await request.get('/rss.xml')).text(); expect(rss).toContain('os-foundation');
  const llms = await (await request.get('/en/llms.txt')).text();
  expect(llms).toContain('Public professional model'); expect(llms).toContain('implemented: API and tool-using agent');
  expect(llms).not.toMatch(/pending_editorial|NEEDS_VERIFICATION|INTERVIEW_ONLY|PRIVATE|knowledge-vault/);
  expect((await readFile('dist/CNAME', 'utf8')).trim()).toBe('antoniomdm.dev');
  expect(await readFile('dist/.nojekyll', 'utf8')).toBe('');
});

test('desktop and project route accessibility', async ({ page }) => {
  await page.goto('/en/'); await expect(page.locator('[data-ready="true"]')).toBeVisible();
  expect((await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21aa']).analyze()).violations).toEqual([]);
  await page.screenshot({ path: 'test-results/desktop.png', fullPage: true });
  await page.locator('[data-desktop-app="projects"]').click();
  expect((await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21aa']).analyze()).violations).toEqual([]);
});

test('project filters, note content, lab concepts and printable CV', async ({ page }) => {
  await page.goto('/en/projects/'); await expect(page.locator('[data-ready="true"]')).toBeVisible();
  await page.getByRole('button', { name: 'Production', exact: true }).click();
  await expect(page.getByRole('heading', { name: "Room for what's next." })).toBeVisible();
  await page.getByRole('button', { name: 'View all projects' }).click();
  await page.getByRole('link', { name: /FEATURED.*Platform/ }).click();
  await expect(page).toHaveURL(/\/projects\/platform934\/$/);
  await page.locator('[data-desktop-app="notes"]').click();
  await page.locator('.note-card').click(); await expect(page.getByRole('heading', { name: 'One portfolio, two ways to explore' })).toBeVisible();
  await expect(page.locator('meta[property="og:type"]')).toHaveAttribute('content', 'article');
  await page.locator('[data-desktop-app="lab"]').click();
  await page.getByRole('button', { name: 'Explore concept' }).first().click(); await expect(page.locator('.lab-concept')).toContainText('Supervised agents');
  await page.goto('/en/cv/?view=reading'); await expect(page.locator('html')).toHaveClass('reading');
  await page.emulateMedia({ media: 'print' }); await expect(page.locator('.taskbar')).toBeHidden();
  await expect(page.getByRole('heading', { name: 'Antonio Manuel Díaz Moreno' })).toBeVisible();
});

test('audio requires an explicit Play and stops on Arcade exit', async ({ page }) => {
  const audioRequests: string[] = []; page.on('request', request => { if (request.url().endsWith('.mp3')) audioRequests.push(request.url()); });
  await page.goto('/en/settings/'); await expect(page.locator('[data-ready="true"]')).toBeVisible();
  await page.getByRole('checkbox', { name: 'Enable sound', exact: true }).check();
  await page.getByRole('checkbox', { name: 'Arcade music', exact: true }).check();
  await page.locator('[data-desktop-app="arcade"]').click(); await page.getByRole('button', { name: 'ENTER' }).click();
  await expect(page.getByRole('button', { name: 'Play music', exact: true })).toBeVisible(); expect(audioRequests).toHaveLength(0);
  await page.getByRole('button', { name: 'Play music', exact: true }).click();
  await expect(page.getByRole('button', { name: 'Pause music', exact: true })).toBeVisible(); expect(audioRequests.length).toBeGreaterThan(0);
  await page.getByRole('button', { name: 'Return to desktop' }).click(); await expect(page.locator('.arcade-world')).toHaveCount(0);
});

test('resize viewport preserves recoverable maximized geometry and focus order', async ({ page }) => {
  await page.goto('/en/projects/'); await expect(page.locator('[data-ready="true"]')).toBeVisible();
  await page.getByRole('button', { name: 'Maximize Projects', exact: true }).click();
  await page.setViewportSize({ width: 820, height: 680 });
  await page.getByRole('button', { name: 'Restore size of Projects' }).click();
  const rect = (await page.locator('[data-window="projects"]').boundingBox())!;
  expect(rect.x).toBeGreaterThanOrEqual(0); expect(rect.x + rect.width).toBeLessThanOrEqual(820);
  expect(rect.y + rect.height).toBeLessThanOrEqual(608);
});

