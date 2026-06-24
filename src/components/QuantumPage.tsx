"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Activity,
  ArrowRight,
  Ban,
  Cloud,
  Database,
  Eye,
  Fingerprint,
  GitBranch,
  KeyRound,
  Layers,
  Lock,
  Network,
  RefreshCw,
  Route,
  Server,
  Shield,
  ShieldCheck,
  Zap,
} from "lucide-react";
import CTAButton from "@/components/CTAButton";
import SectionLabel from "@/components/SectionLabel";

type IconType = React.ComponentType<{ className?: string }>;

export function FadeIn({
  children,
  className = "",
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.55, delay, ease: [0.25, 0.1, 0.25, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function PageHero({
  label,
  title,
  accent,
  body,
  imageSrc,
  imageAlt,
  chips = [],
  primaryCta = { href: "/contact", label: "Technical Demo" },
  secondaryCta,
  compact = false,
}: {
  label: string;
  title: string;
  accent?: string;
  body: React.ReactNode;
  imageSrc?: string;
  imageAlt?: string;
  chips?: string[];
  primaryCta?: { href: string; label: string };
  secondaryCta?: { href: string; label: string };
  compact?: boolean;
}) {
  return (
    <section
      className={`relative overflow-hidden border-b border-white/5 ${
        compact ? "pt-28 pb-16 lg:pt-36 lg:pb-20" : "min-h-[78vh] pt-28 pb-14 lg:pt-32 lg:pb-16"
      }`}
    >
      {imageSrc ? (
        <div className="absolute inset-0 z-0">
          <Image
            src={imageSrc}
            alt={imageAlt || ""}
            fill
            preload={!compact}
            sizes="100vw"
            className="object-cover opacity-80"
          />
          <div className="absolute inset-0 bg-[linear-gradient(90deg,#000_0%,rgba(0,0,0,0.88)_26%,rgba(0,0,0,0.34)_62%,#000_100%)]" />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.55)_0%,rgba(0,0,0,0.12)_45%,#000_100%)]" />
          <div className="absolute inset-0 circuit-mask opacity-70" />
        </div>
      ) : (
        <div className="absolute inset-0 z-0 circuit-mask opacity-70" />
      )}

      <div className="relative z-10 mx-auto flex h-full max-w-7xl items-center px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.65 }}>
            <SectionLabel label={label} />
            <h1
              className={`mt-5 max-w-4xl font-semibold leading-[1.01] text-white ${
                compact ? "text-4xl sm:text-5xl lg:text-6xl" : "text-5xl sm:text-6xl lg:text-8xl"
              }`}
            >
              {title}
              {accent ? (
                <>
                  {" "}
                  <span className="bg-gradient-to-r from-white via-sky-200 to-[#0ea5e9] bg-clip-text text-transparent">
                    {accent}
                  </span>
                </>
              ) : null}
            </h1>
            <div className="mt-6 max-w-xl text-base leading-7 text-slate-300 sm:text-lg">{body}</div>
            {chips.length ? (
              <div className="mt-7 flex flex-wrap gap-2">
                {chips.map((chip) => (
                  <span key={chip} className="rounded-md border border-white/10 bg-white/[0.04] px-3 py-1.5 text-[11px] font-medium uppercase tracking-[0.18em] text-slate-300">
                    {chip}
                  </span>
                ))}
              </div>
            ) : null}
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <CTAButton href={primaryCta.href}>{primaryCta.label}</CTAButton>
              {secondaryCta ? (
                <CTAButton href={secondaryCta.href} variant="secondary">
                  {secondaryCta.label}
                </CTAButton>
              ) : null}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export function SectionHeader({
  label,
  title,
  body,
  align = "left",
}: {
  label: string;
  title: React.ReactNode;
  body?: React.ReactNode;
  align?: "left" | "center";
}) {
  return (
    <FadeIn className={align === "center" ? "mx-auto max-w-3xl text-center" : "max-w-3xl"}>
      <SectionLabel label={label} />
      <h2 className="mt-4 text-3xl font-semibold leading-tight text-white md:text-5xl">{title}</h2>
      {body ? <div className="mt-4 text-base leading-7 text-slate-400">{body}</div> : null}
    </FadeIn>
  );
}

export function FeatureCard({
  icon: Icon,
  title,
  children,
  meta,
}: {
  icon: IconType;
  title: string;
  children: React.ReactNode;
  meta?: string;
}) {
  return (
    <div className="glass-panel glass-interactive group h-full rounded-lg p-5">
      <div className="mb-4 flex items-center justify-between gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-white/10 bg-white/[0.04] text-[#0ea5e9] transition-colors group-hover:border-[#0ea5e9]/40 group-hover:bg-[#0ea5e9]/10">
          <Icon className="h-5 w-5" />
        </div>
        {meta ? <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-slate-500">{meta}</span> : null}
      </div>
      <h3 className="text-base font-semibold text-white">{title}</h3>
      <div className="mt-2 text-sm leading-6 text-slate-400">{children}</div>
    </div>
  );
}

export function ImagePanel({
  src,
  alt,
  caption,
  preload = false,
}: {
  src: string;
  alt: string;
  caption?: string;
  preload?: boolean;
}) {
  return (
    <div className="relative overflow-hidden rounded-lg border border-white/10 bg-white/[0.025]">
      <div className="relative aspect-[16/9]">
        <Image src={src} alt={alt} fill preload={preload} sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover" />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_35%,rgba(0,0,0,0.82)_100%)]" />
        <div className="absolute inset-0 encrypted-scan opacity-70" />
      </div>
      {caption ? (
        <div className="border-t border-white/10 px-4 py-3 font-mono text-[10px] uppercase tracking-[0.2em] text-slate-500">
          {caption}
        </div>
      ) : null}
    </div>
  );
}

export function StatStrip({
  stats,
}: {
  stats: { value: string; label: string }[];
}) {
  return (
    <div className="grid grid-cols-2 gap-px overflow-hidden rounded-lg border border-white/10 bg-white/10 md:grid-cols-4">
      {stats.map((stat) => (
        <div key={stat.label} className="bg-black/80 p-4">
          <div className="text-lg font-semibold text-white">{stat.value}</div>
          <div className="mt-1 text-xs leading-5 text-slate-500">{stat.label}</div>
        </div>
      ))}
    </div>
  );
}

const modeCards = [
  {
    icon: Layers,
    title: "Mode 1",
    kicker: "Mediated protection",
    text: "For paths that require trusted mediation, QuantumHalon applies policy-selected post-quantum protection while preserving a bounded governance model.",
  },
  {
    icon: Lock,
    title: "Mode 2",
    kicker: "Opaque path protection",
    text: "For paths that should remain opaque, QuantumHalon protects transit without exposing application payloads to cloud services.",
  },
  {
    icon: Route,
    title: "Passthrough",
    kicker: "Transparent forwarding",
    text: "Approved paths can remain transparent while still being governed and visible at the policy layer. Exceptions are explicit, not accidental.",
  },
  {
    icon: Ban,
    title: "Block",
    kicker: "Policy denial",
    text: "When policy denies a path, traffic is stopped before it reaches the protected destination. Exceptions stay explicit and auditable.",
  },
];

export function ModeMatrixVisual() {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      {modeCards.map(({ icon: Icon, title, kicker, text }, index) => (
        <FadeIn key={title} delay={index * 0.05}>
          <div className="relative h-full overflow-hidden rounded-lg border border-white/10 bg-white/[0.03] p-5">
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#0ea5e9]/70 to-transparent" />
            <div className="flex items-start gap-4">
              <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-lg border border-[#0ea5e9]/25 bg-[#0ea5e9]/10 text-[#0ea5e9]">
                <Icon className="h-5 w-5" />
              </div>
              <div>
                <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#0ea5e9]/70">{kicker}</div>
            <h3 className="mt-1 text-lg font-semibold text-white">{title}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-400">{text}</p>
              </div>
            </div>
          </div>
        </FadeIn>
      ))}
    </div>
  );
}

export function InlineGatewayVisual() {
  return (
    <div className="relative overflow-hidden rounded-lg border border-white/10 bg-black/70 p-5 sm:p-6">
      <div className="absolute inset-0 circuit-mask opacity-60" />
      <div className="relative z-10">
        <div className="text-center font-mono text-[10px] uppercase tracking-[0.24em] text-slate-500">
          Traffic path: inline, transparent, policy-governed
        </div>

        <div className="mt-7 grid gap-4 lg:grid-cols-[1fr_72px_1.5fr_72px_1fr] lg:items-center">
          <DiagramNode title="Enterprise traffic" eyebrow="Source side">
            Existing users and applications continue through the planned flow.
          </DiagramNode>

          <div className="hidden h-px bg-[linear-gradient(90deg,transparent,rgba(148,163,184,0.45),transparent)] lg:block" />

          <div className="rounded-lg border border-[#0ea5e9]/45 bg-[#0ea5e9]/[0.08] p-4 shadow-[0_0_40px_rgba(14,165,233,0.12)]">
            <div className="rounded-lg border border-white/10 bg-black/35 p-4 text-center">
              <div className="font-mono text-[11px] font-semibold uppercase tracking-[0.24em] text-[#0ea5e9]">
                QuantumHalon
              </div>
              <h3 className="mt-3 text-xl font-semibold leading-tight text-white">
                Inline gateway
              </h3>
              <p className="mx-auto mt-3 max-w-sm text-sm leading-6 text-slate-400">
                Classify traffic at a high level, apply the selected mode, and enforce governed policy.
              </p>
              <div className="mt-4 inline-flex items-center gap-2 rounded-md border border-emerald-400/20 bg-emerald-400/10 px-3 py-1.5 text-xs text-emerald-300">
                <span className="h-2 w-2 rounded-full bg-emerald-400" />
                Policy ready
              </div>
            </div>
          </div>

          <div className="hidden h-px bg-[linear-gradient(90deg,transparent,rgba(14,165,233,0.7),transparent)] lg:block" />

          <DiagramNode title="Network edge" eyebrow="Destination side">
            Protected paths continue toward their intended destinations.
          </DiagramNode>
        </div>

        <div className="mx-auto mt-5 max-w-xl rounded-lg border border-white/10 bg-white/[0.03] p-4 text-center">
          <div className="text-sm font-semibold text-white">QCertify governance stays out of path</div>
          <p className="mt-2 text-sm leading-6 text-slate-400">
            Policy direction and operational signals are exchanged separately from live packets.
          </p>
        </div>
      </div>
    </div>
  );
}

function DiagramNode({
  title,
  eyebrow,
  children,
}: {
  title: string;
  eyebrow: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-lg border border-white/10 bg-white/[0.035] p-4">
      <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-slate-500">{eyebrow}</div>
      <h3 className="mt-2 text-lg font-semibold leading-tight text-white">{title}</h3>
      <p className="mt-2 text-sm leading-6 text-slate-400">{children}</p>
    </div>
  );
}

export function PrivacyBoundary() {
  const items = [
    { icon: Cloud, title: "Cloud stays out of path", text: "QCertify services help govern deployment without becoming a live packet processor." },
    { icon: Database, title: "Payload privacy by design", text: "Protection modes are designed around clear boundaries for traffic visibility and operator control." },
    { icon: KeyRound, title: "Custody stays bounded", text: "Sensitive trust operations stay within controlled custody boundaries instead of being exposed broadly." },
  ];

  return (
    <div className="grid gap-4 lg:grid-cols-3">
      {items.map((item, index) => (
        <FadeIn key={item.title} delay={index * 0.07}>
          <FeatureCard icon={item.icon} title={item.title}>
            {item.text}
          </FeatureCard>
        </FadeIn>
      ))}
    </div>
  );
}

export const homeCapabilities = [
  {
    icon: Network,
    title: "Inline transparent deployment",
    text: "QuantumHalon sits inline at governed network chokepoints, so protected paths cross the gateway by design.",
  },
  {
    icon: ShieldCheck,
    title: "Hybrid PQC on real traffic paths",
    text: "Policy-selected post-quantum profiles help protect high-value traffic while the broader ecosystem transitions.",
  },
  {
    icon: RefreshCw,
    title: "Crypto agility under policy",
    text: "Protection behavior is governed centrally, so migration can be staged instead of hard-coded into every application.",
  },
  {
    icon: Eye,
    title: "Visibility without cloud packet access",
    text: "QCertify governance surfaces deployment state without making cloud services the packet path.",
  },
];

export const migrationSteps = [
  { title: "Discover protected paths", text: "Map sites, critical services, regulatory pressure, and data lifetime." },
  { title: "Choose the mode per path", text: "Use mediated protection, opaque protection, approved passthrough, or block according to policy." },
  { title: "Roll out trust centrally", text: "Prepare enterprise trust for mediated paths through standard organizational distribution processes." },
  { title: "Expand with evidence", text: "Use deployment state, operational signals, and change records to prove progress without destabilizing the network." },
];

export const audienceCards = [
  { icon: Shield, title: "Security leaders", text: "Reduce Harvest Now, Decrypt Later exposure on high-value communications before the migration clock becomes urgent." },
  { icon: GitBranch, title: "Network architects", text: "Add PQC protection at governed chokepoints while preserving existing operations and application behavior." },
  { icon: Fingerprint, title: "Risk and compliance teams", text: "Create a defensible story around crypto inventory, phased migration, custody boundaries, and governance." },
];

export const resourceTopics = [
  {
    category: "Quantum Risk",
    icon: Shield,
    items: [
      "Harvest Now, Decrypt Later threat modeling",
      "Data lifetime and cryptographic exposure",
      "Why migration pressure begins before CRQCs exist",
    ],
  },
  {
    category: "Architecture",
    icon: Server,
    items: [
      "Inline gateway deployment at network chokepoints",
      "Mode 1 vs Mode 2 decision patterns",
      "Privacy boundaries and controlled enforcement",
    ],
  },
  {
    category: "Migration",
    icon: Activity,
    items: [
      "Crypto agility operating models",
      "Trust readiness for mediated protection",
      "Evidence for regulated transition programs",
    ],
  },
  {
    category: "Governance",
    icon: Zap,
    items: [
      "Policy-driven exception decisions",
      "Cryptographic lifecycle management",
      "Procurement-ready PQC readiness narratives",
    ],
  },
];

export function LinkCard({
  href,
  title,
  text,
}: {
  href: string;
  title: string;
  text: string;
}) {
  return (
    <Link href={href} className="glass-panel glass-interactive group block h-full rounded-lg p-5">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="text-base font-semibold text-white">{title}</h3>
          <p className="mt-2 text-sm leading-6 text-slate-400">{text}</p>
        </div>
        <ArrowRight className="mt-1 h-4 w-4 flex-shrink-0 text-slate-500 transition-colors group-hover:text-[#0ea5e9]" />
      </div>
    </Link>
  );
}
