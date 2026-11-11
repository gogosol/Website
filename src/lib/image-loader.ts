/**
 * Custom next/image loader for the static export.
 *
 * Static imports resolve to /_next/static/media/<name>.<hash>.<ext>. `scripts/postbuild.mjs`
 * writes <name>.<hash>.w<width>.webp next to each source for every width in
 * src/lib/image-widths.json, so the browser receives a correctly sized WebP from the srcset.
 * Spaces are percent-encoded because srcset candidates are space-delimited.
 * During development the original file is served (the width query only satisfies Next's
 * loader check).
 */
export default function imageLoader({ src, width }: { src: string; width: number; quality?: number }) {
  const safe = src.replace(/ /g, "%20");
  if (process.env.NODE_ENV === "development") return `${safe}?w=${width}`;
  if (!/^\/_next\/static\/media\/[^?#]+\.(png|jpe?g)$/i.test(src)) return safe;
  return safe.replace(/\.(png|jpe?g)$/i, `.w${width}.webp`);
}
