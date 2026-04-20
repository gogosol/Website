"use client";
import React from "react";
import { motion } from "framer-motion";
import { Shield, Lock, Zap, Landmark, Eye, Target, GitBranch, RefreshCw } from "lucide-react";
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
        <div className="bg-glow-orb w-[800px] h-[800px] bg-white top-[-200px] left-[-300px] opacity-[0.06] hidden md:block" />
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="max-w-3xl relative z-10">
          <SectionLabel label="About QCertify" />
          <h1 className="text-4xl lg:text-6xl font-bold tracking-tight text-white mb-6 leading-[1.1]">
            Helping organizations adopt post-quantum protection{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-[#0ea5e9]">in a practical, secure and credible way.</span>
          </h1>
          <p className="text-lg text-slate-400 max-w-xl font-light leading-relaxed">
            QCertify helps organizations protect critical communications and systems in the transition to the post-quantum era.
          </p>
        </motion.div>
      </section>

      {/* The Problem */}
      <section className="py-16 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <div className="grid lg:grid-cols-2 gap-12 items-start">
              <div>
                <SectionLabel label="The Challenge" />
                <h2 className="text-3xl md:text-4xl text-white font-semibold tracking-tight mb-6 leading-tight">
                  Regulatory pressure is growing.{" "}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-slate-400">
                    Quantum risk is becoming real.
                  </span>
                </h2>
                <p className="text-slate-400 text-base leading-relaxed mb-4">
                  As quantum computing advances, organizations face a new challenge. The encryption that protects sensitive data today may not be sufficient in the future.
                </p>
                <p className="text-slate-400 text-base leading-relaxed">
                  This is especially concerning in the context of <strong className="text-white font-medium">Harvest Now, Decrypt Later</strong> - where adversaries intercept and store encrypted data today, planning to decrypt it later when quantum capability allows.
                </p>
              </div>
              <div className="glass-panel-heavy rounded-2xl p-8 relative overflow-hidden">

                <div className="text-xs font-mono text-amber-500/60 uppercase tracking-widest mb-6">Key Risks</div>
                <div className="space-y-5">
                  {[
                    { label: "Harvest Now, Decrypt Later", desc: "Adversaries capture today's encrypted data for future quantum decryption." },
                    { label: "Traditional Crypto Breaking", desc: "Current cryptographic models face obsolescence as quantum capability matures." },
                    { label: "Regulatory Pressure", desc: "Growing institutional and regulatory demands for cryptographic resilience." },
                  ].map((risk, i) => (
                    <div key={i} className="p-3 rounded-lg bg-amber-500/[0.04] border border-amber-500/15">
                      <div className="text-sm text-white font-medium mb-1">{risk.label}</div>
                      <div className="text-xs text-slate-400">{risk.desc}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* The Solution */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <div className="text-center max-w-2xl mx-auto mb-12">
              <SectionLabel label="Our Solution" />
              <h2 className="text-3xl md:text-4xl text-white font-semibold tracking-tight mb-4">
                Post-Quantum Cryptography,{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-[#0ea5e9]">designed for the real world.</span>
              </h2>
              <p className="text-slate-400 text-base">
                QCertify responds to this challenge with practical PQC solutions, designed to protect organizations without requiring a complete replacement of existing infrastructure.
              </p>
            </div>
          </FadeIn>

          {/* What we do - 5 capabilities */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { icon: Shield, title: "Quantum-Ready Protection", desc: "Protects traffic and critical communications with cryptography prepared for the quantum era." },
              { icon: Lock, title: "HNDL Risk Reduction", desc: "Helps organizations reduce exposure to Harvest Now, Decrypt Later attacks targeting today's encrypted data." },
              { icon: Zap, title: "Gradual PQC Transition", desc: "Enables a phased transition to Post-Quantum Cryptography with minimal operational disruption." },
              { icon: Landmark, title: "Regulatory Response", desc: "Supports organizations in meeting growing regulatory and institutional demands for cryptographic resilience." },
              { icon: Eye, title: "No Redesign Required", desc: "Reinforces the security of existing environments without requiring complete infrastructure overhauls." },
            ].map((cap, i) => (
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

      {/* How We Create Value */}
      <section className="py-16 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <SectionLabel label="How We Create Value" />
                <h2 className="text-3xl md:text-4xl text-white font-semibold tracking-tight mb-4">Act early. Act controlled.</h2>
                <p className="text-slate-400 text-base mb-4 leading-relaxed">
                  QCertify was built for organizations that need to act early, but in a controlled way. Instead of demanding a radical transformation, our approach enables the introduction of post-quantum protection progressively and compatibly with operational reality.
                </p>
                <p className="text-slate-400 text-base mb-6 leading-relaxed">
                  This means more security today, better preparation for the future, and a concrete response to the growing demands for cryptographic resilience.
                </p>
                <CTAButton href="/product" variant="secondary">Explore QuantumHalon</CTAButton>
              </div>
              <div className="glass-panel-heavy rounded-2xl p-8 text-center relative overflow-hidden">

                <div className="text-xs font-mono text-slate-500 uppercase tracking-widest mb-6">Our Approach</div>
                <div className="space-y-6">
                  <div>
                    <div className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white to-[#0ea5e9] mb-1 anim-count-glow">Practical</div>
                    <div className="text-slate-400 text-base">Solutions that work in real operational environments</div>
                  </div>
                  <div className="h-px bg-white/10" />
                  <div>
                    <div className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white to-[#0ea5e9] mb-1 anim-count-glow">Progressive</div>
                    <div className="text-slate-400 text-base">Gradual adoption without full infrastructure replacement</div>
                  </div>
                  <div className="h-px bg-white/10" />
                  <div>
                    <div className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white to-[#0ea5e9] mb-1 anim-count-glow">Credible</div>
                    <div className="text-slate-400 text-base">Built with discipline and operational rigor</div>
                  </div>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Convictions */}
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
                <div className="p-5 glass-panel glass-interactive rounded-xl group h-full text-center perspective-container">
                  <div className="card-3d">
                    <b.icon className="w-8 h-8 text-white/40 mx-auto mb-3 group-hover:text-[#0ea5e9] group-hover:scale-110 transition-all" />
                    <h3 className="text-white font-medium text-sm mb-1">{b.title}</h3>
                    <p className="text-slate-500 text-xs">{b.desc}</p>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* What We Build */}
      <section className="py-16 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <SectionLabel label="What We Build" />
                <h2 className="text-3xl md:text-4xl text-white font-semibold tracking-tight mb-4">From conviction to product.</h2>
                <p className="text-slate-400 text-base mb-6 max-w-md">
                  QCertify builds QuantumHalon - a crypto-agile gateway for enterprise deployment. We are focused, deliberate, and technical.
                </p>
                <CTAButton href="/product" variant="secondary">Explore QuantumHalon</CTAButton>
              </div>
              <div className="glass-panel-heavy rounded-2xl p-8 text-center relative overflow-hidden">

                <div className="text-xs font-mono text-slate-500 uppercase tracking-widest mb-6">Our Focus</div>
                <div className="space-y-6">
                  <div>
                    <div className="text-5xl font-bold text-white mb-1">1</div>
                    <div className="text-slate-400 text-base">Product: QuantumHalon</div>
                  </div>
                  <div className="h-px bg-white/10" />
                  <div>
                    <div className="text-5xl font-bold text-white mb-1">1</div>
                    <div className="text-slate-400 text-base">Mission: Post-Quantum Protection</div>
                  </div>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 relative overflow-hidden border-t border-white/5">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-md h-80 bg-[#0ea5e9]/[0.04] rounded-full blur-[120px] pointer-events-none" />
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <FadeIn>
            <h2 className="text-3xl md:text-4xl text-white font-semibold tracking-tight mb-4">
              Quantum readiness cannot start too late.{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-[#0ea5e9]">Organizations need to act now.</span>
            </h2>
            <p className="text-slate-400 mb-8">QCertify helps them do it with practical, credible post-quantum protection.</p>
            <CTAButton href="/contact">Talk to QCertify</CTAButton>
          </FadeIn>
        </div>
      </section>
    </div>
  );
}







