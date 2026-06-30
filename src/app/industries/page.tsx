"use client";

import React from "react";
import {
  ClosingCta,
  FadeIn,
  FeatureCard,
  ImagePanel,
  PageHero,
  SectionHeader,
} from "@/components/QuantumPage";
import { CheckCircle, Landmark, Lock, ShieldCheck } from "lucide-react";

const industries = [
  {
    title: "Financial services",
    pressure: "Transaction records, payment rails, institutional exchange, and private customer data have long confidentiality horizons.",
    outcome: "Deploy governed PQC protection on selected high-value traffic paths while broader application migration remains phased.",
  },
  {
    title: "Government and public sector",
    pressure: "Procurement timelines, national security expectations, and sensitive citizen or agency data create early migration pressure.",
    outcome: "Use inline protection to build evidence of practical transition without forcing every legacy system to change first.",
  },
  {
    title: "Critical infrastructure and OT",
    pressure: "Operational networks often contain long-life systems that cannot be redesigned quickly or touched casually.",
    outcome: "Add path-level protection at network chokepoints while keeping endpoint behavior stable and exceptions explicit.",
  },
  {
    title: "Healthcare and life sciences",
    pressure: "Patient records, genomics, research data, and clinical exchange may remain sensitive for decades.",
    outcome: "Prioritize paths carrying long-lived medical data and support a gradual, auditable transition plan.",
  },
  {
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
        imageSrc="/images/generated/industries-data-lifetime-plate.webp"
        imageAlt="Decorative monochrome technical plate representing long-lived data across a time horizon."
        plateCaption="Data lifetime determines where quantum pressure starts"
        chips={["Finance", "Government", "Critical infrastructure", "Healthcare", "Enterprise"]}
        primaryCta={{ href: "/contact", label: "Technical Consultation" }}
        secondaryCta={{ href: "/use-cases", label: "Use Cases" }}
        textMotion="slide-left"
        imageMotion="scale"
      />

      <section className="py-20 lg:py-28">
        <div className="editorial-wrap">
          <SectionHeader
            label="Market Fit"
            title="The common factor is not industry hype. It is data lifetime."
            body="Post-quantum risk matters first where captured data will still be valuable when future quantum capability arrives."
            align="center"
            motionStyle="slide-left"
          />
          <div className="mt-12 border-y border-black/10">
            <div className="hidden grid-cols-[0.58fr_1fr_1fr] border-b border-black/10 px-4 py-3 text-[9px] uppercase leading-4 text-black/[0.45] lg:grid">
              <span>Industry</span>
              <span>Pressure</span>
              <span>Transition outcome</span>
            </div>
            {industries.map((industry, index) => (
              <FadeIn key={industry.title} delay={index * 0.04} motionStyle={index % 2 === 0 ? "slide-right" : "slide-left"}>
                <div className="grid gap-5 border-b border-black/10 px-4 py-7 last:border-b-0 lg:grid-cols-[0.58fr_1fr_1fr] lg:gap-8">
                  <div>
                    <div className="text-[10px] font-semibold uppercase text-[#126dff]">
                      {String(index + 1).padStart(2, "0")}
                    </div>
                    <h2 className="mt-3 max-w-sm text-xl font-semibold leading-tight text-black">{industry.title}</h2>
                  </div>
                  <div>
                    <div className="text-[10px] font-semibold uppercase text-black/[0.42] lg:hidden">Pressure</div>
                    <p className="mt-2 text-sm leading-6 text-black/[0.58] lg:mt-0">{industry.pressure}</p>
                  </div>
                  <div className="border-l border-[#126dff]/25 pl-4">
                    <div className="text-[10px] font-semibold uppercase text-[#126dff] lg:hidden">Transition outcome</div>
                    <p className="mt-2 text-sm leading-6 text-black/[0.64] lg:mt-0">{industry.outcome}</p>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-black/10 py-20 lg:py-28">
        <div className="editorial-wrap grid gap-10 lg:grid-cols-2 lg:items-center">
          <FadeIn>
            <ImagePanel
              src="/images/generated/industries-archive-vault-plate.webp"
              alt="Decorative monochrome technical plate showing a protected long-lived archive vault."
              caption="Long-lived records change the urgency curve"
              motionStyle="clip-up"
              imageMotion="scale"
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

      <ClosingCta
        label="Industry Fit"
        title="Prioritize traffic that regulated industries cannot afford to expose later."
        actions={[{ href: "/contact", label: "Discuss Industry Fit" }]}
        motionStyle="slide-left"
      />
    </div>
  );
}
