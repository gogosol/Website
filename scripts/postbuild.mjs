/**
 * Post-build step for the static export (Cloudflare Pages).
 *
 * 1. Encodes a WebP variant of every bitmap in out/_next/static/media for each width in
 *    src/lib/image-widths.json (the custom image loader requests <name>.w<width>.webp).
 * 2. Verifies the export: every public route has an HTML file, every referenced image
 *    variant exists, required platform files are present, and the output respects the
 *    Cloudflare Pages Free limits (20,000 files, 25 MiB per file).
 */
import { copyFile, mkdir, readFile, readdir, stat } from "node:fs/promises";
import { existsSync } from "node:fs";
import { join, relative, sep } from "node:path";
import sharp from "sharp";

const root = process.cwd();
const out = join(root, "out");
const media = join(out, "_next", "static", "media");
const widths = JSON.parse(await readFile(join(root, "src/lib/image-widths.json"), "utf8"));
const allWidths = [...new Set([...widths.imageSizes, ...widths.deviceSizes])].sort((a, b) => a - b);
const routes = JSON.parse(await readFile(join(root, "tests/routes.json"), "utf8"));

if (!existsSync(out)) throw new Error("out/ is missing: run next build with output: \"export\" first.");

/** Portraits keep clean cut-out edges and skin tones; photographic artwork tolerates stronger compression. */
function qualityFor(name) {
  if (/^(goncalo|gabriel)\./.test(name)) return { quality: 84, alphaQuality: 100, smartSubsample: true, effort: 5 };
  if (/wordmark|logo/i.test(name)) return { quality: 92, alphaQuality: 100, effort: 5 };
  return { quality: 74, smartSubsample: true, effort: 5 };
}

const started = Date.now();
let written = 0;
let reused = 0;
// Media file names contain a content hash, so encoded variants can be cached across builds.
const cache = join(root, "node_modules", ".cache", "qcertify-webp");
await mkdir(cache, { recursive: true });
const sources = (await readdir(media)).filter((file) => /\.(png|jpe?g)$/i.test(file) && !/\.w\d+\.webp$/.test(file));
for (const file of sources) {
  const input = join(media, file);
  const meta = await sharp(input).metadata();
  for (const width of allWidths) {
    const name = file.replace(/\.(png|jpe?g)$/i, `.w${width}.webp`);
    const target = join(media, name);
    const cached = join(cache, name);
    if (existsSync(cached)) { await copyFile(cached, target); reused++; continue; }
    await sharp(input)
      .resize({ width: Math.min(width, meta.width ?? width), withoutEnlargement: true })
      .webp(qualityFor(file))
      .toFile(target);
    await copyFile(target, cached);
    written++;
  }
}

async function walk(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const files = await Promise.all(entries.map((entry) => {
    const path = join(directory, entry.name);
    return entry.isDirectory() ? walk(path) : [path];
  }));
  return files.flat();
}

const files = await walk(out);
const problems = [];

// Every route must exist as a prerendered HTML document.
for (const route of routes) {
  const html = route === "/" ? "index.html" : `${route.slice(1)}.html`;
  if (!existsSync(join(out, html))) problems.push(`Missing prerendered route ${route} (${html})`);
}
for (const required of ["404.html", "robots.txt", "sitemap.xml", "social-image.png", "_headers", "_redirects"]) {
  if (!existsSync(join(out, required))) problems.push(`Missing ${required}`);
}

// Every image variant referenced by HTML or RSC payloads must exist.
const referenced = new Set();
for (const file of files.filter((path) => /\.(html|txt)$/.test(path))) {
  const text = await readFile(file, "utf8");
  for (const match of text.matchAll(/\/_next\/static\/media\/[^"'\s)\\,]+?\.w\d+\.webp/g)) referenced.add(match[0]);
}
for (const url of referenced) {
  if (!existsSync(join(out, ...decodeURIComponent(url).split("/").filter(Boolean)))) problems.push(`Referenced image variant missing: ${url}`);
}

// No development or tunnel hosts may leak into production metadata.
for (const file of files.filter((path) => path.endsWith(".html"))) {
  const text = await readFile(file, "utf8");
  if (/devtunnels\.ms|localhost:3000|127\.0\.0\.1/.test(text)) problems.push(`Development host referenced in ${relative(out, file)}`);
}

// Cloudflare Pages Free limits.
const MAX_FILES = 20_000;
const MAX_BYTES = 25 * 1024 * 1024;
let largest = { path: "", size: 0 };
let total = 0;
for (const file of files) {
  const { size } = await stat(file);
  total += size;
  if (size > largest.size) largest = { path: relative(out, file), size };
  if (size > MAX_BYTES) problems.push(`${relative(out, file)} exceeds 25 MiB`);
}
if (files.length > MAX_FILES) problems.push(`${files.length} files exceed the 20,000-file limit`);

const mb = (bytes) => `${(bytes / 1024 / 1024).toFixed(2)} MiB`;
console.log(`[postbuild] ${sources.length} source images → ${written} WebP variants written, ${reused} reused (${((Date.now() - started) / 1000).toFixed(1)} s)`);
console.log(`[postbuild] ${referenced.size} referenced variants verified`);
console.log(`[postbuild] out/: ${files.length} files, ${mb(total)} total, largest ${largest.path.split(sep).join("/")} (${mb(largest.size)})`);
if (problems.length) {
  console.error(`[postbuild] ${problems.length} problem(s):\n  - ${problems.join("\n  - ")}`);
  process.exit(1);
}
console.log("[postbuild] Static export verified for Cloudflare Pages.");
