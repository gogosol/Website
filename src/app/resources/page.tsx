"use client";

import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, Minus, Plus } from "lucide-react";
import CTAButton from "@/components/CTAButton";
import {
  ClosingCta,
  FadeIn,
  ImagePanel,
  PageHero,
  SectionHeader,
  resourceTopics,
} from "@/components/QuantumPage";

const smoothEase = [0.22, 1, 0.36, 1] as const;

function ArchiveIndex() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="border-y border-black/10">
      {resourceTopics.map((topic, index) => {
        const open = openIndex === index;
        return (
          <div key={topic.category} className="border-b border-black/10 last:border-b-0">
            <button
              type="button"
              onClick={() => setOpenIndex(open ? null : index)}
              aria-expanded={open}
              className="grid w-full grid-cols-[auto_1fr_auto] items-center gap-5 px-4 py-6 text-left transition-colors hover:bg-white/[0.6] focus-visible:outline focus-visible:outline-1 focus-visible:-outline-offset-4 focus-visible:outline-black sm:gap-10 sm:px-6 sm:py-8"
            >
              <span
                aria-hidden="true"
                className={`text-5xl font-medium leading-none tabular-nums transition-colors duration-300 sm:text-7xl ${
                  open ? "text-[#126dff]" : "text-black/[0.16]"
                }`}
              >
                {String(index + 1).padStart(2, "0")}
              </span>
              <span>
                <span className="flex items-center gap-3">
                  <topic.icon className={`h-4 w-4 ${open ? "text-[#126dff]" : "text-black/[0.35]"}`} />
                  <span className="text-xl font-semibold leading-tight text-black sm:text-2xl">{topic.category}</span>
                </span>
                <span className="mt-2 block text-[10px] font-semibold uppercase leading-4 text-black/[0.42]">
                  {topic.items.length} briefs · in preparation
                </span>
              </span>
              <span
                aria-hidden="true"
                className={`flex h-9 w-9 items-center justify-center border transition-colors ${
                  open ? "border-black bg-black text-[#f7f7f2]" : "border-black/15 text-black/[0.55]"
                }`}
              >
                {open ? <Minus className="h-3.5 w-3.5" /> : <Plus className="h-3.5 w-3.5" />}
              </span>
            </button>

            <AnimatePresence initial={false}>
              {open ? (
                <motion.div
                  key="items"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.38, ease: smoothEase }}
                  className="overflow-hidden"
                >
                  <div className="grid gap-px border-t border-black/10 bg-black/10 md:grid-cols-3">
                    {topic.items.map((item, itemIndex) => (
                      <motion.div
                        key={item}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 + itemIndex * 0.06, duration: 0.32, ease: smoothEase }}
                        className="group bg-[#f7f7f2] p-5"
                      >
                        <div className="text-[9px] font-semibold uppercase leading-4 text-[#126dff]">
                          {String(index + 1).padStart(2, "0")}.{itemIndex + 1}
                        </div>
                        <p className="mt-3 text-sm font-medium leading-6 text-black">{item}</p>
                        <div className="mt-5 flex items-center gap-1.5 border-t border-black/10 pt-3 text-[9px] font-semibold uppercase text-black/[0.38] transition-colors group-hover:text-[#126dff]">
                          In preparation
                          <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-0.5" />
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              ) : null}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}

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
            title="An index built for security, architecture, and risk teams."
            body="The library is organized around the questions organizations actually need to answer before they can deploy PQC responsibly. Open a category to browse its briefs."
            align="center"
            motionStyle="scale"
          />
          <FadeIn delay={0.08} className="mt-12">
            <ArchiveIndex />
          </FadeIn>
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
