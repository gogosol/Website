"use client";
import React from "react";
import { motion } from "framer-motion";
import { BookOpen, Shield, RefreshCw, Server, FileText, ArrowRight } from "lucide-react";
import SectionLabel from "@/components/SectionLabel";
import CTAButton from "@/components/CTAButton";

function FadeIn({ children, className = "", delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  return (
    <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-60px" }} transition={{ duration: 0.55, delay, ease: [0.25, 0.1, 0.25, 1] }} className={className}>
      {children}
    </motion.div>
  );
}

const categories = [
  {
    category: "Understanding the Risk",
    icon: Shield,
    articles: [
      {
        title: "What Is Harvest Now, Decrypt Later?",
        desc: "A clear, practical explanation of the HNDL threat model - why data captured today is at risk from future decryption capabilities.",
        tag: "Threat Model",
      },
      {
        title: "Why Post-Quantum Risk Is a Present Problem, Not a Future One",
        desc: "Reframing the timeline: current-day collection, long-lived data sensitivity, and the urgency of beginning transition now.",
        tag: "Risk Assessment",
      },
      {
        title: "The Cost of Waiting: Why Deferred Migration Increases Risk",
        desc: "The compounding operational cost of delayed cryptographic transition - from compressed timelines to reactive upgrades.",
        tag: "Strategy",
      },
    ],
  },
  {
    category: "Crypto Agility & Migration",
    icon: RefreshCw,
    articles: [
      {
        title: "What Is Crypto Agility and Why Does It Matter?",
        desc: "Defining crypto agility, explaining why a single algorithm choice is insufficient, and why adaptable cryptography is the foundation.",
        tag: "Fundamentals",
      },
      {
        title: "Why Post-Quantum Migration Will Be Phased",
        desc: "Why the transition will take years, why it must be incremental, and what phased migration looks like in practice.",
        tag: "Migration",
      },
      {
        title: "Hybrid Cryptography: Running Classical and Post-Quantum Together",
        desc: "The role and mechanics of hybrid cryptographic approaches during the transition period - compatibility without compromise.",
        tag: "Technical",
      },
    ],
  },
  {
    category: "Architecture & Deployment",
    icon: Server,
    articles: [
      {
        title: "How Gateway-Based Protection Supports Transition Readiness",
        desc: "Explaining the gateway deployment model and why it reduces migration complexity for enterprise environments.",
        tag: "Architecture",
      },
      {
        title: "Protecting Traffic Without Redesigning Applications",
        desc: "The value of network-layer protection versus application-layer changes - and when each approach is appropriate.",
        tag: "Deployment",
      },
      {
        title: "How Organizations Can Prepare Without Redesigning Everything",
        desc: "Practical guidance on starting the cryptographic transition with existing infrastructure, without waiting for a clean-sheet redesign.",
        tag: "Guide",
      },
    ],
  },
  {
    category: "Governance & Compliance",
    icon: FileText,
    articles: [
      {
        title: "Cryptographic Readiness as a Governance Priority",
        desc: "Why boards and CISOs should treat cryptographic transition as a strategic initiative - not a technical footnote.",
        tag: "Governance",
      },
      {
        title: "Aligning Post-Quantum Transition with Regulatory Expectations",
        desc: "An overview of the emerging regulatory landscape and how organizations can align transition efforts with compliance timelines.",
        tag: "Compliance",
      },
    ],
  },
];

export default function ResourcesPage() {
  return (
    <div className="min-h-screen bg-transparent selection:bg-white/30">
      {/* Hero */}
      <section className="relative pt-32 pb-20 lg:pt-44 lg:pb-28 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-glow-orb w-[800px] h-[800px] bg-white top-[-200px] right-[-300px] opacity-10 hidden md:block" />
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="max-w-3xl relative z-10">
          <SectionLabel label="Resources" />
          <h1 className="text-4xl lg:text-6xl font-bold tracking-tight text-white mb-6 leading-[1.1]">
            Understanding the{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-slate-400">cryptographic transition.</span>
          </h1>
          <p className="text-lg lg:text-xl text-slate-300 max-w-2xl leading-relaxed font-light">
            Knowledge, perspective, and practical guidance on the challenges organizations face as cryptographic protection evolves.
          </p>
        </motion.div>
      </section>

      {/* Resource categories */}
      <section className="pb-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="space-y-16">
          {categories.map((cat, ci) => (
            <FadeIn key={ci}>
              <div>
                <div className="flex items-center gap-3 mb-8">
                  <cat.icon className="w-6 h-6 text-[#0ea5e9]" />
                  <h2 className="text-2xl font-semibold text-white">{cat.category}</h2>
                </div>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {cat.articles.map((article, ai) => (
                    <div
                      key={ai}
                      className="glass-panel glass-interactive rounded-xl p-6 group flex flex-col h-full cursor-pointer"
                    >
                      <div className="inline-flex items-center px-2.5 py-1 rounded-md bg-white/5 border border-white/10 text-xs font-bold text-slate-400 uppercase tracking-widest mb-4 self-start">
                        {article.tag}
                      </div>
                      <h3 className="text-white font-medium text-lg mb-3 group-hover:text-[#0ea5e9] transition-colors leading-snug">
                        {article.title}
                      </h3>
                      <p className="text-slate-400 text-sm leading-relaxed flex-1">
                        {article.desc}
                      </p>
                      <div className="flex items-center gap-1 mt-4 text-sm text-slate-500 group-hover:text-[#0ea5e9] transition-colors">
                        <span>Coming soon</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </div>
                    </div>
                  ))}
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
            <h2 className="text-4xl md:text-6xl text-white font-semibold tracking-tight mb-6">Have a question about post-quantum transition?</h2>
            <p className="text-xl text-slate-400 mb-10 max-w-2xl mx-auto">Our team is here to discuss your specific challenges and requirements.</p>
            <CTAButton href="/contact">Talk to QCertify</CTAButton>
          </FadeIn>
        </div>
      </section>
    </div>
  );
}

