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
    default: "QCertify — Enterprise Cryptographic Protection for the Post-Quantum Era",
    template: "%s | QCertify",
  },
  description:
    "QCertify builds enterprise cryptographic protection for the post-quantum era. QuantumHalon is a crypto-agile gateway that protects traffic and supports phased migration.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "QCertify — Enterprise Cryptographic Protection for the Post-Quantum Era",
    description:
      "QuantumHalon is a crypto-agile gateway that protects traffic today and enables phased transition to stronger cryptographic protection.",
    url: "https://qcertify.io",
    siteName: "QCertify",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "QCertify — Enterprise Cryptographic Protection",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "QCertify — Enterprise Cryptographic Protection for the Post-Quantum Era",
    description:
      "QuantumHalon is a crypto-agile gateway that protects traffic and supports phased post-quantum migration.",
    images: ["/og-image.jpg"],
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
      <body className="min-h-full flex flex-col overflow-x-hidden">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
