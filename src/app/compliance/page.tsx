"use client";
import React from "react";
import { motion } from "framer-motion";
import { ShieldCheck, CheckCircle } from "lucide-react";
import SectionLabel from "@/components/SectionLabel";
import CTAButton from "@/components/CTAButton";
import ReadinessRoadmap from "@/components/visuals/ReadinessRoadmap";

function FadeIn({ children, className = "", delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  return (
    <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-60px" }} transition={{ duration: 0.55, delay, ease: [0.25, 0.1, 0.25, 1] }} className={className}>
      {children}
    </motion.div>
  );
}

export default function CompliancePage() {
  return (
    <div className="min-h-screen bg-transparent selection:bg-white/30">
      {/* Hero */}
      <section className="relative pt-28 pb-8 lg:pt-40 lg:pb-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-glow-orb w-[800px] h-[800px] bg-white top-[-200px] left-[-300px] opacity-10 hidden md:block" />
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="text-center max-w-3xl mx-auto relative z-10">
          <SectionLabel label="Compliance & Readiness" />
          <h1 className="text-4xl lg:text-6xl font-bold tracking-tight text-white mb-4 leading-[1.1]">
            Cryptographic transition readiness is{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-slate-400">no longer optional.</span>
          </h1>
          <p className="text-lg text-slate-400 max-w-xl mx-auto font-light">
            Regulatory bodies, governance frameworks, and procurement standards increasingly expect a credible cryptographic transition strategy.
          </p>
        </motion.div>
      </section>

      {/* Landscape signals */}
      <section className="py-16 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <div className="text-center max-w-2xl mx-auto mb-8">
              <SectionLabel label="The Landscape" />
              <h2 className="text-3xl md:text-4xl text-white font-semibold tracking-tight">
                The pressure to prepare is real.
              </h2>
            </div>
          </FadeIn>
          <div className="grid md:grid-cols-2 gap-3 max-w-3xl mx-auto">
            {[
              "NIST post-quantum standards published",
              "Government transition mandates emerging",
              "Financial regulators require crypto resilience",
              "Enterprise procurement expects PQ readiness",
            ].map((item, i) => (
              <FadeIn key={i} delay={i * 0.08}>
                <div className="flex items-center gap-3 p-4 glass-panel rounded-xl">
                  <CheckCircle className="w-5 h-5 text-[#0ea5e9] flex-shrink-0" />
                  <span className="text-slate-300 text-sm">{item}</span>
                </div>
              </FadeIn>
            ))}
          </div>
          <FadeIn delay={0.3}>
            <div className="mt-6 p-4 rounded-xl border border-[#0ea5e9]/20 bg-[#0ea5e9]/[0.03] max-w-3xl mx-auto">
              <p className="text-slate-400 text-xs text-center">
                <span className="text-[#0ea5e9] font-bold">Note:</span> QCertify provides tooling and infrastructure that support an organization&apos;s path toward readiness — not compliance certification itself.
              </p>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Readiness Roadmap Visual */}
      <section className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <div className="text-center max-w-2xl mx-auto mb-12">
              <SectionLabel label="Readiness Roadmap" />
              <h2 className="text-3xl md:text-4xl text-white font-semibold tracking-tight mb-3">
                A practical path forward.
              </h2>
              <p className="text-slate-400 text-base">Five phases. Phased, governed, and controlled.</p>
            </div>
          </FadeIn>
          <FadeIn delay={0.1}>
            <ReadinessRoadmap />
          </FadeIn>
        </div>
      </section>

      {/* What QCertify supports */}
      <section className="py-16 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <div className="text-center max-w-2xl mx-auto mb-10">
              <SectionLabel label="How We Help" />
              <h2 className="text-3xl md:text-4xl text-white font-semibold tracking-tight">
                Practical tools for governed transition.
              </h2>
            </div>
          </FadeIn>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { title: "Phased deployment", desc: "Start with high-risk paths first." },
              { title: "Crypto agility", desc: "Demonstrate adaptable protection." },
              { title: "Hybrid operation", desc: "Classical + PQC simultaneously." },
              { title: "Governed rollout", desc: "Audit-ready, change-managed." },
            ].map((c, i) => (
              <FadeIn key={i} delay={i * 0.08}>
                <div className="p-5 glass-panel glass-interactive rounded-xl group h-full text-center">
                  <ShieldCheck className="w-7 h-7 text-white/40 mx-auto mb-3 group-hover:text-[#0ea5e9] transition-colors" />
                  <h3 className="text-white font-medium text-sm mb-1">{c.title}</h3>
                  <p className="text-slate-400 text-xs">{c.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-28 relative overflow-hidden border-t border-white/5">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-md h-80 bg-white/[0.04] rounded-full blur-[120px] pointer-events-none" />
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <FadeIn>
            <h2 className="text-4xl md:text-5xl text-white font-semibold tracking-tight mb-4">Discuss your readiness strategy.</h2>
            <p className="text-lg text-slate-400 mb-8">Let us help you align QuantumHalon with your compliance timeline.</p>
            <CTAButton href="/contact">Talk to QCertify</CTAButton>
          </FadeIn>
        </div>
      </section>
    </div>
  );
}
