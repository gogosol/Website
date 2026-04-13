"use client";
import React from "react";
import { motion } from "framer-motion";
import {
  Network,
  Server,
  Shield,
  GitBranch,
  Settings,
  RefreshCw,
  ArrowRight,
  CheckCircle,
  Layers,
} from "lucide-react";
import SectionLabel from "@/components/SectionLabel";
import CTAButton from "@/components/CTAButton";

function FadeIn({
  children,
  className = "",
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.55, delay, ease: [0.25, 0.1, 0.25, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export default function HowItWorksPage() {
  return (
    <div className="min-h-screen bg-transparent selection:bg-white/30">
      {/* Hero */}
      <section className="relative pt-32 pb-20 lg:pt-44 lg:pb-28 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-glow-orb w-[800px] h-[800px] bg-white top-[-200px] right-[-300px] opacity-10 hidden md:block" />
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl relative z-10"
        >
          <SectionLabel label="Architecture" />
          <h1 className="text-4xl lg:text-6xl font-bold tracking-tight text-white mb-6 leading-[1.1]">
            A practical architecture for{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-slate-400">
              enterprise cryptographic protection.
            </span>
          </h1>
          <p className="text-lg lg:text-xl text-slate-300 max-w-2xl leading-relaxed font-light">
            QuantumHalon&apos;s gateway model is designed for one thing:
            protecting traffic in a way that is deployable now, adaptable over
            time, and compatible with what you already run.
          </p>
        </motion.div>
      </section>

      {/* Where the gateway sits */}
      <section className="py-24 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <SectionLabel label="Positioning" />
            <h2 className="text-3xl md:text-5xl text-white font-semibold tracking-tight mb-6 max-w-3xl">
              Deployed at the boundary. Invisible to internal systems.
            </h2>
            <p className="text-slate-300 text-lg leading-relaxed max-w-2xl mb-16">
              QuantumHalon gateways are positioned at network boundaries —
              between sites, between segments, or between your environment and
              external networks. Applications, databases, and services behind the
              gateway do not need modification.
            </p>
          </FadeIn>

          <FadeIn>
            <div className="glass-panel rounded-2xl p-8 lg:p-12">
              <div className="grid lg:grid-cols-2 gap-12">
                {/* Before */}
                <div>
                  <div className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-4">
                    Without QuantumHalon
                  </div>
                  <div className="space-y-3">
                    {[
                      "Traffic traverses network with standard protection",
                      "Vulnerable to future decryption",
                      "No visibility into crypto exposure",
                      "Upgrade requires touching every system",
                    ].map((t, i) => (
                      <div
                        key={i}
                        className="flex items-center gap-3 p-3 rounded-lg bg-white/5 border border-white/5"
                      >
                        <div className="w-2 h-2 rounded-full bg-slate-500 flex-shrink-0" />
                        <span className="text-slate-400 text-sm">{t}</span>
                      </div>
                    ))}
                  </div>
                </div>
                {/* After */}
                <div>
                  <div className="text-xs font-bold text-[#0ea5e9] uppercase tracking-widest mb-4">
                    With QuantumHalon
                  </div>
                  <div className="space-y-3">
                    {[
                      "Gateway applies stronger protection at the boundary",
                      "Reduced Harvest Now, Decrypt Later exposure",
                      "Crypto-agile protection adapts over time",
                      "Internal systems remain unchanged",
                    ].map((t, i) => (
                      <div
                        key={i}
                        className="flex items-center gap-3 p-3 rounded-lg bg-[#0ea5e9]/5 border border-[#0ea5e9]/20"
                      >
                        <CheckCircle className="w-4 h-4 text-[#0ea5e9] flex-shrink-0" />
                        <span className="text-slate-300 text-sm">{t}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Traffic flow */}
      <section className="py-24 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <SectionLabel label="Traffic Flow" />
            <h2 className="text-3xl md:text-5xl text-white font-semibold tracking-tight mb-6 max-w-3xl">
              Traffic flows through. Protection is applied at the gateway.
            </h2>
            <p className="text-slate-300 text-lg leading-relaxed max-w-2xl mb-16">
              At no point does the source or destination system need to be aware
              of the cryptographic upgrade. The gateway pair handles all
              protection transparently.
            </p>
          </FadeIn>

          <div className="space-y-4">
            {[
              {
                step: "01",
                text: "Traffic originates from an internal system toward a remote destination.",
              },
              {
                step: "02",
                text: "Traffic reaches the QuantumHalon gateway at the source boundary.",
              },
              {
                step: "03",
                text: "The gateway applies cryptographic protection based on the configured policy (classical, hybrid, or post-quantum).",
                highlight: true,
              },
              {
                step: "04",
                text: "Protected traffic traverses the network.",
              },
              {
                step: "05",
                text: "Traffic arrives at the destination QuantumHalon gateway.",
              },
              {
                step: "06",
                text: "The destination gateway decrypts the traffic and delivers it to the internal system.",
                highlight: true,
              },
            ].map((s, i) => (
              <FadeIn key={i} delay={i * 0.06}>
                <div
                  className={`flex items-start gap-4 p-5 rounded-xl ${
                    s.highlight
                      ? "glass-panel border-l-2 border-l-[#0ea5e9]/50"
                      : "glass-panel"
                  }`}
                >
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 text-xs font-mono font-bold ${
                      s.highlight
                        ? "bg-[#0ea5e9]/20 text-[#0ea5e9] border border-[#0ea5e9]/40"
                        : "bg-white/5 text-white/60 border border-white/10"
                    }`}
                  >
                    {s.step}
                  </div>
                  <p className="text-slate-300 text-sm leading-relaxed pt-2.5">
                    {s.text}
                  </p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Policy-driven protection */}
      <section className="py-24 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <SectionLabel label="Policy Control" />
            <h2 className="text-3xl md:text-5xl text-white font-semibold tracking-tight mb-6 max-w-3xl">
              Cryptographic protection is policy-driven and path-specific.
            </h2>
            <p className="text-slate-300 text-lg leading-relaxed max-w-2xl mb-16">
              QuantumHalon does not apply a single blanket method to all traffic.
              Protection is configured per path, per segment, or per policy —
              giving organizations precise control.
            </p>
          </FadeIn>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                label: "Low-risk paths",
                method: "Classical protection",
                desc: "High-throughput paths with standard sensitivity levels.",
              },
              {
                label: "Sensitive paths",
                method: "Hybrid (Classical + PQC)",
                desc: "Transition-phase protection for regulated or high-value paths.",
              },
              {
                label: "Highest-risk paths",
                method: "Full PQC",
                desc: "Maximum protection for paths carrying long-lived sensitive data.",
              },
            ].map((tier, i) => (
              <FadeIn key={i} delay={i * 0.1}>
                <div className="p-6 glass-panel glass-interactive rounded-xl group h-full">
                  <div className="text-xs font-bold text-[#0ea5e9] uppercase tracking-widest mb-3">
                    {tier.label}
                  </div>
                  <h3 className="text-white font-medium text-lg mb-2">
                    {tier.method}
                  </h3>
                  <p className="text-slate-400 text-sm leading-relaxed">
                    {tier.desc}
                  </p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Incremental deployment */}
      <section className="py-24 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div>
                <SectionLabel label="Incremental Deployment" />
                <h2 className="text-3xl md:text-5xl text-white font-semibold tracking-tight mb-6">
                  Deploy where it matters first. Expand when ready.
                </h2>
                <p className="text-slate-300 text-lg leading-relaxed mb-8">
                  QuantumHalon does not require organization-wide deployment on
                  day one. Start with the most sensitive traffic paths and add
                  gateways as your transition plan progresses.
                </p>
                <CTAButton href="/use-cases" variant="secondary">
                  See use cases
                </CTAButton>
              </div>
              <div className="space-y-4 relative">
                <div className="absolute left-5 top-0 bottom-0 w-px bg-gradient-to-b from-[#0ea5e9]/40 via-[#0ea5e9]/20 to-transparent hidden md:block" />
                {[
                  {
                    title: "Day 1",
                    desc: "Protect your most sensitive inter-site traffic paths.",
                  },
                  {
                    title: "Month 3",
                    desc: "Expand to branch-to-datacenter connectivity.",
                  },
                  {
                    title: "Month 6",
                    desc: "Add cloud ingress/egress protection.",
                  },
                  {
                    title: "Month 12+",
                    desc: "Full coverage across critical infrastructure.",
                  },
                ].map((t, i) => (
                  <div
                    key={i}
                    className="flex items-start gap-4 pl-2 md:pl-0"
                  >
                    <div className="w-10 h-10 rounded-full bg-[#0ea5e9]/20 border border-[#0ea5e9]/30 flex items-center justify-center flex-shrink-0 text-xs font-mono font-bold text-[#0ea5e9] relative z-10">
                      {String(i + 1).padStart(2, "0")}
                    </div>
                    <div className="pt-2">
                      <div className="text-white font-medium text-sm">
                        {t.title}
                      </div>
                      <div className="text-slate-400 text-sm">{t.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Why practical */}
      <section className="py-24 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <SectionLabel label="Practical Design" />
            <h2 className="text-3xl md:text-5xl text-white font-semibold tracking-tight mb-6 max-w-3xl">
              You do not need to redesign everything to protect everything.
            </h2>
            <p className="text-slate-300 text-lg leading-relaxed max-w-2xl mb-16">
              By applying protection at the gateway layer, organizations can
              strengthen cryptographic posture on critical paths without opening
              every application, requalifying every system, or retraining every
              team.
            </p>
          </FadeIn>
          <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-4">
            {[
              {
                title: "No app changes",
                desc: "Internal systems remain untouched.",
              },
              {
                title: "No endpoint agents",
                desc: "Nothing to install on servers or devices.",
              },
              {
                title: "No protocol redesign",
                desc: "Existing protocols continue to work.",
              },
              {
                title: "Reversible",
                desc: "Protection can be adjusted without disruption.",
              },
              {
                title: "Governed",
                desc: "Policy-driven, auditable, change-managed.",
              },
            ].map((p, i) => (
              <FadeIn key={i} delay={i * 0.08}>
                <div className="p-5 glass-panel glass-interactive rounded-xl group h-full text-center">
                  <h3 className="text-white font-medium text-sm mb-1 group-hover:text-[#0ea5e9] transition-colors">
                    {p.title}
                  </h3>
                  <p className="text-slate-400 text-xs leading-relaxed">
                    {p.desc}
                  </p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-32 relative overflow-hidden border-t border-white/5">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-lg h-96 bg-white/5 rounded-full blur-[120px] pointer-events-none" />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <FadeIn>
            <h2 className="text-4xl md:text-6xl text-white font-semibold tracking-tight mb-6">
              Ready to see the architecture in action?
            </h2>
            <p className="text-xl text-slate-400 mb-10 max-w-2xl mx-auto">
              Book a technical walkthrough to see how QuantumHalon deploys in
              your environment.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <CTAButton href="/contact">Book a Demo</CTAButton>
              <CTAButton href="/product" variant="secondary">
                Explore QuantumHalon
              </CTAButton>
            </div>
          </FadeIn>
        </div>
      </section>
    </div>
  );
}
