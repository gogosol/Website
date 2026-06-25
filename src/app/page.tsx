"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import CTAButton from "@/components/CTAButton";
import {
  FadeIn,
  FeatureCard,
  ImagePanel,
  InlineGatewayVisual,
  LinkCard,
  PrivacyBoundary,
  SectionHeader,
  StatStrip,
  audienceCards,
  homeCapabilities,
  migrationSteps,
} from "@/components/QuantumPage";
import SectionLabel from "@/components/SectionLabel";
import { CheckCircle, ClipboardCheck, Network, Radar, ShieldCheck } from "lucide-react";

const qcertifyApproach = [
  {
    icon: Radar,
    title: "Find the pressure",
    text: "Start with data lifetime, regulated paths, and procurement expectations instead of abstract quantum fear.",
  },
  {
    icon: ShieldCheck,
    title: "Protect what matters",
    text: "Use practical PQC solutions where risk is highest while broader application migration continues.",
  },
  {
    icon: ClipboardCheck,
    title: "Prove the program",
    text: "Turn deployment progress, trust readiness, and policy decisions into evidence stakeholders can understand.",
  },
  {
    icon: Network,
    title: "Keep options open",
    text: "Build for crypto agility so transition choices can evolve as standards, buyers, and infrastructure mature.",
  },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-transparent selection:bg-white/30">
      <HomeHero />

      <section className="border-b border-white/5 py-10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <StatStrip
            stats={[
              { value: "QCertify", label: "Post-quantum cybersecurity organization" },
              { value: "QuantumHalon", label: "First solution: inline gateway protection" },
              { value: "Evidence", label: "Readiness for procurement and governance" },
              { value: "Agility", label: "Structured migration as standards mature" },
            ]}
          />
        </div>
      </section>

      <section className="py-20 lg:py-28">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-2 lg:items-center lg:px-8">
          <div>
            <SectionHeader
              label="The Risk"
              title="Harvest Now, Decrypt Later is a QCertify problem today."
              body="Traffic captured today can remain valuable for years. QCertify builds PQC solutions that help organizations act before every application, vendor, and compliance workflow is ready at the same time."
            />
            <div className="mt-8 grid gap-3">
              {[
                "Prioritize paths where data sensitivity outlives current cryptography.",
                "Apply stronger protection without waiting for every app owner to migrate.",
                "Show a governed, phased response to quantum-era procurement pressure.",
              ].map((item) => (
                <div key={item} className="flex gap-3 rounded-lg border border-white/10 bg-white/[0.03] p-4">
                  <CheckCircle className="mt-0.5 h-4 w-4 flex-shrink-0 text-[#0ea5e9]" />
                  <p className="text-sm leading-6 text-slate-300">{item}</p>
                </div>
              ))}
            </div>
          </div>
          <FadeIn delay={0.1}>
            <ImagePanel
              src="/images/hndl-capture-window.png"
              alt="Minimal isometric illustration showing a normal computer storing blue encrypted data in a jar, then a future quantum computer decrypting it into orange exposed data."
              caption="Store encrypted traffic now. Break it later."
            />
          </FadeIn>
        </div>
      </section>

      <section className="border-y border-white/5 py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeader
            label="First Solution"
            title="QuantumHalon is QCertify's inline gateway for traffic that cannot wait."
            body="QCertify is the organization. QuantumHalon is the first solution: an inline gateway that applies governed post-quantum protection to selected enterprise paths while applications continue operating."
            align="center"
          />
          <FadeIn delay={0.1} className="mt-10">
            <InlineGatewayVisual />
          </FadeIn>
          <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {homeCapabilities.map((cap, index) => (
              <FadeIn key={cap.title} delay={index * 0.05}>
                <FeatureCard icon={cap.icon} title={cap.title}>
                  {cap.text}
                </FeatureCard>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeader
            label="QCertify Method"
            title="A practical PQC program needs more than a standards slide."
            body="QCertify separates the transition into work the business can actually execute: understand exposure, protect priority paths, produce evidence, and keep the migration adaptable."
            align="center"
          />
          <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {qcertifyApproach.map((item, index) => (
              <FadeIn key={item.title} delay={index * 0.05}>
                <FeatureCard icon={item.icon} title={item.title}>
                  {item.text}
                </FeatureCard>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-white/5 py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeader
            label="Privacy Boundary"
            title="Governance stays separate from live traffic."
            body="QuantumHalon is built around a clean boundary between live packet handling and QCertify governance services."
            align="center"
          />
          <div className="mt-10">
            <PrivacyBoundary />
          </div>
        </div>
      </section>

      <section className="py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
            <SectionHeader
              label="Structured Migration"
              title="Crypto agility without a big-bang rewrite."
              body="QCertify helps teams protect the highest-risk paths first, then expand coverage as trust readiness, policy, testing, and governance mature."
            />
            <div className="grid gap-4 md:grid-cols-2">
              {migrationSteps.map((step, index) => (
                <FadeIn key={step.title} delay={index * 0.05}>
                  <div className="h-full rounded-lg border border-white/10 bg-white/[0.03] p-5">
                    <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#0ea5e9]">Step {index + 1}</div>
                    <h3 className="mt-3 text-base font-semibold text-white">{step.title}</h3>
                    <p className="mt-2 text-sm leading-6 text-slate-400">{step.text}</p>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-white/5 py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeader
            label="Who It Helps"
            title="Built for teams protecting traffic with long-lived value."
            align="center"
          />
          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {audienceCards.map((card, index) => (
              <FadeIn key={card.title} delay={index * 0.06}>
                <FeatureCard icon={card.icon} title={card.title}>
                  {card.text}
                </FeatureCard>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-4 md:grid-cols-3">
            <LinkCard href="/product" title="Explore QuantumHalon" text="See QCertify's first solution for inline post-quantum protection on selected enterprise paths." />
            <LinkCard href="/use-cases" title="Explore use cases" text="Understand where path-level PQC protection can reduce long-lived traffic exposure." />
            <LinkCard href="/compliance" title="Plan readiness" text="Frame PQC transition as a governed program with evidence, trust readiness, and real policy milestones." />
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden border-t border-white/5 py-24 lg:py-32">
        <div className="absolute inset-0 circuit-mask opacity-70" />
        <div className="relative z-10 mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <FadeIn>
            <SectionLabel label="Next Step" />
            <h2 className="mt-4 text-4xl font-semibold leading-tight text-white md:text-6xl">
              Protect critical traffic before the quantum deadline arrives.
            </h2>
            <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-slate-400">
              Book a technical walkthrough to map QCertify&apos;s PQC approach, QuantumHalon fit, trust readiness, and post-quantum migration priorities.
            </p>
            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
              <CTAButton href="/contact">Book a Technical Demo</CTAButton>
              <CTAButton href="/product" variant="secondary">
                Product Details
              </CTAButton>
            </div>
          </FadeIn>
        </div>
      </section>
    </div>
  );
}

function HomeHero() {
  return (
    <section className="relative min-h-[88vh] overflow-hidden border-b border-white/5 pt-28 pb-12 lg:pt-32">
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/qcertify-command-hero.png"
          alt="Minimal isometric QCertify command platform coordinating post-quantum security solution modules and protected data streams."
          fill
          preload
          sizes="100vw"
          className="object-cover opacity-90"
        />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,rgba(14,165,233,0.18),transparent_34%),linear-gradient(90deg,#000_0%,rgba(0,0,0,0.91)_31%,rgba(0,0,0,0.28)_72%,#000_100%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.42)_0%,rgba(0,0,0,0.08)_45%,#000_100%)]" />
        <div className="absolute inset-0 circuit-mask opacity-55" />
      </div>

      <div className="relative z-10 mx-auto flex min-h-[calc(88vh-7rem)] max-w-7xl flex-col justify-center px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.65 }} className="max-w-4xl">
          <SectionLabel label="QCertify" />
          <h1 className="mt-5 max-w-5xl text-5xl font-semibold leading-[0.98] text-white sm:text-6xl lg:text-8xl">
            Post-quantum security for the{" "}
            <span className="bg-gradient-to-r from-white via-sky-200 to-[#0ea5e9] bg-clip-text text-transparent">
              migration era.
            </span>
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-7 text-slate-300 sm:text-lg">
            QCertify creates practical PQC solutions for organizations protecting long-lived data, regulated traffic, and trust programs that cannot wait for a perfect future migration.
          </p>
          <div className="mt-7 flex flex-wrap gap-2">
            {["PQC solutions", "QuantumHalon first", "Readiness evidence"].map((chip) => (
              <span key={chip} className="rounded-md border border-white/10 bg-white/[0.04] px-3 py-1.5 text-[11px] font-medium uppercase tracking-[0.18em] text-slate-300">
                {chip}
              </span>
            ))}
          </div>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <CTAButton href="/product">Explore QuantumHalon</CTAButton>
            <CTAButton href="/compliance" variant="secondary">
              Plan Readiness
            </CTAButton>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.18, duration: 0.65 }}
          className="mt-12 grid gap-3 md:grid-cols-3"
        >
          {[
            { kicker: "Organization", title: "QCertify", text: "Builds post-quantum cybersecurity solutions for real migration programs." },
            { kicker: "First solution", title: "QuantumHalon", text: "Inline gateway protection for selected enterprise traffic paths." },
            { kicker: "Outcome", title: "Defensible readiness", text: "Evidence, governance, and crypto agility for regulated buyers." },
          ].map((item) => (
            <div key={item.title} className="glass-panel rounded-lg p-4">
              <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#0ea5e9]/70">{item.kicker}</div>
              <h2 className="mt-2 text-base font-semibold text-white">{item.title}</h2>
              <p className="mt-2 text-sm leading-6 text-slate-400">{item.text}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
