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
import { Cloud, Factory, Landmark, ShieldCheck } from "lucide-react";

const useCases = [
  {
    title: "North-south enterprise traffic",
    problem: "Sensitive site or branch traffic crosses shared enterprise paths before application-wide PQC migration is complete.",
    fit: "QuantumHalon applies mode-specific protection at the inline chokepoint, starting with the paths where data lifetime creates the highest HNDL exposure.",
  },
  {
    title: "Site-to-site protected destinations",
    problem: "Critical systems communicate across sites, but rewriting endpoints or legacy services would be slow and risky.",
    fit: "Opaque protection can reduce exposure while the application stream stays unchanged.",
  },
  {
    title: "Partner exchange",
    problem: "Third-party exchange paths often carry sensitive data but cannot assume synchronized application migrations.",
    fit: "Use inline gateway enforcement at the boundary, then select the appropriate policy outcome for each path.",
  },
  {
    title: "Internal segmented paths",
    problem: "Sensitive internal traffic may cross shared enterprise paths and still need path-specific cryptographic governance.",
    fit: "QuantumHalon supports high-level segmented-path policy thinking while keeping the public model intentionally abstract.",
  },
  {
    title: "Compliance-sensitive egress",
    problem: "Some traffic paths need governed exceptions and evidence that weak protection is not silently accepted.",
    fit: "Policy can govern protection strength, exceptions, and explicit blocks for paths where compliance risk is high.",
  },
];

export default function UseCasesPage() {
  return (
    <div className="min-h-screen bg-transparent selection:bg-white/30">
      <PageHero
        compact
        label="Use Cases"
        title="Protect the paths where captured traffic would still matter later."
        body="QuantumHalon is best suited to high-value communications where post-quantum migration cannot wait for a clean application rewrite."
        imageSrc="/images/generated/use-cases-traffic-map-plate.webp"
        imageAlt="Decorative monochrome technical plate suggesting multiple enterprise traffic paths."
        plateCaption="Enterprise traffic paths become the unit of protection"
        chips={["Sites", "Cloud", "Partners", "Segments", "Critical egress"]}
        primaryCta={{ href: "/contact", label: "Discuss Protected Paths" }}
        secondaryCta={{ href: "/industries", label: "Industries" }}
      />

      <section className="py-20 lg:py-28">
        <div className="editorial-wrap">
          <SectionHeader
            label="Traffic Patterns"
            title="One inline model, multiple controlled outcomes."
            body="Use cases are defined by traffic path and policy goal, not by decorative deployment diagrams. The gateway sits where traffic already crosses and applies the right behavior for each path."
            align="center"
          />
          <div className="mt-12 border-y border-black/10">
            <div className="hidden grid-cols-[0.7fr_1fr_1fr] border-b border-black/10 px-4 py-3 text-[9px] uppercase leading-4 text-black/[0.45] lg:grid">
              <span>Traffic pattern</span>
              <span>Operating pressure</span>
              <span>QuantumHalon fit</span>
            </div>
            {useCases.map((item, index) => (
              <FadeIn key={item.title} delay={index * 0.05}>
                <div className="grid gap-5 border-b border-black/10 px-4 py-7 last:border-b-0 lg:grid-cols-[0.7fr_1fr_1fr] lg:gap-8">
                  <div>
                    <div className="text-[10px] font-semibold uppercase text-[#126dff]">
                      {String(index + 1).padStart(2, "0")}
                    </div>
                    <h2 className="mt-3 max-w-sm text-xl font-semibold leading-tight text-black">{item.title}</h2>
                  </div>
                  <div>
                    <div className="text-[10px] font-semibold uppercase text-black/[0.42] lg:hidden">Operating pressure</div>
                    <p className="mt-2 text-sm leading-6 text-black/[0.58] lg:mt-0">{item.problem}</p>
                  </div>
                  <div className="border-l border-[#126dff]/25 pl-4">
                    <div className="text-[10px] font-semibold uppercase text-[#126dff] lg:hidden">QuantumHalon fit</div>
                    <p className="mt-2 text-sm leading-6 text-black/[0.64] lg:mt-0">{item.fit}</p>
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
              label="Where It Lands"
              title="Useful when changing every system at once is the slow path."
              body="QuantumHalon complements long-term application PQC migration with a practical protection layer for critical paths while deeper migration is planned, governed, and executed."
            />
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {[
                { icon: Cloud, title: "Hybrid cloud", text: "Protect selected cloud-to-site or site-to-cloud paths without rewriting every workload." },
                { icon: Factory, title: "Legacy environments", text: "Keep old systems stable while adding path-level cryptographic protection." },
                { icon: Landmark, title: "Sovereign traffic", text: "Create an auditable response for government and regulated environments." },
                { icon: ShieldCheck, title: "Long-lived records", text: "Prioritize paths carrying records whose confidentiality horizon extends beyond current crypto assumptions." },
              ].map((card, index) => (
                <FadeIn key={card.title} delay={index * 0.05}>
                  <FeatureCard icon={card.icon} title={card.title}>
                    {card.text}
                  </FeatureCard>
                </FadeIn>
              ))}
            </div>
          </div>
          <FadeIn>
            <ImagePanel
              src="/images/generated/use-cases-hybrid-legacy-plate.webp"
              alt="Decorative monochrome technical plate showing a legacy path connected to a modern endpoint."
              caption="Selected path protection keeps legacy endpoints stable"
            />
          </FadeIn>
        </div>
      </section>

      <section className="relative overflow-hidden border-t border-black/10 py-24 lg:py-32">
        <div className="absolute inset-0 circuit-mask opacity-70" />
        <div className="relative z-10 mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <FadeIn>
            <SectionHeader label="Use Case Workshop" title="Traffic maps can be translated into a protected-path model." align="center" />
            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
              <CTAButton href="/contact">Discuss Use Case</CTAButton>
              <CTAButton href="/how-it-works" variant="secondary">
                See How It Works
              </CTAButton>
            </div>
          </FadeIn>
        </div>
      </section>
    </div>
  );
}
