"use client";

import Image from "next/image";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import styles from "@/app/home.module.css";

const links = [
  { href: "#risk", label: "Risk" },
  { href: "#compliance", label: "Compliance" },
  { href: "#platform", label: "Platform" },
  { href: "#operation", label: "Operation" },
  { href: "#trust", label: "Trust" },
  { href: "#team", label: "Team" },
];

export function Navigation() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("keydown", onKeyDown);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("keydown", onKeyDown);
    };
  }, []);

  return (
    <header className={styles.navWrap} data-scrolled={scrolled}>
      <nav className={styles.nav} aria-label="Primary navigation">
        <a href="#top" className={styles.brand} aria-label="QCertify home" onClick={() => setOpen(false)}>
          <Image
            src="/Logo SF White.png"
            alt="QCertify"
            width={654}
            height={96}
            className={styles.brandImage}
            priority
          />
        </a>

        <div className={styles.navLinks}>
          {links.map((link) => (
            <a key={link.href} href={link.href} className={styles.navLink}>
              {link.label}
            </a>
          ))}
        </div>

        <a href="#contact" className={styles.navCta}>
          Request Demo <ArrowUpRight aria-hidden="true" size={14} />
        </a>

        <button
          type="button"
          className={styles.menuButton}
          aria-label={open ? "Close navigation" : "Open navigation"}
          aria-expanded={open}
          aria-controls="mobile-navigation"
          onClick={() => setOpen((current) => !current)}
        >
          {open ? <X aria-hidden="true" size={18} /> : <Menu aria-hidden="true" size={18} />}
        </button>
      </nav>

      <div id="mobile-navigation" className={styles.mobileNav} data-open={open} aria-hidden={!open}>
        {links.map((link) => (
          <a key={link.href} href={link.href} onClick={() => setOpen(false)} tabIndex={open ? 0 : -1}>
            {link.label}
            <ArrowUpRight aria-hidden="true" size={18} />
          </a>
        ))}
        <a href="#contact" onClick={() => setOpen(false)} tabIndex={open ? 0 : -1}>
          Request Demo &amp; Pilot
          <ArrowUpRight aria-hidden="true" size={18} />
        </a>
      </div>
    </header>
  );
}
