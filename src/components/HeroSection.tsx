"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Hexagon } from 'lucide-react';
import Link from 'next/link';

export default function HeroSection() {
  return (
    <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      {/* Background glow orbs */}
      <div className="bg-glow-orb w-[800px] h-[800px] bg-white top-[-200px] left-[-300px] opacity-10 hidden md:block"></div>
      <div className="bg-glow-orb w-[600px] h-[600px] bg-white bottom-[-100px] right-[-200px] opacity-[0.05]"></div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/30 bg-white/10 text-white text-xs font-bold uppercase tracking-widest mb-8 backdrop-blur-md shadow-[0_0_15px_rgba(255,255,255,0.1)]">
            <Hexagon className="w-4 h-4" />
            <span>Quantum Readiness</span>
          </div>
          <h1 className="text-5xl lg:text-7xl font-bold tracking-tight text-white mb-6 leading-[1.1] drop-shadow-2xl">
            Trust infrastructure <br/> for the <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-slate-400">quantum era.</span>
          </h1>
          <p className="text-lg lg:text-xl text-slate-300 mb-10 max-w-lg leading-relaxed font-light">
            QCertify helps enterprises assess, document, and communicate quantum-era readiness with structured evidence, governance workflows, and auditable assurance.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link href="#contact" className="relative group overflow-hidden inline-flex justify-center items-center gap-2 px-8 py-4 rounded-full font-bold transition-all bg-white text-black hover:bg-slate-200 focus:outline-none focus:ring-2 focus:ring-slate-300">
              <span className="relative z-10 shadow-sm">Book a Demo</span>
            </Link>
            <Link href="#platform" className="inline-flex justify-center items-center gap-2 glass-panel hover:bg-white/10 border border-white/20 px-8 py-4 rounded-full font-medium transition-all text-white focus:outline-none focus:ring-2 focus:ring-white">
              Explore the Platform <ArrowRight className="w-4 h-4 text-white" />
            </Link>
          </div>
        </motion.div>

        {/* Abstract UI Visual */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="relative lg:h-[550px] w-full rounded-2xl glass-panel-heavy flex flex-col p-6 lg:p-8"
        >
          {/* Inner Light reflection */}
          <div className="absolute inset-0 rounded-2xl border border-white/20 pointer-events-none"></div>
          
          <div className="flex items-center gap-2 border-b border-white/10 pb-4 mb-6">
            <div className="w-3 h-3 rounded-full bg-slate-500/80" />
            <div className="w-3 h-3 rounded-full bg-slate-400/80" />
            <div className="w-3 h-3 rounded-full bg-slate-300/80" />
            <span className="ml-3 text-xs font-mono text-slate-400 px-2 py-0.5 uppercase tracking-widest opacity-80 border border-white/5 rounded">qcertify_engine</span>
          </div>
          
          <div className="flex-1 space-y-5 font-mono text-sm z-10 relative">
            <div className="p-5 glass-panel rounded-xl flex justify-between items-center transition-transform hover:scale-[1.02]">
              <span className="text-slate-300 uppercase tracking-widest text-xs">PQC Framework mapping</span>
              <span className="text-white font-bold text-shadow">92% Cover</span>
            </div>
            <div className="p-6 glass-panel rounded-xl flex gap-4 flex-col transition-transform hover:scale-[1.02]">
              <div className="flex justify-between items-center mb-1">
                <span className="text-slate-400 text-xs tracking-widest uppercase">System Readiness Overview</span>
                <span className="text-white text-xs font-bold">74%</span>
              </div>
              <div className="w-full h-2 bg-black rounded-full overflow-hidden border border-white/10 box-content">
                <div className="h-full bg-gradient-to-r from-slate-400 to-white w-3/4 shadow-[0_0_10px_rgba(255,255,255,0.5)] relative">
                  <div className="absolute right-0 top-0 bottom-0 w-4 bg-white/50"></div>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-5 translate-y-2">
               {/* 3D layered cards */}
              <div className="p-5 glass-panel rounded-xl border-t border-t-white/30 shadow-xl relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-24 h-24 bg-white opacity-5 group-hover:opacity-10 transition-opacity blur-2xl rounded-full"></div>
                <div className="text-slate-400 text-[10px] uppercase tracking-widest mb-2 z-10 relative">Critical Assets Verified</div>
                <div className="text-white text-3xl font-light tracking-tight z-10 relative">1,204</div>
              </div>
              <div className="p-5 glass-panel rounded-xl border-l-2 border-l-white/50 shadow-xl relative overflow-hidden group">
                 <div className="absolute bottom-0 left-0 w-24 h-24 bg-white opacity-5 group-hover:opacity-10 transition-opacity blur-2xl rounded-full"></div>
                <div className="text-slate-400 text-[10px] uppercase tracking-widest mb-2 z-10 relative">Policies Aligned</div>
                <div className="text-white text-3xl font-light tracking-tight z-10 relative">48</div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
