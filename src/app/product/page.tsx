"use client";
import React from "react";
import { motion } from "framer-motion";
import SectionLabel from "@/components/SectionLabel";
import CTAButton from "@/components/CTAButton";
import HeroArchitecture from "@/components/visuals/HeroArchitecture";
import CryptoAgility from "@/components/visuals/CryptoAgility";
import GhostDashboard from "@/components/visuals/GhostDashboard";
import { UseCaseTopologyGrid } from "@/components/visuals/UseCaseTopology";

function FadeIn({ children, className = "", delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  return (
    <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-60px" }} transition={{ duration: 0.55, delay, ease: [0.25, 0.1, 0.25, 1] }} className={className}>
      {children}
    </motion.div>
  );
}

export default function ProductPage() {
  return (
    <div className="min-h-screen bg-transparent selection:bg-white/30">
      {/* ─── Hero ─── */}
      <section className="relative pt-28 pb-8 lg:pt-40 lg:pb-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-glow-orb w-[800px] h-[800px] bg-white top-[-200px] left-[-300px] opacity-10 hidden md:block" />
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="text-center max-w-3xl mx-auto mb-8 relative z-10">
          <SectionLabel label="QuantumHalon" />
          <h1 className="text-4xl lg:text-6xl font-bold tracking-tight text-white mb-4 leading-[1.1]">
            The Crypto-Agile Gateway for{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-slate-400">Enterprise Traffic Protection</span>
          </h1>
          <p className="text-lg text-slate-400 max-w-xl mx-auto font-light">
            Software that applies stronger cryptographic protection to traffic between environments - and adapts as standards evolve.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center mt-6">
            <CTAButton href="/contact">Book a Demo</CTAButton>
            <CTAButton href="/how-it-works" variant="secondary">See the Architecture</CTAButton>
          </div>
        </motion.div>
      </section>

      {/* ─── Architecture Deep-Dive ─── */}
      <section className="py-16 lg:py-24 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <div className="text-center max-w-2xl mx-auto mb-8">
              <SectionLabel label="Architecture" />
              <h2 className="text-3xl md:text-4xl text-white font-semibold tracking-tight mb-3">
                Gateway-level protection applied where traffic moves.
              </h2>
              <p className="text-slate-400 text-base">
                Deployed at network boundaries. No application changes. No endpoint agents.
              </p>
            </div>
          </FadeIn>
          <FadeIn delay={0.1}>
            <HeroArchitecture />
          </FadeIn>
          {/* Key attributes row */}
          <FadeIn delay={0.2}>
            <div className="grid grid-cols-2 lg:grid-cols-5 gap-3 mt-10">
              {[
                "Gateway deployment",
                "Crypto agility built-in",
                "Hybrid PQC support",
                "Phased rollout",
                "No app changes",
              ].map((attr, i) => (
                <div key={i} className="p-3 glass-panel rounded-xl text-center">
                  <span className="text-xs font-medium text-slate-300">{attr}</span>
                </div>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ─── Crypto Agility ─── */}
      <section className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <FadeIn>
              <SectionLabel label="Crypto Agility" />
              <h2 className="text-3xl md:text-4xl text-white font-semibold tracking-tight mb-3">
                Crypto agility is not a feature.{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-slate-400">
                  It is the architecture.
                </span>
              </h2>
              <p className="text-slate-400 text-base mb-6 max-w-md">
                The cryptographic methods change. The gateway stays the same. Policy-driven, not code-driven.
              </p>
              <div className="space-y-3">
                {[
                  "Swap algorithms without redeploying",
                  "Run hybrid classical + PQC simultaneously",
                  "Adapt when NIST updates standards",
                  "Policy-driven selection per traffic path",
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#0ea5e9]" />
                    <span className="text-sm text-slate-300">{item}</span>
                  </div>
                ))}
              </div>
            </FadeIn>
            <FadeIn delay={0.15}>
              <CryptoAgility />
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ─── Ghost Dashboard ─── */}
      <section className="py-16 lg:py-24 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <div className="text-center max-w-2xl mx-auto mb-10">
              <SectionLabel label="Control Plane" />
              <h2 className="text-3xl md:text-4xl text-white font-semibold tracking-tight mb-3">
                Full visibility into your cryptographic posture.
              </h2>
            </div>
          </FadeIn>
          <FadeIn delay={0.1}>
            <GhostDashboard />
          </FadeIn>
        </div>
      </section>

      {/* ─── Migration Phases ─── */}
      <section className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <div className="text-center max-w-2xl mx-auto mb-12">
              <SectionLabel label="Migration" />
              <h2 className="text-3xl md:text-4xl text-white font-semibold tracking-tight mb-3">
                Transition on your timeline. Not in a crisis.
              </h2>
            </div>
          </FadeIn>
          <div className="grid md:grid-cols-3 gap-5">
            {[
              { phase: "Phase 1", title: "Identify & Protect", desc: "Deploy on highest-risk paths.", color: "#0ea5e9" },
              { phase: "Phase 2", title: "Expand Coverage", desc: "Add gateways as confidence grows.", color: "#38bdf8" },
              { phase: "Phase 3", title: "Full Transition", desc: "Evolve to full PQC readiness.", color: "#22d3ee" },
            ].map((p, i) => (
              <FadeIn key={i} delay={i * 0.1}>
                <div className="glass-panel glass-interactive rounded-xl p-6 group h-full relative overflow-hidden">
                  {/* Progress bar at top */}
                  <div className="absolute top-0 left-0 right-0 h-1 bg-white/5">
                    <div className="h-full" style={{ width: `${(i + 1) * 33.3}%`, backgroundColor: p.color }} />
                  </div>
                  <div className="text-xs font-mono font-bold uppercase tracking-widest mb-2 mt-2" style={{ color: p.color }}>
                    {p.phase}
                  </div>
                  <h3 className="text-white font-medium text-lg mb-1">{p.title}</h3>
                  <p className="text-slate-400 text-sm">{p.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>
          <FadeIn delay={0.3}>
            <p className="text-slate-500 text-xs mt-6 text-center font-mono tracking-wide">
              Each phase is controlled, reversible, and governed.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* ─── Deployment Scenarios ─── */}
      <section className="py-16 lg:py-24 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-10">
              <div>
                <SectionLabel label="Deployment" />
                <h2 className="text-3xl md:text-4xl text-white font-semibold tracking-tight">
                  Deployment scenarios.
                </h2>
              </div>
            </div>
          </FadeIn>
          <UseCaseTopologyGrid />
        </div>
      </section>

      {/* ─── CTA ─── */}
      <section className="py-28 lg:py-36 relative overflow-hidden border-t border-white/5">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-md h-80 bg-white/[0.04] rounded-full blur-[120px] pointer-events-none" />
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <FadeIn>
            <h2 className="text-4xl md:text-5xl text-white font-semibold tracking-tight mb-4">See QuantumHalon in action.</h2>
            <p className="text-lg text-slate-400 mb-8 max-w-xl mx-auto">Book a technical demo to see deployment, crypto-agile transitions, and how it fits your environment.</p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <CTAButton href="/contact">Book a Demo</CTAButton>
              <CTAButton href="/contact" variant="secondary">Discuss Your Strategy</CTAButton>
            </div>
          </FadeIn>
        </div>
      </section>
    </div>
  );
}

