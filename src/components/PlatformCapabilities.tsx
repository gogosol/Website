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
    <section className="py-24 relative overflow-hidden border-y border-white/5">
      <div className="bg-glow-orb w-[700px] h-[700px] bg-white bottom-0 right-[-300px] opacity-[0.05]"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="mb-16 md:flex justify-between items-end">
          <div className="max-w-2xl">
            <h2 className="text-3xl md:text-5xl text-white font-semibold tracking-tight mb-6">
              The infrastructure behind certifiable readiness.
            </h2>
            <p className="text-slate-300 text-lg leading-relaxed">
              Enterprise capabilities for evidence, assurance, and action. QCertify transforms disparate compliance functions into a single scalable system of record.
            </p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {capabilities.map((cap, i) => (
            <div key={i} className="glass-panel rounded-2xl p-8 hover:-translate-y-1 transition-transform duration-300 group">
              <div className="flex items-center gap-4 mb-6 pb-6 border-b border-white/10">
                <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 text-white/50 flex flex-col items-center justify-center group-hover:scale-110 group-hover:text-white transition-all shadow-[0_0_10px_rgba(255,255,255,0.1)] group-hover:shadow-[0_0_15px_rgba(255,255,255,0.2)]">
                  {cap.icon}
                </div>
                <h3 className="text-xl text-white font-medium tracking-wide">{cap.title}</h3>
              </div>
              <ul className="space-y-4">
                {cap.features.map((feat, f_i) => (
                  <li key={f_i} className="flex items-start gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-white/20 to-white/60 mt-2 flex-shrink-0 shadow-[0_0_5px_rgba(255,255,255,0.2)]" />
                    <span className="text-slate-300">{feat}</span>
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
