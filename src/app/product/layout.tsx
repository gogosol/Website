import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "QuantumHalon - Inline Post-Quantum Gateway Fabric",
  description:
    "QuantumHalon is QCertify's transparent inline gateway fabric for policy-driven protection behavior and governed post-quantum migration.",
};

export default function ProductLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

