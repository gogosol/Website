"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  ArrowUpRight,
  CheckCircle2,
  GitBranch,
  KeyRound,
  LockKeyhole,
  Network,
  ShieldCheck,
} from "lucide-react";
import CTAButton from "@/components/CTAButton";
import SectionLabel from "@/components/SectionLabel";
import BrandLogo from "@/components/BrandLogo";
import {
  FadeIn,
  InlineGatewayVisual,
  LinkCard,
  SectionHeader,
  StatStrip,
} from "@/components/QuantumPage";

const metadata = [
  { label: "Organization", value: "QCertify" },
  { label: "First solution", value: "QuantumHalon" },
  { label: "Threat model", value: "Harvest Now, Decrypt Later" },
  { label: "Deployment", value: "Inline gateway fabric" },
];

const principles = [
  {
    icon: Network,
    title: "Inline placement",
    text: "Put protection where selected enterprise traffic already moves.",
  },
  {
    icon: LockKeyhole,
    title: "Bounded custody",
    text: "Keep live packet handling local to deployed gateways.",
  },
  {
    icon: GitBranch,
    title: "Phased adoption",
    text: "Protect priority paths while application migration continues.",
  },
  {
    icon: KeyRound,
    title: "Crypto agility",
    text: "Let policy govern protection behavior as standards mature.",
  },
];

const modeRows = [
  ["01", "Mediated protection", "For paths where trusted handling is appropriate."],
  ["02", "Opaque protection", "For traffic that should remain application-stable."],
  ["03", "Explicit passthrough", "For approved paths outside active protection."],
  ["04", "Policy block", "For flows that should stop rather than silently downgrade."],
];

const useCases = [
  "Branch-to-HQ paths",
  "Partner exchange",
  "Critical system egress",
  "Hybrid cloud transit",
  "Internal segmented services",
];

