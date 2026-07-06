"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { CountUp } from "@/components/Editorial";

const smoothEase = [0.22, 1, 0.36, 1] as const;

const AXIS_START = 2023;
const AXIS_END = 2036;

interface Milestone {
  year: number;
  date: string;
  title: string;
  side: "top" | "bottom";
  align?: "left" | "right";
}

const milestones: Milestone[] = [
  { year: 2023.37, date: "May 2023", title: "U.S. federal crypto inventories", side: "top", align: "left" },
  { year: 2024.6, date: "Aug 2024", title: "NIST PQC standards approved", side: "bottom" },
  { year: 2026.95, date: "End 2026", title: "EU transition begins", side: "top" },
  { year: 2027, date: "Jan 2027", title: "NSS acquisitions align to CNSA 2.0", side: "bottom" },
  { year: 2030.95, date: "Dec 2030", title: "EU critical infrastructure deadline", side: "top" },
  { year: 2035, date: "2035", title: "U.S. quantum-resistance goal", side: "bottom", align: "right" },
];

function axisPosition(year: number) {
  return ((year - AXIS_START) / (AXIS_END - AXIS_START)) * 100;
}

function daysUntil(target: Date) {
  return Math.max(0, Math.ceil((target.getTime() - Date.now()) / 86_400_000));
}

/**
 * Regulatory-horizon timeline: 2023 -> 2036 axis with public PQC milestones,
 * a live NOW marker, and countdown counters computed from the real date.
 */
export default function DeadlineTimeline({ className = "" }: { className?: string }) {
  // Date-dependent values are computed after mount: the page is statically
  // prerendered at build time, so rendering them on the server would bake a
  // stale NOW marker into the HTML and mismatch on hydration.
  const [now, setNow] = useState<Date | null>(null);

  useEffect(() => {
    setNow(new Date());
  }, []);

  const nowYear = now ? now.getUTCFullYear() + now.getUTCMonth() / 12 : null;
  const nowPosition = nowYear ? axisPosition(nowYear) : 0;
  const nowLabel = now ? now.toLocaleDateString("en-US", { month: "short", year: "numeric" }) : "";

  const countdowns = [
    { label: "EU transition start", deadline: "Dec 31 2026", days: now ? daysUntil(new Date(Date.UTC(2026, 11, 31))) : 0 },
    { label: "EU critical infrastructure", deadline: "Dec 31 2030", days: now ? daysUntil(new Date(Date.UTC(2030, 11, 31))) : 0 },
    { label: "U.S. end-state goal", deadline: "Dec 31 2035", days: now ? daysUntil(new Date(Date.UTC(2035, 11, 31))) : 0 },
  ];

  return (
    <div className={`technical-plate bg-white/[0.55] ${className}`} role="region" aria-label="Post-quantum regulatory timeline from 2023 to 2036 with live countdowns">
      <div className="grid grid-cols-[1fr_auto] gap-4 border-b border-black/10 px-4 py-3 text-[9px] uppercase leading-4 text-black/[0.45]">
        <span>Regulatory horizon / 2023 → 2036</span>
        <span className="flex items-center gap-2">
          <span className="anim-hold-blink h-1.5 w-1.5 bg-[#126dff]" />
          Live countdown
        </span>
      </div>

      <div className="overflow-x-auto">
        <div className="relative min-w-[860px] px-10 py-6">
          <div className="relative h-[250px]">
            {/* axis */}
            <motion.div
              className="absolute inset-x-0 top-1/2 h-px origin-left bg-black/20"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.9, ease: smoothEase }}
            />
            {/* elapsed portion */}
            {now ? (
              <motion.div
                className="absolute top-1/2 h-[2px] origin-left bg-[#126dff]"
                style={{ left: 0, width: `${nowPosition}%`, marginTop: -0.5 }}
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.9, delay: 0.15, ease: smoothEase }}
              />
            ) : null}

            {/* year ticks */}
            {Array.from({ length: AXIS_END - AXIS_START + 1 }, (_, i) => AXIS_START + i).map((year) => (
              <div
                key={year}
                className="absolute top-1/2"
                style={{ left: `${axisPosition(year)}%` }}
                aria-hidden="true"
              >
                <span className="absolute -translate-x-1/2 block h-2 w-px bg-black/25" style={{ top: -4 }} />
                <span className="absolute top-3 -translate-x-1/2 text-[9px] uppercase tabular-nums text-black/[0.38]">
                  {year % 2 === 1 ? year : ""}
                </span>
              </div>
            ))}

            {/* NOW marker */}
            {now ? (
              <motion.div
                className="absolute inset-y-4"
                style={{ left: `${nowPosition}%` }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.4, ease: smoothEase }}
              >
                <div className="absolute inset-y-0 w-px border-l border-dashed border-[#126dff]/60" />
                <div className="absolute top-0 flex -translate-x-1/2 items-center gap-1.5 border border-[#126dff]/50 bg-white px-2 py-1">
                  <span className="anim-hold-blink h-1.5 w-1.5 bg-[#126dff]" />
                  <span className="whitespace-nowrap text-[9px] font-semibold uppercase leading-none text-black">
                    Now · {nowLabel}
                  </span>
                </div>
              </motion.div>
            ) : null}

            {/* milestones */}
            {milestones.map((item, index) => {
              const position = axisPosition(item.year);
              const translate =
                item.align === "left" ? "" : item.align === "right" ? "-translate-x-full" : "-translate-x-1/2";
              return (
                <motion.div
                  key={item.title}
                  className="absolute top-1/2"
                  style={{ left: `${position}%` }}
                  initial={{ opacity: 0, y: item.side === "top" ? 8 : -8 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.5, delay: 0.25 + index * 0.08, ease: smoothEase }}
                >
                  <span
                    className="absolute w-px bg-black/30"
                    style={item.side === "top" ? { bottom: 0, height: 34 } : { top: 0, height: 34 }}
                    aria-hidden="true"
                  />
                  <span
                    className="absolute h-[7px] w-[7px] -translate-x-1/2 bg-black"
                    style={{ top: -3.5 }}
                    aria-hidden="true"
                  />
                  <div
                    className={`absolute w-40 border border-black/15 bg-white/90 px-3 py-2 ${translate} ${
                      item.side === "top" ? "bottom-9" : "top-9"
                    }`}
                  >
                    <div className="text-[9px] font-semibold uppercase leading-4 text-[#126dff]">{item.date}</div>
                    <div className="mt-0.5 text-[11px] font-semibold leading-4 text-black">{item.title}</div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>

      <div className="grid border-t border-black/10 sm:grid-cols-3">
        {countdowns.map((item) => (
          <div key={item.label} className="border-b border-black/10 px-4 py-4 last:border-b-0 sm:border-b-0 sm:border-r sm:last:border-r-0">
            <div className="text-[9px] font-semibold uppercase leading-4 text-black/[0.42]">
              {item.label} · {item.deadline}
            </div>
            <div className="mt-2 text-3xl font-medium leading-none text-black tabular-nums sm:text-4xl">
              <CountUp value={item.days} duration={1.8} />
              <span className="ml-2 text-[10px] font-semibold uppercase text-black/[0.4]">days left</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
