import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About QCertify - Practical Post-Quantum Protection",
  description:
    "QCertify creates practical post-quantum cybersecurity solutions, including QuantumHalon, for traffic protection, readiness evidence, and governed migration.",
};

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

