"use client";
import React from "react";
import { motion } from "framer-motion";

/**
 * Asset G — Readiness Roadmap
 * 5-step horizontal timeline: Awareness → Discovery → Prioritization → Phased Rollout → Transition Readiness
 * Steps illuminate sequentially on scroll.
 */
const steps = [
  { label: "Awareness", sub: "Understand the risk landscape", num: "01" },
  { label: "Discovery", sub: "Map cryptographic exposure", num: "02" },
  { label: "Prioritization", sub: "Identify highest-value paths", num: "03" },
  { label: "Phased Rollout", sub: "Deploy gateway protection", num: "04" },
  { label: "Transition Readiness", sub: "Evolve with confidence", num: "05" },
];

export default function ReadinessRoadmap() {
  const stepVariant = {
    hidden: { opacity: 0, y: 16, scale: 0.95 },
    visible: (i: number) => ({
      opacity: 1, y: 0, scale: 1,
      transition: { delay: i * 0.18, duration: 0.5, ease: [0.25, 0.1, 0.25, 1] as const },
    }),
  };

  return (
    <div className="w-full">
      {/* Desktop: horizontal */}
      <div className="hidden lg:block relative">
        {/* Connection line */}
        <div className="absolute top-8 left-[10%] right-[10%] h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
        <div className="absolute top-[31px] left-[10%] right-[10%] h-px bg-gradient-to-r from-transparent via-[#0ea5e9]/20 to-transparent anim-flow-dash" style={{ backgroundSize: "12px 1px" }} />

        <div className="grid grid-cols-5 gap-4 relative z-10">
          {steps.map((step, i) => (
            <motion.div key={i} custom={i} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stepVariant}
              className="flex flex-col items-center text-center group"
            >
              {/* Node */}
              <div className="w-16 h-16 rounded-full flex items-center justify-center border border-white/10 bg-black group-hover:border-[#0ea5e9]/40 group-hover:bg-[#0ea5e9]/10 transition-all mb-4 relative">
                <span className="text-sm font-mono font-bold text-white/40 group-hover:text-[#0ea5e9] transition-colors">{step.num}</span>
                <div className="absolute inset-0 rounded-full border border-[#0ea5e9]/0 group-hover:border-[#0ea5e9]/30 group-hover:shadow-[0_0_20px_rgba(14,165,233,0.2)] transition-all" />
              </div>
              <h4 className="text-white font-medium text-sm mb-1 group-hover:text-[#0ea5e9] transition-colors">{step.label}</h4>
              <p className="text-slate-500 text-xs leading-relaxed">{step.sub}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Mobile: vertical */}
      <div className="lg:hidden relative pl-8">
        {/* Vertical line */}
        <div className="absolute left-[15px] top-0 bottom-0 w-px bg-white/10" />

        <div className="space-y-6">
          {steps.map((step, i) => (
            <motion.div key={i} custom={i} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stepVariant}
              className="flex items-start gap-4 group"
            >
              <div className="w-8 h-8 rounded-full flex items-center justify-center border border-white/10 bg-black flex-shrink-0 relative z-10 group-hover:border-[#0ea5e9]/40 transition-all">
                <span className="text-xs font-mono font-bold text-white/40 group-hover:text-[#0ea5e9] transition-colors">{step.num}</span>
              </div>
              <div className="pt-1">
                <h4 className="text-white font-medium text-sm mb-0.5">{step.label}</h4>
                <p className="text-slate-500 text-xs">{step.sub}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
