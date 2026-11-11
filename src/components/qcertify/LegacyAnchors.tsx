"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

/** Older homepage anchors, and where their content lives now. */
const moved: Record<string, string> = {
  "#compliance": "/resources#standards", "#regulation": "/resources#standards",
  "#leadership": "/company#leadership", "#team": "/company#leadership",
  "#audit-reports": "/trust#evidence", "#evidence": "/trust#evidence", "#governance": "/trust#governance",
  "#modes": "/architecture#modes", "#status": "/trust#assurance", "#trust": "/trust",
  "#architecture-explorer": "/architecture#explorer", "#outcomes": "/architecture#explorer", "#federation": "/architecture#explorer",
  "#console": "/platform", "#benefits": "/#solution", "#integration": "/#how-it-works",
};

export function LegacyAnchors() {
  const router = useRouter();
  useEffect(() => {
    function followLegacyLink() { const destination = moved[window.location.hash]; if (destination) router.replace(destination); }
    followLegacyLink(); window.addEventListener("hashchange", followLegacyLink);
    return () => window.removeEventListener("hashchange", followLegacyLink);
  }, [router]);
  return null;
}
