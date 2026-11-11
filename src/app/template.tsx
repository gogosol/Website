"use client";
import { useEffect } from "react";
import { RevealController } from "@/components/qcertify/motion/RevealController";

// The first document load renders without an entrance animation so the largest
// contentful paint is never delayed; later client navigations ease the new page in.
let hasNavigated = false;

export default function Template({ children }: { children: React.ReactNode }) {
  const animate = hasNavigated;
  useEffect(() => { hasNavigated = true; }, []);
  return <div className={animate ? "page-enter" : undefined}>
    <RevealController />
    {children}
  </div>;
}
