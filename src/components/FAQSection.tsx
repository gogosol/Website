"use client";
import React, { useState } from 'react';
import { ChevronDown, Hexagon } from 'lucide-react';

const faqs = [
  {
    q: "What does QCertify actually do?",
    a: "QCertify builds practical post-quantum security solutions. Its first solution, QuantumHalon, helps organizations protect selected traffic paths while keeping migration, policy, and evidence work understandable."
  },
  {
    q: "Is QCertify a compliance tool, certification platform, or readiness system?",
    a: "QCertify is not positioned as a generic compliance platform. The public focus is governed post-quantum transition: protected paths, readiness evidence, and clear technical boundaries."
  },
  {
    q: "Does it replace existing GRC workflows?",
    a: "No. QCertify is intended to complement existing governance and risk programs by clarifying which traffic paths, trust steps, and readiness evidence matter for post-quantum migration."
  },
  {
    q: "How does QCertify support post-quantum readiness?",
    a: "QCertify helps teams reason about long-lived data exposure, prioritize protected paths, and prepare evidence for buyers, auditors, and risk teams without publishing implementation mechanics."
  },
  {
    q: "Is the platform suitable for highly regulated environments?",
    a: "QCertify is designed for serious regulated conversations, but public materials avoid claiming certifications, production hardening, or assurance controls that have not been independently validated."
  }
];

export default function FAQSection() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="py-24 relative overflow-hidden border-t border-white/5" id="faq">
      <div className="bg-glow-orb w-[600px] h-[600px] bg-white top-[20%] left-[-200px] opacity-[0.03]"></div>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <h2 className="text-3xl md:text-5xl text-white font-bold tracking-tight mb-12 text-center text-glow">
          Frequently asked questions
        </h2>
        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <div key={i} className="glass-panel rounded-xl overflow-hidden transition-all duration-300">
              <button 
                className="w-full text-left px-6 py-5 flex items-center justify-between hover:bg-white/5 transition-colors focus-visible:outline-none focus-visible:bg-white/5 focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-white"
                onClick={() => setOpen(open === i ? null : i)}
                aria-expanded={open === i}
                aria-controls={`faq-answer-${i}`}
              >
                <div className="flex items-center gap-4">
                   <Hexagon className="w-4 h-4 text-white/50 flex-shrink-0" />
                   <span className="text-white font-medium text-lg pr-4">{faq.q}</span>
                </div>
                <ChevronDown className={`w-5 h-5 text-white/50 transition-transform duration-300 ${open === i ? 'rotate-180' : ''}`} aria-hidden="true" />
              </button>
              {open === i && (
                <div id={`faq-answer-${i}`} className="px-6 pb-5 pt-2 border-t border-white/10 bg-black/20" role="region">
                  <p className="text-slate-300 leading-relaxed font-light pl-8">
                    {faq.a}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
