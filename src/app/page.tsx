"use client";
import React from "react";
import { motion } from "framer-motion";
import {
  Shield,
  Eye,
  Layers,
  Clock,
  RefreshCw,
  ArrowRight,
  Zap,
  Building2,
  Heart,
  Landmark,
  Factory,
  Briefcase,
  ShieldCheck,
  Server,
  Target,
  GitBranch,
  Network,
  Lock,
  CheckCircle,
} from "lucide-react";
import Link from "next/link";
import SectionLabel from "@/components/SectionLabel";
import CTAButton from "@/components/CTAButton";

/* ─── Fade-in wrapper ─── */
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

/* ═══════════════════════════════════════════════════════════
   SECTION A — Hero
   ═══════════════════════════════════════════════════════════ */
function HeroSection() {
  return (
    <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="bg-glow-orb w-[800px] h-[800px] bg-white top-[-200px] left-[-300px] opacity-10 hidden md:block" />
      <div className="bg-glow-orb w-[600px] h-[600px] bg-white bottom-[-100px] right-[-200px] opacity-[0.05]" />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <SectionLabel label="Post-Quantum Transition" />
          <h1 className="text-5xl lg:text-7xl font-bold tracking-tight text-white mb-6 leading-[1.08]">
            Enterprise Cryptographic Protection{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-slate-400">
              for the Post-Quantum Era.
            </span>
          </h1>
          <p className="text-lg lg:text-xl text-slate-300 mb-10 max-w-xl leading-relaxed font-light">
            QCertify&apos;s QuantumHalon is a crypto-agile gateway that protects
            traffic today and enables phased transition to stronger cryptographic
            protection — without ripping out what you already run.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <CTAButton href="/contact">Book a Demo</CTAButton>
            <CTAButton href="/how-it-works" variant="secondary">
              See How It Works
            </CTAButton>
          </div>
        </motion.div>

        {/* Architecture Visual */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="relative lg:h-[520px] w-full rounded-2xl glass-panel-heavy flex flex-col p-6 lg:p-8"
        >
          <div className="absolute inset-0 rounded-2xl border border-white/20 pointer-events-none" />

          <div className="flex items-center gap-2 border-b border-white/10 pb-4 mb-6">
            <div className="w-3 h-3 rounded-full bg-slate-500/80" />
            <div className="w-3 h-3 rounded-full bg-slate-400/80" />
            <div className="w-3 h-3 rounded-full bg-slate-300/80" />
            <span className="ml-3 text-xs font-mono text-slate-400 px-2 py-0.5 uppercase tracking-widest opacity-80 border border-white/5 rounded">
              quantumhalon_gateway
            </span>
          </div>

          <div className="flex-1 space-y-5 font-mono text-sm z-10 relative">
            <div className="p-5 glass-panel glass-interactive rounded-xl flex justify-between items-center group">
              <span className="text-slate-300 uppercase tracking-widest text-xs group-hover:text-[#0ea5e9] transition-colors">
                Crypto-Agile Engine
              </span>
              <span className="text-white font-bold">Active</span>
            </div>
            <div className="p-5 glass-panel glass-interactive rounded-xl flex flex-col group">
              <div className="flex justify-between items-center mb-3">
                <span className="text-slate-400 text-xs tracking-widest uppercase">
                  Protected Traffic Paths
                </span>
                <span className="text-white text-xs font-bold">12 / 12</span>
              </div>
              <div className="w-full h-2 bg-black rounded-full overflow-hidden border border-white/10">
                <div className="h-full bg-gradient-to-r from-slate-400 to-white w-full shadow-[0_0_10px_rgba(255,255,255,0.5)] relative">
                  <div className="absolute right-0 top-0 bottom-0 w-4 bg-white/50" />
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-5">
              <div className="p-5 glass-panel rounded-xl border-t border-t-white/30 shadow-xl relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-24 h-24 bg-white opacity-5 group-hover:opacity-10 transition-opacity blur-2xl rounded-full" />
                <div className="text-slate-400 text-[10px] uppercase tracking-widest mb-2 z-10 relative">
                  Algorithm Mode
                </div>
                <div className="text-white text-lg font-light tracking-tight z-10 relative">
                  Hybrid PQC
                </div>
              </div>
              <div className="p-5 glass-panel rounded-xl border-l-2 border-l-white/50 shadow-xl relative overflow-hidden group">
                <div className="absolute bottom-0 left-0 w-24 h-24 bg-white opacity-5 group-hover:opacity-10 transition-opacity blur-2xl rounded-full" />
                <div className="text-slate-400 text-[10px] uppercase tracking-widest mb-2 z-10 relative">
                  Gateway Pairs
                </div>
                <div className="text-white text-lg font-light tracking-tight z-10 relative">
                  6 Active
                </div>
              </div>
            </div>
            <div className="p-4 glass-panel rounded-xl flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-slate-300 text-xs tracking-wide">
                All gateways operational · Last rotation: 2 min ago
              </span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════
   SECTION B — The Problem Now
   ═══════════════════════════════════════════════════════════ */
function ProblemSection() {
  const challenges = [
    {
      icon: Eye,
      title: "Harvest Now, Decrypt Later",
      desc: "Adversaries are capturing encrypted traffic today, banking on future decryption capabilities. Long-lived sensitive data is already at risk.",
    },
    {
      icon: Target,
      title: "Cryptographic blind spots",
      desc: "Most organizations do not have full visibility into where vulnerable cryptography exists across their environments.",
    },
    {
      icon: Layers,
      title: "Migration complexity",
      desc: "Replacing cryptographic protection across production systems is slow, disruptive, and operationally dangerous without the right approach.",
    },
    {
      icon: Clock,
      title: "Compliance pressure",
      desc: "Regulatory bodies and industry standards are moving. Organizations that wait will face compressed timelines and reactive upgrades.",
    },
  ];

  return (
    <section className="py-24 relative overflow-hidden border-t border-white/5">
      <div className="bg-glow-orb w-[500px] h-[500px] bg-white top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-[0.03]" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <FadeIn>
          <SectionLabel label="The Challenge" />
          <div className="max-w-3xl mb-16">
            <h2 className="text-3xl md:text-5xl text-white font-semibold tracking-tight mb-6 leading-tight">
              The threat to your encrypted traffic is not a future problem.{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-slate-400">
                It is a present one.
              </span>
            </h2>
            <p className="text-slate-300 text-lg leading-relaxed">
              Encrypted traffic captured today can be decrypted when
              quantum-capable systems mature. But the risk is not only about
              quantum computing. Organizations face growing regulatory
              expectations, increasing scrutiny of cryptographic foundations, and
              the operational complexity of transitioning protection across
              distributed environments.
            </p>
          </div>
        </FadeIn>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {challenges.map((c, i) => (
            <FadeIn key={i} delay={i * 0.1}>
              <div className="p-6 glass-panel glass-interactive rounded-xl group h-full">
                <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center mb-4 border border-white/10 group-hover:border-[#0ea5e9]/50 group-hover:bg-[#0ea5e9]/10 group-hover:shadow-[0_0_15px_rgba(14,165,233,0.3)] transition-all">
                  <c.icon className="w-5 h-5 text-white/80 group-hover:text-[#0ea5e9] transition-colors" />
                </div>
                <h3 className="text-white font-medium text-lg mb-2">
                  {c.title}
                </h3>
                <p className="text-slate-400 text-sm leading-relaxed">
                  {c.desc}
                </p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════
   SECTION C — What QCertify Does
   ═══════════════════════════════════════════════════════════ */
function CompanySection() {
  return (
    <section className="py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <FadeIn>
          <SectionLabel label="The Company" />
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl md:text-5xl text-white font-semibold tracking-tight mb-6 leading-tight">
                QCertify builds the infrastructure for enterprise cryptographic
                transition.
              </h2>
              <p className="text-slate-300 text-lg leading-relaxed mb-6">
                QCertify is an enterprise cryptographic protection company. We
                build software that helps organizations protect traffic, gain
                control over their cryptographic posture, and transition to
                stronger protection in a phased, practical way.
              </p>
              <p className="text-slate-400 text-base leading-relaxed">
                Our approach is built on one principle: cryptographic transition
                must be controlled, incremental, and compatible with reality.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[
                { label: "Gateway Software", icon: Server },
                { label: "Crypto-Agile", icon: RefreshCw },
                { label: "Enterprise-Grade", icon: Building2 },
                { label: "Phased Migration", icon: GitBranch },
              ].map((item, i) => (
                <div
                  key={i}
                  className="p-6 glass-panel glass-interactive rounded-xl group text-center"
                >
                  <item.icon className="w-8 h-8 text-white/60 mx-auto mb-3 group-hover:text-[#0ea5e9] group-hover:scale-110 transition-all" />
                  <span className="text-sm font-medium text-slate-300 group-hover:text-white transition-colors">
                    {item.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════
   SECTION D — What QuantumHalon Is
   ═══════════════════════════════════════════════════════════ */
function ProductSection() {
  const attributes = [
    {
      icon: Server,
      label: "Gateway deployment",
      desc: "Sits in front of existing infrastructure. No application changes required.",
    },
    {
      icon: RefreshCw,
      label: "Crypto agility",
      desc: "Change cryptographic protection methods without re-architecture.",
    },
    {
      icon: Layers,
      label: "Hybrid support",
      desc: "Run classical and post-quantum protection simultaneously during transition.",
    },
    {
      icon: GitBranch,
      label: "Phased rollout",
      desc: "Deploy incrementally — start with the most sensitive paths first.",
    },
    {
      icon: Shield,
      label: "Traffic protection",
      desc: "Protects data in motion between sites, branches, and environments.",
    },
  ];

  return (
    <section className="py-24 relative overflow-hidden border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <FadeIn>
          <SectionLabel label="The Product" />
          <div className="max-w-3xl mb-16">
            <h2 className="text-3xl md:text-5xl text-white font-semibold tracking-tight mb-6 leading-tight">
              QuantumHalon:{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-slate-400">
                Crypto-Agile Gateway Software
              </span>
            </h2>
            <p className="text-slate-300 text-lg leading-relaxed mb-4">
              QuantumHalon is QCertify&apos;s enterprise gateway product. It
              sits at the network layer, applying stronger cryptographic
              protection to traffic as it moves between environments — without
              requiring changes to the applications or systems behind it.
            </p>
            <p className="text-slate-400 text-base leading-relaxed">
              It is designed to be crypto-agile: the cryptographic methods it
              uses can evolve over time as standards, algorithms, and
              organizational requirements change.
            </p>
          </div>
        </FadeIn>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5">
          {attributes.map((attr, i) => (
            <FadeIn key={i} delay={i * 0.08}>
              <div className="p-5 glass-panel glass-interactive rounded-xl group h-full">
                <attr.icon className="w-7 h-7 text-white/60 mb-3 group-hover:text-[#0ea5e9] group-hover:scale-110 transition-all" />
                <h3 className="text-white font-medium text-sm mb-1">
                  {attr.label}
                </h3>
                <p className="text-slate-400 text-xs leading-relaxed">
                  {attr.desc}
                </p>
              </div>
            </FadeIn>
          ))}
        </div>
        <FadeIn>
          <div className="mt-10">
            <CTAButton href="/product" variant="secondary">
              Explore QuantumHalon
            </CTAButton>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════
   SECTION E — How It Works (Summary)
   ═══════════════════════════════════════════════════════════ */
function HowItWorksSection() {
  const steps = [
    { label: "Source Network", sub: "Internal systems" },
    { label: "QuantumHalon Gateway", sub: "Protection applied", highlight: true },
    { label: "Protected Path", sub: "Encrypted transit" },
    { label: "QuantumHalon Gateway", sub: "Traffic delivered", highlight: true },
    { label: "Destination Network", sub: "Internal systems" },
  ];

  return (
    <section className="py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <FadeIn>
          <SectionLabel label="Architecture" />
          <h2 className="text-3xl md:text-5xl text-white font-semibold tracking-tight mb-6 leading-tight max-w-3xl">
            Protection that sits in front of what you already run.
          </h2>
          <p className="text-slate-300 text-lg leading-relaxed max-w-2xl mb-16">
            QuantumHalon gateways are deployed at network boundaries. Traffic
            passes through the gateway, where stronger cryptographic protection
            is applied before it traverses the network.
          </p>
        </FadeIn>
        <FadeIn>
          <div className="relative">
            {/* Connection lines */}
            <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-px bg-gradient-to-r from-white/5 via-white/20 to-white/5 -translate-y-1/2 z-0" />
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-4 relative z-10">
              {steps.map((step, i) => (
                <div
                  key={i}
                  className={`p-5 rounded-xl text-center ${
                    step.highlight
                      ? "glass-panel-heavy border-[#0ea5e9]/30"
                      : "glass-panel"
                  }`}
                >
                  <div
                    className={`w-10 h-10 rounded-full mx-auto mb-3 flex items-center justify-center text-xs font-bold ${
                      step.highlight
                        ? "bg-[#0ea5e9]/20 text-[#0ea5e9] border border-[#0ea5e9]/40"
                        : "bg-white/5 text-white/60 border border-white/10"
                    }`}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </div>
                  <h3
                    className={`font-medium text-sm mb-1 ${
                      step.highlight ? "text-[#0ea5e9]" : "text-white"
                    }`}
                  >
                    {step.label}
                  </h3>
                  <p className="text-slate-400 text-xs">{step.sub}</p>
                </div>
              ))}
            </div>
          </div>
        </FadeIn>
        <FadeIn>
          <div className="mt-10 text-center lg:text-left">
            <CTAButton href="/how-it-works" variant="secondary">
              See the full architecture
            </CTAButton>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════
   SECTION F — Why Crypto Agility Matters
   ═══════════════════════════════════════════════════════════ */
function CryptoAgilitySection() {
  return (
    <section className="py-24 relative overflow-hidden border-y border-white/5">
      <div className="bg-glow-orb w-[700px] h-[700px] bg-[#0ea5e9] top-0 right-[-300px] opacity-[0.04]" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <FadeIn>
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <SectionLabel label="Crypto Agility" />
              <h2 className="text-3xl md:text-5xl text-white font-semibold tracking-tight mb-6 leading-tight">
                Algorithms change. Standards evolve.{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-slate-400">
                  Your protection layer should keep pace.
                </span>
              </h2>
              <p className="text-slate-300 text-lg leading-relaxed mb-6">
                Post-quantum cryptography is not a one-time upgrade. Standards
                are still evolving. New algorithms will be approved, deprecated,
                and replaced over the coming years.
              </p>
              <p className="text-slate-400 text-base leading-relaxed mb-8">
                Crypto agility means your protection layer can adapt — swapping
                cryptographic methods without redesigning your deployment,
                recertifying infrastructure, or disrupting operations.
                QuantumHalon is built for this.
              </p>
              <CTAButton href="/product" variant="secondary">
                Learn more
              </CTAButton>
            </div>
            <div className="space-y-4">
              {[
                {
                  year: "Today",
                  algo: "Classical + Hybrid",
                  status: "Protected",
                },
                {
                  year: "Phase 2",
                  algo: "Hybrid PQC",
                  status: "Transitioning",
                },
                {
                  year: "Phase 3",
                  algo: "Full PQC",
                  status: "Future-Ready",
                },
              ].map((phase, i) => (
                <div
                  key={i}
                  className="p-5 glass-panel glass-interactive rounded-xl flex items-center justify-between group"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-xs font-mono font-bold text-white/60 group-hover:border-[#0ea5e9]/40 group-hover:text-[#0ea5e9] transition-all">
                      {phase.year.slice(0, 2).toUpperCase()}
                    </div>
                    <div>
                      <div className="text-white font-medium text-sm">
                        {phase.year}
                      </div>
                      <div className="text-slate-400 text-xs">{phase.algo}</div>
                    </div>
                  </div>
                  <span className="text-xs font-mono text-slate-300 px-3 py-1 rounded-full border border-white/10 bg-white/5">
                    {phase.status}
                  </span>
                </div>
              ))}
              <div className="text-center pt-2">
                <p className="text-xs text-slate-500 font-mono tracking-wide">
                  QuantumHalon adapts · No rip-and-replace
                </p>
              </div>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════
   SECTION G — Key Benefits / Outcomes
   ═══════════════════════════════════════════════════════════ */
function BenefitsSection() {
  const benefits = [
    {
      icon: ShieldCheck,
      title: "Stronger protection posture",
      desc: "Apply advanced cryptographic protection to sensitive traffic paths immediately.",
    },
    {
      icon: Eye,
      title: "Reduced HNDL exposure",
      desc: "Shrink the window of vulnerability to Harvest Now, Decrypt Later collection.",
    },
    {
      icon: Zap,
      title: "Controlled transition",
      desc: "Move to post-quantum protection incrementally, on your timeline, with governance.",
    },
    {
      icon: Network,
      title: "Operational continuity",
      desc: "Deploy without redesigning applications, protocols, or existing infrastructure.",
    },
    {
      icon: GitBranch,
      title: "Phased deployment",
      desc: "Start with the highest-value paths. Expand coverage as confidence and standards stabilize.",
    },
    {
      icon: RefreshCw,
      title: "Evolving readiness",
      desc: "Adapt cryptographic methods over time as requirements, threats, and regulations change.",
    },
  ];

  return (
    <section className="py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <FadeIn>
          <SectionLabel label="Outcomes" />
          <h2 className="text-3xl md:text-5xl text-white font-semibold tracking-tight mb-16 leading-tight max-w-3xl">
            What deploying QuantumHalon means for your organization.
          </h2>
        </FadeIn>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {benefits.map((b, i) => (
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
  );
}

/* ═══════════════════════════════════════════════════════════
   SECTION H — Use Cases (Summary)
   ═══════════════════════════════════════════════════════════ */
function UseCasesSummary() {
  const useCases = [
    {
      title: "Site-to-site protection",
      desc: "Strengthen the cryptographic protection of traffic moving between data centers, offices, and cloud environments.",
    },
    {
      title: "Branch-to-datacenter",
      desc: "Secure connections between distributed branches and centralized infrastructure with gateway-level protection.",
    },
    {
      title: "Inbound & outbound hardening",
      desc: "Apply stronger encryption to traffic entering and leaving sensitive environments.",
    },
    {
      title: "Post-quantum adoption",
      desc: "Begin the transition to post-quantum protection without waiting for full infrastructure overhaul.",
    },
  ];

  return (
    <section className="py-24 relative overflow-hidden border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <FadeIn>
          <SectionLabel label="Use Cases" />
          <h2 className="text-3xl md:text-5xl text-white font-semibold tracking-tight mb-16 leading-tight max-w-3xl">
            Protecting traffic where it matters most.
          </h2>
        </FadeIn>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {useCases.map((uc, i) => (
            <FadeIn key={i} delay={i * 0.1}>
              <div className="p-6 glass-panel glass-interactive rounded-xl group h-full flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center flex-shrink-0 group-hover:border-[#0ea5e9]/50 group-hover:bg-[#0ea5e9]/10 transition-all">
                  <span className="text-xs font-mono font-bold text-white/60 group-hover:text-[#0ea5e9] transition-colors">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>
                <div>
                  <h3 className="text-white font-medium text-lg mb-2">
                    {uc.title}
                  </h3>
                  <p className="text-slate-400 text-sm leading-relaxed">
                    {uc.desc}
                  </p>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
        <FadeIn>
          <div className="mt-10">
            <CTAButton href="/use-cases" variant="secondary">
              Explore all use cases
            </CTAButton>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════
   SECTION I — Industries (Summary)
   ═══════════════════════════════════════════════════════════ */
function IndustriesSummary() {
  const industries = [
    { icon: Building2, label: "Financial Services" },
    { icon: Heart, label: "Healthcare" },
    { icon: Landmark, label: "Government & Public Sector" },
    { icon: Factory, label: "Critical Infrastructure" },
    { icon: Briefcase, label: "Enterprise" },
  ];

  return (
    <section className="py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <FadeIn>
          <SectionLabel label="Industries" />
          <h2 className="text-3xl md:text-5xl text-white font-semibold tracking-tight mb-6 leading-tight max-w-3xl">
            Built for environments where sensitive data has a long life.
          </h2>
          <p className="text-slate-300 text-lg leading-relaxed max-w-2xl mb-12">
            Every industry handling long-lived sensitive data faces the same
            structural challenge: cryptographic protection must evolve.
          </p>
        </FadeIn>
        <div className="flex flex-wrap gap-4">
          {industries.map((ind, i) => (
            <FadeIn key={i} delay={i * 0.08}>
              <div className="flex items-center gap-3 px-5 py-3 glass-panel glass-interactive rounded-full group">
                <ind.icon className="w-5 h-5 text-white/60 group-hover:text-[#0ea5e9] transition-colors" />
                <span className="text-sm font-medium text-slate-300 group-hover:text-white transition-colors">
                  {ind.label}
                </span>
              </div>
            </FadeIn>
          ))}
        </div>
        <FadeIn>
          <div className="mt-10">
            <CTAButton href="/industries" variant="secondary">
              See industry details
            </CTAButton>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════
   SECTION J — Compliance / Readiness
   ═══════════════════════════════════════════════════════════ */
function ReadinessSection() {
  return (
    <section className="py-24 relative overflow-hidden border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <FadeIn>
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <SectionLabel label="Readiness" />
              <h2 className="text-3xl md:text-5xl text-white font-semibold tracking-tight mb-6 leading-tight">
                Cryptographic readiness is becoming a business requirement.
              </h2>
              <p className="text-slate-300 text-lg leading-relaxed mb-6">
                Regulatory bodies, procurement standards, and governance
                frameworks are increasingly expecting organizations to
                demonstrate a credible path toward stronger cryptographic
                protection.
              </p>
              <p className="text-slate-400 text-base leading-relaxed mb-8">
                QCertify helps organizations take practical steps toward
                transition readiness, supporting phased deployment that aligns
                with governance expectations and operational realities.
              </p>
              <CTAButton href="/compliance" variant="secondary">
                Learn about compliance readiness
              </CTAButton>
            </div>
            <div className="space-y-4">
              {[
                "NIST post-quantum standards published",
                "Government transition mandates emerging",
                "Financial regulators incorporating crypto resilience",
                "Enterprise procurement requiring PQ readiness",
              ].map((item, i) => (
                <div
                  key={i}
                  className="flex items-center gap-3 p-4 glass-panel rounded-xl"
                >
                  <CheckCircle className="w-5 h-5 text-[#0ea5e9] flex-shrink-0" />
                  <span className="text-slate-300 text-sm">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════
   SECTION K — Trust / Credibility
   ═══════════════════════════════════════════════════════════ */
function TrustSection() {
  const signals = [
    {
      icon: Target,
      title: "Purpose-built",
      desc: "Designed exclusively for enterprise traffic protection and cryptographic transition.",
    },
    {
      icon: Server,
      title: "Architecture-first",
      desc: "Gateway deployment model that integrates with existing networks, not against them.",
    },
    {
      icon: Shield,
      title: "Standards-aware",
      desc: "Built with awareness of evolving NIST PQC standards and cryptographic best practices.",
    },
    {
      icon: Lock,
      title: "Enterprise-grade",
      desc: "Designed for the operational, governance, and resilience requirements of regulated organizations.",
    },
  ];

  return (
    <section className="py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <FadeIn>
          <SectionLabel label="Why QCertify" />
          <h2 className="text-3xl md:text-5xl text-white font-semibold tracking-tight mb-16 leading-tight max-w-3xl">
            Engineered for environments where trust is non-negotiable.
          </h2>
        </FadeIn>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {signals.map((s, i) => (
            <FadeIn key={i} delay={i * 0.1}>
              <div className="p-6 glass-panel glass-interactive rounded-xl group h-full border-t border-white/20">
                <s.icon className="w-8 h-8 text-white/50 mb-4 group-hover:text-[#0ea5e9] group-hover:scale-110 transition-all" />
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
  );
}

/* ═══════════════════════════════════════════════════════════
   SECTION L — Final CTA
   ═══════════════════════════════════════════════════════════ */
function FinalCTA() {
  return (
    <section className="py-32 relative overflow-hidden border-t border-white/5">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-lg h-96 bg-white/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <FadeIn>
          <h2 className="text-4xl md:text-6xl text-white font-semibold tracking-tight mb-6">
            Start protecting traffic today.{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-slate-400">
              Transition with confidence tomorrow.
            </span>
          </h2>
          <p className="text-xl text-slate-400 mb-10 max-w-2xl mx-auto">
            Whether you are assessing your Harvest Now, Decrypt Later exposure,
            beginning post-quantum planning, or ready to deploy stronger traffic
            protection — QCertify is ready to help.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <CTAButton href="/contact">Book a Demo</CTAButton>
            <CTAButton href="/contact" variant="secondary">
              Talk to QCertify
            </CTAButton>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════
   HOME PAGE
   ═══════════════════════════════════════════════════════════ */
export default function Home() {
  return (
    <div className="min-h-screen bg-transparent selection:bg-white/30">
      <HeroSection />
      <ProblemSection />
      <CompanySection />
      <ProductSection />
      <HowItWorksSection />
      <CryptoAgilitySection />
      <BenefitsSection />
      <UseCasesSummary />
      <IndustriesSummary />
      <ReadinessSection />
      <TrustSection />
      <FinalCTA />
    </div>
  );
}