export default function Home() {
  return (
    <div className="min-h-screen selection:bg-[#126dff]/[0.15]">
      <HomeHero />

      <section className="border-b border-black/10 py-8">
        <div className="editorial-wrap">
          <StatStrip
            stats={[
              { value: "QCertify", label: "Post-quantum cybersecurity organization" },
              { value: "QuantumHalon", label: "Inline gateway protection" },
              { value: "Private path", label: "Governance outside live packet flow" },
              { value: "Evidence", label: "Readiness for procurement and risk teams" },
            ]}
          />
        </div>
      </section>

      <EditorialPlate
        src="/images/generated/home-hndl-archive-plate.webp"
        alt="Decorative monochrome technical plate showing a captured encrypted packet archive."
        meta={["Version / Web", "Screen name / HNDL plate", "Source / Generated decorative image"]}
      />

      <section className="border-b border-black/10 py-20 lg:py-28">
        <div className="editorial-wrap grid gap-12 lg:grid-cols-[1.15fr_0.85fr] lg:items-start">
          <FadeIn>
            <SectionLabel label="The Risk" />
            <h2 className="max-w-5xl text-6xl font-medium leading-[0.84] text-black sm:text-7xl lg:text-8xl">
              Harvest Now.
              <br />
              Decrypt Later.
            </h2>
          </FadeIn>

          <FadeIn delay={0.1} className="border-t border-black pt-5 lg:mt-24">
            <p className="text-xl leading-8 text-black">
              Traffic captured today can remain valuable for years. QCertify
              focuses on the paths where data lifetime turns future quantum
              capability into a present operating problem.
            </p>
            <div className="mt-8 grid gap-4">
              {[
                "Prioritize communications whose confidentiality horizon outlives current cryptography.",
                "Apply path-level protection before every endpoint and application can migrate.",
                "Give security, risk, and procurement teams a defensible transition story.",
              ].map((item) => (
                <div key={item} className="grid grid-cols-[18px_1fr] gap-3 border-t border-black/10 pt-4">
                  <CheckCircle2 className="mt-1 h-4 w-4 text-[#126dff]" />
                  <p className="text-sm leading-6 text-black/60">{item}</p>
                </div>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      <section className="border-b border-black/10 py-20 lg:py-28">
        <div className="editorial-wrap">
          <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
            <SectionHeader
              label="First Solution"
              title="QuantumHalon protects selected paths without rebuilding the network."
              body="The gateway sits inline at governed chokepoints. Policy selects the behavior per traffic path while QCertify governance remains outside live packet handling."
            />
            <FadeIn delay={0.1}>
              <InlineGatewayVisual />
            </FadeIn>
          </div>

          <div className="mt-12 grid gap-px border-y border-black/10 bg-black/10 lg:grid-cols-4">
            {principles.map((item, index) => (
              <FadeIn key={item.title} delay={index * 0.05}>
                <div className="h-full bg-[#f7f7f2] p-5">
                  <item.icon className="h-5 w-5 text-[#126dff]" />
                  <h3 className="mt-8 text-lg font-semibold text-black">{item.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-black/[0.58]">{item.text}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      <EditorialPlate
        src="/images/generated/inline-gateway-plate.webp"
        alt="Decorative monochrome technical plate showing an abstract inline gateway in a network path."
        meta={["Version / Web", "Screen name / Inline gateway", "Source / Generated decorative image"]}
      />

      <section className="border-b border-black/10 py-20 lg:py-28">
        <div className="editorial-wrap grid gap-12 lg:grid-cols-[0.95fr_1.05fr]">
          <FadeIn>
            <SectionLabel label="Protection Modes" />
            <h2 className="text-6xl font-medium leading-[0.84] text-black sm:text-7xl lg:text-8xl">
              One gateway.
              <br />
              Different decisions.
            </h2>
            <p className="mt-7 max-w-xl text-base leading-7 text-black/60">
              The product does not flatten every path into one answer. It lets
              the organization choose the right operating behavior for the
              traffic, trust model, and exception posture.
            </p>
          </FadeIn>

          <div className="border-t border-black">
            {modeRows.map(([number, title, text], index) => (
              <FadeIn key={title} delay={index * 0.04}>
                <div className="grid gap-4 border-b border-black/10 py-6 sm:grid-cols-[72px_0.8fr_1fr]">
                  <div className="text-[10px] font-semibold uppercase text-[#126dff]">{number}</div>
                  <h3 className="text-xl font-semibold leading-tight text-black">{title}</h3>
                  <p className="text-sm leading-6 text-black/[0.58]">{text}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-black/10 py-20 lg:py-28">
        <div className="editorial-wrap grid gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
          <FadeIn>
            <div className="technical-plate">
              <div className="relative aspect-[16/9]">
                <Image
                  src="/images/generated/control-data-plane-plate.webp"
                  alt="Decorative monochrome technical plate suggesting separation between control plane and data plane."
                  fill
                  sizes="(min-width: 1024px) 52vw, 100vw"
                  className="object-cover"
                />
              </div>
              <div className="grid grid-cols-3 border-t border-black/10 px-4 py-3 text-[9px] uppercase text-black/[0.45]">
                <span>Version / Web</span>
                <span>Screen name / Plane separation</span>
                <span className="text-right">Source / Generated decorative image</span>
              </div>
            </div>
          </FadeIn>
          <div>
            <SectionHeader
              label="Architecture"
              title="Control plane and data plane stay cleanly separated."
              body="The public model is intentionally simple: gateways handle selected traffic locally, while governance coordinates policy, deployment state, and readiness evidence out of band."
            />
            <div className="mt-8 grid gap-3">
              {useCases.map((item) => (
                <div key={item} className="flex items-center justify-between border-t border-black/10 py-3">
                  <span className="text-sm font-medium text-black">{item}</span>
                  <ArrowUpRight className="h-3.5 w-3.5 text-black/[0.35]" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-black/10 py-20 lg:py-28">
        <div className="editorial-wrap">
          <SectionHeader
            label="Program Logic"
            title="A practical PQC transition is a sequence, not a slogan."
            body="QCertify separates the work into exposure, protected paths, trust readiness, crypto agility, and evidence for stakeholders."
            align="center"
          />
          <div className="mt-12 grid gap-px border-y border-black/10 bg-black/10 md:grid-cols-3">
            {[
              { icon: ShieldCheck, title: "Protect priority traffic", text: "Start with the paths whose data lifetime creates the highest pressure." },
              { icon: Network, title: "Keep operations stable", text: "Use an inline gateway model rather than a full endpoint rewrite on day one." },
              { icon: GitBranch, title: "Expand with evidence", text: "Let policy, deployment state, and exception records tell the transition story." },
            ].map((item, index) => (
              <FadeIn key={item.title} delay={index * 0.05}>
                <div className="h-full bg-[#f7f7f2] p-6">
                  <item.icon className="h-5 w-5 text-[#126dff]" />
                  <h3 className="mt-10 text-xl font-semibold text-black">{item.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-black/[0.58]">{item.text}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 lg:py-28">
        <div className="editorial-wrap">
          <div className="grid gap-4 md:grid-cols-3">
            <LinkCard
              href="/product"
              title="Explore QuantumHalon"
              text="See the inline gateway model, policy modes, and architecture boundary."
            />
            <LinkCard
              href="/use-cases"
              title="Map use cases"
              text="Identify where path-level PQC protection reduces long-lived traffic exposure."
            />
            <LinkCard
              href="/compliance"
              title="Plan readiness"
              text="Frame migration as a governed program with evidence and milestones."
            />
          </div>
        </div>
      </section>

      <section className="border-t border-black/10 py-20 lg:py-28">
        <div className="editorial-wrap grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end">
          <FadeIn>
            <SectionLabel label="Next Step" />
            <h2 className="max-w-5xl text-5xl font-medium leading-[0.9] text-black sm:text-6xl lg:text-8xl">
              Protect critical traffic before the quantum deadline arrives.
            </h2>
          </FadeIn>
          <FadeIn delay={0.1} className="flex flex-col gap-3 sm:flex-row lg:flex-col">
            <CTAButton href="/contact">Book a Technical Demo</CTAButton>
            <CTAButton href="/product" variant="secondary">
              Product Details
            </CTAButton>
          </FadeIn>
        </div>
      </section>
    </div>
  );
}

function HomeHero() {
  return (
    <section className="relative min-h-[92svh] overflow-hidden border-b border-black/10 pt-24">
      <div className="absolute inset-0 circuit-mask opacity-45" />
      <div className="editorial-wrap relative z-10 flex min-h-[calc(92svh-6rem)] flex-col justify-between pb-8 pt-8 lg:pt-12">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65 }}
        >
          <BrandLogo className="mb-6 h-10 w-[184px]" priority />
          <h1 className="max-w-7xl text-6xl font-medium leading-[0.82] text-black sm:text-7xl md:text-8xl lg:text-9xl xl:text-[9.25rem]">
            Post-Quantum
            <br />
            Security.
            <br />
            Without Rebuilding
            <br />
            Your Network.
          </h1>
        </motion.div>

        <div className="grid gap-8 pt-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-end">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.12, duration: 0.65 }}
            className="grid gap-5 border-t border-black pt-5 sm:grid-cols-2 lg:grid-cols-4"
          >
            {metadata.map((item) => (
              <div key={item.label} className="metadata">
                <strong>{item.label}</strong>
                {item.value}
              </div>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.18, duration: 0.65 }}
            className="technical-plate"
          >
            <div className="relative aspect-[16/9]">
              <Image
                src="/images/generated/quantum-computer-plate.webp"
                alt="Decorative monochrome technical plate showing a quantum computer."
                fill
                priority
                sizes="(min-width: 1024px) 45vw, 100vw"
                className="object-cover"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function EditorialPlate({
  src,
  alt,
  meta,
}: {
  src: string;
  alt: string;
  meta: [string, string, string];
}) {
  return (
    <section className="technical-plate">
      <div className="relative aspect-[16/7] min-h-[280px]">
        <Image src={src} alt={alt} fill sizes="100vw" className="object-cover" />
      </div>
      <div className="editorial-wrap grid grid-cols-3 gap-4 py-3 text-[9px] uppercase leading-4 text-black/[0.45]">
        <span>{meta[0]}</span>
        <span>{meta[1]}</span>
        <span className="text-right">{meta[2]}</span>
      </div>
    </section>
  );
}
