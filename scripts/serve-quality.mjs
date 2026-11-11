/**
 * Local preview of the static export with Cloudflare Pages semantics:
 * pretty URLs (/platform -> platform.html, /platform.html and /platform/ -> 308 /platform),
 * 404.html with a 404 status, public/_headers and public/_redirects, and brotli/gzip
 * compression of text assets. POST /api/contact answers 503 because Pages Functions only run
 * on Cloudflare (or under `npx wrangler pages dev out`).
 *
 * Usage: node scripts/serve-quality.mjs <port>
 */
import { createServer } from "node:http";
import { existsSync, readFileSync, statSync } from "node:fs";
import { extname, join, normalize, resolve, sep } from "node:path";
import { brotliCompressSync, gzipSync, constants } from "node:zlib";

const started = Date.now();
const port = Number(process.argv[2]);
if (!Number.isInteger(port) || port < 1024 || port > 65535) throw new Error("Pass an unprivileged local port.");
const root = resolve(process.cwd(), "out");
if (!existsSync(join(root, "index.html"))) throw new Error("Run npm run build before previewing the static export.");

const types = {
  ".html": "text/html; charset=utf-8", ".js": "text/javascript; charset=utf-8", ".css": "text/css; charset=utf-8",
  ".json": "application/json; charset=utf-8", ".txt": "text/plain; charset=utf-8", ".xml": "application/xml; charset=utf-8",
  ".svg": "image/svg+xml", ".png": "image/png", ".jpg": "image/jpeg", ".jpeg": "image/jpeg", ".webp": "image/webp",
  ".avif": "image/avif", ".ico": "image/x-icon", ".woff2": "font/woff2", ".map": "application/json",
};
const compressible = new Set([".html", ".js", ".css", ".json", ".txt", ".xml", ".svg", ".map"]);

function parseRules(file) {
  const path = join(root, file);
  return existsSync(path) ? readFileSync(path, "utf8").split(/\r?\n/) : [];
}
function pattern(source) {
  const escaped = source.replace(/[.+?^${}()|[\]\\]/g, "\\$&").replace(/\*/g, ".*").replace(/:[a-z]+/gi, "[^/]+");
  return new RegExp(`^${escaped}$`);
}
const headerRules = [];
for (const line of parseRules("_headers")) {
  if (!line.trim() || line.trim().startsWith("#")) continue;
  if (!/^\s/.test(line)) headerRules.push({ test: pattern(line.trim()), headers: [] });
  else if (headerRules.length) {
    const index = line.indexOf(":");
    headerRules.at(-1).headers.push([line.slice(0, index).trim(), line.slice(index + 1).trim()]);
  }
}
const redirects = parseRules("_redirects").filter((line) => line.trim() && !line.trim().startsWith("#")).map((line) => {
  const [from, to, status = "302"] = line.trim().split(/\s+/);
  return { test: pattern(from), to, status: Number(status) };
});

// Compressed bodies are cached per file version, so a rebuild never serves stale content.
const cache = new Map();
const version = (path) => `${path}@${statSync(path).mtimeMs}`;
function file(path) {
  return readFileSync(path);
}
function resolveFile(pathname) {
  const safe = normalize(decodeURIComponent(pathname)).replace(/^([/\\])+/, "");
  const full = join(root, safe);
  if (!full.startsWith(root + sep) && full !== root) return null;
  if (pathname === "/") return join(root, "index.html");
  if (existsSync(full) && statSync(full).isFile()) return full;
  if (existsSync(`${full}.html`)) return `${full}.html`;
  if (existsSync(join(full, "index.html"))) return join(full, "index.html");
  return null;
}

createServer((request, response) => {
  const url = new URL(request.url ?? "/", `http://${request.headers.host ?? "localhost"}`);
  const { pathname } = url;
  const send = (status, body, headers = {}) => { response.writeHead(status, headers); response.end(request.method === "HEAD" ? undefined : body); };

  if (pathname === "/api/contact") {
    return send(503, JSON.stringify({ ok: false, message: "The contact function runs on Cloudflare Pages. Please email contact@qcertify.io." }), { "Content-Type": "application/json; charset=utf-8" });
  }
  if (request.method !== "GET" && request.method !== "HEAD") return send(405, "Method not allowed", { Allow: "GET, HEAD" });

  for (const rule of redirects) if (rule.test.test(pathname)) return send(rule.status, "", { Location: rule.to });
  if (pathname.endsWith(".html") && pathname !== "/404.html") return send(308, "", { Location: pathname.replace(/(index)?\.html$/, "") || "/" });
  if (pathname.length > 1 && pathname.endsWith("/") && resolveFile(pathname.slice(0, -1))) return send(308, "", { Location: pathname.slice(0, -1) + url.search });

  let path = resolveFile(pathname);
  let status = 200;
  if (!path) { path = join(root, "404.html"); status = 404; }
  const extension = extname(path).toLowerCase();
  const headers = { "Content-Type": types[extension] ?? "application/octet-stream" };
  for (const rule of headerRules) if (rule.test.test(pathname)) for (const [name, value] of rule.headers) headers[name] = value;
  if (!headers["Cache-Control"]) headers["Cache-Control"] = "public, max-age=0, must-revalidate";

  let body = file(path);
  const accept = String(request.headers["accept-encoding"] ?? "");
  if (compressible.has(extension) && body.length > 1024) {
    headers.Vary = "Accept-Encoding";
    if (/\bbr\b/.test(accept)) {
      const key = `${version(path)}#br`;
      if (!cache.has(key)) cache.set(key, brotliCompressSync(body, { params: { [constants.BROTLI_PARAM_QUALITY]: 9 } }));
      body = cache.get(key); headers["Content-Encoding"] = "br";
    } else if (/\bgzip\b/.test(accept)) {
      const key = `${version(path)}#gz`;
      if (!cache.has(key)) cache.set(key, gzipSync(body, { level: 9 }));
      body = cache.get(key); headers["Content-Encoding"] = "gzip";
    }
  }
  headers["Content-Length"] = String(body.length);
  send(status, body, headers);
}).listen(port, "127.0.0.1", () => {
  console.log(`Static export (Cloudflare Pages semantics) on http://127.0.0.1:${port}`);
  console.log(`Ready in ${Date.now() - started}ms`);
});
