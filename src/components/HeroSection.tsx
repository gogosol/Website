"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Lock } from 'lucide-react';
import Link from 'next/link';

export default function HeroSection() {
  return (
    <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="absolute inset-0 bg-gradient-to-b from-[#0ea5e9]/5 to-transparent pointer-events-none" />
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[#0ea5e9] text-xs font-semibold uppercase tracking-wider mb-6">
            <Lock className="w-3 h-3" />
            Quantum Readiness
          </div>
          <h1 className="text-5xl lg:text-7xl font-semibold tracking-tight text-white mb-6 leading-tight">
            Trust infrastructure <br/> for the <span className="text-transparent bg-clip-text bg-gradient-to-r from-slate-200 to-slate-500">quantum era.</span>
          </h1>
          <p className="text-lg lg:text-xl text-slate-400 mb-8 max-w-lg leading-relaxed">
            QCertify helps enterprises assess, document, and communicate quantum-era readiness with structured evidence, governance workflows, and auditable assurance.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link href="#contact" className="inline-flex justify-center items-center gap-2 bg-white text-[#020617] hover:bg-slate-200 px-6 py-3 rounded-md font-medium transition-colors">
              Book a Demo
            </Link>
            <Link href="#platform" className="inline-flex justify-center items-center gap-2 bg-transparent text-white border border-white/20 hover:bg-white/5 px-6 py-3 rounded-md font-medium transition-colors">
              Explore the Platform <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </motion.div>

        {/* Abstract UI Visual */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="relative lg:h-[500px] w-full rounded-xl border border-white/10 bg-[#0B0F19] overflow-hidden glass-panel flex flex-col p-6 shadow-2xl"
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#8b5cf6]/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#0ea5e9]/10 rounded-full blur-3xl translate-y-1/3 -translate-x-1/2" />
          
          <div className="flex items-center gap-2 border-b border-white/10 pb-4 mb-4">
            <div className="w-3 h-3 rounded-full bg-red-500/80" />
            <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
            <div className="w-3 h-3 rounded-full bg-green-500/80" />
            <span className="ml-2 text-xs font-mono text-slate-500 border border-slate-700 px-2 py-0.5 rounded uppercase tracking-wider">qcertify_dashboard.exe</span>
          </div>
          
          <div className="flex-1 space-y-4 font-mono text-sm z-10 relative">
            <div className="p-3 bg-slate-800/50 rounded border border-white/5 flex justify-between items-center">
              <span className="text-slate-300">PQC Framework Mapping</span>
              <span className="text-emerald-400">92% Cover</span>
            </div>
            <div className="p-4 bg-slate-800/50 rounded border border-white/5 flex gap-4 flex-col">
              <div className="flex justify-between items-center mb-1">
                <span className="text-slate-400 text-xs">Overall Preparedness</span>
                <span className="text-white text-xs">74%</span>
              </div>
              <div className="w-full h-1.5 bg-slate-900 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-[#0ea5e9] to-[#8b5cf6] w-3/4"></div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 bg-slate-800/50 rounded border border-white/5">
                <div className="text-slate-400 text-xs uppercase tracking-wider">Critical Assets</div>
                <div className="text-white text-2xl mt-1 font-semibold">1,204</div>
              </div>
              <div className="p-4 bg-slate-800/50 rounded border border-white/5 border-l-[#8b5cf6] border-l-2">
                <div className="text-slate-400 text-xs uppercase tracking-wider">Policies Mapped</div>
                <div className="text-white text-2xl mt-1 font-semibold">48</div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
