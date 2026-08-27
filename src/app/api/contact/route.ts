import { NextResponse } from "next/server";
import { Resend } from "resend";
import { contactSchema, priorityPathLabels } from "@/lib/contact";

export const runtime = "nodejs";

const WINDOW_MS = 10 * 60 * 1000;
const MAX_ATTEMPTS = 5;
const attempts = new Map<string, { count: number; resetAt: number }>();

function allowedOrigins(request: Request) {
  const current = new URL(request.url).origin;
  const configured = (process.env.CONTACT_ALLOWED_ORIGINS ?? "")
    .split(",")
    .map((origin) => origin.trim())
    .filter(Boolean);
  return new Set([current, "https://qcertify.io", "https://www.qcertify.io", ...configured]);
}

function clientKey(request: Request) {
  return (
    request.headers.get("cf-connecting-ip") ??
    request.headers.get("x-real-ip") ??
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    "unknown"
  );
}

function rateLimited(key: string) {
  const now = Date.now();
  for (const [entryKey, entry] of attempts) {
    if (entry.resetAt <= now) attempts.delete(entryKey);
  }

  const entry = attempts.get(key);
  if (!entry || entry.resetAt <= now) {
    attempts.set(key, { count: 1, resetAt: now + WINDOW_MS });
    return false;
  }
  entry.count += 1;
  return entry.count > MAX_ATTEMPTS;
}

export async function POST(request: Request) {
  const contentType = request.headers.get("content-type") ?? "";
  const contentLength = Number(request.headers.get("content-length") ?? "0");
  if (!contentType.includes("application/json") || contentLength > 16_384) {
    return NextResponse.json({ ok: false, message: "Invalid request." }, { status: 415 });
  }

  const origin = request.headers.get("origin");
  if (origin && !allowedOrigins(request).has(origin)) {
    return NextResponse.json({ ok: false, message: "Invalid request." }, { status: 403 });
  }

  if (rateLimited(clientKey(request))) {
    return NextResponse.json(
      { ok: false, message: "Please wait before trying again." },
      { status: 429, headers: { "Retry-After": "600" } },
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, message: "Invalid request." }, { status: 400 });
  }

  const parsed = contactSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, message: "Check the form and try again." },
      { status: 400 },
    );
  }

  if (parsed.data.website) {
    return NextResponse.json({ ok: true, message: "Request received." });
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      { ok: false, message: "Email delivery is not configured yet." },
      { status: 503 },
    );
  }

  const resend = new Resend(apiKey);
  const to = process.env.CONTACT_TO_EMAIL ?? "contact@qcertify.io";
  const from = process.env.CONTACT_FROM_EMAIL ?? "QCertify website <noreply@qcertify.io>";
  const { name, email, company, priorityPath, message } = parsed.data;

  const result = await resend.emails.send({
    from,
    to: [to],
    replyTo: email,
    subject: `Demo & Pilot Inquiry: ${company}`,
    text: [
      "New QCertify architecture review request",
      "",
      `Name: ${name}`,
      `Work email: ${email}`,
      `Company: ${company}`,
      `Priority path: ${priorityPathLabels[priorityPath]}`,
      "",
      "Context:",
      message || "Not provided",
    ].join("\n"),
  });

  if (result.error) {
    console.error("[contact] Resend delivery failed", { name: result.error.name });
    return NextResponse.json(
      { ok: false, message: "We could not send this request. Email contact@qcertify.io instead." },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true, message: "Request received. We’ll be in touch." });
}
