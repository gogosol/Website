import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Readiness - PQC Deadlines and Migration Planning",
  description:
    "QCertify helps organizations plan post-quantum readiness around real policy milestones, protected traffic paths, trust readiness, crypto agility, and evidence.",
};

export default function ComplianceLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

