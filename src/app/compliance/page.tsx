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
import { ClipboardCheck, ExternalLink, FileCheck2, KeyRound, ListChecks, RefreshCw, SlidersHorizontal, TimerReset } from "lucide-react";

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
    text: "Track deployment state, protected-path coverage, operational signals, and exception decisions.",
  },
  {
    icon: FileCheck2,
    title: "Prepare assurance packages",
    text: "Turn technical progress into material that security, risk, procurement, and auditors can understand.",
  },
];

const policyMilestones = [
  {
    date: "Aug 2024",
    title: "NIST standards approved",
    text: "The first federal post-quantum cryptography standards moved the market from research into implementation planning.",
    source: "NIST CSRC",
    href: "https://csrc.nist.gov/news/2024/postquantum-cryptography-fips-approved",
  },
  {
    date: "May 2023 + annually",
    title: "U.S. federal inventory cadence",
    text: "OMB M-23-02 directed agencies to submit prioritized cryptographic inventories by May 4, 2023 and annually thereafter.",
    source: "OMB M-23-02",
    href: "https://www.whitehouse.gov/wp-content/uploads/2022/11/M-23-02-M-Memo-on-Migrating-to-Post-Quantum-Cryptography.pdf",
  },
  {
    date: "End 2026",
    title: "EU transition starts",
    text: "EU Member States should begin their transition to post-quantum cryptography by the end of 2026.",
    source: "European Commission",
    href: "https://digital-strategy.ec.europa.eu/en/news/eu-reinforces-its-cybersecurity-post-quantum-cryptography",
  },
  {
    date: "Jan 1 2027",
    title: "NSS new acquisitions",
    text: "NSA/CNSSP 15 expects new National Security System acquisitions to be CNSA 2.0 compliant unless otherwise noted.",
    source: "NSA CNSA 2.0 FAQ",
    href: "https://media.defense.gov/2022/Sep/07/2003071836/-1/-1/0/CSI_CNSA_2.0_FAQ_.PDF",
  },
  {
    date: "Dec 31 2030",
    title: "Critical paths cannot wait",
    text: "The EU roadmap targets critical infrastructure transition no later than 2030; NSA also sets a 2030 phase-out milestone for unsupported NSS equipment and services.",
    source: "EU / NSA",
    href: "https://digital-strategy.ec.europa.eu/en/library/coordinated-implementation-roadmap-transition-post-quantum-cryptography",
  },
  {
    date: "Dec 31 2031 / 2035",
    title: "Mandates and end-state goals",
    text: "NSA/CNSSP 15 sets a 2031 mandate for NSS use unless otherwise noted, aligned to the U.S. 2035 quantum-resistance goal.",
    source: "NSA CNSA 2.0 FAQ",
    href: "https://media.defense.gov/2022/Sep/07/2003071836/-1/-1/0/CSI_CNSA_2.0_FAQ_.PDF",
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
        chips={["NIST 2024", "EU 2026 / 2030", "NSS 2027+", "2035 goal"]}
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
              src="/images/pqc-deadline-pressure.png"
              alt="Minimal isometric illustration of a calendar, checklist, protected data stream, shield, and distant quantum risk."
              caption="Policy pressure is already calendar-driven"
            />
          </FadeIn>
          <div>
            <SectionHeader
              label="Real Deadlines"
              title="The PQC calendar is no longer theoretical."
              body="QCertify helps organizations translate public-sector and regulated-market milestones into practical readiness work: inventory exposure, protect priority paths, and produce evidence before deadlines compress the program."
            />
            <div className="mt-8 grid gap-3 sm:grid-cols-2">
              {policyMilestones.map((item) => (
                <a
                  key={`${item.date}-${item.title}`}
                  href={item.href}
                  target="_blank"
                  rel="noreferrer"
                  className="group rounded-lg border border-white/10 bg-white/[0.03] p-4 transition-colors hover:border-[#0ea5e9]/45 hover:bg-[#0ea5e9]/[0.06]"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#0ea5e9]">{item.date}</div>
                    <ExternalLink className="mt-0.5 h-3.5 w-3.5 flex-shrink-0 text-slate-600 transition-colors group-hover:text-[#0ea5e9]" />
                  </div>
                  <h3 className="mt-2 text-sm font-semibold text-white">{item.title}</h3>
                  <p className="mt-2 text-xs leading-5 text-slate-400">{item.text}</p>
                  <div className="mt-3 font-mono text-[9px] uppercase tracking-[0.18em] text-slate-600">{item.source}</div>
                </a>
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
              { icon: ClipboardCheck, title: "Evidence for stakeholders", text: "Turn deployment health, trust readiness, and policy changes into a credible readiness story for buyers, auditors, and boards." },
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
