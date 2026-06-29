import React from "react";
import Link from "next/link";
import BrandLogo from "@/components/BrandLogo";

const footerLinks = {
  Product: [
    { href: "/product", label: "QuantumHalon" },
    { href: "/how-it-works", label: "Architecture" },
    { href: "/use-cases", label: "Use Cases" },
  ],
  Program: [
    { href: "/compliance", label: "Readiness" },
    { href: "/industries", label: "Industries" },
    { href: "/resources", label: "Resources" },
  ],
  Company: [
    { href: "/about", label: "About" },
    { href: "/contact", label: "Contact" },
  ],
};

export default function Footer() {
  return (
    <footer className="relative z-10 border-t border-black bg-black text-[#f7f7f2]">
      <div className="editorial-wrap">
        <div className="border-b border-[#f7f7f2]/15 py-12 lg:py-16">
          <div className="grid gap-8 lg:grid-cols-[0.42fr_1fr] lg:items-end">
            <div className="text-[11px] font-semibold uppercase leading-5 text-[#f7f7f2]/50">
              Closing frame / post-quantum readiness
            </div>
            <p className="max-w-5xl text-4xl font-medium leading-[0.98] text-[#f7f7f2] sm:text-5xl lg:text-7xl">
              Security transitions should be legible, deployable, and governed before the deadline arrives.
            </p>
          </div>
        </div>

        <div className="grid gap-12 py-14 lg:grid-cols-[1.35fr_2fr] lg:py-20">
          <div>
            <BrandLogo tone="light" className="h-14 w-[254px] max-w-full sm:h-16 sm:w-[292px]" />
            <p className="mt-6 max-w-md text-sm leading-6 text-[#f7f7f2]/65">
              Inline post-quantum traffic protection for enterprise paths that
              cannot wait for a full application rewrite.
            </p>
            <a
              href="mailto:contact@qcertify.io"
              className="mt-8 inline-block border-b border-[#f7f7f2] pb-1 text-[11px] font-semibold uppercase text-[#f7f7f2] transition-colors hover:text-[#f7f7f2]/70"
            >
              contact@qcertify.io
            </a>
          </div>

          <div className="grid gap-8 border-t border-[#f7f7f2]/15 pt-8 sm:grid-cols-3 lg:border-t-0 lg:pt-0">
            {Object.entries(footerLinks).map(([category, links]) => (
              <div key={category}>
                <h3 className="text-[10px] font-semibold uppercase text-[#f7f7f2]">{category}</h3>
                <ul className="mt-5 grid gap-3">
                  {links.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="text-sm text-[#f7f7f2]/60 transition-colors hover:text-[#f7f7f2]"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col justify-between gap-4 border-t border-[#f7f7f2]/15 py-6 text-[10px] uppercase text-[#f7f7f2]/45 sm:flex-row">
          <div>&copy; {new Date().getFullYear()}. All rights reserved.</div>
          <div className="flex gap-6">
            <Link href="#" className="hover:text-[#f7f7f2]">
              Privacy Policy
            </Link>
            <Link href="#" className="hover:text-[#f7f7f2]">
              Terms
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
