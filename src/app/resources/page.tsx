"use client";

import React from "react";
import CTAButton from "@/components/CTAButton";
import {
  FadeIn,
  ImagePanel,
  PageHero,
  SectionHeader,
  resourceTopics,
} from "@/components/QuantumPage";
import { ArrowRight } from "lucide-react";

export default function ResourcesPage() {
  return (
    <div className="min-h-screen bg-transparent selection:bg-white/30">
      <PageHero
        compact
        label="Resources"
        title="Clear thinking for post-quantum transition."
        body="Guides, explainers, and technical briefs for teams turning quantum risk into a practical network, security, and governance program."
        imageSrc="/images/generated/resources-library-plate.webp"
        imageAlt="Decorative monochrome technical plate suggesting a library of technical briefs."
        chips={["Threat models", "Architecture", "Migration", "Governance"]}
        primaryCta={{ href: "/contact", label: "Ask a Question" }}
        secondaryCta={{ href: "/compliance", label: "Readiness" }}
      />

      <section className="py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeader
            label="Content Library"
            title="Built for security, architecture, and risk teams."
            body="The resource library is organized around the questions organizations actually need to answer before they can deploy PQC responsibly."
            align="center"
          />
          <div className="mt-10 grid gap-5 md:grid-cols-2">
            {resourceTopics.map((topic, index) => (
              <FadeIn key={topic.category} delay={index * 0.05}>
                <div className="glass-panel h-full rounded-lg p-6">
                  <div className="mb-5 flex items-center gap-3">
                    <div className="flex h-11 w-11 items-center justify-center rounded-lg border border-[#126dff]/30 bg-[#126dff]/10 text-[#126dff]">
                      <topic.icon className="h-5 w-5" />
                    </div>
                    <h2 className="text-lg font-semibold text-white">{topic.category}</h2>
                  </div>
                  <div className="space-y-3">
                    {topic.items.map((item) => (
                      <div key={item} className="group flex items-center justify-between gap-4 rounded-lg border border-white/10 bg-black/35 p-4">
                        <span className="text-sm leading-6 text-slate-300">{item}</span>
                        <span className="flex items-center gap-1 font-mono text-[10px] uppercase tracking-[0.18em] text-slate-500">
                          Soon <ArrowRight className="h-3 w-3" />
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-white/5 py-20 lg:py-28">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-2 lg:items-center lg:px-8">
          <div>
            <SectionHeader
              label="Featured Brief"
              title="Mode 1 vs Mode 2: choosing the right protection behavior."
              body="A practical decision guide for when TLS-aware mediation, opaque traffic wrapping, passthrough, or block makes sense in a post-quantum transition program."
            />
            <div className="mt-8">
              <CTAButton href="/contact" variant="secondary">
                Request the Brief
              </CTAButton>
            </div>
          </div>
          <FadeIn>
            <ImagePanel
              src="/images/generated/resources-decision-guide-plate.webp"
              alt="Decorative monochrome technical plate suggesting decision logic and mode selection."
              caption="Decision guides will stay high-level and operator-safe"
            />
          </FadeIn>
        </div>
      </section>

      <section className="relative overflow-hidden border-t border-white/5 py-24 lg:py-32">
        <div className="absolute inset-0 circuit-mask opacity-70" />
        <div className="relative z-10 mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <FadeIn>
            <SectionHeader label="Talk to Us" title="Need a technical answer before the public brief is live?" align="center" />
            <div className="mt-8">
              <CTAButton href="/contact">Contact QCertify</CTAButton>
            </div>
          </FadeIn>
        </div>
      </section>
    </div>
  );
}
