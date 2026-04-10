"use client";
import React from 'react';
import { ShieldCheck, Server, Lock, Fingerprint } from 'lucide-react';

export default function SecuritySection() {
  return (
    <section className="py-24 bg-[#020617] border-y border-white/5 relative overflow-hidden" id="trust">
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-[#0ea5e9]/5 to-transparent pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-3xl md:text-5xl text-white font-semibold tracking-tight mb-6 leading-tight">
              Structured for accountability.
            </h2>
            <p className="text-slate-400 text-lg leading-relaxed mb-8">
              Designed with enterprise security expectations in mind. Built to support controlled, auditable workflows that hold up under the most rigorous scrutiny.
            </p>
            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="flex-shrink-0 mt-1">
                  <ShieldCheck className="w-6 h-6 text-[#0ea5e9]" />
                </div>
                <div>
                  <h3 className="text-white font-medium mb-1">Security-First Architecture</h3>
                  <p className="text-slate-400 text-sm leading-relaxed">Platform infrastructure is segregated, heavily monitored, and engineered iteratively against modern security benchmarks.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex-shrink-0 mt-1">
                  <Fingerprint className="w-6 h-6 text-[#0ea5e9]" />
                </div>
                <div>
                  <h3 className="text-white font-medium mb-1">Role-Based Access Control</h3>
                  <p className="text-slate-400 text-sm leading-relaxed">Strict identity mapping ensures that only verified owners can modify documentation, approve evidence, or change mapping states.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex-shrink-0 mt-1">
                  <Server className="w-6 h-6 text-[#0ea5e9]" />
                </div>
                <div>
                  <h3 className="text-white font-medium mb-1">Untampered Audit Trails</h3>
                  <p className="text-slate-400 text-sm leading-relaxed">Every action, state shift, and file upload is chronologically logged to provide an immutable record for third-party auditing.</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-tr from-[#0ea5e9]/10 to-[#8b5cf6]/10 rounded-2xl blur-2xl" />
            <div className="relative bg-[#0B0F19] border border-white/10 rounded-2xl p-8 shadow-2xl glass-panel">
              <div className="border-b border-white/5 pb-4 mb-6 flex items-center gap-3">
                <Lock className="w-5 h-5 text-slate-400" />
                <span className="text-white font-medium">Enterprise Deployment Configuration</span>
              </div>
              
              <div className="space-y-4 font-mono text-sm">
                <div className="flex justify-between items-center py-3 border-b border-white/5">
                  <span className="text-slate-400">Data Isolation Mode</span>
                  <span className="text-emerald-400">Active</span>
                </div>
                <div className="flex justify-between items-center py-3 border-b border-white/5">
                  <span className="text-slate-400">Evidence Integrity Hash</span>
                  <span className="text-slate-300">SHA-256</span>
                </div>
                <div className="flex justify-between items-center py-3 border-b border-white/5">
                  <span className="text-slate-400">Compliance Stamping</span>
                  <span className="text-emerald-400">Enabled</span>
                </div>
                <div className="flex justify-between items-center py-3">
                  <span className="text-slate-400">Identity Provider (SSO)</span>
                  <span className="text-slate-300 px-2 py-1 bg-white/5 rounded border border-white/5">SAML 2.0 / OIDC</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
