"use client";
import React from "react";
import { motion } from "framer-motion";
import { ShieldCheck, GitBranch, Layers, RefreshCw, Settings, CheckCircle, Eye, FileCheck } from "lucide-react";
import SectionLabel from "@/components/SectionLabel";
import CTAButton from "@/components/CTAButton";

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
      <section className="relative pt-32 pb-20 lg:pt-44 lg:pb-28 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-glow-orb w-[800px] h-[800px] bg-white top-[-200px] left-[-300px] opacity-10 hidden md:block" />
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="max-w-3xl relative z-10">
          <SectionLabel label="Compliance & Readiness" />
          <h1 className="text-4xl lg:text-6xl font-bold tracking-tight text-white mb-6 leading-[1.1]">
            Cryptographic transition readiness is{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-slate-400">no longer optional.</span>
          </h1>
          <p className="text-lg lg:text-xl text-slate-300 max-w-2xl leading-relaxed font-light">
            Regulatory bodies, industry frameworks, and procurement standards are increasingly requiring organizations to demonstrate a credible cryptographic transition strategy. QCertify helps you take practical steps — now.
          </p>
        </motion.div>
      </section>

      {/* Readiness Landscape */}
      <section className="py-24 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <SectionLabel label="The Landscape" />
            <h2 className="text-3xl md:text-5xl text-white font-semibold tracking-tight mb-6 max-w-3xl">
              The pressure to prepare is real and growing.
            </h2>
            <p className="text-slate-300 text-lg leading-relaxed max-w-2xl mb-12">
              Across sectors, the expectation for cryptographic resilience is escalating. Organizations that wait will face compressed timelines, reactive upgrades, and higher costs.
            </p>
          </FadeIn>
          <div className="grid md:grid-cols-2 gap-4">
            {[
              { text: "NIST has published post-quantum cryptographic standards and is actively advising organizations to begin transition planning." },
              { text: "Government directives in multiple jurisdictions are establishing timelines for post-quantum readiness." },
              { text: "Financial regulators are incorporating cryptographic resilience into operational risk frameworks." },
              { text: "Enterprise procurement increasingly requires suppliers to demonstrate quantum-readiness posture." },
            ].map((item, i) => (
              <FadeIn key={i} delay={i * 0.08}>
                <div className="flex items-start gap-3 p-5 glass-panel rounded-xl">
                  <CheckCircle className="w-5 h-5 text-[#0ea5e9] flex-shrink-0 mt-0.5" />
                  <p className="text-slate-300 text-sm leading-relaxed">{item.text}</p>
                </div>
              </FadeIn>
            ))}
          </div>
          <FadeIn>
            <div className="mt-8 p-5 rounded-xl border border-[#0ea5e9]/20 bg-[#0ea5e9]/5">
              <p className="text-slate-300 text-sm leading-relaxed">
                <span className="font-bold text-[#0ea5e9]">Important:</span> QCertify does not claim to provide compliance certification. QCertify provides tooling and infrastructure that support an organization&apos;s path toward cryptographic readiness and governance alignment.
              </p>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* How QCertify Supports Readiness */}
      <section className="py-24 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <SectionLabel label="Readiness Support" />
            <h2 className="text-3xl md:text-5xl text-white font-semibold tracking-tight mb-16 max-w-3xl">
              Practical tools for a governed transition.
            </h2>
          </FadeIn>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: GitBranch, title: "Phased deployment", desc: "Start protecting the most sensitive paths first. Document and expand coverage according to governance timelines." },
              { icon: RefreshCw, title: "Crypto agility", desc: "Demonstrate the ability to change cryptographic methods as standards evolve — a core readiness expectation." },
              { icon: Layers, title: "Hybrid operation", desc: "Run classical and post-quantum protection simultaneously, meeting both current and emerging requirements." },
              { icon: Settings, title: "Controlled rollout", desc: "Deploy incrementally with change-managed processes that align with audit and governance expectations." },
              { icon: FileCheck, title: "Operational documentation", desc: "Gateway deployment decisions, policy configurations, and path coverage provide an audit-ready record." },
            ].map((c, i) => (
              <FadeIn key={i} delay={i * 0.08}>
                <div className="p-6 glass-panel glass-interactive rounded-xl group h-full">
                  <c.icon className="w-8 h-8 text-white/50 mb-4 group-hover:text-[#0ea5e9] group-hover:scale-110 transition-all" />
                  <h3 className="text-white font-medium text-lg mb-2">{c.title}</h3>
                  <p className="text-slate-400 text-sm leading-relaxed">{c.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Resilience */}
      <section className="py-24 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div>
                <SectionLabel label="Resilience" />
                <h2 className="text-3xl md:text-5xl text-white font-semibold tracking-tight mb-6">
                  Beyond compliance: building cryptographic resilience.
                </h2>
                <p className="text-slate-300 text-lg leading-relaxed mb-6">
                  Compliance is a checkpoint. Resilience is a capability. QCertify&apos;s approach is designed to build lasting cryptographic resilience — the organizational ability to detect, respond to, and adapt to changes in the cryptographic landscape.
                </p>
              </div>
              <div className="space-y-3">
                {[
                  "Understanding where vulnerable cryptography exists in your environment",
                  "Having a practical mechanism to strengthen protection where needed",
                  "Being able to change cryptographic methods when new standards emerge",
                  "Maintaining operational continuity throughout continuing evolution",
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-3 p-4 glass-panel rounded-xl">
                    <div className="w-2 h-2 rounded-full bg-[#0ea5e9] flex-shrink-0 mt-2" />
                    <span className="text-slate-300 text-sm leading-relaxed">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Governance Alignment */}
      <section className="py-24 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <SectionLabel label="Governance" />
            <h2 className="text-3xl md:text-5xl text-white font-semibold tracking-tight mb-6 max-w-3xl">
              A transition strategy that governance teams can support.
            </h2>
            <p className="text-slate-300 text-lg leading-relaxed max-w-2xl mb-12">
              Cryptographic transition is not just a security decision. It requires board-level awareness, budget allocation, change management, and cross-functional coordination.
            </p>
          </FadeIn>
          <div className="grid md:grid-cols-2 gap-6">
            {[
              "Defined scope and boundaries for each deployment phase",
              "Controlled activation that follows change management processes",
              "Clear documentation of protection status per path and segment",
              "Reversibility and rollback capability for risk-managed transitions",
            ].map((item, i) => (
              <FadeIn key={i} delay={i * 0.08}>
                <div className="p-5 glass-panel glass-interactive rounded-xl flex items-start gap-3 group">
                  <ShieldCheck className="w-5 h-5 text-[#0ea5e9] flex-shrink-0 mt-0.5" />
                  <span className="text-slate-300 text-sm leading-relaxed">{item}</span>
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
            <h2 className="text-4xl md:text-6xl text-white font-semibold tracking-tight mb-6">Discuss your readiness strategy.</h2>
            <p className="text-xl text-slate-400 mb-10 max-w-2xl mx-auto">Let us help you understand how QuantumHalon supports your compliance and governance objectives.</p>
            <CTAButton href="/contact">Discuss Your Transition Strategy</CTAButton>
          </FadeIn>
        </div>
      </section>
    </div>
  );
}
