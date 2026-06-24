"use client";
import React from "react";
import { motion } from "framer-motion";

/**
 * Asset F - Use Case Path Cards
 * Four mini SVG diagrams showing different high-level QuantumHalon scenarios.
 * Enhanced with 3D card hover, more particles, and interactive path highlighting.
 * QuantumHalon ("QH") labels preserved in all diagrams.
 */

interface PathCardProps {
  variant: "site-to-site" | "branch-to-core" | "cloud" | "partner";
  className?: string;
}

function SiteToSite() {
  return (
    <svg viewBox="0 0 280 140" fill="none" className="w-full h-auto" aria-hidden="true">
      <defs>
        <filter id="sts-glow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="3" />
        </filter>
      </defs>
      {/* HQ - 3D */}
      <rect x="11" y="47" width="60" height="50" rx="12" fill="rgba(0,0,0,0.3)" />
      <rect x="10" y="45" width="60" height="50" rx="12" fill="rgba(255,255,255,0.04)" stroke="rgba(255,255,255,0.15)" />

      <text x="40" y="75" textAnchor="middle" fill="rgba(255,255,255,0.5)" fontSize="8" fontFamily="monospace">HQ</text>
      {/* GW1 - 3D */}
      <rect x="86" y="52" width="40" height="40" rx="12" fill="rgba(0,0,0,0.3)" />
      <rect x="85" y="50" width="40" height="40" rx="12" fill="rgba(14,165,233,0.08)" stroke="rgba(14,165,233,0.35)" />

      <text x="105" y="73" textAnchor="middle" fill="rgba(14,165,233,0.7)" fontSize="6" fontFamily="monospace" fontWeight="700">QH</text>
      {/* Protected path with glow */}
      <line x1="125" y1="70" x2="155" y2="70" stroke="rgba(14,165,233,0.3)" strokeWidth="3" filter="url(#sts-glow)" />
      <line x1="125" y1="70" x2="155" y2="70" stroke="rgba(14,165,233,0.4)" strokeWidth="2" strokeDasharray="4 3" className="anim-flow-dash" />
      {[0, 1, 2].map((p) => (
        <circle key={p} r="2" fill="#0ea5e9" opacity="0">
          <animate attributeName="cx" values="128;152" dur={`${1 + p * 0.2}s`} begin={`${p * 0.35}s`} repeatCount="indefinite" />
          <animate attributeName="cy" values="70;70" dur={`${1 + p * 0.2}s`} begin={`${p * 0.35}s`} repeatCount="indefinite" />
          <animate attributeName="opacity" values="0;0.7;0" dur={`${1 + p * 0.2}s`} begin={`${p * 0.35}s`} repeatCount="indefinite" />
        </circle>
      ))}
      {/* GW2 - 3D */}
      <rect x="156" y="52" width="40" height="40" rx="12" fill="rgba(0,0,0,0.3)" />
      <rect x="155" y="50" width="40" height="40" rx="12" fill="rgba(14,165,233,0.08)" stroke="rgba(14,165,233,0.35)" />

      <text x="175" y="73" textAnchor="middle" fill="rgba(14,165,233,0.7)" fontSize="6" fontFamily="monospace" fontWeight="700">QH</text>
      {/* Remote DC - 3D */}
      <rect x="211" y="47" width="60" height="50" rx="12" fill="rgba(0,0,0,0.3)" />
      <rect x="210" y="45" width="60" height="50" rx="12" fill="rgba(255,255,255,0.04)" stroke="rgba(255,255,255,0.15)" />

      <text x="240" y="75" textAnchor="middle" fill="rgba(255,255,255,0.5)" fontSize="8" fontFamily="monospace">DC</text>
      {/* Connections */}
      <line x1="70" y1="70" x2="85" y2="70" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
      <line x1="195" y1="70" x2="210" y2="70" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
    </svg>
  );
}

