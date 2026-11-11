import { z } from "zod";

/**
 * Shared validation for the demo / contact form. Used by the browser form and by the
 * Cloudflare Pages Function in functions/api/contact.ts, so both enforce the same rules.
 */
const cleanText = (max: number) =>
  z.string().trim().min(1, "Required").max(max).refine((value) => !/[<>]/.test(value), "Invalid characters");

export const intents = ["demo", "deployment"] as const;
export type Intent = (typeof intents)[number];

export const intentLabels: Record<Intent, string> = {
  demo: "Technical demo",
  deployment: "Pilot or deployment conversation",
};

export const interests = [
  "critical-application",
  "site-to-site",
  "private-cloud",
  "partner-federation",
  "discovery",
  "not-sure",
] as const;
export type Interest = (typeof interests)[number];

export const interestLabels: Record<Interest, string> = {
  "critical-application": "Protect a critical application",
  "site-to-site": "Protect traffic between sites",
  "private-cloud": "Extend protection to a private cloud",
  "partner-federation": "Connect securely with a partner organisation",
  discovery: "Understand our cryptographic exposure",
  "not-sure": "Not sure yet",
};

export const contactSchema = z.object({
  intent: z.enum(intents),
  name: cleanText(80),
  email: z.string().trim().email("Enter a valid work email").max(254),
  company: cleanText(120),
  interest: z.enum(interests).optional().default("not-sure"),
  message: z.string().trim().max(1200).optional().default(""),
  // A bounded honeypot: filled-in requests are acknowledged and discarded before delivery.
  website: z.string().max(500).optional().default(""),
});

export type ContactPayload = z.infer<typeof contactSchema>;

/** Older links used ?goal=...; map them to the current intent and interest. */
export const legacyGoals: Record<string, { intent: Intent; interest?: Interest }> = {
  "schedule-demo": { intent: "demo" },
  "launch-pilot": { intent: "deployment" },
  "critical-system": { intent: "demo", interest: "critical-application" },
  "site-to-site": { intent: "demo", interest: "site-to-site" },
  "hybrid-cloud": { intent: "demo", interest: "private-cloud" },
  "partner-exchange": { intent: "demo", interest: "partner-federation" },
  "not-sure": { intent: "demo", interest: "not-sure" },
};
