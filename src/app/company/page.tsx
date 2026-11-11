import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { pageMetadata } from "@/lib/metadata";
import { HeroBand } from "@/components/qcertify/HeroBand";
import atelier from "@/assets/visuals/company-atelier.jpg";
import goncalo from "@/assets/people/goncalo.png";
import gabriel from "@/assets/people/gabriel.png";
import styles from "./company.module.css";

export const metadata = pageMetadata(
  "Company",
  "QCertify is the cybersecurity company behind QuantumHalon. Meet the founders and the principles behind post-quantum protection that stays under the customer's control.",
  "/company",
);

/* Founders' names, roles and biographies are owner-supplied (docs/rebuild/product-evidence.md). */
const founders = [
  {
    name: "Gonçalo Magalhães",
    role: "Co-Founder · Engineering, Cryptographic Architecture & Systems",
    image: goncalo,
    bio: "Leads QCertify’s core engineering, cryptographic systems architecture and inline gateway infrastructure.",
    linkedin: "https://www.linkedin.com/in/gon%C3%A7alo-magalh%C3%A3es-41671027b/",
  },
  {
    name: "Gabriel Gestosa",
    role: "Co-Founder · Business Development, Strategy & Partnerships",
    image: gabriel,
    bio: "Leads business development, strategic engagement and enterprise partnerships, connecting the platform’s development with organisational needs.",
    linkedin: "https://www.linkedin.com/in/gabrielnevesgestosa/",
  },
];

const principles = [
  ["State the boundary.", "Say what each protection mode covers, what it needs and where its guarantees end."],
  ["Keep control with the customer.", "Build around customer-run policy, local enforcement and explicit approvals."],
  ["Make the evidence reviewable.", "Separate a recorded result from a promise, and product evidence from independent certification."],
];

export default function CompanyPage() {
  return <>
    <section className={styles.hero} aria-labelledby="company-title">
      <div className="container">
        <p className="eyebrow">Company</p>
        <h1 id="company-title" className="page-title">Securing the quantum transition. <span>On the networks that exist today.</span></h1>
        <dl className={styles.identity}>
          <div><dt>QCertify <span>The company</span></dt><dd>An enterprise cybersecurity company focused on one transition: moving the network traffic that must stay confidential to post-quantum cryptography, without replacing the infrastructure that carries it.</dd></div>
          <div><dt>QuantumHalon <span>The product</span></dt><dd>Inline gateways and a control plane you run. It protects the traffic you select, under your policy, and records what each path achieves.</dd></div>
        </dl>
        <div className={styles.band}><HeroBand src={atelier} alt="A long gallery of ceramic walls whose apertures align into one line of sight, with a single blue line threading through them in the distance." position="62% 50%" /></div>
      </div>
    </section>

    <section id="leadership" className={styles.founders} aria-labelledby="founders-title">
      <div className="container">
        <div className={styles.head}>
          <div><p className="eyebrow">Leadership</p><h2 id="founders-title" className="subsection-title">The founders.</h2></div>
          <p className={styles.intro}>One leads how QuantumHalon is built. The other leads how it reaches the organisations that need it.</p>
        </div>
        <ul className={styles.people}>
          {founders.map((founder) => <li key={founder.name} className={styles.person}>
            <div className={styles.portrait}><Image src={founder.image} alt={`Portrait of ${founder.name}`} fill sizes="(max-width: 760px) calc(100vw - 40px), (max-width: 1400px) 46vw, 640px" /></div>
            <h3>{founder.name}</h3>
            <p className={styles.role}>{founder.role}</p>
            <p className={styles.bio}>{founder.bio}</p>
            <a className="text-link" href={founder.linkedin} target="_blank" rel="noopener noreferrer" aria-label={`${founder.name} on LinkedIn (opens in a new tab)`}>LinkedIn <ArrowUpRight aria-hidden="true" /></a>
          </li>)}
        </ul>
      </div>
    </section>

    <section className={`dark-section ${styles.principles}`} data-nav-theme="dark" aria-labelledby="principles-title">
      <div className="container">
        <div className={styles.head}>
          <div><p className="eyebrow">How we work</p><h2 id="principles-title" className="subsection-title">Precision is a responsibility.</h2></div>
          <p className={styles.intro}>Boundaries, trust, governance and evidence are part of the product, not details to settle after the cryptography is chosen.</p>
        </div>
        <ul className={styles.principleList}>{principles.map(([title, text]) => <li key={title}><h3>{title}</h3><p>{text}</p></li>)}</ul>
        <Link prefetch={false} className="text-link" href="/trust">Our approach to security and trust <ArrowUpRight aria-hidden="true" /></Link>
      </div>
    </section>

    <section className={styles.contact} aria-labelledby="contact-title">
      <div className={`container ${styles.contactGrid}`}>
        <div>
          <h2 id="contact-title" className="subsection-title">Talk to the team.</h2>
          <p className={styles.intro}>Technical demos, deployment conversations and partnerships. We reply by email.</p>
        </div>
        <dl className={styles.routes}>
          <div><dt>Demos and deployments</dt><dd><Link prefetch={false} href="/demo?intent=demo">Request a demo <ArrowUpRight aria-hidden="true" /></Link></dd></div>
          <div><dt>Partnerships and other enquiries</dt><dd><a href="mailto:contact@qcertify.io">contact@qcertify.io <ArrowUpRight aria-hidden="true" /></a></dd></div>
          <div><dt>Security reports</dt><dd><a href="/.well-known/security.txt">Vulnerability disclosure <ArrowUpRight aria-hidden="true" /></a></dd></div>
        </dl>
      </div>
    </section>
  </>;
}
