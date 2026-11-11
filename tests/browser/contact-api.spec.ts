import { test, expect } from "@playwright/test";
import { onRequest, type ContactEnv } from "../../functions/api/contact";

const payload = { intent: "demo", name: "Website test", email: "qa@example.com", company: "Example company", interest: "site-to-site", message: "", website: "" };

function request(body: unknown, { origin = "https://qcertify.io", method = "POST", ip = "contact-api-test" } = {}) {
  return new Request("https://qcertify.io/api/contact", {
    method,
    headers: { "Content-Type": "application/json", Origin: origin, "CF-Connecting-IP": ip },
    body: method === "POST" ? JSON.stringify(body) : undefined,
  });
}

test("contact function validates input, discards honeypots and reports missing delivery honestly @smoke", async ({}, testInfo) => {
  test.skip(testInfo.project.name !== "desktop", "Function behaviour is independent of viewport.");
  const originalFetch = globalThis.fetch;
  let externalCalls = 0;
  globalThis.fetch = async () => {
    externalCalls++;
    throw new Error("External delivery is forbidden in this test.");
  };
  const env: ContactEnv = {};
  try {
    expect((await onRequest({ request: request(payload, { method: "GET" }), env })).status).toBe(405);
    expect((await onRequest({ request: request(payload, { origin: "https://example.invalid" }), env })).status).toBe(403);
    expect((await onRequest({ request: request({ ...payload, email: "invalid" }), env })).status).toBe(400);
    expect((await onRequest({ request: request({ ...payload, intent: "unknown" }), env })).status).toBe(400);
    const honeypot = await onRequest({ request: request({ ...payload, website: "https://example.invalid/bot" }), env });
    expect(honeypot.status).toBe(200);
    expect(await honeypot.json()).toMatchObject({ ok: true });
    const unavailable = await onRequest({ request: request(payload), env });
    expect(unavailable.status).toBe(503);
    expect(await unavailable.json()).toMatchObject({ ok: false, message: expect.stringContaining("contact@qcertify.io") });
    expect(externalCalls, "No email or other network service may be called").toBe(0);
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test("contact function only confirms success when the provider accepts the message @smoke", async ({}, testInfo) => {
  test.skip(testInfo.project.name !== "desktop", "Function behaviour is independent of viewport.");
  const originalFetch = globalThis.fetch;
  const sent: { url: string; body: Record<string, unknown> }[] = [];
  let reply = new Response(JSON.stringify({ name: "validation_error" }), { status: 422 });
  globalThis.fetch = (async (url: string, init: RequestInit) => {
    sent.push({ url: String(url), body: JSON.parse(String(init.body)) });
    return reply;
  }) as typeof fetch;
  const env: ContactEnv = { RESEND_API_KEY: "re_test_only", CONTACT_TO_EMAIL: "inbox@example.com" };
  try {
    const rejected = await onRequest({ request: request(payload, { ip: "provider-test-1" }), env });
    expect(rejected.status).toBe(502);
    expect(await rejected.json()).toMatchObject({ ok: false });
    reply = new Response(JSON.stringify({ id: "test-message-id" }), { status: 200 });
    const accepted = await onRequest({ request: request({ ...payload, intent: "deployment" }, { ip: "provider-test-2" }), env });
    expect(accepted.status).toBe(200);
    expect(await accepted.json()).toMatchObject({ ok: true });
    expect(sent).toHaveLength(2);
    expect(sent[1].url).toBe("https://api.resend.com/emails");
    expect(sent[1].body).toMatchObject({ to: ["inbox@example.com"], reply_to: "qa@example.com", subject: "Pilot or deployment conversation: Example company" });
  } finally {
    globalThis.fetch = originalFetch;
  }
});
