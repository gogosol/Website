import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { CallToAction } from "@/components/qcertify/CallToAction";
import { DiscoverIllustration, OutcomesIllustration, PolicyIllustration, VerifyIllustration } from "@/components/qcertify/illustrations/ProductIllustrations";
import { pageMetadata } from "@/lib/metadata";
import styles from "./platform.module.css";

export const metadata = pageMetadata(
  "QuantumHalon platform",
  "Discover where traffic still relies on classical cryptography, define scoped post-quantum policy, enforce it at inline gateways and verify what each path achieves, under your control.",
  "/platform",
);

const steps = [
  {
    id: "discovery", legacy: undefined, index: "01", name: "Discover",
    title: "See which traffic still relies on classical cryptography.",
    text: "Gateways observe the handshakes of the traffic that crosses them and classify each traffic class by the key exchange it negotiates. You see where post-quantum protection matters first.",
    details: [
      "Passive: it sends no probes or name lookups to the systems it observes.",
      "Metadata only: no payloads, keys or certificates are stored or reported.",
      "It covers the traffic your gateways can see. It is not a complete cryptographic inventory.",
    ],
    visual: <DiscoverIllustration />,
  },
  {
    id: "policy", legacy: undefined, index: "02", name: "Define policy",
    title: "Decide what is protected, passed through or blocked.",
    text: "Each policy names its traffic scope and its outcome, and protected paths name their cryptography. Nothing reaches the network until it has been reviewed and published.",
    details: [
      "Scope by source, destination, protocol, port and direction.",
      "Key establishment and authentication are chosen separately.",
      "Changes need a recent authenticator code. Sensitive changes need a second administrator.",
    ],
    visual: <PolicyIllustration />,
  },
  {
    id: "enforce", legacy: "outcomes", index: "03", name: "Enforce",
    title: "Gateways enforce it where the traffic flows.",
    text: "Inline gateways apply the published policy locally: two protection modes for two kinds of path, plus explicit allow and deny.",
    details: [
      "Mode 2 traffic uses an authorised tunnel or is dropped. Mode 1 refuses connections below the floor your policy sets.",
      "Change a Mode 2 configuration's algorithms without re-architecting. Its traffic is never sent unprotected during the change.",
    ],
    visual: <OutcomesIllustration />,
    link: { href: "/architecture#explorer", text: "Explore each boundary" },
  },
  {
    id: "verify", legacy: "evidence", index: "04", name: "Verify",
    title: "Know what each path actually achieves.",
    text: "Posture is reported per path, with key establishment and authentication assessed separately, so a partly classical connection is never presented as post-quantum. Every administrative action lands in a signed audit ledger.",
    details: [
      "Classical fallbacks are counted and recorded.",
      "Reports export with verification material for your auditors.",
      "Product evidence supports your own security reviews and auditors.",
    ],
    visual: <VerifyIllustration />,
    link: { href: "/trust#evidence", text: "What you can verify" },
  },
];

export default function PlatformPage() {
  return <>
    <section className={`page-hero ${styles.hero}`} aria-labelledby="platform-title">
      <div className="container">
        <p className="eyebrow">The QuantumHalon platform</p>
        <h1 id="platform-title" className="page-title">Know your exposure. Choose your protection.</h1>
        <div className={styles.heroBottom}>
          <p className="lead">QuantumHalon takes each traffic class from observation to an enforced, recorded decision, in four steps.</p>
          <Link prefetch={false} href="/demo?intent=demo" className="button">Request a demo <ArrowUpRight aria-hidden="true" /></Link>
        </div>
        <nav className={styles.stepper} aria-label="Platform steps">
          <ol>{steps.map((step) => <li key={step.id}><a href={`#${step.id}`}><span className={styles.stepIndex}>{step.index}</span>{step.name}<ArrowRight aria-hidden="true" /></a></li>)}</ol>
        </nav>
      </div>
    </section>

    {steps.map((step, position) => <section key={step.id} id={step.id} className={styles.step} data-tone={position % 2 ? "porcelain" : undefined} aria-labelledby={`${step.id}-title`}>
      {step.legacy && <span id={step.legacy} className={styles.anchor} aria-hidden="true" />}
      <div className={`container ${styles.stepGrid}`}>
        <div className={styles.stepCopy}>
          <p className="eyebrow"><span className="index">{step.index}</span>{step.name}</p>
          <h2 id={`${step.id}-title`} className="section-title">{step.title}</h2>
          <p className={styles.stepText}>{step.text}</p>
          <ul className={styles.details}>{step.details.map((detail) => <li key={detail}>{detail}</li>)}</ul>
          {step.link && <Link prefetch={false} href={step.link.href} className="text-link">{step.link.text} <ArrowUpRight aria-hidden="true" /></Link>}
        </div>
        <div className={styles.stepVisual}>{step.visual}</div>
      </div>
    </section>)}

    <section className={styles.control} aria-labelledby="control-title">
      <div className={`container ${styles.controlGrid}`}>
        <h2 id="control-title" className="feature-title">Your control plane, wherever your authority lives.</h2>
        <div>
          <p>Run it on premises, in your private cloud or fully air-gapped. It enrols your gateways, issues their identities from its own certificate authority and signs every command they receive. Application traffic never passes through it.</p>
          <Link prefetch={false} href="/architecture#deployment" className="text-link">Deployment options <ArrowUpRight aria-hidden="true" /></Link>
        </div>
      </div>
    </section>
    <CallToAction title="See the platform around your priorities." description="A technical demo walks through discovery, policy, enforcement and verification, mapped to a topology like yours." />
  </>;
}
