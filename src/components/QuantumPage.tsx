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
  plateMeta,
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
  plateMeta?: [string, string, string];
  chips?: string[];
  primaryCta?: { href: string; label: string };
  secondaryCta?: { href: string; label: string };
  compact?: boolean;
}) {
  const imageMeta = plateMeta ?? [
    `Context / ${label}`,
    "Asset / Decorative technical plate",
    "Role / Visual narrative support",
  ];

  return (
    <section
      className={`relative overflow-hidden border-b border-black/10 ${
        compact ? "pt-28 pb-14 lg:pt-36 lg:pb-20" : "min-h-[78vh] pt-28 pb-14 lg:pt-32 lg:pb-16"
      }`}
    >
      <div className="absolute inset-0 z-0 circuit-mask opacity-50" />

      <div className="editorial-wrap relative z-10 grid gap-10 lg:grid-cols-[0.92fr_1.08fr] lg:items-end">
        <div>
          <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.65 }}>
            <SectionLabel label={label} />
            <h1
              className={`mt-3 max-w-5xl font-medium leading-[0.9] text-black ${
                compact ? "text-5xl sm:text-6xl lg:text-7xl" : "text-6xl sm:text-7xl lg:text-8xl"
              }`}
            >
              {title}
              {accent ? (
                <>
                  {" "}
                  <span className="text-[#126dff]">{accent}</span>
                </>
              ) : null}
            </h1>
            <div className="mt-7 max-w-xl text-base leading-7 text-black/[0.62] sm:text-lg">{body}</div>
            {chips.length ? (
              <div className="mt-8 grid gap-2 border-t border-black/10 pt-4 sm:grid-cols-2">
                {chips.map((chip) => (
                  <span key={chip} className="border-l border-black/20 pl-3 text-[10px] font-semibold uppercase leading-5 text-black/[0.58]">
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
        {imageSrc ? (
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.12, duration: 0.65 }}
            className="technical-plate min-h-[280px]"
          >
            <div className="relative aspect-[16/9]">
              <Image
                src={imageSrc}
                alt={imageAlt || ""}
                fill
                preload={!compact}
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover"
              />
            </div>
            <div className="grid grid-cols-3 gap-3 border-t border-black/10 px-4 py-3 text-[9px] uppercase leading-4 text-black/[0.45]">
              <span>{imageMeta[0]}</span>
              <span>{imageMeta[1]}</span>
              <span className="text-right">{imageMeta[2]}</span>
            </div>
          </motion.div>
        ) : null}
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
      <h2 className="mt-3 text-4xl font-medium leading-[0.95] text-black md:text-6xl">{title}</h2>
      {body ? <div className="mt-5 text-base leading-7 text-black/60">{body}</div> : null}
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
    <div className="glass-panel glass-interactive group h-full p-5">
      <div className="mb-5 flex items-center justify-between gap-3">
        <div className="flex h-10 w-10 items-center justify-center border border-black/[0.12] bg-white text-[#126dff] transition-colors group-hover:border-black">
          <Icon className="h-5 w-5" />
        </div>
        {meta ? <span className="text-[10px] uppercase text-black/[0.45]">{meta}</span> : null}
      </div>
      <h3 className="text-base font-semibold text-black">{title}</h3>
      <div className="mt-2 text-sm leading-6 text-black/[0.58]">{children}</div>
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
    <div className="technical-plate">
      <div className="relative aspect-[16/9]">
        <Image src={src} alt={alt} fill preload={preload} sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover" />
      </div>
      {caption ? (
        <div className="border-t border-black/10 px-4 py-3 text-[10px] uppercase text-black/[0.45]">
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
    <div className="grid grid-cols-2 border-y border-black/10 md:grid-cols-4">
      {stats.map((stat) => (
        <div key={stat.label} className="border-r border-black/10 bg-white/[0.35] p-4 last:border-r-0">
          <div className="text-lg font-semibold text-black">{stat.value}</div>
          <div className="mt-1 text-xs leading-5 text-black/50">{stat.label}</div>
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
          <div className="relative h-full overflow-hidden border border-black/10 bg-white/[0.45] p-5">
            <div className="absolute inset-x-0 top-0 h-px bg-black" />
            <div className="flex items-start gap-4">
              <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center border border-black/[0.12] bg-white text-[#126dff]">
                <Icon className="h-5 w-5" />
              </div>
              <div>
                <div className="text-[10px] font-semibold uppercase text-[#126dff]">{kicker}</div>
                <h3 className="mt-1 text-lg font-semibold text-black">{title}</h3>
                <p className="mt-2 text-sm leading-6 text-black/[0.58]">{text}</p>
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
    <div
      className="technical-plate relative overflow-hidden bg-white/[0.55]"
      role="img"
      aria-label="Technical plate showing enterprise traffic passing through a QuantumHalon inline gateway while QCertify governance remains out of the live packet path."
    >
      <div className="grid grid-cols-[1fr_auto] border-b border-black/10 px-4 py-3 text-[9px] uppercase leading-4 text-black/[0.45]">
        <span>Traffic path / Local packet plane</span>
        <span className="text-right">Governance / Out of band</span>
      </div>

      <div className="relative aspect-[16/8] min-h-[340px]">
        <svg className="absolute inset-0 h-full w-full" viewBox="0 0 960 480" preserveAspectRatio="none" aria-hidden="true">
          <defs>
            <pattern id="gateway-grid" width="48" height="48" patternUnits="userSpaceOnUse">
              <path d="M 48 0 L 0 0 0 48" fill="none" stroke="rgba(0,0,0,0.055)" strokeWidth="1" />
            </pattern>
            <linearGradient id="gateway-sheen" x1="0" x2="1" y1="0" y2="1">
              <stop offset="0" stopColor="#126dff" stopOpacity="0.12" />
              <stop offset="0.48" stopColor="#ffffff" stopOpacity="0" />
              <stop offset="1" stopColor="#126dff" stopOpacity="0.10" />
            </linearGradient>
          </defs>

          <rect width="960" height="480" fill="url(#gateway-grid)" />
          <path d="M 70 240 H 890" stroke="rgba(0,0,0,0.42)" strokeWidth="1.2" />
          <path d="M 70 258 H 890" stroke="rgba(0,0,0,0.14)" strokeWidth="1" />
          <path d="M 70 338 C 236 315 350 326 480 338 C 618 351 728 363 890 338" fill="none" stroke="rgba(18,109,255,0.58)" strokeWidth="1" strokeDasharray="6 9" />

          <rect x="390" y="78" width="180" height="300" fill="url(#gateway-sheen)" stroke="rgba(18,109,255,0.62)" strokeWidth="1" />
          <path d="M 480 52 V 406" stroke="rgba(0,0,0,0.20)" strokeWidth="1" />
          <path d="M 390 240 H 570" stroke="#126dff" strokeWidth="2" />
          <circle cx="390" cy="240" r="4" fill="#126dff" />
          <circle cx="570" cy="240" r="4" fill="#126dff" />

        </svg>

        <div className="absolute inset-0 hidden md:block">
          <div className="absolute left-6 top-[35%] max-w-[230px] -translate-y-1/2">
            <div className="text-[10px] font-semibold uppercase leading-4 text-black/[0.45]">Source side</div>
            <h3 className="mt-2 text-2xl font-semibold leading-tight text-black">Enterprise traffic</h3>
            <p className="mt-12 text-sm leading-6 text-black/[0.58]">Users and applications stay on the planned route.</p>
          </div>

          <div className="absolute left-1/2 top-[36%] w-60 -translate-x-1/2 -translate-y-1/2 text-center">
            <div className="text-[10px] font-semibold uppercase leading-4 text-[#126dff]">QuantumHalon</div>
            <h3 className="mt-2 text-2xl font-semibold leading-tight text-black">Inline gateway</h3>
            <p className="mt-20 text-sm leading-6 text-black/[0.58]">Classify path / select mode / enforce policy</p>
            <div className="mt-3 inline-flex items-center gap-2 border border-black/15 bg-white px-3 py-1.5 text-xs text-black/60">
              <span className="h-2 w-2 bg-[#126dff]" />
              Policy ready
            </div>
          </div>

          <div className="absolute right-6 top-[35%] max-w-[230px] -translate-y-1/2">
            <div className="text-[10px] font-semibold uppercase leading-4 text-black/[0.45]">Destination side</div>
            <h3 className="mt-2 text-2xl font-semibold leading-tight text-black">Network edge</h3>
            <p className="mt-12 text-sm leading-6 text-black/[0.58]">Protected paths continue to intended destinations.</p>
          </div>
        </div>
      </div>

      <div className="grid gap-0 border-t border-black/10 md:hidden">
        {[
          ["01", "Enterprise traffic", "Users and applications stay on the planned route."],
          ["02", "QuantumHalon inline gateway", "Classify path, select mode, and enforce policy."],
          ["03", "Network edge", "Protected paths continue to intended destinations."],
        ].map(([number, title, text]) => (
          <div key={title} className="grid grid-cols-[40px_1fr] gap-3 border-b border-black/10 px-4 py-4 last:border-b-0">
            <span className="text-[10px] font-semibold uppercase text-[#126dff]">{number}</span>
            <span>
              <strong className="block text-sm text-black">{title}</strong>
              <span className="mt-1 block text-sm leading-6 text-black/[0.58]">{text}</span>
            </span>
          </div>
        ))}
      </div>

      <div className="grid gap-4 border-t border-black/10 px-4 py-4 text-sm leading-6 text-black/[0.58] md:grid-cols-[0.68fr_1fr]">
        <strong className="text-black">QCertify governance stays out of path</strong>
        <span>Policy direction and operational signals move separately from live packets, keeping the plate clean and the operating model easy to read.</span>
      </div>
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
  { title: "Prepare trust readiness", text: "Prepare enterprise trust for mediated paths through standard organizational processes." },
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
    <Link href={href} className="glass-panel glass-interactive group block h-full p-5">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="text-base font-semibold text-black">{title}</h3>
          <p className="mt-2 text-sm leading-6 text-black/[0.58]">{text}</p>
        </div>
        <ArrowRight className="mt-1 h-4 w-4 flex-shrink-0 text-black/[0.35] transition-colors group-hover:text-[#126dff]" />
      </div>
    </Link>
  );
}
