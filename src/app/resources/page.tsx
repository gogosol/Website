import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { pageMetadata } from "@/lib/metadata";
import { IndexedHero } from "@/components/qcertify/IndexedHero";
import { ConfidentialityHorizon } from "@/components/qcertify/home/ConfidentialityHorizon";
import { CallToAction } from "@/components/qcertify/CallToAction";
import styles from "./resources.module.css";

export const metadata = pageMetadata(
  "Resources",
  "Post-quantum migration explained: harvest now, decrypt later, an interactive Mosca's inequality model, technical FAQs about QuantumHalon, questions for evaluating any solution and primary sources from NIST, the NCSC and the European Commission.",
  "/resources",
);

const sections = [
  ["migration", "The migration challenge"],
  ["exposure", "Estimate your exposure"],
  ["faq", "Technical questions"],
  ["evaluation", "Evaluating a solution"],
  ["standards", "Primary sources"],
] as const;

const steps = [
  ["Identify what must stay confidential.", "Consider how sensitive the data is, how long it keeps its value and the paths it travels."],
  ["Understand the current exposure.", "Combine what the network shows with what you know about applications, suppliers and assets."],
  ["Change one bounded path first.", "Select a path, define the policy and verify the result before you extend it."],
];

const faqs = [
  { question: "What does passive discovery actually see?", answer: "Discovery is off by default and enabled per gateway. It reads handshake and protocol-framing metadata from copies of the traffic that gateway forwards: the protocol, its version and the key exchange negotiated. It does not probe systems or perform name lookups, and it stores no payloads, keys or certificates. It covers only traffic that crosses your gateways, so it is not a complete inventory of your estate.", href: "/platform#discovery", link: "Explore passive discovery" },
  { question: "Does a post-quantum key exchange make the whole connection post-quantum?", answer: "No. Key establishment protects confidentiality; authentication proves identity. A connection can use hybrid ML-KEM key establishment and still rely on a classical signature. QuantumHalon reports the two separately and labels such a connection partly classical.", href: "/trust#cryptography", link: "How posture is classified" },
  { question: "Why does QuantumHalon prioritise key establishment?", answer: "Harvest-now, decrypt-later attacks target confidentiality: recorded traffic is decrypted later by breaking the key exchange that protected it. A signature only has to resist forgery while a connection is being established. That is why ML-KEM key establishment comes first on every protected path, every classical fallback is recorded, and authentication is reported separately.", href: "/trust#cryptography", link: "Security properties" },
  { question: "How do TLS mediation and IP packet protection differ?", answer: "TLS mediation (Mode 1) terminates and re-establishes selected TLS sessions at one inline gateway, which sees authorised sessions in plaintext. IP packet protection (Mode 2) carries selected IP traffic in an IPsec tunnel between two gateways without inspecting it. They have different requirements and different protection boundaries.", href: "/architecture#modes", link: "Compare Mode 1 and Mode 2" },
  { question: "Do our applications or clients need to change?", answer: "Applications need no rewrite and hosts need no agent. For Mode 1, participating clients must trust an inspection root that you distribute through your own device management. Mode 2 needs no client change, but both directions of the selected traffic must cross the gateways.", href: "/architecture#requirements", link: "What a deployment plan covers" },
  { question: "Does QuantumHalon replace our VPN or network equipment?", answer: "No. It adds a security layer alongside your existing routers, firewalls and VPNs, without post-quantum capable network equipment. A deployment still needs suitable inline placement and trust configuration, and compatibility with your VPN and routing is confirmed during planning.", href: "/use-cases#site-to-site", link: "Site-to-site protection" },
  { question: "Does the platform collect application payloads?", answer: "Discovery reports bounded metadata, never payloads or keys. That is distinct from Mode 1 TLS mediation, where an authorised gateway decrypts selected sessions in order to re-encrypt them. Application traffic never passes through the control plane or reaches QCertify.", href: "/trust#privacy", link: "What is retained" },
  { question: "Does an audit report establish compliance or certification?", answer: "No. Reports provide recorded activity and integrity evidence within a stated scope. They support your own reviews and auditors; they are not an audit opinion, a certification or proof that an organisation meets a regulatory obligation.", href: "/trust#assurance", link: "Evidence and certification" },
  { question: "What should we bring to a first conversation?", answer: "A use case, the kind of traffic you want to protect and the outcome you need. Please do not send keys, credentials, confidential network diagrams or sensitive data through the contact form.", href: "/demo?intent=demo", link: "Request a demo" },
];