function BranchToCore() {
  return (
    <svg viewBox="0 0 280 140" fill="none" className="w-full h-auto" aria-hidden="true">
      {/* Branches - 3D */}
      {[25, 55, 85].map((y, i) => (
        <g key={i}>
          <rect x="11" y={y + 2} width="50" height="26" rx="6" fill="rgba(0,0,0,0.3)" />
          <rect x="10" y={y} width="50" height="26" rx="6" fill="rgba(255,255,255,0.04)" stroke="rgba(255,255,255,0.12)" />
          <text x="35" y={y + 16} textAnchor="middle" fill="rgba(255,255,255,0.4)" fontSize="7" fontFamily="monospace">BR-0{i + 1}</text>
          <line x1="60" y1={y + 13} x2="95" y2="70" stroke="rgba(255,255,255,0.08)" strokeWidth="1" />
        </g>
      ))}
      {/* GW - 3D */}
      <rect x="96" y="52" width="40" height="40" rx="12" fill="rgba(0,0,0,0.3)" />
      <rect x="95" y="50" width="40" height="40" rx="12" fill="rgba(14,165,233,0.08)" stroke="rgba(14,165,233,0.35)" />

      <text x="115" y="73" textAnchor="middle" fill="rgba(14,165,233,0.7)" fontSize="6" fontFamily="monospace" fontWeight="700">QH</text>
      {/* Protected path */}
      <line x1="135" y1="70" x2="170" y2="70" stroke="rgba(14,165,233,0.4)" strokeWidth="2" strokeDasharray="4 3" className="anim-flow-dash" />
      {[0, 1].map((p) => (
        <circle key={p} r="2" fill="#0ea5e9" opacity="0">
          <animate attributeName="cx" values="138;167" dur="1.2s" begin={`${p * 0.6}s`} repeatCount="indefinite" />
          <animate attributeName="cy" values="70;70" dur="1.2s" begin={`${p * 0.6}s`} repeatCount="indefinite" />
          <animate attributeName="opacity" values="0;0.6;0" dur="1.2s" begin={`${p * 0.6}s`} repeatCount="indefinite" />
        </circle>
      ))}
      {/* GW2 - 3D */}
      <rect x="171" y="52" width="40" height="40" rx="12" fill="rgba(0,0,0,0.3)" />
      <rect x="170" y="50" width="40" height="40" rx="12" fill="rgba(14,165,233,0.08)" stroke="rgba(14,165,233,0.35)" />

      <text x="190" y="73" textAnchor="middle" fill="rgba(14,165,233,0.7)" fontSize="6" fontFamily="monospace" fontWeight="700">QH</text>
      {/* Core - 3D */}
      <line x1="210" y1="70" x2="225" y2="70" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
      <rect x="226" y="42" width="50" height="60" rx="12" fill="rgba(0,0,0,0.3)" />
      <rect x="225" y="40" width="50" height="60" rx="12" fill="rgba(255,255,255,0.04)" stroke="rgba(255,255,255,0.15)" />
      <text x="250" y="73" textAnchor="middle" fill="rgba(255,255,255,0.5)" fontSize="7" fontFamily="monospace">CORE</text>
    </svg>
  );
}

function CloudHybrid() {
  return (
    <svg viewBox="0 0 280 140" fill="none" className="w-full h-auto" aria-hidden="true">
      {/* On-prem - 3D */}
      <rect x="11" y="47" width="60" height="50" rx="12" fill="rgba(0,0,0,0.3)" />
      <rect x="10" y="45" width="60" height="50" rx="12" fill="rgba(255,255,255,0.04)" stroke="rgba(255,255,255,0.15)" />

      <text x="40" y="68" textAnchor="middle" fill="rgba(255,255,255,0.5)" fontSize="7" fontFamily="monospace">ON-PREM</text>
      {/* GW1 - 3D */}
      <rect x="86" y="52" width="40" height="40" rx="12" fill="rgba(0,0,0,0.3)" />
      <rect x="85" y="50" width="40" height="40" rx="12" fill="rgba(14,165,233,0.08)" stroke="rgba(14,165,233,0.35)" />

      <text x="105" y="73" textAnchor="middle" fill="rgba(14,165,233,0.7)" fontSize="6" fontFamily="monospace" fontWeight="700">QH</text>
      {/* Protected path */}
      <line x1="125" y1="70" x2="155" y2="70" stroke="rgba(14,165,233,0.4)" strokeWidth="2" strokeDasharray="4 3" className="anim-flow-dash" />
      {[0, 1].map((p) => (
        <circle key={p} r="2" fill="#0ea5e9" opacity="0">
          <animate attributeName="cx" values="128;152" dur="1.2s" begin={`${p * 0.6}s`} repeatCount="indefinite" />
          <animate attributeName="cy" values="70;70" dur="1.2s" begin={`${p * 0.6}s`} repeatCount="indefinite" />
          <animate attributeName="opacity" values="0;0.6;0" dur="1.2s" begin={`${p * 0.6}s`} repeatCount="indefinite" />
        </circle>
      ))}
      {/* GW2 - 3D */}
      <rect x="156" y="52" width="40" height="40" rx="12" fill="rgba(0,0,0,0.3)" />
      <rect x="155" y="50" width="40" height="40" rx="12" fill="rgba(14,165,233,0.08)" stroke="rgba(14,165,233,0.35)" />

      <text x="175" y="73" textAnchor="middle" fill="rgba(14,165,233,0.7)" fontSize="6" fontFamily="monospace" fontWeight="700">QH</text>
      {/* Cloud - 3D */}
      <line x1="195" y1="70" x2="210" y2="70" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
      <path d="M225 85 C210 85 210 65 220 60 C218 50 230 45 240 50 C245 45 260 45 265 55 C275 55 275 70 268 75 C275 80 270 90 260 85 Z" fill="rgba(255,255,255,0.04)" stroke="rgba(255,255,255,0.15)" strokeWidth="1" />
      <text x="242" y="73" textAnchor="middle" fill="rgba(255,255,255,0.5)" fontSize="7" fontFamily="monospace">CLOUD</text>
      <line x1="70" y1="70" x2="85" y2="70" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
    </svg>
  );
}

