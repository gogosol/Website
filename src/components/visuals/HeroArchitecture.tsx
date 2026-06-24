"use client";
import React from "react";
import { motion } from "framer-motion";
import { Server, Cloud, Building, Globe, Laptop, Network } from "lucide-react";

/**
 * Asset A - Hero Gateway Architecture Diagram
 * Desktop: Full SVG with animated particles and 3D depth
 * Mobile: Card-based vertical flow for readability
 * QuantumHalon is the product name - preserved throughout
 */
export default function HeroArchitecture() {
  const nodeVariant = {
    hidden: { opacity: 0, scale: 0.85 },
    visible: (i: number) => ({
      opacity: 1,
      scale: 1,
      transition: { delay: i * 0.12, duration: 0.5, ease: [0.25, 0.1, 0.25, 1] as const },
    }),
  };

  const lineVariant = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: (i: number) => ({
      pathLength: 1,
      opacity: 1,
      transition: { delay: 0.4 + i * 0.15, duration: 0.6, ease: "easeOut" as const },
    }),
  };

  return (
    <div className="w-full">
      {/* ═══ DESKTOP SVG ═══ */}
      <div className="hidden md:block aspect-[16/9] lg:aspect-[16/7]">
        <svg viewBox="0 0 960 400" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full" aria-label="QuantumHalon gateway architecture diagram">
          <defs>
            <filter id="gw-glow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur in="SourceGraphic" stdDeviation="8" />
            </filter>
            <filter id="gw-glow-strong" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur in="SourceGraphic" stdDeviation="14" />
            </filter>
            <filter id="node-shadow" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="0" dy="4" stdDeviation="6" floodColor="rgba(0,0,0,0.4)" />
            </filter>
            <marker id="arr" viewBox="0 0 10 7" refX="10" refY="3.5" markerWidth="8" markerHeight="6" orient="auto">
              <polygon points="0 0, 10 3.5, 0 7" fill="rgba(255,255,255,0.3)" />
            </marker>
            <marker id="arr-accent" viewBox="0 0 10 7" refX="10" refY="3.5" markerWidth="8" markerHeight="6" orient="auto">
              <polygon points="0 0, 10 3.5, 0 7" fill="#0ea5e9" />
            </marker>
            <linearGradient id="gw-fill" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="rgba(14,165,233,0.15)" />
              <stop offset="100%" stopColor="rgba(14,165,233,0.03)" />
            </linearGradient>
            <linearGradient id="node-fill" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="rgba(255,255,255,0.08)" />
              <stop offset="100%" stopColor="rgba(255,255,255,0.02)" />
            </linearGradient>
          </defs>

          {/* Source nodes - 3D depth with shadow */}
          {[
            { y: 80, label: "Application" },
            { y: 175, label: "API Service" },
            { y: 270, label: "Branch Site" },
          ].map((node, i) => (
            <motion.g key={`src-${i}`} custom={i} initial="hidden" animate="visible" variants={nodeVariant}>
              {/* Shadow layer */}
              <rect x="22" y={node.y + 3} width="130" height="48" rx="10" fill="rgba(0,0,0,0.3)" />
              {/* Main panel */}
              <rect x="20" y={node.y} width="130" height="48" rx="10" fill="url(#node-fill)" stroke="rgba(255,255,255,0.15)" strokeWidth="1" />
              {/* Top highlight */}

              <text x="85" y={node.y + 28} textAnchor="middle" fill="rgba(255,255,255,0.6)" fontSize="11" fontFamily="var(--font-sans)" fontWeight="500">{node.label}</text>
            </motion.g>
          ))}

          {/* Source → GW1 - animated connections */}
          {[104, 199, 294].map((y, i) => (
            <motion.line key={`sl-${i}`} custom={i} initial="hidden" animate="visible" variants={lineVariant}
              x1="150" y1={y} x2="280" y2="200" stroke="rgba(255,255,255,0.12)" strokeWidth="1" markerEnd="url(#arr)" />
          ))}

          {/* Gateway 1 - 3D with depth */}
          <motion.g custom={3} initial="hidden" animate="visible" variants={nodeVariant}>
            {/* Outer glow ring */}
            <rect x="275" y="157" width="150" height="86" rx="16" fill="#0ea5e9" opacity="0.06" filter="url(#gw-glow-strong)" className="anim-pulse-glow" />
            {/* Shadow */}
            <rect x="283" y="167" width="140" height="76" rx="14" fill="rgba(0,0,0,0.4)" />
            {/* Main panel */}
            <rect x="280" y="162" width="140" height="76" rx="14" fill="url(#gw-fill)" stroke="#0ea5e9" strokeWidth="1.5" strokeOpacity="0.5" />
            {/* Top highlight band */}

            <text x="350" y="192" textAnchor="middle" fill="#0ea5e9" fontSize="9" fontFamily="monospace" fontWeight="700" letterSpacing="2">QUANTUMHALON</text>
            <text x="350" y="210" textAnchor="middle" fill="rgba(255,255,255,0.5)" fontSize="10" fontFamily="var(--font-sans)">Gateway</text>
            {/* Status indicator with pulse ring */}
            <circle cx="300" cy="226" r="6" fill="#22c55e" opacity="0.15">
              <animate attributeName="r" values="6;10;6" dur="2s" repeatCount="indefinite" />
              <animate attributeName="opacity" values="0.15;0.05;0.15" dur="2s" repeatCount="indefinite" />
            </circle>
            <circle cx="300" cy="226" r="3" fill="#22c55e" className="anim-pulse-dot" />
            <text x="310" y="229" fill="rgba(255,255,255,0.4)" fontSize="8" fontFamily="monospace">ACTIVE</text>
          </motion.g>

          {/* Protected path - enhanced with more particles and glow */}
          <motion.g custom={5} initial="hidden" animate="visible" variants={nodeVariant}>
            {/* Glow trail */}
            <line x1="420" y1="200" x2="540" y2="200" stroke="transparent" strokeWidth="8" strokeOpacity="0" filter="url(#gw-glow-strong)" />
            <line x1="420" y1="200" x2="540" y2="200" stroke="transparent" strokeWidth="4" strokeOpacity="0" filter="url(#gw-glow)" />
            <line x1="420" y1="200" x2="540" y2="200" stroke="transparent" strokeWidth="2" strokeOpacity="0" strokeDasharray="6 6" className="anim-flow-dash" markerEnd="url(#arr-accent)" />
            {/* Flowing particles - more and varied */}
            {[0, 1, 2, 3, 4].map((p) => (
              <circle key={`p-${p}`} r={p % 2 === 0 ? "3" : "2"} fill="#0ea5e9" opacity="0">
                <animate attributeName="cx" values="425;535" dur={`${1.2 + p * 0.2}s`} begin={`${p * 0.3}s`} repeatCount="indefinite" />
                <animate attributeName="cy" values="200;200" dur={`${1.2 + p * 0.2}s`} begin={`${p * 0.3}s`} repeatCount="indefinite" />
                <animate attributeName="opacity" values="0;0.9;0.9;0" dur={`${1.2 + p * 0.2}s`} begin={`${p * 0.3}s`} repeatCount="indefinite" />
              </circle>
            ))}
            <text x="480" y="185" textAnchor="middle" fill="rgba(14,165,233,0.5)" fontSize="8" fontFamily="monospace" letterSpacing="3">PROTECTED PATH</text>
          </motion.g>

          {/* Gateway 2 - 3D with depth */}
          <motion.g custom={4} initial="hidden" animate="visible" variants={nodeVariant}>
            <rect x="535" y="157" width="150" height="86" rx="16" fill="#0ea5e9" opacity="0.06" filter="url(#gw-glow-strong)" className="anim-pulse-glow" />
            <rect x="543" y="167" width="140" height="76" rx="14" fill="rgba(0,0,0,0.4)" />
            <rect x="540" y="162" width="140" height="76" rx="14" fill="url(#gw-fill)" stroke="#0ea5e9" strokeWidth="1.5" strokeOpacity="0.5" />

            <text x="610" y="192" textAnchor="middle" fill="#0ea5e9" fontSize="9" fontFamily="monospace" fontWeight="700" letterSpacing="2">QUANTUMHALON</text>
            <text x="610" y="210" textAnchor="middle" fill="rgba(255,255,255,0.5)" fontSize="10" fontFamily="var(--font-sans)">Gateway</text>
            <circle cx="560" cy="226" r="6" fill="#22c55e" opacity="0.15">
              <animate attributeName="r" values="6;10;6" dur="2s" begin="0.5s" repeatCount="indefinite" />
              <animate attributeName="opacity" values="0.15;0.05;0.15" dur="2s" begin="0.5s" repeatCount="indefinite" />
            </circle>
            <circle cx="560" cy="226" r="3" fill="#22c55e" className="anim-pulse-dot" />
            <text x="570" y="229" fill="rgba(255,255,255,0.4)" fontSize="8" fontFamily="monospace">ACTIVE</text>
          </motion.g>

          {/* GW2 → Destination */}
          {[104, 199, 294].map((y, i) => (
            <motion.line key={`dl-${i}`} custom={i + 3} initial="hidden" animate="visible" variants={lineVariant}
              x1="680" y1="200" x2="810" y2={y} stroke="rgba(255,255,255,0.12)" strokeWidth="1" markerEnd="url(#arr)" />
          ))}

          {/* Destination nodes - 3D depth */}
          {[
            { y: 80, label: "Data Center" },
            { y: 175, label: "Cloud Infra" },
            { y: 270, label: "Partner Network" },
          ].map((node, i) => (
            <motion.g key={`dst-${i}`} custom={i + 5} initial="hidden" animate="visible" variants={nodeVariant}>
              <rect x="812" y={node.y + 3} width="130" height="48" rx="10" fill="rgba(0,0,0,0.3)" />
              <rect x="810" y={node.y} width="130" height="48" rx="10" fill="url(#node-fill)" stroke="rgba(255,255,255,0.15)" strokeWidth="1" />

              <text x="875" y={node.y + 28} textAnchor="middle" fill="rgba(255,255,255,0.6)" fontSize="11" fontFamily="var(--font-sans)" fontWeight="500">{node.label}</text>
            </motion.g>
          ))}

          {/* Crypto layer - enhanced */}
          <motion.g custom={7} initial="hidden" animate="visible" variants={nodeVariant}>
            <rect x="306" y="337" width="348" height="40" rx="10" fill="rgba(14,165,233,0.04)" />
            <rect x="310" y="340" width="340" height="36" rx="8" fill="rgba(14,165,233,0.05)" stroke="rgba(14,165,233,0.2)" strokeWidth="1" strokeDasharray="4 4" className="anim-flow-dash" />
            <text x="480" y="362" textAnchor="middle" fill="rgba(14,165,233,0.5)" fontSize="9" fontFamily="monospace" letterSpacing="3">CRYPTO-AGILE ENGINE · HYBRID PQC</text>
          </motion.g>
        </svg>
      </div>

      {/* ═══ MOBILE: Card-based vertical flow ═══ */}
      <div className="md:hidden space-y-3">
        {/* Source systems */}
        <div className="text-[10px] font-mono text-slate-500 uppercase tracking-widest text-center">Source Systems</div>
        <div className="grid grid-cols-3 gap-2">
          {[
            { Icon: Laptop, label: "App" },
            { Icon: Globe, label: "API" },
            { Icon: Building, label: "Branch" },
          ].map(({ Icon, label }, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1, duration: 0.4 }}
              className="p-3 rounded-xl bg-white/[0.03] border border-white/10 text-center shimmer">
              <Icon className="w-5 h-5 mx-auto mb-1 text-slate-400" />
              <span className="text-[11px] text-slate-400">{label}</span>
            </motion.div>
          ))}
        </div>

        {/* Arrow down */}
        <div className="flex justify-center py-1">
          <div className="w-px h-6 bg-white/15" />
        </div>

        {/* Gateway 1 */}
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.3, duration: 0.5 }}
          className="p-4 rounded-xl border border-[#0ea5e9]/40 bg-[#0ea5e9]/[0.06] text-center relative overflow-hidden anim-depth-pulse">
          <div className="absolute inset-0 shimmer" />
          <div className="text-[10px] font-mono font-bold text-[#0ea5e9] uppercase tracking-widest mb-0.5 relative z-10">QuantumHalon</div>
          <div className="text-sm text-white/70 relative z-10">Source Gateway</div>
          <div className="flex items-center justify-center gap-1.5 mt-2 relative z-10">
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-[9px] font-mono text-emerald-400/70">Active</span>
          </div>
        </motion.div>

        {/* Protected path */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5, duration: 0.4 }}
          className="flex items-center justify-center gap-2 py-2">
          <div className="flex-1 h-px border-t border-dashed border-[#0ea5e9]/40" />
          <span className="text-[9px] font-mono text-[#0ea5e9]/50 uppercase tracking-widest whitespace-nowrap px-2">Protected Path</span>
          <div className="flex-1 h-px border-t border-dashed border-[#0ea5e9]/40" />
        </motion.div>

        {/* Gateway 2 */}
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.6, duration: 0.5 }}
          className="p-4 rounded-xl border border-[#0ea5e9]/40 bg-[#0ea5e9]/[0.06] text-center relative overflow-hidden anim-depth-pulse">
          <div className="absolute inset-0 shimmer" />
          <div className="text-[10px] font-mono font-bold text-[#0ea5e9] uppercase tracking-widest mb-0.5 relative z-10">QuantumHalon</div>
          <div className="text-sm text-white/70 relative z-10">Destination Gateway</div>
          <div className="flex items-center justify-center gap-1.5 mt-2 relative z-10">
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-[9px] font-mono text-emerald-400/70">Active</span>
          </div>
        </motion.div>

        {/* Arrow down */}
        <div className="flex justify-center py-1">
          <div className="w-px h-6 bg-white/15" />
        </div>

        {/* Destination systems */}
        <div className="text-[10px] font-mono text-slate-500 uppercase tracking-widest text-center">Destination Systems</div>
        <div className="grid grid-cols-3 gap-2">
          {[
            { Icon: Server, label: "DC" },
            { Icon: Cloud, label: "Cloud" },
            { Icon: Network, label: "Partner" },
          ].map(({ Icon, label }, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7 + i * 0.1, duration: 0.4 }}
              className="p-3 rounded-xl bg-white/[0.03] border border-white/10 text-center shimmer">
              <Icon className="w-5 h-5 mx-auto mb-1 text-slate-400" />
              <span className="text-[11px] text-slate-400">{label}</span>
            </motion.div>
          ))}
        </div>

        {/* Crypto layer label */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1, duration: 0.5 }}
          className="mt-3 p-2.5 rounded-lg border border-dashed border-[#0ea5e9]/20 bg-[#0ea5e9]/[0.03] text-center">
          <span className="text-[9px] font-mono text-[#0ea5e9]/50 uppercase tracking-widest">Crypto-agile protection · Governed PQC</span>
        </motion.div>
      </div>
    </div>
  );
}


