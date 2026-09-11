import { test, expect, type Page } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import { mkdir } from 'node:fs/promises';
import { getAchievements, getCompetencies, getExperience } from '../../src/data/professional';

test.use({ reducedMotion: 'reduce' });

const screenshots = 'test-results/a4';
const routes = {
  es: { experience: '/experience/', competencies: '/profile/competencies/', achievements: '/profile/achievements/', education: '/profile/education/', languages: '/profile/languages/' },
  en: { experience: '/en/experience/', competencies: '/en/profile/competencies/', achievements: '/en/profile/achievements/', education: '/en/profile/education/', languages: '/en/profile/languages/' },
} as const;

async function ready(page: Page, path: string) {
  await page.goto(path);
  await expect(page.locator('[data-ready="true"]')).toBeVisible();
  await expect(page.locator('[data-window="about"]')).toBeVisible();
}

for (const locale of ['es', 'en'] as const) {
  test(`A4 ${locale} experience route renders the public chronology`, async ({ page }) => {
    await ready(page, routes[locale].experience);
    await expect(page.locator('[data-profile-section]')).toHaveAttribute('data-profile-section', 'experience');
    await expect(page.locator('html')).toHaveAttribute('lang', locale);
    await expect(page).toHaveURL(routes[locale].experience);
    const expected = getExperience(locale);
    await expect(page.locator('.timeline-item')).toHaveCount(expected.length);
    for (const [index, item] of expected.entries()) {
      const card = page.locator('.timeline-item').nth(index);
      await expect(card.locator('h2')).toHaveText(item.role);
      await expect(card.locator('h3')).toHaveText(item.company);
      await expect(card.locator('.eyebrow')).toHaveText(item.period);
    }
    await expect(page.locator('#domingo-alonso')).toHaveAttribute('open', '');
  });
}

test('A4 Domingo Alonso details supports mouse and native keyboard toggle', async ({ page }) => {
  await ready(page, routes.es.experience);
  const details = page.locator('#domingo-alonso');
  const summary = details.locator('summary');
  await expect(details).toHaveAttribute('open', '');
  await summary.click();
  await expect(details).not.toHaveAttribute('open', '');
  await summary.click();
  await expect(details).toHaveAttribute('open', '');
  await summary.focus();
  await page.keyboard.press('Space');
  await expect(details).not.toHaveAttribute('open', '');
  await page.keyboard.press('Enter');
  await expect(details).toHaveAttribute('open', '');
  await expect(details).toContainText('Liderazgo técnico');
  await expect(details).not.toContainText(/Team Lead|Engineering Manager|People Manager/);
});

test('A4 competencies expose all model entities, separate axes and no ratings', async ({ page }) => {
  await ready(page, routes.es.competencies);
  const expected = getCompetencies('es');
  await expect(page.locator('[data-profile-section]')).toHaveAttribute('data-profile-section', 'competencies');
  await expect(page.locator('.competency-list > article')).toHaveCount(expected.length);
  for (const item of expected) {
    const card = page.locator(`#${item.id}`);
    await expect(card.locator('h2')).toHaveText(item.name);
    await expect(card.locator('.classification')).toContainText(item.classification);
    await expect(card.locator('.classification')).toContainText(item.recency);
  }
  const scope = page.locator('.competency-list');
  await expect(scope.locator('progress, meter')).toHaveCount(0);
  await expect(scope).not.toContainText(/(?:\d+\s*\/\s*\d+|\d+%|★★★★★|\*{3,})/);
});

