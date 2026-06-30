"use client";

import React, { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform, type MotionValue } from "framer-motion";
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

const smoothEase = [0.22, 1, 0.36, 1] as const;

function splitText(text: string) {
  return text.split(/(\s+)/).filter(Boolean);
}

export function RevealText({
  text,
  className = "",
  delay = 0,
  stagger = 0.026,
}: {
  text: string;
  className?: string;
  delay?: number;
  stagger?: number;
}) {
  return (
    <motion.span
      aria-label={text}
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      variants={{
        hidden: {},
        visible: {
          transition: {
            delayChildren: delay,
            staggerChildren: stagger,
          },
        },
      }}
    >
      {splitText(text).map((token, index) =>
        token.trim() ? (
          <span key={`${token}-${index}`} aria-hidden="true" className="inline-block overflow-hidden align-bottom">
            <motion.span
              className="inline-block will-change-transform"
              variants={{
                hidden: { opacity: 0, y: "105%" },
                visible: {
                  opacity: 1,
                  y: "0%",
                  transition: { duration: 0.72, ease: smoothEase },
                },
              }}
            >
              {token}
            </motion.span>
          </span>
        ) : (
          <span key={`space-${index}`} aria-hidden="true">
            {token}
          </span>
        ),
      )}
    </motion.span>
  );
}

export function RevealLines({
  lines,
  className = "",
  delay = 0,
}: {
  lines: string[];
  className?: string;
  delay?: number;
}) {
  return (
    <span className={`block ${className}`}>
      {lines.map((line, index) => (
        <span key={line} className="block">
          <RevealText text={line} delay={delay + index * 0.08} />
        </span>
      ))}
    </span>
  );
}

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
      transition={{ duration: 0.58, delay, ease: smoothEase }}
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
  plateCaption,
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
  plateCaption?: string;
  chips?: string[];
  primaryCta?: { href: string; label: string };
  secondaryCta?: { href: string; label: string };
  compact?: boolean;
}) {
  const imageCaption = plateCaption ?? `${label} visualizes the page theme as a decorative technical plate`;

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
              <RevealText text={title} />
              {accent ? (
                <>
                  {" "}
                  <RevealText text={accent} className="text-[#126dff]" delay={0.12} />
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
            initial={{ opacity: 0, y: 24, clipPath: "inset(0 0 14% 0)" }}
            animate={{ opacity: 1, y: 0, clipPath: "inset(0 0 0% 0)" }}
            transition={{ delay: 0.12, duration: 0.75, ease: smoothEase }}
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
            <div className="border-t border-black/10 px-4 py-3 text-[11px] uppercase leading-4 text-black/[0.50]">
              {imageCaption}
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
      <h2 className="mt-3 text-4xl font-medium leading-[0.95] text-black md:text-6xl">
        {typeof title === "string" ? <RevealText text={title} /> : title}
      </h2>
      {body ? <div className="mt-5 text-base leading-7 text-black/60">{body}</div> : null}
    </FadeIn>
  );
}

export function ScrollStatement({
  label,
  text,
  caption,
  metadata = [],
}: {
  label: string;
  text: string;
  caption: string;
  metadata?: string[];
}) {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.82", "end 0.68"],
  });
  const words = text.split(/\s+/);

  return (
    <section ref={ref} className="relative min-h-[138svh] border-b border-black/10">
      <div className="sticky top-16 flex min-h-[calc(100svh-4rem)] items-center overflow-hidden py-16">
        <div className="absolute inset-0 circuit-mask opacity-35" />
        <div className="editorial-wrap relative z-10 grid w-full gap-12 lg:grid-cols-[0.42fr_1fr] lg:items-end">
          <div>
            <SectionLabel label={label} />
            <p className="mt-5 max-w-sm text-sm leading-6 text-black/[0.58]">{caption}</p>
            {metadata.length ? (
              <div className="mt-8 grid gap-px border-y border-black/10 bg-black/10 sm:grid-cols-3 lg:grid-cols-1">
                {metadata.map((item, index) => (
                  <div key={item} className="bg-[#f7f7f2] px-4 py-3">
                    <div className="text-[10px] font-semibold uppercase text-[#126dff]">
                      {String(index + 1).padStart(2, "0")}
                    </div>
                    <div className="mt-1 text-xs leading-5 text-black/[0.58]">{item}</div>
                  </div>
                ))}
              </div>
            ) : null}
          </div>

          <div>
            <p
              aria-label={text}
              className="max-w-6xl text-4xl font-medium leading-[0.98] text-black sm:text-5xl md:text-6xl lg:text-7xl"
            >
              {words.map((word, index) => (
                <ScrollStatementWord
                  key={`${word}-${index}`}
                  word={word}
                  index={index}
                  total={words.length}
                  progress={scrollYProgress}
                />
              ))}
            </p>
            <div className="mt-10 h-px overflow-hidden bg-black/10">
              <motion.div className="h-full origin-left bg-[#126dff]" style={{ scaleX: scrollYProgress }} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ScrollStatementWord({
  word,
  index,
  total,
  progress,
}: {
  word: string;
  index: number;
  total: number;
  progress: MotionValue<number>;
}) {
  const start = Math.max(0, (index / total) * 0.64 - 0.02);
  const end = Math.min(0.82, start + 0.12);
  const opacity = useTransform(progress, [start, end], [0.14, 1]);
  const y = useTransform(progress, [start, end], [16, 0]);

  return (
    <motion.span aria-hidden="true" className="mr-[0.22em] inline-block will-change-transform" style={{ opacity, y }}>
      {word}
    </motion.span>
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
    <motion.div
      whileHover={{ y: -3 }}
      transition={{ duration: 0.2, ease: "easeOut" }}
      className="group h-full border-t border-black/10 py-5"
    >
      <div className="flex items-start gap-4">
        <div className="mt-0.5 flex w-12 flex-shrink-0 items-center gap-3">
          <Icon className="h-4 w-4 text-[#126dff]" />
          <span className="h-px flex-1 bg-black/20 transition-colors group-hover:bg-[#126dff]/45" />
        </div>
        <div>
          {meta ? <div className="mb-2 text-[10px] uppercase leading-4 text-black/[0.45]">{meta}</div> : null}
          <h3 className="text-base font-semibold leading-tight text-black">{title}</h3>
          <div className="mt-3 text-sm leading-6 text-black/[0.58]">{children}</div>
        </div>
      </div>
    </motion.div>
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
    <motion.div
      className="technical-plate"
      initial={{ opacity: 0.92, clipPath: "inset(0 0 10% 0)" }}
      whileInView={{ opacity: 1, clipPath: "inset(0 0 0% 0)" }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, ease: smoothEase }}
    >
      <motion.div
        className="relative aspect-[16/9]"
        initial={{ scale: 1.035 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 1.1, ease: smoothEase }}
      >
        <Image src={src} alt={alt} fill preload={preload} sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover" />
      </motion.div>
      {caption ? (
        <div className="border-t border-black/10 px-4 py-3 text-[11px] uppercase leading-4 text-black/[0.50]">
          {caption}
        </div>
      ) : null}
    </motion.div>
  );
}

