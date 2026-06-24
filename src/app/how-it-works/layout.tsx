import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "How It Works - QuantumHalon Inline Architecture",
  description:
    "Learn how QuantumHalon sits inline, classifies traffic paths, selects policy modes, enforces post-quantum protection, and keeps the cloud out of the live packet path.",
};

export default function HowItWorksLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

