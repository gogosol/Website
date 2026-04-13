"use client";
import React from "react";
import { motion } from "framer-motion";
import { CheckCircle } from "lucide-react";
import SectionLabel from "@/components/SectionLabel";
import CTAButton from "@/components/CTAButton";
import HeroArchitecture from "@/components/visuals/HeroArchitecture";

function FadeIn({ children, className = "", delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  return (
    <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-60px" }} transition={{ duration: 0.55, delay, ease: [0.25, 0.1, 0.25, 1] }} className={className}>
      {children}
    </motion.div>
  );
}

export default function HowItWorksPage() {
  return (
    <div className="min-h-screen bg-transparent selection:bg-white/30">
      {/* Hero */}
      <section className="relative pt-28 pb-8 lg:pt-40 lg:pb-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-glow-orb w-[800px] h-[800px] bg-white top-[-200px] right-[-300px] opacity-10 hidden md:block" />
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="text-center max-w-3xl mx-auto relative z-10">
          <SectionLabel label="Architecture" />
          <h1 className="text-4xl lg:text-6xl font-bold tracking-tight text-white mb-4 leading-[1.1]">
            A practical architecture for{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-slate-400">
              cryptographic protection.
            </span>
          </h1>
          <p className="text-lg text-slate-400 max-w-xl mx-auto font-light">
            Deployable now. Adaptable over time. Compatible with what you already run.
          </p>
        </motion.div>
      </section>

      {/* Before / After */}
      <section className="py-16 lg:py-24 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <div className="text-center max-w-2xl mx-auto mb-10">
              <SectionLabel label="Comparison" />
              <h2 className="text-3xl md:text-4xl text-white font-semibold tracking-tight">
                Before and after QuantumHalon.
              </h2>
            </div>
          </FadeIn>
          <div className="grid lg:grid-cols-2 gap-6">
            {/* Before */}
            <FadeIn delay={0.1}>
              <div className="glass-panel rounded-2xl p-6 h-full">
                <div className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-4">Without QuantumHalon</div>
                <div className="space-y-3 mb-6">
                  {[
                    "Standard encryption on transit paths",
                    "Vulnerable to future quantum decryption",
                    "No crypto visibility or control plane",
                    "Upgrade requires changing every system",
                  ].map((t, i) => (
                    <div key={i} className="flex items-center gap-3 p-3 rounded-lg bg-white/[0.02] border border-white/5">
                      <div className="w-2 h-2 rounded-full bg-amber-500/60 flex-shrink-0" />
                      <span className="text-slate-400 text-sm">{t}</span>
                    </div>
                  ))}
                </div>
                {/* Mini diagram: exposed path */}
                <svg viewBox="0 0 400 60" fill="none" className="w-full" aria-hidden="true">
                  <rect x="10" y="15" width="70" height="30" rx="6" fill="rgba(255,255,255,0.04)" stroke="rgba(255,255,255,0.12)" />
                  <text x="45" y="33" textAnchor="middle" fill="rgba(255,255,255,0.4)" fontSize="8" fontFamily="monospace">Source</text>
                  <line x1="80" y1="30" x2="320" y2="30" stroke="rgba(249,115,22,0.25)" strokeWidth="2" strokeDasharray="6 4" />
                  <text x="200" y="20" textAnchor="middle" fill="rgba(249,115,22,0.4)" fontSize="7" fontFamily="monospace" letterSpacing="2">EXPOSED</text>
                  <rect x="320" y="15" width="70" height="30" rx="6" fill="rgba(255,255,255,0.04)" stroke="rgba(255,255,255,0.12)" />
                  <text x="355" y="33" textAnchor="middle" fill="rgba(255,255,255,0.4)" fontSize="8" fontFamily="monospace">Dest</text>
                </svg>
              </div>
            </FadeIn>
            {/* After */}
            <FadeIn delay={0.2}>
              <div className="glass-panel rounded-2xl p-6 h-full border-[#0ea5e9]/20">
                <div className="text-xs font-bold text-[#0ea5e9] uppercase tracking-widest mb-4">With QuantumHalon</div>
                <div className="space-y-3 mb-6">
                  {[
                    "Gateway applies stronger crypto at boundary",
                    "Reduced Harvest Now, Decrypt Later exposure",
                    "Full visibility via control plane",
                    "Internal systems remain unchanged",
                  ].map((t, i) => (
                    <div key={i} className="flex items-center gap-3 p-3 rounded-lg bg-[#0ea5e9]/[0.03] border border-[#0ea5e9]/15">
                      <CheckCircle className="w-4 h-4 text-[#0ea5e9] flex-shrink-0" />
                      <span className="text-slate-300 text-sm">{t}</span>
                    </div>
                  ))}
                </div>
                {/* Mini diagram: protected path */}
                <svg viewBox="0 0 400 60" fill="none" className="w-full" aria-hidden="true">
                  <rect x="10" y="15" width="50" height="30" rx="6" fill="rgba(255,255,255,0.04)" stroke="rgba(255,255,255,0.12)" />
                  <text x="35" y="33" textAnchor="middle" fill="rgba(255,255,255,0.4)" fontSize="7" fontFamily="monospace">Src</text>
                  <rect x="70" y="12" width="50" height="36" rx="6" fill="rgba(14,165,233,0.08)" stroke="rgba(14,165,233,0.3)" />
                  <text x="95" y="33" textAnchor="middle" fill="rgba(14,165,233,0.7)" fontSize="6" fontFamily="monospace" fontWeight="700">QH</text>
                  <line x1="120" y1="30" x2="280" y2="30" stroke="rgba(14,165,233,0.4)" strokeWidth="2" strokeDasharray="4 3" className="anim-flow-dash" />
                  <text x="200" y="20" textAnchor="middle" fill="rgba(14,165,233,0.4)" fontSize="7" fontFamily="monospace" letterSpacing="2">PROTECTED</text>
                  <rect x="280" y="12" width="50" height="36" rx="6" fill="rgba(14,165,233,0.08)" stroke="rgba(14,165,233,0.3)" />
                  <text x="305" y="33" textAnchor="middle" fill="rgba(14,165,233,0.7)" fontSize="6" fontFamily="monospace" fontWeight="700">QH</text>
                  <rect x="340" y="15" width="50" height="30" rx="6" fill="rgba(255,255,255,0.04)" stroke="rgba(255,255,255,0.12)" />
                  <text x="365" y="33" textAnchor="middle" fill="rgba(255,255,255,0.4)" fontSize="7" fontFamily="monospace">Dest</text>
                </svg>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Traffic Flow Steps */}
      <section className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <div className="text-center max-w-2xl mx-auto mb-10">
              <SectionLabel label="Traffic Flow" />
              <h2 className="text-3xl md:text-4xl text-white font-semibold tracking-tight mb-3">
                Six steps. Fully transparent.
              </h2>
            </div>
          </FadeIn>
          <div className="space-y-3 max-w-3xl mx-auto">
            {[
              { step: "01", text: "Traffic originates from internal system.", highlight: false },
              { step: "02", text: "Reaches QuantumHalon gateway at source boundary.", highlight: true },
              { step: "03", text: "Stronger cryptographic protection applied.", highlight: true },
              { step: "04", text: "Protected traffic traverses the network.", highlight: false },
              { step: "05", text: "Arrives at destination QuantumHalon gateway.", highlight: true },
              { step: "06", text: "Delivered to internal system unchanged.", highlight: false },
            ].map((s, i) => (
              <FadeIn key={i} delay={i * 0.06}>
                <div className={`flex items-center gap-4 p-4 rounded-xl ${s.highlight ? "glass-panel border-l-2 border-l-[#0ea5e9]/50" : "glass-panel"}`}>
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 text-xs font-mono font-bold ${s.highlight ? "bg-[#0ea5e9]/15 text-[#0ea5e9] border border-[#0ea5e9]/30" : "bg-white/5 text-white/40 border border-white/10"}`}>
                    {s.step}
                  </div>
                  <span className="text-slate-300 text-sm">{s.text}</span>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Full Architecture Diagram */}
      <section className="py-16 lg:py-24 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <div className="text-center max-w-2xl mx-auto mb-8">
              <SectionLabel label="Full Architecture" />
              <h2 className="text-3xl md:text-4xl text-white font-semibold tracking-tight">
                The complete gateway flow.
              </h2>
            </div>
          </FadeIn>
          <FadeIn delay={0.1}>
            <HeroArchitecture />
          </FadeIn>
        </div>
      </section>

      {/* Policy Control */}
      <section className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <div className="text-center max-w-2xl mx-auto mb-10">
              <SectionLabel label="Policy Control" />
              <h2 className="text-3xl md:text-4xl text-white font-semibold tracking-tight mb-3">
                Protection is policy-driven and path-specific.
              </h2>
            </div>
          </FadeIn>
          <div className="grid md:grid-cols-3 gap-5 max-w-4xl mx-auto">
            {[
              { tier: "Standard Paths", method: "Classical", border: "border-white/10", text: "text-white/50" },
              { tier: "Sensitive Paths", method: "Hybrid (Classical + PQC)", border: "border-[#38bdf8]/30", text: "text-[#38bdf8]" },
              { tier: "Critical Paths", method: "Full PQC", border: "border-[#0ea5e9]/40", text: "text-[#0ea5e9]" },
            ].map((t, i) => (
              <FadeIn key={i} delay={i * 0.1}>
                <div className={`glass-panel glass-interactive rounded-xl p-5 text-center ${t.border}`}>
                  <div className={`text-xs font-mono font-bold uppercase tracking-widest mb-2 ${t.text}`}>{t.tier}</div>
                  <div className="text-white font-medium text-base">{t.method}</div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Practical Design strip */}
      <section className="py-12 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
            {["No app changes", "No endpoint agents", "No protocol redesign", "Reversible", "Governed"].map((item, i) => (
              <FadeIn key={i} delay={i * 0.05}>
                <div className="p-3 glass-panel rounded-xl text-center">
                  <span className="text-xs font-medium text-slate-300">{item}</span>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-28 lg:py-36 relative overflow-hidden border-t border-white/5">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-md h-80 bg-white/[0.04] rounded-full blur-[120px] pointer-events-none" />
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <FadeIn>
            <h2 className="text-4xl md:text-5xl text-white font-semibold tracking-tight mb-4">See the architecture in action.</h2>
            <p className="text-lg text-slate-400 mb-8">Book a technical walkthrough for your environment.</p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <CTAButton href="/contact">Book a Demo</CTAButton>
              <CTAButton href="/product" variant="secondary">Explore QuantumHalon</CTAButton>
            </div>
          </FadeIn>
        </div>
      </section>
    </div>
  );
}
