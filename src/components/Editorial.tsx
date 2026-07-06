"use client";

import React, { useEffect, useRef, useState } from "react";
import { animate, useInView } from "framer-motion";

const smoothEase = [0.22, 1, 0.36, 1] as const;

/**
 * Brutalist editorial ticker band. Content is duplicated for a seamless loop;
 * the second copy is aria-hidden. Pauses on hover, freezes under
 * prefers-reduced-motion via the global animation override.
 */
export function Marquee({
  items,
  duration = 46,
  className = "",
}: {
  items: string[];
  duration?: number;
  className?: string;
}) {
  const renderRow = (hidden: boolean) => (
    <div aria-hidden={hidden || undefined} className="flex min-w-max items-center">
      {items.map((item, index) => (
        <span key={`${item}-${index}`} className="flex items-center">
          <span className="px-6 text-[11px] font-semibold uppercase tracking-[0.14em] text-black/[0.55]">
            {item}
          </span>
          <span className="h-1.5 w-1.5 flex-shrink-0 bg-[#126dff]" />
        </span>
      ))}
    </div>
  );

  return (
    <div
      className={`marquee-pause overflow-hidden border-y border-black/10 bg-white/[0.45] py-3 ${className}`}
    >
      <div
        className="anim-marquee flex w-max"
        style={{ "--marquee-duration": `${duration}s` } as React.CSSProperties}
      >
        {renderRow(false)}
        {renderRow(true)}
      </div>
    </div>
  );
}

/**
 * Animated numeric counter that counts up when scrolled into view.
 */
export function CountUp({
  value,
  duration = 1.6,
  decimals = 0,
  prefix = "",
  suffix = "",
  className = "",
}: {
  value: number;
  duration?: number;
  decimals?: number;
  prefix?: string;
  suffix?: string;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const controls = animate(0, value, {
      duration,
      ease: smoothEase,
      onUpdate: (latest) => setDisplay(latest),
    });
    return () => controls.stop();
  }, [inView, value, duration]);

  const formatted = display.toLocaleString("en-US", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });

  return (
    <span ref={ref} className={className}>
      {prefix}
      {formatted}
      {suffix}
    </span>
  );
}

/**
 * Uppercase micro-caption used inside technical plates and diagram frames.
 */
export function PlateCaption({
  children,
  right,
  as: Tag = "div",
}: {
  children: React.ReactNode;
  right?: React.ReactNode;
  as?: "div" | "figcaption";
}) {
  return (
    <Tag className="grid grid-cols-[1fr_auto] gap-4 border-t border-black/10 px-4 py-3 text-[11px] uppercase leading-4 text-black/[0.50]">
      <span>{children}</span>
      {right ? <span className="text-right text-black/[0.38]">{right}</span> : null}
    </Tag>
  );
}
