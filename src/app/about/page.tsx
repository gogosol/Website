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
        body="QCertify creates practical post-quantum cybersecurity solutions for organizations that need to reduce quantum-era risk without waiting for every application, vendor, and governance process to move at once. QuantumHalon is our first solution."
        imageSrc="/images/generated/about-mission-instrument-plate.webp"
        imageAlt="Decorative monochrome technical plate showing a precision mission instrument."
        plateCaption="Precision instrument for practical post-quantum work"
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
          <div className="border-y border-black/10">
            {convictions.map((item, index) => (
              <FadeIn key={item.title} delay={index * 0.05}>
                <div className="grid gap-4 border-b border-black/10 px-4 py-5 last:border-b-0 sm:grid-cols-[64px_1fr]">
                  <div className="flex items-center gap-3">
                    <item.icon className="h-4 w-4 text-[#126dff]" />
                    <span className="text-[10px] font-semibold uppercase text-[#126dff]">{String(index + 1).padStart(2, "0")}</span>
                  </div>
                  <div>
                    <h3 className="text-base font-semibold leading-tight text-black">{item.title}</h3>
                    <p className="mt-2 text-sm leading-6 text-black/[0.58]">{item.text}</p>
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
              src="/images/generated/about-gateway-closeup-plate.webp"
              alt="Decorative monochrome macro plate showing a gateway surface and protected path."
              caption="QuantumHalon is the first concrete QCertify solution"
            />
          </FadeIn>
          <div>
            <SectionHeader
              label="What We Build First"
              title="A focused first solution, not a vague quantum-readiness promise."
              body="QuantumHalon is designed to protect selected traffic paths with an inline gateway, policy-selected modes, and crypto agility. It is the first concrete solution in QCertify's broader post-quantum security work."
            />
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {[
                { icon: ShieldCheck, title: "Protect now", text: "Reduce HNDL exposure on critical paths while the deeper migration continues." },
                { icon: Lock, title: "Bound custody", text: "Keep sensitive trust operations inside controlled custody boundaries." },
                { icon: Compass, title: "Guide migration", text: "Help teams choose which paths need governed protection, opaque behavior, passthrough, or block." },
                { icon: Shield, title: "Avoid hype", text: "Communicate the real architecture and the real boundaries instead of promising magic PQC." },
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

      <section className="relative overflow-hidden border-t border-black/10 py-24 lg:py-32">
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
