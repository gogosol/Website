import type { MetadataRoute } from "next";
import { contentUpdated, publicRoutes, siteUrl } from "@/lib/metadata";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  return publicRoutes.map((path) => ({
    url: `${siteUrl}${path === "/" ? "" : path}`,
    lastModified: contentUpdated,
    changeFrequency: "monthly",
    priority: path === "/" ? 1 : path === "/demo" ? 0.9 : 0.8,
  }));
}
