"use client";
import React from "react";
import { motion } from "framer-motion";

/**
 * Asset A — Hero Gateway Architecture Diagram
 * Animated SVG showing: Source nodes → QuantumHalon GW → Protected Path → QuantumHalon GW → Destination nodes
 * Particles flow along the protected path. Gateways pulse with accent glow.
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
    <div className="w-full aspect-[16/9] lg:aspect-[16/8] relative">
      <svg
        viewBox="0 0 960 420"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full"
        aria-label="QuantumHalon gateway architecture diagram"
      >
        <defs>
          {/* Accent glow filter */}
          <filter id="gw-glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="8" />
          </filter>
          {/* Arrow marker */}
          <marker id="arr" viewBox="0 0 10 7" refX="10" refY="3.5" markerWidth="8" markerHeight="6" orient="auto">
            <polygon points="0 0, 10 3.5, 0 7" fill="rgba(255,255,255,0.3)" />
          </marker>
          <marker id="arr-accent" viewBox="0 0 10 7" refX="10" refY="3.5" markerWidth="8" markerHeight="6" orient="auto">
            <polygon points="0 0, 10 3.5, 0 7" fill="#0ea5e9" />
          </marker>
        </defs>

        {/* ═══ SOURCE NODES (left) ═══ */}
        {[
          { y: 90, label: "Application" },
          { y: 190, label: "API Service" },
          { y: 290, label: "Branch Site" },
        ].map((node, i) => (
          <motion.g key={`src-${i}`} custom={i} initial="hidden" animate="visible" variants={nodeVariant}>
            <rect x="20" y={node.y} width="130" height="48" rx="10" fill="rgba(255,255,255,0.05)" stroke="rgba(255,255,255,0.15)" strokeWidth="1" />
            <text x="85" y={node.y + 28} textAnchor="middle" fill="rgba(255,255,255,0.6)" fontSize="11" fontFamily="var(--font-sans)" fontWeight="500">
              {node.label}
            </text>
          </motion.g>
        ))}

        {/* ═══ SOURCE → GW1 connections ═══ */}
        {[114, 214, 314].map((y, i) => (
          <motion.line key={`sl-${i}`} custom={i} initial="hidden" animate="visible" variants={lineVariant}
            x1="150" y1={y} x2="280" y2="210" stroke="rgba(255,255,255,0.12)" strokeWidth="1" markerEnd="url(#arr)"
          />
        ))}

        {/* ═══ GATEWAY 1 ═══ */}
        <motion.g custom={3} initial="hidden" animate="visible" variants={nodeVariant}>
          {/* Glow behind */}
          <rect x="280" y="170" width="140" height="80" rx="14" fill="#0ea5e9" opacity="0.08" filter="url(#gw-glow)" className="anim-pulse-glow" />
          {/* Node */}
          <rect x="280" y="170" width="140" height="80" rx="14" fill="rgba(14,165,233,0.08)" stroke="#0ea5e9" strokeWidth="1.5" strokeOpacity="0.5" />
          <text x="350" y="200" textAnchor="middle" fill="#0ea5e9" fontSize="9" fontFamily="monospace" fontWeight="700" letterSpacing="2">
            QUANTUMHALON
          </text>
          <text x="350" y="218" textAnchor="middle" fill="rgba(255,255,255,0.5)" fontSize="10" fontFamily="var(--font-sans)">
            Gateway
          </text>
          {/* Status dot */}
          <circle cx="300" cy="236" r="3" fill="#22c55e" className="anim-pulse-dot" />
          <text x="310" y="239" fill="rgba(255,255,255,0.4)" fontSize="8" fontFamily="monospace">
            ACTIVE
          </text>
        </motion.g>

        {/* ═══ PROTECTED PATH (center) ═══ */}
        <motion.g custom={5} initial="hidden" animate="visible" variants={nodeVariant}>
          {/* Background glow line */}
          <line x1="420" y1="210" x2="540" y2="210" stroke="#0ea5e9" strokeWidth="4" strokeOpacity="0.1" filter="url(#gw-glow)" />
          {/* Dashed animated line */}
          <line x1="420" y1="210" x2="540" y2="210" stroke="#0ea5e9" strokeWidth="2" strokeOpacity="0.5" strokeDasharray="6 6" className="anim-flow-dash" markerEnd="url(#arr-accent)" />
          {/* Flowing particles */}
          {[0, 1, 2].map((p) => (
            <circle key={`p-${p}`} r="3" fill="#0ea5e9" opacity="0">
              <animate attributeName="cx" values="425;535" dur="1.5s" begin={`${p * 0.5}s`} repeatCount="indefinite" />
              <animate attributeName="cy" values="210;210" dur="1.5s" begin={`${p * 0.5}s`} repeatCount="indefinite" />
              <animate attributeName="opacity" values="0;0.8;0.8;0" dur="1.5s" begin={`${p * 0.5}s`} repeatCount="indefinite" />
            </circle>
          ))}
          {/* Label */}
          <text x="480" y="195" textAnchor="middle" fill="rgba(14,165,233,0.5)" fontSize="8" fontFamily="monospace" letterSpacing="3">
            PROTECTED PATH
          </text>
        </motion.g>

        {/* ═══ GATEWAY 2 ═══ */}
        <motion.g custom={4} initial="hidden" animate="visible" variants={nodeVariant}>
          <rect x="540" y="170" width="140" height="80" rx="14" fill="#0ea5e9" opacity="0.08" filter="url(#gw-glow)" className="anim-pulse-glow" />
          <rect x="540" y="170" width="140" height="80" rx="14" fill="rgba(14,165,233,0.08)" stroke="#0ea5e9" strokeWidth="1.5" strokeOpacity="0.5" />
          <text x="610" y="200" textAnchor="middle" fill="#0ea5e9" fontSize="9" fontFamily="monospace" fontWeight="700" letterSpacing="2">
            QUANTUMHALON
          </text>
          <text x="610" y="218" textAnchor="middle" fill="rgba(255,255,255,0.5)" fontSize="10" fontFamily="var(--font-sans)">
            Gateway
          </text>
          <circle cx="560" cy="236" r="3" fill="#22c55e" className="anim-pulse-dot" />
          <text x="570" y="239" fill="rgba(255,255,255,0.4)" fontSize="8" fontFamily="monospace">
            ACTIVE
          </text>
        </motion.g>

        {/* ═══ GW2 → DESTINATION connections ═══ */}
        {[114, 214, 314].map((y, i) => (
          <motion.line key={`dl-${i}`} custom={i + 3} initial="hidden" animate="visible" variants={lineVariant}
            x1="680" y1="210" x2="810" y2={y} stroke="rgba(255,255,255,0.12)" strokeWidth="1" markerEnd="url(#arr)"
          />
        ))}

        {/* ═══ DESTINATION NODES (right) ═══ */}
        {[
          { y: 90, label: "Data Center" },
          { y: 190, label: "Cloud Infra" },
          { y: 290, label: "Partner Network" },
        ].map((node, i) => (
          <motion.g key={`dst-${i}`} custom={i + 5} initial="hidden" animate="visible" variants={nodeVariant}>
            <rect x="810" y={node.y} width="130" height="48" rx="10" fill="rgba(255,255,255,0.05)" stroke="rgba(255,255,255,0.15)" strokeWidth="1" />
            <text x="875" y={node.y + 28} textAnchor="middle" fill="rgba(255,255,255,0.6)" fontSize="11" fontFamily="var(--font-sans)" fontWeight="500">
              {node.label}
            </text>
          </motion.g>
        ))}

        {/* ═══ CRYPTO LAYER LABEL ═══ */}
        <motion.g custom={7} initial="hidden" animate="visible" variants={nodeVariant}>
          <rect x="310" y="355" width="340" height="36" rx="8" fill="rgba(14,165,233,0.05)" stroke="rgba(14,165,233,0.2)" strokeWidth="1" strokeDasharray="4 4" />
          <text x="480" y="377" textAnchor="middle" fill="rgba(14,165,233,0.5)" fontSize="9" fontFamily="monospace" letterSpacing="3">
            CRYPTO-AGILE ENGINE · HYBRID PQC
          </text>
        </motion.g>
      </svg>
    </div>
  );
}
