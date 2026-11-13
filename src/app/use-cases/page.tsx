import Image from "next/image";
import Link from "next/link";
import { pageMetadata } from "@/lib/metadata";
import { RouteStrip } from "@/components/qcertify/RouteStrip";
import { OpenTargetDetails } from "@/components/qcertify/OpenTargetDetails";
import { CallToAction } from "@/components/qcertify/CallToAction";
import lanes from "@/assets/visuals/usecases-paths.jpg";
import styles from "./use-cases.module.css";

export const metadata = pageMetadata(
  "Use cases",
  "Where QuantumHalon protection starts: traffic between sites, a critical application, a private cloud, partner connectivity, long-lived information and a progressive post-quantum migration.",
  "/use-cases",
);

interface UseCase { id: string; label: string; title: string; situation: string; exposure: string; fit: string; gain: string; note: string; route: string[]; protectedFrom: number; protectedTo: number }

const primary: UseCase[] = [
  { id: "site-to-site", label: "Site-to-site traffic", title: "Protect traffic between sites over the network you already have.",
    situation: "Branches, data centres and production sites connected by a WAN, MPLS or VPN.",
    exposure: "A conventional WAN or VPN does not, on its own, add post-quantum protection, and traffic between sites often stays sensitive for years.",
    fit: "A gateway at each site boundary carries the selected traffic, of any IP protocol, in an IPsec tunnel with ML-KEM key establishment (Mode 2). The gateways authenticate each other with classical ECDSA P-384 or post-quantum ML-DSA signatures, as configured.",
    gain: "Post-quantum protection between sites, without changing the routers or applications at either end.",
    note: "Both directions of the traffic cross both gateways, with IKEv2 and ESP reachability between them and no address translation in between.",
    route: ["Site A", "Gateway", "WAN", "Gateway", "Site B"], protectedFrom: 2, protectedTo: 3 },
  { id: "critical-application", label: "Critical application", title: "Give one essential application post-quantum key establishment.",
    situation: "A business-critical TLS service that cannot be rewritten on your migration schedule.",
    exposure: "Its sessions rely on classical key exchange, and its clients will not all change at once.",
    fit: "One inline gateway mediates the selected TLS sessions (Mode 1), offering hybrid ML-KEM key exchange and ML-DSA certificates to clients that support them.",
    gain: "Post-quantum key establishment for the service with no change to the application, and every classical fallback recorded.",
    note: "Clients trust your inspection root, distributed through your device management. The gateway sees authorised sessions in plaintext.",
    route: ["Clients", "Gateway", "Application"], protectedFrom: 1, protectedTo: 2 },
  { id: "private-cloud", label: "Private cloud", title: "Extend the same boundary to your private cloud.",
    situation: "Workloads moving to a private cloud or VPC, reached over an interconnect or VPN.",
    exposure: "Moving a workload changes where it runs, not the need to protect and govern the path that reaches it.",
    fit: "Gateways at both boundaries protect the selected traffic (Mode 2). The control plane runs on premises or in your own private cloud.",
    gain: "Cloud-bound traffic joins the same policy, posture reporting and audit trail as your other protected paths.",
    note: "The cloud network places a gateway inline for the selected traffic. Compatibility with your environment is confirmed during planning.",
    route: ["Data centre", "Gateway", "Interconnect", "Gateway", "VPC"], protectedFrom: 2, protectedTo: 3 },
];

