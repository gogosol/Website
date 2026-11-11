import AxeBuilder from "@axe-core/playwright";
import { test, expect } from "@playwright/test";
import routes from "../routes.json";

for (const route of routes) {
  test(`${route} meets automated WCAG A/AA checks @a11y`, async ({ page }, testInfo) => {
    await page.goto(route, { waitUntil: "domcontentloaded" });
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
    await expect(page.getByRole("progressbar", { name: "Loading QCertify" })).toBeHidden();
    const results = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa"])
      .analyze();
    await testInfo.attach("axe-results", { body: JSON.stringify(results, null, 2), contentType: "application/json" });
    expect(results.violations).toEqual([]);
  });
}
