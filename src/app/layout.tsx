import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "QCertify | Enterprise Quantum Trust & Readiness",
  description: "QCertify helps enterprises assess, document, and communicate quantum-era readiness with structured evidence and governance workflows.",
  openGraph: {
    title: "QCertify | Enterprise Quantum Trust & Readiness",
    description: "The enterprise platform for quantum-era trust, readiness, certification, assurance, and governance.",
    url: "https://qcertify.com",
    siteName: "QCertify",
    images: [
      {
        url: "https://qcertify.com/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "QCertify - Quantum Readiness Platform",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "QCertify | Enterprise Quantum Trust & Readiness",
    description: "The enterprise platform for quantum-era trust, readiness, certification, assurance, and governance.",
    images: ["https://qcertify.com/og-image.jpg"],
  },
};

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
      <body className="min-h-full flex flex-col overflow-x-hidden">{children}</body>
    </html>
  );
}
