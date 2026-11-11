"use client";
import { useEffect } from "react";

/**
 * Progressive enhancement for [data-reveal] elements.
 * Everything is visible in the server HTML. After hydration, a single IntersectionObserver
 * pass marks the elements already in view as revealed; only then is the js-motion class added,
 * so the hidden starting state applies to content below the fold and never to visible content.
 * No geometry is read synchronously, so offscreen chapters (content-visibility: auto) are never
 * forced through layout, and hiding happens without a transition (see globals.css).
 */
export function RevealController() {
  useEffect(() => {
    const root = document.documentElement;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    const elements = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]:not([data-revealed])"));
    const revealAll = () => elements.forEach((element) => element.setAttribute("data-revealed", ""));
    if (reduce.matches || !("IntersectionObserver" in window)) { revealAll(); return; }
    let primed = false;
    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        entry.target.setAttribute("data-revealed", "");
        observer.unobserve(entry.target);
      }
      if (!primed) { primed = true; root.classList.add("js-motion"); }
    }, { rootMargin: "0px 0px -6% 0px", threshold: 0.01 });
    elements.forEach((element) => observer.observe(element));
    // Anything still hidden when the user jumps (hash links, find-in-page, printing) is revealed.
    window.addEventListener("hashchange", revealAll);
    window.addEventListener("beforeprint", revealAll);
    return () => { observer.disconnect(); window.removeEventListener("hashchange", revealAll); window.removeEventListener("beforeprint", revealAll); };
  }, []);
  return null;
}
