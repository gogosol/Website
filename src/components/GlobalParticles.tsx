"use client";
import React from "react";

/* ─── Deterministic particle seeds (avoids hydration mismatch) ─── */
const globalParticleSeeds = Array.from({ length: 40 }, (_, i) => {
  const s = (i * 3141592653) % 1000;
  return {
    w: (s % 20) / 10 + 1, // smaller particles (1-3px)
    h: ((s * 7) % 20) / 10 + 1,
    x: ((s * 13) % 1000) / 10,
    y: ((s * 17) % 1000) / 10,
    o: ((s * 3) % 30) / 100 + 0.05, // very subtle (0.05 - 0.35 opacity)
    dur: ((s * 11) % 100) / 10 + 8, // slower float (8 - 18s)
    del: ((s * 19) % 50) / 10,
  };
});

export default function GlobalParticles() {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-[-1]">
      {globalParticleSeeds.map((p, i) => (
        <div
          key={i}
          className="absolute rounded-full bg-[#0ea5e9]"
          style={{
            width: `${p.w}px`,
            height: `${p.h}px`,
            left: `${p.x}%`,
            top: `${p.y}%`,
            opacity: p.o,
            animation: `particle-float ${p.dur}s ease-in-out infinite ${p.del}s`,
          }}
        />
      ))}
    </div>
  );
}
