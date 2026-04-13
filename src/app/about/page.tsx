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
      {/* Hero / Mission */}
      <section className="relative pt-32 pb-20 lg:pt-44 lg:pb-28 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-glow-orb w-[800px] h-[800px] bg-white top-[-200px] left-[-300px] opacity-10 hidden md:block" />
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="max-w-3xl relative z-10">
          <SectionLabel label="About QCertify" />
          <h1 className="text-4xl lg:text-6xl font-bold tracking-tight text-white mb-8 leading-[1.1]">
            QCertify exists because cryptographic transition is{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-slate-400">too important to leave to chance.</span>
          </h1>
          <div className="space-y-6">
            <p className="text-lg text-slate-300 leading-relaxed">
              The world&apos;s most sensitive data — financial records, patient information, government communications, critical infrastructure controls — is protected by cryptographic methods that will not withstand the next generation of computing capability.
            </p>
            <p className="text-lg text-slate-300 leading-relaxed">
              This is not a speculative risk. Adversaries are already collecting encrypted data today, waiting for the capability to decrypt it tomorrow. The migration to stronger cryptographic protection must begin now — practically, incrementally, and with enterprise discipline.
            </p>
            <p className="text-lg text-slate-400 leading-relaxed">
              QCertify was founded to give organizations the tools to do exactly that.
            </p>
          </div>
        </motion.div>
      </section>

      {/* What we believe */}
      <section className="py-24 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <SectionLabel label="Our Convictions" />
            <h2 className="text-3xl md:text-5xl text-white font-semibold tracking-tight mb-16 max-w-3xl">
              What we believe.
            </h2>
          </FadeIn>
          <div className="grid md:grid-cols-2 gap-6">
            {[
              {
                icon: Target,
                title: "Transition is operational, not theoretical.",
                desc: "Post-quantum readiness is not an algorithm choice. It is a multi-year infrastructure initiative that must integrate with real-world operations.",
              },
              {
                icon: Shield,
                title: "Protection must be deployable now.",
                desc: "Organizations cannot wait for perfect standards. They need practical protection today that adapts as standards evolve.",
              },
              {
                icon: GitBranch,
                title: "Migration must be phased and controlled.",
                desc: "All-or-nothing upgrades fail in enterprise environments. Cryptographic transition must be incremental, governed, and reversible.",
              },
              {
                icon: RefreshCw,
                title: "Crypto agility is a requirement, not a luxury.",
                desc: "Locking into any single cryptographic approach guarantees another painful migration later. Systems must be built to evolve.",
              },
            ].map((belief, i) => (
              <FadeIn key={i} delay={i * 0.1}>
                <div className="p-6 glass-panel glass-interactive rounded-xl group h-full">
                  <belief.icon className="w-8 h-8 text-white/50 mb-4 group-hover:text-[#0ea5e9] group-hover:scale-110 transition-all" />
                  <h3 className="text-white font-medium text-lg mb-2">{belief.title}</h3>
                  <p className="text-slate-400 text-sm leading-relaxed">{belief.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* What we build */}
      <section className="py-24 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div>
                <SectionLabel label="What We Build" />
                <h2 className="text-3xl md:text-5xl text-white font-semibold tracking-tight mb-6">
                  From conviction to product.
                </h2>
                <p className="text-slate-300 text-lg leading-relaxed mb-6">
                  QCertify builds QuantumHalon — a crypto-agile gateway software designed for enterprise deployment. QuantumHalon protects traffic between environments, supports phased post-quantum migration, and gives organizations the ability to adapt their cryptographic protection as the landscape evolves.
                </p>
                <p className="text-slate-400 text-base leading-relaxed mb-8">
                  We are focused, deliberate, and technical. We build for the organizations where getting this wrong has real consequences.
                </p>
                <CTAButton href="/product" variant="secondary">
                  Explore QuantumHalon
                </CTAButton>
              </div>
              <div className="glass-panel-heavy rounded-2xl p-8 border-t border-white/20">
                <div className="space-y-6 text-center">
                  <div className="text-xs font-bold text-slate-500 uppercase tracking-widest">Our Focus</div>
                  <div className="text-4xl font-bold text-white">1 Product</div>
                  <div className="text-slate-400 text-lg">QuantumHalon</div>
                  <div className="h-px bg-white/10" />
                  <div className="text-4xl font-bold text-white">1 Mission</div>
                  <div className="text-slate-400 text-lg">Enterprise cryptographic transition</div>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* The Gap */}
      <section className="py-24 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <div className="max-w-3xl mx-auto text-center">
              <SectionLabel label="The Problem We See" />
              <h2 className="text-3xl md:text-5xl text-white font-semibold tracking-tight mb-6">
                The gap between awareness and action.
              </h2>
              <p className="text-slate-300 text-lg leading-relaxed mb-6">
                Most enterprises understand that post-quantum transition is coming. Far fewer have a concrete plan, a deployable tool, or a phased approach to get there. The gap between awareness and action is where risk compounds.
              </p>
              <p className="text-slate-400 text-base leading-relaxed mb-10">
                QCertify is built to close that gap — with infrastructure, not with presentations.
              </p>
              <CTAButton href="/contact">Talk to QCertify</CTAButton>
            </div>
          </FadeIn>
        </div>
      </section>
    </div>
  );
}
