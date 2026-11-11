import Link from "next/link";
import { ArrowUpRight, Check } from "lucide-react";
import { ContactForm } from "@/components/qcertify/ContactForm";
import { pageMetadata } from "@/lib/metadata";
import styles from "@/components/qcertify/ContactForm.module.css";

export const metadata = pageMetadata(
  "Request a demo",
  "Request a technical demo of QuantumHalon or discuss a pilot or deployment with QCertify: discovery, policy, enforcement and verification, mapped to your network.",
  "/demo",
);

export default function DemoPage() {
  return <section className={styles.demoPage}>
    <div className="container">
      <div className={styles.demoGrid}>
        <div className={styles.intro}>
          <div className={styles.introCopy}>
            <p className="eyebrow">Request a demo</p>
            <h1 className={styles.title}>Your network. Your first protected path.</h1>
            <p className={styles.description}>Start with a conversation about the traffic you need to protect. We will show QuantumHalon on a topology like yours, or scope a pilot with your team.</p>
          </div>
          <div className={styles.agenda}>
            <h2>What a technical demo covers</h2>
            <ul>
              <li><Check size={17} aria-hidden="true" /><div><strong>The operating loop</strong>Discovery, policy, enforcement and verification, shown live in the QuantumHalon Console.</div></li>
              <li><Check size={17} aria-hidden="true" /><div><strong>Your topology</strong>Where gateways would sit, and which protection mode fits each path.</div></li>
              <li><Check size={17} aria-hidden="true" /><div><strong>A first step</strong>The scope and prerequisites of a pilot or a first protected path.</div></li>
            </ul>
          </div>
          <div className={styles.introLinks}>
            <Link prefetch={false} className="text-link" href="/architecture">Explore the architecture <ArrowUpRight size={16} aria-hidden="true" /></Link>
            <Link prefetch={false} className="text-link" href="/trust">Security and trust <ArrowUpRight size={16} aria-hidden="true" /></Link>
          </div>
        </div>
        <div className={styles.panel}><ContactForm /></div>
      </div>
      <div className={styles.nextSteps}>
        <h2>What happens next</h2>
        <ol>
          <li><span>01</span><strong>We reply by email.</strong>To arrange a conversation with our team at a time that suits you.</li>
          <li><span>02</span><strong>We tailor the session.</strong>A demo follows your use case; a pilot conversation covers placement, trust and prerequisites.</li>
          <li><span>03</span><strong>You decide the next step.</strong>Nothing is installed and no access is needed until you choose to run a pilot.</li>
        </ol>
      </div>
    </div>
  </section>;
}
