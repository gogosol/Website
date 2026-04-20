"use client";
import React from "react";
import { motion } from "framer-motion";
import { Lock, LockOpen, Archive, ShieldCheck } from "lucide-react";

/**
 * Asset B - Harvest Now, Decrypt Later Timeline
 * Desktop: SVG horizontal timeline with 3D depth and dramatic animations
 * Mobile: Card-based vertical layout with enhanced visuals
 * QuantumHalon references preserved throughout
 */

function FadeIn({ children, className = "", delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  return (
    <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-40px" }} transition={{ duration: 0.5, delay, ease: [0.25, 0.1, 0.25, 1] as const }} className={className}>
      {children}
    </motion.div>
  );
}

export default function HNDLTimeline() {
  return (
    <div className="w-full">
      {/* ═══ DESKTOP: SVG Timeline ═══ */}
      <div className="hidden lg:block">
        <svg viewBox="0 0 900 400" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto" aria-label="Harvest Now, Decrypt Later threat timeline">
          <defs>
            <filter id="warn-glow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="8" />
            </filter>
            <filter id="safe-glow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="8" />
            </filter>
            <filter id="card-shadow" x="-10%" y="-10%" width="120%" height="120%">
              <feDropShadow dx="0" dy="4" stdDeviation="8" floodColor="rgba(0,0,0,0.5)" />
            </filter>
            <linearGradient id="threat-fill" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="rgba(249,115,22,0.1)" />
              <stop offset="100%" stopColor="rgba(249,115,22,0.02)" />
            </linearGradient>
            <linearGradient id="safe-fill" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="rgba(14,165,233,0.1)" />
              <stop offset="100%" stopColor="rgba(14,165,233,0.02)" />
            </linearGradient>
          </defs>

          {/* ═══ WITHOUT QUANTUMHALON LABEL ═══ */}
          <text x="450" y="28" textAnchor="middle" fill="rgba(255,255,255,0.3)" fontSize="9" fontFamily="monospace" letterSpacing="4">WITHOUT QUANTUMHALON</text>

          {/* ═══ THREAT TRACK (top) ═══ */}

          {/* Step 1: Capture - 3D card */}
          <rect x="82" y="63" width="160" height="80" rx="12" fill="rgba(0,0,0,0.3)" />
          <rect x="80" y="60" width="160" height="80" rx="12" fill="url(#threat-fill)" stroke="rgba(249,115,22,0.3)" strokeWidth="1" filter="url(#card-shadow)" />

          <text x="160" y="88" textAnchor="middle" fill="#f97316" fontSize="9" fontFamily="monospace" fontWeight="700" letterSpacing="2">TODAY</text>
          <text x="160" y="108" textAnchor="middle" fill="rgba(255,255,255,0.6)" fontSize="11" fontFamily="var(--font-sans)">Encrypted traffic</text>
          <text x="160" y="124" textAnchor="middle" fill="rgba(255,255,255,0.4)" fontSize="11" fontFamily="var(--font-sans)">intercepted &amp; stored</text>
          {/* Animated data packets */}
          {[0, 1, 2].map((p) => (
            <g key={`pk-${p}`}>
              <rect x={100 + p * 22} y="45" width="14" height="10" rx="2" fill="rgba(249,115,22,0.3)" stroke="rgba(249,115,22,0.5)" strokeWidth="0.5">
                <animate attributeName="opacity" values="0.3;0.8;0.3" dur="2s" begin={`${p * 0.4}s`} repeatCount="indefinite" />
              </rect>
              <rect x={100 + p * 22} y="45" width="14" height="10" rx="2" fill="#f97316" opacity="0">
                <animate attributeName="opacity" values="0;0.15;0" dur="2s" begin={`${p * 0.4}s`} repeatCount="indefinite" />
              </rect>
            </g>
          ))}

          {/* Arrow 1→2 with flowing particles */}
          <line x1="240" y1="100" x2="330" y2="100" stroke="rgba(249,115,22,0.3)" strokeWidth="2" strokeDasharray="6 4" className="anim-flow-dash" />
          <polygon points="328,95 340,100 328,105" fill="rgba(249,115,22,0.4)" />
          {[0, 1].map((p) => (
            <circle key={`tp1-${p}`} r="2" fill="#f97316" opacity="0">
              <animate attributeName="cx" values="245;325" dur="1.5s" begin={`${p * 0.7}s`} repeatCount="indefinite" />
              <animate attributeName="cy" values="100;100" dur="1.5s" begin={`${p * 0.7}s`} repeatCount="indefinite" />
              <animate attributeName="opacity" values="0;0.6;0" dur="1.5s" begin={`${p * 0.7}s`} repeatCount="indefinite" />
            </circle>
          ))}

          {/* Step 2: Store - 3D card */}
          <rect x="342" y="63" width="180" height="80" rx="12" fill="rgba(0,0,0,0.3)" />
          <rect x="340" y="60" width="180" height="80" rx="12" fill="url(#threat-fill)" stroke="rgba(249,115,22,0.25)" strokeWidth="1" filter="url(#card-shadow)" />

          <text x="430" y="88" textAnchor="middle" fill="#f97316" fontSize="9" fontFamily="monospace" fontWeight="700" letterSpacing="2">ADVERSARY STORAGE</text>
          <text x="430" y="108" textAnchor="middle" fill="rgba(255,255,255,0.6)" fontSize="11" fontFamily="var(--font-sans)">Data accumulates</text>
          <text x="430" y="124" textAnchor="middle" fill="rgba(255,255,255,0.4)" fontSize="11" fontFamily="var(--font-sans)">awaiting quantum capability</text>

          {/* Arrow 2→3 */}
          <line x1="520" y1="100" x2="610" y2="100" stroke="rgba(249,115,22,0.3)" strokeWidth="2" strokeDasharray="6 4" className="anim-flow-dash" />
          <polygon points="608,95 620,100 608,105" fill="rgba(249,115,22,0.4)" />
          {[0, 1].map((p) => (
            <circle key={`tp2-${p}`} r="2" fill="#f97316" opacity="0">
              <animate attributeName="cx" values="525;605" dur="1.5s" begin={`${p * 0.7 + 0.3}s`} repeatCount="indefinite" />
              <animate attributeName="cy" values="100;100" dur="1.5s" begin={`${p * 0.7 + 0.3}s`} repeatCount="indefinite" />
              <animate attributeName="opacity" values="0;0.6;0" dur="1.5s" begin={`${p * 0.7 + 0.3}s`} repeatCount="indefinite" />
            </circle>
          ))}

          {/* Step 3: Decrypt - 3D card with danger glow */}
          <rect x="622" y="63" width="180" height="80" rx="12" fill="rgba(0,0,0,0.3)" />
          <rect x="620" y="60" width="180" height="80" rx="12" fill="url(#threat-fill)" stroke="rgba(249,115,22,0.4)" strokeWidth="1.5" filter="url(#card-shadow)" />

          {/* Danger glow */}
          <circle cx="800" cy="60" r="20" fill="#f97316" opacity="0.1" filter="url(#warn-glow)">
            <animate attributeName="r" values="16;24;16" dur="3s" repeatCount="indefinite" />
            <animate attributeName="opacity" values="0.1;0.2;0.1" dur="3s" repeatCount="indefinite" />
          </circle>
          <text x="710" y="88" textAnchor="middle" fill="#f97316" fontSize="9" fontFamily="monospace" fontWeight="700" letterSpacing="2">FUTURE</text>
          <text x="710" y="108" textAnchor="middle" fill="rgba(255,255,255,0.7)" fontSize="11" fontFamily="var(--font-sans)" fontWeight="600">Data decrypted</text>
          <text x="710" y="124" textAnchor="middle" fill="rgba(249,115,22,0.7)" fontSize="11" fontFamily="var(--font-sans)">Sensitive data exposed</text>
          {/* Animated lock breaking */}
          <g transform="translate(775, 85)">
            <rect x="0" y="6" width="14" height="12" rx="2" fill="none" stroke="rgba(249,115,22,0.6)" strokeWidth="1.5" />
            <path d="M3 6V4a4 4 0 0 1 8 0" fill="none" stroke="rgba(249,115,22,0.6)" strokeWidth="1.5" strokeLinecap="round">
              <animateTransform attributeName="transform" type="rotate" values="0 7 4;-15 7 4;-15 7 4" dur="3s" repeatCount="indefinite" />
            </path>
          </g>

          {/* ═══ DIVIDER ═══ */}
          <line x1="120" y1="185" x2="780" y2="185" stroke="rgba(255,255,255,0.06)" strokeWidth="1" />

          {/* ═══ WITH QUANTUMHALON LABEL ═══ */}
          <text x="450" y="215" textAnchor="middle" fill="rgba(14,165,233,0.4)" fontSize="9" fontFamily="monospace" letterSpacing="4">WITH QUANTUMHALON</text>

          {/* ═══ PROTECTED TRACK (bottom) ═══ */}
          <line x1="240" y1="290" x2="340" y2="290" stroke="rgba(14,165,233,0.2)" strokeWidth="2" strokeDasharray="6 4" className="anim-flow-dash" />
          <line x1="520" y1="290" x2="620" y2="290" stroke="rgba(14,165,233,0.2)" strokeWidth="2" strokeDasharray="6 4" className="anim-flow-dash" />

          {/* Protected path particles */}
          {[0, 1].map((p) => (
            <circle key={`sp1-${p}`} r="2" fill="#0ea5e9" opacity="0">
              <animate attributeName="cx" values="245;335" dur="1.5s" begin={`${p * 0.7}s`} repeatCount="indefinite" />
              <animate attributeName="cy" values="290;290" dur="1.5s" begin={`${p * 0.7}s`} repeatCount="indefinite" />
              <animate attributeName="opacity" values="0;0.6;0" dur="1.5s" begin={`${p * 0.7}s`} repeatCount="indefinite" />
            </circle>
          ))}
          {[0, 1].map((p) => (
            <circle key={`sp2-${p}`} r="2" fill="#0ea5e9" opacity="0">
              <animate attributeName="cx" values="525;615" dur="1.5s" begin={`${p * 0.7 + 0.3}s`} repeatCount="indefinite" />
              <animate attributeName="cy" values="290;290" dur="1.5s" begin={`${p * 0.7 + 0.3}s`} repeatCount="indefinite" />
              <animate attributeName="opacity" values="0;0.6;0" dur="1.5s" begin={`${p * 0.7 + 0.3}s`} repeatCount="indefinite" />
            </circle>
          ))}

          {/* Step P1 - 3D */}
          <rect x="82" y="253" width="160" height="80" rx="12" fill="rgba(0,0,0,0.3)" />
          <rect x="80" y="250" width="160" height="80" rx="12" fill="url(#safe-fill)" stroke="rgba(14,165,233,0.3)" strokeWidth="1" filter="url(#card-shadow)" />

          <text x="160" y="278" textAnchor="middle" fill="#0ea5e9" fontSize="9" fontFamily="monospace" fontWeight="700" letterSpacing="2">TODAY</text>
          <text x="160" y="298" textAnchor="middle" fill="rgba(255,255,255,0.6)" fontSize="11" fontFamily="var(--font-sans)">Stronger crypto applied</text>
          <text x="160" y="314" textAnchor="middle" fill="rgba(255,255,255,0.4)" fontSize="11" fontFamily="var(--font-sans)">at the gateway</text>

          {/* Step P2 - 3D */}
          <rect x="342" y="253" width="180" height="80" rx="12" fill="rgba(0,0,0,0.3)" />
          <rect x="340" y="250" width="180" height="80" rx="12" fill="url(#safe-fill)" stroke="rgba(14,165,233,0.25)" strokeWidth="1" filter="url(#card-shadow)" />

          <text x="430" y="278" textAnchor="middle" fill="#0ea5e9" fontSize="9" fontFamily="monospace" fontWeight="700" letterSpacing="2">ADVERSARY CAPTURE</text>
          <text x="430" y="298" textAnchor="middle" fill="rgba(255,255,255,0.6)" fontSize="11" fontFamily="var(--font-sans)">Captured data remains</text>
          <text x="430" y="314" textAnchor="middle" fill="rgba(255,255,255,0.4)" fontSize="11" fontFamily="var(--font-sans)">cryptographically protected</text>

          {/* Step P3: Safe - 3D with glow */}
          <rect x="622" y="253" width="180" height="80" rx="12" fill="rgba(0,0,0,0.3)" />
          <rect x="620" y="250" width="180" height="80" rx="12" fill="url(#safe-fill)" stroke="rgba(14,165,233,0.4)" strokeWidth="1.5" filter="url(#card-shadow)" />

          <circle cx="800" cy="250" r="20" fill="#0ea5e9" opacity="0.1" filter="url(#safe-glow)">
            <animate attributeName="r" values="16;24;16" dur="3s" repeatCount="indefinite" />
            <animate attributeName="opacity" values="0.1;0.18;0.1" dur="3s" repeatCount="indefinite" />
          </circle>
          <text x="710" y="278" textAnchor="middle" fill="#0ea5e9" fontSize="9" fontFamily="monospace" fontWeight="700" letterSpacing="2">FUTURE</text>
          <text x="710" y="298" textAnchor="middle" fill="rgba(255,255,255,0.7)" fontSize="11" fontFamily="var(--font-sans)" fontWeight="600">Data stays protected</text>
          <text x="710" y="314" textAnchor="middle" fill="rgba(14,165,233,0.6)" fontSize="11" fontFamily="var(--font-sans)">Decryption infeasible</text>
          <g transform="translate(775, 275)">
            <rect x="0" y="6" width="14" height="12" rx="2" fill="none" stroke="rgba(14,165,233,0.6)" strokeWidth="1.5" />
            <path d="M3 6V4a4 4 0 0 1 8 0V6" fill="none" stroke="rgba(14,165,233,0.6)" strokeWidth="1.5" strokeLinecap="round" />
            {/* Shield glow around lock */}
            <circle cx="7" cy="12" r="12" fill="none" stroke="rgba(14,165,233,0.2)" strokeWidth="1">
              <animate attributeName="r" values="12;16;12" dur="2.5s" repeatCount="indefinite" />
              <animate attributeName="opacity" values="0.3;0.1;0.3" dur="2.5s" repeatCount="indefinite" />
            </circle>
          </g>
        </svg>
      </div>

      {/* ═══ MOBILE: Card-based vertical layout ═══ */}
      <div className="lg:hidden space-y-6">
        {/* Threat track */}
        <div>
          <div className="text-[10px] font-mono text-slate-500 uppercase tracking-widest text-center mb-3">Without QuantumHalon</div>
          <div className="space-y-3">
            <FadeIn delay={0}>
              <div className="p-4 rounded-xl border border-amber-500/30 bg-amber-500/[0.04] relative overflow-hidden">

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Archive className="w-4 h-4 text-amber-500" />
                  </div>
                  <div>
                    <div className="text-[10px] font-mono font-bold text-amber-500 uppercase tracking-widest mb-0.5">Today</div>
                    <p className="text-slate-300 text-sm">Encrypted traffic intercepted &amp; stored by adversaries.</p>
                  </div>
                </div>
              </div>
            </FadeIn>
            <div className="flex justify-center">
              <div className="w-px h-4 bg-amber-500/20" />
            </div>
            <FadeIn delay={0.1}>
              <div className="p-4 rounded-xl border border-amber-500/25 bg-amber-500/[0.03] relative overflow-hidden">

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Archive className="w-4 h-4 text-amber-500" />
                  </div>
                  <div>
                    <div className="text-[10px] font-mono font-bold text-amber-500 uppercase tracking-widest mb-0.5">Adversary Storage</div>
                    <p className="text-slate-300 text-sm">Data accumulates awaiting quantum capability.</p>
                  </div>
                </div>
              </div>
            </FadeIn>
            <div className="flex justify-center">
              <div className="w-px h-4 bg-amber-500/20" />
            </div>
            <FadeIn delay={0.2}>
              <div className="p-4 rounded-xl border border-amber-500/40 bg-amber-500/[0.06] relative overflow-hidden">

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-amber-500/15 border border-amber-500/30 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <LockOpen className="w-4 h-4 text-amber-500" />
                  </div>
                  <div>
                    <div className="text-[10px] font-mono font-bold text-amber-500 uppercase tracking-widest mb-0.5">Future</div>
                    <p className="text-white text-sm font-medium">Data decrypted, sensitive data exposed.</p>
                  </div>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-white/10" />

        {/* Protected track */}
        <div>
          <div className="text-[10px] font-mono text-[#0ea5e9]/50 uppercase tracking-widest text-center mb-3">With QuantumHalon</div>
          <div className="space-y-3">
            <FadeIn delay={0.3}>
              <div className="p-4 rounded-xl border border-[#0ea5e9]/30 bg-[#0ea5e9]/[0.04] relative overflow-hidden">

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-[#0ea5e9]/10 border border-[#0ea5e9]/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <ShieldCheck className="w-4 h-4 text-[#0ea5e9]" />
                  </div>
                  <div>
                    <div className="text-[10px] font-mono font-bold text-[#0ea5e9] uppercase tracking-widest mb-0.5">Today</div>
                    <p className="text-slate-300 text-sm">Stronger crypto applied at the gateway.</p>
                  </div>
                </div>
              </div>
            </FadeIn>
            <div className="flex justify-center">
              <div className="w-px h-4 bg-[#0ea5e9]/20" />
            </div>
            <FadeIn delay={0.4}>
              <div className="p-4 rounded-xl border border-[#0ea5e9]/25 bg-[#0ea5e9]/[0.03] relative overflow-hidden">

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-[#0ea5e9]/10 border border-[#0ea5e9]/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <ShieldCheck className="w-4 h-4 text-[#0ea5e9]" />
                  </div>
                  <div>
                    <div className="text-[10px] font-mono font-bold text-[#0ea5e9] uppercase tracking-widest mb-0.5">Adversary Capture</div>
                    <p className="text-slate-300 text-sm">Captured data remains cryptographically protected.</p>
                  </div>
                </div>
              </div>
            </FadeIn>
            <div className="flex justify-center">
              <div className="w-px h-4 bg-[#0ea5e9]/20" />
            </div>
            <FadeIn delay={0.5}>
              <div className="p-4 rounded-xl border border-[#0ea5e9]/40 bg-[#0ea5e9]/[0.06] relative overflow-hidden">

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-[#0ea5e9]/15 border border-[#0ea5e9]/30 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Lock className="w-4 h-4 text-[#0ea5e9]" />
                  </div>
                  <div>
                    <div className="text-[10px] font-mono font-bold text-[#0ea5e9] uppercase tracking-widest mb-0.5">Future</div>
                    <p className="text-white text-sm font-medium">Data stays protected, decryption infeasible.</p>
                  </div>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </div>
    </div>
  );
}



