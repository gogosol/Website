import React from "react";
import Link from "next/link";
import Image from "next/image";

const footerLinks = {
  Product: [
    { href: "/product", label: "QuantumHalon" },
    { href: "/how-it-works", label: "How It Works" },
  ],
  Solutions: [
    { href: "/use-cases", label: "Use Cases" },
    { href: "/industries", label: "Industries" },
    { href: "/compliance", label: "Compliance & Readiness" },
  ],
  Company: [
    { href: "/about", label: "About" },
    { href: "/contact", label: "Contact" },
    { href: "/resources", label: "Resources" },
  ],
};

export default function Footer() {
  return (
    <footer className="border-t border-white/5 relative z-10 mt-0">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Image
              src="/SF_White_Logo_Web.png"
              alt="QCertify Logo"
              width={140}
              height={32}
              className="opacity-80 object-contain h-8 w-auto mb-4"
              style={{ height: 'auto' }}
            />
            <p className="text-slate-400 text-sm leading-relaxed max-w-xs mb-6">
              Enterprise cryptographic protection for the post-quantum era. Protect traffic today. Transition with confidence tomorrow.
            </p>
            <a
              href="mailto:contact@qcertify.io"
              className="text-slate-400 hover:text-[#0ea5e9] transition-colors font-mono text-sm tracking-wide"
            >
              contact@qcertify.io
            </a>
          </div>

          {/* Link columns */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h3 className="text-xs font-bold text-white uppercase tracking-widest mb-4">
                {category}
              </h3>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-slate-400 hover:text-white text-sm transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/5 mt-12 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="text-slate-500 text-sm font-mono">
            &copy; {new Date().getFullYear()} QCertify. All rights reserved.
          </div>
          <div className="flex gap-6 text-sm">
            <Link
              href="#"
              className="text-slate-400 hover:text-white transition-colors"
            >
              Privacy Policy
            </Link>
            <Link
              href="#"
              className="text-slate-400 hover:text-white transition-colors"
            >
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
