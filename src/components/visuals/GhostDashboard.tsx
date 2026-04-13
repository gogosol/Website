"use client";
import React from "react";
import { motion } from "framer-motion";

/**
 * Asset E — Ghost Dashboard
 * Conceptual product UI showing gateway status, traffic topology, protection profile.
 * Not real screenshots — synthetic but credible.
 */
export default function GhostDashboard() {
  const panelReveal = {
    hidden: { opacity: 0, y: 12 },
    visible: (i: number) => ({
      opacity: 1, y: 0,
      transition: { delay: i * 0.15, duration: 0.5 },
    }),
  };

  return (
    <div className="w-full glass-panel-heavy rounded-2xl overflow-hidden">
      {/* Window chrome */}
      <div className="flex items-center gap-2 px-5 py-3 border-b border-white/10 bg-white/[0.02]">
        <div className="w-2.5 h-2.5 rounded-full bg-slate-600" />
        <div className="w-2.5 h-2.5 rounded-full bg-slate-500" />
        <div className="w-2.5 h-2.5 rounded-full bg-slate-400" />
        <span className="ml-3 text-[10px] font-mono text-slate-500 uppercase tracking-widest">
          QuantumHalon · Control Plane
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 min-h-[340px]">
        {/* ═══ LEFT: Gateway List ═══ */}
        <motion.div custom={0} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={panelReveal}
          className="lg:col-span-3 border-r border-white/5 p-4 space-y-2">
          <div className="text-[9px] font-mono text-slate-500 uppercase tracking-widest mb-3 px-1">
            Gateway Pairs
          </div>
          {[
            { name: "HQ ↔ DC-East", status: "active" },
            { name: "HQ ↔ DC-West", status: "active" },
            { name: "Branch-01 ↔ Core", status: "active" },
            { name: "Cloud ↔ On-Prem", status: "active" },
            { name: "Partner ↔ DMZ", status: "standby" },
          ].map((gw, i) => (
            <div key={i} className="flex items-center justify-between p-2.5 rounded-lg bg-white/[0.02] border border-white/5 hover:border-white/15 transition-colors group cursor-default">
              <div className="flex items-center gap-2">
                <div className={`w-1.5 h-1.5 rounded-full ${gw.status === "active" ? "bg-emerald-400 animate-pulse" : "bg-slate-500"}`} />
                <span className="text-xs text-slate-300 group-hover:text-white transition-colors">{gw.name}</span>
              </div>
              <span className={`text-[9px] font-mono ${gw.status === "active" ? "text-emerald-400/60" : "text-slate-500"}`}>
                {gw.status === "active" ? "●" : "○"}
              </span>
            </div>
          ))}
        </motion.div>

        {/* ═══ CENTER: Topology View ═══ */}
        <motion.div custom={1} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={panelReveal}
          className="lg:col-span-5 border-r border-white/5 p-4">
          <div className="text-[9px] font-mono text-slate-500 uppercase tracking-widest mb-3 px-1">
            Traffic Topology
          </div>
          <div className="h-[240px] relative">
            <svg viewBox="0 0 360 200" fill="none" className="w-full h-full" aria-hidden="true">
              {/* Center hub */}
              <rect x="140" y="70" width="80" height="60" rx="10" fill="rgba(14,165,233,0.08)" stroke="rgba(14,165,233,0.3)" strokeWidth="1" />
              <text x="180" y="97" textAnchor="middle" fill="rgba(14,165,233,0.6)" fontSize="7" fontFamily="monospace" fontWeight="700" letterSpacing="1">QH CORE</text>
              <text x="180" y="112" textAnchor="middle" fill="rgba(255,255,255,0.3)" fontSize="7" fontFamily="monospace">4 pairs</text>
              {/* Satellite nodes */}
              {[
                { x: 30, y: 40, label: "HQ" },
                { x: 300, y: 40, label: "DC-E" },
                { x: 30, y: 140, label: "BR-01" },
                { x: 300, y: 140, label: "Cloud" },
                { x: 165, y: 170, label: "Partner" },
              ].map((n, i) => (
                <g key={i}>
                  <line x1={n.x + 20} y1={n.y + 15} x2={n.label === "Partner" ? 180 : (n.x < 180 ? 140 : 220)} y2={n.label === "Partner" ? 130 : 100} stroke="rgba(255,255,255,0.08)" strokeWidth="1" strokeDasharray="3 3" className="anim-flow-dash" />
                  <rect x={n.x} y={n.y} width="40" height="30" rx="6" fill="rgba(255,255,255,0.04)" stroke="rgba(255,255,255,0.12)" strokeWidth="0.5" />
                  <text x={n.x + 20} y={n.y + 19} textAnchor="middle" fill="rgba(255,255,255,0.4)" fontSize="7" fontFamily="monospace">{n.label}</text>
                </g>
              ))}
              {/* Flowing particles on connections */}
              {[0, 1, 2].map((p) => (
                <circle key={p} r="2" fill="#0ea5e9" opacity="0">
                  <animate attributeName="cx" values="50;180" dur="2s" begin={`${p * 0.7}s`} repeatCount="indefinite" />
                  <animate attributeName="cy" values="55;100" dur="2s" begin={`${p * 0.7}s`} repeatCount="indefinite" />
                  <animate attributeName="opacity" values="0;0.5;0" dur="2s" begin={`${p * 0.7}s`} repeatCount="indefinite" />
                </circle>
              ))}
            </svg>
          </div>
        </motion.div>

        {/* ═══ RIGHT: Protection Profile ═══ */}
        <motion.div custom={2} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={panelReveal}
          className="lg:col-span-4 p-4 space-y-4">
          <div className="text-[9px] font-mono text-slate-500 uppercase tracking-widest mb-3 px-1">
            Protection Profile
          </div>

          {/* Algorithm */}
          <div className="p-3 rounded-lg bg-white/[0.02] border border-white/5">
            <div className="text-[9px] font-mono text-slate-500 uppercase tracking-widest mb-1">Algorithm</div>
            <div className="text-sm text-white font-medium">ML-KEM-768 + AES-256</div>
            <div className="text-[10px] text-slate-500 font-mono mt-0.5">Hybrid Mode</div>
          </div>

          {/* Policy */}
          <div className="p-3 rounded-lg bg-white/[0.02] border border-white/5">
            <div className="text-[9px] font-mono text-slate-500 uppercase tracking-widest mb-1">Policy</div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-white font-medium">Enterprise Default</span>
              <span className="text-[9px] font-mono text-emerald-400/80 px-2 py-0.5 rounded bg-emerald-400/10 border border-emerald-400/20">Applied</span>
            </div>
          </div>

          {/* Last Rotation */}
          <div className="p-3 rounded-lg bg-white/[0.02] border border-white/5">
            <div className="text-[9px] font-mono text-slate-500 uppercase tracking-widest mb-1">Last Key Rotation</div>
            <div className="text-sm text-white font-medium">2 minutes ago</div>
            <div className="w-full h-1 mt-2 bg-white/5 rounded-full overflow-hidden">
              <div className="h-full w-[8%] bg-[#0ea5e9] rounded-full" />
            </div>
            <div className="text-[9px] text-slate-500 font-mono mt-1">Next rotation in 58m</div>
          </div>

          {/* Readiness */}
          <div className="p-3 rounded-lg border border-[#0ea5e9]/20 bg-[#0ea5e9]/[0.03]">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-[9px] font-mono text-[#0ea5e9]/50 uppercase tracking-widest mb-1">Migration Readiness</div>
                <div className="text-sm text-white font-medium">Phase 2 of 3</div>
              </div>
              <div className="flex gap-1">
                <div className="w-3 h-3 rounded-sm bg-[#0ea5e9]" />
                <div className="w-3 h-3 rounded-sm bg-[#0ea5e9]/50" />
                <div className="w-3 h-3 rounded-sm bg-white/10" />
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
