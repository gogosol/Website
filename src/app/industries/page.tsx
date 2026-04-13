"use client";
import React from "react";
import { motion } from "framer-motion";
import { Building2, Heart, Landmark, Factory, Briefcase, CheckCircle } from "lucide-react";
import SectionLabel from "@/components/SectionLabel";
import CTAButton from "@/components/CTAButton";

function FadeIn({ children, className = "", delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  return (
    <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-60px" }} transition={{ duration: 0.55, delay, ease: [0.25, 0.1, 0.25, 1] }} className={className}>
      {children}
    </motion.div>
  );
}

const industries = [
  {
    icon: Building2,
    title: "Financial Services",
    headline: "Protecting data with decades of sensitivity.",
    description: "Financial institutions manage data that retains its sensitivity for years or decades — transaction records, customer identities, inter-bank communications, and investment positions. This data is a prime target for Harvest Now, Decrypt Later collection.",
    context: "At the same time, financial regulators are increasingly focused on cryptographic resilience. Organizations need to demonstrate they are preparing for post-quantum transition — not that they will start planning eventually.",
    benefits: [
      "Protect inter-branch and inter-institution traffic with stronger cryptographic methods",
      "Deploy phased transition that aligns with financial change management and governance",
      "Support regulatory readiness without disrupting core banking operations",
    ],
  },
  {
    icon: Heart,
    title: "Healthcare",
    headline: "Shielding patient data from long-term cryptographic exposure.",
    description: "Patient records, clinical trial data, genomic information, and research communications carry sensitivity that extends well beyond typical data lifecycles. Once compromised, this data cannot be made private again.",
    context: "Healthcare organizations also operate complex, distributed environments — hospitals, clinics, research facilities, insurer networks — making centralized cryptographic migration extraordinarily difficult.",
    benefits: [
      "Apply stronger protection to data flows between healthcare facilities and partners",
      "Start transition on regulated data paths (HIPAA, HITECH) without touching clinical systems",
      "Maintain operational continuity across distributed healthcare environments",
    ],
  },
  {
    icon: Landmark,
    title: "Government & Public Sector",
    headline: "Securing sovereign data against evolving cryptographic threats.",
    description: "Government agencies handle classified, sensitive, and citizen-related data that must remain protected for the long term. National security, diplomatic communications, and critical public services depend on cryptographic integrity that outlasts current algorithmic assumptions.",
    context: "Post-quantum readiness is not optional for government — it is becoming a mandated trajectory.",
    benefits: [
      "Protect sensitive government traffic paths with advanced cryptographic methods",
      "Deploy incrementally across agencies, departments, and classification levels",
      "Align with government cryptographic transition guidelines and mandates",
    ],
  },
  {
    icon: Factory,
    title: "Critical Infrastructure",
    headline: "Protecting the systems society depends on.",
    description: "Energy grids, water systems, transportation networks, and telecommunications infrastructure carry operational data that, if compromised, could have cascading physical consequences. These environments also run equipment and protocols with long operational lifespans — making centralized cryptographic upgrades practically impossible.",
    context: "",
    benefits: [
      "Apply gateway-level protection without modifying OT/ICS systems or legacy SCADA protocols",
      "Protect communication paths between control centers and remote facilities",
      "Support incremental deployment that aligns with critical infrastructure maintenance cycles",
    ],
  },
  {
    icon: Briefcase,
    title: "Enterprise & Industrial Environments",
    headline: "Strengthening cryptographic posture across complex organizations.",
    description: "Large enterprises operate environments that span cloud, on-premises, branch offices, partner connections, and hybrid architectures. Cryptographic protection in these environments is often inconsistent, partially documented, and difficult to upgrade holistically.",
    context: "",
    benefits: [
      "Establish gateway-level cryptographic protection on the most critical traffic paths",
      "Bring consistency to cryptographic posture across heterogeneous environments",
      "Start the post-quantum transition where it matters most, then expand over time",
    ],
  },
];

export default function IndustriesPage() {
  return (
    <div className="min-h-screen bg-transparent selection:bg-white/30">
      {/* Hero */}
      <section className="relative pt-32 pb-20 lg:pt-44 lg:pb-28 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-glow-orb w-[800px] h-[800px] bg-white top-[-200px] right-[-300px] opacity-10 hidden md:block" />
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="max-w-3xl relative z-10">
          <SectionLabel label="Industries" />
          <h1 className="text-4xl lg:text-6xl font-bold tracking-tight text-white mb-6 leading-[1.1]">
            Enterprise cryptographic protection,{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-slate-400">purpose-built for high-stakes industries.</span>
          </h1>
          <p className="text-lg lg:text-xl text-slate-300 max-w-2xl leading-relaxed font-light">
            Every industry handling sensitive, long-lived data faces the same structural challenge: cryptographic protection must evolve. QuantumHalon helps organizations take the first practical steps.
          </p>
        </motion.div>
      </section>

      {/* Industry sections */}
      <section className="pb-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="space-y-10">
          {industries.map((ind, i) => (
            <FadeIn key={i} delay={i * 0.05}>
              <div className="glass-panel rounded-2xl p-8 lg:p-10">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center">
                    <ind.icon className="w-6 h-6 text-[#0ea5e9]" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-semibold text-white">{ind.title}</h2>
                    <p className="text-slate-400 text-sm">{ind.headline}</p>
                  </div>
                </div>
                <div className="grid lg:grid-cols-2 gap-8">
                  <div>
                    <p className="text-slate-300 text-sm leading-relaxed mb-4">{ind.description}</p>
                    {ind.context && <p className="text-slate-400 text-sm leading-relaxed">{ind.context}</p>}
                  </div>
                  <div>
                    <div className="text-xs font-bold text-[#0ea5e9] uppercase tracking-widest mb-3">Why QuantumHalon</div>
                    <div className="space-y-3">
                      {ind.benefits.map((b, j) => (
                        <div key={j} className="flex items-start gap-3">
                          <CheckCircle className="w-4 h-4 text-[#0ea5e9] flex-shrink-0 mt-0.5" />
                          <span className="text-slate-300 text-sm leading-relaxed">{b}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="py-32 relative overflow-hidden border-t border-white/5">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-lg h-96 bg-white/5 rounded-full blur-[120px] pointer-events-none" />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <FadeIn>
            <h2 className="text-4xl md:text-6xl text-white font-semibold tracking-tight mb-6">See how QCertify supports your industry.</h2>
            <p className="text-xl text-slate-400 mb-10 max-w-2xl mx-auto">Discuss your industry-specific requirements and see how QuantumHalon fits your environment.</p>
            <CTAButton href="/contact">Book a Demo</CTAButton>
          </FadeIn>
        </div>
      </section>
    </div>
  );
}
