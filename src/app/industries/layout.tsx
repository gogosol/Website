import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Industries — Crypto-Agile Protection by Sector",
  description:
    "QCertify supports financial services, healthcare, government, and critical infrastructure in protecting traffic and preparing for post-quantum transition.",
};

export default function IndustriesLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
