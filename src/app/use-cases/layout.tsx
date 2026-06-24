import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Use Cases - Post-Quantum Traffic Protection Paths",
  description:
    "See how QuantumHalon supports selected enterprise paths, protected destinations, partner exchange, segmented environments, and compliance-sensitive egress.",
};

export default function UseCasesLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

