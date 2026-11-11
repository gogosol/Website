import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { Navigation } from "@/components/qcertify/Navigation";
import { Footer } from "@/components/qcertify/Footer";
import "./globals.css";

const geist = localFont({ src: "../fonts/Geist-Variable-latin.woff2", variable: "--font-geist", weight: "100 900", display: "swap", adjustFontFallback: "Arial" });
const geistMono = localFont({ src: "../fonts/GeistMono-Variable-latin.woff2", variable: "--font-geist-mono", weight: "100 900", display: "swap", preload: false, adjustFontFallback: false });

export const metadata: Metadata = {
  metadataBase: new URL("https://qcertify.io"),
  title: "QCertify | Post-quantum protection for existing networks",
  description: "QuantumHalon by QCertify protects selected network traffic with post-quantum cryptography, through inline gateways and a control plane you operate.",
  applicationName: "QCertify", authors: [{ name: "QCertify" }], category: "Cybersecurity",
  icons: { icon: "/icon.png", apple: "/icon.png" }, robots: { index: true, follow: true },
};
export const viewport: Viewport = { themeColor: "#f3f2ee", colorScheme: "light" };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en" className={`${geist.variable} ${geistMono.variable}`}>
    <body>
      <a className="skip-link" href="#main-content">Skip to content</a>
      <Navigation />
      <main id="main-content" tabIndex={-1}>{children}</main>
      <Footer />
    </body>
  </html>;
}
