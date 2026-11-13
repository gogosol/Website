import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { IndexedHero } from "@/components/qcertify/IndexedHero";
import { EvidencePreview } from "@/components/qcertify/EvidencePreview";
import { PostureMatrix } from "@/components/qcertify/PostureMatrix";
import { TrafficFlowDiagram } from "@/components/qcertify/TrafficFlowDiagram";
import { CallToAction } from "@/components/qcertify/CallToAction";
import { pageMetadata } from "@/lib/metadata";
import styles from "./trust.module.css";

export const metadata = pageMetadata(
  "Security & trust",
  "Who controls QuantumHalon, where your traffic flows, what is protected and where protection ends, which security properties it provides and how your reviewers can assess the evidence.",
  "/trust",
);

/* Every statement on this page is sourced in docs/rebuild/product-evidence.md. */

const questions = [
  ["governance", "Who controls the platform?"],
  ["traffic", "Where does our traffic flow?"],
  ["scope", "What is protected, and where does it end?"],
  ["cryptography", "Which security properties does it provide?"],
  ["evidence", "What can we verify for ourselves?"],
  ["privacy", "What information is retained?"],
  ["assurance", "How can our reviewers assess the evidence?"],
] as const;

const controls = [
  ["Your certificate authority", "The control plane enrols gateways and issues their identities from its own certificate authority."],
  ["Signed policy and commands", "Policies, commands and trust bundles are signed with ML-DSA. Gateways verify every signature before acting."],
  ["Step-up authentication", "Every change needs a recent authenticator code, even within a signed-in session."],
  ["Second-administrator approval", "Updates, key rotations, restores and federation steps need a second administrator."],
  ["Separated roles", "Operators, certificate managers, PKI custodians, auditors and viewers see and change only what their role allows."],
  ["Signed audit ledger", "Every administrative action and policy change is recorded in an append-only ledger, each record signed and linked to the one before."],
];

const planes = [
  ["Data plane", "Your gateways", "Process the selected traffic inline and enforce the published policy locally."],
  ["Control plane", "Run by you", "Sends signed policy and commands, issues identities and receives telemetry. It carries no application traffic, although gateways depend on it for policy, certificates and authorisation."],
  ["QCertify", "Online deployments only", "An outbound connection for licensing, signed updates and federation services. Air-gapped deployments exchange these as files. Application traffic never reaches QCertify."],
];

const outcomes = [
  { id: "mode-1", name: "TLS mediation", label: "Mode 1", does: "Terminates and re-establishes selected TLS sessions at one inline gateway, offering hybrid ML-KEM key exchange and ML-DSA certificates to clients that support them.", requires: "Participating clients trust your inspection root, distributed through your own device management. Permitted domains and an explicitly scoped policy.", limit: "The gateway sees authorised sessions in plaintext. It mediates TLS; it does not process application protocols." },
  { id: "mode-2", name: "IP packet protection", label: "Mode 2", does: "Carries selected IP packets, of any IP protocol, in an IPsec tunnel between two gateways, with ML-KEM key establishment. The gateways authenticate each other with classical ECDSA P-384 or post-quantum ML-DSA signatures, as configured.", requires: "A gateway at each end, both directions of the traffic crossing both, and IKEv2 and ESP reachability between them without address translation.", limit: "Protection begins and ends at the gateways. Beyond them, traffic is as protected as it was before." },
  { id: "passthrough", name: "Passthrough", label: "Policy outcome", does: "Lets permitted traffic continue on its existing path.", requires: "A reviewed decision that the traffic may proceed unchanged.", limit: "QuantumHalon adds no protection. Existing application or network encryption still applies." },
  { id: "block", name: "Block", label: "Policy outcome", does: "Denies traffic within the policy scope at the gateway.", requires: "The traffic crosses the inline gateway and matches the policy scope.", limit: "An access decision, not cryptographic protection." },
];

