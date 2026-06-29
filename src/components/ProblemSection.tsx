"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { FileWarning, ListTodo, Users, Search } from 'lucide-react';

const problems = [
  {
    icon: <FileWarning className="w-5 h-5 text-white/80" />,
    title: "Fragmented evidence",
    desc: "Proof of readiness is scattered across PDFs, spreadsheets, and disconnected communications."
  },
  {
    icon: <ListTodo className="w-5 h-5 text-white/80" />,
    title: "No audit-ready workflow",
    desc: "Existing workflows are manual, making repeatable readiness evidence difficult to maintain."
  },
  {
    icon: <Users className="w-5 h-5 text-white/80" />,
    title: "Unclear ownership",
    desc: "Responsibility for cryptographic and trust transitions spans siloed technical and compliance teams."
  },
  {
    icon: <Search className="w-5 h-5 text-white/80" />,
    title: "Limited visibility",
    desc: "Executives lack a unified, defensible view of platform security and readiness claims."
  }
];

export default function ProblemSection() {
  return (
    <section className="py-24 relative overflow-hidden border-y border-white/5">
      <div className="bg-glow-orb w-[500px] h-[500px] bg-white top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-[0.03]"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-3xl mb-16">
          <h2 className="text-3xl md:text-5xl text-white font-semibold tracking-tight mb-6 leading-tight">
            The challenge is not knowing change is coming. <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-slate-400">The challenge is showing disciplined progress.</span>
          </h2>
          <p className="text-slate-300 text-lg leading-relaxed">
            Quantum readiness is not just a technical issue. It is an operating problem. Most organizations need a practical way to prioritize protected paths, track decisions, and explain progress without overstating maturity.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {problems.map((prob, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="p-6 glass-panel glass-interactive rounded-xl group"
            >
              <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center mb-4 border border-white/10 group-hover:border-[#0ea5e9]/50 group-hover:bg-[#0ea5e9]/10 group-hover:shadow-[0_0_15px_rgba(14,165,233,0.3)] transition-all">
                <span className="group-hover:text-[#0ea5e9] transition-colors">{prob.icon}</span>
              </div>
              <h3 className="text-white font-medium text-lg mb-2">{prob.title}</h3>
              <p className="text-slate-400 text-sm leading-relaxed">{prob.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
