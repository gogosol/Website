import type { Metadata } from "next";

/** Production origin. Canonical URLs, Open Graph URLs, the sitemap and robots.txt use it. */
export const siteUrl = "https://qcertify.io";
export const publicRoutes = ["/", "/platform", "/architecture", "/use-cases", "/trust", "/company", "/resources", "/demo"] as const;
export const socialImage = { url: "/social-image.png", width: 1200, height: 630, alt: "QuantumHalon by QCertify. Post-quantum protection. On your existing network." };

export function pageMetadata(title: string, description: string, path: string): Metadata {
  const fullTitle = `${title} | QCertify`;
  const url = `${siteUrl}${path === "/" ? "" : path}`;
  return {
    title: fullTitle,
    description,
    alternates: { canonical: url },
    openGraph: { title: fullTitle, description, url, siteName: "QCertify", locale: "en_GB", type: "website", images: [socialImage] },
    twitter: { card: "summary_large_image", title: fullTitle, description, images: [socialImage.url] },
  };
}
