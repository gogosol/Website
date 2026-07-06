"use client";

import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Ban, Layers, Lock, Route } from "lucide-react";

type IconType = React.ComponentType<{ className?: string }>;

const smoothEase = [0.22, 1, 0.36, 1] as const;

interface Mode {
  id: string;
  icon: IconType;
  title: string;
  kicker: string;
  caption: string;
  outcome: string;
  properties: [string, string][];
}

const modes: Mode[] = [
  {
    id: "mediated",
    icon: Layers,
    title: "Governed protection",
    kicker: "Trusted handling",
    caption: "Policy-selected post-quantum protection applied at the gateway",
    outcome: "PQC applied at the gateway",
    properties: [
      ["Handling", "Trusted mediation"],
      ["App change", "None"],
      ["Record", "Policy + coverage"],
    ],
  },
  {
    id: "opaque",
    icon: Lock,
    title: "Opaque behavior",
    kicker: "Application-stable",
    caption: "Transit protected while the application stream stays unchanged",
    outcome: "Payload stays opaque",
    properties: [
      ["Handling", "Opaque transit"],
      ["App change", "None"],
      ["Record", "Policy + coverage"],
    ],
  },
  {
    id: "passthrough",
    icon: Route,
    title: "Passthrough",
    kicker: "Explicit exception",
    caption: "Approved transparent forwarding, visible at the policy layer",
    outcome: "Governed exception",
    properties: [
      ["Handling", "Transparent"],
      ["App change", "None"],
      ["Record", "Exception logged"],
    ],
  },
  {
    id: "block",
    icon: Ban,
    title: "Block",
    kicker: "Policy denial",
    caption: "The flow stops at the gateway instead of silently downgrading",
    outcome: "Flow stopped at policy",
    properties: [
      ["Handling", "Denied"],
      ["App change", "None"],
      ["Record", "Denial recorded"],
    ],
  },
];

/**
 * Interactive editorial diagram: selecting a policy mode re-renders the
 * inline path (source -> gateway -> destination) with that mode's behavior.
 */
