"use client";

import React from "react";
import {
  ClosingCta,
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
    title: "Governed protection boundary",
    text: "Protection profiles and transition behavior are selected through policy so coverage can evolve without redesigning the network.",
  },
  {
    icon: KeyRound,
    title: "Trust readiness",
    text: "Organizations prepare the required enterprise trust through normal governance and rollout processes before activation.",
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
        body="QuantumHalon protects selected enterprise traffic paths from a transparent inline position. It gives operators policy control over protected paths, explicit passthrough, and blocking without describing implementation details on the public site."
        imageSrc="/images/generated/product-gateway-fabric-plate.webp"
        imageAlt="Decorative monochrome technical plate showing a vertical inline gateway fabric."
        plateCaption="Inline gateway fabric for governed post-quantum paths"
        chips={["Trusted handling", "Opaque behavior", "Passthrough", "Block"]}
        primaryCta={{ href: "/contact", label: "Book a Technical Demo" }}
        secondaryCta={{ href: "/how-it-works", label: "Architecture" }}
        textMotion="slide-right"
        imageMotion="clip-up"
      />

      <section className="border-b border-black/10 py-10">
        <div className="editorial-wrap">
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
        <div className="editorial-wrap">
          <SectionHeader
            label="What It Does"
            title="A small set of modes covers the real migration problem."
            body="QuantumHalon does not pretend every path should be treated the same. It lets the organization choose the protection behavior that matches the traffic, trust model, and operational constraints."
            align="center"
            motionStyle="soft-blur"
          />
          <div className="mt-10">
            <ModeMatrixVisual />
          </div>
        </div>
      </section>

      <section className="border-y border-black/10 py-20 lg:py-28">
        <div className="editorial-wrap grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
          <div>
            <SectionHeader
              label="Inline Fabric"
              title="Gateway-level protection where traffic already moves."
              body="QuantumHalon is inserted inline so selected traffic crosses the gateway by design. Existing application behavior remains stable while protection is governed at the path level."
            />
            <div className="mt-8 border-y border-black/10">
              {productPillars.map((pillar, index) => (
                <FadeIn key={pillar.title} delay={index * 0.05} motionStyle="slide-right">
                  <div className="grid gap-4 border-b border-black/10 px-4 py-5 last:border-b-0 sm:grid-cols-[56px_1fr]">
                    <div className="flex items-center gap-3">
                      <pillar.icon className="h-4 w-4 text-[#126dff]" />
                      <span className="text-[10px] font-semibold uppercase text-[#126dff]">{String(index + 1).padStart(2, "0")}</span>
                    </div>
                    <div>
                      <h3 className="text-base font-semibold leading-tight text-black">{pillar.title}</h3>
                      <p className="mt-2 text-sm leading-6 text-black/[0.58]">{pillar.text}</p>
                    </div>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
          <FadeIn delay={0.1} motionStyle="slide-left">
            <InlineGatewayVisual />
          </FadeIn>
        </div>
      </section>

      <section className="py-20 lg:py-28">
        <div className="editorial-wrap grid gap-10 lg:grid-cols-2 lg:items-center">
          <FadeIn>
            <ImagePanel
              src="/images/generated/pqc-lattice-plate.webp"
              alt="Decorative monochrome technical lattice plate with sparse blue accent nodes."
              caption="Governed protection profiles can change without redrawing the network"
              motionStyle="slide-right"
              imageMotion="scale"
            />
          </FadeIn>
          <div>
            <SectionHeader
              label="Crypto Agility"
              title="Protection evolves under policy. The network design stays stable."
              body="QuantumHalon is designed for structured migrations: start with high-priority paths, govern compatibility decisions, and strengthen protection over time without exposing implementation mechanics on the public site."
            />
            <div className="mt-8 border-y border-black/10">
              {[
                "Policy-selected profiles help protect traffic while the ecosystem catches up.",
                "Opaque protection can preserve application behavior while reducing exposure.",
                "Lifecycle governance can phase out unsuitable profiles before activation.",
                "Policy changes can be staged without broad network redesign.",
              ].map((item) => (
                <div key={item} className="grid grid-cols-[24px_1fr] gap-3 border-b border-black/10 px-4 py-4 last:border-b-0">
                  <BadgeCheck className="mt-0.5 h-4 w-4 flex-shrink-0 text-[#126dff]" />
                  <p className="text-sm leading-6 text-black/[0.62]">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-black/10 py-20 lg:py-28">
        <div className="editorial-wrap">
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
        <div className="editorial-wrap">
          <SectionHeader
            label="Operational Readiness"
            title="Built around controlled rollout, not theoretical PQC slides."
            align="center"
          />
          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {[
              { icon: ShieldCheck, title: "Controlled activation", text: "Gateways apply governed policy only after required rollout conditions are ready." },
              { icon: RefreshCw, title: "Phased rollout", text: "High-risk paths can be protected first, then expanded through operational evidence without forcing a big-bang application rewrite." },
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

      <ClosingCta
        label="Demo"
        title="Review the mode matrix mapped to enterprise traffic."
        actions={[
          { href: "/contact", label: "Book a Technical Demo" },
          { href: "/use-cases", label: "View Use Cases", variant: "secondary" },
        ]}
        motionStyle="soft-blur"
      />
    </div>
  );
}
