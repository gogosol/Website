"use client";
import React from "react";
import { motion } from "framer-motion";
import {
  Building2,
  Heart,
  Landmark,
  Factory,
  Briefcase,
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

/* ═══════════════════════════════════════════════════════════
   SECTION 1 — Hero (visual-led)
   ═══════════════════════════════════════════════════════════ */
function HeroSection() {
  return (
    <section className="relative pt-28 pb-8 lg:pt-36 lg:pb-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="bg-glow-orb w-[800px] h-[800px] bg-white top-[-200px] left-[-300px] opacity-10 hidden md:block" />

      {/* Headline block — tight, concise */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="text-center max-w-3xl mx-auto mb-8 relative z-10">
        <SectionLabel label="Post-Quantum Transition" />
        <h1 className="text-4xl lg:text-6xl font-bold tracking-tight text-white mb-4 leading-[1.1]">
          Protect traffic today.{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-slate-400">
            Transition with confidence.
          </span>
        </h1>
        <p className="text-lg text-slate-400 max-w-xl mx-auto font-light">
          QuantumHalon is a crypto-agile gateway that applies stronger cryptographic protection without redesigning what you already run.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center mt-6">
          <CTAButton href="/contact">Book a Demo</CTAButton>
          <CTAButton href="/how-it-works" variant="secondary">See How It Works</CTAButton>
        </div>
      </motion.div>

      {/* Architecture diagram — the hero visual */}
      <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.3 }} className="relative z-10 mt-4">
        <HeroArchitecture />
      </motion.div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════
   SECTION 2 — HNDL Threat (diagram-led)
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
              Adversaries capture encrypted traffic today, banking on future quantum decryption. Stronger protection must be applied now.
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
   SECTION 3 — Crypto Agility (animation-led)
   ═══════════════════════════════════════════════════════════ */
function CryptoAgilitySection() {
  return (
    <section className="py-20 lg:py-28 relative overflow-hidden">
      <div className="bg-glow-orb w-[600px] h-[600px] bg-[#0ea5e9] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-[0.03]" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <FadeIn>
            <SectionLabel label="Crypto Agility" />
            <h2 className="text-3xl md:text-4xl text-white font-semibold tracking-tight mb-4 leading-tight">
              Standards change.{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-slate-400">
                Your protection adapts.
              </span>
            </h2>
            <p className="text-slate-400 text-base mb-2 max-w-md">
              Cryptographic methods evolve underneath a stable operational layer. No rip-and-replace. No downtime. No redesign.
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
   SECTION 4 — Ghost Dashboard (product visual)
   ═══════════════════════════════════════════════════════════ */
function DashboardSection() {
  return (
    <section className="py-20 lg:py-28 relative overflow-hidden border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <FadeIn>
          <div className="text-center max-w-2xl mx-auto mb-10">
            <SectionLabel label="Product" />
            <h2 className="text-3xl md:text-5xl text-white font-semibold tracking-tight mb-3">
              Visibility. Control. Readiness.
            </h2>
            <p className="text-slate-400 text-base">
              A unified view of gateway status, traffic protection, and cryptographic posture.
            </p>
          </div>
        </FadeIn>
        <FadeIn delay={0.1}>
          <GhostDashboard />
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
   SECTION 5 — Use Cases (topology diagrams)
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
                Protecting traffic where it matters.
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
   SECTION 6 — Industries (capsule strip)
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
              <Link href="/industries" className="p-4 glass-panel glass-interactive rounded-xl group text-center block">
                <ind.icon className="w-7 h-7 text-white/40 mx-auto mb-2 group-hover:text-[#0ea5e9] transition-colors" />
                <div className="text-sm font-medium text-white mb-0.5">{ind.label}</div>
                <div className="text-[11px] text-slate-500">{ind.sub}</div>
              </Link>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════
   SECTION 7 — Readiness Roadmap (visual)
   ═══════════════════════════════════════════════════════════ */
function ReadinessSection() {
  return (
    <section className="py-20 lg:py-28 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <FadeIn>
          <div className="text-center max-w-2xl mx-auto mb-12">
            <SectionLabel label="Readiness" />
            <h2 className="text-3xl md:text-4xl text-white font-semibold tracking-tight mb-3">
              A practical path to transition readiness.
            </h2>
            <p className="text-slate-400 text-base">
              Controlled, phased, governed — not reactive.
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
   SECTION 8 — Final CTA
   ═══════════════════════════════════════════════════════════ */
function FinalCTA() {
  return (
    <section className="py-28 lg:py-36 relative overflow-hidden border-t border-white/5">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-md h-80 bg-white/[0.04] rounded-full blur-[120px] pointer-events-none" />
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <FadeIn>
          <h2 className="text-4xl md:text-6xl text-white font-semibold tracking-tight mb-4">
            Start protecting traffic today.
          </h2>
          <p className="text-lg text-slate-400 mb-8 max-w-xl mx-auto">
            See how QuantumHalon deploys in your environment.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <CTAButton href="/contact">Book a Demo</CTAButton>
            <CTAButton href="/contact" variant="secondary">Talk to QCertify</CTAButton>
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
      <DashboardSection />
      <UseCasesSection />
      <IndustriesStrip />
      <ReadinessSection />
      <FinalCTA />
    </div>
  );
}
