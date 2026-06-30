"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Shield } from 'lucide-react';
import Link from 'next/link';

/**
 * Standalone HeroSection component (used on sub-pages that import it directly).
 * QCertify = company, QuantumHalon = product.
 */
export default function HeroSection() {
  return (
    <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Background glow orbs */}
      <div className="bg-glow-orb w-[800px] h-[800px] bg-white top-[-200px] left-[-300px] opacity-[0.06] hidden md:block"></div>
      <div className="bg-glow-orb w-[600px] h-[600px] bg-white bottom-[-100px] right-[-200px] opacity-[0.03]"></div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#0ea5e9]/30 bg-[#0ea5e9]/10 text-white text-xs font-bold uppercase tracking-widest mb-8 backdrop-blur-md shadow-[0_0_15px_rgba(14,165,233,0.1)]">
            <Shield className="w-4 h-4 text-[#0ea5e9]" />
            <span>Post-Quantum Protection</span>
          </div>
          <h1 className="text-5xl lg:text-7xl font-bold tracking-tight text-white mb-6 leading-[1.1] drop-shadow-2xl">
            Protecting organizations <br/>for the <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-[#0ea5e9]">post-quantum era.</span>
          </h1>
          <p className="text-lg lg:text-xl text-slate-300 mb-10 max-w-lg leading-relaxed font-light">
            QCertify protects critical communications and systems with Post-Quantum Cryptography. QuantumHalon is a crypto-agile gateway that reduces HNDL risk and enables gradual PQC transition.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link href="/contact" className="relative group overflow-hidden inline-flex justify-center items-center gap-2 px-8 py-4 rounded-full font-bold transition-all glass-panel glass-interactive text-white focus:outline-none focus:ring-2 focus:ring-[#0ea5e9]">
              <span className="relative z-10 shadow-sm">Technical Consultation</span>
            </Link>
            <Link href="/product" className="inline-flex justify-center items-center gap-2 glass-panel glass-interactive px-8 py-4 rounded-full font-medium transition-all text-white focus:outline-none focus:ring-2 focus:ring-[#0ea5e9]">
              Explore QuantumHalon <ArrowRight className="w-4 h-4 text-white group-hover:text-[#0ea5e9] transition-colors" />
            </Link>
          </div>
        </motion.div>

        {/* Abstract UI Visual - 3D enhanced */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="relative lg:h-[550px] w-full rounded-2xl glass-panel-heavy flex flex-col p-6 lg:p-8 anim-depth-pulse"
        >
          {/* Inner Light reflection */}
          <div className="absolute inset-0 rounded-2xl border border-white/20 pointer-events-none"></div>

          
          <div className="flex items-center gap-2 border-b border-white/10 pb-4 mb-6">
            <div className="w-3 h-3 rounded-full bg-slate-500/80" />
            <div className="w-3 h-3 rounded-full bg-slate-400/80" />
            <div className="w-3 h-3 rounded-full bg-slate-300/80" />
            <span className="ml-3 text-xs font-mono text-slate-400 px-2 py-0.5 uppercase tracking-widest opacity-80 border border-white/5 rounded">quantumhalon_engine</span>
          </div>
          
          <div className="flex-1 space-y-5 font-mono text-sm z-10 relative">
            <div className="p-5 glass-panel glass-interactive rounded-xl flex justify-between items-center group shimmer">
              <span className="text-slate-300 uppercase tracking-widest text-xs group-hover:text-[#0ea5e9] transition-colors relative z-10">PQC Framework Mapping</span>
              <span className="text-white font-bold text-shadow relative z-10">92% Cover</span>
            </div>
            <div className="p-6 glass-panel glass-interactive rounded-xl flex gap-4 flex-col group">
              <div className="flex justify-between items-center mb-1">
                <span className="text-slate-400 text-xs tracking-widest uppercase">Protection Readiness</span>
                <span className="text-white text-xs font-bold">74%</span>
              </div>
              <div className="w-full h-2 bg-black rounded-full overflow-hidden border border-white/10 box-content">
                <div className="h-full bg-gradient-to-r from-[#0ea5e9] to-[#38bdf8] w-3/4 shadow-[0_0_10px_rgba(14,165,233,0.5)] relative">
                  <div className="absolute right-0 top-0 bottom-0 w-4 bg-white/50 rounded-r-full"></div>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-5 translate-y-2">
               {/* 3D layered cards */}
              <div className="p-5 glass-panel rounded-xl border-t border-t-white/30 shadow-xl relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-24 h-24 bg-[#0ea5e9] opacity-5 group-hover:opacity-10 transition-opacity blur-2xl rounded-full"></div>
                <div className="text-slate-400 text-[10px] uppercase tracking-widest mb-2 z-10 relative">Protected Assets</div>
                <div className="text-white text-3xl font-light tracking-tight z-10 relative">1,204</div>
              </div>
              <div className="p-5 glass-panel rounded-xl border-l-2 border-l-[#0ea5e9]/50 shadow-xl relative overflow-hidden group">
                 <div className="absolute bottom-0 left-0 w-24 h-24 bg-[#0ea5e9] opacity-5 group-hover:opacity-10 transition-opacity blur-2xl rounded-full"></div>
                <div className="text-slate-400 text-[10px] uppercase tracking-widest mb-2 z-10 relative">PQC Policies</div>
                <div className="text-white text-3xl font-light tracking-tight z-10 relative">48</div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}







