"use client";
import React, { useState, useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";

/**
 * Asset E - Ghost Dashboard
 * Conceptual product UI showing QuantumHalon gateway status, traffic topology, protection profile.
 * Enhanced with 3D tilt, live-updating counters, and glowing status indicators.
 * QuantumHalon is the product - preserved throughout.
 */

function AnimCounter({ target, duration = 2000 }: { target: number; duration?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });
  const [val, setVal] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    let current = 0;
    const step = Math.max(1, Math.ceil(target / (duration / 16)));
    const timer = setInterval(() => {
      current += step;
      if (current >= target) {
        setVal(target);
        clearInterval(timer);
      } else {
        setVal(current);
      }
    }, 16);
    return () => clearInterval(timer);
  }, [isInView, target, duration]);

  return <span ref={ref}>{val.toLocaleString()}</span>;
}

export default function GhostDashboard() {
  const panelReveal = {
    hidden: { opacity: 0, y: 12 },
    visible: (i: number) => ({
      opacity: 1, y: 0,
      transition: { delay: i * 0.15, duration: 0.5 },
    }),
  };

  return (
    <div className="w-full glass-panel-heavy rounded-2xl overflow-hidden relative anim-depth-pulse">
      {/* 3D top highlight */}


      {/* Window chrome */}
      <div className="flex items-center gap-2 px-5 py-3 border-b border-white/10 bg-white/[0.02]">
        <div className="w-2.5 h-2.5 rounded-full bg-slate-600" />
        <div className="w-2.5 h-2.5 rounded-full bg-slate-500" />
        <div className="w-2.5 h-2.5 rounded-full bg-slate-400" />
        <span className="ml-3 text-[10px] font-mono text-slate-500 uppercase tracking-widest">
          QuantumHalon · Control Plane
        </span>
        <div className="ml-auto flex items-center gap-1.5">
          <div className="relative">
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <div className="absolute inset-0 w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping opacity-30" />
          </div>
          <span className="text-[9px] font-mono text-emerald-400/60">System Online</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 lg:min-h-[340px]">
        {/* ═══ LEFT: Gateway List ═══ */}
        <motion.div custom={0} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={panelReveal}
          className="lg:col-span-3 lg:border-r border-b lg:border-b-0 border-white/5 p-4 space-y-2">
          <div className="text-[9px] font-mono text-slate-500 uppercase tracking-widest mb-3 px-1">
            Gateway Pairs
          </div>
          {[
            { name: "HQ ↔ DC-East", status: "active", latency: "2ms" },
            { name: "HQ ↔ DC-West", status: "active", latency: "5ms" },
            { name: "Branch-01 ↔ Core", status: "active", latency: "8ms" },
            { name: "Cloud ↔ On-Prem", status: "active", latency: "3ms" },
            { name: "Partner ↔ DMZ", status: "standby", latency: "-" },
          ].map((gw, i) => (
            <div key={i} className="flex items-center justify-between p-2.5 rounded-lg bg-white/[0.02] border border-white/5 hover:border-white/15 hover:bg-white/[0.04] transition-all group cursor-default relative overflow-hidden">
              {/* Hover shimmer */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity shimmer" />
              <div className="flex items-center gap-2 relative z-10">
                <div className="relative">
                  <div className={`w-1.5 h-1.5 rounded-full ${gw.status === "active" ? "bg-emerald-400 animate-pulse" : "bg-slate-500"}`} />
                  {gw.status === "active" && (
                    <div className="absolute inset-0 w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping opacity-20" />
                  )}
                </div>
                <span className="text-xs text-slate-300 group-hover:text-white transition-colors">{gw.name}</span>
              </div>
              <div className="flex items-center gap-2 relative z-10">
                <span className="text-[8px] font-mono text-slate-600">{gw.latency}</span>
                <span className={`text-[9px] font-mono ${gw.status === "active" ? "text-emerald-400/60" : "text-slate-500"}`}>
                  {gw.status === "active" ? "●" : "○"}
                </span>
              </div>
            </div>
          ))}
        </motion.div>

        {/* ═══ CENTER: Topology View ═══ */}
        <motion.div custom={1} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={panelReveal}
          className="lg:col-span-5 lg:border-r border-b lg:border-b-0 border-white/5 p-4">
          <div className="flex items-center justify-between mb-3 px-1">
            <div className="text-[9px] font-mono text-slate-500 uppercase tracking-widest">
              Traffic Topology
            </div>
            <div className="text-[9px] font-mono text-[#0ea5e9]/50">
              <AnimCounter target={12847} /> packets/s
            </div>
          </div>
          <div className="h-[200px] lg:h-[240px] relative">
            <svg viewBox="0 0 360 200" fill="none" className="w-full h-full" aria-hidden="true">
              <defs>
                <filter id="dash-glow" x="-20%" y="-20%" width="140%" height="140%">
                  <feGaussianBlur stdDeviation="3" />
                </filter>
              </defs>
              {/* Center hub - 3D */}
              <rect x="142" y="72" width="76" height="56" rx="10" fill="rgba(0,0,0,0.3)" />
              <rect x="140" y="70" width="80" height="60" rx="10" fill="rgba(14,165,233,0.08)" stroke="rgba(14,165,233,0.3)" strokeWidth="1" />

              <text x="180" y="95" textAnchor="middle" fill="rgba(14,165,233,0.6)" fontSize="7" fontFamily="monospace" fontWeight="700" letterSpacing="1">QH CORE</text>
              <text x="180" y="110" textAnchor="middle" fill="rgba(255,255,255,0.3)" fontSize="7" fontFamily="monospace">5 pairs</text>
              {/* Pulse rings around core */}
              <rect x="135" y="65" width="90" height="70" rx="12" fill="none" stroke="rgba(14,165,233,0.15)" strokeWidth="0.5">
                <animate attributeName="width" values="90;100;90" dur="3s" repeatCount="indefinite" />
                <animate attributeName="height" values="70;80;70" dur="3s" repeatCount="indefinite" />
                <animate attributeName="x" values="135;130;135" dur="3s" repeatCount="indefinite" />
                <animate attributeName="y" values="65;60;65" dur="3s" repeatCount="indefinite" />
                <animate attributeName="opacity" values="0.3;0.1;0.3" dur="3s" repeatCount="indefinite" />
              </rect>
              {/* Satellite nodes - 3D */}
              {[
                { x: 30, y: 40, label: "HQ" },
                { x: 300, y: 40, label: "DC-E" },
                { x: 30, y: 140, label: "BR-01" },
                { x: 300, y: 140, label: "Cloud" },
                { x: 165, y: 170, label: "Partner" },
              ].map((n, i) => (
                <g key={i}>
                  {/* Connection line with glow */}
                  <line x1={n.x + 20} y1={n.y + 15} x2={n.label === "Partner" ? 180 : (n.x < 180 ? 140 : 220)} y2={n.label === "Partner" ? 130 : 100} stroke="rgba(14,165,233,0.15)" strokeWidth="2" filter="url(#dash-glow)" />
                  <line x1={n.x + 20} y1={n.y + 15} x2={n.label === "Partner" ? 180 : (n.x < 180 ? 140 : 220)} y2={n.label === "Partner" ? 130 : 100} stroke="rgba(255,255,255,0.08)" strokeWidth="1" strokeDasharray="3 3" className="anim-flow-dash" />
                  {/* Node shadow */}
                  <rect x={n.x + 1} y={n.y + 2} width="40" height="30" rx="6" fill="rgba(0,0,0,0.3)" />
                  <rect x={n.x} y={n.y} width="40" height="30" rx="6" fill="rgba(255,255,255,0.04)" stroke="rgba(255,255,255,0.12)" strokeWidth="0.5" />
                  <rect x={n.x} y={n.y} width="40" height="1.5" rx="0.75" fill="rgba(255,255,255,0.08)" />
                  <text x={n.x + 20} y={n.y + 19} textAnchor="middle" fill="rgba(255,255,255,0.4)" fontSize="7" fontFamily="monospace">{n.label}</text>
                </g>
              ))}
              {/* Flowing particles on connections - more + varied */}
              {[0, 1, 2, 3].map((p) => (
                <circle key={p} r={p % 2 === 0 ? "2.5" : "1.5"} fill="#0ea5e9" opacity="0">
                  <animate attributeName="cx" values="50;180" dur={`${1.8 + p * 0.3}s`} begin={`${p * 0.5}s`} repeatCount="indefinite" />
                  <animate attributeName="cy" values="55;100" dur={`${1.8 + p * 0.3}s`} begin={`${p * 0.5}s`} repeatCount="indefinite" />
                  <animate attributeName="opacity" values="0;0.6;0" dur={`${1.8 + p * 0.3}s`} begin={`${p * 0.5}s`} repeatCount="indefinite" />
                </circle>
              ))}
              {/* Reverse direction particles */}
              {[0, 1].map((p) => (
                <circle key={`r-${p}`} r="1.5" fill="#0ea5e9" opacity="0">
                  <animate attributeName="cx" values="320;180" dur="2.2s" begin={`${p * 0.8}s`} repeatCount="indefinite" />
                  <animate attributeName="cy" values="55;100" dur="2.2s" begin={`${p * 0.8}s`} repeatCount="indefinite" />
                  <animate attributeName="opacity" values="0;0.4;0" dur="2.2s" begin={`${p * 0.8}s`} repeatCount="indefinite" />
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
          <div className="p-3 rounded-lg bg-white/[0.02] border border-white/5 relative overflow-hidden group hover:border-white/10 transition-all">
            <div className="absolute inset-0 shimmer opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="text-[9px] font-mono text-slate-500 uppercase tracking-widest mb-1 relative z-10">Algorithm</div>
            <div className="text-sm text-white font-medium relative z-10">ML-KEM-768 + AES-256</div>
            <div className="text-[10px] text-[#0ea5e9]/60 font-mono mt-0.5 relative z-10">Hybrid PQC Mode</div>
          </div>

          {/* Policy */}
          <div className="p-3 rounded-lg bg-white/[0.02] border border-white/5 relative overflow-hidden group hover:border-white/10 transition-all">
            <div className="absolute inset-0 shimmer opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="text-[9px] font-mono text-slate-500 uppercase tracking-widest mb-1 relative z-10">Policy</div>
            <div className="flex items-center justify-between relative z-10">
              <span className="text-sm text-white font-medium">Enterprise Default</span>
              <span className="text-[9px] font-mono text-emerald-400/80 px-2 py-0.5 rounded bg-emerald-400/10 border border-emerald-400/20">Applied</span>
            </div>
          </div>

          {/* Last Rotation */}
          <div className="p-3 rounded-lg bg-white/[0.02] border border-white/5 relative overflow-hidden group hover:border-white/10 transition-all">
            <div className="absolute inset-0 shimmer opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="text-[9px] font-mono text-slate-500 uppercase tracking-widest mb-1 relative z-10">Last Key Rotation</div>
            <div className="text-sm text-white font-medium relative z-10">2 minutes ago</div>
            <div className="w-full h-1.5 mt-2 bg-white/5 rounded-full overflow-hidden relative z-10">
              <div className="h-full w-[8%] bg-gradient-to-r from-[#0ea5e9] to-[#38bdf8] rounded-full relative">
                <div className="absolute right-0 top-0 bottom-0 w-2 bg-white/40 rounded-full" />
              </div>
            </div>
            <div className="text-[9px] text-slate-500 font-mono mt-1 relative z-10">Next rotation in 58m</div>
          </div>

          {/* Migration Readiness */}
          <div className="p-3 rounded-lg border border-[#0ea5e9]/20 bg-[#0ea5e9]/[0.03] relative overflow-hidden">

            <div className="flex items-center justify-between">
              <div>
                <div className="text-[9px] font-mono text-[#0ea5e9]/50 uppercase tracking-widest mb-1">PQC Migration</div>
                <div className="text-sm text-white font-medium">Phase 2 of 3</div>
              </div>
              <div className="flex gap-1">
                <div className="w-3 h-3 rounded-sm bg-[#0ea5e9] shadow-[0_0_6px_rgba(14,165,233,0.4)]" />
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

