import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Use Cases - Enterprise Traffic Protection & PQ Migration",
  description:
    "See how organizations use QuantumHalon for site-to-site protection, branch security, and phased post-quantum transition in enterprise environments.",
};

export default function UseCasesLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

