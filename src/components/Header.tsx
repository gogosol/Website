"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion, useScroll, useSpring } from "framer-motion";
import { Menu, X } from "lucide-react";
import { usePathname } from "next/navigation";
import BrandLogo from "@/components/BrandLogo";

const navLinks = [
  { href: "/product", label: "Product" },
  { href: "/how-it-works", label: "Architecture" },
  { href: "/use-cases", label: "Use Cases" },
  { href: "/compliance", label: "Readiness" },
  { href: "/resources", label: "Resources" },
  { href: "/about", label: "About" },
];

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const { scrollYProgress } = useScroll();
  const readingProgress = useSpring(scrollYProgress, {
    stiffness: 180,
    damping: 32,
    mass: 0.4,
  });

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 14);
    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const closeMenu = () => setMobileMenuOpen(false);

  return (
    <>
      <header
        className={`fixed top-0 z-50 w-full border-b transition-colors duration-300 ${
          isScrolled || mobileMenuOpen
            ? "border-black/[0.12] bg-[#f7f7f2]/[0.92] backdrop-blur-xl"
            : "border-black/[0.08] bg-[#f7f7f2]/[0.72] backdrop-blur-md"
        }`}
      >
        <div className="editorial-wrap">
          <div className="grid h-16 grid-cols-[1fr_auto] items-center gap-4 lg:grid-cols-[1fr_2fr_1fr]">
            <Link
              href="/"
              onClick={closeMenu}
              className="inline-flex items-center focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-4 focus-visible:outline-black"
              aria-label="QCertify Home"
            >
              <BrandLogo className="h-8 w-[146px]" priority />
            </Link>

            <nav className="hidden items-center justify-center gap-7 lg:flex" aria-label="Main navigation">
              {navLinks.map((item) => {
                const active = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`relative text-[10px] font-semibold uppercase text-black/[0.55] transition-colors hover:text-black focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-4 focus-visible:outline-black ${
                      active ? "text-black" : ""
                    }`}
                  >
                    {active ? (
                      <span className="absolute -left-3 top-1/2 h-1.5 w-1.5 -translate-y-1/2 bg-[#126dff]" />
                    ) : null}
                    {item.label}
                  </Link>
                );
              })}
            </nav>

            <div className="hidden justify-end lg:flex">
              <Link
                href="/contact"
                className="group inline-flex items-center gap-3 border border-black px-4 py-2 text-[10px] font-semibold uppercase text-black transition-colors hover:bg-black hover:text-white focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-4 focus-visible:outline-black"
              >
                Technical Demo
                <span className="h-px w-5 bg-current transition-transform group-hover:translate-x-1" />
              </Link>
            </div>

            <button
              type="button"
              onClick={() => setMobileMenuOpen((open) => !open)}
              className="inline-flex h-10 w-10 items-center justify-center border border-black/15 text-black lg:hidden"
              aria-expanded={mobileMenuOpen}
              aria-label="Toggle mobile menu"
            >
              {mobileMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </button>
          </div>
        </div>
        <motion.div
          aria-hidden="true"
          className="absolute inset-x-0 bottom-[-1px] h-[2px] origin-left bg-[#126dff]"
          style={{ scaleX: readingProgress }}
        />
      </header>

      <AnimatePresence>
        {mobileMenuOpen ? (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-x-0 top-16 z-40 border-b border-black/[0.12] bg-[#f7f7f2] lg:hidden"
          >
            <nav className="editorial-wrap grid gap-px py-3" aria-label="Mobile navigation">
              {navLinks.map((item, index) => (
                <motion.div
                  key={item.href}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.03 * index, duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                >
                  <Link
                    href={item.href}
                    onClick={closeMenu}
                    className="flex items-center justify-between border-t border-black/10 py-4 text-[12px] font-semibold uppercase text-black"
                  >
                    {item.label}
                    <span className="text-[10px] text-black/[0.35]">{String(index + 1).padStart(2, "0")}</span>
                  </Link>
                </motion.div>
              ))}
              <Link
                href="/contact"
                onClick={closeMenu}
                className="mt-2 border border-black px-4 py-3 text-center text-[12px] font-semibold uppercase text-black"
              >
                Technical Demo
              </Link>
            </nav>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
