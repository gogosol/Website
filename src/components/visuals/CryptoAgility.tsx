"use client";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

/**
 * Asset D — Crypto-Agility Visual
 * A stable "environment" sits on top. Below it, the crypto layer cycles through algorithms.
 * Shows: the system stays stable while cryptographic methods evolve underneath.
 */
const algorithms = [
  { label: "AES-256 + RSA", tag: "Classical", color: "rgba(255,255,255,0.5)" },
  { label: "AES-256 + ML-KEM", tag: "Hybrid", color: "#38bdf8" },
  { label: "ML-KEM + ML-DSA", tag: "Post-Quantum", color: "#0ea5e9" },
  { label: "Next Standard", tag: "Future-Ready", color: "#22d3ee" },
];

export default function CryptoAgility() {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % algorithms.length);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  const algo = algorithms[activeIndex];

  return (
    <div className="w-full max-w-2xl mx-auto">
      {/* Stable environment */}
      <div className="glass-panel rounded-2xl p-6 relative z-10">
        <div className="flex items-center gap-2 mb-4">
          <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-xs font-mono text-slate-400 uppercase tracking-widest">
            Environment Stable
          </span>
        </div>
        <div className="grid grid-cols-3 gap-3">
          {["Applications", "APIs", "Services"].map((name, i) => (
            <div key={i} className="p-3 bg-white/[0.03] border border-white/10 rounded-lg text-center">
              <div className="w-6 h-6 mx-auto mb-2 rounded bg-white/[0.06] border border-white/10" />
              <span className="text-xs text-slate-400 font-medium">{name}</span>
            </div>
          ))}
        </div>
        <div className="text-center mt-4">
          <span className="text-[10px] text-slate-500 font-mono tracking-widest uppercase">
            No changes required · No disruption · No downtime
          </span>
        </div>
      </div>

      {/* Connector */}
      <div className="flex justify-center -my-1 relative z-20">
        <div className="w-px h-6 bg-gradient-to-b from-white/15 to-transparent" />
        <div className="w-px h-6 bg-gradient-to-b from-white/15 to-transparent mx-8" />
        <div className="w-px h-6 bg-gradient-to-b from-white/15 to-transparent" />
      </div>

      {/* Crypto layer — cycles */}
      <motion.div
        key={activeIndex}
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -8 }}
        transition={{ duration: 0.4 }}
        className="rounded-2xl p-5 border relative overflow-hidden"
        style={{
          borderColor: `${algo.color}33`,
          background: `linear-gradient(135deg, ${algo.color}08 0%, transparent 100%)`,
        }}
      >
        {/* Scan line */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div
            className="h-full w-1/3 opacity-20"
            style={{
              background: `linear-gradient(90deg, transparent, ${algo.color}, transparent)`,
              animation: "scan-line 2s ease-in-out infinite",
            }}
          />
        </div>

        <div className="flex items-center justify-between relative z-10">
          <div>
            <div className="text-[10px] font-mono uppercase tracking-widest mb-1" style={{ color: algo.color }}>
              Crypto Layer · {algo.tag}
            </div>
            <div className="text-white font-medium text-lg tracking-tight">
              {algo.label}
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: algo.color }} />
            <span className="text-xs font-mono" style={{ color: algo.color }}>
              Active
            </span>
          </div>
        </div>

        {/* Progress indicator */}
        <div className="flex gap-1.5 mt-4 relative z-10">
          {algorithms.map((_, i) => (
            <div
              key={i}
              className="h-1 flex-1 rounded-full transition-all duration-500"
              style={{
                backgroundColor: i === activeIndex ? algo.color : "rgba(255,255,255,0.08)",
              }}
            />
          ))}
        </div>
      </motion.div>
    </div>
  );
}
