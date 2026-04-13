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

/* Mini topology for each industry */
function IndustryTopology({ type }: { type: string }) {
  const configs: Record<string, { nodes: string[]; pattern: string }> = {
    finance: { nodes: ["Banks", "Trading", "Clearance"], pattern: "Inter-institution traffic" },
    healthcare: { nodes: ["Hospital", "Clinic", "Research"], pattern: "Patient data transit" },
    government: { nodes: ["Agency", "Dept", "Classified"], pattern: "Sovereign communications" },
    infrastructure: { nodes: ["Control", "Remote", "SCADA"], pattern: "OT/ICS paths" },
    enterprise: { nodes: ["HQ", "Branch", "Cloud"], pattern: "Distributed transit" },
  };
  const cfg = configs[type] || configs.enterprise;

  return (
    <svg viewBox="0 0 240 80" fill="none" className="w-full h-auto" aria-hidden="true">
      {cfg.nodes.map((n, i) => (
        <g key={i}>
          <rect x={10 + i * 80} y="10" width="55" height="28" rx="6" fill="rgba(255,255,255,0.04)" stroke="rgba(255,255,255,0.12)" />
          <text x={37 + i * 80} y="28" textAnchor="middle" fill="rgba(255,255,255,0.4)" fontSize="7" fontFamily="monospace">{n}</text>
          {i < cfg.nodes.length - 1 && (
            <line x1={65 + i * 80} y1="24" x2={10 + (i + 1) * 80} y2="24" stroke="rgba(14,165,233,0.3)" strokeWidth="1.5" strokeDasharray="3 3" className="anim-flow-dash" />
          )}
        </g>
      ))}
      {/* Gateway label */}
      <rect x="70" y="50" width="100" height="22" rx="4" fill="rgba(14,165,233,0.06)" stroke="rgba(14,165,233,0.2)" strokeDasharray="3 3" />
      <text x="120" y="64" textAnchor="middle" fill="rgba(14,165,233,0.5)" fontSize="6" fontFamily="monospace" letterSpacing="1">{cfg.pattern}</text>
    </svg>
  );
}

const industries = [
  { key: "finance", icon: Building2, title: "Financial Services", tagline: "Data with decades of sensitivity.", benefits: ["Inter-institution traffic protection", "Regulatory readiness", "Governed migration"] },
  { key: "healthcare", icon: Heart, title: "Healthcare", tagline: "Patient data cannot be un-compromised.", benefits: ["HIPAA-compatible deployment", "Cross-facility protection", "Clinical system continuity"] },
  { key: "government", icon: Landmark, title: "Government", tagline: "Sovereign data. Mandated timelines.", benefits: ["Classification-level deployment", "Agency-by-agency rollout", "Mandate alignment"] },
  { key: "infrastructure", icon: Factory, title: "Critical Infrastructure", tagline: "Protecting systems society depends on.", benefits: ["OT/ICS compatible gateway", "No legacy system changes", "Long-lifecycle alignment"] },
  { key: "enterprise", icon: Briefcase, title: "Enterprise", tagline: "Complex, distributed, hybrid.", benefits: ["Multi-site coverage", "Cloud + on-prem paths", "Phased enterprise rollout"] },
];

export default function IndustriesPage() {
  return (
    <div className="min-h-screen bg-transparent selection:bg-white/30">
      {/* Hero */}
      <section className="relative pt-28 pb-8 lg:pt-40 lg:pb-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-glow-orb w-[800px] h-[800px] bg-white top-[-200px] right-[-300px] opacity-10 hidden md:block" />
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="text-center max-w-3xl mx-auto relative z-10">
          <SectionLabel label="Industries" />
          <h1 className="text-4xl lg:text-6xl font-bold tracking-tight text-white mb-4 leading-[1.1]">
            Purpose-built for{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-slate-400">high-stakes industries.</span>
          </h1>
        </motion.div>
      </section>

      {/* Industry cards with mini topologies */}
      <section className="pb-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="space-y-6">
          {industries.map((ind, i) => (
            <FadeIn key={i} delay={i * 0.05}>
              <div className="glass-panel rounded-2xl p-6 lg:p-8">
                <div className="grid lg:grid-cols-3 gap-6 items-center">
                  {/* Icon + text */}
                  <div>
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center">
                        <ind.icon className="w-5 h-5 text-[#0ea5e9]" />
                      </div>
                      <div>
                        <h2 className="text-lg font-semibold text-white">{ind.title}</h2>
                        <p className="text-slate-400 text-xs">{ind.tagline}</p>
                      </div>
                    </div>
                  </div>
                  {/* Mini topology */}
                  <div>
                    <IndustryTopology type={ind.key} />
                  </div>
                  {/* Benefits */}
                  <div className="space-y-2">
                    {ind.benefits.map((b, j) => (
                      <div key={j} className="flex items-center gap-2">
                        <CheckCircle className="w-3.5 h-3.5 text-[#0ea5e9] flex-shrink-0" />
                        <span className="text-slate-300 text-xs">{b}</span>
                      </div>
                    ))}
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
            <h2 className="text-4xl md:text-5xl text-white font-semibold tracking-tight mb-4">See how QCertify supports your industry.</h2>
            <CTAButton href="/contact">Book a Demo</CTAButton>
          </FadeIn>
        </div>
      </section>
    </div>
  );
}
