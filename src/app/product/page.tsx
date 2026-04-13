"use client";
import React from "react";
import { motion } from "framer-motion";
import {
  Server,
  RefreshCw,
  Layers,
  GitBranch,
  Shield,
  ShieldCheck,
  Zap,
  Eye,
  Network,
  Clock,
  Settings,
  ArrowRight,
} from "lucide-react";
import SectionLabel from "@/components/SectionLabel";
import CTAButton from "@/components/CTAButton";
import type { Metadata } from "next";

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

export default function ProductPage() {
  return (
    <div className="min-h-screen bg-transparent selection:bg-white/30">
      {/* ─── Hero ─── */}
      <section className="relative pt-32 pb-20 lg:pt-44 lg:pb-28 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="bg-glow-orb w-[800px] h-[800px] bg-white top-[-200px] left-[-300px] opacity-10 hidden md:block" />
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl relative z-10"
        >
          <SectionLabel label="QuantumHalon" />
          <h1 className="text-4xl lg:text-6xl font-bold tracking-tight text-white mb-6 leading-[1.1]">
            The Crypto-Agile Gateway for{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-slate-400">
              Enterprise Traffic Protection
            </span>
          </h1>
          <p className="text-lg lg:text-xl text-slate-300 mb-10 max-w-2xl leading-relaxed font-light">
            A software gateway that applies stronger cryptographic protection to
            traffic between environments — and adapts as standards, threats, and
            requirements evolve.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <CTAButton href="/contact">Book a Demo</CTAButton>
            <CTAButton href="/how-it-works" variant="secondary">
              See the Architecture
            </CTAButton>
          </div>
        </motion.div>
      </section>

      {/* ─── Product Overview ─── */}
      <section className="py-24 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <SectionLabel label="Overview" />
            <div className="grid lg:grid-cols-2 gap-16 items-start">
              <div>
                <h2 className="text-3xl md:text-5xl text-white font-semibold tracking-tight mb-6">
                  What QuantumHalon is.
                </h2>
                <p className="text-slate-300 text-lg leading-relaxed mb-6">
                  QuantumHalon is a software-based gateway that sits at network
                  boundaries between your environments. It intercepts traffic,
                  applies advanced cryptographic protection, and forwards it
                  through a secured path to a corresponding gateway at the
                  destination.
                </p>
                <p className="text-slate-400 text-base leading-relaxed mb-6">
                  Unlike traditional approaches that require changes to every
                  application, protocol stack, or endpoint, QuantumHalon operates
                  at the network layer. Existing systems behind the gateway
                  continue to function as they do today.
                </p>
                <p className="text-slate-400 text-base leading-relaxed">
                  QuantumHalon is crypto-agile by design. The cryptographic
                  algorithms and methods it uses can be updated, rotated, or
                  replaced — without changing the gateway architecture,
                  redeploying infrastructure, or disrupting operations.
                </p>
              </div>
              <div className="glass-panel-heavy rounded-2xl p-8 font-mono text-sm space-y-4">
                <div className="flex items-center gap-2 border-b border-white/10 pb-4 mb-4">
                  <Settings className="w-4 h-4 text-white/60" />
                  <span className="text-xs text-slate-400 uppercase tracking-widest">
                    QuantumHalon Configuration
                  </span>
                </div>
                {[
                  { k: "Deployment Model", v: "Gateway Pair" },
                  { k: "Protection Layer", v: "Network Boundary" },
                  { k: "Crypto Engine", v: "Agile / Rotatable" },
                  { k: "Algorithm Support", v: "Classical + Hybrid + PQC" },
                  { k: "App Changes Required", v: "None" },
                  { k: "Endpoint Agents", v: "None" },
                ].map((row, i) => (
                  <div
                    key={i}
                    className="flex justify-between items-center py-2 border-b border-white/5"
                  >
                    <span className="text-slate-400">{row.k}</span>
                    <span className="text-white font-bold">{row.v}</span>
                  </div>
                ))}
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ─── Architecture ─── */}
      <section className="py-24 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <SectionLabel label="Architecture" />
            <h2 className="text-3xl md:text-5xl text-white font-semibold tracking-tight mb-6 max-w-3xl">
              Gateway-level protection, applied where traffic moves.
            </h2>
            <p className="text-slate-300 text-lg leading-relaxed max-w-2xl mb-16">
              QuantumHalon gateways are deployed at the edge of your network
              segments. They do not require changes to internal applications,
              databases, or middleware.
            </p>
          </FadeIn>

          <FadeIn>
            <div className="glass-panel rounded-2xl p-8 lg:p-12">
              <div className="grid grid-cols-1 lg:grid-cols-5 gap-4 items-center">
                {[
                  {
                    label: "Corporate Data Center",
                    sub: "Internal Systems",
                    accent: false,
                  },
                  {
                    label: "QuantumHalon GW",
                    sub: "Stronger crypto applied",
                    accent: true,
                  },
                  {
                    label: "Protected Transit",
                    sub: "Encrypted path",
                    accent: false,
                  },
                  {
                    label: "QuantumHalon GW",
                    sub: "Decryption & delivery",
                    accent: true,
                  },
                  {
                    label: "Remote Data Center",
                    sub: "Internal Systems",
                    accent: false,
                  },
                ].map((node, i) => (
                  <React.Fragment key={i}>
                    <div
                      className={`p-4 rounded-xl text-center ${
                        node.accent
                          ? "bg-[#0ea5e9]/10 border border-[#0ea5e9]/30"
                          : "bg-white/5 border border-white/10"
                      }`}
                    >
                      <div
                        className={`font-medium text-sm mb-1 ${
                          node.accent ? "text-[#0ea5e9]" : "text-white"
                        }`}
                      >
                        {node.label}
                      </div>
                      <div className="text-xs text-slate-400">{node.sub}</div>
                    </div>
                  </React.Fragment>
                ))}
              </div>
              <div className="hidden lg:block mt-4">
                <div className="h-px bg-gradient-to-r from-white/5 via-[#0ea5e9]/30 to-white/5" />
              </div>
              <p className="text-slate-400 text-sm mt-6 text-center">
                Traffic enters the gateway → Stronger protection applied →
                Traverses network securely → Destination gateway delivers to
                internal systems unchanged.
              </p>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ─── Crypto Agility in Practice ─── */}
      <section className="py-24 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <SectionLabel label="Crypto Agility" />
            <h2 className="text-3xl md:text-5xl text-white font-semibold tracking-tight mb-6 max-w-3xl">
              Crypto agility is not a feature.{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-slate-400">
                It is the architecture.
              </span>
            </h2>
            <p className="text-slate-300 text-lg leading-relaxed max-w-2xl mb-16">
              A crypto-agile system is one where the cryptographic methods can be
              changed without changing the system itself. QuantumHalon is built
              this way from the foundation.
            </p>
          </FadeIn>
          <div className="grid md:grid-cols-2 gap-6">
            {[
              {
                icon: RefreshCw,
                title: "Algorithm rotation",
                desc: "Switch from one cryptographic method to another without redeploying the gateway.",
              },
              {
                icon: Layers,
                title: "Hybrid operation",
                desc: "Run classical and post-quantum algorithms simultaneously for compatibility and risk reduction.",
              },
              {
                icon: Settings,
                title: "Policy-driven selection",
                desc: "Define which cryptographic methods are used on which traffic paths through policy, not code changes.",
              },
              {
                icon: ShieldCheck,
                title: "Standards adaptability",
                desc: "As NIST and other bodies finalize, update, or deprecate algorithms, QuantumHalon adapts without architectural disruption.",
              },
            ].map((item, i) => (
              <FadeIn key={i} delay={i * 0.1}>
                <div className="p-6 glass-panel glass-interactive rounded-xl group h-full">
                  <item.icon className="w-8 h-8 text-white/50 mb-4 group-hover:text-[#0ea5e9] group-hover:scale-110 transition-all" />
                  <h3 className="text-white font-medium text-lg mb-2">
                    {item.title}
                  </h3>
                  <p className="text-slate-400 text-sm leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Benefits ─── */}
      <section className="py-24 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <SectionLabel label="Benefits" />
            <h2 className="text-3xl md:text-5xl text-white font-semibold tracking-tight mb-16 max-w-3xl">
              What QuantumHalon delivers.
            </h2>
          </FadeIn>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: Zap,
                title: "Immediate protection",
                desc: "Apply stronger cryptographic protection to sensitive traffic today, before full post-quantum standards are finalized.",
              },
              {
                icon: GitBranch,
                title: "Reduced migration burden",
                desc: "Transition cryptographic protection incrementally, one path at a time, without rearchitecting backend systems.",
              },
              {
                icon: Network,
                title: "Operational simplicity",
                desc: "Gateway deployment means no changes to applications, APIs, or endpoint configurations.",
              },
              {
                icon: Eye,
                title: "HNDL risk reduction",
                desc: "Limit adversary value of captured traffic by applying advanced protection to in-transit data now.",
              },
              {
                icon: RefreshCw,
                title: "Future-proof deployment",
                desc: "When algorithms change — and they will — QuantumHalon adapts. No rip-and-replace.",
              },
              {
                icon: Shield,
                title: "Governance alignment",
                desc: "Support phased transition timelines that align with internal governance and external regulatory expectations.",
              },
            ].map((b, i) => (
              <FadeIn key={i} delay={i * 0.08}>
                <div className="p-6 glass-panel glass-interactive rounded-xl group h-full">
                  <b.icon className="w-8 h-8 text-white/50 mb-4 group-hover:text-[#0ea5e9] group-hover:scale-110 transition-all" />
                  <h3 className="text-white font-medium text-lg mb-2">
                    {b.title}
                  </h3>
                  <p className="text-slate-400 text-sm leading-relaxed">
                    {b.desc}
                  </p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Operational Value ─── */}
      <section className="py-24 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div>
                <SectionLabel label="Operations" />
                <h2 className="text-3xl md:text-5xl text-white font-semibold tracking-tight mb-6">
                  Built for real-world operations, not lab conditions.
                </h2>
                <p className="text-slate-300 text-lg leading-relaxed mb-8">
                  Enterprise cryptographic migration is an operational problem,
                  not just a cryptographic one. QuantumHalon is designed for
                  organizations that must maintain service continuity,
                  change-management discipline, and governance while
                  strengthening protection.
                </p>
              </div>
              <div className="space-y-3">
                {[
                  "Deploys alongside existing networking equipment",
                  "Does not require endpoint agents or client-side changes",
                  "Supports gradual rollout with controlled activation per path",
                  "Operates within existing network management frameworks",
                ].map((item, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-3 p-4 glass-panel rounded-xl"
                  >
                    <div className="w-2 h-2 rounded-full bg-[#0ea5e9] flex-shrink-0" />
                    <span className="text-slate-300 text-sm">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ─── Migration Value ─── */}
      <section className="py-24 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <SectionLabel label="Migration" />
            <h2 className="text-3xl md:text-5xl text-white font-semibold tracking-tight mb-6 max-w-3xl">
              The post-quantum transition will take years.{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-slate-400">
                Start now, on your terms.
              </span>
            </h2>
            <p className="text-slate-300 text-lg leading-relaxed max-w-2xl mb-16">
              Full cryptographic migration across an enterprise is a multi-year
              initiative. QuantumHalon gives organizations a way to begin —
              practically and incrementally.
            </p>
          </FadeIn>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                phase: "Phase 1",
                title: "Identify & Protect",
                desc: "Identify and protect the highest-risk traffic paths with stronger cryptographic methods.",
              },
              {
                phase: "Phase 2",
                title: "Expand Coverage",
                desc: "Expand coverage as hybrid cryptographic methods mature and organizational confidence grows.",
              },
              {
                phase: "Phase 3",
                title: "Full Transition",
                desc: "Transition fully as standards stabilize and organizational readiness reaches maturity.",
              },
            ].map((p, i) => (
              <FadeIn key={i} delay={i * 0.1}>
                <div className="p-6 glass-panel glass-interactive rounded-xl group h-full">
                  <div className="text-xs font-mono font-bold text-[#0ea5e9] mb-3 tracking-widest uppercase">
                    {p.phase}
                  </div>
                  <h3 className="text-white font-medium text-lg mb-2">
                    {p.title}
                  </h3>
                  <p className="text-slate-400 text-sm leading-relaxed">
                    {p.desc}
                  </p>
                </div>
              </FadeIn>
            ))}
          </div>
          <FadeIn>
            <p className="text-slate-500 text-sm mt-8 text-center font-mono">
              Each phase is controlled, reversible, and governed. No
              all-or-nothing decisions.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* ─── Deployment Scenarios ─── */}
      <section className="py-24 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <SectionLabel label="Deployment" />
            <h2 className="text-3xl md:text-5xl text-white font-semibold tracking-tight mb-16 max-w-3xl">
              Deployment scenarios.
            </h2>
          </FadeIn>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                title: "HQ ↔ Remote DC",
                desc: "Protect traffic between primary facilities and geographically distributed data centers.",
              },
              {
                title: "Branch connectivity",
                desc: "Apply gateway-level protection to branch-to-core traffic without upgrading branch infrastructure.",
              },
              {
                title: "Cloud ingress/egress",
                desc: "Strengthen protection for traffic moving between on-premises and cloud providers.",
              },
              {
                title: "Partner & third-party",
                desc: "Harden the cryptographic protection on data exchange paths with external organizations.",
              },
              {
                title: "Regulated segments",
                desc: "Apply enhanced protection to specific segments handling regulated data.",
              },
            ].map((s, i) => (
              <FadeIn key={i} delay={i * 0.08}>
                <div className="p-5 glass-panel glass-interactive rounded-xl group h-full">
                  <h3 className="text-white font-medium text-lg mb-2">
                    {s.title}
                  </h3>
                  <p className="text-slate-400 text-sm leading-relaxed">
                    {s.desc}
                  </p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CTA ─── */}
      <section className="py-32 relative overflow-hidden border-t border-white/5">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-lg h-96 bg-white/5 rounded-full blur-[120px] pointer-events-none" />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <FadeIn>
            <h2 className="text-4xl md:text-6xl text-white font-semibold tracking-tight mb-6">
              See QuantumHalon in action.
            </h2>
            <p className="text-xl text-slate-400 mb-10 max-w-2xl mx-auto">
              Book a technical demonstration to see how QuantumHalon deploys,
              how crypto-agile transitions work in practice, and how your
              organization can start protecting traffic today.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <CTAButton href="/contact">Book a Demo</CTAButton>
              <CTAButton href="/contact" variant="secondary">
                Discuss Your Transition Strategy
              </CTAButton>
            </div>
          </FadeIn>
        </div>
      </section>
    </div>
  );
}
