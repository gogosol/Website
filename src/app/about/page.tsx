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
import { Compass, EyeOff, GitBranch, Lock, Network, Shield, ShieldCheck, Target } from "lucide-react";

const convictions = [
  {
    icon: Target,
    title: "Quantum risk is operational",
    text: "It is not solved by a slide about crypto choices. It is solved through deployment readiness, policy, evidence, and disciplined migration.",
  },
  {
    icon: Network,
    title: "Placement matters",
    text: "Protected traffic should cross the enforcement point by design, with clear ownership and controlled policy.",
  },
  {
    icon: GitBranch,
    title: "Migration must be phased",
    text: "Organizations need compatibility decisions, exception control, and evidence while the ecosystem moves toward post-quantum defaults.",
  },
  {
    icon: EyeOff,
    title: "Privacy boundaries matter",
    text: "Governance services should not turn into unnecessary cloud access to live packet contents.",
  },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-transparent selection:bg-white/30">
      <PageHero
        compact
        label="About QCertify"
        title="We build practical post-quantum protection for real networks."
        body="QCertify is focused on QuantumHalon: an inline, crypto-agile gateway fabric for organizations that need to reduce quantum-era traffic risk without waiting for every application to be rewritten."
        imageSrc="/images/focused-mission.png"
        imageAlt="Minimal isometric illustration of a focused QuantumHalon gateway mission with a migration path and privacy boundary."
        chips={["Focused", "Technical", "Practical", "Privacy-aware"]}
        primaryCta={{ href: "/contact", label: "Talk to QCertify" }}
        secondaryCta={{ href: "/product", label: "Explore Product" }}
      />

      <section className="py-20 lg:py-28">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[0.85fr_1.15fr] lg:items-start lg:px-8">
          <SectionHeader
            label="Why We Exist"
            title="The hard part is not knowing PQC is coming. It is deploying it credibly."
            body="Most organizations cannot pause the business while every endpoint, application, partner path, trust store, and legacy system is migrated. QCertify exists to make early protection possible in that messy middle."
          />
          <div className="grid gap-4 sm:grid-cols-2">
            {convictions.map((item, index) => (
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
        <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-2 lg:items-center lg:px-8">
          <FadeIn>
            <ImagePanel
              src="/images/quantumhalon-hero.png"
              alt="Minimal isometric QuantumHalon gateway appliance protecting packet traffic."
              caption="One product focus: QuantumHalon"
            />
          </FadeIn>
          <div>
            <SectionHeader
              label="What We Build"
              title="A focused product, not a vague quantum-readiness platform."
              body="QuantumHalon is designed to protect selected traffic paths with an inline gateway, policy-selected modes, and crypto agility. The product keeps governance and live packet enforcement clearly separated."
            />
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {[
                { icon: ShieldCheck, title: "Protect now", text: "Reduce HNDL exposure on critical paths while the deeper migration continues." },
                { icon: Lock, title: "Bound custody", text: "Keep sensitive trust operations inside controlled custody boundaries." },
                { icon: Compass, title: "Guide migration", text: "Help teams choose which paths need mediated protection, opaque protection, passthrough, or block." },
                { icon: Shield, title: "Avoid hype", text: "Communicate the real architecture and the real gaps instead of promising magic PQC." },
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

      <section className="py-20 lg:py-28">
        <div className="mx-auto max-w-5xl px-4 text-center sm:px-6 lg:px-8">
          <FadeIn>
            <SectionHeader
              label="Our Position"
              title="Post-quantum security should be understandable, deployable, and defensible."
              body="The website uses simple high-level visuals on purpose. The goal is to make the security model easy to grasp while keeping implementation-specific details inside technical conversations."
              align="center"
            />
          </FadeIn>
        </div>
      </section>

      <section className="relative overflow-hidden border-t border-white/5 py-24 lg:py-32">
        <div className="absolute inset-0 circuit-mask opacity-70" />
        <div className="relative z-10 mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <FadeIn>
            <SectionHeader label="Conversation" title="If quantum readiness feels abstract, we will make it concrete." align="center" />
            <div className="mt-8">
              <CTAButton href="/contact">Talk to QCertify</CTAButton>
            </div>
          </FadeIn>
        </div>
      </section>
    </div>
  );
}