const evaluation = [
  ["Which property is post-quantum: key establishment, authentication, or both?", "/trust#cryptography"],
  ["Where does protection begin and end, and who can see plaintext?", "/architecture#explorer"],
  ["What happens when a peer cannot negotiate post-quantum cryptography?", "/trust#cryptography"],
  ["Who holds the policy, the keys and the certificate authority?", "/trust#governance"],
  ["What does discovery observe, and what can it not see?", "/platform#discovery"],
  ["What can an auditor verify independently, and what is only asserted?", "/trust#evidence"],
  ["What changes in the network: placement, routing, client trust?", "/architecture#requirements"],
] as const;

const standards = [
  { name: "ML-KEM: key establishment", source: "NIST · FIPS 203", text: "The Module-Lattice-Based Key-Encapsulation Mechanism standard, published in August 2024.", href: "https://csrc.nist.gov/pubs/fips/203/final" },
  { name: "ML-DSA: digital signatures", source: "NIST · FIPS 204", text: "The Module-Lattice-Based Digital Signature standard, published in August 2024.", href: "https://csrc.nist.gov/pubs/fips/204/final" },
  { name: "Transition to post-quantum cryptography standards", source: "NIST · IR 8547", text: "NIST’s plan for moving from quantum-vulnerable algorithms to the new standards.", href: "https://csrc.nist.gov/pubs/ir/8547/final" },
  { name: "Post-quantum cryptography programme", source: "NIST · PQC project", text: "Standards, guidance and the ongoing standardisation work.", href: "https://csrc.nist.gov/projects/post-quantum-cryptography" },
  { name: "Timelines for migration to post-quantum cryptography", source: "UK NCSC", text: "Guidance for UK organisations, with migration milestones for 2028, 2031 and 2035.", href: "https://www.ncsc.gov.uk/guidance/pqc-migration-timelines" },
  { name: "Coordinated implementation roadmap", source: "European Commission", text: "A roadmap for the transition to post-quantum cryptography, addressed to EU Member States.", href: "https://digital-strategy.ec.europa.eu/en/library/coordinated-implementation-roadmap-transition-post-quantum-cryptography" },
];

function Head({ index, eyebrow, title, intro, id }: { index: number; eyebrow: string; title: React.ReactNode; intro?: React.ReactNode; id: string }) {
  return <div className={styles.head}>
    <div>
      <p className="eyebrow"><span className="index">{String(index).padStart(2, "0")}</span>{eyebrow}</p>
      <h2 id={id} className="subsection-title">{title}</h2>
    </div>
    {intro && <p className={styles.intro}>{intro}</p>}
  </div>;
}

