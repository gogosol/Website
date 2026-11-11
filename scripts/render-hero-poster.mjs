// Renders the hero poster images from the real-time scene (src/components/qcertify/hero/trustScene.ts).
// The live canvas and the poster share one code path, so the live scene can cross-fade in seamlessly.
// Usage: node scripts/render-hero-poster.mjs   (writes src/assets/hero/*.jpg and a preview in .artifacts)
import { execFileSync } from "node:child_process";
import { createServer } from "node:http";
import { mkdirSync, readFileSync, writeFileSync, existsSync } from "node:fs";
import { extname, join, resolve, normalize } from "node:path";
import { chromium } from "@playwright/test";
import sharp from "sharp";

const root = process.cwd();
const harness = join(root, ".artifacts/cinematic/harness");
mkdirSync(harness, { recursive: true });
mkdirSync(join(root, "src/assets/hero"), { recursive: true });
execFileSync(process.execPath, [join(root, "node_modules/typescript/bin/tsc"), "src/components/qcertify/hero/trustScene.ts", "--outDir", harness, "--module", "esnext", "--target", "es2022", "--moduleResolution", "bundler", "--skipLibCheck", "--lib", "es2022,dom", "--noEmitOnError", "false"], { stdio: "inherit" });

writeFileSync(join(harness, "index.html"), `<!doctype html><html><head><meta charset="utf-8"><style>html,body{margin:0;background:#f2f1ec}#host{width:1600px;height:900px}</style>
<script type="importmap">{"imports":{"three":"/node_modules/three/build/three.module.js","three/addons/":"/node_modules/three/examples/jsm/"}}</script></head>
<body><div id="host"></div><script type="module">
import { createTrustScene } from "/.artifacts/cinematic/harness/trustScene.js";
window.renderPoster = (framing, width, height, pixelRatio) => {
  const host = document.getElementById("host");
  host.style.width = width + "px"; host.style.height = height + "px"; host.innerHTML = "";
  const scene = createTrustScene(host, { still: true, framing, pixelRatio });
  const url = scene.renderStill();
  scene.dispose();
  return url;
};
window.harnessReady = true;
</script></body></html>`);

const types = { ".html": "text/html", ".js": "text/javascript", ".mjs": "text/javascript", ".json": "application/json" };
const server = createServer((request, response) => {
  const path = decodeURIComponent(new URL(request.url, "http://x").pathname).replace(/^[/]+/, "");
  const file = normalize(resolve(root, path || ".artifacts/cinematic/harness/index.html"));
  if (!file.startsWith(root) || !existsSync(file)) { response.writeHead(404); response.end(); return; }
  response.writeHead(200, { "Content-Type": types[extname(file)] ?? "application/octet-stream" });
  response.end(readFileSync(file));
});
await new Promise((done) => server.listen(3199, "127.0.0.1", done));
const browser = await chromium.launch({ args: ["--use-angle=d3d11", "--enable-gpu", "--ignore-gpu-blocklist"] });
const page = await browser.newPage();
page.on("console", (message) => { if (message.type() === "error" || message.type() === "warning") console.log("[page]", message.text()); });
page.on("pageerror", (error) => console.log("[pageerror]", error.message));
await page.goto("http://127.0.0.1:3199/.artifacts/cinematic/harness/index.html");
await page.waitForFunction(() => window.harnessReady === true, null, { timeout: 30000 });
const jobs = [
  { name: "trust-architecture-wide", framing: "wide", width: 1600, height: 900, out: [2400, 1350] },
  { name: "trust-architecture-tall", framing: "tall", width: 900, height: 1125, out: [1080, 1350] },
];
for (const job of jobs) {
  const url = await page.evaluate(({ framing, width, height }) => window.renderPoster(framing, width, height, 2), job);
  const png = Buffer.from(url.split(",")[1], "base64");
  writeFileSync(join(root, `.artifacts/cinematic/${job.name}-raw.png`), png);
  await sharp(png).resize(job.out[0], job.out[1], { kernel: "lanczos3" }).jpeg({ quality: 88, mozjpeg: true, chromaSubsampling: "4:4:4" }).toFile(join(root, `src/assets/hero/${job.name}.jpg`));
  console.log("rendered", job.name);
}
await browser.close();
server.close();