const more: UseCase[] = [
  { id: "partner-federation", label: "Partner connectivity", title: "Share a service with a partner, not your network.",
    situation: "Two organisations exchanging data through one agreed service.",
    exposure: "Connecting networks often means trusting far more of each other than either side intends.",
    fit: "Both organisations verify each other and approve the gateways, traffic scope and validity of one agreement. Mode 2 protects the agreed traffic, and each side keeps its own control plane.",
    gain: "A bounded relationship that either side can suspend or revoke.",
    note: "Only the agreed scope crosses between the two gateways. Everything else stays under each organisation's own policy.",
    route: ["Your service", "Gateway", "Agreed scope", "Gateway", "Partner"], protectedFrom: 2, protectedTo: 3 },
  { id: "long-lived-data", label: "Long-lived information", title: "Prioritise the data that must stay confidential longest.",
    situation: "Health, financial, legal or public-sector records that stay sensitive for decades.",
    exposure: "Traffic captured today can be stored until it can be decrypted.",
    fit: "Discovery shows which of those paths still rely on classical key exchange. Policy moves them to ML-KEM-based protection first.",
    gain: "Migration effort goes where the confidentiality horizon is longest.",
    note: "Protection applies from the moment a path is protected. It cannot protect traffic already captured, and it complements endpoint and storage security.",
    route: ["Records", "Gateway", "Network", "Gateway", "Archive"], protectedFrom: 2, protectedTo: 3 },
  { id: "progressive-migration", label: "Progressive migration", title: "Move to post-quantum cryptography one deliberate step at a time.",
    situation: "An estate where post-quantum readiness varies by system, supplier and team.",
    exposure: "Applications, network equipment and teams do not move to new cryptography on the same schedule.",
    fit: "Discover, define policy, enforce, verify: each path moves individually, while passthrough keeps everything else working as before.",
    gain: "A migration you can schedule, review and evidence, with a signed record of every change.",
    note: "Discovery covers the traffic your gateways can see. It is not a complete cryptographic inventory.",
    route: ["Discover", "Define policy", "Enforce", "Verify"], protectedFrom: -1, protectedTo: -1 },
];

function Facts({ item }: { item: UseCase }) {
  return <dl className={styles.facts}>
    <div><dt>The exposure</dt><dd>{item.exposure}</dd></div>
    <div><dt>How QuantumHalon fits</dt><dd>{item.fit}</dd></div>
    <div><dt>What you gain</dt><dd>{item.gain}</dd></div>
    <div data-note=""><dt>Before you deploy</dt><dd>{item.note}</dd></div>
  </dl>;
}

export default function UseCasesPage() {
  return <>
    <OpenTargetDetails />
    <section className="page-hero" aria-labelledby="use-cases-title">
      <div className="container">
        <p className="eyebrow">Use cases</p>
        <h1 id="use-cases-title" className="page-title">Start where protection matters most.</h1>
        <p className="lead">Most organisations begin with one path: a link between sites, a critical application or the route into a private cloud. Find the situation closest to yours.</p>
        <nav className={styles.index} aria-label="Use case topics">{[...primary, ...more].map((item) => <a key={item.id} href={`#${item.id}`}>{item.label}</a>)}</nav>
      </div>
    </section>

    <div className={styles.cases}>
      {primary.map((item) => <section key={item.id} id={item.id} className={styles.case} aria-labelledby={`${item.id}-title`}>
        <div className="container">
          <div className={styles.caseHead}>
            <div>
              <p className="eyebrow">{item.label}</p>
              <h2 id={`${item.id}-title`} className={styles.caseTitle}>{item.title}</h2>
              <p className={styles.situation}>{item.situation}</p>
            </div>
            <div className={styles.caseVisual}><RouteStrip stops={item.route} protectedFrom={item.protectedFrom} protectedTo={item.protectedTo} large /></div>
          </div>
          <Facts item={item} />
        </div>
      </section>)}
    </div>

    <section className={styles.more} aria-labelledby="more-title">
      <div className="container">
        <h2 id="more-title" className="feature-title">More situations</h2>
        <div className={styles.disclosures}>
          {more.map((item) => <details key={item.id} id={item.id} className={`disclosure ${styles.disclosure}`}>
            <summary><span><span className={styles.summaryLabel}>{item.label}</span><span className={styles.summaryTitle}>{item.title}</span></span><span className="disclosure-plus" aria-hidden="true" /></summary>
            <div className={styles.disclosureBody}>
              <p className={styles.situation}>{item.situation}</p>
              <RouteStrip stops={item.route} protectedFrom={item.protectedFrom} protectedTo={item.protectedTo} />
              <Facts item={item} />
            </div>
          </details>)}
        </div>
        <figure className={styles.closing}>
          <div className={styles.closingArt}><Image src={lanes} alt="Four long ceramic walls, each pierced by apertures carrying a thin line; on only one of them the line is blue and enclosed in glass: one protected path among many." fill sizes="(max-width: 1400px) 100vw, 1300px" /></div>
          <figcaption>One protected path among many. Scenarios are illustrative and describe no specific customer. Every deployment is planned around your own topology, trust and compatibility. <Link prefetch={false} href="/architecture#requirements">What a deployment plan covers</Link>.</figcaption>
        </figure>
      </div>
    </section>
    <CallToAction title="Bring a use case. We will map the path." description="No credentials, keys or confidential network diagrams are needed for a first conversation." />
  </>;
}