export default function ResourcesPage() {
  return <>
    <IndexedHero eyebrow="Resources" title={<>Clarity for the decisions ahead.</>} lead="The post-quantum transition explained, a model to test your exposure, and straight answers to the questions technical teams ask." label="Sections on this page" items={sections} />

    <section id="migration" className={styles.section} aria-labelledby="migration-title">
      <div className={`container ${styles.migration}`}>
        <div>
          <p className="eyebrow"><span className="index">01</span>The migration challenge</p>
          <h2 id="migration-title" className="subsection-title">Data has a lifetime. So does its protection.</h2>
          <p className={styles.body}>An adversary can record encrypted traffic today and decrypt it once a cryptographically relevant quantum computer exists. Nobody can date that moment with confidence. How long your information must stay confidential is something you can assess now.</p>
          <p className={styles.body}>NIST published the first post-quantum standards in August 2024: ML-KEM for key establishment and ML-DSA for signatures. The algorithms exist. The work is moving the systems that depend on today&rsquo;s cryptography.</p>
        </div>
        <ol className={styles.steps}>{steps.map(([title, text], index) => <li key={title}><span>{String(index + 1).padStart(2, "0")}</span><div><h3>{title}</h3><p>{text}</p></div></li>)}</ol>
      </div>
    </section>

    <section id="exposure" className={`dark-section ${styles.section}`} data-nav-theme="dark" aria-labelledby="exposure-title">
      <div className="container">
        <Head index={2} eyebrow="Estimate your exposure" id="exposure-title" title="How long must today’s cryptography hold?" intro={<>Mosca&rsquo;s inequality: if the years your information must stay confidential (x) plus the years your migration takes (y) exceed the years until a capable quantum computer exists (z), traffic recorded today is exposed.</>} />
        <ConfidentialityHorizon />
      </div>
    </section>

    <section id="faq" className={styles.section} aria-labelledby="faq-title">
      <div className={`container ${styles.faqLayout}`}>
        <div className={styles.faqIntro}>
          <p className="eyebrow"><span className="index">03</span>Technical questions</p>
          <h2 id="faq-title" className="subsection-title">The questions worth asking.</h2>
          <p className={styles.body}>Short answers before your first technical conversation.</p>
          <Link prefetch={false} href="/demo?intent=demo" className="text-link">Ask us yours <ArrowUpRight aria-hidden="true" /></Link>
        </div>
        <div className={styles.faqList}>{faqs.map((faq) => <details className={`disclosure ${styles.faq}`} key={faq.question}>
          <summary><span className={styles.question}>{faq.question}</span><span className="disclosure-plus" aria-hidden="true" /></summary>
          <div className={styles.answer}><p>{faq.answer}</p><Link prefetch={false} href={faq.href} className="text-link">{faq.link} <ArrowUpRight aria-hidden="true" /></Link></div>
        </details>)}</div>
      </div>
    </section>

    <section id="evaluation" className={`surface ${styles.section}`} aria-labelledby="evaluation-title">
      <div className="container">
        <Head index={4} eyebrow="Evaluating a solution" id="evaluation-title" title={<>Seven questions for any <span className="nowrap">post-quantum</span> network product.</>} intro="Ask them of every vendor, including us. Each one links to where we answer it." />
        <ol className={styles.evaluation}>{evaluation.map(([question, href], index) => <li key={question}>
          <span className={styles.number}>{String(index + 1).padStart(2, "0")}</span>
          <p>{question}</p>
          <Link prefetch={false} href={href} aria-label={`Our answer: ${question}`}>Our answer <ArrowUpRight aria-hidden="true" /></Link>
        </li>)}</ol>
      </div>
    </section>

    <section id="standards" className={styles.section} aria-labelledby="standards-title">
      <div className="container">
        <Head index={5} eyebrow="Primary sources" id="standards-title" title="Go to the standard." intro="Standards and public guidance, read at the source." />
        <ul className={styles.standards}>{standards.map((standard) => <li key={standard.name}><a href={standard.href} target="_blank" rel="noopener noreferrer">
          <span className={styles.source}>{standard.source}</span>
          <span className={styles.standard}><strong>{standard.name}</strong><span>{standard.text}</span></span>
          <ArrowUpRight aria-hidden="true" /><span className="sr-only"> (opens in a new tab)</span>
        </a></li>)}</ul>
      </div>
    </section>

    <CallToAction title="Move from reading to a technical conversation." description="We will talk through the paths you want to protect and what a first deployment would involve." />
  </>;
}
