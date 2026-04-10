"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { FileWarning, ListTodo, Users, Search } from 'lucide-react';

const problems = [
  {
    icon: <FileWarning className="w-5 h-5 text-amber-500" />,
    title: "Fragmented evidence",
    desc: "Proof of readiness is scattered across PDFs, spreadsheets, and disconnected communications."
  },
  {
    icon: <ListTodo className="w-5 h-5 text-amber-500" />,
    title: "No audit-ready workflow",
    desc: "Existing workflows are manual, making repeatable certification prep almost impossible."
  },
  {
    icon: <Users className="w-5 h-5 text-amber-500" />,
    title: "Unclear ownership",
    desc: "Responsibility for cryptographic and trust transitions spans siloed technical and compliance teams."
  },
  {
    icon: <Search className="w-5 h-5 text-amber-500" />,
    title: "Limited visibility",
    desc: "Executives lack a unified, defensible view of platform security and readiness claims."
  }
];

export default function ProblemSection() {
  return (
    <section className="py-24 bg-[#0A0E17] border-y border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mb-16">
          <h2 className="text-3xl md:text-5xl text-white font-semibold tracking-tight mb-6 leading-tight">
            The challenge is not knowing change is coming. <br/>
            <span className="text-slate-400">The challenge is proving you are prepared.</span>
          </h2>
          <p className="text-slate-400 text-lg leading-relaxed">
            Quantum readiness is not just a technical issue. It is an assurance problem. Most organizations are not operationally ready for quantum-era trust demands, leaving their readiness work fragmented and vulnerable to gaps.
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
              className="p-6 bg-[#131825] border border-white/10 rounded-xl hover:border-white/20 transition-colors"
            >
              <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center mb-4">
                {prob.icon}
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
