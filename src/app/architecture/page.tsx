import Link from "next/link";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import { ArchitectureLab } from "@/components/qcertify/lab/ArchitectureLab";
import { ArchitectureFigure } from "@/components/qcertify/ArchitectureFigure";
import { ModeComparison } from "@/components/qcertify/ModeComparison";
import { CallToAction } from "@/components/qcertify/CallToAction";
import { pageMetadata } from "@/lib/metadata";
import styles from "./architecture.module.css";

export const metadata = pageMetadata(
  "QuantumHalon architecture",
  "How QuantumHalon fits your network: inline gateways on the data plane, a control plane you operate, the Mode 1 and Mode 2 protection boundaries, deployment options and planning requirements.",
  "/architecture",
);

const deployments = [
  ["On premises", "In your own data centre, next to the teams that operate the network."],
  ["Private cloud or VPC", "In a private cloud or VPC you control, with the same separation from application traffic."],
  ["Air-gapped", "Nothing on site needs the internet. Authorisations and updates move as files, under your procedures."],
];

const requirements = [
  ["Traffic topology", "The selected traffic crosses the intended gateways in both directions, with scope and routing defined."],
  ["Trust and certificates", "Gateway enrolment, certificate issuance and revocation. For Mode 1, clients trust your inspection root, distributed through your own device management."],
  ["Network reachability", "IKEv2 and ESP between gateway pairs through your existing firewalls and VPNs, without address translation between the gateways."],
  ["Failure behaviour", "Fallback floors, maintenance windows and recovery procedures, agreed before traffic depends on the path."],
  ["Operations and approvals", "Who approves which changes, step-up authentication, second-administrator approvals and update policy."],
  ["Evidence and retention", "Metadata handling, retention, permissions and the audit evidence your reviewers need."],
];

export default function ArchitecturePage() {
  return <>
    <section className={styles.hero} aria-labelledby="architecture-title">
      <div className={`container ${styles.heroGrid}`}>
        <div className={styles.heroCopy}>
          <p className="eyebrow">Architecture</p>
          <h1 id="architecture-title" className="page-title">In the traffic path. Under your control.</h1>
          <p className="lead">QuantumHalon gateways sit inline on the paths you choose and enforce policy locally. A separate control plane, run by you, decides, signs and records. Application traffic never passes through it.</p>
          <a href="#explorer" className="text-link">Open the explorer <ArrowDown aria-hidden="true" /></a>
        </div>
        <div className={styles.heroArt}><ArchitectureFigure priority sizes="(max-width: 1023px) 100vw, 58vw" /></div>
      </div>
    </section>

    <section id="explorer" className={styles.section} aria-labelledby="explorer-title">
      <span id="topologies" className={styles.anchor} aria-hidden="true" />
      <div className="container">
        <div className="chapter-head">
          <h2 id="explorer-title" className="section-title">See exactly where protection begins and ends.</h2>
          <p>Choose a scenario and a policy outcome. The diagram redraws the path, the trust boundaries and the role of the control plane.</p>
        </div>
        <ArchitectureLab />
      </div>
    </section>

    <section id="modes" className={`${styles.section} surface`} aria-labelledby="modes-title">
      <div className="container">
        <div className="chapter-head">
          <h2 id="modes-title" className="section-title">Two protection modes. Two different boundaries.</h2>
          <p>Mode 1 mediates TLS at one gateway, which therefore sees authorised sessions in plaintext. Mode 2 protects IP packets between two gateways without inspecting them. You choose per traffic class.</p>
        </div>
        <ModeComparison />
      </div>
    </section>

    <section id="deployment" className={styles.section} aria-labelledby="deployment-title">
      <div className="container">
        <div className="chapter-head">
          <h2 id="deployment-title" className="section-title">Run the control plane where your authority lives.</h2>
          <p>Wherever it runs, it enrols your gateways and issues their identities from its own certificate authority.</p>
        </div>
        <ul className={styles.options}>{deployments.map(([title, text]) => <li key={title}><h3>{title}</h3><p>{text}</p></li>)}</ul>
        <p className={styles.vendorNote}>Online deployments keep an outbound connection to QCertify for licensing, signed updates and federation services. Air-gapped deployments exchange authorisations and updates as files. None of these paths carries your application traffic.</p>
      </div>
    </section>

    <section id="requirements" className={`${styles.section} surface`} aria-labelledby="requirements-title">
      <span id="infrastructure" className={styles.anchor} aria-hidden="true" />
      <div className="container">
        <div className="chapter-head">
          <h2 id="requirements-title" className="section-title">What a deployment plan covers.</h2>
          <p>An inline gateway changes a network path. Placement, trust, failure behaviour and operations are agreed before traffic depends on it.</p>
        </div>
        <dl className={styles.requirements}>{requirements.map(([title, text]) => <div key={title}><dt>{title}</dt><dd>{text}</dd></div>)}</dl>
        <Link prefetch={false} href="/trust" className="text-link">The security and trust model <ArrowUpRight aria-hidden="true" /></Link>
      </div>
    </section>
    <CallToAction title="Put your architecture in context." description="Talk through a first path, its placement and its requirements with our engineers." />
  </>;
}