const properties = [
  ["Post-quantum key establishment", "ML-KEM (FIPS 203), combined with X25519 or ECDH P-384 as a hybrid, or on its own in Mode 2. This is what protects recorded traffic from later decryption."],
  ["Authentication, stated separately", "The control plane signs policy and commands with ML-DSA (FIPS 204). Mode 1 presents ML-DSA certificates to clients that support them and records every classical fallback. Mode 2 supports classical ECDSA P-384 or post-quantum ML-DSA gateway authentication, as configured."],
  ["Explicit fallback floors", "Compatibility is a scoped policy with a floor. Mode 1 refuses connections below it. Mode 2 traffic uses an authorised tunnel or is dropped, never sent in cleartext."],
  ["Trust before traffic", "Mode 2 authorises only the configured peer gateway. A trusted certificate alone never grants access to a partner network."],
];

const retention = [
  ["Discovery metadata", "Off by default and passive when enabled. Addresses and requested server names, never payloads, keys or certificates, kept for 30 days after the last observation or decision."],
  ["Gateway telemetry", "Bounded by age and size: 30 days by default, configurable. Removing it is itself recorded in the signed ledger."],
  ["Audit ledger", "Kept for the life of the deployment, in your environment, under your access controls."],
  ["Website enquiries", "The demo form sends your name, work email, organisation, area of interest and message to QCertify through our email provider, Resend, so that we can reply."],
];

function Question({ id, index, question, title, intro, tone, children }: { id: string; index: number; question: string; title: string; intro?: React.ReactNode; tone?: "porcelain"; children: React.ReactNode }) {
  return <section id={id} className={styles.qa} data-tone={tone} aria-labelledby={`${id}-title`}>
    <div className="container">
      <div className={styles.qaHead}>
        <div>
          <p className="eyebrow"><span className="index">{String(index).padStart(2, "0")}</span>{question}</p>
          <h2 id={`${id}-title`} className="subsection-title">{title}</h2>
        </div>
        {intro && <p className={styles.qaIntro}>{intro}</p>}
      </div>
      {children}
    </div>
  </section>;
}

