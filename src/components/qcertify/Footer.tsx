import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import logo from "../../../public/images/Logo SF White.png";
import styles from "./Footer.module.css";

const groups = [
  { label: "QuantumHalon", links: [
    { href: "/platform", text: "Platform" },
    { href: "/architecture", text: "Architecture" },
    { href: "/use-cases", text: "Use cases" },
    { href: "/trust", text: "Security & trust" },
  ] },
  { label: "Company", links: [
    { href: "/company", text: "About QCertify" },
    { href: "/resources", text: "Resources" },
    { href: "/demo?intent=demo", text: "Request a demo" },
  ] },
];

const external = [
  { href: "https://csrc.nist.gov/pubs/fips/203/final", text: "NIST FIPS 203 (ML-KEM)" },
  { href: "https://csrc.nist.gov/pubs/fips/204/final", text: "NIST FIPS 204 (ML-DSA)" },
];

/** A quiet, proportionate footer: the authentic wordmark, one statement, three link groups. */
export function Footer() {
  return <footer className={styles.footer} data-nav-theme="dark">
    <div className="container">
      <div className={styles.top}>
        <div className={styles.brand}>
          <Link prefetch={false} href="/" className={styles.logoLink} aria-label="QCertify home">
            <Image src={logo} alt="QCertify" sizes="128px" className={styles.logo} />
          </Link>
          <p className={styles.statement}>QCertify builds QuantumHalon: post-quantum protection for the networks enterprises already run, under their own control.</p>
          <a className={styles.email} href="mailto:contact@qcertify.io">contact@qcertify.io</a>
        </div>
        {groups.map((group) => <nav key={group.label} aria-label={group.label} className={styles.group}>
          <h2>{group.label}</h2>
          <ul>{group.links.map((link) => <li key={link.href}><Link prefetch={false} href={link.href}>{link.text}</Link></li>)}</ul>
        </nav>)}
        <nav aria-label="Standards and security" className={styles.group}>
          <h2>Standards &amp; security</h2>
          <ul>
            {external.map((link) => <li key={link.href}><a href={link.href} target="_blank" rel="noopener noreferrer">{link.text}<ArrowUpRight aria-hidden="true" size={13} /><span className="sr-only"> (opens in a new tab)</span></a></li>)}
            <li><a href="/.well-known/security.txt">Report a vulnerability</a></li>
          </ul>
        </nav>
      </div>
      <div className={styles.bottom}>
        <p>&copy; {new Date().getUTCFullYear()} QCertify. All rights reserved.</p>
        <p>QuantumHalon is a product of QCertify.</p>
        <Link prefetch={false} href="/trust#privacy">Privacy and data handling</Link>
      </div>
    </div>
  </footer>;
}
