"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  ArrowUpRight,
  CheckCircle2,
  GitBranch,
  KeyRound,
  LockKeyhole,
  Network,
} from "lucide-react";
import SectionLabel from "@/components/SectionLabel";
import CTAButton from "@/components/CTAButton";
import { Marquee } from "@/components/Editorial";
import {
  ClosingCta,
  FadeIn,
  LinkCard,
  RevealLines,
  RevealText,
  ScrollStatement,
  SectionHeader,
  StatStrip,
} from "@/components/QuantumPage";

const tickerItems = [
  "Harvest now, decrypt later",
  "Hybrid PQC profiles",
  "Inline gateway fabric",
  "Crypto agility under policy",
  "Zero network rebuild",
  "Governed exception control",
  "Readiness evidence",
  "Control plane out of path",
];

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

      <Marquee items={tickerItems} className="border-t-0" />

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
        caption="Captured traffic archives can outlive today's encryption"
      />

      <section className="border-b border-black/10 py-20 lg:py-28">
        <div className="editorial-wrap grid gap-12 lg:grid-cols-[1.15fr_0.85fr] lg:items-start">
          <FadeIn>
            <SectionLabel label="The Risk" />
            <h2 className="max-w-5xl text-6xl font-medium leading-[0.84] text-black sm:text-7xl lg:text-8xl">
              <RevealLines lines={["Harvest Now.", "Decrypt Later."]} />
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
                "Give security, risk, and procurement teams a defensible readiness record.",
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

      <ScrollStatement
        label="Why Timing Matters"
        text="Encrypted traffic captured today may remain sensitive long enough to become readable in the quantum era. Priority paths need protection before application-wide migration is complete."
        caption="Organizations can reduce Harvest Now, Decrypt Later exposure by prioritizing data lifetime, inline enforcement, and transition evidence."
        metadata={["Long-lived sensitive data", "Inline protected paths", "Readiness evidence"]}
      />

      <section className="border-b border-black/10 py-20 lg:py-28">
        <div className="editorial-wrap">
          <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
            <SectionHeader
              label="First Solution"
              title="QuantumHalon protects selected paths without rebuilding the network."
              body="The gateway sits inline at governed chokepoints. Policy selects the behavior per traffic path while QCertify governance remains outside live packet handling."
            />
            <FadeIn delay={0.1}>
              <HomeInlineDiagram />
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
        caption="Inline gateway protection belongs in the existing path"
      />

      <section className="border-b border-black/10 py-20 lg:py-28">
        <div className="editorial-wrap grid gap-12 lg:grid-cols-[0.95fr_1.05fr]">
          <FadeIn>
            <SectionLabel label="Protection Modes" />
            <h2 className="text-6xl font-medium leading-[0.84] text-black sm:text-7xl lg:text-8xl">
              <RevealLines lines={["One gateway.", "Different decisions."]} />
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
              <div className="border-t border-black/10 px-4 py-3 text-[11px] uppercase leading-4 text-black/[0.50]">
                Governance stays separate from live packet handling
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
              { step: "01", title: "Protect priority traffic", text: "Priority paths are defined by data lifetime, exposure, and operating pressure." },
              { step: "02", title: "Keep operations stable", text: "Use an inline gateway model rather than a full endpoint rewrite on day one." },
              { step: "03", title: "Expand with evidence", text: "Use policy, deployment state, and exception records to document transition progress." },
            ].map((item, index) => (
              <FadeIn key={item.title} delay={index * 0.05}>
                <div className="grid h-full grid-rows-[auto_1fr] bg-[#f7f7f2] p-6">
                  <div className="flex items-center justify-between border-b border-black/10 pb-4">
                    <span className="text-[10px] font-semibold uppercase text-[#126dff]">{item.step}</span>
                    <span className="h-px w-16 bg-black/20" />
                  </div>
                  <div className="pt-7">
                    <h3 className="text-xl font-semibold leading-tight text-black">{item.title}</h3>
                    <p className="mt-4 text-sm leading-6 text-black/[0.58]">{item.text}</p>
                  </div>
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
              text="Review the inline gateway model, policy modes, and architecture boundary."
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

      <ClosingCta
        label="Next Step"
        title="Critical traffic should be protected before the quantum deadline arrives."
        align="split"
        actions={[
          { href: "/contact", label: "Book a Technical Demo" },
          { href: "/product", label: "Product Details", variant: "secondary" },
        ]}
        motionStyle="clip-up"
      />
    </div>
  );
}

