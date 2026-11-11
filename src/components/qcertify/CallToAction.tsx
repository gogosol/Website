import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import styles from "./CallToAction.module.css";

export function CallToAction({ title = "Start with one critical path.", description = "See how QuantumHalon fits your network, your policies and your migration priorities." }: { title?: string; description?: string }) {
  return <section className={`dark-section ${styles.section}`} data-nav-theme="dark" aria-labelledby="cta-title">
    <div className={`container ${styles.inner}`}>
      <div><h2 id="cta-title" className="section-title">{title}</h2><p>{description}</p></div>
      <div className={styles.actions}>
        <Link prefetch={false} href="/demo?intent=demo" className="button">Request a demo <ArrowUpRight aria-hidden="true" /></Link>
        <Link prefetch={false} href="/demo?intent=deployment" className="button-secondary">Discuss a pilot <ArrowRight aria-hidden="true" /></Link>
      </div>
    </div>
  </section>;
}
