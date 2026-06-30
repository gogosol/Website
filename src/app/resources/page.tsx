"use client";

import React from "react";
import CTAButton from "@/components/CTAButton";
import {
  ClosingCta,
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
        plateCaption="Technical briefs organized around migration decisions"
        chips={["Threat models", "Architecture", "Migration", "Governance"]}
        primaryCta={{ href: "/contact", label: "Technical Inquiry" }}
        secondaryCta={{ href: "/compliance", label: "Readiness" }}
        textMotion="scale"
        imageMotion="slide-right"
      />

      <section className="py-20 lg:py-28">
        <div className="editorial-wrap">
          <SectionHeader
            label="Content Library"
            title="Built for security, architecture, and risk teams."
            body="The resource library is organized around the questions organizations actually need to answer before they can deploy PQC responsibly."
            align="center"
            motionStyle="scale"
          />
          <div className="mt-12 border-y border-black/10">
            {resourceTopics.map((topic, index) => (
              <FadeIn key={topic.category} delay={index * 0.05} motionStyle={index % 2 === 0 ? "slide-right" : "slide-left"}>
                <div className="grid gap-0 border-b border-black/10 last:border-b-0 lg:grid-cols-[0.42fr_1fr]">
                  <div className="flex items-start gap-4 px-4 py-6">
                    <topic.icon className="mt-1 h-5 w-5 flex-shrink-0 text-[#126dff]" />
                    <div>
                      <div className="text-[10px] font-semibold uppercase text-black/[0.42]">
                        Category {String(index + 1).padStart(2, "0")}
                      </div>
                      <h2 className="mt-2 text-xl font-semibold leading-tight text-black">{topic.category}</h2>
                    </div>
                  </div>
                  <div className="grid border-t border-black/10 lg:border-l lg:border-t-0 md:grid-cols-2">
                    {topic.items.map((item) => (
                      <div key={item} className="group flex min-h-24 items-center justify-between gap-4 border-b border-black/10 px-4 py-4 last:border-b-0 md:border-r md:odd:border-r md:even:border-r-0">
                        <span className="text-sm leading-6 text-black/[0.62]">{item}</span>
                        <span className="flex shrink-0 items-center gap-1 text-[10px] font-semibold uppercase text-black/[0.42] transition-colors group-hover:text-[#126dff]">
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

      <section className="border-y border-black/10 py-20 lg:py-28">
        <div className="editorial-wrap grid gap-10 lg:grid-cols-2 lg:items-center">
          <div>
            <SectionHeader
              label="Featured Brief"
              title="Choosing the right protection behavior."
              body="A practical decision guide for when governed protection, opaque behavior, approved passthrough, or block makes sense in a post-quantum transition program."
            />
            <div className="mt-8">
              <CTAButton href="/contact" variant="secondary">
                Request Brief
              </CTAButton>
            </div>
          </div>
          <FadeIn>
            <ImagePanel
              src="/images/generated/resources-decision-guide-plate.webp"
              alt="Decorative monochrome technical plate suggesting decision logic and mode selection."
              caption="Decision guides stay high-level and operator-safe"
              motionStyle="slide-left"
              imageMotion="scale"
            />
          </FadeIn>
        </div>
      </section>

      <ClosingCta
        label="Technical Inquiry"
        title="Technical questions can be reviewed before the public brief is live."
        actions={[{ href: "/contact", label: "Submit Inquiry" }]}
        motionStyle="scale"
      />
    </div>
  );
}
