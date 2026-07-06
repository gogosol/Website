"use client";

import React, { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const smoothEase = [0.22, 1, 0.36, 1] as const;

interface MapNode {
  id: string;
  label: string;
  /** percentage insets for the HTML plate */
  style: React.CSSProperties;
  align?: "left" | "right";
}

const nodes: MapNode[] = [
  { id: "branch", label: "Branch site", style: { left: "3%", top: "10%" } },
  { id: "hq", label: "HQ core", style: { right: "3%", top: "10%" }, align: "right" },
  { id: "segment", label: "Internal segment", style: { left: "3%", top: "44%" } },
  { id: "egress", label: "Compliance egress", style: { right: "3%", top: "44%" }, align: "right" },
  { id: "partner", label: "Partner exchange", style: { left: "3%", bottom: "6%" } },
  { id: "cloud", label: "Hybrid cloud", style: { right: "3%", bottom: "6%" }, align: "right" },
];

interface Pattern {
  id: string;
  label: string;
  caption: string;
  /** orthogonal polyline through the gateway (viewBox 960x560) */
  points: string;
  endpoints: [number, number][];
  activeNodes: string[];
  blockCapable?: boolean;
}

/* Gateway plate sits at center: x 400-560, y 235-325. Paths route orthogonally into its edges. */
const patterns: Pattern[] = [
  {
    id: "north-south",
    label: "North-south enterprise",
    caption: "Branch traffic protected across the shared enterprise path",
    points: "96,92 300,92 300,280 400,280 560,280 660,280 660,92 864,92",
    endpoints: [
      [96, 92],
      [864, 92],
    ],
    activeNodes: ["branch", "hq"],
  },
  {
    id: "site-to-site",
    label: "Site-to-site",
    caption: "Protected destination reached without endpoint rewrites",
    points: "864,120 740,120 740,256 560,256 400,256 340,256 340,470 864,470",
    endpoints: [
      [864, 120],
      [864, 470],
    ],
    activeNodes: ["hq", "cloud"],
  },
  {
    id: "partner",
    label: "Partner exchange",
    caption: "Boundary enforcement without synchronized partner migration",
    points: "96,476 240,476 240,304 400,304 560,304 700,304 700,120 864,120",
    endpoints: [
      [96, 476],
      [864, 120],
    ],
    activeNodes: ["partner", "hq"],
  },
  {
    id: "segment",
    label: "Internal segments",
    caption: "Segmented internal paths governed at the same chokepoint",
    points: "96,286 250,286 250,256 400,256 560,256 700,256 700,92 864,92",
    endpoints: [
      [96, 286],
      [864, 92],
    ],
    activeNodes: ["segment", "hq"],
  },
  {
    id: "egress",
    label: "Compliance egress",
    caption: "Sensitive egress protected, with policy block available",
    points: "864,120 700,120 700,256 560,256 400,256 360,256 360,304 400,304 560,304 760,304 760,286 864,286",
    endpoints: [
      [864, 120],
      [864, 286],
    ],
    activeNodes: ["hq", "egress"],
    blockCapable: true,
  },
];

/**
 * Interactive editorial network schematic: five selectable enterprise traffic
 * patterns, each drawn as an orthogonal route crossing the inline gateway.
 * Auto-advances until the visitor makes a manual selection.
 */
export default function TrafficPathMap({ className = "" }: { className?: string }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const userLocked = useRef(false);
  const paused = useRef(false);

  useEffect(() => {
    if (typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }
    const timer = setInterval(() => {
      if (!userLocked.current && !paused.current) {
        setActiveIndex((current) => (current + 1) % patterns.length);
      }
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const select = (index: number) => {
    userLocked.current = true;
    setActiveIndex(index);
  };

  const pattern = patterns[activeIndex];

  return (
    <div
      className={`technical-plate bg-white/[0.55] ${className}`}
      role="region"
      aria-label="Traffic pattern schematic: five enterprise paths crossing the QuantumHalon inline gateway"
      onPointerEnter={() => {
        paused.current = true;
      }}
      onPointerLeave={() => {
        paused.current = false;
      }}
      onFocusCapture={() => {
        paused.current = true;
      }}
      onBlurCapture={() => {
        paused.current = false;
      }}
    >
      <div className="grid grid-cols-[1fr_auto] gap-4 border-b border-black/10 px-4 py-3 text-[9px] uppercase leading-4 text-black/[0.45]">
        <span>Traffic pattern schematic / select a path</span>
        <span>Gateway stays inline</span>
      </div>

      <div className="flex flex-wrap border-b border-black/10">
        {patterns.map((item, index) => {
          const active = index === activeIndex;
          return (
            <button
              key={item.id}
              type="button"
              aria-pressed={active}
              onClick={() => select(index)}
              className={`flex-1 basis-1/3 border-b border-r border-black/10 px-3 py-3 text-left transition-colors sm:basis-auto sm:border-b-0 last:border-r-0 focus-visible:outline focus-visible:outline-1 focus-visible:-outline-offset-4 focus-visible:outline-black ${
                active ? "bg-white" : "hover:bg-white/[0.6]"
              }`}
            >
              <span className={`block text-[10px] font-semibold uppercase ${active ? "text-[#126dff]" : "text-black/[0.38]"}`}>
                {String(index + 1).padStart(2, "0")}
              </span>
              <span
                className={`mt-1 block text-[10px] font-semibold uppercase leading-4 ${
                  active ? "text-black" : "text-black/[0.5]"
                }`}
              >
                {item.label}
              </span>
            </button>
          );
        })}
      </div>

      {/* Height comes from the SVG's intrinsic 960x560 ratio so the percent-
          positioned HTML overlay and the SVG share one coordinate space. */}
      <div className="relative overflow-hidden">
        <svg
          className="h-auto w-full"
          viewBox="0 0 960 560"
          preserveAspectRatio="xMidYMid meet"
          aria-hidden="true"
        >
          <defs>
            <pattern id="traffic-map-grid" width="48" height="48" patternUnits="userSpaceOnUse">
              <path d="M 48 0 L 0 0 0 48" fill="none" stroke="rgba(0,0,0,0.045)" strokeWidth="1" />
            </pattern>
          </defs>
          <rect width="960" height="560" fill="url(#traffic-map-grid)" />

          {/* all routes, always visible as faint schematic wiring */}
          {patterns.map((item) => (
            <polyline
              key={item.id}
              points={item.points}
              fill="none"
              stroke="rgba(5,5,5,0.10)"
              strokeWidth="1.2"
            />
          ))}

          {/* active route */}
          <motion.g key={pattern.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
            <polyline
              points={pattern.points}
              fill="none"
              stroke="#126dff"
              strokeWidth="2"
              strokeDasharray="6 6"
              className="anim-flow-dash"
            />
            {pattern.endpoints.map(([x, y]) => (
              <rect key={`${x}-${y}`} x={x - 4} y={y - 4} width="8" height="8" fill="#126dff" />
            ))}
            {pattern.blockCapable ? (
              <g className="anim-hold-blink">
                <rect x="372" y="272" width="16" height="16" fill="#ff6b5f" />
              </g>
            ) : null}
          </motion.g>
        </svg>

        {/* HTML node plates over the schematic */}
        <div aria-hidden="true" className="absolute inset-0">
          {nodes.map((node) => {
            const active = pattern.activeNodes.includes(node.id);
            return (
              <div
                key={node.id}
                className={`absolute border bg-white/85 px-2 py-1.5 transition-colors duration-300 sm:px-3 sm:py-2 ${
                  active ? "border-black/40" : "border-black/15"
                } ${node.align === "right" ? "text-right" : ""}`}
                style={node.style}
              >
                <span
                  className={`block text-[8px] font-semibold uppercase leading-3 transition-colors duration-300 sm:text-[10px] sm:leading-4 ${
                    active ? "text-black" : "text-black/[0.38]"
                  }`}
                >
                  {node.label}
                </span>
              </div>
            );
          })}

          {/* gateway plate */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 border border-[#126dff]/70 bg-white/90 px-3 py-2 text-center shadow-[0_18px_45px_rgba(18,109,255,0.08)] sm:px-5 sm:py-3">
            <span className="block text-[8px] font-semibold uppercase leading-3 text-[#126dff] sm:text-[9px] sm:leading-4">
              QuantumHalon
            </span>
            <span className="block text-[10px] font-semibold leading-4 text-black sm:text-sm">Inline gateway</span>
            {pattern.blockCapable ? (
              <span className="mt-1 block text-[8px] font-semibold uppercase leading-3 text-[#ff6b5f]">
                Policy block available
              </span>
            ) : null}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-[1fr_auto] gap-4 border-t border-black/10 px-4 py-3">
        <AnimatePresence mode="wait">
          <motion.span
            key={pattern.id}
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.25, ease: smoothEase }}
            className="text-[11px] uppercase leading-4 text-black/[0.5]"
          >
            {pattern.caption}
          </motion.span>
        </AnimatePresence>
        <span className="text-[10px] uppercase leading-4 text-black/[0.38]">
          {String(activeIndex + 1).padStart(2, "0")} / {String(patterns.length).padStart(2, "0")}
        </span>
      </div>
    </div>
  );
}
