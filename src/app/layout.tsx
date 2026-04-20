import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://qcertify.io"),
  title: {
    default: "QCertify | Post-Quantum Cryptographic Protection for Organizations",
    template: "%s | QCertify",
  },
  description:
    "QCertify protects organizations for the post-quantum era. QuantumHalon is a crypto-agile gateway that applies Post-Quantum Cryptography to protect critical communications, reduce HNDL risk, and support gradual PQC transition.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "QCertify | Post-Quantum Cryptographic Protection for Organizations",
    description:
      "QCertify helps organizations adopt post-quantum protection in a practical, secure and credible way. QuantumHalon protects traffic today and enables phased PQC transition.",
    url: "https://qcertify.io",
    siteName: "QCertify",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "QCertify | Post-Quantum Cryptographic Protection",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "QCertify | Post-Quantum Cryptographic Protection for Organizations",
    description:
      "QuantumHalon is a crypto-agile gateway that protects critical communications with Post-Quantum Cryptography.",
    images: ["/og-image.jpg"],
  },
};

import GlobalParticles from "@/components/GlobalParticles";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} h-full antialiased bg-black text-white overflow-x-hidden`}
    >
      <body className="min-h-full flex flex-col overflow-x-hidden relative" suppressHydrationWarning>
        <GlobalParticles />
        <Header />
        <main className="flex-1 min-h-screen">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}