function PartnerExchange() {
  return (
    <svg viewBox="0 0 280 140" fill="none" className="w-full h-auto" aria-hidden="true">
      {/* Org A - 3D */}
      <rect x="11" y="37" width="55" height="70" rx="12" fill="rgba(0,0,0,0.3)" />
      <rect x="10" y="35" width="55" height="70" rx="12" fill="rgba(255,255,255,0.04)" stroke="rgba(255,255,255,0.15)" />

      <text x="37" y="58" textAnchor="middle" fill="rgba(255,255,255,0.5)" fontSize="7" fontFamily="monospace">ORG A</text>
      <text x="37" y="75" textAnchor="middle" fill="rgba(255,255,255,0.3)" fontSize="6" fontFamily="monospace">Internal</text>
      {/* GW1 - 3D */}
      <rect x="81" y="52" width="40" height="40" rx="12" fill="rgba(0,0,0,0.3)" />
      <rect x="80" y="50" width="40" height="40" rx="12" fill="rgba(14,165,233,0.08)" stroke="rgba(14,165,233,0.35)" />

      <text x="100" y="73" textAnchor="middle" fill="rgba(14,165,233,0.7)" fontSize="6" fontFamily="monospace" fontWeight="700">QH</text>
      {/* Exchange boundary */}
      <rect x="128" y="55" width="24" height="30" rx="4" fill="rgba(255,255,255,0.02)" stroke="rgba(255,255,255,0.08)" strokeDasharray="2 2" />
      <text x="140" y="73" textAnchor="middle" fill="rgba(255,255,255,0.25)" fontSize="5" fontFamily="monospace">BOUND</text>
      {/* Protected path */}
      <line x1="120" y1="70" x2="160" y2="70" stroke="rgba(14,165,233,0.4)" strokeWidth="2" strokeDasharray="4 3" className="anim-flow-dash" />
      {[0, 1].map((p) => (
        <circle key={p} r="2" fill="#0ea5e9" opacity="0">
          <animate attributeName="cx" values="123;157" dur="1.3s" begin={`${p * 0.65}s`} repeatCount="indefinite" />
          <animate attributeName="cy" values="70;70" dur="1.3s" begin={`${p * 0.65}s`} repeatCount="indefinite" />
          <animate attributeName="opacity" values="0;0.6;0" dur="1.3s" begin={`${p * 0.65}s`} repeatCount="indefinite" />
        </circle>
      ))}
      {/* GW2 - 3D */}
      <rect x="161" y="52" width="40" height="40" rx="12" fill="rgba(0,0,0,0.3)" />
      <rect x="160" y="50" width="40" height="40" rx="12" fill="rgba(14,165,233,0.08)" stroke="rgba(14,165,233,0.35)" />

      <text x="180" y="73" textAnchor="middle" fill="rgba(14,165,233,0.7)" fontSize="6" fontFamily="monospace" fontWeight="700">QH</text>
      {/* Org B - 3D */}
      <rect x="216" y="37" width="55" height="70" rx="12" fill="rgba(0,0,0,0.3)" />
      <rect x="215" y="35" width="55" height="70" rx="12" fill="rgba(255,255,255,0.04)" stroke="rgba(255,255,255,0.15)" />

      <text x="242" y="58" textAnchor="middle" fill="rgba(255,255,255,0.5)" fontSize="7" fontFamily="monospace">ORG B</text>
      <text x="242" y="75" textAnchor="middle" fill="rgba(255,255,255,0.3)" fontSize="6" fontFamily="monospace">Partner</text>
      <line x1="65" y1="70" x2="80" y2="70" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
      <line x1="200" y1="70" x2="215" y2="70" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
    </svg>
  );
}

const pathCards: Record<PathCardProps["variant"], { component: React.FC; title: string; sub: string }> = {
  "site-to-site": { component: SiteToSite, title: "Site-to-Site", sub: "HQ ↔ Data Center" },
  "branch-to-core": { component: BranchToCore, title: "Branch-to-Core", sub: "Distributed branches → Central infra" },
  "cloud": { component: CloudHybrid, title: "Cloud Hybrid", sub: "On-prem ↔ Cloud provider" },
  "partner": { component: PartnerExchange, title: "Partner Exchange", sub: "Organization ↔ Third party" },
};

export default function UseCasePathCard({ variant, className = "" }: PathCardProps) {
  const topo = pathCards[variant];
  const Diagram = topo.component;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5 }}
      className={`glass-panel glass-interactive rounded-xl p-5 group perspective-container ${className}`}
    >
      <div className="card-3d">
        <div className="mb-3 relative">
          {/* Top highlight */}

          <Diagram />
        </div>
        <h3 className="text-white font-medium text-base mb-1 group-hover:text-[#0ea5e9] transition-colors">{topo.title}</h3>
        <p className="text-slate-400 text-xs">{topo.sub}</p>
      </div>
    </motion.div>
  );
}

export function UseCasePathGrid() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
      <UseCasePathCard variant="site-to-site" />
      <UseCasePathCard variant="branch-to-core" />
      <UseCasePathCard variant="cloud" />
      <UseCasePathCard variant="partner" />
    </div>
  );
}

