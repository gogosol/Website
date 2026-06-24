"use client";

import React from "react";
import CTAButton from "@/components/CTAButton";
import {
  FadeIn,
  FeatureCard,
  ImagePanel,
  InlineGatewayVisual,
  LinkCard,
  ModeMatrixVisual,
  PageHero,
  PrivacyBoundary,
  SectionHeader,
  StatStrip,
  audienceCards,
  homeCapabilities,
  migrationSteps,
} from "@/components/QuantumPage";
import SectionLabel from "@/components/SectionLabel";
import { CheckCircle } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-transparent selection:bg-white/30">
      <PageHero
        label="QuantumHalon by QCertify"
        title="PQC protection."
        accent="In the path."
        body={
          <>
            A transparent inline gateway that protects critical enterprise traffic while applications keep moving.
          </>
        }
        imageSrc="/images/inline-policy-fabric.png"
        imageAlt="Minimal isometric illustration of a QuantumHalon gateway protecting packet traffic from quantum risk."
        chips={["Inline gateway", "Hybrid PQC", "Cloud out-of-path"]}
        primaryCta={{ href: "/contact", label: "Book a Technical Demo" }}
        secondaryCta={{ href: "/product", label: "Explore QuantumHalon" }}
      />

      <section className="border-b border-white/5 py-10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <StatStrip
            stats={[
              { value: "Mode 1", label: "Mediated protection with central trust readiness" },
              { value: "Mode 2", label: "Opaque protection for selected traffic paths" },
              { value: "0", label: "Cloud packet-path dependency in live traffic" },
              { value: "Policy", label: "Governed behavior for approved and denied paths" },
            ]}
          />
        </div>
      </section>

      <section className="py-20 lg:py-28">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-2 lg:items-center lg:px-8">
          <div>
            <SectionHeader
              label="The Risk"
              title="Harvest Now, Decrypt Later is a present-day collection problem."
              body="Traffic captured today can remain valuable for years. QuantumHalon helps organizations protect long-lived data in transit now, while the wider post-quantum transition continues."
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
            label="Deployment Model"
            title="Protection in the path, not fragile manual steering."
            body="QuantumHalon is inserted inline at governed chokepoints. Existing applications keep working while selected paths receive policy-driven protection."
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
        <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:items-center lg:px-8">
          <FadeIn>
            <ImagePanel
              src="/images/mode-orchestrator.png"
              alt="Minimal isometric illustration of a gateway directing traffic into protected, opaque, passthrough, and blocked paths."
              caption="Four high-level policy outcomes"
            />
          </FadeIn>
          <div>
            <SectionHeader
              label="Policy Modes"
              title="One inline fabric. Four clear outcomes."
              body="Each traffic path can be governed independently. The public website stays high-level; detailed deployment choices belong in technical review."
            />
            <div className="mt-8">
              <ModeMatrixVisual />
            </div>
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
              body="QuantumHalon lets teams protect the highest-risk paths first, then expand coverage as trust readiness, policy, testing, and governance mature."
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
            <LinkCard href="/how-it-works" title="See the architecture" text="Understand where QuantumHalon sits, how modes are selected, and what remains private." />
            <LinkCard href="/use-cases" title="Explore use cases" text="See how the same inline model applies to sites, datacenters, cloud paths, partner exchange, and segmented traffic." />
            <LinkCard href="/compliance" title="Plan readiness" text="Frame PQC transition as a governed program with evidence, trust readiness, and crypto-agility milestones." />
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
              Book a technical walkthrough to map QuantumHalon to your protected paths, trust readiness, and post-quantum migration priorities.
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
