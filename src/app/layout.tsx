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
    default: "QCertify | Inline Post-Quantum Protection with QuantumHalon",
    template: "%s | QCertify",
  },
  description:
    "QCertify builds QuantumHalon, a transparent inline gateway fabric that helps organizations protect critical traffic with policy-driven post-quantum cryptography and crypto agility.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "QCertify | Inline Post-Quantum Protection with QuantumHalon",
    description:
      "QuantumHalon protects selected enterprise traffic paths from an inline gateway position with policy-selected protection modes and cloud-out-of-path governance.",
    url: "https://qcertify.io",
    siteName: "QCertify",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "QCertify | Inline Post-Quantum Protection",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "QCertify | Inline Post-Quantum Protection with QuantumHalon",
    description:
      "QuantumHalon is a transparent inline gateway fabric for policy-driven post-quantum traffic protection.",
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


