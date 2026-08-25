import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://qcertify.io",
      lastModified: new Date("2026-08-25"),
      changeFrequency: "monthly",
      priority: 1,
    },
  ];
}
