"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import logo from "../../../public/images/Logo SF White.png";
import styles from "./Navigation.module.css";

const links = [
  { href: "/platform", label: "Platform" }, { href: "/architecture", label: "Architecture" },
  { href: "/use-cases", label: "Use cases" }, { href: "/trust", label: "Security & trust" },
  { href: "/company", label: "Company" }, { href: "/resources", label: "Resources" },
];

export function Navigation() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [dark, setDark] = useState(false);
  const toggle = useRef<HTMLButtonElement>(null);
  const header = useRef<HTMLElement>(null);

  useEffect(() => {
    function closeOnEscape(event: KeyboardEvent) { if (event.key === "Escape" && open) { setOpen(false); toggle.current?.focus(); } }
    function closeOutside(event: PointerEvent) { if (header.current && !header.current.contains(event.target as Node)) setOpen(false); }
    function closeWide() { if (window.innerWidth > 1080) setOpen(false); }
    document.addEventListener("keydown", closeOnEscape);
    document.addEventListener("pointerdown", closeOutside);
    window.addEventListener("resize", closeWide);
    return () => { document.removeEventListener("keydown", closeOnEscape); document.removeEventListener("pointerdown", closeOutside); window.removeEventListener("resize", closeWide); };
  }, [open]);

  // While the full-screen menu is open, the rest of the page is inert: focus cannot reach
  // content hidden behind the overlay, and the page does not scroll underneath it.
  useEffect(() => {
    const background = [document.getElementById("main-content"), document.querySelector("footer"), document.querySelector(".skip-link")];
    background.forEach((element) => element?.toggleAttribute("inert", open));
    document.documentElement.style.overflow = open ? "hidden" : "";
    return () => { background.forEach((element) => element?.removeAttribute("inert")); document.documentElement.style.overflow = ""; };
  }, [open]);

  // Track scroll position and whether a graphite chapter sits under the bar.
  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      setScrolled(window.scrollY > 8);
      const probe = (header.current?.offsetHeight ?? 72) / 2;
      let overDark = false;
      document.querySelectorAll<HTMLElement>("[data-nav-theme=dark]").forEach((section) => {
        const box = section.getBoundingClientRect();
        if (box.top <= probe && box.bottom >= probe) overDark = true;
      });
      setDark(overDark);
    };
    const schedule = () => { if (!frame) frame = requestAnimationFrame(update); };
    update();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => { cancelAnimationFrame(frame); window.removeEventListener("scroll", schedule); window.removeEventListener("resize", schedule); };
  }, [pathname]);

  const theme = dark && !open ? "dark" : "light";
  return <header ref={header} className={styles.header} data-theme={theme} data-scrolled={scrolled || open ? "" : undefined} data-open={open ? "" : undefined}>
    <div className={`container ${styles.bar}`}>
      <Link prefetch={false} href="/" aria-label="QCertify home" className={styles.brand} onClick={() => setOpen(false)}>
        <Image src={logo} alt="QCertify" sizes="140px" preload className={styles.logo} />
      </Link>
      <nav className={styles.desktop} aria-label="Primary navigation">{links.map(link => <Link prefetch={false} key={link.href} href={link.href} aria-current={pathname === link.href ? "page" : undefined}>{link.label}</Link>)}</nav>
      <Link prefetch={false} href="/demo?intent=demo" className={`button ${styles.cta}`} aria-current={pathname === "/demo" ? "page" : undefined} onClick={() => setOpen(false)}>Request a demo <ArrowUpRight aria-hidden="true" /></Link>
      <button type="button" ref={toggle} className={styles.toggle} aria-label={open ? "Close navigation" : "Open navigation"} aria-expanded={open} aria-controls="mobile-navigation" onClick={() => setOpen(!open)}>{open ? <X aria-hidden="true" size={20} /> : <Menu aria-hidden="true" size={20} />}</button>
    </div>
    <nav id="mobile-navigation" aria-label="Mobile navigation" className={styles.mobile} hidden={!open}>
      <div className="container">
        <ul className={styles.mobileList}>
          {links.map((link) => <li key={link.href}><Link prefetch={false} href={link.href} aria-current={pathname === link.href ? "page" : undefined} onClick={() => setOpen(false)}>{link.label}<ArrowUpRight aria-hidden="true" size={18} /></Link></li>)}
        </ul>
        <Link prefetch={false} href="/demo?intent=demo" className={`button ${styles.mobileCta}`} onClick={() => setOpen(false)}>Request a demo <ArrowUpRight aria-hidden="true" /></Link>
        <p className={styles.mobileNote}><span>QuantumHalon by QCertify</span><a href="mailto:contact@qcertify.io">contact@qcertify.io</a></p>
      </div>
    </nav>
  </header>;
}
