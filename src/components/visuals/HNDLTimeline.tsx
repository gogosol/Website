"use client";
import React from "react";
import { motion } from "framer-motion";

/**
 * Asset B — Harvest Now, Decrypt Later Timeline
 * Horizontal animated timeline showing:
 * Top track:  Capture → Store → Decrypt (threat)
 * Bottom track: With QuantumHalon — data stays protected
 */
export default function HNDLTimeline() {
  const step = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1, y: 0,
      transition: { delay: i * 0.2, duration: 0.5, ease: [0.25, 0.1, 0.25, 1] as const },
    }),
  };

  return (
    <div className="w-full">
      <svg viewBox="0 0 900 380" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto" aria-label="Harvest Now, Decrypt Later threat timeline">
        <defs>
          <filter id="warn-glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="6" />
          </filter>
          <filter id="safe-glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="6" />
          </filter>
        </defs>

        {/* ═══ SECTION LABEL ═══ */}
        <text x="450" y="28" textAnchor="middle" fill="rgba(255,255,255,0.3)" fontSize="9" fontFamily="monospace" letterSpacing="4">
          WITHOUT QUANTUMHALON
        </text>

        {/* ═══ THREAT TRACK (top) ═══ */}
        {/* Timeline line */}
        <motion.line custom={0} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={step}
          x1="120" y1="100" x2="780" y2="100" stroke="rgba(249,115,22,0.2)" strokeWidth="2" strokeDasharray="6 4" />

        {/* Step 1: Capture */}
        <motion.g custom={1} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={step}>
          <rect x="80" y="60" width="160" height="80" rx="12" fill="rgba(249,115,22,0.06)" stroke="rgba(249,115,22,0.3)" strokeWidth="1" />
          <text x="160" y="88" textAnchor="middle" fill="#f97316" fontSize="9" fontFamily="monospace" fontWeight="700" letterSpacing="2">TODAY</text>
          <text x="160" y="108" textAnchor="middle" fill="rgba(255,255,255,0.6)" fontSize="11" fontFamily="var(--font-sans)">Encrypted traffic</text>
          <text x="160" y="124" textAnchor="middle" fill="rgba(255,255,255,0.4)" fontSize="11" fontFamily="var(--font-sans)">intercepted &amp; stored</text>
          {/* Packet icons */}
          {[0, 1, 2].map((p) => (
            <rect key={p} x={100 + p * 22} y="45" width="14" height="10" rx="2" fill="rgba(249,115,22,0.3)" stroke="rgba(249,115,22,0.5)" strokeWidth="0.5">
              <animate attributeName="opacity" values="0.3;0.8;0.3" dur="2s" begin={`${p * 0.4}s`} repeatCount="indefinite" />
            </rect>
          ))}
        </motion.g>

        {/* Arrow */}
        <motion.g custom={2} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={step}>
          <line x1="250" y1="100" x2="330" y2="100" stroke="rgba(249,115,22,0.3)" strokeWidth="1.5" />
          <polygon points="328,95 340,100 328,105" fill="rgba(249,115,22,0.4)" />
        </motion.g>

        {/* Step 2: Store */}
        <motion.g custom={2} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={step}>
          <rect x="340" y="60" width="180" height="80" rx="12" fill="rgba(249,115,22,0.06)" stroke="rgba(249,115,22,0.25)" strokeWidth="1" />
          <text x="430" y="88" textAnchor="middle" fill="#f97316" fontSize="9" fontFamily="monospace" fontWeight="700" letterSpacing="2">ADVERSARY STORAGE</text>
          <text x="430" y="108" textAnchor="middle" fill="rgba(255,255,255,0.6)" fontSize="11" fontFamily="var(--font-sans)">Data accumulates</text>
          <text x="430" y="124" textAnchor="middle" fill="rgba(255,255,255,0.4)" fontSize="11" fontFamily="var(--font-sans)">awaiting quantum capability</text>
          {/* Accumulating blocks */}
          {[0, 1, 2, 3, 4].map((p) => (
            <rect key={p} x={360 + p * 18} y="45" width="12" height="10" rx="2" fill="rgba(249,115,22,0.2)" stroke="rgba(249,115,22,0.4)" strokeWidth="0.5">
              <animate attributeName="opacity" values="0.2;0.6;0.2" dur="3s" begin={`${p * 0.3}s`} repeatCount="indefinite" />
            </rect>
          ))}
        </motion.g>

        {/* Arrow */}
        <motion.g custom={3} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={step}>
          <line x1="530" y1="100" x2="610" y2="100" stroke="rgba(249,115,22,0.3)" strokeWidth="1.5" />
          <polygon points="608,95 620,100 608,105" fill="rgba(249,115,22,0.4)" />
        </motion.g>

        {/* Step 3: Decrypt */}
        <motion.g custom={3} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={step}>
          <rect x="620" y="60" width="180" height="80" rx="12" fill="rgba(249,115,22,0.08)" stroke="rgba(249,115,22,0.4)" strokeWidth="1.5" />
          <circle cx="800" cy="60" r="16" fill="#f97316" opacity="0.15" filter="url(#warn-glow)" />
          <text x="710" y="88" textAnchor="middle" fill="#f97316" fontSize="9" fontFamily="monospace" fontWeight="700" letterSpacing="2">FUTURE</text>
          <text x="710" y="108" textAnchor="middle" fill="rgba(255,255,255,0.7)" fontSize="11" fontFamily="var(--font-sans)" fontWeight="600">Data decrypted</text>
          <text x="710" y="124" textAnchor="middle" fill="rgba(249,115,22,0.7)" fontSize="11" fontFamily="var(--font-sans)">Sensitive data exposed</text>
          {/* Broken lock */}
          <g transform="translate(775, 85)">
            <rect x="0" y="6" width="14" height="12" rx="2" fill="none" stroke="rgba(249,115,22,0.6)" strokeWidth="1.5" />
            <path d="M3 6V4a4 4 0 0 1 8 0" fill="none" stroke="rgba(249,115,22,0.6)" strokeWidth="1.5" strokeLinecap="round">
              <animateTransform attributeName="transform" type="rotate" values="0 7 4;-15 7 4;-15 7 4" dur="3s" repeatCount="indefinite" />
            </path>
          </g>
        </motion.g>

        {/* ═══ DIVIDER ═══ */}
        <line x1="120" y1="185" x2="780" y2="185" stroke="rgba(255,255,255,0.06)" strokeWidth="1" />

        {/* ═══ LABEL ═══ */}
        <text x="450" y="215" textAnchor="middle" fill="rgba(14,165,233,0.4)" fontSize="9" fontFamily="monospace" letterSpacing="4">
          WITH QUANTUMHALON
        </text>

        {/* ═══ PROTECTED TRACK (bottom) ═══ */}
        <motion.line custom={4} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={step}
          x1="120" y1="290" x2="780" y2="290" stroke="rgba(14,165,233,0.2)" strokeWidth="2" strokeDasharray="6 4" className="anim-flow-dash" />

        {/* Protected Step 1 */}
        <motion.g custom={5} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={step}>
          <rect x="80" y="250" width="160" height="80" rx="12" fill="rgba(14,165,233,0.05)" stroke="rgba(14,165,233,0.3)" strokeWidth="1" />
          <text x="160" y="278" textAnchor="middle" fill="#0ea5e9" fontSize="9" fontFamily="monospace" fontWeight="700" letterSpacing="2">TODAY</text>
          <text x="160" y="298" textAnchor="middle" fill="rgba(255,255,255,0.6)" fontSize="11" fontFamily="var(--font-sans)">Stronger crypto applied</text>
          <text x="160" y="314" textAnchor="middle" fill="rgba(255,255,255,0.4)" fontSize="11" fontFamily="var(--font-sans)">at the gateway</text>
        </motion.g>

        {/* Protected Step 2 */}
        <motion.g custom={5} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={step}>
          <rect x="340" y="250" width="180" height="80" rx="12" fill="rgba(14,165,233,0.05)" stroke="rgba(14,165,233,0.25)" strokeWidth="1" />
          <text x="430" y="278" textAnchor="middle" fill="#0ea5e9" fontSize="9" fontFamily="monospace" fontWeight="700" letterSpacing="2">ADVERSARY CAPTURE</text>
          <text x="430" y="298" textAnchor="middle" fill="rgba(255,255,255,0.6)" fontSize="11" fontFamily="var(--font-sans)">Captured data remains</text>
          <text x="430" y="314" textAnchor="middle" fill="rgba(255,255,255,0.4)" fontSize="11" fontFamily="var(--font-sans)">cryptographically protected</text>
        </motion.g>

        {/* Protected Step 3: Safe */}
        <motion.g custom={6} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={step}>
          <rect x="620" y="250" width="180" height="80" rx="12" fill="rgba(14,165,233,0.06)" stroke="rgba(14,165,233,0.4)" strokeWidth="1.5" />
          <circle cx="800" cy="250" r="16" fill="#0ea5e9" opacity="0.15" filter="url(#safe-glow)" />
          <text x="710" y="278" textAnchor="middle" fill="#0ea5e9" fontSize="9" fontFamily="monospace" fontWeight="700" letterSpacing="2">FUTURE</text>
          <text x="710" y="298" textAnchor="middle" fill="rgba(255,255,255,0.7)" fontSize="11" fontFamily="var(--font-sans)" fontWeight="600">Data stays protected</text>
          <text x="710" y="314" textAnchor="middle" fill="rgba(14,165,233,0.6)" fontSize="11" fontFamily="var(--font-sans)">Decryption infeasible</text>
          {/* Intact lock */}
          <g transform="translate(775, 275)">
            <rect x="0" y="6" width="14" height="12" rx="2" fill="none" stroke="rgba(14,165,233,0.6)" strokeWidth="1.5" />
            <path d="M3 6V4a4 4 0 0 1 8 0V6" fill="none" stroke="rgba(14,165,233,0.6)" strokeWidth="1.5" strokeLinecap="round" />
          </g>
        </motion.g>
      </svg>
    </div>
  );
}
