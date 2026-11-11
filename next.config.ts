import type { NextConfig } from "next";
import widths from "./src/lib/image-widths.json";

/**
 * Static export for Cloudflare Pages (free plan).
 *
 * - Every public route is prerendered to HTML at build time; no server runtime is needed.
 * - next/image uses a custom loader. `scripts/postbuild.mjs` pre-encodes WebP variants for
 *   every configured width, so responsive images work without an image-optimisation service.
 * - Security headers and redirects are served by Cloudflare Pages from `public/_headers` and
 *   `public/_redirects` (Next.js headers()/redirects() do not apply to a static export).
 * - The contact form posts to a Pages Function in `functions/api/contact.ts`.
 */
const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: false,
  poweredByHeader: false,
  turbopack: {
    root: __dirname,
  },
  // Development only: `next dev` serves its client runtime to localhost by default. Reviews run
  // through a Visual Studio dev tunnel and local QA uses 127.0.0.1; without these entries the
  // pages render but never hydrate there. No effect on the static production export.
  allowedDevOrigins: ["127.0.0.1", "**.devtunnels.ms"],
  images: {
    loader: "custom",
    loaderFile: "./src/lib/image-loader.ts",
    deviceSizes: widths.deviceSizes,
    imageSizes: widths.imageSizes,
    qualities: [75],
  },
};

export default nextConfig;