function HomeInlineDiagram() {
  return (
    <div className="technical-plate overflow-hidden">
      <div className="border-b border-black/10 px-4 py-3 text-[11px] uppercase leading-4 text-black/[0.50]">
        High-level model / inline protection point
      </div>
      <div className="relative min-h-[280px] p-6 sm:p-8">
        <svg className="absolute inset-0 h-full w-full" viewBox="0 0 900 340" preserveAspectRatio="none" aria-hidden="true">
          <defs>
            <pattern id="home-diagram-grid" width="48" height="48" patternUnits="userSpaceOnUse">
              <path d="M 48 0 L 0 0 0 48" fill="none" stroke="rgba(0,0,0,0.045)" strokeWidth="1" />
            </pattern>
          </defs>
          <rect width="900" height="340" fill="url(#home-diagram-grid)" />
          <path d="M 92 174 H 808" stroke="rgba(0,0,0,0.30)" strokeWidth="1.2" />
          <path d="M 92 194 H 808" stroke="rgba(0,0,0,0.12)" strokeWidth="1" />
          <path d="M 450 68 V 274" stroke="rgba(0,0,0,0.18)" strokeWidth="1" />
          <path
            d="M 362 174 H 538"
            stroke="#126dff"
            strokeWidth="2"
            strokeDasharray="6 6"
            className="anim-flow-dash"
          />
          <motion.rect
            y="169"
            width="10"
            height="10"
            fill="#126dff"
            initial={{ x: 88, opacity: 0 }}
            animate={{ x: [88, 802], opacity: [0, 1, 1, 1, 0] }}
            transition={{ duration: 3.6, repeat: Infinity, ease: "linear", repeatDelay: 0.6 }}
          />
          <rect x="358" y="170" width="8" height="8" fill="#126dff" className="anim-pulse-glow" />
          <rect x="534" y="170" width="8" height="8" fill="#126dff" className="anim-pulse-glow" />
        </svg>

        <div className="relative z-10 grid min-h-[230px] gap-6 sm:grid-cols-[1fr_220px_1fr] sm:items-center">
          <div className="max-w-xs">
            <div className="text-[10px] font-semibold uppercase leading-4 text-black/[0.45]">01 / existing path</div>
            <h3 className="mt-2 text-2xl font-semibold leading-tight text-black">Traffic keeps moving</h3>
            <p className="mt-4 text-sm leading-6 text-black/[0.58]">
              Selected enterprise paths continue through the planned network route.
            </p>
          </div>

          <div className="border border-[#126dff]/70 bg-white/80 px-5 py-6 text-center shadow-[0_18px_45px_rgba(18,109,255,0.08)]">
            <div className="text-[10px] font-semibold uppercase leading-4 text-[#126dff]">QuantumHalon</div>
            <h3 className="mt-2 text-2xl font-semibold leading-tight text-black">Inline gateway</h3>
            <p className="mx-auto mt-4 max-w-36 text-sm leading-6 text-black/[0.58]">
              One governed decision point.
            </p>
          </div>

          <div className="max-w-xs sm:justify-self-end">
            <div className="text-[10px] font-semibold uppercase leading-4 text-black/[0.45]">02 / policy outcome</div>
            <h3 className="mt-2 text-2xl font-semibold leading-tight text-black">Protect, pass, or block</h3>
            <p className="mt-4 text-sm leading-6 text-black/[0.58]">
              Policy selects the behavior for each protected path.
            </p>
          </div>
        </div>
      </div>
      <div className="border-t border-black/10 px-4 py-3 text-[11px] uppercase leading-4 text-black/[0.50]">
        QCertify governance remains outside live packet handling
      </div>
    </div>
  );
}

