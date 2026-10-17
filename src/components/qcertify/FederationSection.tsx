import { ArrowRight, Check, Network, ShieldCheck, X } from "lucide-react";
import { Reveal } from "./Reveal";
import pageStyles from "@/app/home.module.css";
import styles from "./GovernanceSections.module.css";

export function FederationSection() {
  return (
    <section id="federation" className={`${pageStyles.section} ${styles.section}`} aria-labelledby="federation-title">
      <Reveal className={styles.heading}>
        <div>
          <p className={pageStyles.sectionLabel}>06 / FEDERATION &amp; TRAFFIC SCOPE</p>
          <h2 id="federation-title">Connect organisations.<br /><span>Keep control.</span></h2>
        </div>
        <p className={styles.lead}>
          QuantumHalon federation lets two organisations agree which gateways connect,
          which traffic they protect, and for how long. Each keeps its own control
          plane, policies, and approval process.
        </p>
      </Reveal>

      <Reveal>
        <figure className={styles.federationMap} aria-labelledby="federation-caption">
          <div className={styles.diagramHeader}>
            <span>SEPARATE AUTHORITY · SHARED AGREEMENT</span>
            <span>ILLUSTRATIVE VIEW</span>
          </div>
          <div className={styles.organisations}>
            <div className={styles.organisation}>
              <span className={styles.eyebrow}>YOUR ORGANISATION</span>
              <div className={styles.authority}>
                <ShieldCheck size={22} strokeWidth={1.4} aria-hidden="true" />
                <strong>Your control plane</strong>
                <span>Your policies &amp; approvals</span>
              </div>
              <div className={styles.managementLine}><span>Local enforcement</span></div>
              <div className={styles.gateway}>
                <Network size={20} strokeWidth={1.4} aria-hidden="true" />
                <strong>Your gateways</strong>
              </div>
            </div>

            <div className={styles.agreement}>
              <span className={styles.agreementLabel}>BOTH SIDES AGREE</span>
              <strong>Who. What.<br />For how long.</strong>
              <p>Named gateways<br />Defined traffic scope<br />Agreed validity</p>
              <div className={styles.protectedPath}>
                <span className={styles.pathRule} aria-hidden="true" />
                <span>Protected gateway traffic</span>
                <span className={styles.pathRule} aria-hidden="true" />
              </div>
            </div>

            <div className={styles.organisation}>
              <span className={styles.eyebrow}>PARTNER ORGANISATION</span>
              <div className={styles.authority}>
                <ShieldCheck size={22} strokeWidth={1.4} aria-hidden="true" />
                <strong>Their control plane</strong>
                <span>Their policies &amp; approvals</span>
              </div>
              <div className={styles.managementLine}><span>Local enforcement</span></div>
              <div className={styles.gateway}>
                <Network size={20} strokeWidth={1.4} aria-hidden="true" />
                <strong>Their gateways</strong>
              </div>
            </div>
          </div>
          <figcaption id="federation-caption">
            Both organisations approve the agreement before activation. Either side can
            suspend or revoke it. Application traffic flows between gateways; the
            control planes stay off the traffic path.
          </figcaption>
        </figure>
      </Reveal>

      <div id="microsegmentation" className={styles.segmentation}>
        <Reveal className={styles.segmentationCopy}>
          <p className={styles.eyebrow}>TRAFFIC MICROSEGMENTATION</p>
          <h3>Define exactly what can communicate.</h3>
          <p>
            Scope managed traffic by source, destination, IP protocol, ports where
            applicable, and direction. Apply protection or an explicit block to each
            defined traffic class.
          </p>
          <p>
            In a federation, trust in a partner does not grant access to its whole
            network. Traffic must also fit the agreed scope and local policy.
          </p>
        </Reveal>
        <Reveal className={styles.scopeExample} delay={0.08}>
          <p className={styles.exampleLabel}>EXAMPLE / ONE APPROVED SERVICE</p>
          <div className={styles.servicePath}>
            <span>Selected source</span>
            <ArrowRight size={20} aria-hidden="true" />
            <span>Partner service</span>
          </div>
          <dl className={styles.scopeFields}>
            <div><dt>Protocol &amp; destination port</dt><dd>TCP / 443</dd></div>
            <div><dt>Connection initiation</dt><dd>Source → partner</dd></div>
          </dl>
          <div className={styles.scopeOutcome}>
            <Check size={16} aria-hidden="true" />
            <span>Matching traffic: permitted by this agreement</span>
          </div>
          <div className={styles.scopeOutcome} data-excluded="true">
            <X size={16} aria-hidden="true" />
            <span>Other services: outside this agreement</span>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
