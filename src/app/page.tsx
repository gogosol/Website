import {
  ArrowDownRight,
  ArrowUpRight,
  Check,
  CircleDashed,
  FileCheck2,
  Fingerprint,
  Network,
  Orbit,
  Route,
} from "lucide-react";
import { ContactForm } from "@/components/qcertify/ContactForm";
import { Navigation } from "@/components/qcertify/Navigation";
import { ProtectionDial } from "@/components/qcertify/ProtectionDial";
import { HeroReveal, Reveal } from "@/components/qcertify/Reveal";
import { VerificationCore } from "@/components/qcertify/VerificationCore";
import { RegulationTimeline } from "@/components/qcertify/RegulationTimeline";
import { Preloader } from "@/components/qcertify/Preloader";
import { Team } from "@/components/qcertify/Team";
import { Footer } from "@/components/qcertify/Footer";
import styles from "./home.module.css";

const exactCryptoClaim =
  "Hybrid X25519 + ML-KEM key establishment protecting against harvest-now/decrypt-later; authentication via Dual-Cert Catalyst presenting classical X.509 (ECDSA) alongside post-quantum ML-DSA-65.";

const pressureLabels = ["NIST PQC", "CNSA 2.0", "NIS2", "DORA", "EU CRA"];

const process = [
  {
    number: "01",
    title: "Place",
    text: "Insert the gateway at a governed network chokepoint. Existing routes bring selected traffic to it by topology.",
    meta: "PHYSICAL INLINE",
  },
  {
    number: "02",
    title: "Observe",
    text: "Discover exposed traffic classes from bounded metadata, then probe the strongest feasible protection path.",
    meta: "METADATA ONLY · MODE 2 FIRST",
  },
  {
    number: "03",
    title: "Approve",
    text: "Choose a mode, scope, profile, fallback floor, and exception posture. Publish one signed, versioned policy.",
    meta: "HUMAN DECISION · ATOMIC POLICY",
  },
  {
    number: "04",
    title: "Enforce",
    text: "Gateways apply the policy locally. In-flight connections finish on their original mode; new flows use the update.",
    meta: "LOCAL DATA PLANE · HOT RELOAD",
  },
];

const benefits = [
  {
    icon: Route,
    index: "A",
    title: "Adopt by path, not by rewrite.",
    text: "Start where data lifetime and exposure justify action. Existing applications keep their protocol behavior.",
    foot: "INLINE BY TOPOLOGY",
  },
  {
    icon: FileCheck2,
    index: "B",
    title: "Change cryptography through policy.",
    text: "Profiles, fallback floors, trust, and exceptions move as signed configuration · not scattered application work.",
    foot: "SIGNED · VERSIONED · REVERSIBLE",
  },
  {
    icon: Network,
    index: "C",
    title: "Keep the authority customer-side.",
    text: "The customer control plane holds enrolment, policy, certificate custody, telemetry, and audit. It stays off the packet path.",
    foot: "CUSTOMER CONTROLLED",
  },
];

