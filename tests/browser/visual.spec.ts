import { test, expect } from "@playwright/test";
import routes from "../routes.json";

for (const route of routes) {
  test(`${route} visual baseline @visual`, async ({ page }) => {
    await page.goto(route, { waitUntil: "domcontentloaded" });
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
    await expect(page.getByRole("progressbar", { name: "Loading QCertify" })).toBeHidden();
    await page.evaluate(() => document.fonts.ready);
    // content-visibility: auto skips painting off-screen sections, which a full-page capture would
    // record as blank areas. Render everything so the baseline covers the whole page.
    await page.addStyleTag({ content: "*, *::before, *::after { content-visibility: visible !important; contain-intrinsic-size: none !important; }" });
    // Reveal sections and load lazy images before comparing the complete page.
    await page.evaluate(async () => {
      for (let y = 0; y < document.documentElement.scrollHeight; y += window.innerHeight) {
        window.scrollTo(0, y);
        await new Promise<void>((resolve) => requestAnimationFrame(() => requestAnimationFrame(() => resolve())));
      }
      window.scrollTo(0, 0);
      await Promise.all(Array.from(document.images, (image) => image.decode().catch(() => {})));
    });
    await expect(page).toHaveScreenshot(`${route.replace(/[^a-z0-9]+/gi, "-") || "home"}.png`, {
      fullPage: true,
      animations: "disabled",
      mask: [page.locator("canvas")],
    });
  });
}