export function StatStrip({
  stats,
}: {
  stats: { value: string; label: string }[];
}) {
  return (
    <motion.div
      className="grid grid-cols-2 border-y border-black/10 md:grid-cols-4"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-70px" }}
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: 0.06 } },
      }}
    >
      {stats.map((stat) => (
        <motion.div
          key={stat.label}
          className="border-r border-black/10 bg-white/[0.35] p-4 last:border-r-0"
          variants={{
            hidden: { opacity: 0, y: 16 },
            visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: smoothEase } },
          }}
        >
          <div className="text-lg font-semibold text-black">{stat.value}</div>
          <div className="mt-1 text-xs leading-5 text-black/50">{stat.label}</div>
        </motion.div>
      ))}
    </motion.div>
  );
}

const modeCards = [
  {
    icon: Layers,
    title: "Governed protection",
    kicker: "Trusted handling",
    text: "For paths that require trusted mediation, QuantumHalon applies policy-selected post-quantum protection while preserving a bounded governance model.",
  },
  {
    icon: Lock,
    title: "Opaque behavior",
    kicker: "Application-stable protection",
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
    <div className="border-y border-black/10">
      {modeCards.map(({ icon: Icon, title, kicker, text }, index) => (
        <FadeIn key={title} delay={index * 0.05}>
          <div className="grid gap-4 border-b border-black/10 px-4 py-6 last:border-b-0 md:grid-cols-[72px_0.65fr_1fr] md:items-start">
            <div className="flex items-center gap-3">
              <Icon className="h-4 w-4 text-[#126dff]" />
              <span className="text-[10px] font-semibold uppercase text-[#126dff]">{String(index + 1).padStart(2, "0")}</span>
            </div>
            <div>
              <div className="text-[10px] font-semibold uppercase text-black/[0.42]">{kicker}</div>
              <h3 className="mt-1 text-xl font-semibold leading-tight text-black">{title}</h3>
            </div>
            <p className="text-sm leading-6 text-black/[0.58]">{text}</p>
          </div>
        </FadeIn>
      ))}
    </div>
  );
}

