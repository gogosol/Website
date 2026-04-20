import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About QCertify - Building Enterprise Cryptographic Protection",
  description:
    "QCertify builds enterprise cryptographic protection for the post-quantum era. Learn about our mission and commitment to practical, deployable security infrastructure.",
};

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

