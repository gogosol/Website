"use client";
import React from 'react';
import { ShieldCheck, Server, Lock, Fingerprint } from 'lucide-react';

export default function SecuritySection() {
  return (
    <section className="py-24 relative overflow-hidden border-y border-white/5" id="trust">
      <div className="bg-glow-orb w-[900px] h-[900px] bg-[#06b6d4] top-[-300px] right-[-400px] opacity-[0.15]"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-3xl md:text-5xl text-white font-bold tracking-tight mb-6 leading-tight">
              Structured for <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#06b6d4] to-[#e879f9] text-glow">accountability.</span>
            </h2>
            <p className="text-slate-300 text-lg leading-relaxed mb-8">
              Designed with enterprise security expectations in mind. Built to support controlled, auditable workflows that hold up under the most rigorous scrutiny.
            </p>
            <div className="space-y-8 mt-12">
              <div className="flex gap-4 group">
                <div className="flex-shrink-0 mt-1">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center bg-[#06b6d4]/10 border border-[#06b6d4]/30 shadow-[0_0_10px_rgba(6,182,212,0.2)] group-hover:scale-110 transition-transform">
                    <ShieldCheck className="w-5 h-5 text-[#06b6d4]" />
                  </div>
                </div>
                <div>
                  <h3 className="text-white font-medium mb-1 tracking-wide">Security-First Architecture</h3>
                  <p className="text-slate-400 text-sm leading-relaxed">Platform infrastructure is segregated, heavily monitored, and engineered iteratively against modern security benchmarks.</p>
                </div>
              </div>
              <div className="flex gap-4 group">
                <div className="flex-shrink-0 mt-1">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center bg-[#06b6d4]/10 border border-[#06b6d4]/30 shadow-[0_0_10px_rgba(6,182,212,0.2)] group-hover:scale-110 transition-transform">
                    <Fingerprint className="w-5 h-5 text-[#06b6d4]" />
                  </div>
                </div>
                <div>
                  <h3 className="text-white font-medium mb-1 tracking-wide">Role-Based Access Control</h3>
                  <p className="text-slate-400 text-sm leading-relaxed">Strict identity mapping ensures that only verified owners can modify documentation, approve evidence, or change mapping states.</p>
                </div>
              </div>
              <div className="flex gap-4 group">
                <div className="flex-shrink-0 mt-1">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center bg-[#06b6d4]/10 border border-[#06b6d4]/30 shadow-[0_0_10px_rgba(6,182,212,0.2)] group-hover:scale-110 transition-transform">
                    <Server className="w-5 h-5 text-[#06b6d4]" />
                  </div>
                </div>
                <div>
                  <h3 className="text-white font-medium mb-1 tracking-wide">Untampered Audit Trails</h3>
                  <p className="text-slate-400 text-sm leading-relaxed">Every action, state shift, and file upload is chronologically logged to provide an immutable record for third-party auditing.</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-tr from-[#06b6d4]/20 to-[#e879f9]/20 rounded-2xl blur-3xl opacity-50" />
            <div className="relative rounded-2xl p-8 glass-panel-heavy border-t border-white/20">
              <div className="border-b border-white/10 pb-5 mb-6 flex items-center gap-3">
                <Lock className="w-5 h-5 text-[#06b6d4] drop-shadow-[0_0_5px_rgba(6,182,212,0.8)]" />
                <span className="text-white font-medium tracking-wide uppercase text-sm">Enterprise Deployment Config</span>
              </div>
              
              <div className="space-y-4 font-mono text-sm">
                <div className="flex justify-between items-center py-3 border-b border-white/5">
                  <span className="text-slate-400 opacity-80">Data Isolation Mode</span>
                  <span className="text-[#06b6d4] font-bold text-shadow">Active</span>
                </div>
                <div className="flex justify-between items-center py-3 border-b border-white/5">
                  <span className="text-slate-400 opacity-80">Evidence Integrity Hash</span>
                  <span className="text-slate-300">SHA-256</span>
                </div>
                <div className="flex justify-between items-center py-3 border-b border-white/5">
                  <span className="text-slate-400 opacity-80">Compliance Stamping</span>
                  <span className="text-[#06b6d4] font-bold text-shadow">Enabled</span>
                </div>
                <div className="flex justify-between items-center py-3">
                  <span className="text-slate-400 opacity-80">Identity Provider (SSO)</span>
                  <span className="text-[#e879f9] px-3 py-1 bg-white/5 rounded border border-white/10 text-xs tracking-widest shadow-[0_0_10px_rgba(232,121,249,0.2)]">SAML 2.0 / OIDC</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
