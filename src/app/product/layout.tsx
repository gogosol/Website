import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "QuantumHalon - Crypto-Agile Gateway Software",
  description:
    "QuantumHalon is QCertify's crypto-agile gateway software. Protect traffic, support phased post-quantum migration, and deploy stronger cryptographic protection without redesigning your infrastructure.",
};

export default function ProductLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

