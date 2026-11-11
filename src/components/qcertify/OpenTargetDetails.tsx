"use client";
import { useEffect } from "react";

/** Opens a collapsed <details> when the URL fragment points at it, so deep links reveal their content. */
export function OpenTargetDetails() {
  useEffect(() => {
    function open() {
      const id = decodeURIComponent(window.location.hash.slice(1));
      const target = id ? document.getElementById(id) : null;
      if (target instanceof HTMLDetailsElement && !target.open) { target.open = true; target.scrollIntoView({ block: "start" }); }
    }
    open();
    window.addEventListener("hashchange", open);
    return () => window.removeEventListener("hashchange", open);
  }, []);
  return null;
}
