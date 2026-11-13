import Image, { getImageProps } from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { HeroScene } from "@/components/qcertify/hero/HeroScene";
import { ExposureTimeline } from "@/components/qcertify/home/ExposureTimeline";
import { ArchitectureFigure } from "@/components/qcertify/ArchitectureFigure";
import { RouteStrip } from "@/components/qcertify/RouteStrip";
import { LegacyAnchors } from "@/components/qcertify/LegacyAnchors";
import { pageMetadata, siteUrl } from "@/lib/metadata";
import heroWide from "@/assets/hero/trust-architecture-wide.jpg";
import heroTall from "@/assets/hero/trust-architecture-tall.jpg";
import archive from "@/assets/visuals/challenge-archive.jpg";
import glass from "@/assets/visuals/material-glass.jpg";
import ceramic from "@/assets/visuals/material-ceramic.jpg";
import control from "@/assets/visuals/material-control.jpg";
import adoption from "@/assets/visuals/adoption-path.jpg";
import styles from "./home.module.css";

export const metadata = pageMetadata(
  "Post-quantum protection for existing networks",
  "QuantumHalon protects the network traffic you select with NIST-standardised post-quantum cryptography, through inline gateways that fit your existing network and a control plane you operate.",
  "/",
);

const solution = [
  { image: glass, title: "Protect what must stay confidential", text: "Selected traffic is protected with ML-KEM, the NIST-standardised post-quantum key establishment, designed to resist decryption by a future quantum computer." },
  { image: ceramic, title: "Keep the infrastructure you run", text: "Gateways sit inline alongside your routers, firewalls and VPNs. No application rewrite, and no agents on your hosts." },
  { image: control, title: "Stay in control, with evidence", text: "Policy, approvals and signed audit records live in a control plane you operate. Each path reports the protection it actually achieves." },
];

const useCases = [
  { id: "site-to-site", label: "Site to site", problem: "Traffic between offices and data centres crosses networks you do not control.", answer: "Two gateways protect it over your existing WAN or VPN.", route: ["Site A", "Gateway", "WAN", "Gateway", "Site B"], protectedFrom: 2, protectedTo: 3 },
  { id: "critical-application", label: "Critical application", problem: "A business service that cannot be rewritten on your migration schedule.", answer: "One gateway mediates its TLS sessions. The application itself stays unchanged.", route: ["Clients", "Gateway", "Application"], protectedFrom: 1, protectedTo: 2 },
  { id: "private-cloud", label: "Private cloud", problem: "Workloads in a private cloud still depend on the path that reaches them.", answer: "Gateways at both boundaries extend the same policy and records.", route: ["Data centre", "Gateway", "Link", "Gateway", "VPC"], protectedFrom: 2, protectedTo: 3 },
];

function HeroPoster() {
  const common = { alt: "", sizes: "100vw" };
  const { props: { srcSet: tallSet } } = getImageProps({ ...common, src: heroTall });
  const { props: { srcSet: wideSet, ...rest } } = getImageProps({ ...common, src: heroWide, loading: "eager", fetchPriority: "high" });
  return <picture><source media="(max-width: 1023px)" srcSet={tallSet} /><source media="(min-width: 1024px)" srcSet={wideSet} /><img {...rest} alt="" /></picture>;
}

const delay = (ms: number) => ({ ["--reveal-delay" as string]: ms });

