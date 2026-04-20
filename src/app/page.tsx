"use client";
import React, { useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  Building2,
  Heart,
  Landmark,
  Factory,
  Briefcase,
  Shield,
  Lock,
  Zap,
  Eye,
  ArrowRight,
} from "lucide-react";
import Link from "next/link";
import SectionLabel from "@/components/SectionLabel";
import CTAButton from "@/components/CTAButton";
import HeroArchitecture from "@/components/visuals/HeroArchitecture";
import HNDLTimeline from "@/components/visuals/HNDLTimeline";
import CryptoAgility from "@/components/visuals/CryptoAgility";
import GhostDashboard from "@/components/visuals/GhostDashboard";
import { UseCaseTopologyGrid } from "@/components/visuals/UseCaseTopology";
import ReadinessRoadmap from "@/components/visuals/ReadinessRoadmap";

/* ─── Shared fade-in ─── */
function FadeIn({ children, className = "", delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  return (
    <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-60px" }} transition={{ duration: 0.55, delay, ease: [0.25, 0.1, 0.25, 1] }} className={className}>
      {children}
    </motion.div>
  );
}

/* ─── Animated counter ─── */
function AnimatedCounter({ value, suffix = "" }: { value: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });
  const [count, setCount] = React.useState(0);

  useEffect(() => {
    if (!isInView) return;
    let start = 0;
    const duration = 2000;
    const step = Math.ceil(value / (duration / 16));
    const timer = setInterval(() => {
      start += step;
      if (start >= value) {
        setCount(value);
        clearInterval(timer);
      } else {
        setCount(start);
      }
    }, 16);
    return () => clearInterval(timer);
  }, [isInView, value]);

  return <span ref={ref}>{count}{suffix}</span>;
}

/* ─── Deterministic particle seeds (avoids hydration mismatch) ─── */
const particleSeeds = Array.from({ length: 30 }, (_, i) => {
  const s = (i * 2654435761) % 1000;
  return {
    w: (s % 30) / 10 + 1,
    h: ((s * 7) % 30) / 10 + 1,
    x: ((s * 13) % 1000) / 10,
    y: ((s * 17) % 1000) / 10,
    o: ((s * 3) % 30) / 100 + 0.1,
    dur: ((s * 11) % 80) / 10 + 6,
    del: ((s * 19) % 50) / 10,
  };
});

/* ─── Floating particles for hero ─── */
function HeroParticles() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particleSeeds.map((p, i) => (
        <div
          key={i}
          className="absolute rounded-full bg-[#0ea5e9]"
          style={{
            width: `${p.w}px`,
            height: `${p.h}px`,
            left: `${p.x}%`,
            top: `${p.y}%`,
            opacity: p.o,
            animation: `particle-float ${p.dur}s ease-in-out infinite ${p.del}s`,
          }}
        />
      ))}
      {/* Orbiting rings */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] md:w-[700px] md:h-[700px] rounded-full border border-white/[0.03]" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] md:w-[500px] md:h-[500px] rounded-full border border-[#0ea5e9]/[0.05]" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200px] h-[200px] md:w-[300px] md:h-[300px] rounded-full border border-white/[0.04]" />
      {/* Orbital dots */}
      {[0, 1, 2, 3].map((i) => (
        <div
          key={`orb-${i}`}
          className="absolute top-1/2 left-1/2"
          style={{
            width: "6px",
            height: "6px",
            marginLeft: "-3px",
            marginTop: "-3px",
            borderRadius: "50%",
            background: i % 2 === 0 ? "#0ea5e9" : "rgba(255,255,255,0.4)",
            boxShadow: i % 2 === 0 ? "0 0 12px #0ea5e9" : "0 0 8px rgba(255,255,255,0.3)",
            animation: `orbit ${20 + i * 8}s linear infinite`,
            ["--orbit-radius" as string]: `${150 + i * 70}px`,
          }}
        />
      ))}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
   SECTION 1 - Hero (immersive, captivating)
   ═══════════════════════════════════════════════════════════ */
