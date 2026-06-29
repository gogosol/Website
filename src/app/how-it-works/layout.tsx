import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "How It Works - QuantumHalon Inline Architecture",
  description:
    "Learn how QuantumHalon sits inline, classifies selected traffic paths, applies policy behavior, and keeps cloud governance out of the live packet path.",
};

export default function HowItWorksLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

