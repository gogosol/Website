import React from "react";
import Link from "next/link";

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
    <footer className="relative z-10 border-t border-black/10 bg-[#f7f7f2]">
      <div className="editorial-wrap py-14 lg:py-20">
        <div className="grid gap-12 lg:grid-cols-[1.35fr_2fr]">
          <div>
            <div className="text-5xl font-medium leading-[0.88] text-black sm:text-7xl">
              QCertify.
            </div>
            <p className="mt-6 max-w-md text-sm leading-6 text-black/[0.58]">
              Inline post-quantum traffic protection for enterprise paths that
              cannot wait for a full application rewrite.
            </p>
            <a
              href="mailto:contact@qcertify.io"
              className="mt-8 inline-block border-b border-black pb-1 text-[11px] font-semibold uppercase text-black"
            >
              contact@qcertify.io
            </a>
          </div>

          <div className="grid gap-8 border-t border-black/10 pt-8 sm:grid-cols-3 lg:border-t-0 lg:pt-0">
            {Object.entries(footerLinks).map(([category, links]) => (
              <div key={category}>
                <h3 className="text-[10px] font-semibold uppercase text-black">{category}</h3>
                <ul className="mt-5 grid gap-3">
                  {links.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="text-sm text-black/[0.58] transition-colors hover:text-black"
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

        <div className="mt-14 flex flex-col justify-between gap-4 border-t border-black/10 pt-6 text-[10px] uppercase text-black/[0.45] sm:flex-row">
          <div>&copy; {new Date().getFullYear()} QCertify. All rights reserved.</div>
          <div className="flex gap-6">
            <Link href="#" className="hover:text-black">
              Privacy Policy
            </Link>
            <Link href="#" className="hover:text-black">
              Terms
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
