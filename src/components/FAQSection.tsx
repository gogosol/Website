"use client";
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

const faqs = [
  {
    q: "What does QCertify actually do?",
    a: "QCertify is a platform for operationalizing infrastructure-level trust. It provides a system of record for organizations to assess, document, and defend their cryptographic readiness and overall security posture, replacing fragmented spreadsheets with an auditable workflow."
  },
  {
    q: "Is QCertify a compliance tool, certification platform, or readiness system?",
    a: "It is an assurance platform that unifies all three. While typical GRC tools operate at a high-level policy tier, QCertify is designed specifically for the depth and rigor required for cryptographic transitions and next-generation technical certifications."
  },
  {
    q: "Does it replace existing GRC workflows?",
    a: "No. QCertify augments existing GRC environments (like Archer or AuditBoard) by providing purpose-built workflows, evidence pipelines, and framework mappings specific to complex technical transitions that generalist tools handle poorly."
  },
  {
    q: "How does QCertify support post-quantum readiness?",
    a: "The platform tracks the discovery of vulnerable assets, maps them against compliance mandates (e.g., NIST PQC standards), coordinates remediation tasks across siloed teams, and stores cryptographic transition evidence in a secure, reviewable ledger."
  },
  {
    q: "Is the platform suitable for highly regulated environments?",
    a: "Yes. QCertify is architected with advanced RBAC, comprehensive event logging, and secure compartmentalization. It is built explicitly for defense-adjacent, financial, and critical infrastructure environments where data provenance is paramount."
  }
];

export default function FAQSection() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="py-24 bg-[#0A0E17] border-t border-white/5" id="faq">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl md:text-5xl text-white font-semibold tracking-tight mb-12 text-center">
          Frequently asked questions
        </h2>
        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <div key={i} className="border border-white/10 bg-[#0B0F19] rounded-xl overflow-hidden transition-all duration-300">
              <button 
                className="w-full text-left px-6 py-5 flex items-center justify-between hover:bg-white/5 transition-colors focus-visible:outline-none focus-visible:bg-white/5 focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#0ea5e9]"
                onClick={() => setOpen(open === i ? null : i)}
                aria-expanded={open === i}
                aria-controls={`faq-answer-${i}`}
              >
                <span className="text-white font-medium text-lg pr-4">{faq.q}</span>
                <ChevronDown className={`w-5 h-5 text-slate-400 transition-transform duration-300 ${open === i ? 'rotate-180' : ''}`} aria-hidden="true" />
              </button>
              {open === i && (
                <div id={`faq-answer-${i}`} className="px-6 pb-5 pt-2 border-t border-white/5 bg-[#020617]/50" role="region">
                  <p className="text-slate-400 leading-relaxed">
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
