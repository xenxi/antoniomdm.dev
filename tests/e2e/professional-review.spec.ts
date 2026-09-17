import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import { publicProfessionalModel as model } from "../../src/data/professional";

test.use({ reducedMotion: "reduce" });

for (const locale of ["es", "en"] as const) {
  const prefix = locale === "es" ? "" : "/en";
  for (const width of [1440, 820, 390]) {
    test(`professional decisions: ${locale}, ${width}px`, async ({ page }) => {
      await page.setViewportSize({ width, height: 1000 });
      await page.goto(`${prefix}/architecture/`);
      await expect(page.locator('[data-ready="true"]')).toBeVisible();
      await expect(page.locator(".decision-area")).toHaveCount(11);
      await expect(page.locator(".decision-card")).toHaveCount(14);
      const decision = page.locator("#remove-unnecessary-service");
      await page
        .locator('.decision-area-links a[href="#remove-unnecessary-service"]')
        .first()
        .click();
      await decision.locator("summary").focus();
      await page.keyboard.press("Enter");
      await expect(decision.locator("details")).toHaveAttribute("open", "");
      await expect(decision).toContainText(
        model.representativeDecisions[0].principle[locale],
      );
      await expect(decision.locator(".evidence-links")).toContainText(
        "Domingo Alonso Group",
      );
      expect(
        await page.evaluate(() => document.documentElement.scrollWidth),
      ).toBe(width);
      expect(
        (
          await new AxeBuilder({ page })
            .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
            .analyze()
        ).violations,
      ).toEqual([]);
      await page.screenshot({
        path: `test-results/professional-review/architecture-${locale}-${width}.png`,
        fullPage: true,
      });
      await decision
        .locator('a[href*="/architecture/service-boundaries-and-ddd/"]')
        .click();
      await expect(page.locator("#context")).toBeVisible();
      await expect(page.locator("#decision")).toBeVisible();
      await expect(page.locator(".architecture-diagram")).toBeVisible();
      await expect(page.locator(".case-header h1")).toHaveText(
        model.architectureCases.find(
          (item) => item.id === "service-boundaries-and-ddd",
        )!.title[locale],
      );
    });
  }

  test(`terminal uses shared evidence in ${locale}`, async ({ page }) => {
    await page.goto(`${prefix}/terminal/`);
    await expect(page.locator('[data-ready="true"]')).toBeVisible();
    const input = page.locator("#terminal-input");
    await input.fill("principles");
    await input.press("Enter");
    for (const decision of model.representativeDecisions)
      await expect(page.getByRole("log")).toContainText(
        decision.principle[locale],
      );
    await input.fill("impact");
    await input.press("Enter");
    for (const achievement of model.achievements) {
      await expect(page.getByRole("log")).toContainText(
        achievement.summary[locale],
      );
      await expect(page.getByRole("log")).toContainText(
        achievement.scope[locale],
      );
    }
    await input.fill("cat mode.txt");
    await input.press("Enter");
    await expect(page.getByRole("log")).toContainText(
      model.profile.mode[locale],
    );
  });

  test(`static decision evidence and language-preserving deep links in ${locale}`, async ({
    browser,
  }) => {
    const context = await browser.newContext({ javaScriptEnabled: false });
    const page = await context.newPage();
    await page.goto(
      `http://127.0.0.1:${process.env.ANTONIOS_E2E_PORT ?? "4321"}${prefix}/architecture/?view=reading`,
    );
    await expect(page.locator(".decision-card")).toHaveCount(14);
    const decision = page.locator("#ddd-where-needed");
    await decision.locator("summary").click();
    await expect(decision.locator(".decision-principle")).toBeVisible();
    await decision
      .locator('a[href*="/architecture/service-boundaries-and-ddd/"]')
      .click();
    await expect(page).toHaveURL(
      new RegExp(`${prefix}/architecture/service-boundaries-and-ddd/`),
    );
    await expect(page.locator("html")).toHaveAttribute("lang", locale);
    await context.close();
  });
}
