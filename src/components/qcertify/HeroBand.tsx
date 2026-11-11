import Image, { type StaticImageData } from "next/image";
import styles from "./HeroBand.module.css";

/**
 * A cinematic artwork band placed under a page introduction. Pass priority when the band can be
 * the LCP element: it is then preloaded and painted without the blur placeholder or grain layer.
 */
export function HeroBand({ src, alt, caption, tone = "light", position = "60% 50%", priority = false }: { src: StaticImageData; alt: string; caption?: string; tone?: "light" | "dark"; position?: string; priority?: boolean }) {
  return <figure className={styles.band} data-tone={tone}>
    <div className={styles.frame}>
      <Image src={src} alt={alt} fill sizes="(max-width: 1400px) 100vw, 1300px" style={{ objectPosition: position }} preload={priority} loading={priority ? "eager" : "lazy"} fetchPriority={priority ? "high" : "auto"} placeholder={priority ? "empty" : "blur"} />
      {!priority && <div className="grain" aria-hidden="true" />}
    </div>
    {caption && <figcaption className={styles.caption}>{caption}</figcaption>}
  </figure>;
}
