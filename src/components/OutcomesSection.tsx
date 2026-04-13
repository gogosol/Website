"use client";
import React from 'react';
import { FastForward, Eye, Shield, ActivitySquare } from 'lucide-react';

export default function OutcomesSection() {
  const outcomes = [
    { value: "Visibility", label: "Clear executive dashboarding translating technical risk into strategic readiness.", icon: <Eye /> },
    { value: "Velocity", label: "Faster readiness coordination with automated evidence collection.", icon: <FastForward /> },
    { value: "Trust", label: "Stronger partner and customer trust through reviewable, defensible reporting.", icon: <Shield /> },
    { value: "Efficiency", label: "Sharply reduced manual effort across highly fragmented technical teams.", icon: <ActivitySquare /> }
  ];

  return (
    <section className="py-24 bg-transparent border-y border-white/5 relative overflow-hidden">
      <div className="bg-glow-orb w-[600px] h-[600px] bg-white bottom-[-200px] left-[-300px] opacity-[0.03]"></div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <h2 className="text-3xl md:text-5xl text-white font-semibold tracking-tight mb-16 text-center text-glow">
          Measurable confidence.
        </h2>
        
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {outcomes.map((out, i) => (
            <div key={i} className="p-8 glass-panel glass-interactive flex flex-col gap-4 group">
              <div className="text-white/50 mb-2 group-hover:text-[#0ea5e9] transition-colors">
                {out.icon}
              </div>
              <div className="text-2xl text-white font-semibold tracking-tight">
                {out.value}
              </div>
              <p className="text-slate-400 text-sm leading-relaxed">
                {out.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
