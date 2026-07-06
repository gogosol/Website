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
import { Compass, EyeOff, GitBranch, Lock, Network, Shield, ShieldCheck, Target } from "lucide-react";

const convictions = [
  {
    icon: Target,
    title: "Quantum risk is operational.",
    text: "It is not solved by a slide about crypto choices. It is solved through deployment readiness, policy, evidence, and disciplined migration.",
  },
  {
    icon: Network,
    title: "Placement matters.",
    text: "Protected traffic should cross the enforcement point by design, with clear ownership and controlled policy.",
  },
  {
    icon: GitBranch,
    title: "Migration must be phased.",
    text: "Organizations need compatibility decisions, exception control, and evidence while the ecosystem moves toward post-quantum defaults.",
  },
  {
    icon: EyeOff,
    title: "Privacy boundaries matter.",
    text: "Governance services should not turn into unnecessary cloud access to live packet contents.",
  },
];

const dossier = [
  { label: "Focus", value: "Post-quantum cybersecurity" },
  { label: "First solution", value: "QuantumHalon" },
  { label: "Placement", value: "Inline gateway fabric" },
  { label: "Boundary", value: "Cloud out of the packet path" },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-transparent selection:bg-white/30">
      <PageHero
        compact
        label="About QCertify"
        title="Practical post-quantum protection for real networks."
        body="QCertify creates practical post-quantum cybersecurity solutions for organizations that need to reduce quantum-era risk without waiting for every application, vendor, and governance process to move at once. QuantumHalon is the first QCertify solution."
        imageSrc="/images/generated/about-mission-instrument-plate.webp"
        imageAlt="Decorative monochrome technical plate showing a precision mission instrument."
        plateCaption="Precision instrument for practical post-quantum work"
        chips={["Focused", "Technical", "Practical", "Privacy-aware"]}
        primaryCta={{ href: "/contact", label: "Technical Consultation" }}
        secondaryCta={{ href: "/product", label: "Explore Product" }}
        textMotion="soft-blur"
        imageMotion="clip-up"
      />

      <section className="py-20 lg:py-28">
        <div className="editorial-wrap grid gap-12 lg:grid-cols-[0.42fr_1fr] lg:gap-16">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <SectionHeader
              label="Manifesto"
              title="The hard part is not knowing PQC is coming. It is deploying it credibly."
              body="Most organizations cannot pause the business while every endpoint, application, partner path, trust store, and legacy system is migrated. QCertify exists to make early protection possible in that messy middle. Four convictions guide the work."
              motionStyle="slide-right"
            />
          </div>

          <div>
            {convictions.map((item, index) => (
              <div
                key={item.title}
                className="sticky mb-8"
                style={{ top: `${104 + index * 20}px` }}
              >
                <div className="border border-black/20 bg-[#f7f7f2] p-6 sm:p-10">
                  <div className="flex items-center justify-between border-b border-black/10 pb-4">
                    <span className="text-[10px] font-semibold uppercase text-[#126dff]">
                      Conviction {String(index + 1).padStart(2, "0")} / {String(convictions.length).padStart(2, "0")}
                    </span>
                    <item.icon className="h-4 w-4 text-[#126dff]" />
                  </div>
                  <h3 className="mt-10 max-w-xl text-3xl font-medium leading-[1.05] text-black sm:text-5xl">
                    {item.title}
                  </h3>
                  <p className="mt-6 max-w-xl text-sm leading-7 text-black/[0.58] sm:text-base">{item.text}</p>
                  <div className="mt-12 flex items-center justify-between border-t border-black/10 pt-3 text-[9px] font-semibold uppercase text-black/[0.38]">
                    <span>QCertify operating principle</span>
                    <span aria-hidden="true" className="flex gap-1">
                      {convictions.map((_, dotIndex) => (
                        <span
                          key={dotIndex}
                          className={`h-1.5 w-1.5 ${dotIndex <= index ? "bg-[#126dff]" : "bg-black/[0.15]"}`}
                        />
                      ))}
                    </span>
                  </div>
                </div>
              </div>
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
              motionStyle="scale"
              imageMotion="soft-blur"
            />
          </FadeIn>
          <div>
            <SectionHeader
              label="First Solution"
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
              label="Position"
              title="Post-quantum security should be understandable, deployable, and defensible."
              body="The website uses simple high-level visuals on purpose. The goal is to make the security model easy to grasp while keeping implementation-specific details inside technical conversations."
              align="center"
            />
          </FadeIn>
          <FadeIn delay={0.12} className="mt-12 grid gap-5 border-t border-black pt-5 text-left sm:grid-cols-2 lg:grid-cols-4">
            {dossier.map((item) => (
              <div key={item.label} className="metadata">
                <strong>{item.label}</strong>
                {item.value}
              </div>
            ))}
          </FadeIn>
        </div>
      </section>

      <ClosingCta
        label="Consultation"
        title="Quantum readiness becomes concrete when mapped to real protected paths."
        actions={[{ href: "/contact", label: "Request Consultation" }]}
        motionStyle="soft-blur"
      />
    </div>
  );
}
