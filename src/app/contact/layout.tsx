import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact - QuantumHalon Technical Demo",
  description:
    "Request a technical demonstration of QuantumHalon and discuss inline placement, protection behavior, trust readiness, and post-quantum readiness with QCertify.",
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

