import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Industries - QuantumHalon for Long-Lived Sensitive Data",
  description:
    "QCertify supports financial services, government, critical infrastructure, healthcare, and enterprise networks where sensitive traffic outlives today's encryption.",
};

export default function IndustriesLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

