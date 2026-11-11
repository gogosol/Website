/**
 * Cloudflare Pages Function: POST /api/contact
 *
 * Delivers a validated demo / deployment enquiry by email through the Resend REST API.
 * Runs on the Workers runtime (Pages Functions, free-plan request allowance); no Node.js
 * server is required. Configure as encrypted environment variables in the Pages project:
 *   RESEND_API_KEY (required), CONTACT_TO_EMAIL, CONTACT_FROM_EMAIL, CONTACT_ALLOWED_ORIGINS.
 *
 * The response is successful only when Resend accepts the message and returns an id, so the
 * form never shows a sent state for a request that was not handed to the email provider.
 */
import { contactSchema, intentLabels, interestLabels } from "../../src/lib/contact";

export interface ContactEnv {
  RESEND_API_KEY?: string;
  CONTACT_TO_EMAIL?: string;
  CONTACT_FROM_EMAIL?: string;
  CONTACT_ALLOWED_ORIGINS?: string;
}

interface PagesContext {
  request: Request;
  env: ContactEnv;
}

const WINDOW_MS = 10 * 60 * 1000;
const MAX_ATTEMPTS = 5;
/** Best-effort, per-isolate limiter. Add a Cloudflare rate-limiting rule for a shared limit. */
const attempts = new Map<string, { count: number; resetAt: number }>();

function json(body: Record<string, unknown>, status = 200, headers: Record<string, string> = {}) {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "Cache-Control": "no-store",
      "X-Content-Type-Options": "nosniff",
      ...headers,
    },
  });
}

function allowedOrigins(request: Request, env: ContactEnv) {
  const configured = (env.CONTACT_ALLOWED_ORIGINS ?? "").split(",").map((origin) => origin.trim()).filter(Boolean);
  return new Set([new URL(request.url).origin, "https://qcertify.io", "https://www.qcertify.io", ...configured]);
}

function rateLimited(key: string) {
  const now = Date.now();
  for (const [entryKey, entry] of attempts) if (entry.resetAt <= now) attempts.delete(entryKey);
  const entry = attempts.get(key);
  if (!entry) {
    attempts.set(key, { count: 1, resetAt: now + WINDOW_MS });
    return false;
  }
  entry.count += 1;
  return entry.count > MAX_ATTEMPTS;
}

export async function onRequest({ request, env }: PagesContext): Promise<Response> {
  if (request.method !== "POST") return json({ ok: false, message: "Method not allowed." }, 405, { Allow: "POST" });

  const contentType = request.headers.get("content-type") ?? "";
  const contentLength = Number(request.headers.get("content-length") ?? "0");
  if (!contentType.includes("application/json") || contentLength > 16384) {
    return json({ ok: false, message: "Invalid request." }, 415);
  }

  const origin = request.headers.get("origin");
  if (origin && !allowedOrigins(request, env).has(origin)) return json({ ok: false, message: "Invalid request." }, 403);

  const client = request.headers.get("cf-connecting-ip") ?? request.headers.get("x-real-ip") ?? "unknown";
  if (rateLimited(client)) return json({ ok: false, message: "Please wait a few minutes before trying again." }, 429, { "Retry-After": "600" });

  let body: unknown;
  try {
    const text = await request.text();
    if (text.length > 16384) return json({ ok: false, message: "Invalid request." }, 413);
    body = JSON.parse(text);
  } catch {
    return json({ ok: false, message: "Invalid request." }, 400);
  }

  const parsed = contactSchema.safeParse(body);
  if (!parsed.success) return json({ ok: false, message: "Check the form and try again." }, 400);

  // Honeypot: acknowledge and discard.
  if (parsed.data.website) return json({ ok: true, message: "Request received." });

  if (!env.RESEND_API_KEY) {
    return json({ ok: false, message: "The form is temporarily unavailable. Please email contact@qcertify.io." }, 503);
  }

  const { intent, name, email, company, interest, message } = parsed.data;
  const to = env.CONTACT_TO_EMAIL || "contact@qcertify.io";
  const from = env.CONTACT_FROM_EMAIL || "QCertify website <noreply@qcertify.io>";
  const lines = [
    "New website enquiry: " + intentLabels[intent],
    "",
    "Name: " + name,
    "Work email: " + email,
    "Company: " + company,
    "Area of interest: " + interestLabels[interest],
    "",
    "Message:",
    message || "Not provided",
  ];

  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: "Bearer " + env.RESEND_API_KEY, "Content-Type": "application/json" },
      body: JSON.stringify({ from, to: [to], reply_to: email, subject: intentLabels[intent] + ": " + company, text: lines.join("\n") }),
      signal: AbortSignal.timeout(10000),
    });
    const result = (await response.json().catch(() => null)) as { id?: string } | null;
    if (!response.ok || !result?.id) {
      console.error("[contact] Email provider rejected the message", { status: response.status });
      return json({ ok: false, message: "We could not send your request. Please email contact@qcertify.io." }, 502);
    }
  } catch {
    console.error("[contact] Email provider could not be reached");
    return json({ ok: false, message: "We could not confirm delivery. Please try again or email contact@qcertify.io." }, 502);
  }

  return json({ ok: true, message: "Request received. We will reply by email." });
}
