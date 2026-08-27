import type { Metadata, Viewport } from "next";
import "./globals.css";

const title = "QCertify · Govern the transition to hybrid PQC";
const description =
  "QuantumHalon is QCertify's platform for governed hybrid post-quantum key establishment across critical enterprise traffic paths.";

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
    "PQC migration",
    "hybrid PQC",
    "X25519",
    "ML-KEM",
    "FIPS 203",
    "ML-DSA-65",
    "ECDSA",
    "Dual-Cert Catalyst",
    "FIPS 204",
    "CNSA 2.0",
    "harvest now decrypt later",
    "HNDL",
    "inline cryptography",
    "cryptographic governance",
  ],
  openGraph: {
    title,
    description,
    url: "https://qcertify.io",
    siteName: "QCertify",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    creator: "@qcertify",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  themeColor: "#050507",
  colorScheme: "dark",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}
