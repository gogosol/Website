import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "How It Works - QuantumHalon Gateway Architecture",
  description:
    "Learn how QuantumHalon's crypto-agile gateway architecture protects traffic and supports phased post-quantum migration without requiring changes to existing infrastructure.",
};

export default function HowItWorksLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

