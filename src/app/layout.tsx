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
    default: "QCertify | Post-Quantum Cybersecurity Solutions",
    template: "%s | QCertify",
  },
  description:
    "QCertify creates practical post-quantum cybersecurity solutions for organizations protecting long-lived data, regulated traffic, and governed migration programs.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "QCertify | Post-Quantum Cybersecurity Solutions",
    description:
      "QCertify builds PQC solutions for real migration pressure, including QuantumHalon, an inline gateway solution for selected enterprise traffic paths.",
    url: "https://qcertify.io",
    siteName: "QCertify",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "QCertify | Post-Quantum Cybersecurity Solutions",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "QCertify | Post-Quantum Cybersecurity Solutions",
    description:
      "QCertify creates practical PQC solutions for long-lived data risk, readiness evidence, and regulated migration programs.",
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


