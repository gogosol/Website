import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About QCertify - Practical Post-Quantum Protection",
  description:
    "QCertify builds QuantumHalon, a focused inline gateway fabric for practical, privacy-aware post-quantum traffic protection and governed migration.",
};

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

