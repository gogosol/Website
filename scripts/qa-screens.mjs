/**
 * Local visual QA: section screenshots and automated layout checks at many widths.
 * Usage: node scripts/qa-screens.mjs [baseUrl] [widths] [routes] [outDir]
 *   widths/routes are comma-separated; defaults cover every public route at 10 widths.
 * Reports horizontal overflow, elements extending past the viewport, clipped text and
 * overlapping text boxes inside SVG diagrams. Screenshots go to .artifacts/qa/.
 */
import { chromium } from "@playwright/test";
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const base = process.argv[2] ?? "http://127.0.0.1:3000";
const widths = (process.argv[3] ?? "320,360,375,390,430,768,1024,1280,1440,1920").split(",").map(Number);
const routes = (process.argv[4] ?? "/,/platform,/architecture,/use-cases,/trust,/company,/resources,/demo").split(",");
const outDir = process.argv[5] ?? join(".artifacts", "qa", "latest");
const shots = process.env.SHOTS !== "0";
mkdirSync(outDir, { recursive: true });

const browser = await chromium.launch();
const report = [];
for (const width of widths) {
  const context = await browser.newContext({ viewport: { width, height: 900 }, reducedMotion: "reduce", deviceScaleFactor: 1 });
  const page = await context.newPage();
  const errors = [];
  page.on("pageerror", (error) => errors.push(error.message));
  page.on("console", (message) => { if (message.type() === "error") errors.push(message.text()); });
  for (const route of routes) {
    await page.goto(base + route, { waitUntil: "networkidle" });
    await page.evaluate(async () => {
      await document.fonts.ready;
      for (let y = 0; y < document.documentElement.scrollHeight; y += 700) { window.scrollTo(0, y); await new Promise((r) => setTimeout(r, 40)); }
      window.scrollTo(0, 0);
      await Promise.all(Array.from(document.images, (image) => image.decode().catch(() => {})));
    });
    const result = await page.evaluate(() => {
      const vw = window.innerWidth;
      const issues = [];
      const label = (el) => `${el.tagName.toLowerCase()}${el.id ? "#" + el.id : ""}${el.className && typeof el.className === "string" ? "." + el.className.split(" ")[0] : ""} "${(el.textContent || "").trim().slice(0, 40)}"`;
      if (document.documentElement.scrollWidth > vw + 1) issues.push(`page scrollWidth ${document.documentElement.scrollWidth} > ${vw}`);
      const clips = (el) => { for (let a = el.parentElement; a; a = a.parentElement) { const s = getComputedStyle(a); if (/(hidden|clip|auto|scroll)/.test(s.overflowX)) return a; } return null; };
      for (const el of document.querySelectorAll("body *")) {
        const s = getComputedStyle(el);
        if (s.display === "none" || s.visibility === "hidden" || el.closest("[hidden],dialog:not([open]),.sr-only,[aria-hidden=true]")) continue;
        const r = el.getBoundingClientRect();
        if (r.width <= 1 || r.height <= 1) continue;
        if ((r.right > vw + 1 || r.left < -1) && !clips(el)) issues.push(`outside viewport: ${label(el)} [${Math.round(r.left)}..${Math.round(r.right)}]`);
        if (/(hidden|clip)/.test(s.overflowX) && el.scrollWidth > el.clientWidth + 2 && s.textOverflow !== "ellipsis" && el.children.length === 0 && (el.textContent || "").trim()) issues.push(`clipped text: ${label(el)}`);
      }
      for (const group of document.querySelectorAll("[role=tablist],[role=radiogroup]")) {
        const items = Array.from(group.querySelectorAll("[role=tab],[role=radio]")).filter((el) => el.getBoundingClientRect().width > 0);
        for (let i = 0; i < items.length; i++) for (let j = i + 1; j < items.length; j++) {
          const a = items[i].getBoundingClientRect(), c = items[j].getBoundingClientRect();
          if (a.left < c.right - 1 && c.left < a.right - 1 && a.top < c.bottom - 1 && c.top < a.bottom - 1) issues.push(`controls overlap: ${label(items[i])} / ${label(items[j])}`);
        }
        for (const item of items) { const range = document.createRange(); range.selectNodeContents(item); const t = range.getBoundingClientRect(); const r = item.getBoundingClientRect(); if (t.width > r.width + 2 && getComputedStyle(item).overflow === "visible") issues.push(`label wider than control: ${label(item)}`); }
      }
      for (const svg of document.querySelectorAll("svg[role=img]")) {
        if (!svg.getBoundingClientRect().width) continue;
        const texts = Array.from(svg.querySelectorAll("text")).filter((t) => t.getBBox().width > 0);
        const view = svg.viewBox.baseVal;
        const boxes = texts.map((t) => ({ t, b: t.getBBox() }));
        for (const { t, b } of boxes) if (b.x < view.x - 1 || b.y < view.y - 1 || b.x + b.width > view.x + view.width + 1 || b.y + b.height > view.y + view.height + 1) issues.push(`svg text outside viewBox: "${t.textContent}"`);
        for (let i = 0; i < boxes.length; i++) for (let j = i + 1; j < boxes.length; j++) {
          const a = boxes[i].b, c = boxes[j].b;
          if (a.x < c.x + c.width - 1 && c.x < a.x + a.width - 1 && a.y < c.y + c.height - 1 && c.y < a.y + a.height - 1) issues.push(`svg text overlap: "${boxes[i].t.textContent}" / "${boxes[j].t.textContent}"`);
        }
      }
      return [...new Set(issues)].slice(0, 40);
    });
    const name = `${(route.replace(/\//g, "_") || "_")}-${width}`;
    if (shots) {
      const height = await page.evaluate(() => document.documentElement.scrollHeight);
      for (let y = 0, index = 0; y < height; y += 900, index++) await page.screenshot({ path: join(outDir, `${name}-${String(index).padStart(2, "0")}.jpg`), type: "jpeg", quality: 72, fullPage: true, clip: { x: 0, y, width, height: Math.min(900, height - y) } });
    }
    report.push({ route, width, issues: result, errors: [...errors] });
    errors.length = 0;
    console.log(`${String(width).padStart(4)} ${route.padEnd(14)} ${result.length ? result.length + " issue(s)" : "ok"}`);
    for (const issue of result) console.log("       - " + issue);
  }
  await context.close();
}
await browser.close();
writeFileSync(join(outDir, "report.json"), JSON.stringify(report, null, 2));
const errorRuns = report.filter((r) => r.errors.length);
if (errorRuns.length) console.log("Console errors:", JSON.stringify(errorRuns.map((r) => [r.route, r.width, r.errors]), null, 1));
