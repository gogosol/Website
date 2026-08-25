import type { Metadata, Viewport } from "next";
import "./globals.css";

const title = "QCertify — Govern the transition to hybrid PQC";
const description =
  "QuantumHalon is QCertify’s platform for governed hybrid post-quantum key establishment across critical enterprise traffic paths.";

export const metadata: Metadata = {
  metadataBase: new URL("https://qcertify.io"),
  title,
  description,
  applicationName: "QCertify",
  authors: [{ name: "QCertify" }],
  creator: "QCertify",
  publisher: "QCertify",
  category: "Cybersecurity",
  keywords: [
    "QCertify",
    "QuantumHalon",
    "post-quantum cryptography",
    "ML-KEM-768",
    "harvest now decrypt later",
    "inline security gateway",
    "crypto agility",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    siteName: "QCertify",
    title,
    description,
  },
  twitter: { card: "summary_large_image", title, description },
  robots: { index: true, follow: true },
  icons: { icon: "/icon.png", apple: "/icon.png" },
};

export const viewport: Viewport = {
  colorScheme: "dark",
  themeColor: "#050506",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
