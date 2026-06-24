import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Readiness - Post-Quantum Migration Planning",
  description:
    "QCertify helps organizations plan post-quantum readiness with cryptographic inventory, priority traffic paths, trust readiness, crypto agility, and evidence.",
};

export default function ComplianceLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