test('A4 competency anchors and relation links preserve locale and history', async ({ page }) => {
  await ready(page, '/en/profile/competencies/#software-architecture');
  await expect(page.locator('[data-profile-section]')).toHaveAttribute('data-profile-section', 'competencies');
  await expect(page).toHaveURL(/\/en\/profile\/competencies\/#software-architecture$/);
  await expect(page.locator('#software-architecture')).toBeVisible();
  await page.locator('#software-architecture .evidence-links a').first().click();
  await expect(page).toHaveURL(/\/en\/experience\/#domingo-alonso$/);
  await expect(page.locator('#domingo-alonso')).toBeVisible();
  await page.goBack();
  await expect(page).toHaveURL(/\/en\/profile\/competencies\/#software-architecture$/);
  await page.goForward();
  await expect(page).toHaveURL(/\/en\/experience\/#domingo-alonso$/);
  await page.locator('#domingo-alonso .tags a').first().click();
  await expect(page).toHaveURL(/\/en\/profile\/competencies\/#/);
  await expect(page.locator('[data-profile-section]')).toHaveAttribute('data-profile-section', 'competencies');
});

test('A4 achievement and competency relations reach existing bilingual destinations', async ({ page }) => {
  await ready(page, routes.es.achievements);
  const achievement = page.locator('#integration-suite-feedback');
  await achievement.locator('.evidence-links a').nth(0).click();
  await expect(page).toHaveURL(/\/experience\/#domingo-alonso$/);
  await page.goBack();
  await achievement.locator('.evidence-links a').nth(1).click();
  await expect(page).toHaveURL('/architecture/');
  await page.goBack();
  await page.goto(routes.es.competencies);
  await page.locator('#software-architecture .evidence-links a').last().click();
  await expect(page).toHaveURL('/projects/platform934/');
  await expect(page.getByRole('heading', { name: 'Platform 9¾', exact: true })).toBeVisible();
});

for (const locale of ['es', 'en'] as const) {
  test(`A4 ${locale} achievements preserve scoped metrics`, async ({ page }) => {
    await ready(page, routes[locale].achievements);
    const expected = getAchievements(locale);
    await expect(page.locator('.achievement-list > article')).toHaveCount(expected.length);
    await expect(page.locator('.metric').nth(0)).toContainText('~60');
    await expect(page.locator('.metric').nth(0)).toContainText('~2');
    await expect(page.locator('.metric').nth(0)).toContainText(locale === 'es' ? 'Aproximado' : 'Approximate');
    await expect(page.locator('.metric').nth(1)).toContainText('1–2');
    await expect(page.locator('.achievement-list')).toContainText(expected[1].scope);
    await expect(page.locator('.achievement-list')).not.toContainText(/from every event|de cada evento|platform API calls|llamadas a la plataforma/);
  });
}

test('A4 education and languages preserve source boundaries in both locales', async ({ page }) => {
  for (const locale of ['es', 'en'] as const) {
    await ready(page, routes[locale].education);
    await expect(page.locator('.profile-section')).toContainText(locale === 'es' ? 'título no obtenido' : 'degree not awarded');
    await expect(page.locator('.profile-section')).not.toContainText(/Titulado|Graduado|Grado obtenido|Bachelor's degree|Graduated|Engineering degree awarded/);
    await ready(page, routes[locale].languages);
    await expect(page.locator('.profile-section')).toContainText(locale === 'es' ? 'Español nativo' : 'Native Spanish');
    await expect(page.locator('.profile-section')).not.toContainText(/\b(?:B1|B2|C1|C2|CEFR|Fluent)\b/);
  }
});

test('A4 accessibility passes on the three required sections', async ({ page }) => {
  for (const path of [routes.es.experience, routes.es.competencies, routes.es.achievements]) {
    await ready(page, path);
    const result = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21aa']).analyze();
    expect(result.violations, path).toEqual([]);
  }
});

test('A4 responsive layouts remain usable without horizontal overflow', async ({ page }) => {
  for (const [width, height] of [[1440, 1000], [820, 1180], [390, 844], [320, 740]]) {
    await page.setViewportSize({ width, height });
    await ready(page, routes.es.experience);
    expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(width);
    await expect(page.locator('.timeline')).toBeVisible();
    await page.locator('.profile-tabs a[href="/profile/competencies/"]').click();
    await expect(page.locator('.competency-list')).toBeVisible();
    expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(width);
  }
});

test('A4 no-JS routes expose professional HTML in both locales', async ({ browser }) => {
  const context = await browser.newContext({ javaScriptEnabled: false });
  const page = await context.newPage();
  for (const locale of ['es', 'en'] as const) {
    for (const [section, expected] of [['experience', 9], ['competencies', 19], ['achievements', 2], ['education', 1], ['languages', 1]] as const) {
      await page.goto(`http://127.0.0.1:${process.env.ANTONIOS_E2E_PORT ?? '4321'}${routes[locale][section]}`);
      await expect(page.locator('.profile-section h1').first()).toBeVisible();
      if (section === 'experience') await expect(page.locator('.timeline-item')).toHaveCount(expected);
      if (section === 'competencies') await expect(page.locator('.competency-list > article')).toHaveCount(expected);
      if (section === 'achievements') await expect(page.locator('.achievement-list > article')).toHaveCount(expected);
    }
  }
  await context.close();
});

test('A4 visual QA captures the required desktop and mobile states', async ({ page }) => {
  await mkdir(screenshots, { recursive: true });
  await page.setViewportSize({ width: 1440, height: 1000 });
  await ready(page, routes.es.experience);
  await page.screenshot({ path: `${screenshots}/01-experience-es-collapsed.png`, fullPage: true });
  await page.locator('#domingo-alonso summary').click();
  await page.screenshot({ path: `${screenshots}/02-experience-es-domingo-expanded.png`, fullPage: true });
  await page.goto(routes.es.competencies); await page.screenshot({ path: `${screenshots}/03-competencies-es.png`, fullPage: true });
  await page.goto(routes.es.achievements); await page.screenshot({ path: `${screenshots}/04-achievements-es.png`, fullPage: true });
  await page.goto(routes.en.experience); await page.screenshot({ path: `${screenshots}/05-experience-en.png`, fullPage: true });
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto(routes.es.experience); await page.screenshot({ path: `${screenshots}/06-experience-mobile-es.png`, fullPage: true });
  await page.goto(routes.es.competencies); await page.screenshot({ path: `${screenshots}/07-competencies-mobile-es.png`, fullPage: true });
});
