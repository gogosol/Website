/**
 * Exhaustive QA of the interactive architecture: every scenario x enabled outcome at several
 * widths. Checks label/label overlap, labels crossing lines, labels escaping their node box or
 * the viewBox, and that the inspector text matches the selected outcome.
 * Usage: node scripts/qa-lab.mjs [baseUrl] [widths] [route]
 */
import { chromium } from "@playwright/test";
import { mkdirSync } from "node:fs";

const base = process.argv[2] ?? "http://127.0.0.1:3000";
const widths = (process.argv[3] ?? "320,390,768,1024,1440").split(",").map(Number);
const route = process.argv[4] ?? "/architecture";
const shotDir = ".artifacts/qa/lab";
mkdirSync(shotDir, { recursive: true });
const browser = await chromium.launch();
let failures = 0;
for (const width of widths) {
  const page = await browser.newPage({ viewport: { width, height: 1000 }, reducedMotion: "reduce" });
  await page.goto(base + route, { waitUntil: "networkidle" });
  const tabs = page.getByRole("tablist", { name: "Network scenarios" }).getByRole("tab");
  for (let s = 0; s < await tabs.count(); s++) {
    await tabs.nth(s).click();
    await page.waitForFunction((index) => document.querySelectorAll("[role=tablist] [role=tab]")[index]?.getAttribute("aria-selected") === "true", s);
    const scenario = (await tabs.nth(s).innerText()).replace(/^\d+\s*/, "").trim();
    const radios = page.getByRole("radiogroup", { name: "Policy outcome" }).getByRole("radio");
    for (let m = 0; m < await radios.count(); m++) {
      const radio = radios.nth(m);
      if (await radio.getAttribute("aria-disabled")) continue;
      await radio.click();
      const mode = (await radio.innerText()).trim();
      const issues = await page.evaluate(() => {
        const svg = Array.from(document.querySelectorAll("svg[role=img], svg[role=group]")).find((el) => el.getBoundingClientRect().width > 0 && el.closest("[role=tabpanel]"));
        if (!svg) return ["no visible diagram"];
        const out = [];
        const view = svg.viewBox.baseVal;
        const texts = Array.from(svg.querySelectorAll("text")).map((t) => ({ t, b: t.getBBox() })).filter(({ b }) => b.width > 0);
        const hit = (a, c, pad = 1) => a.x < c.x + c.width - pad && c.x < a.x + a.width - pad && a.y < c.y + c.height - pad && c.y < a.y + a.height - pad;
        for (const { t, b } of texts) {
          if (b.x < view.x || b.y < view.y || b.x + b.width > view.x + view.width || b.y + b.height > view.y + view.height) out.push(`outside viewBox: "${t.textContent}"`);
          const node = t.closest("g")?.querySelector(":scope > rect");
          if (node && /endpoint|control/.test(node.getAttribute("class") || "")) {
            const r = node.getBBox();
            if (b.x < r.x + 2 || b.x + b.width > r.x + r.width - 2) out.push(`text exceeds its box: "${t.textContent}"`);
          }
        }
        for (let i = 0; i < texts.length; i++) for (let j = i + 1; j < texts.length; j++) if (hit(texts[i].b, texts[j].b)) out.push(`overlap: "${texts[i].t.textContent}" / "${texts[j].t.textContent}"`);
        const segments = [];
        for (const rect of svg.querySelectorAll("g[class*=zone] > rect, rect[class*=slab]:not([class*=Shade])")) {
          const r = rect.getBBox();
          segments.push([r.x, r.y, r.x + r.width, r.y, "border"], [r.x, r.y + r.height, r.x + r.width, r.y + r.height, "border"], [r.x, r.y, r.x, r.y + r.height, "border"], [r.x + r.width, r.y, r.x + r.width, r.y + r.height, "border"]);
        }
        for (const line of svg.querySelectorAll("line")) segments.push([line.x1.baseVal.value, line.y1.baseVal.value, line.x2.baseVal.value, line.y2.baseVal.value, line.getAttribute("class") || line.parentElement.getAttribute("data-kind") || "line"]);
        for (const path of svg.querySelectorAll("path")) {
          const tokens = (path.getAttribute("d") || "").trim().split(/[\s,]+/);
          let x = 0, y = 0;
          for (let i = 0; i < tokens.length;) {
            const cmd = tokens[i++];
            if (cmd === "M") { x = +tokens[i++]; y = +tokens[i++]; }
            else if (cmd === "H") { const nx = +tokens[i++]; segments.push([x, y, nx, y, "path"]); x = nx; }
            else if (cmd === "V") { const ny = +tokens[i++]; segments.push([x, y, x, ny, "path"]); y = ny; }
            else if (cmd === "L") { const nx = +tokens[i++], ny = +tokens[i++]; segments.push([x, y, nx, ny, "path"]); x = nx; y = ny; }
          }
        }
        for (const { t, b } of texts) for (const [x1, y1, x2, y2, kind] of segments) {
          const minX = Math.min(x1, x2), maxX = Math.max(x1, x2), minY = Math.min(y1, y2), maxY = Math.max(y1, y2);
          const crosses = (x1 === x2 || y1 === y2) ? (maxX > b.x + 1 && minX < b.x + b.width - 1 && maxY > b.y + 1 && minY < b.y + b.height - 1) : false;
          if (crosses) out.push(`line crosses text: "${t.textContent}" (${kind})`);
        }
        return [...new Set(out)];
      });
      const panel = await page.getByRole("tabpanel", { name: scenario }).innerText();
      const expected = mode.startsWith("Mode 2") ? "Each gateway authenticates to its configured peer" : mode.startsWith("Mode 1") ? "two TLS legs" : mode === "Passthrough" ? "Nothing is added" : "denied at the first gateway";
      if (!panel.includes(expected)) issues.push(`inspector does not describe ${mode}`);
      if (issues.length) failures++;
      console.log(`${String(width).padStart(4)} ${scenario.padEnd(21)} ${mode.padEnd(24)} ${issues.length ? issues.join(" | ") : "ok"}`);
      if (width === 390 || width === 1440) await page.locator("[role=tabpanel] svg:is([role=img],[role=group]):visible").first().screenshot({ path: `${shotDir}/${width}-${scenario.replace(/\W+/g, "-")}-${mode.replace(/\W+/g, "-")}.jpg`, type: "jpeg", quality: 75 });
    }
  }
  await page.close();
}
await browser.close();
console.log(failures ? `${failures} state(s) with issues` : "All diagram states passed");
process.exitCode = failures ? 1 : 0;
