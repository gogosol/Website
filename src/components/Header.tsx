"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X, ChevronDown } from "lucide-react";
import { usePathname } from "next/navigation";

const navLinks = [
  { href: "/product", label: "Product" },
  { href: "/how-it-works", label: "How It Works" },
  {
    label: "Solutions",
    children: [
      { href: "/use-cases", label: "Use Cases" },
      { href: "/industries", label: "Industries" },
      { href: "/compliance", label: "Compliance & Readiness" },
    ],
  },
  { href: "/resources", label: "Resources" },
  { href: "/about", label: "About" },
];

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [solutionsOpen, setSolutionsOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
    setSolutionsOpen(false);
  }, [pathname]);

  return (
    <header
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled
          ? "glass-panel !rounded-none border-b border-white/10"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link href="/" className="flex-shrink-0 flex items-center" aria-label="QCertify Home">
            <div className="relative h-10 w-[160px]">
              <Image
                src="/SF_White_Logo_Web.png"
                alt="QCertify Logo"
                fill
                loading="eager"
                className="object-contain object-left"
              />
            </div>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center space-x-8" aria-label="Main Navigation">
            {navLinks.map((item) =>
              item.children ? (
                <div key={item.label} className="relative">
                  <button
                    onClick={() => setSolutionsOpen(!solutionsOpen)}
                    onMouseEnter={() => setSolutionsOpen(true)}
                    className="flex items-center gap-1 text-sm font-medium text-slate-300 hover:text-white transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white rounded"
                  >
                    {item.label}
                    <ChevronDown
                      className={`w-3.5 h-3.5 transition-transform ${
                        solutionsOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                  {solutionsOpen && (
                    <div
                      className="absolute top-full left-0 mt-2 w-56 glass-panel rounded-xl p-2 border border-white/10"
                      onMouseLeave={() => setSolutionsOpen(false)}
                    >
                      {item.children.map((child) => (
                        <Link
                          key={child.href}
                          href={child.href}
                          className={`block px-4 py-2.5 rounded-lg text-sm font-medium transition-all ${
                            pathname === child.href
                              ? "text-white bg-white/10"
                              : "text-slate-300 hover:text-white hover:bg-white/5"
                          }`}
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  key={item.href}
                  href={item.href!}
                  className={`text-sm font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white rounded ${
                    pathname === item.href
                      ? "text-white"
                      : "text-slate-300 hover:text-white"
                  }`}
                >
                  {item.label}
                </Link>
              )
            )}
          </nav>

          {/* CTA */}
          <div className="hidden lg:flex items-center">
            <Link
              href="/contact"
              className="relative group text-sm font-bold text-white glass-panel glass-interactive px-6 py-2.5 rounded-full overflow-hidden transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0ea5e9]"
            >
              <span className="relative z-10 tracking-wide">Book a Demo</span>
            </Link>
          </div>

          {/* Mobile toggle */}
          <div className="lg:hidden flex items-center">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-slate-300 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white rounded p-1"
              aria-expanded={mobileMenuOpen}
              aria-label="Toggle mobile menu"
            >
              {mobileMenuOpen ? (
                <X className="h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden glass-panel !rounded-none border-t border-white/10">
          <div className="px-4 pt-4 pb-6 space-y-1">
            {navLinks.map((item) =>
              item.children ? (
                <div key={item.label}>
                  <button
                    onClick={() => setSolutionsOpen(!solutionsOpen)}
                    className="flex items-center justify-between w-full px-3 py-2.5 rounded-md text-base font-medium text-slate-300 hover:text-white hover:bg-white/5"
                  >
                    {item.label}
                    <ChevronDown
                      className={`w-4 h-4 transition-transform ${
                        solutionsOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                  {solutionsOpen && (
                    <div className="pl-4 space-y-1">
                      {item.children.map((child) => (
                        <Link
                          key={child.href}
                          href={child.href}
                          className="block px-3 py-2 rounded-md text-sm font-medium text-slate-400 hover:text-white hover:bg-white/5"
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  key={item.href}
                  href={item.href!}
                  className="block px-3 py-2.5 rounded-md text-base font-medium text-slate-300 hover:text-white hover:bg-white/5"
                >
                  {item.label}
                </Link>
              )
            )}
            <Link
              href="/contact"
              className="block px-3 py-3 mt-4 text-center rounded-full text-base font-bold glass-panel glass-interactive text-white"
            >
              Book a Demo
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
