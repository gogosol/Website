"use client";
import React from "react";
import { motion } from "framer-motion";
import SectionLabel from "@/components/SectionLabel";
import CTAButton from "@/components/CTAButton";
import UseCaseTopology from "@/components/visuals/UseCaseTopology";

function FadeIn({ children, className = "", delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  return (
    <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-60px" }} transition={{ duration: 0.55, delay, ease: [0.25, 0.1, 0.25, 1] }} className={className}>
      {children}
    </motion.div>
  );
}

const useCases = [
  {
    variant: "site-to-site" as const,
    title: "Protecting traffic between sites",
    problem: "Data between facilities travels over vulnerable paths.",
    solution: "Gateway pairs apply stronger crypto at each boundary.",
    value: "No changes to applications at either site.",
  },
  {
    variant: "branch-to-core" as const,
    title: "Securing branch-to-datacenter connections",
    problem: "Branch offices carry sensitive data over shared links.",
    solution: "Central gateway deployment protects all branch traffic.",
    value: "Branches need no local upgrades.",
  },
  {
    variant: "cloud" as const,
    title: "Strengthening cloud connectivity",
    problem: "Traffic to cloud providers crosses external networks.",
    solution: "Gateway hardens crypto on cloud ingress/egress paths.",
    value: "No changes to cloud workloads.",
  },
  {
    variant: "partner" as const,
    title: "Hardening partner data exchange",
    problem: "Third-party data exchange paths carry sensitive information.",
    solution: "Gateway-level protection at organizational boundaries.",
    value: "DMZ-compatible, partner-transparent.",
  },
];

export default function UseCasesPage() {
  return (
    <div className="min-h-screen bg-transparent selection:bg-white/30">
      {/* Hero */}
      <section className="relative pt-28 pb-8 lg:pt-40 lg:pb-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-glow-orb w-[800px] h-[800px] bg-white top-[-200px] left-[-300px] opacity-10 hidden md:block" />
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="text-center max-w-3xl mx-auto relative z-10">
          <SectionLabel label="Use Cases" />
          <h1 className="text-4xl lg:text-6xl font-bold tracking-tight text-white mb-4 leading-[1.1]">
            Protecting traffic across{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-slate-400">the paths that matter most.</span>
          </h1>
        </motion.div>
      </section>

      {/* Use Cases with diagrams */}
      <section className="pb-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="space-y-8">
          {useCases.map((uc, i) => (
            <FadeIn key={i} delay={i * 0.05}>
              <div className="glass-panel rounded-2xl p-6 lg:p-8">
                <div className="grid lg:grid-cols-2 gap-8 items-center">
                  {/* Diagram */}
                  <div className={`${i % 2 === 1 ? "lg:order-2" : ""}`}>
                    <UseCaseTopology variant={uc.variant} className="!rounded-none !border-0 !bg-transparent !shadow-none !p-0 hover:!transform-none hover:!border-0 hover:!bg-transparent hover:!shadow-none" />
                  </div>
                  {/* Content */}
                  <div className={`${i % 2 === 1 ? "lg:order-1" : ""}`}>
                    <h2 className="text-xl font-semibold text-white mb-4">{uc.title}</h2>
                    <div className="space-y-3">
                      <div>
                        <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">Problem</div>
                        <p className="text-slate-400 text-sm">{uc.problem}</p>
                      </div>
                      <div>
                        <div className="text-[10px] font-bold text-[#0ea5e9] uppercase tracking-widest mb-1">Solution</div>
                        <p className="text-slate-300 text-sm">{uc.solution}</p>
                      </div>
                      <div>
                        <div className="text-[10px] font-bold text-white uppercase tracking-widest mb-1">Value</div>
                        <p className="text-slate-400 text-sm">{uc.value}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="py-28 relative overflow-hidden border-t border-white/5">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-md h-80 bg-white/[0.04] rounded-full blur-[120px] pointer-events-none" />
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <FadeIn>
            <h2 className="text-4xl md:text-5xl text-white font-semibold tracking-tight mb-4">Discuss your use case.</h2>
            <p className="text-lg text-slate-400 mb-8">Every environment is different. Let us show you how QuantumHalon fits.</p>
            <CTAButton href="/contact">Book a Demo</CTAButton>
          </FadeIn>
        </div>
      </section>
    </div>
  );
}
