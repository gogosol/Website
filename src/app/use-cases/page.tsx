"use client";
import React from "react";
import { motion } from "framer-motion";
import { Network, Building2, Shield, Server, GitBranch, Landmark } from "lucide-react";
import SectionLabel from "@/components/SectionLabel";
import CTAButton from "@/components/CTAButton";

function FadeIn({ children, className = "", delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  return (
    <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-60px" }} transition={{ duration: 0.55, delay, ease: [0.25, 0.1, 0.25, 1] }} className={className}>
      {children}
    </motion.div>
  );
}

const useCases = [
  {
    icon: Network,
    title: "Protecting traffic between sites",
    problem: "Data moving between data centers, headquarters, and remote facilities travels over networks that may be subject to interception. Classical cryptographic protection on these paths may be vulnerable to future compromise — especially for data with long-term sensitivity.",
    solution: "QuantumHalon gateways are deployed at each site boundary. Traffic between sites is wrapped in stronger cryptographic protection — including hybrid or post-quantum methods — before it enters the network. Destination gateways unwrap and deliver the traffic to internal systems unchanged.",
    value: "No changes to applications at either site. No disruption to internal services. Protection is applied at the boundary, transparent to everything behind it.",
  },
  {
    icon: Building2,
    title: "Securing branch-to-datacenter connections",
    problem: "Branch offices connect to centralized infrastructure over links that carry sensitive data — financial records, customer information, operational data. Upgrading each branch's cryptographic stack individually is operationally prohibitive.",
    solution: "Deploy QuantumHalon gateways at the datacenter and at branch aggregation points. All branch-to-core traffic is cryptographically strengthened without touching branch-side applications or hardware.",
    value: "Centralized deployment and management. Branches do not need local upgrades, reducing the operational burden of transition across distributed environments.",
  },
  {
    icon: Shield,
    title: "Strengthening inbound and outbound traffic protection",
    problem: "Sensitive data leaving an organization — to partners, customers, cloud services, or regulatory bodies — is exposed to interception on external networks. Similarly, inbound data paths may carry critical information that warrants stronger protection.",
    solution: "QuantumHalon gateways harden the cryptographic protection on data entering and leaving the organization. By sitting at the network edge, they ensure sensitive traffic is protected with the strongest available methods before it touches external networks.",
    value: "Strengthens the organization's perimeter protection posture without requiring external parties to change their systems — provided corresponding gateway capability exists at the destination.",
  },
  {
    icon: Server,
    title: "Introducing post-quantum protection without full overhaul",
    problem: "Most enterprise environments run a complex mix of legacy and modern systems. Upgrading every application, library, and protocol to support post-quantum algorithms is a multi-year effort that most organizations cannot begin in full today.",
    solution: "QuantumHalon provides an overlay of post-quantum protection at the network layer, independent of application-layer cryptography. Organizations begin using hybrid or post-quantum methods on their most sensitive paths today, while application-level migration proceeds on a longer timeline.",
    value: "Delivers immediate risk reduction. Creates a protected baseline while broader cryptographic upgrades are planned, budgeted, and executed incrementally.",
  },
  {
    icon: Landmark,
    title: "Supporting phased transition in regulated infrastructure",
    problem: "Regulated organizations — in finance, healthcare, government — face increasing expectations to demonstrate cryptographic transition readiness. But regulatory environments also demand controlled, governed change processes. Moving too fast without governance creates as much risk as moving too slowly.",
    solution: "QuantumHalon's phased deployment model aligns with controlled change management processes. Organizations can protect regulated traffic paths first, document the transition, and expand coverage according to governance timelines — not emergency reactions.",
    value: "Supports regulatory readiness without disrupting regulated services. Provides a documented, governed path that compliance and audit functions can reference.",
  },
];

export default function UseCasesPage() {
  return (
    <div className="min-h-screen bg-transparent selection:bg-white/30">
      {/* Hero */}
      <section className="relative pt-32 pb-20 lg:pt-44 lg:pb-28 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-glow-orb w-[800px] h-[800px] bg-white top-[-200px] left-[-300px] opacity-10 hidden md:block" />
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="max-w-3xl relative z-10">
          <SectionLabel label="Use Cases" />
          <h1 className="text-4xl lg:text-6xl font-bold tracking-tight text-white mb-6 leading-[1.1]">
            Protecting traffic across{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-slate-400">the paths that matter most.</span>
          </h1>
          <p className="text-lg lg:text-xl text-slate-300 max-w-2xl leading-relaxed font-light">
            QuantumHalon deploys where organizations need stronger cryptographic protection — between sites, across distributed environments, and along the paths carrying long-lived sensitive data.
          </p>
        </motion.div>
      </section>

      {/* Use Cases */}
      <section className="pb-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="space-y-8">
          {useCases.map((uc, i) => (
            <FadeIn key={i} delay={i * 0.05}>
              <div className="glass-panel rounded-2xl p-8 lg:p-10">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center">
                    <uc.icon className="w-6 h-6 text-[#0ea5e9]" />
                  </div>
                  <h2 className="text-2xl font-semibold text-white">{uc.title}</h2>
                </div>
                <div className="grid lg:grid-cols-3 gap-8">
                  <div>
                    <div className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-3">The Problem</div>
                    <p className="text-slate-400 text-sm leading-relaxed">{uc.problem}</p>
                  </div>
                  <div>
                    <div className="text-xs font-bold text-[#0ea5e9] uppercase tracking-widest mb-3">How QuantumHalon Helps</div>
                    <p className="text-slate-300 text-sm leading-relaxed">{uc.solution}</p>
                  </div>
                  <div>
                    <div className="text-xs font-bold text-white uppercase tracking-widest mb-3">Operational Value</div>
                    <p className="text-slate-400 text-sm leading-relaxed">{uc.value}</p>
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
            <h2 className="text-4xl md:text-6xl text-white font-semibold tracking-tight mb-6">Discuss your use case with QCertify.</h2>
            <p className="text-xl text-slate-400 mb-10 max-w-2xl mx-auto">Every environment is different. Let us walk you through how QuantumHalon fits your specific traffic protection requirements.</p>
            <CTAButton href="/contact">Book a Demo</CTAButton>
          </FadeIn>
        </div>
      </section>
    </div>
  );
}