function HeroSection() {
  return (
    <section className="relative pt-28 pb-8 lg:pt-36 lg:pb-12 min-h-[90vh] flex flex-col justify-center overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0ea5e9]/[0.03] via-transparent to-transparent" />
      <div className="bg-glow-orb w-[800px] h-[800px] bg-[#0ea5e9] top-[-200px] left-[-300px] opacity-[0.06] hidden md:block" />
      <div className="bg-glow-orb w-[600px] h-[600px] bg-white bottom-[-100px] right-[-200px] opacity-[0.03]" />
      <HeroParticles />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Headline block */}
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }} className="text-center max-w-4xl mx-auto mb-10">
          <SectionLabel label="Post-Quantum Cryptography" />
          <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold tracking-tight text-white mb-6 leading-[1.08]">
            Protecting organizations{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-[#0ea5e9]">
              for the post-quantum era.
            </span>
          </h1>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4, duration: 0.6 }} className="text-lg lg:text-xl text-slate-400 max-w-2xl mx-auto font-light leading-relaxed">
            QCertify protects critical communications and systems with Post-Quantum Cryptography - reducing exposure to Harvest Now, Decrypt Later attacks and meeting growing regulatory demands.
          </motion.p>
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6, duration: 0.5 }} className="flex flex-col sm:flex-row gap-3 justify-center mt-8">
            <CTAButton href="/contact">Talk to QCertify</CTAButton>
            <CTAButton href="/how-it-works" variant="secondary">See How It Works</CTAButton>
          </motion.div>
        </motion.div>

        {/* Hero floating stat cards */}
        <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.5 }} className="grid grid-cols-2 lg:grid-cols-4 gap-3 max-w-4xl mx-auto mb-6">
          {[
            { icon: Shield, label: "PQC Protection", value: "Active", accent: true },
            { icon: Lock, label: "Algorithms Supported", value: "ML-KEM · ML-DSA" },
            { icon: Zap, label: "Zero Downtime", value: "Transition" },
            { icon: Eye, label: "Full Visibility", value: "Real-time" },
          ].map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.7 + i * 0.1, duration: 0.4 }}
              className={`p-4 rounded-xl glass-panel shimmer text-center float-up${i === 1 ? "-delayed" : i === 2 ? "-slow" : i === 3 ? "-delayed" : ""}`}
            >
              <stat.icon className={`w-5 h-5 mx-auto mb-2 ${stat.accent ? "text-[#0ea5e9]" : "text-white/40"}`} />
              <div className="text-[10px] font-mono text-slate-500 uppercase tracking-widest mb-1">{stat.label}</div>
              <div className={`text-sm font-medium ${stat.accent ? "text-[#0ea5e9]" : "text-white"}`}>{stat.value}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* Architecture diagram - the hero visual */}
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.8 }} className="relative z-10 mt-4 perspective-container">
          <HeroArchitecture />
        </motion.div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════
   SECTION 2 - HNDL Threat (diagram-led)
   ═══════════════════════════════════════════════════════════ */
