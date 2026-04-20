import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Resources - Post-Quantum Transition Knowledge Hub",
  description:
    "Explore QCertify's knowledge hub: Harvest Now Decrypt Later, crypto agility, post-quantum migration, and gateway-based protection.",
};

export default function ResourcesLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