export default function ModeExplorer({ className = "" }: { className?: string }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const mode = modes[activeIndex];
  const isBlock = mode.id === "block";
  const isPassthrough = mode.id === "passthrough";

  return (
    <div
      className={`technical-plate bg-white/[0.55] ${className}`}
      role="region"
      aria-label="QuantumHalon mode explorer: select a policy outcome to preview the path behavior"
    >
      <div className="grid grid-cols-[1fr_auto] gap-4 border-b border-black/10 px-4 py-3 text-[9px] uppercase leading-4 text-black/[0.45]">
        <span>Mode explorer / select a policy outcome</span>
        <span>{String(activeIndex + 1).padStart(2, "0")} / 04</span>
      </div>

      <div className="grid lg:grid-cols-[260px_1fr]">
        <div
          className="grid grid-cols-2 border-b border-black/10 lg:grid-cols-1 lg:border-b-0 lg:border-r"
          aria-label="Policy modes"
        >
          {modes.map((item, index) => {
            const active = index === activeIndex;
            return (
              <button
                key={item.id}
                type="button"
                aria-pressed={active}
                onClick={() => setActiveIndex(index)}
                className={`relative border-b border-r border-black/10 px-4 py-4 text-left transition-colors last:border-r-0 lg:border-r-0 lg:px-5 lg:py-5 lg:last:border-b-0 focus-visible:outline focus-visible:outline-1 focus-visible:-outline-offset-4 focus-visible:outline-black ${
                  active ? "bg-white" : "hover:bg-white/[0.6]"
                }`}
              >
                {active ? (
                  <motion.span
                    layoutId="mode-explorer-indicator"
                    className="absolute inset-y-0 left-0 w-[2px] bg-[#126dff]"
                    transition={{ duration: 0.35, ease: smoothEase }}
                  />
                ) : null}
                <span className="flex items-center gap-2">
                  <item.icon className={`h-3.5 w-3.5 ${active ? "text-[#126dff]" : "text-black/[0.35]"}`} />
                  <span className={`text-[10px] font-semibold uppercase ${active ? "text-[#126dff]" : "text-black/[0.4]"}`}>
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </span>
                <span className={`mt-2 block text-sm font-semibold leading-tight ${active ? "text-black" : "text-black/[0.55]"}`}>
                  {item.title}
                </span>
                <span className="mt-1 hidden text-[10px] uppercase leading-4 text-black/[0.4] sm:block">
                  {item.kicker}
                </span>
              </button>
            );
          })}
        </div>

        <div>
          <div className="relative min-h-[260px] overflow-hidden px-4 py-8 sm:px-6">
            <svg
              className="absolute inset-0 h-full w-full"
              viewBox="0 0 800 300"
              preserveAspectRatio="none"
              aria-hidden="true"
            >
              <defs>
                <pattern id="mode-explorer-grid" width="48" height="48" patternUnits="userSpaceOnUse">
                  <path d="M 48 0 L 0 0 0 48" fill="none" stroke="rgba(0,0,0,0.045)" strokeWidth="1" />
                </pattern>
              </defs>
              <rect width="800" height="300" fill="url(#mode-explorer-grid)" />

              {/* base rails */}
              <path d="M 60 150 H 740" stroke="rgba(0,0,0,0.10)" strokeWidth="1" />

              {/* left segment: source -> gateway */}
              {isBlock || isPassthrough ? (
                <path
                  d="M 60 150 H 330"
                  stroke={isBlock ? "rgba(5,5,5,0.45)" : "rgba(5,5,5,0.35)"}
                  strokeWidth="1.5"
                  strokeDasharray="4 6"
                  className="anim-flow-dash"
                />
              ) : (
                <>
                  {mode.id === "opaque" ? (
                    <path d="M 60 150 H 330" stroke="rgba(5,5,5,0.14)" strokeWidth="9" />
                  ) : null}
                  <path
                    d="M 60 150 H 330"
                    stroke="#126dff"
                    strokeWidth="2"
                    strokeDasharray="6 6"
                    className="anim-flow-dash"
                  />
                </>
              )}

              {/* right segment: gateway -> destination */}
              {isBlock ? (
                <path d="M 470 150 H 740" stroke="rgba(5,5,5,0.10)" strokeWidth="1.5" strokeDasharray="2 7" />
              ) : isPassthrough ? (
                <path
                  d="M 470 150 H 740"
                  stroke="rgba(5,5,5,0.35)"
                  strokeWidth="1.5"
                  strokeDasharray="4 6"
                  className="anim-flow-dash"
                />
              ) : (
                <>
                  {mode.id === "opaque" ? (
                    <path d="M 470 150 H 740" stroke="rgba(5,5,5,0.14)" strokeWidth="9" />
                  ) : null}
                  <path
                    d="M 470 150 H 740"
                    stroke="#126dff"
                    strokeWidth="2"
                    strokeDasharray="6 6"
                    className="anim-flow-dash"
                  />
                </>
              )}

              {/* endpoint markers */}
              <rect x="56" y="146" width="8" height="8" fill={isPassthrough || isBlock ? "rgba(5,5,5,0.35)" : "#126dff"} />
              <rect
                x="736"
                y="146"
                width="8"
                height="8"
                fill={isBlock ? "rgba(5,5,5,0.15)" : isPassthrough ? "rgba(5,5,5,0.35)" : "#126dff"}
              />

              {/* block marker at the gateway edge */}
              {isBlock ? (
                <g className="anim-hold-blink">
                  <rect x="316" y="138" width="24" height="24" fill="#ff6b5f" />
                  <path d="M 322 144 L 334 156 M 334 144 L 322 156" stroke="#050505" strokeWidth="1.6" />
                </g>
              ) : null}
            </svg>

            <div className="relative z-10 grid min-h-[190px] grid-cols-[1fr_auto_1fr] items-center gap-3 sm:gap-6">
              <div className="max-w-[130px] justify-self-start sm:max-w-[180px]">
                <div className="border border-black/15 bg-white/80 px-3 py-2.5 sm:px-4 sm:py-3">
                  <div className="text-[9px] font-semibold uppercase leading-4 text-black/[0.45]">Source</div>
                  <div className="mt-1 text-xs font-semibold text-black sm:text-sm">Selected path</div>
                </div>
              </div>

              <motion.div
                animate={{
                  borderColor: isBlock ? "rgba(255,107,95,0.85)" : isPassthrough ? "rgba(5,5,5,0.25)" : "rgba(18,109,255,0.7)",
                }}
                transition={{ duration: 0.35 }}
                className="justify-self-center border bg-white/90 px-4 py-4 text-center sm:px-6 sm:py-5"
                style={{ borderWidth: 1 }}
              >
                <div className="text-[9px] font-semibold uppercase leading-4 text-[#126dff]">QuantumHalon</div>
                <div className="mt-1 text-sm font-semibold leading-tight text-black sm:text-base">Inline gateway</div>
                <AnimatePresence mode="wait">
                  <motion.div
                    key={mode.id}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    transition={{ duration: 0.25, ease: smoothEase }}
                    className={`mt-3 inline-flex items-center gap-2 border px-2.5 py-1 text-[9px] font-semibold uppercase ${
                      isBlock
                        ? "border-[#ff6b5f]/60 text-black"
                        : isPassthrough
                          ? "border-black/20 text-black/[0.6]"
                          : "border-[#126dff]/40 text-black"
                    }`}
                  >
                    <span className={`h-1.5 w-1.5 ${isBlock ? "bg-[#ff6b5f]" : isPassthrough ? "bg-black/40" : "bg-[#126dff]"}`} />
                    {mode.outcome}
                  </motion.div>
                </AnimatePresence>
              </motion.div>

              <div className="max-w-[130px] justify-self-end sm:max-w-[180px]">
                <motion.div
                  animate={{ opacity: isBlock ? 0.35 : 1 }}
                  transition={{ duration: 0.35 }}
                  className="border border-black/15 bg-white/80 px-3 py-2.5 text-right sm:px-4 sm:py-3"
                >
                  <div className="text-[9px] font-semibold uppercase leading-4 text-black/[0.45]">Destination</div>
                  <div className="mt-1 text-xs font-semibold text-black sm:text-sm">Protected side</div>
                </motion.div>
              </div>
            </div>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={mode.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.22 }}
              className="grid border-t border-black/10 sm:grid-cols-3"
            >
              {mode.properties.map(([label, value]) => (
                <div key={label} className="border-b border-black/10 px-4 py-3 last:border-b-0 sm:border-b-0 sm:border-r sm:last:border-r-0">
                  <div className="text-[9px] font-semibold uppercase leading-4 text-black/[0.42]">{label}</div>
                  <div className="mt-1 text-xs font-semibold text-black">{value}</div>
                </div>
              ))}
            </motion.div>
          </AnimatePresence>

          <div className="grid grid-cols-[1fr_auto] gap-4 border-t border-black/10 px-4 py-3">
            <AnimatePresence mode="wait">
              <motion.span
                key={mode.id}
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                transition={{ duration: 0.22, ease: smoothEase }}
                className="text-[11px] uppercase leading-4 text-black/[0.5]"
              >
                {mode.caption}
              </motion.span>
            </AnimatePresence>
            <span className="text-[9px] uppercase leading-4 text-black/[0.35]">Policy decides per path</span>
          </div>
        </div>
      </div>
    </div>
  );
}