export default function TrustPage() {
  return <>
    <IndexedHero eyebrow="Security & trust" title={<>Security you can examine. <span>Control you keep.</span></>} lead={<>Plain answers to the questions security and architecture teams ask first, including where QuantumHalon&rsquo;s protection ends.</>} label="Questions on this page" items={questions} />

    <Question id="governance" index={1} question="Who controls the platform?" title="You do, through a control plane you run." intro="On premises, in your private cloud or fully air-gapped. Authority over policy, identities and records stays inside your organisation, and these controls are part of the product.">
      <ul className={styles.controls}>{controls.map(([title, text]) => <li key={title}><h3>{title}</h3><p>{text}</p></li>)}</ul>
    </Question>

    <Question id="traffic" index={2} question="Where does our traffic flow?" title="Your traffic stays on your network. Management travels separately." tone="porcelain">
      <TrafficFlowDiagram />
      <dl className={styles.planes}>{planes.map(([name, owner, text]) => <div key={name}><dt>{name}<span>{owner}</span></dt><dd>{text}</dd></div>)}</dl>
    </Question>

    <Question id="scope" index={3} question="What is protected, and where does it end?" title="Four outcomes, each with an explicit boundary." intro="Encryption, authentication and access control do different jobs. The outcome you choose for each traffic class sets the boundary and the trust it requires.">
      <div className={styles.outcomes}>
        <div className={styles.outcomeHead} aria-hidden="true"><span>Outcome</span><span>What it does</span><span>What it needs</span><span>Where it ends</span></div>
        {outcomes.map((outcome) => <article key={outcome.id} className={styles.outcome} aria-labelledby={`outcome-${outcome.id}`}>
          <h3 id={`outcome-${outcome.id}`}><span className={styles.outcomeLabel}>{outcome.label}</span>{outcome.name}</h3>
          <dl>
            <div><dt>What it does</dt><dd>{outcome.does}</dd></div>
            <div><dt>What it needs</dt><dd>{outcome.requires}</dd></div>
            <div data-limit=""><dt>Where it ends</dt><dd>{outcome.limit}</dd></div>
          </dl>
        </article>)}
      </div>
      <Link prefetch={false} href="/architecture#explorer" className="text-link">See each boundary in the architecture explorer <ArrowUpRight aria-hidden="true" /></Link>
    </Question>

    <Question id="cryptography" index={4} question="Which security properties does it provide?" title="Confidentiality and identity, assessed separately." intro="Key establishment protects confidentiality. Signatures prove identity. QuantumHalon reports the two separately and never infers one from the other." tone="porcelain">
      <ul className={styles.properties}>{properties.map(([title, text]) => <li key={title}><h3>{title}</h3><p>{text}</p></li>)}</ul>
      <details className={`disclosure ${styles.more}`}>
        <summary><span><span className={styles.moreTitle}>How a connection is classified</span><span className={styles.moreHint}>Key establishment and authentication, combined into one posture: post-quantum, partly classical or classical.</span></span><span className="disclosure-plus" aria-hidden="true" /></summary>
        <div className={styles.moreBody}><PostureMatrix /></div>
      </details>
    </Question>

    <Question id="evidence" index={5} question="What can we verify for ourselves?" title="Signed records your auditors can check outside QuantumHalon." intro="Your control plane generates reports on demand, for the whole organisation or for one gateway. Two signatures do two different jobs.">
      <div className={styles.signatures}>
        <div><p className={styles.sigAlg}>ML-DSA-65 &middot; post-quantum</p><h3>Every ledger record</h3><p>Each record carries its own signature and the signature of the record before it. Reports embed the records, the public key and a verification script your auditors run with OpenSSL, independently of QuantumHalon.</p></div>
        <div><p className={styles.sigAlg}>ECDSA P-384 &middot; classical</p><h3>The exported PDF</h3><p>A document signature that standard PDF readers can check, showing whether the report changed after signing. It is not post-quantum: the post-quantum evidence is in the records themselves.</p></div>
      </div>
      <EvidencePreview />
    </Question>

    <Question id="privacy" index={6} question="What information is retained?" title="Defined records, with stated limits." intro="Each record type has its own bound. Review retention, custody and access against your own policies." tone="porcelain">
      <dl className={styles.retention}>{retention.map(([title, text]) => <div key={title}><dt>{title}</dt><dd>{text}</dd></div>)}</dl>
      <p className={styles.small}>Please do not send credentials, keys or confidential network details through the website. Questions about an enquiry: <a href="mailto:contact@qcertify.io">contact@qcertify.io</a>.</p>
    </Question>

    <Question id="assurance" index={7} question="How can our reviewers assess the evidence?" title="Evidence for your own security review.">
      <div className={styles.assurance}>
        <div><h3>Product-generated evidence</h3><p>Posture reports, the signed audit ledger and signed exports, produced by your control plane for your own reviews and auditors.</p></div>
        <div><h3>Security architecture</h3><p>The design on this page: separated planes, customer-held identities, signed commands, explicit fallback floors and fail-closed Mode 2 enforcement.</p></div>
        <div><h3>Your review process</h3><p>Your reviewers can examine the architecture and verify signed records against your organisation&rsquo;s security requirements.</p></div>
      </div>
      <p className={styles.disclosure}>Found a security issue? Email <a href="mailto:contact@qcertify.io">contact@qcertify.io</a> with &ldquo;Security report&rdquo; in the subject, as described in our <a href="/.well-known/security.txt">security.txt</a>.</p>
    </Question>

    <CallToAction title="Bring your security questions." description="We will walk your security and architecture teams through the boundaries, the controls and the evidence, on a path you choose." />
  </>;
}