function HeroOutlineText({
  text,
  units,
  delay,
  widthEm,
  fillBackground = false,
  className = "",
}: {
  text: string;
  units: number;
  delay: number;
  widthEm?: number;
  fillBackground?: boolean;
  className?: string;
}) {
  return (
    <motion.span
      aria-label={text}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className={`inline-block overflow-visible align-baseline leading-none ${className}`}
      style={{ width: `${widthEm ?? (units + 8) / 100}em` }}
    >
      <span className="sr-only">{text}</span>
      <svg
        aria-hidden="true"
        focusable="false"
        viewBox={`0 0 ${units + 8} 100`}
        preserveAspectRatio={widthEm ? "none" : "xMinYMid meet"}
        className="block h-[1em] w-full overflow-visible"
      >
        <text
          x="4"
          y="80"
          fill={fillBackground ? "var(--paper)" : "none"}
          stroke="currentColor"
          strokeLinejoin="miter"
          strokeMiterlimit="4"
          strokeWidth={fillBackground ? "3.8" : "1.35"}
          paintOrder={fillBackground ? "stroke fill" : "normal"}
          vectorEffect="non-scaling-stroke"
          style={{
            fontFamily: "var(--font-inter), Arial, Helvetica, sans-serif",
            fontSize: 100,
            fontWeight: 500,
          }}
        >
          {text}
        </text>
      </svg>
    </motion.span>
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
          <div className="mb-8 flex flex-wrap items-center gap-x-4 gap-y-2 border-b border-black/10 pb-4 text-[10px] font-semibold uppercase leading-none">
            <span className="flex items-center gap-2 text-black">
              <span className="anim-hold-blink h-2 w-2 bg-[#126dff]" />
              Post-quantum cybersecurity
            </span>
            <span className="hidden h-3 w-px bg-black/20 sm:block" />
            <span className="text-black/[0.45]">Harvest now, decrypt later is already running</span>
          </div>

          <h1 className="max-w-6xl text-[clamp(2.15rem,9.2vw,7.2rem)] font-medium leading-[0.98] text-black sm:text-[clamp(2.35rem,10vw,7.2rem)] sm:leading-[0.94]">
            <span className="block">
              <RevealText text="Post-Quantum" immediate />
            </span>
            <span className="block">
              <RevealText text="Security." delay={0.08} immediate />
            </span>
            <span className="block sm:hidden">
              <HeroOutlineText text="Without Network" units={810} delay={0.16} fillBackground />
            </span>
            <span className="block sm:hidden">
              <HeroOutlineText text="Rebuild" units={357} delay={0.24} fillBackground />
              <motion.span
                aria-hidden="true"
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.9, duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                className="anim-hold-blink ml-3 inline-block h-[0.14em] w-[0.14em] bg-[#126dff] align-baseline"
              />
            </span>
            <span className="hidden sm:block">
              <HeroOutlineText text="Without Network" units={810} delay={0.16} fillBackground />
            </span>
            <span className="hidden sm:block">
              <HeroOutlineText text="Rebuild" units={357} delay={0.24} fillBackground />
              <motion.span
                aria-hidden="true"
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.9, duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                className="anim-hold-blink ml-3 inline-block h-[0.14em] w-[0.14em] bg-[#126dff] align-baseline sm:ml-4"
              />
            </span>
          </h1>

          <div className="mt-9 grid gap-6 lg:grid-cols-[1fr_auto] lg:items-end">
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="max-w-[21rem] border-l-2 border-[#126dff] pl-4 text-[15px] leading-7 text-black/[0.65] sm:max-w-xl sm:text-lg sm:leading-8"
            >
              Traffic captured today gets decrypted tomorrow. QuantumHalon drops
              post-quantum protection onto the paths you already operate —
              inline, policy-governed, live in days.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.62, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-col gap-3 sm:flex-row"
            >
              <CTAButton href="/contact">Book a Technical Demo</CTAButton>
              <CTAButton href="/how-it-works" variant="secondary">
                See How It Works
              </CTAButton>
            </motion.div>
          </div>
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
            <div className="relative aspect-[16/9] overflow-hidden">
              <Image
                src="/images/generated/quantum-computer-plate.webp"
                alt="Decorative monochrome technical plate showing a quantum computer."
                fill
                preload
                sizes="(min-width: 1024px) 45vw, 100vw"
                className="object-cover"
              />
              <div
                aria-hidden="true"
                className="anim-plate-scan pointer-events-none absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-transparent via-[#126dff]/[0.07] to-transparent"
              />
            </div>
            <div className="grid grid-cols-[1fr_auto] items-center gap-4 border-t border-black/10 px-4 py-3 text-[11px] uppercase leading-4 text-black/[0.50]">
              <span>Quantum hardware marks the future risk horizon</span>
              <span className="flex items-center gap-2 text-[9px] font-semibold text-black/[0.42]">
                <span className="anim-hold-blink h-1.5 w-1.5 bg-[#126dff]" />
                Monitoring
              </span>
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
  caption,
}: {
  src: string;
  alt: string;
  caption: string;
}) {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const parallaxY = useTransform(scrollYProgress, [0, 1], ["-7%", "7%"]);

  return (
    <motion.section
      ref={ref}
      className="technical-plate"
      initial={{ opacity: 0.95, clipPath: "inset(0 0 12% 0)" }}
      whileInView={{ opacity: 1, clipPath: "inset(0 0 0% 0)" }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="relative aspect-[16/7] min-h-[280px] overflow-hidden">
        <motion.div className="absolute inset-[-8%_0]" style={{ y: parallaxY }}>
          <Image src={src} alt={alt} fill sizes="100vw" className="object-cover" />
        </motion.div>
      </div>
      <div className="editorial-wrap py-3 text-[11px] uppercase leading-4 text-black/[0.50]">
        {caption}
      </div>
    </motion.section>
  );
}
