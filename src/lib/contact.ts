import { z } from "zod";

const cleanText = (max: number) =>
  z.string().trim().min(1, "Required").max(max).refine((value) => !/[<>]/.test(value), "Invalid characters");

export const contactSchema = z.object({
  name: cleanText(80),
  email: z.string().trim().email("Enter a valid work email").max(254),
  company: cleanText(120),
  priorityPath: z.enum([
    "schedule-demo",
    "launch-pilot",
    "critical-system",
    "site-to-site",
    "partner-exchange",
    "hybrid-cloud",
    "not-sure",
  ]),
  message: z.string().trim().max(1200).optional().default(""),
  website: z.string().max(0).optional().default(""),
});

export type ContactPayload = z.infer<typeof contactSchema>;

export const priorityPathLabels: Record<ContactPayload["priorityPath"], string> = {
  "schedule-demo": "Schedule an Interactive Demo",
  "launch-pilot": "Launch 14-Day Governed Pilot",
  "critical-system": "Critical system path",
  "site-to-site": "Site-to-site traffic",
  "partner-exchange": "Partner exchange",
  "hybrid-cloud": "Hybrid cloud transit",
  "not-sure": "Not sure yet",
};
