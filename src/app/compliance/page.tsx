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
import { ClipboardCheck, FileCheck2, KeyRound, ListChecks, RefreshCw, ShieldCheck, SlidersHorizontal, TimerReset } from "lucide-react";

const readinessSteps = [
  {
    icon: ListChecks,
    title: "Inventory cryptographic exposure",
    text: "Identify systems, services, data flows, trust dependencies, and paths carrying long-lived sensitive data.",
  },
  {
    icon: SlidersHorizontal,
    title: "Prioritize traffic paths",
    text: "Select paths where HNDL risk, regulatory pressure, or operational sensitivity justify early protection.",
  },
  {
    icon: KeyRound,
    title: "Plan trust readiness",
    text: "For mediated protection, prepare required trust through centralized enterprise processes before activation.",
  },
  {
    icon: RefreshCw,
    title: "Stage crypto-agile controls",
    text: "Use policy to choose protected, exception, or denied paths rather than baking assumptions into apps.",
  },
  {
    icon: ClipboardCheck,
    title: "Collect evidence",
    text: "Track deployment state, mode activation, gateway health, operational signals, and exception decisions.",
  },
  {
    icon: FileCheck2,
    title: "Prepare assurance packages",
    text: "Turn technical progress into material that security, risk, procurement, and auditors can understand.",
  },
];

export default function CompliancePage() {
  return (
    <div className="min-h-screen bg-transparent selection:bg-white/30">
      <PageHero
        compact
        label="Post-Quantum Readiness"
        title="Post-quantum readiness is becoming a procurement and governance issue."
        body="QCertify helps organizations turn PQC from a future research topic into a controlled migration program with protected paths, explicit policy, and evidence."
        imageSrc="/images/readiness-roadmap.png"
        imageAlt="Minimal isometric illustration of a secure gateway connected to a readiness roadmap, checklist, and evidence folder."
        chips={["NIST PQC", "CNSA 2.0 pressure", "HNDL risk", "Crypto agility"]}
        primaryCta={{ href: "/contact", label: "Plan Readiness" }}
        secondaryCta={{ href: "/resources", label: "Resources" }}
      />

      <section className="py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeader
            label="Readiness Program"
            title="The work is bigger than choosing a crypto profile."
            body="A credible PQC transition needs inventory, traffic prioritization, trust readiness, policy governance, exception decisions, and evidence that protected paths are actually protected."
            align="center"
          />
          <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {readinessSteps.map((step, index) => (
              <FadeIn key={step.title} delay={index * 0.04}>
                <FeatureCard icon={step.icon} title={step.title}>
                  {step.text}
                </FeatureCard>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-white/5 py-20 lg:py-28">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-2 lg:items-center lg:px-8">
          <FadeIn>
            <ImagePanel
              src="/images/hndl-field.png"
              alt="Minimal isometric illustration showing stored captured data and protected traffic."
              caption="Readiness begins with data lifetime"
            />
          </FadeIn>
          <div>
            <SectionHeader
              label="Why Now"
              title="Migration pressure arrives before quantum decryption does."
              body="The risk is not only the future quantum computer. It is today's collection of traffic whose confidentiality must survive into that future."
            />
            <div className="mt-8 space-y-3">
              {[
                "NIST has standardized the first post-quantum cryptography families, moving the discussion from research to implementation planning.",
                "Government and regulated buyers increasingly expect a defensible transition plan, not a one-line vendor claim.",
                "Harvest Now, Decrypt Later risk prioritizes data with long retention and high confidentiality value.",
                "Crypto agility helps organizations adapt as standards, profiles, and procurement rules mature.",
              ].map((item) => (
                <div key={item} className="flex gap-3 rounded-lg border border-white/10 bg-white/[0.03] p-4">
                  <ShieldCheck className="mt-0.5 h-4 w-4 flex-shrink-0 text-[#0ea5e9]" />
                  <p className="text-sm leading-6 text-slate-300">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeader
            label="What QCertify Supports"
            title="Practical controls that fit a governed transition."
            align="center"
          />
          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {[
              { icon: TimerReset, title: "Phased deployment", text: "Protect the highest-risk paths first, then expand with evidence rather than rushing every system." },
              { icon: RefreshCw, title: "Crypto agility", text: "Let policy govern protection lifecycle, transition rules, and explicit exceptions." },
              { icon: ClipboardCheck, title: "Evidence for stakeholders", text: "Turn deployment health, trust readiness, and policy changes into a credible readiness story." },
            ].map((item, index) => (
              <FadeIn key={item.title} delay={index * 0.06}>
                <FeatureCard icon={item.icon} title={item.title}>
                  {item.text}
                </FeatureCard>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden border-t border-white/5 py-24 lg:py-32">
        <div className="absolute inset-0 circuit-mask opacity-70" />
        <div className="relative z-10 mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <FadeIn>
            <SectionHeader label="Readiness Planning" title="Start with the paths your audit story cannot ignore." align="center" />
            <div className="mt-8">
              <CTAButton href="/contact">Discuss Readiness</CTAButton>
            </div>
          </FadeIn>
        </div>
      </section>
    </div>
  );
}
