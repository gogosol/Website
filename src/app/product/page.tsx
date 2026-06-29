"use client";

import React from "react";
import CTAButton from "@/components/CTAButton";
import {
  FadeIn,
  FeatureCard,
  ImagePanel,
  InlineGatewayVisual,
  ModeMatrixVisual,
  PageHero,
  PrivacyBoundary,
  SectionHeader,
  StatStrip,
} from "@/components/QuantumPage";
import { BadgeCheck, Cloud, KeyRound, LockKeyhole, RefreshCw, ShieldCheck, Workflow, Zap } from "lucide-react";

const productPillars = [
  {
    icon: Workflow,
    title: "Inline enterprise orchestrator",
    text: "Classifies traffic at a high level, then applies the policy-selected protection outcome for that path.",
  },
  {
    icon: LockKeyhole,
    title: "Governed PQC crypto boundary",
    text: "Protection profiles and transition behavior are selected through policy so coverage can evolve without redesigning the network.",
  },
  {
    icon: KeyRound,
    title: "Mode 1 trust distribution",
    text: "Organizations prepare enterprise trust for mediated paths through their normal governance and rollout processes.",
  },
  {
    icon: Cloud,
    title: "Out-of-band cloud control",
    text: "QCertify governance services coordinate deployment state and policy direction without becoming the live packet path.",
  },
];

export default function ProductPage() {
  return (
    <div className="min-h-screen bg-transparent selection:bg-white/30">
      <PageHero
        compact
        label="Product"
        title="QuantumHalon is a post-quantum inline gateway fabric."
        body="QuantumHalon protects selected enterprise traffic paths from a transparent inline position. It gives operators policy control over mediated protection, opaque protection, explicit passthrough, and blocking."
        imageSrc="/images/generated/product-gateway-fabric-plate.webp"
        imageAlt="Decorative monochrome technical plate showing a vertical inline gateway fabric."
        chips={["Mode 1", "Mode 2", "Passthrough", "Block"]}
        primaryCta={{ href: "/contact", label: "Book a Technical Demo" }}
        secondaryCta={{ href: "/how-it-works", label: "Architecture" }}
      />

      <section className="border-b border-white/5 py-10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <StatStrip
            stats={[
              { value: "Inline", label: "Gateway-level protection at governed chokepoints" },
              { value: "Modes", label: "Policy-selected outcomes for selected paths" },
              { value: "Private", label: "QCertify cloud stays outside live packet handling" },
              { value: "Agile", label: "Migration behavior governed over time" },
            ]}
          />
        </div>
      </section>

      <section className="py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeader
            label="What It Does"
            title="A small set of modes covers the real migration problem."
            body="QuantumHalon does not pretend every path should be treated the same. It lets the organization choose the protection behavior that matches the traffic, trust model, and operational constraints."
            align="center"
          />
          <div className="mt-10">
            <ModeMatrixVisual />
          </div>
        </div>
      </section>

      <section className="border-y border-white/5 py-20 lg:py-28">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[0.95fr_1.05fr] lg:items-center lg:px-8">
          <div>
            <SectionHeader
              label="Inline Fabric"
              title="Gateway-level protection where traffic already moves."
              body="QuantumHalon is inserted inline so selected traffic crosses the gateway by design. Existing application behavior remains stable while protection is governed at the path level."
            />
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {productPillars.map((pillar, index) => (
                <FadeIn key={pillar.title} delay={index * 0.05}>
                  <FeatureCard icon={pillar.icon} title={pillar.title}>
                    {pillar.text}
                  </FeatureCard>
                </FadeIn>
              ))}
            </div>
          </div>
          <FadeIn delay={0.1}>
            <InlineGatewayVisual />
          </FadeIn>
        </div>
      </section>

      <section className="py-20 lg:py-28">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-2 lg:items-center lg:px-8">
          <FadeIn>
            <ImagePanel
              src="/images/generated/pqc-lattice-plate.webp"
              alt="Decorative monochrome technical lattice plate with sparse blue accent nodes."
              caption="Protection profiles move under governed policy"
            />
          </FadeIn>
          <div>
            <SectionHeader
              label="Crypto Agility"
              title="Protection evolves under policy. The network design stays stable."
              body="QuantumHalon is designed for structured migrations: start with high-priority paths, govern compatibility decisions, and strengthen protection over time without exposing implementation mechanics on the public site."
            />
            <div className="mt-8 space-y-3">
              {[
                "Hybrid profiles help protect traffic while the ecosystem catches up.",
                "Opaque protection can preserve application behavior while reducing exposure.",
                "Lifecycle governance can phase out unsuitable profiles before activation.",
                "Policy changes can be staged without broad network redesign.",
              ].map((item) => (
                <div key={item} className="flex gap-3 rounded-lg border border-white/10 bg-white/[0.03] p-4">
                  <BadgeCheck className="mt-0.5 h-4 w-4 flex-shrink-0 text-[#126dff]" />
                  <p className="text-sm leading-6 text-slate-300">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-white/5 py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeader
            label="Privacy"
            title="Designed so governance does not become packet surveillance."
            body="The most important product promise is the boundary: QCertify governance services do not become the live packet path."
            align="center"
          />
          <div className="mt-10">
            <PrivacyBoundary />
          </div>
        </div>
      </section>

      <section className="py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeader
            label="Operational Readiness"
            title="Built around controlled deployment, not theoretical PQC slides."
            align="center"
          />
          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {[
              { icon: ShieldCheck, title: "Controlled activation", text: "Gateways apply governed policy only after required deployment conditions are ready." },
              { icon: RefreshCw, title: "Phased rollout", text: "Start with high-risk paths, learn from operational evidence, and expand without forcing a big-bang application rewrite." },
              { icon: Zap, title: "Operational flexibility", text: "Operators can adjust protected-path behavior through governed rollout rather than broad network rework." },
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
            <SectionHeader label="Demo" title="See the mode matrix mapped to your traffic." align="center" />
            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
              <CTAButton href="/contact">Book a Technical Demo</CTAButton>
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
