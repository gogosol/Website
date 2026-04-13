"use client";
import React from "react";
import { motion } from "framer-motion";
import { Target, Shield, GitBranch, RefreshCw } from "lucide-react";
import SectionLabel from "@/components/SectionLabel";
import CTAButton from "@/components/CTAButton";

function FadeIn({ children, className = "", delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  return (
    <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-60px" }} transition={{ duration: 0.55, delay, ease: [0.25, 0.1, 0.25, 1] }} className={className}>
      {children}
    </motion.div>
  );
}

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-transparent selection:bg-white/30">
      {/* Hero */}
      <section className="relative pt-28 pb-12 lg:pt-40 lg:pb-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-glow-orb w-[800px] h-[800px] bg-white top-[-200px] left-[-300px] opacity-10 hidden md:block" />
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="max-w-3xl relative z-10">
          <SectionLabel label="About QCertify" />
          <h1 className="text-4xl lg:text-6xl font-bold tracking-tight text-white mb-6 leading-[1.1]">
            Cryptographic transition is{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-slate-400">too important to leave to chance.</span>
          </h1>
          <p className="text-lg text-slate-400 max-w-xl font-light">
            QCertify was founded to give organizations the tools to protect traffic now and transition cryptographic protection practically, incrementally, and with discipline.
          </p>
        </motion.div>
      </section>

      {/* Convictions — icon-led, minimal text */}
      <section className="py-16 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <SectionLabel label="What We Believe" />
            <h2 className="text-2xl md:text-3xl text-white font-semibold tracking-tight mb-10">Four convictions.</h2>
          </FadeIn>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { icon: Target, title: "Transition is operational", desc: "Not theoretical." },
              { icon: Shield, title: "Protection must be deployable now", desc: "Not after perfect standards." },
              { icon: GitBranch, title: "Migration must be phased", desc: "Not all-or-nothing." },
              { icon: RefreshCw, title: "Crypto agility is required", desc: "Not optional." },
            ].map((b, i) => (
              <FadeIn key={i} delay={i * 0.1}>
                <div className="p-5 glass-panel glass-interactive rounded-xl group h-full text-center">
                  <b.icon className="w-8 h-8 text-white/40 mx-auto mb-3 group-hover:text-[#0ea5e9] group-hover:scale-110 transition-all" />
                  <h3 className="text-white font-medium text-sm mb-1">{b.title}</h3>
                  <p className="text-slate-500 text-xs">{b.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Focus block — visual */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <SectionLabel label="What We Build" />
                <h2 className="text-3xl md:text-4xl text-white font-semibold tracking-tight mb-4">From conviction to product.</h2>
                <p className="text-slate-400 text-base mb-6 max-w-md">
                  QCertify builds QuantumHalon — a crypto-agile gateway for enterprise deployment. We are focused, deliberate, and technical.
                </p>
                <CTAButton href="/product" variant="secondary">Explore QuantumHalon</CTAButton>
              </div>
              <div className="glass-panel-heavy rounded-2xl p-8 text-center">
                <div className="text-xs font-mono text-slate-500 uppercase tracking-widest mb-6">Our Focus</div>
                <div className="space-y-6">
                  <div>
                    <div className="text-5xl font-bold text-white mb-1">1</div>
                    <div className="text-slate-400 text-base">Product — QuantumHalon</div>
                  </div>
                  <div className="h-px bg-white/10" />
                  <div>
                    <div className="text-5xl font-bold text-white mb-1">1</div>
                    <div className="text-slate-400 text-base">Mission — Cryptographic transition</div>
                  </div>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 relative overflow-hidden border-t border-white/5">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <FadeIn>
            <h2 className="text-3xl md:text-4xl text-white font-semibold tracking-tight mb-4">
              The gap between awareness and action is where risk compounds.
            </h2>
            <p className="text-slate-400 mb-8">QCertify closes it — with infrastructure, not presentations.</p>
            <CTAButton href="/contact">Talk to QCertify</CTAButton>
          </FadeIn>
        </div>
      </section>
    </div>
  );
}
