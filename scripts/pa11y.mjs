import { spawn } from "node:child_process";
import { createServer } from "node:net";
import { createRequire } from "node:module";
import { setTimeout as delay } from "node:timers/promises";

const require = createRequire(import.meta.url);
const port = 3102;
const probe = createServer();
await new Promise((resolve, reject) => {
  probe.once("error", reject);
  probe.listen(port, "127.0.0.1", resolve);
});
await new Promise((resolve, reject) => probe.close((error) => error ? reject(error) : resolve()));

const server = spawn(process.execPath, ["scripts/serve-quality.mjs", String(port)], {
  stdio: "inherit", windowsHide: true,
});
server.on("error", (error) => console.error(error));

try {
  const deadline = Date.now() + 120_000;
  let ready = false;
  while (Date.now() < deadline) {
    if (server.exitCode !== null) throw new Error(`Next.js exited with ${server.exitCode}`);
    try {
      const response = await fetch(`http://127.0.0.1:${port}`, { signal: AbortSignal.timeout(2000) });
      ready = response.ok;
      await response.body?.cancel();
    } catch { /* Continue until startup succeeds or the deadline expires. */ }
    if (ready) break;
    await delay(250);
  }
  if (!ready) throw new Error("Next.js did not become ready for Pa11y.");
  const checker = spawn(process.execPath, [require.resolve("pa11y-ci/bin/pa11y-ci.js"), "--config", ".pa11yci.cjs"], {
    stdio: "inherit", windowsHide: true,
  });
  process.exitCode = await new Promise((resolve, reject) => {
    checker.once("error", reject);
    checker.once("exit", (code) => resolve(code ?? 1));
  });
} finally {
  if (server.exitCode === null) {
    const exited = new Promise((resolve) => server.once("exit", resolve));
    server.kill("SIGTERM");
    await Promise.race([exited, delay(5000)]);
    if (server.exitCode === null) server.kill("SIGKILL");
  }
  server.unref();
}
