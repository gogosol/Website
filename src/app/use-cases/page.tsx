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
import { Building2, Cloud, Factory, GitBranch, Landmark, Network, Route, ShieldCheck } from "lucide-react";

const useCases = [
  {
    icon: Route,
    title: "North-south enterprise traffic",
    problem: "Sensitive site or branch traffic crosses shared enterprise paths before every application is ready for PQC.",
    fit: "QuantumHalon applies mode-specific protection at the inline chokepoint, starting with the paths where data lifetime creates the highest HNDL exposure.",
  },
  {
    icon: Network,
    title: "Site-to-site protected destinations",
    problem: "Critical systems communicate across sites, but rewriting endpoints or legacy services would be slow and risky.",
    fit: "Opaque protection can reduce exposure while the application stream stays unchanged.",
  },
  {
    icon: Building2,
    title: "Partner exchange",
    problem: "Third-party exchange paths often carry sensitive data but cannot assume synchronized application migrations.",
    fit: "Use inline gateway enforcement at the boundary, then select the appropriate policy outcome for each path.",
  },
  {
    icon: GitBranch,
    title: "Internal segmented paths",
    problem: "Sensitive internal traffic may cross shared enterprise paths and still need path-specific cryptographic governance.",
    fit: "QuantumHalon supports high-level segmented-path policy thinking while keeping the public model intentionally abstract.",
  },
  {
    icon: ShieldCheck,
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
        imageSrc="/images/traffic-path-map.png"
        imageAlt="Minimal isometric network map with a central QuantumHalon gateway connected to office, cloud, partner, and datacenter paths."
        chips={["Sites", "Cloud", "Partners", "Segments", "Critical egress"]}
        primaryCta={{ href: "/contact", label: "Discuss Your Paths" }}
        secondaryCta={{ href: "/industries", label: "Industries" }}
      />

      <section className="py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeader
            label="Traffic Patterns"
            title="One inline model, multiple controlled outcomes."
            body="Use cases are defined by traffic path and policy goal, not by decorative deployment diagrams. The gateway sits where traffic already crosses and applies the right behavior for each path."
            align="center"
          />
          <div className="mt-10 grid gap-4 lg:grid-cols-2">
            {useCases.map((item, index) => (
              <FadeIn key={item.title} delay={index * 0.05}>
                <div className="glass-panel h-full rounded-lg p-6">
                  <div className="mb-5 flex items-center gap-3">
                    <div className="flex h-11 w-11 items-center justify-center rounded-lg border border-[#0ea5e9]/30 bg-[#0ea5e9]/10 text-[#0ea5e9]">
                      <item.icon className="h-5 w-5" />
                    </div>
                    <h2 className="text-lg font-semibold text-white">{item.title}</h2>
                  </div>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="rounded-lg border border-white/10 bg-black/35 p-4">
                      <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-slate-500">Problem</div>
                      <p className="mt-2 text-sm leading-6 text-slate-400">{item.problem}</p>
                    </div>
                    <div className="rounded-lg border border-[#0ea5e9]/20 bg-[#0ea5e9]/[0.04] p-4">
                      <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#0ea5e9]/70">QuantumHalon fit</div>
                      <p className="mt-2 text-sm leading-6 text-slate-300">{item.fit}</p>
                    </div>
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
              src="/images/hybrid-legacy-cloud.png"
              alt="Minimal isometric illustration of legacy systems and cloud connected through a protected gateway path."
              caption="Protect selected paths while endpoints stay stable"
            />
          </FadeIn>
        </div>
      </section>

      <section className="relative overflow-hidden border-t border-white/5 py-24 lg:py-32">
        <div className="absolute inset-0 circuit-mask opacity-70" />
        <div className="relative z-10 mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <FadeIn>
            <SectionHeader label="Use Case Workshop" title="Bring your traffic map. We will map the protection model." align="center" />
            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
              <CTAButton href="/contact">Discuss Your Use Case</CTAButton>
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
