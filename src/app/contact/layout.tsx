import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Book a Demo — See QuantumHalon in Action",
  description:
    "Request a technical demonstration of QuantumHalon. See how QCertify's crypto-agile gateway software can protect your traffic and support your post-quantum transition.",
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
