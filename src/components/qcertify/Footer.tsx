import Image from "next/image";
import { ArrowUpRight, Mail } from "lucide-react";
import styles from "./Footer.module.css";

function LinkedinIcon({ size = 15 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 8.76a1.62 1.62 0 1 0 0-3.24 1.62 1.62 0 0 0 0 3.24m1.39 9.74v-8.37H5.07v8.37h2.78z" />
    </svg>
  );
}

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={styles.footerMain}>
        {/* Column 1: Brand & Social */}
        <div className={styles.brandCol}>
          <a href="#top" className={styles.brandLink} aria-label="QCertify home">
            <Image
              src="/Logo SF White.png"
              alt="QCertify"
              width={654}
              height={96}
              className={styles.footerLogo}
            />
          </a>
          <p className={styles.brandDesc}>
            Governed hybrid post-quantum cryptography (PQC) for critical enterprise traffic paths.
          </p>

          <div className={styles.actionsGroup}>
            <a
              href="https://www.linkedin.com/company/qcertify"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.linkedinButton}
              aria-label="QCertify on LinkedIn (opens in a new tab)"
            >
              <LinkedinIcon size={14} />
              <span>LinkedIn</span>
              <ArrowUpRight size={13} strokeWidth={1.75} aria-hidden="true" />
            </a>

            <a
              href="mailto:contact@qcertify.io"
              className={styles.emailButton}
              aria-label="Email QCertify at contact@qcertify.io"
            >
              <Mail size={14} strokeWidth={1.75} aria-hidden="true" />
              <span>contact@qcertify.io</span>
            </a>
          </div>
        </div>

        {/* Column 2: Architecture & Company */}
        <div className={styles.navCol}>
          <h4 className={styles.colTitle}>ARCHITECTURE &amp; COMPANY</h4>
          <ul className={styles.navList}>
            <li>
              <a href="#risk" className={styles.navLink}>
                Risk &amp; HNDL Exposure
              </a>
            </li>
            <li>
              <a href="#compliance" className={styles.navLink}>
                Compliance &amp; Pressure
              </a>
            </li>
            <li>
              <a href="#platform" className={styles.navLink}>
                Inline Gateway Platform
              </a>
            </li>
            <li>
              <a href="#trust" className={styles.navLink}>
                Cryptographic Trust
              </a>
            </li>
            <li>
              <a href="#leadership" className={styles.navLink}>
                Executive Leadership
              </a>
            </li>
          </ul>
        </div>

        {/* Column 3: Cryptography & Standards */}
        <div className={styles.navCol}>
          <h4 className={styles.colTitle}>STANDARDS &amp; PQC</h4>
          <ul className={styles.navList}>
            <li className={styles.navItemStatic}>
              Hybrid PQC (X25519 + ML-KEM)
            </li>
            <li className={styles.navItemStatic}>
              Dual-Cert Auth (ECDSA + ML-DSA)
            </li>
            <li className={styles.navItemStatic}>
              NIST FIPS 203 &amp; FIPS 204
            </li>
            <li className={styles.navItemStatic}>
              CNSA 2.0 · DORA · NIS2
            </li>
            <li className={styles.navItemStatic}>
              Fail-Closed Inline Policy
            </li>
          </ul>
        </div>

        {/* Column 4: Engagement & Pilot */}
        <div className={styles.navCol}>
          <h4 className={styles.colTitle}>DEMO &amp; PILOT</h4>
          <p className={styles.pilotText}>
            Launch a governed pilot on a live traffic path or book an interactive walkthrough.
          </p>
          <div className={styles.pilotActions}>
            <a href="#contact" className={styles.pilotCtaButton}>
              Request Demo / Pilot <ArrowUpRight size={13} aria-hidden="true" />
            </a>
            <a href="mailto:contact@qcertify.io?subject=QCertify%20Demo%20%26%20Pilot%20Inquiry" className={styles.pilotSubLink}>
              Email our Engineering Team <ArrowUpRight size={12} aria-hidden="true" />
            </a>
          </div>
        </div>
      </div>

      {/* Footer Bottom Metadata */}
      <div className={styles.footerBottom}>
        <div className={styles.metaLeft}>
          <span>© {currentYear} QCERTIFY INC. ALL RIGHTS RESERVED.</span>
        </div>

        <a href="#top" className={styles.backToTop} aria-label="Scroll back to top">
          Back to top <ArrowUpRight size={13} aria-hidden="true" />
        </a>
      </div>
    </footer>
  );
}
