"use client";

import React from "react";
import CTAButton from "@/components/CTAButton";
import {
  FadeIn,
  FeatureCard,
  ImagePanel,
  InlineGatewayVisual,
  PageHero,
  SectionHeader,
} from "@/components/QuantumPage";
import { Cloud, EyeOff, GitBranch, KeyRound, Network, Radar, Route, ShieldCheck } from "lucide-react";

const flowSteps = [
  {
    title: "Traffic crosses the inline gateway",
    text: "QuantumHalon is placed at a governed chokepoint. Protected paths cross it by design.",
  },
  {
    title: "Classifier resolves the path",
    text: "The gateway classifies traffic at a high level using policy-relevant network context.",
  },
  {
    title: "Mode engine selects behavior",
    text: "Policy chooses mediated protection, opaque protection, approved passthrough, or block for each selected path.",
  },
  {
    title: "Crypto boundary enforces",
    text: "The selected mode applies the approved protection behavior for that path.",
  },
  {
    title: "Evidence proves state",
    text: "Operators receive deployment and coverage evidence without making cloud services the live traffic path.",
  },
];

export default function HowItWorksPage() {
  return (
    <div className="min-h-screen bg-transparent selection:bg-white/30">
      <PageHero
        compact
        label="How It Works"
        title="A transparent inline path with policy-selected protection."
        body="QuantumHalon turns post-quantum protection into an enforceable network behavior without forcing every endpoint or application to move first."
        imageSrc="/images/generated/control-data-plane-plate.webp"
        imageAlt="Decorative monochrome technical plate suggesting separation between control plane and data plane."
        chips={["Inline", "Classify", "Select Mode", "Enforce", "Report"]}
        primaryCta={{ href: "/contact", label: "Walk Through Your Paths" }}
        secondaryCta={{ href: "/product", label: "Product Details" }}
      />

      <section className="py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeader
            label="Packet Path"
            title="The gateway sits in the path. The cloud does not."
            body="The live packet path stays local to deployed gateways. QCertify governance services coordinate policy and operational state separately from packet handling."
            align="center"
          />
          <FadeIn delay={0.1} className="mt-10">
            <InlineGatewayVisual />
          </FadeIn>
        </div>
      </section>

      <section className="border-y border-white/5 py-20 lg:py-28">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[0.8fr_1.2fr] lg:px-8">
          <SectionHeader
            label="Flow"
            title="Five steps from raw traffic to governed protection."
            body="This is deliberately high-level. The public site explains the operating model; detailed policy and crypto mechanics stay inside the product and technical briefings."
          />
          <div className="space-y-3">
            {flowSteps.map((step, index) => (
              <FadeIn key={step.title} delay={index * 0.05}>
                <div className="grid gap-4 rounded-lg border border-white/10 bg-white/[0.03] p-5 sm:grid-cols-[64px_1fr]">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg border border-[#126dff]/30 bg-[#126dff]/10 font-mono text-sm font-semibold text-[#126dff]">
                    {String(index + 1).padStart(2, "0")}
                  </div>
                  <div>
                    <h3 className="text-base font-semibold text-white">{step.title}</h3>
                    <p className="mt-2 text-sm leading-6 text-slate-400">{step.text}</p>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 lg:py-28">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-2 lg:items-center lg:px-8">
          <FadeIn>
            <ImagePanel
              src="/images/generated/inline-gateway-plate.webp"
              alt="Decorative monochrome technical plate showing an abstract inline gateway in a network path."
              caption="Mode behavior stays policy-driven"
            />
          </FadeIn>
          <div>
            <SectionHeader
              label="Mode Logic"
              title="The same gateway can make different decisions for different paths."
              body="Mode 1 provides mediated protection. Mode 2 protects opaque paths. Passthrough is explicit. Block stops traffic according to policy."
            />
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {[
                { icon: ShieldCheck, title: "Mode 1", text: "Mediated protection for paths where trusted handling is appropriate." },
                { icon: Network, title: "Mode 2", text: "Opaque protection for paths where application behavior should remain unchanged." },
                { icon: Route, title: "Passthrough", text: "Approved transparent forwarding for paths outside active protection." },
                { icon: Radar, title: "Block", text: "Policy denial that stops the flow instead of silently downgrading." },
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

      <section className="border-y border-white/5 py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeader
            label="Trust Model"
            title="Mode 1 starts with clear enterprise trust readiness."
            body="For mediated protection, organizations prepare the required trust through standard enterprise rollout processes before activation. Detailed trust architecture is reserved for technical review."
            align="center"
          />
          <div className="mt-10 grid gap-4 md:grid-cols-4">
            {[
              { icon: GitBranch, title: "Prepare trust", text: "Use normal enterprise rollout controls to prepare systems for mediated protection." },
              { icon: KeyRound, title: "Activate Mode 1", text: "Turn on mediated protection only for approved paths after trust readiness is confirmed." },
              { icon: Cloud, title: "Keep custody bounded", text: "Sensitive trust operations remain inside controlled custody boundaries." },
              { icon: EyeOff, title: "Preserve the boundary", text: "Mode choices keep visibility and payload handling explicit." },
            ].map((item, index) => (
              <FadeIn key={item.title} delay={index * 0.05}>
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
            <SectionHeader label="Technical Walkthrough" title="Map the model to your protected paths." align="center" />
            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
              <CTAButton href="/contact">Book a Walkthrough</CTAButton>
              <CTAButton href="/use-cases" variant="secondary">
                View Use Cases
              </CTAButton>
            </div>
          </FadeIn>
        </div>
      </section>
    </div>
  );
}