function HNDLSection() {
  return (
    <section className="py-20 lg:py-28 relative overflow-hidden border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <FadeIn>
          <div className="text-center max-w-2xl mx-auto mb-10">
            <SectionLabel label="The Threat" />
            <h2 className="text-3xl md:text-5xl text-white font-semibold tracking-tight mb-3 leading-tight">
              Harvest Now, Decrypt Later.
            </h2>
            <p className="text-slate-400 text-base">
              Adversaries capture encrypted traffic today, banking on future quantum decryption capability. Organizations must apply stronger cryptographic protection now - before it is too late.
            </p>
          </div>
        </FadeIn>
        {/* The visual does the explaining */}
        <FadeIn delay={0.15}>
          <HNDLTimeline />
        </FadeIn>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════
   SECTION 3 - Crypto Agility (animation-led)
   ═══════════════════════════════════════════════════════════ */
function CryptoAgilitySection() {
  return (
    <section className="py-20 lg:py-28 relative overflow-hidden">
      <div className="bg-glow-orb w-[600px] h-[600px] bg-[#0ea5e9] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-[0.03]" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <FadeIn>
            <SectionLabel label="Gradual Transition" />
            <h2 className="text-3xl md:text-4xl text-white font-semibold tracking-tight mb-4 leading-tight">
              A practical path to PQC.{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-slate-400">
                No disruption. No redesign.
              </span>
            </h2>
            <p className="text-slate-400 text-base mb-2 max-w-md">
              QCertify enables a gradual transition to Post-Quantum Cryptography, with minimal operational disruption. Cryptographic methods evolve underneath a stable operational layer.
            </p>
            <CTAButton href="/product" variant="secondary" className="mt-4">
              Explore QuantumHalon
            </CTAButton>
          </FadeIn>
          <FadeIn delay={0.15}>
            <CryptoAgility />
          </FadeIn>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════
   SECTION 4 - What QCertify Does (value proposition cards)
   ═══════════════════════════════════════════════════════════ */
function WhatWeDoSection() {
  const capabilities = [
    {
      icon: Shield,
      title: "Quantum-Ready Protection",
      desc: "Protects traffic and critical communications with cryptography prepared for the quantum era.",
    },
    {
      icon: Lock,
      title: "HNDL Risk Reduction",
      desc: "Helps organizations reduce exposure to Harvest Now, Decrypt Later attacks that target today's encrypted data.",
    },
    {
      icon: Zap,
      title: "Gradual PQC Transition",
      desc: "Enables a phased transition to Post-Quantum Cryptography with minimal operational disruption.",
    },
    {
      icon: Landmark,
      title: "Regulatory Readiness",
      desc: "Supports organizations in meeting growing regulatory and institutional requirements for cryptographic resilience.",
    },
    {
      icon: Eye,
      title: "No Redesign Required",
      desc: "Reinforces security of existing environments without requiring complete infrastructure overhaul.",
    },
  ];

  return (
    <section className="py-20 lg:py-28 relative overflow-hidden border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <FadeIn>
          <div className="text-center max-w-2xl mx-auto mb-12">
            <SectionLabel label="What We Do" />
            <h2 className="text-3xl md:text-5xl text-white font-semibold tracking-tight mb-3 leading-tight">
              Practical post-quantum protection{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-slate-400">
                for real organizations.
              </span>
            </h2>
          </div>
        </FadeIn>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {capabilities.map((cap, i) => (
            <FadeIn key={i} delay={i * 0.08}>
              <div className="p-6 glass-panel glass-interactive rounded-xl group h-full perspective-container">
                <div className="card-3d">
                  <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center mb-4 border border-white/10 group-hover:border-[#0ea5e9]/50 group-hover:bg-[#0ea5e9]/10 group-hover:shadow-[0_0_20px_rgba(14,165,233,0.3)] transition-all">
                    <cap.icon className="w-6 h-6 text-white/40 group-hover:text-[#0ea5e9] transition-colors" />
                  </div>
                  <h3 className="text-white font-medium text-lg mb-2">{cap.title}</h3>
                  <p className="text-slate-400 text-sm leading-relaxed">{cap.desc}</p>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════
   SECTION 5 - Ghost Dashboard (product visual)
   ═══════════════════════════════════════════════════════════ */
function DashboardSection() {
  return (
    <section className="py-20 lg:py-28 relative overflow-hidden border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <FadeIn>
          <div className="text-center max-w-2xl mx-auto mb-10">
            <SectionLabel label="Product" />
            <h2 className="text-3xl md:text-5xl text-white font-semibold tracking-tight mb-3">
              Visibility. Control. Protection.
            </h2>
            <p className="text-slate-400 text-base">
              A unified view of gateway status, traffic protection, cryptographic posture, and post-quantum migration progress.
            </p>
          </div>
        </FadeIn>
        <FadeIn delay={0.1}>
          <div className="perspective-container">
            <GhostDashboard />
          </div>
        </FadeIn>
        <FadeIn delay={0.2}>
          <div className="text-center mt-8">
            <CTAButton href="/product" variant="secondary">See Full Product</CTAButton>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════
   SECTION 6 - Use Cases (topology diagrams)
   ═══════════════════════════════════════════════════════════ */
function UseCasesSection() {
  return (
    <section className="py-20 lg:py-28 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <FadeIn>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-10">
            <div>
              <SectionLabel label="Use Cases" />
              <h2 className="text-3xl md:text-4xl text-white font-semibold tracking-tight">
                Protecting critical communications where it matters.
              </h2>
            </div>
            <CTAButton href="/use-cases" variant="secondary">See All Use Cases</CTAButton>
          </div>
        </FadeIn>
        <UseCaseTopologyGrid />
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════
   SECTION 7 - Industries (capsule strip)
   ═══════════════════════════════════════════════════════════ */
function IndustriesStrip() {
  const industries = [
    { icon: Building2, label: "Financial Services", sub: "Long-lived transaction data" },
    { icon: Heart, label: "Healthcare", sub: "Patient records & genomics" },
    { icon: Landmark, label: "Government", sub: "Classified communications" },
    { icon: Factory, label: "Critical Infrastructure", sub: "OT/ICS environments" },
    { icon: Briefcase, label: "Enterprise", sub: "Distributed hybrid networks" },
  ];

  return (
    <section className="py-16 relative overflow-hidden border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <FadeIn>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-8">
            <div>
              <SectionLabel label="Industries" />
              <h2 className="text-2xl md:text-3xl text-white font-semibold tracking-tight">
                Built for environments where sensitive data has a long life.
              </h2>
            </div>
            <CTAButton href="/industries" variant="secondary">See Industries</CTAButton>
          </div>
        </FadeIn>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
          {industries.map((ind, i) => (
            <FadeIn key={i} delay={i * 0.06}>
              <Link href="/industries" className="p-4 glass-panel glass-interactive rounded-xl group text-center block perspective-container">
                <div className="card-3d">
                  <ind.icon className="w-7 h-7 text-white/40 mx-auto mb-2 group-hover:text-[#0ea5e9] transition-colors" />
                  <div className="text-sm font-medium text-white mb-0.5">{ind.label}</div>
                  <div className="text-[11px] text-slate-500">{ind.sub}</div>
                </div>
              </Link>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════
   SECTION 8 - Readiness Roadmap (visual)
   ═══════════════════════════════════════════════════════════ */
function ReadinessSection() {
  return (
    <section className="py-20 lg:py-28 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <FadeIn>
          <div className="text-center max-w-2xl mx-auto mb-12">
            <SectionLabel label="Transition Roadmap" />
            <h2 className="text-3xl md:text-4xl text-white font-semibold tracking-tight mb-3">
              A practical path to post-quantum protection.
            </h2>
            <p className="text-slate-400 text-base">
              Controlled, phased, governed - not reactive. More security today, better preparation for the future.
            </p>
          </div>
        </FadeIn>
        <FadeIn delay={0.1}>
          <ReadinessRoadmap />
        </FadeIn>
        <FadeIn delay={0.2}>
          <div className="text-center mt-10">
            <CTAButton href="/compliance" variant="secondary">Learn About Compliance Readiness</CTAButton>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════
   SECTION 9 - Final CTA
   ═══════════════════════════════════════════════════════════ */
function FinalCTA() {
  return (
    <section className="py-28 lg:py-36 relative overflow-hidden border-t border-white/5">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-md h-80 bg-[#0ea5e9]/[0.04] rounded-full blur-[120px] pointer-events-none" />
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <FadeIn>
          <h2 className="text-4xl md:text-6xl text-white font-semibold tracking-tight mb-4">
            Prepare today.{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-[#0ea5e9]">
              Protect against tomorrow&apos;s quantum risk.
            </span>
          </h2>
          <p className="text-lg text-slate-400 mb-8 max-w-xl mx-auto">
            See how QCertify protects your organization with practical, credible post-quantum cryptography.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <CTAButton href="/contact">Talk to QCertify</CTAButton>
            <CTAButton href="/contact" variant="secondary">Book a Demo</CTAButton>
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
      <HNDLSection />
      <CryptoAgilitySection />
      <WhatWeDoSection />
      <DashboardSection />
      <UseCasesSection />
      <IndustriesStrip />
      <ReadinessSection />
      <FinalCTA />
    </div>
  );
}