export default function Home() {
  return (
    <div id="top" className={styles.siteShell}>
      <Preloader />
      <a className={styles.skipLink} href="#main-content">Skip to content</a>
      <Navigation />

      <main id="main-content">
        <section className={styles.hero} aria-labelledby="hero-title">
          <div className={styles.heroNoise} aria-hidden="true" />
          <div className={styles.heroGlow} aria-hidden="true" />
          <div className={styles.heroGrid}>
            <div className={styles.heroCopy}>
              <HeroReveal>
                <h1 id="hero-title">
                  The quantum transition.<br />
                  <span>In line.</span>
                </h1>
              </HeroReveal>
              <HeroReveal delay={0.1}>
                <p className={styles.heroLead}>
                  Customer-controlled gateways and an off-path control plane for critical traffic that cannot wait for every application to change.
                </p>
              </HeroReveal>
              <HeroReveal delay={0.2}>
                <div className={styles.heroActions}>
                  <a className={styles.primaryButton} href="#contact">
                    Request Demo &amp; Pilot <ArrowUpRight aria-hidden="true" size={14} />
                  </a>
                  <a className={styles.secondaryButton} href="#platform">
                    See the platform <ArrowDownRight aria-hidden="true" size={14} />
                  </a>
                </div>
              </HeroReveal>
            </div>

            <HeroReveal className={styles.heroVisual} delay={0.2} y={12}>
              <VerificationCore />
              <p className={styles.visuallyHidden}>
                Abstract verification core showing policy-controlled traffic crossing an inline enforcement point.
              </p>
            </HeroReveal>
          </div>
        </section>

        <section id="risk" className={styles.section} aria-labelledby="hndl-title">
          <div className={styles.sectionGrid}>
            <Reveal className={styles.sectionIntro}>
              <p className={styles.sectionLabel}>01 / THE HNDL PROBLEM</p>
              <h2 id="hndl-title">The breach can happen before the breakthrough.</h2>
            </Reveal>
            <Reveal className={styles.sectionAside} delay={0.08}>
              <p>Harvest-now/decrypt-later moves the decision point to today.</p>
              <span>DATA LIFETIME BECOMES THE CLOCK</span>
            </Reveal>
          </div>

          <Reveal className={styles.archivePanel} delay={0.1}>
            <div className={styles.archiveHeader}>
              <span>HNDL / EXPOSURE SEQUENCE</span>
              <span>TIME →</span>
            </div>
            <div className={styles.archiveTimeline}>
              <div className={styles.archiveFlow} aria-hidden="true">
                {Array.from({ length: 18 }, (_, index) => <i key={index} />)}
              </div>
              <div className={styles.archiveVault} aria-hidden="true">
                <span /><span /><span /><span /><span />
                <b>ARCHIVE</b>
              </div>
              <div className={styles.futureField} aria-hidden="true">
                <span /><span /><span />
              </div>
              <div className={styles.archiveStep} data-step="01">
                <b>Capture</b>
                <p>Encrypted traffic is collected.</p>
              </div>
              <div className={styles.archiveStep} data-step="02">
                <b>Retain</b>
                <p>Ciphertext outlives the moment.</p>
              </div>
              <div className={styles.archiveStep} data-step="03">
                <b>Wait</b>
                <p>The attack surface changes.</p>
              </div>
            </div>
            <div className={styles.archiveFooter}>
              <span>SENSITIVE NOW</span>
              <div><i /><i /><i /><i /></div>
              <span>VALUABLE LATER</span>
            </div>
          </Reveal>
        </section>

        <section id="compliance" className={`${styles.section} ${styles.regulationSection}`} aria-labelledby="compliance-title">
          <span id="regulation" style={{ position: "absolute", top: 0, pointerEvents: "none" }} />
          <div className={styles.regulationGrid}>
            <Reveal>
              <p className={styles.sectionLabel}>02 / THE OPERATING PRESSURE &amp; COMPLIANCE</p>
              <h2 id="compliance-title">The algorithm changed. The operating model has to follow.</h2>
              <p className={styles.regulationLead}>
                PQC migration spans inventory, policy, rollout, exceptions, and evidence · not only primitive selection.
              </p>
            </Reveal>

            <Reveal className={styles.pressureStack} delay={0.08}>
              <div><span>01</span><strong>Inventory</strong><p>Know which paths carry long-lived value.</p></div>
              <div><span>02</span><strong>Migration policy</strong><p>Decide where hybrid protection applies.</p></div>
              <div><span>03</span><strong>Evidence</strong><p>Show what changed, where, and under whose approval.</p></div>
            </Reveal>
          </div>
          <Reveal className={styles.pressureContext} delay={0.12}>
            <div className={styles.pressureLabels}>
              {pressureLabels.map((label) => <span key={label}>{label}</span>)}
            </div>
            <p><strong>Context, not certification.</strong> Compliance-ready: the architecture maps to applicable regime controls; certification statements require the applicable independent assessment.</p>
          </Reveal>
          <RegulationTimeline />
        </section>

        <section id="platform" className={`${styles.section} ${styles.platformSection}`} aria-labelledby="platform-title">
          <Reveal className={styles.platformHeading}>
            <p className={styles.sectionLabel}>03 / THE QUANTUMHALON PLATFORM</p>
            <h2 id="platform-title">One platform.<br />Two planes.<br /><span>Four outcomes.</span></h2>
            <p>Gateways carry the traffic. The customer control plane carries the decisions. Those paths never merge.</p>
          </Reveal>

          <Reveal className={styles.platformMap} delay={0.08}>
            <div className={styles.controlPlaneNode}>
              <div>
                <span>CUSTOMER AUTHORITY</span>
                <strong>Control plane</strong>
              </div>
              <small>ENROL · SIGN · GOVERN · OBSERVE</small>
              <i className={styles.policyDrop} aria-hidden="true" />
            </div>

            <div className={styles.packetPath}>
              <div className={styles.endpointNode}>
                <span>01 / LAN</span>
                <strong>Existing systems</strong>
                <small>APPLICATIONS UNCHANGED</small>
              </div>
              <div className={styles.pathLine} aria-hidden="true">
                <span className={styles.pathBeam} />
              </div>
              <div className={styles.gatewayNode}>
                <div className={styles.gatewayOrb}><Orbit aria-hidden="true" size={26} strokeWidth={1.2} /></div>
                <span>ENFORCEMENT POINT</span>
                <strong>Inline gateway</strong>
                <small>MODE 1 · MODE 2 · PASS · BLOCK</small>
              </div>
              <div className={styles.pathLine} aria-hidden="true">
                <span className={styles.pathBeam} />
              </div>
              <div className={styles.endpointNode}>
                <span>02 / WAN</span>
                <strong>Network edge</strong>
                <small>ROUTER / FIREWALL</small>
              </div>
            </div>

            <div className={styles.mapBoundary}>
              <span><i /> APPLICATION TRAFFIC</span>
              <span><i /> SIGNED MANAGEMENT</span>
              <strong>CONTROL PLANE IS NOT IN THE LIVE PACKET PATH</strong>
            </div>
          </Reveal>
        </section>

        <section id="operation" className={styles.section} aria-labelledby="operation-title">
          <div className={styles.sectionGrid}>
            <Reveal className={styles.sectionIntro}>
              <p className={styles.sectionLabel}>04 / HOW IT WORKS</p>
              <h2 id="operation-title">From exposed to governed in four decisions.</h2>
            </Reveal>
            <Reveal className={styles.sectionAside} delay={0.08}>
              <p>Protection starts as a scoped operating change · not a fleet-wide flag day.</p>
              <span>PLACE → OBSERVE → APPROVE → ENFORCE</span>
            </Reveal>
          </div>

          <div className={styles.processList}>
            {process.map((step, index) => (
              <Reveal className={styles.processItem} key={step.number} delay={index * 0.05}>
                <span className={styles.processNumber}>{step.number}</span>
                <div><h3>{step.title}</h3><p>{step.text}</p></div>
                <small>{step.meta}</small>
                <ArrowDownRight aria-hidden="true" size={18} />
              </Reveal>
            ))}
          </div>
        </section>

        <section className={`${styles.section} ${styles.modesSection}`} aria-labelledby="modes-title">
          <Reveal className={styles.modesHeading}>
            <p className={styles.sectionLabel}>05 / ONE GATEWAY, BOUNDED OUTCOMES</p>
            <h2 id="modes-title">Policy decides what every managed connection becomes.</h2>
            <p>Mode 1 and Mode 2 stay deliberately separate. Passthrough and block remain explicit outcomes · not hidden fallbacks.</p>
          </Reveal>
          <Reveal delay={0.08}><ProtectionDial /></Reveal>
        </section>

        <section className={styles.section} aria-labelledby="benefits-title">
          <Reveal className={styles.benefitsTitle}>
            <p className={styles.sectionLabel}>06 / OPERATING ADVANTAGE</p>
            <h2 id="benefits-title">Policy changes.<br /><span>Applications don’t.</span></h2>
          </Reveal>
          <div className={styles.benefitBands}>
            {benefits.map((benefit, index) => (
              <Reveal className={styles.benefitBand} key={benefit.index} delay={index * 0.05}>
                <span className={styles.benefitIndex}>{benefit.index}</span>
                <benefit.icon aria-hidden="true" size={25} strokeWidth={1.3} />
                <h3>{benefit.title}</h3>
                <p>{benefit.text}</p>
                <small>{benefit.foot}</small>
              </Reveal>
            ))}
          </div>
        </section>

        <section id="trust" className={`${styles.section} ${styles.trustSection}`} aria-labelledby="trust-title">
          <div className={styles.trustIntro}>
            <Reveal>
              <p className={styles.sectionLabel}>07 / TRUST &amp; VERIFICATION</p>
              <h2 id="trust-title">Trust starts with saying exactly what is protected.</h2>
            </Reveal>
          </div>

          <div className={styles.trustGrid}>
            <Reveal className={styles.claimBoundary}>
              <div className={styles.claimColumn}>
                <span>CONFIDENTIALITY</span>
                <strong>Hybrid PQC<br />(X25519 + ML-KEM)</strong>
                <small>HNDL PROTECTION BOUNDARY</small>
              </div>
              <div className={styles.claimDivider}><span>+</span></div>
              <div className={styles.claimColumn}>
                <span>AUTHENTICATION</span>
                <strong>Dual-Cert Auth<br />(ECDSA + ML-DSA-65)</strong>
                <small>DUAL-CERT CATALYST</small>
              </div>
              <p>{exactCryptoClaim}</p>
            </Reveal>

            <Reveal className={styles.trustReceipt} delay={0.08}>
              <div className={styles.receiptHeader}>
                <span>VERIFICATION RECEIPT</span>
                <Fingerprint aria-hidden="true" size={18} strokeWidth={1.3} />
              </div>
              {[
                ["Topology boundary", "INLINE"],
                ["Policy signature", "VERIFIED"],
                ["Gateway peer", "AUTHENTICATED"],
                ["Control-plane traffic", "OFF PATH"],
                ["Payload telemetry", "NONE"],
                ["Fallback posture", "BOUNDED"],
              ].map(([label, value], index) => (
                <div className={styles.receiptRow} key={label}>
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <p>{label}</p>
                  <strong><Check aria-hidden="true" size={12} /> {value}</strong>
                </div>
              ))}
              <div className={styles.receiptFooter}>
                <CircleDashed aria-hidden="true" size={15} /> LAST-KNOWN-GOOD / ENFORCED LOCALLY
              </div>
            </Reveal>
          </div>
        </section>

        <Team />

        <section id="contact" className={styles.contactSection} aria-labelledby="contact-title">
          <div className={styles.contactHalo} aria-hidden="true" />
          <div className={styles.contactLayout}>
            <Reveal>
              <p className={styles.sectionLabel}>09 / PILOT &amp; DEMO</p>
              <h2 id="contact-title">Deploy a governed pilot or schedule a demo.</h2>
              <p>Experience inline hybrid PQC protection on one critical enterprise traffic path in under 14 days with zero application changes.</p>
              <a className={styles.emailLink} href="mailto:contact@qcertify.io">
                contact@qcertify.io <ArrowUpRight aria-hidden="true" size={14} />
              </a>
            </Reveal>
            <Reveal delay={0.08}><ContactForm /></Reveal>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
