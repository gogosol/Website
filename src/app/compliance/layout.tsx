import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Compliance & Readiness — Cryptographic Transition Planning",
  description:
    "QCertify helps organizations prepare for cryptographic transition with phased deployment and governance-aligned readiness — supporting resilience and regulatory expectations.",
};

export default function ComplianceLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
