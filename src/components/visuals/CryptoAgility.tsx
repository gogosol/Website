"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { LayoutGrid, Code, Cog, Shield } from "lucide-react";

/**
 * Asset D - Crypto-Agility Visual
 * A stable "environment" sits on top. Below it, the crypto layer cycles through governed profiles.
 * Enhanced with 3D flip transitions, holographic shimmer, and animated progress rings.
 * Shows: the system stays stable while cryptographic methods evolve underneath.
 */
const profiles = [
  { label: "Baseline profile", tag: "Current", color: "rgba(255,255,255,0.5)", ringColor: "#94a3b8" },
  { label: "Hybrid profile", tag: "Transition", color: "#38bdf8", ringColor: "#38bdf8" },
  { label: "Post-quantum profile", tag: "Future-ready", color: "#0ea5e9", ringColor: "#0ea5e9" },
  { label: "Next approved profile", tag: "Lifecycle", color: "#22d3ee", ringColor: "#22d3ee" },
];

export default function CryptoAgility() {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % profiles.length);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  const profile = profiles[activeIndex];

  return (
    <div className="w-full max-w-2xl mx-auto perspective-container">
      {/* Stable environment - 3D elevated */}
      <div className="glass-panel rounded-2xl p-6 relative z-10 card-3d" style={{ transformStyle: "preserve-3d" }}>
        {/* Top highlight */}


        <div className="flex items-center gap-2 mb-4">
          <div className="relative">
            <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <div className="absolute inset-0 w-2 h-2 rounded-full bg-emerald-400 animate-ping opacity-40" />
          </div>
          <span className="text-xs font-mono text-slate-400 uppercase tracking-widest">
            Environment Stable
          </span>
          <div className="ml-auto flex items-center gap-1.5">
            <Shield className="w-3.5 h-3.5 text-emerald-400/50" />
            <span className="text-[9px] font-mono text-emerald-400/50 uppercase">Protected</span>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-3">
          {[
            { name: "Applications", Icon: LayoutGrid },
            { name: "APIs", Icon: Code },
            { name: "Services", Icon: Cog },
          ].map(({ name, Icon }, i) => (
            <div key={i} className="p-3 bg-white/[0.03] border border-white/10 rounded-lg text-center relative overflow-hidden group hover:border-white/20 transition-all">
              {/* Shimmer on hover */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="shimmer absolute inset-0" />
              </div>
              <Icon className="w-5 h-5 mx-auto mb-2 text-slate-400 relative z-10 group-hover:text-white/60 transition-colors" />
              <span className="text-xs text-slate-400 font-medium relative z-10">{name}</span>
            </div>
          ))}
        </div>
        <div className="text-center mt-4">
          <span className="text-[10px] text-slate-500 font-mono tracking-widest uppercase">
            No changes required · No disruption · No downtime
          </span>
        </div>
      </div>

      {/* Connector - animated flow */}
      <div className="flex justify-center -my-1 relative z-20">
        <div className="relative flex gap-8">
          {[0, 1, 2].map((i) => (
            <div key={i} className="relative">
              <div className="w-px h-6 bg-gradient-to-b from-white/15 to-transparent" />
              {/* Flowing dot */}
              <div
                className="absolute left-1/2 -translate-x-1/2 w-1 h-1 rounded-full"
                style={{
                  backgroundColor: profile.color,
                  animation: `float-up 2s ease-in-out infinite ${i * 0.3}s`,
                  opacity: 0.5,
                }}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Crypto layer - 3D flip transition */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeIndex}
          initial={{ opacity: 0, rotateX: -15, y: 12, scale: 0.97 }}
          animate={{ opacity: 1, rotateX: 0, y: 0, scale: 1 }}
          exit={{ opacity: 0, rotateX: 15, y: -12, scale: 0.97 }}
          transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
          className="rounded-2xl p-5 border relative overflow-hidden"
          style={{
            borderColor: `${profile.color}33`,
            background: `linear-gradient(135deg, ${profile.color}0D 0%, transparent 60%)`,
            boxShadow: `0 8px 32px rgba(0,0,0,0.3), 0 0 30px ${profile.color}15`,
            transformStyle: "preserve-3d",
          }}
        >
          {/* Holographic shimmer */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div
              className="h-full w-1/4 opacity-25"
              style={{
                background: `linear-gradient(105deg, transparent 40%, ${profile.color}30 48%, ${profile.color}50 50%, ${profile.color}30 52%, transparent 60%)`,
                animation: "scan-line 3s ease-in-out infinite",
              }}
            />
          </div>

          {/* Top highlight */}


          <div className="flex items-center justify-between relative z-10">
            <div>
              <div className="text-[10px] font-mono uppercase tracking-widest mb-1" style={{ color: profile.color }}>
                Crypto Layer · {profile.tag}
              </div>
              <div className="text-white font-medium text-lg tracking-tight">
                {profile.label}
              </div>
            </div>
            <div className="flex items-center gap-3">
              {/* Animated progress ring */}
              <svg width="36" height="36" viewBox="0 0 36 36" className="flex-shrink-0">
                <circle cx="18" cy="18" r="14" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="2.5" />
                <circle
                  cx="18" cy="18" r="14"
                  fill="none"
                  stroke={profile.ringColor}
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeDasharray="88"
                  strokeDashoffset="22"
                  style={{ filter: `drop-shadow(0 0 4px ${profile.color})` }}
                >
                  <animateTransform attributeName="transform" type="rotate" values="0 18 18;360 18 18" dur="4s" repeatCount="indefinite" />
                </circle>
              </svg>
              <div className="flex items-center gap-2">
                <div className="relative">
                  <div className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: profile.color }} />
                  <div className="absolute inset-0 w-2 h-2 rounded-full animate-ping opacity-30" style={{ backgroundColor: profile.color }} />
                </div>
                <span className="text-xs font-mono" style={{ color: profile.color }}>
                  Active
                </span>
              </div>
            </div>
          </div>

          {/* Progress indicator - enhanced */}
          <div className="flex gap-1.5 mt-4 relative z-10">
            {profiles.map((_, i) => (
              <div
                key={i}
                className="h-1.5 flex-1 rounded-full transition-all duration-700 relative overflow-hidden"
                style={{
                  backgroundColor: i === activeIndex ? profile.color : "rgba(255,255,255,0.06)",
                  boxShadow: i === activeIndex ? `0 0 8px ${profile.color}60` : "none",
                }}
              >
                {i === activeIndex && (
                  <div
                    className="absolute inset-0 rounded-full"
                    style={{
                      background: `linear-gradient(90deg, transparent, ${profile.color}80, transparent)`,
                      animation: "scan-line 1.5s ease-in-out infinite",
                    }}
                  />
                )}
              </div>
            ))}
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