export default function Home() {
  return <>
    <LegacyAnchors />
    <section id="top" className={styles.hero} aria-labelledby="hero-title">
      <div className={styles.heroVisual}>
        <HeroScene label="An architectural sculpture of the QuantumHalon boundary: selected traffic, a blue line, is enclosed between two inline gateways while a separate control plane floats above the path.">
          <HeroPoster />
        </HeroScene>
      </div>
      <div className={`container ${styles.heroInner}`}>
        <div className={styles.heroCopy}>
          <p className={styles.heroEyebrow}><span className={styles.productMark} aria-hidden="true" />QuantumHalon <span>by QCertify</span></p>
          <h1 id="hero-title" className={styles.heroTitle}>Post-quantum protection.<br /><span>On your <span className={styles.keep}>existing network.</span></span></h1>
          <p className={styles.heroLead}>Encrypted traffic recorded today could be decrypted once quantum computers mature. QuantumHalon protects the network paths you choose, with gateways that fit around your infrastructure and a control plane you run.</p>
          <div className="actions"><Link prefetch={false} href="/demo?intent=demo" className="button">Request a demo <ArrowUpRight aria-hidden="true" /></Link><a href="#how-it-works" className="button-secondary">See how it works <ArrowRight aria-hidden="true" /></a></div>
        </div>
      </div>
    </section>

    <section id="challenge" className={`dark-section ${styles.challenge}`} data-nav-theme="dark" aria-labelledby="challenge-title">
      <span id="risk" className={styles.anchor} aria-hidden="true" />
      <div className={styles.challengeArt} aria-hidden="true"><Image src={archive} alt="" fill sizes="(max-width: 1023px) 100vw, 60vw" /></div>
      <div className="container">
        <div className={styles.challengeIntro}>
          <p className="eyebrow" data-reveal>Harvest now, decrypt later</p>
          <h2 id="challenge-title" className="section-title" data-reveal style={delay(80)}>The exposure starts before the quantum computer exists.</h2>
          <p className={styles.challengeLead} data-reveal style={delay(160)}>Most encrypted traffic relies on public-key cryptography that a cryptographically relevant quantum computer could break. Information that must stay confidential for years is exposed now, because it can be recorded today and decrypted later.</p>
        </div>
        <div className={styles.timeline} data-reveal><ExposureTimeline /></div>
        <div className={styles.challengeFoot}><p>NIST published its first post-quantum standards in August 2024. The algorithms exist; the work now is moving the systems that depend on today&rsquo;s cryptography.</p><Link prefetch={false} href="/resources#exposure" className="text-link">Estimate your exposure window <ArrowUpRight aria-hidden="true" /></Link></div>
      </div>
    </section>

    <section id="solution" className={styles.section} aria-labelledby="solution-title">
      <span id="enables" className={styles.anchor} aria-hidden="true" />
      <div className="container">
        <div className={styles.head}>
          <h2 id="solution-title" className="section-title" data-reveal>Protect the traffic that matters. Keep the network you have.</h2>
          <p data-reveal style={delay(80)}>QuantumHalon adds a post-quantum layer to the paths you select, enforced at gateways you place and governed by policy you control.</p>
        </div>
        <ul className={styles.triptych}>
          {solution.map((item, index) => <li key={item.title} data-reveal style={delay(index * 90)}>
            <div className={styles.triptychArt}><Image src={item.image} alt="" fill sizes="(max-width: 760px) 100vw, 33vw" /></div>
            <h3>{item.title}</h3>
            <p>{item.text}</p>
          </li>)}
        </ul>
      </div>
    </section>

    <section id="how-it-works" className={`${styles.section} ${styles.studio}`} aria-labelledby="how-title">
      <span id="platform" className={styles.anchor} aria-hidden="true" />
      <div className="container">
        <div className={styles.head}>
          <h2 id="how-title" className="section-title" data-reveal>Protection in the path. Control outside it.</h2>
          <p data-reveal style={delay(80)}>Gateways sit inline on the paths you choose and enforce policy locally. Your control plane sets the policy, issues gateway identities and keeps the record. It never carries application traffic.</p>
        </div>
        <div className={styles.model} data-reveal="fade"><ArchitectureFigure variant="annotated" /></div>
        <div className={styles.modelFoot}>
          <p><strong>Two protection modes.</strong> IPsec between two gateways for any IP protocol, or TLS mediation at a single gateway for selected sessions.</p>
          <Link prefetch={false} href="/architecture" className="text-link">Explore the architecture <ArrowUpRight aria-hidden="true" /></Link>
        </div>
      </div>
    </section>

    <section id="use-cases" className={styles.section} aria-labelledby="use-cases-title">
      <div className="container">
        <div className={styles.head}>
          <h2 id="use-cases-title" className="section-title" data-reveal>Start where exposure lasts longest.</h2>
          <p data-reveal style={delay(80)}>Begin with one path, prove it in your environment, then extend the policy at your own pace.</p>
        </div>
        <ul className={styles.cases}>{useCases.map((item, index) => <li key={item.id} data-reveal style={delay(index * 80)}>
          <p className={styles.caseLabel}>{item.label}</p>
          <h3>{item.problem}</h3>
          <p className={styles.caseAnswer}>{item.answer}</p>
          <RouteStrip stops={item.route} protectedFrom={item.protectedFrom} protectedTo={item.protectedTo} compact />
          <Link prefetch={false} href={`/use-cases#${item.id}`} className={styles.caseLink}>{item.label} in detail <ArrowUpRight aria-hidden="true" size={16} /></Link>
        </li>)}</ul>
        <div className={styles.trust} data-reveal>
          <h3>Built to be examined.</h3>
          <div>
            <p>QuantumHalon uses NIST-standardised ML-KEM and ML-DSA, runs under your own authority, and records every administrative decision in a signed audit ledger. That evidence supports your own reviews and auditors.</p>
            <Link prefetch={false} href="/trust" className="text-link">Security and trust <ArrowUpRight aria-hidden="true" /></Link>
          </div>
        </div>
      </div>
    </section>

    <section id="adoption" className={styles.adoption} aria-labelledby="adoption-title">
      <span id="contact" className={styles.anchor} aria-hidden="true" />
      <div className={styles.adoptionArt} aria-hidden="true"><Image src={adoption} alt="" fill sizes="(max-width: 1023px) 100vw, 70vw" /></div>
      <div className={`container ${styles.adoptionInner}`}>
        <h2 id="adoption-title" data-reveal>Start with one critical path.</h2>
        <p data-reveal style={delay(80)}>Bring a path whose confidentiality must outlast the quantum transition. We will show how QuantumHalon protects it, and what a first deployment involves.</p>
        <div className="actions" data-reveal style={delay(160)}><Link prefetch={false} href="/demo?intent=demo" className="button">Request a demo <ArrowUpRight aria-hidden="true" /></Link><Link prefetch={false} href="/demo?intent=deployment" className="button-secondary">Discuss a pilot <ArrowRight aria-hidden="true" /></Link></div>
        <p className={styles.adoptionNote}>No credentials, keys or network diagrams are needed for a first conversation.</p>
      </div>
    </section>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@graph": [
      { "@type": "Organization", "@id": `${siteUrl}/#organization`, name: "QCertify", url: siteUrl, logo: `${siteUrl}/icon.png`, email: "contact@qcertify.io", description: "Enterprise cybersecurity company and maker of QuantumHalon, a platform for post-quantum protection of network traffic." },
      { "@type": "WebSite", "@id": `${siteUrl}/#website`, url: siteUrl, name: "QCertify", publisher: { "@id": `${siteUrl}/#organization` }, inLanguage: "en-GB" },
    ] }) }} />
  </>;
}
