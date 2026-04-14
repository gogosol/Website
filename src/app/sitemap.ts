import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://qcertify.io";

  // Define static routes
  const routes = [
    "",
    "/product",
    "/how-it-works",
    "/about",
    "/contact",
    "/use-cases",
    "/industries",
    "/compliance",
    "/resources",
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: route === "" ? 1.0 : 0.8,
  }));

  return [...routes];
}
