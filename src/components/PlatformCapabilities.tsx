"use client";
import React from 'react';
import { BarChart, Search, FileText, CheckCircle2 } from 'lucide-react';

export default function PlatformCapabilities() {
  const capabilities = [
    {
      title: "Readiness Intelligence",
      icon: <BarChart className="w-5 h-5" />,
      features: ["Posture assessments", "Maturity scoring", "Risk visibility", "Roadmap planning"]
    },
    {
      title: "Assurance Operations",
      icon: <CheckCircle2 className="w-5 h-5" />,
      features: ["Task orchestration", "Evidence collection", "Approvals and review flows", "Audit trail generation"]
    },
    {
      title: "Governance & Controls",
      icon: <Search className="w-5 h-5" />,
      features: ["Framework mapping", "Policy alignment", "Control ownership", "Cross-team coordination"]
    },
    {
      title: "Reporting & Trust Artifacts",
      icon: <FileText className="w-5 h-5" />,
      features: ["Executive dashboards", "Exportable reports", "Board-ready summaries", "Customer trust packages"]
    }
  ];

  return (
    <section className="py-24 bg-[#0A0E17] border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-16 md:flex justify-between items-end">
          <div className="max-w-2xl">
            <h2 className="text-3xl md:text-5xl text-white font-semibold tracking-tight mb-6">
              The infrastructure behind certifiable readiness.
            </h2>
            <p className="text-slate-400 text-lg leading-relaxed">
              Enterprise capabilities for evidence, assurance, and action. QCertify transforms disparate compliance functions into a single scalable system of record.
            </p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {capabilities.map((cap, i) => (
            <div key={i} className="bg-[#0B0F19] border border-white/10 rounded-xl p-8 hover:border-slate-700 transition-colors">
              <div className="flex items-center gap-4 mb-6 pb-6 border-b border-white/5">
                <div className="w-10 h-10 rounded-lg bg-[#0ea5e9]/10 text-[#0ea5e9] flex flex-col items-center justify-center">
                  {cap.icon}
                </div>
                <h3 className="text-xl text-white font-medium">{cap.title}</h3>
              </div>
              <ul className="space-y-4">
                {cap.features.map((feat, f_i) => (
                  <li key={f_i} className="flex items-start gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-slate-600 mt-2 flex-shrink-0" />
                    <span className="text-slate-400">{feat}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
