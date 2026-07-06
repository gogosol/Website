"use client";

import { motion } from "framer-motion";

const smoothEase = [0.22, 1, 0.36, 1] as const;

const AXIS_MAX = 50;
const MARKER_YEAR = 9;

const rows = [
  { label: "Financial services", years: 25 },
  { label: "Government and public sector", years: 50 },
  { label: "Critical infrastructure / OT", years: 30 },
  { label: "Healthcare and life sciences", years: 40 },
  { label: "Advanced enterprise", years: 15 },
];

function axisPosition(years: number) {
  return (years / AXIS_MAX) * 100;
}

const markerPosition = axisPosition(MARKER_YEAR);
const axisTicks = [10, 20, 30, 40, 50];

function RowLabel({ index, label }: { index: number; label: string }) {
  return (
    <div className="flex items-center justify-between gap-3 text-[10px] font-semibold uppercase leading-4 tracking-normal text-black">
      <span>{label}</span>
      <span className="shrink-0 text-[#126dff] tabular-nums">{String(index + 1).padStart(2, "0")}</span>
    </div>
  );
}

export default function DataLifetimeChart({ className = "" }: { className?: string }) {
  const ariaLabel =
    "Confidentiality horizon chart: Financial services, 25 years; Government and public sector, 50 years; Critical infrastructure / OT, 30 years; Healthcare and life sciences, 40 years; Advanced enterprise, 15 years. Quantum risk window opens at approximately 9 years.";

  return (
    <div className={`technical-plate bg-white/[0.55] ${className}`} role="img" aria-label={ariaLabel}>
      <div aria-hidden="true">
        <div className="grid grid-cols-1 gap-2 border-b border-black/10 px-4 py-3 text-[10px] uppercase leading-4 text-black/[0.45] sm:grid-cols-[1fr_auto] sm:gap-4">
          <span>Data lifetime vs quantum horizon / indicative</span>
          <span className="flex items-center gap-2 sm:justify-end">
            <span className="h-1.5 w-1.5 bg-[#126dff]" />
            Years of required confidentiality
          </span>
        </div>

        <div className="px-4 py-5 sm:px-5 sm:py-6">
          <div className="grid gap-4 sm:grid-cols-[minmax(170px,220px)_1fr] sm:gap-5">
            <div className="hidden pt-[52px] sm:block">
              <div className="grid gap-3">
                {rows.map((row, index) => (
                  <div key={row.label} className="flex h-9 items-center border-t border-black/10">
                    <RowLabel index={index} label={row.label} />
                  </div>
                ))}
              </div>
            </div>

            <div className="relative min-w-0">
              <div className="relative h-[52px]">
                <div className="absolute inset-x-0 top-8 h-px bg-black/20" />
                {axisTicks.map((tick) => {
                  const position = axisPosition(tick);
                  const labelAlignment =
                    tick === AXIS_MAX ? "-translate-x-full text-right" : "-translate-x-1/2 text-center";

                  return (
                    <div key={tick} className="absolute top-0" style={{ left: `${position}%` }}>
                      <span className="absolute top-7 h-2 w-px bg-black/25" />
                      <span
                        className={`absolute top-2 whitespace-nowrap text-[10px] font-semibold uppercase leading-none text-black/[0.4] tabular-nums ${labelAlignment}`}
                      >
                        +{tick}y
                      </span>
                    </div>
                  );
                })}

                <div className="absolute top-0 z-20" style={{ left: `${markerPosition}%`, transform: "translateX(-18%)" }}>
                  <div className="flex items-center gap-1.5 border border-[#126dff]/50 bg-white px-2 py-1">
                    <span className="h-1.5 w-1.5 bg-[#126dff]" />
                    <span className="whitespace-nowrap text-[10px] font-semibold uppercase leading-none text-black">
                      Quantum risk window opens
                    </span>
                  </div>
                </div>
              </div>

              <div className="relative grid gap-3">
                {axisTicks.map((tick) => (
                  <div
                    key={tick}
                    className="pointer-events-none absolute inset-y-0 w-px bg-black/[0.08]"
                    style={{ left: `${axisPosition(tick)}%` }}
                  />
                ))}

                <div
                  className="pointer-events-none absolute inset-y-0 z-10 w-px border-l border-dashed border-[#126dff]/70"
                  style={{ left: `${markerPosition}%` }}
                />

                {rows.map((row, index) => {
                  const targetPosition = axisPosition(row.years);
                  const blackWidth = axisPosition(Math.min(row.years, MARKER_YEAR));
                  const blueWidth = axisPosition(Math.max(row.years - MARKER_YEAR, 0));

                  return (
                    <div key={row.label} className="relative min-w-0">
                      <div className="mb-2 sm:hidden">
                        <RowLabel index={index} label={row.label} />
                      </div>

                      <div className="relative flex h-9 items-center border-t border-black/10">
                        <div className="relative h-3 w-full">
                          <motion.div
                            className="absolute inset-y-0 left-0 w-full overflow-hidden"
                            initial={{ clipPath: "inset(0 100% 0 0)" }}
                            whileInView={{ clipPath: `inset(0 ${100 - targetPosition}% 0 0)` }}
                            viewport={{ once: true, margin: "-60px" }}
                            transition={{ duration: 0.9, delay: index * 0.08, ease: smoothEase }}
                          >
                            <div className="absolute inset-y-0 left-0 bg-black/[0.85]" style={{ width: `${blackWidth}%` }} />
                            {blueWidth > 0 ? (
                              <div
                                className="absolute inset-y-0 bg-[#126dff]"
                                style={{ left: `${markerPosition}%`, width: `${blueWidth}%` }}
                              />
                            ) : null}
                          </motion.div>
                        </div>

                        <span
                          className={`absolute top-1/2 w-9 -translate-y-1/2 text-[10px] font-semibold uppercase leading-none tabular-nums ${
                            row.years >= AXIS_MAX - 4 ? "text-[#f7f7f2]" : "text-black/[0.52]"
                          }`}
                          style={{ left: `min(calc(${targetPosition}% + 8px), calc(100% - 2.25rem))` }}
                        >
                          {row.years} y
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-black/10 px-4 py-3 text-[11px] uppercase leading-4 text-black/[0.5]">
          Captured today · readable within the data&apos;s lifetime — the longer the horizon, the earlier protection must
          start
        </div>
      </div>
    </div>
  );
}