export function InlineGatewayVisual() {
  const modes = ["Trusted", "Opaque", "Passthrough", "Block"];

  return (
    <div
      className="technical-plate relative overflow-hidden bg-white/[0.55]"
      role="img"
      aria-label="Technical plate showing bidirectional enterprise traffic crossing a QuantumHalon inline gateway while QCertify governance remains out of the live packet path."
    >
      <div className="grid grid-cols-[1fr_auto] border-b border-black/10 px-4 py-3 text-[9px] uppercase leading-4 text-black/[0.45]">
        <span>Bidirectional traffic path / Local packet plane</span>
        <span className="text-right">Governance / Out of band</span>
      </div>

      <div className="relative overflow-hidden px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
        <svg className="absolute inset-0 h-full w-full" viewBox="0 0 960 520" preserveAspectRatio="none" aria-hidden="true">
          <defs>
            <pattern id="gateway-grid" width="48" height="48" patternUnits="userSpaceOnUse">
              <path d="M 48 0 L 0 0 0 48" fill="none" stroke="rgba(0,0,0,0.055)" strokeWidth="1" />
            </pattern>
          </defs>
          <rect width="960" height="480" fill="url(#gateway-grid)" />
        </svg>

        <div className="relative z-10">
          <div className="grid gap-5 lg:grid-cols-[1fr_220px_1fr] lg:items-center">
            <div className="border-y border-black/10 bg-white/45 p-4">
              <div className="text-[10px] font-semibold uppercase leading-4 text-black/[0.45]">Traffic side A</div>
              <h3 className="mt-2 text-xl font-semibold leading-tight text-black">Protected path side</h3>
              <p className="mt-4 text-sm leading-6 text-black/[0.58]">Traffic can approach the inline gateway from either direction.</p>
            </div>

            <div className="relative py-6 lg:py-10">
              <div className="absolute left-0 right-0 top-1/2 hidden h-px -translate-y-1/2 bg-black/25 lg:block" />
              <div className="absolute left-0 right-0 top-[calc(50%+18px)] hidden h-px -translate-y-1/2 bg-black/10 lg:block" />
              <div className="relative border border-[#126dff]/70 bg-white/85 px-5 py-6 text-center shadow-[0_18px_45px_rgba(18,109,255,0.08)]">
                <div className="text-[10px] font-semibold uppercase leading-4 text-[#126dff]">QuantumHalon</div>
                <h3 className="mt-2 text-2xl font-semibold leading-tight text-black">Inline gateway</h3>
                <p className="mx-auto mt-4 max-w-40 text-sm leading-6 text-black/[0.58]">Classify path and apply selected mode.</p>
                <div className="mt-5 inline-flex items-center gap-2 border border-black/15 bg-white px-3 py-1.5 text-xs text-black/60">
                  <span className="h-2 w-2 bg-[#126dff]" />
                  Policy ready
                </div>
              </div>
            </div>

            <div className="border-y border-black/10 bg-white/45 p-4 lg:text-right">
              <div className="text-[10px] font-semibold uppercase leading-4 text-black/[0.45]">Traffic side B</div>
              <h3 className="mt-2 text-xl font-semibold leading-tight text-black">Adjacent path side</h3>
              <p className="mt-4 text-sm leading-6 text-black/[0.58]">The same governed path can carry return traffic under the same policy model.</p>
            </div>
          </div>

          <div className="mt-6 grid border-y border-black/10 sm:grid-cols-4">
            {modes.map((mode, index) => (
              <div key={mode} className="border-b border-black/10 px-4 py-3 last:border-b-0 sm:border-b-0 sm:border-r sm:last:border-r-0">
                <div className="text-[10px] font-semibold uppercase text-[#126dff]">{String(index + 1).padStart(2, "0")}</div>
                <div className="mt-1 text-sm font-semibold text-black">{mode}</div>
              </div>
            ))}
          </div>

          <div className="mt-6 grid gap-4 border-t border-black/10 pt-4 text-sm leading-6 text-black/[0.58] md:grid-cols-[0.58fr_1fr]">
            <strong className="text-black">QCertify governance stays out of path</strong>
            <span>Policy direction and operational signals move separately from live packets, so cloud governance does not become the packet route.</span>
          </div>
        </div>
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
  { title: "Choose behavior per path", text: "Use governed protection, opaque behavior, approved passthrough, or block according to policy." },
  { title: "Prepare trust readiness", text: "Prepare enterprise trust for paths that require trusted handling through standard organizational processes." },
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
      "Protection behavior decision patterns",
      "Privacy boundaries and controlled enforcement",
    ],
  },
  {
    category: "Migration",
    icon: Activity,
    items: [
      "Crypto agility operating models",
      "Trust readiness for governed rollout",
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
