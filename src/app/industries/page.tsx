"use client";

import React from "react";
import CTAButton from "@/components/CTAButton";
import {
  FadeIn,
  FeatureCard,
  ImagePanel,
  PageHero,
  SectionHeader,
} from "@/components/QuantumPage";
import { Building2, CheckCircle, Factory, HeartPulse, Landmark, Lock, RadioTower, ShieldCheck } from "lucide-react";

const industries = [
  {
    icon: Building2,
    title: "Financial services",
    pressure: "Transaction records, payment rails, institutional exchange, and private customer data have long confidentiality horizons.",
    outcome: "Deploy governed PQC protection on selected high-value traffic paths while broader application migration remains phased.",
  },
  {
    icon: Landmark,
    title: "Government and public sector",
    pressure: "Procurement timelines, national security expectations, and sensitive citizen or agency data create early migration pressure.",
    outcome: "Use inline protection to build evidence of practical transition without forcing every legacy system to change first.",
  },
  {
    icon: Factory,
    title: "Critical infrastructure and OT",
    pressure: "Operational networks often contain long-life systems that cannot be redesigned quickly or touched casually.",
    outcome: "Add path-level protection at network chokepoints while keeping endpoint behavior stable and exceptions explicit.",
  },
  {
    icon: HeartPulse,
    title: "Healthcare and life sciences",
    pressure: "Patient records, genomics, research data, and clinical exchange may remain sensitive for decades.",
    outcome: "Prioritize paths carrying long-lived medical data and support a gradual, auditable transition plan.",
  },
  {
    icon: RadioTower,
    title: "Advanced enterprise networks",
    pressure: "Distributed sites, cloud paths, partners, and hybrid environments create too many migration surfaces for a single big-bang rewrite.",
    outcome: "Protect the highest-value transit paths first and expand as policy readiness and operations mature.",
  },
];

export default function IndustriesPage() {
  return (
    <div className="min-h-screen bg-transparent selection:bg-white/30">
      <PageHero
        compact
        label="Industries"
        title="For organizations where data outlives today's encryption."
        body="QuantumHalon is designed for environments where sensitive traffic moves across networks that cannot all be redesigned at once."
        imageSrc="/images/industry-data-lifetime.png"
        imageAlt="Minimal isometric illustration of a protected data vault connected to finance, government, healthcare, and infrastructure symbols."
        chips={["Finance", "Government", "Critical infrastructure", "Healthcare", "Enterprise"]}
        primaryCta={{ href: "/contact", label: "Talk to QCertify" }}
        secondaryCta={{ href: "/use-cases", label: "Use Cases" }}
      />

      <section className="py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeader
            label="Market Fit"
            title="The common factor is not industry hype. It is data lifetime."
            body="Post-quantum risk matters first where captured data will still be valuable when future quantum capability arrives."
            align="center"
          />
          <div className="mt-10 space-y-4">
            {industries.map((industry, index) => (
              <FadeIn key={industry.title} delay={index * 0.04}>
                <div className="glass-panel rounded-lg p-5 lg:p-6">
                  <div className="grid gap-6 lg:grid-cols-[0.6fr_1fr_1fr] lg:items-center">
                    <div className="flex items-center gap-4">
                      <div className="flex h-12 w-12 items-center justify-center rounded-lg border border-[#0ea5e9]/30 bg-[#0ea5e9]/10 text-[#0ea5e9]">
                        <industry.icon className="h-6 w-6" />
                      </div>
                      <h2 className="text-lg font-semibold text-white">{industry.title}</h2>
                    </div>
                    <div className="rounded-lg border border-white/10 bg-black/35 p-4">
                      <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-slate-500">Pressure</div>
                      <p className="mt-2 text-sm leading-6 text-slate-400">{industry.pressure}</p>
                    </div>
                    <div className="rounded-lg border border-[#0ea5e9]/20 bg-[#0ea5e9]/[0.04] p-4">
                      <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#0ea5e9]/70">QuantumHalon outcome</div>
                      <p className="mt-2 text-sm leading-6 text-slate-300">{industry.outcome}</p>
                    </div>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-white/5 py-20 lg:py-28">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-2 lg:items-center lg:px-8">
          <FadeIn>
            <ImagePanel
              src="/images/long-lived-vault.png"
              alt="Minimal isometric illustration of a secure archive vault with data cubes and a confidentiality timeline."
              caption="Long-lived data changes the urgency"
            />
          </FadeIn>
          <div>
            <SectionHeader
              label="Executive Story"
              title="Quantum readiness becomes an operating program."
              body="Regulated buyers need more than a claim that PQC is supported. They need a phased plan, trust readiness, policy evidence, and a credible privacy boundary."
            />
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {[
                { icon: Lock, title: "Protect first", text: "Shield the most valuable traffic paths while deeper migrations continue." },
                { icon: ShieldCheck, title: "Govern clearly", text: "Make exceptions and denied paths visible to the program." },
                { icon: CheckCircle, title: "Prove progress", text: "Use deployment state, operational evidence, and policy records to show transition maturity." },
                { icon: Landmark, title: "Support procurement", text: "Tell a credible PQC story before regulations and buyers compress the timeline." },
              ].map((item, index) => (
                <FadeIn key={item.title} delay={index * 0.05}>
                  <FeatureCard icon={item.icon} title={item.title}>
                    {item.text}
                  </FeatureCard>
                </FadeIn>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden border-t border-white/5 py-24 lg:py-32">
        <div className="absolute inset-0 circuit-mask opacity-70" />
        <div className="relative z-10 mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <FadeIn>
            <SectionHeader label="Industry Fit" title="Start with the traffic your industry cannot afford to expose later." align="center" />
            <div className="mt-8">
              <CTAButton href="/contact">Discuss Your Industry</CTAButton>
            </div>
          </FadeIn>
        </div>
      </section>
    </div>
  );
}
