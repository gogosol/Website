"use client";

import { useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { Lock, Shield, ArrowRight, Ban } from "lucide-react";
import styles from "../../app/home.module.css";

const modes = [
  {
    id: "mode-2",
    number: "01",
    title: "Opaque Wrap",
    short: "Mode 2",
    icon: Lock,
    description:
      "Enterprise traffic is encapsulated in a quantum-safe tunnel between ingress and egress gateways before traversing untrusted transit networks.",
    detail: "TRANSPORT-AWARE · MUTUAL GATEWAY AUTH · FAIL-CLOSED",
  },
  {
    id: "mode-1",
    number: "02",
    title: "TLS Mediation",
    short: "Mode 1",
    icon: Shield,
    description:
      "Legacy client connections are terminated and upgraded to post-quantum cipher suites on the external leg without modifying upstream application code.",
    detail: "DUAL-LEG POLICY · PER-ROUTE NEGOTIATION · CIPHER DOWNGRADE PROTECTION",
  },
  {
    id: "passthrough",
    number: "03",
    title: "Explicit Passthrough",
    short: "Mode 0",
    icon: ArrowRight,
    description:
      "Non-sensitive or low-risk traffic is relayed unmodified while telemetry logs the cryptographic inventory for compliance and audit evidence.",
    detail: "DISCOVERY LOGGING · ZERO-LATENCY OVERHEAD · AUDIT TRAIL",
  },
  {
    id: "block",
    number: "04",
    title: "Enforcement Denial",
    short: "Block",
    icon: Ban,
    description:
      "Connections failing cryptographic policy (such as deprecated cipher suites, expired certs, or unapproved key exchanges) are severed at the perimeter.",
    detail: "ZERO-TOLERANCE · AUDIT EVENT FIRED · RFC-COMPLIANT REJECTION",
  },
];

export function ProtectionDial() {
  const [selected, setSelected] = useState(0);
  const mode = modes[selected];
  const reduceMotion = useReducedMotion();

  return (
    <div className={styles.dialShell}>
      <div className={styles.modeRail} role="tablist" aria-label="QuantumHalon enforcement modes">
        {modes.map((item, index) => (
          <button
            type="button"
            key={item.id}
            className={styles.modeButton}
            data-active={selected === index}
            role="tab"
            aria-selected={selected === index}
            onClick={() => setSelected(index)}
          >
            <span>{item.number}</span>
            <span>{item.title}</span>
            <span className={styles.modeArrow} aria-hidden="true">↗</span>
          </button>
        ))}
      </div>

      <div className={styles.modeStage}>
        <div className={styles.modeStageHeader}>
          <span>POLICY OUTCOME / {mode.short.toUpperCase()}</span>
          <span className={styles.liveState}><i /> ACTIVE SELECTION</span>
        </div>

        <div className={styles.pathViz} aria-hidden="true">
          {/* Desktop & Tablet SVG (screens > 640px) */}
          <div className={styles.desktopViz}>
            <svg viewBox="0 0 760 260" preserveAspectRatio="xMidYMid meet">
              <defs>
                <linearGradient id="pqc-wrap-glow" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#2d8cf0" stopOpacity="0.12" />
                  <stop offset="50%" stopColor="#38bdf8" stopOpacity="0.22" />
                  <stop offset="100%" stopColor="#2d8cf0" stopOpacity="0.12" />
                </linearGradient>
                <linearGradient id="wire-glow-blue" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#2d8cf0" stopOpacity="0.3" />
                  <stop offset="50%" stopColor="#60a5fa" stopOpacity="1" />
                  <stop offset="100%" stopColor="#2d8cf0" stopOpacity="0.3" />
                </linearGradient>
                <linearGradient id="wire-glow-red" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#ef4444" stopOpacity="0.85" />
                  <stop offset="100%" stopColor="#ef4444" stopOpacity="0" />
                </linearGradient>
                <radialGradient id="gateway-core" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.25" />
                  <stop offset="100%" stopColor="#2d8cf0" stopOpacity="0.02" />
                </radialGradient>
              </defs>

              {/* Background Grid */}
              <g className={styles.vizGrid}>
                <path d="M0 52H760M0 104H760M0 156H760M0 208H760" />
                <path d="M95 0V260M190 0V260M285 0V260M380 0V260M475 0V260M570 0V260M665 0V260" />
              </g>

              {/* Base guide wire */}
              <path d="M50 130H710" className={styles.vizBase} />

              {/* SOURCE Node (Left) */}
              <g transform="translate(50, 130)">
                <rect x="-36" y="-28" width="72" height="56" rx="10" fill="rgba(10,10,13,0.85)" stroke="rgba(255,255,255,0.08)" strokeWidth="1" />
                <circle cx="0" cy="-6" r="4" fill="#60a5fa" opacity="0.8" />
                <text x="0" y="13" textAnchor="middle" fill="rgba(216,213,205,0.7)" fontSize="8" fontFamily="var(--mono)" fontWeight="500" letterSpacing="0.08em">SOURCE</text>
                <text x="0" y="21" textAnchor="middle" fill="rgba(216,213,205,0.3)" fontSize="6.5" fontFamily="var(--mono)">LAN / APP</text>
              </g>

              {/* DESTINATION Node (Right) */}
              <g transform="translate(710, 130)">
                <rect
                  x="-36"
                  y="-28"
                  width="72"
                  height="56"
                  rx="10"
                  fill="rgba(10,10,13,0.85)"
                  stroke={mode.id === "block" ? "rgba(239,68,68,0.2)" : "rgba(255,255,255,0.08)"}
                  strokeWidth="1"
                  opacity={mode.id === "block" ? 0.35 : 1}
                />
                <circle cx="0" cy="-6" r="4" fill={mode.id === "block" ? "#ef4444" : "#60a5fa"} opacity={mode.id === "block" ? 0.4 : 0.8} />
                <text x="0" y="13" textAnchor="middle" fill="rgba(216,213,205,0.7)" fontSize="8" fontFamily="var(--mono)" fontWeight="500" letterSpacing="0.08em">DEST</text>
                <text x="0" y="21" textAnchor="middle" fill="rgba(216,213,205,0.3)" fontSize="6.5" fontFamily="var(--mono)">WAN / CLOUD</text>
              </g>

              <AnimatePresence mode="wait">
                {/* MODE 2: OPAQUE WRAP */}
                {mode.id === "mode-2" && (
                  <motion.g
                    key="mode-2-diagram-desktop"
                    initial={reduceMotion ? false : { opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={reduceMotion ? undefined : { opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <line x1="86" y1="130" x2="190" y2="130" stroke="#38bdf8" strokeWidth="1.5" strokeDasharray="3 4" />

                    <rect x="220" y="78" width="320" height="104" rx="16" fill="url(#pqc-wrap-glow)" stroke="rgba(56,189,248,0.28)" strokeWidth="1" />
                    <rect x="226" y="84" width="308" height="92" rx="12" fill="none" stroke="rgba(56,189,248,0.15)" strokeDasharray="4 6" />
                    
                    <line x1="220" y1="130" x2="540" y2="130" stroke="url(#wire-glow-blue)" strokeWidth="2.5" />
                    <text x="380" y="105" textAnchor="middle" fill="#7dd3fc" fontSize="7.5" fontFamily="var(--mono)" fontWeight="600" letterSpacing="0.12em">
                      HYBRID PQC ENCRYPTED WRAP
                    </text>
                    <text x="380" y="117" textAnchor="middle" fill="rgba(147,197,253,0.55)" fontSize="5.5" fontFamily="var(--mono)" letterSpacing="0.08em">
                      [ ENCAPSULATED TRANSPORT STREAM ]
                    </text>
                    <text x="380" y="152" textAnchor="middle" fill="rgba(216,213,205,0.85)" fontSize="6.8" fontFamily="var(--mono)" fontWeight="500" letterSpacing="0.06em">
                      HYBRID PQC: X25519 + ML-KEM
                    </text>
                    <text x="380" y="164" textAnchor="middle" fill="rgba(216,213,205,0.6)" fontSize="6" fontFamily="var(--mono)" letterSpacing="0.05em">
                      DUAL-CERT AUTH: ECDSA + ML-DSA-65
                    </text>

                    {/* EGRESS GATEWAY */}
                    <g transform="translate(210, 130)">
                      <rect x="-42" y="-46" width="84" height="92" rx="14" fill="rgba(12,14,20,0.96)" stroke="rgba(56,189,248,0.45)" strokeWidth="1.2" />
                      <circle cx="0" cy="-18" r="10" fill="url(#gateway-core)" stroke="rgba(56,189,248,0.6)" strokeWidth="1" />
                      <path d="M-4 -18L0 -22L4 -18M0 -22V-14" fill="none" stroke="#7dd3fc" strokeWidth="1.2" strokeLinecap="round" />
                      <text x="0" y="3" textAnchor="middle" fill="#38bdf8" fontSize="8" fontFamily="var(--mono)" fontWeight="600" letterSpacing="0.12em">EGRESS</text>
                      <text x="0" y="15" textAnchor="middle" fill="rgba(255,255,255,0.9)" fontSize="7" fontFamily="var(--mono)" fontWeight="500">WRAP</text>
                      <text x="0" y="26" textAnchor="middle" fill="rgba(216,213,205,0.45)" fontSize="5.5" fontFamily="var(--mono)">ENCAPSULATE</text>
                    </g>

                    {/* INGRESS GATEWAY */}
                    <g transform="translate(550, 130)">
                      <rect x="-42" y="-46" width="84" height="92" rx="14" fill="rgba(12,14,20,0.96)" stroke="rgba(56,189,248,0.45)" strokeWidth="1.2" />
                      <circle cx="0" cy="-18" r="10" fill="url(#gateway-core)" stroke="rgba(56,189,248,0.6)" strokeWidth="1" />
                      <path d="M-4 -18L0 -14L4 -18M0 -14V-22" fill="none" stroke="#7dd3fc" strokeWidth="1.2" strokeLinecap="round" />
                      <text x="0" y="3" textAnchor="middle" fill="#38bdf8" fontSize="8" fontFamily="var(--mono)" fontWeight="600" letterSpacing="0.12em">INGRESS</text>
                      <text x="0" y="15" textAnchor="middle" fill="rgba(255,255,255,0.9)" fontSize="7" fontFamily="var(--mono)" fontWeight="500">UNWRAP</text>
                      <text x="0" y="26" textAnchor="middle" fill="rgba(216,213,205,0.45)" fontSize="5.5" fontFamily="var(--mono)">RESTORE</text>
                    </g>

                    <line x1="592" y1="130" x2="674" y2="130" stroke="#38bdf8" strokeWidth="1.5" strokeDasharray="3 4" />
                  </motion.g>
                )}

                {/* MODE 1: TLS MEDIATION */}
                {mode.id === "mode-1" && (
                  <motion.g
                    key="mode-1-diagram-desktop"
                    initial={reduceMotion ? false : { opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={reduceMotion ? undefined : { opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <line x1="86" y1="130" x2="330" y2="130" stroke="#60a5fa" strokeWidth="1.8" strokeDasharray="4 4" />
                    <rect x="162" y="92" width="100" height="24" rx="6" fill="rgba(96,165,250,0.08)" stroke="rgba(96,165,250,0.3)" strokeWidth="1" />
                    <text x="212" y="107" textAnchor="middle" fill="#93c5fd" fontSize="7" fontFamily="var(--mono)" fontWeight="500" letterSpacing="0.08em">CLIENT LEG</text>

                    {/* Central Mediation Gateway */}
                    <g transform="translate(380, 130)">
                      <circle cx="0" cy="0" r="54" fill="none" stroke="rgba(251,191,36,0.18)" strokeDasharray="3 5" />
                      <rect x="-48" y="-48" width="96" height="96" rx="15" fill="rgba(12,14,20,0.96)" stroke="rgba(251,191,36,0.5)" strokeWidth="1.2" />
                      <circle cx="0" cy="-18" r="11" fill="rgba(251,191,36,0.12)" stroke="rgba(251,191,36,0.6)" strokeWidth="1" />
                      <path d="M-5 -18H5M0 -23V-13" fill="none" stroke="#fde68a" strokeWidth="1.2" strokeLinecap="round" />
                      <text x="0" y="3" textAnchor="middle" fill="#fbbf24" fontSize="8" fontFamily="var(--mono)" fontWeight="600" letterSpacing="0.1em">MEDIATION</text>
                      <text x="0" y="15" textAnchor="middle" fill="rgba(255,255,255,0.9)" fontSize="7" fontFamily="var(--mono)" fontWeight="500">DUAL-LEG</text>
                      <text x="0" y="26" textAnchor="middle" fill="rgba(216,213,205,0.45)" fontSize="5.5" fontFamily="var(--mono)">HANDSHAKE VERIFY</text>
                    </g>

                    <line x1="430" y1="130" x2="674" y2="130" stroke="#fbbf24" strokeWidth="2" />
                    <rect x="475" y="92" width="145" height="24" rx="6" fill="rgba(251,191,36,0.08)" stroke="rgba(251,191,36,0.3)" strokeWidth="1" />
                    <text x="547" y="107" textAnchor="middle" fill="#fcd34d" fontSize="7" fontFamily="var(--mono)" fontWeight="500" letterSpacing="0.08em">SERVER LEG (HYBRID PQC)</text>
                  </motion.g>
                )}

                {/* PASSTHROUGH */}
                {mode.id === "passthrough" && (
                  <motion.g
                    key="passthrough-diagram-desktop"
                    initial={reduceMotion ? false : { opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={reduceMotion ? undefined : { opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <line x1="86" y1="130" x2="674" y2="130" stroke="#4ade80" strokeWidth="1.8" strokeDasharray="6 6" />

                    <g transform="translate(380, 130)">
                      <circle cx="0" cy="0" r="54" fill="none" stroke="rgba(74,222,128,0.2)" strokeWidth="1" strokeDasharray="2 4" />
                      <rect x="-46" y="-46" width="92" height="92" rx="15" fill="rgba(12,14,20,0.94)" stroke="rgba(74,222,128,0.45)" strokeWidth="1.2" />
                      <circle cx="0" cy="-16" r="10" fill="rgba(74,222,128,0.12)" stroke="rgba(74,222,128,0.6)" strokeWidth="1" />
                      <path d="M-4 -16H4" fill="none" stroke="#bbf7d0" strokeWidth="1.5" strokeLinecap="round" />
                      <text x="0" y="3" textAnchor="middle" fill="#4ade80" fontSize="8" fontFamily="var(--mono)" fontWeight="600" letterSpacing="0.1em">PASSTHROUGH</text>
                      <text x="0" y="15" textAnchor="middle" fill="rgba(255,255,255,0.9)" fontSize="7" fontFamily="var(--mono)" fontWeight="500">TRANSPARENT</text>
                      <text x="0" y="26" textAnchor="middle" fill="rgba(216,213,205,0.45)" fontSize="5.5" fontFamily="var(--mono)">TELEMETRY LOGGED</text>
                    </g>

                    <rect x="280" y="196" width="200" height="22" rx="6" fill="rgba(74,222,128,0.06)" stroke="rgba(74,222,128,0.2)" strokeWidth="1" />
                    <text x="380" y="210" textAnchor="middle" fill="#86efac" fontSize="6.5" fontFamily="var(--mono)" fontWeight="500" letterSpacing="0.1em">
                      EXPLICIT POLICY EXCEPTION RECORDED
                    </text>
                  </motion.g>
                )}

                {/* BLOCK */}
                {mode.id === "block" && (
                  <motion.g
                    key="block-diagram-desktop"
                    initial={reduceMotion ? false : { opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={reduceMotion ? undefined : { opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <line x1="86" y1="130" x2="330" y2="130" stroke="url(#wire-glow-red)" strokeWidth="2" />
                    <line x1="430" y1="130" x2="674" y2="130" stroke="rgba(255,255,255,0.05)" strokeWidth="1" strokeDasharray="3 6" />

                    <g transform="translate(380, 130)">
                      <circle cx="0" cy="0" r="54" fill="rgba(239,68,68,0.04)" stroke="rgba(239,68,68,0.25)" strokeWidth="1" />
                      <rect x="-46" y="-46" width="92" height="92" rx="15" fill="rgba(15,10,12,0.96)" stroke="rgba(239,68,68,0.6)" strokeWidth="1.4" />
                      <circle cx="0" cy="-16" r="10" fill="rgba(239,68,68,0.15)" stroke="rgba(239,68,68,0.7)" strokeWidth="1.2" />
                      <path d="M-4 -20L4 -12M4 -20L-4 -12" stroke="#fca5a5" strokeWidth="1.6" strokeLinecap="round" />
                      <text x="0" y="3" textAnchor="middle" fill="#ef4444" fontSize="8" fontFamily="var(--mono)" fontWeight="600" letterSpacing="0.1em">DENIAL</text>
                      <text x="0" y="15" textAnchor="middle" fill="rgba(255,255,255,0.9)" fontSize="7" fontFamily="var(--mono)" fontWeight="500">FAIL-CLOSED</text>
                      <text x="0" y="26" textAnchor="middle" fill="rgba(216,213,205,0.45)" fontSize="5.5" fontFamily="var(--mono)">NON-COMPLIANT STOP</text>
                    </g>

                    <rect x="280" y="196" width="200" height="22" rx="6" fill="rgba(239,68,68,0.08)" stroke="rgba(239,68,68,0.3)" strokeWidth="1" />
                    <text x="380" y="210" textAnchor="middle" fill="#f87171" fontSize="6.5" fontFamily="var(--mono)" fontWeight="500" letterSpacing="0.1em">
                      PACKET PATH SEVERED AT BOUNDARY
                    </text>
                  </motion.g>
                )}
              </AnimatePresence>
            </svg>
          </div>

          {/* Mobile-Optimized SVG (screens <= 640px) */}
          <div className={styles.mobileViz}>
            <svg viewBox="0 0 340 180" preserveAspectRatio="xMidYMid meet">
              <defs>
                <linearGradient id="mob-wire-blue" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#2d8cf0" stopOpacity="0.4" />
                  <stop offset="50%" stopColor="#60a5fa" stopOpacity="1" />
                  <stop offset="100%" stopColor="#2d8cf0" stopOpacity="0.4" />
                </linearGradient>
              </defs>

              {/* Base guide wire */}
              <path d="M20 90H320" stroke="rgba(255,255,255,0.08)" strokeWidth="1" />

              {/* Source Endpoint (Left) */}
              <g transform="translate(26, 90)">
                <rect x="-20" y="-18" width="40" height="36" rx="6" fill="rgba(10,10,13,0.9)" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
                <circle cx="0" cy="-4" r="3" fill="#60a5fa" />
                <text x="0" y="10" textAnchor="middle" fill="rgba(216,213,205,0.7)" fontSize="6" fontFamily="var(--mono)" fontWeight="500">LAN</text>
              </g>

              {/* Destination Endpoint (Right) */}
              <g transform="translate(314, 90)">
                <rect x="-20" y="-18" width="40" height="36" rx="6" fill="rgba(10,10,13,0.9)" stroke="rgba(255,255,255,0.1)" strokeWidth="1" opacity={mode.id === "block" ? 0.35 : 1} />
                <circle cx="0" cy="-4" r="3" fill={mode.id === "block" ? "#ef4444" : "#60a5fa"} />
                <text x="0" y="10" textAnchor="middle" fill="rgba(216,213,205,0.7)" fontSize="6" fontFamily="var(--mono)" fontWeight="500">WAN</text>
              </g>

              <AnimatePresence mode="wait">
                {/* Mobile Mode 2: Opaque Wrap */}
                {mode.id === "mode-2" && (
                  <motion.g
                    key="mob-mode-2"
                    initial={reduceMotion ? false : { opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={reduceMotion ? undefined : { opacity: 0 }}
                    transition={{ duration: 0.25 }}
                  >
                    <rect x="92" y="46" width="156" height="88" rx="10" fill="rgba(45,140,240,0.1)" stroke="rgba(56,189,248,0.35)" strokeWidth="1" />
                    <line x1="92" y1="90" x2="248" y2="90" stroke="url(#mob-wire-blue)" strokeWidth="2.5" />
                    
                    <text x="170" y="66" textAnchor="middle" fill="#7dd3fc" fontSize="7.5" fontFamily="var(--mono)" fontWeight="600" letterSpacing="0.08em">
                      HYBRID PQC WRAP
                    </text>
                    <text x="170" y="120" textAnchor="middle" fill="rgba(216,213,205,0.7)" fontSize="6.5" fontFamily="var(--mono)">
                      ML-KEM-768 + ML-DSA
                    </text>

                    {/* Egress Node */}
                    <g transform="translate(86, 90)">
                      <rect x="-24" y="-28" width="48" height="56" rx="8" fill="rgba(12,14,20,0.98)" stroke="#38bdf8" strokeWidth="1.2" />
                      <text x="0" y="-3" textAnchor="middle" fill="#38bdf8" fontSize="7.5" fontFamily="var(--mono)" fontWeight="600">EGRESS</text>
                      <text x="0" y="9" textAnchor="middle" fill="#ffffff" fontSize="6.5" fontFamily="var(--mono)">WRAP</text>
                    </g>

                    {/* Ingress Node */}
                    <g transform="translate(254, 90)">
                      <rect x="-24" y="-28" width="48" height="56" rx="8" fill="rgba(12,14,20,0.98)" stroke="#38bdf8" strokeWidth="1.2" />
                      <text x="0" y="-3" textAnchor="middle" fill="#38bdf8" fontSize="7.5" fontFamily="var(--mono)" fontWeight="600">INGRESS</text>
                      <text x="0" y="9" textAnchor="middle" fill="#ffffff" fontSize="6.5" fontFamily="var(--mono)">RESTORE</text>
                    </g>
                  </motion.g>
                )}

                {/* Mobile Mode 1: TLS Mediation */}
                {mode.id === "mode-1" && (
                  <motion.g
                    key="mob-mode-1"
                    initial={reduceMotion ? false : { opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={reduceMotion ? undefined : { opacity: 0 }}
                    transition={{ duration: 0.25 }}
                  >
                    <line x1="46" y1="90" x2="140" y2="90" stroke="#60a5fa" strokeWidth="1.5" strokeDasharray="3 3" />
                    <text x="92" y="78" textAnchor="middle" fill="#93c5fd" fontSize="6.5" fontFamily="var(--mono)">CLIENT LEG</text>

                    <g transform="translate(170, 90)">
                      <rect x="-34" y="-34" width="68" height="68" rx="10" fill="rgba(12,14,20,0.98)" stroke="#fbbf24" strokeWidth="1.2" />
                      <circle cx="0" cy="-10" r="7" fill="rgba(251,191,36,0.15)" stroke="#fbbf24" strokeWidth="1" />
                      <text x="0" y="9" textAnchor="middle" fill="#fbbf24" fontSize="7.5" fontFamily="var(--mono)" fontWeight="600">MEDIATION</text>
                      <text x="0" y="21" textAnchor="middle" fill="rgba(216,213,205,0.7)" fontSize="6" fontFamily="var(--mono)">DUAL-LEG</text>
                    </g>

                    <line x1="204" y1="90" x2="294" y2="90" stroke="#fbbf24" strokeWidth="2" />
                    <text x="250" y="78" textAnchor="middle" fill="#fcd34d" fontSize="6.5" fontFamily="var(--mono)">SERVER LEG</text>
                    <text x="170" y="148" textAnchor="middle" fill="rgba(251,191,36,0.85)" fontSize="6.5" fontFamily="var(--mono)">
                      PQC UPGRADE AT CHOKEPOINT
                    </text>
                  </motion.g>
                )}

                {/* Mobile Passthrough */}
                {mode.id === "mob-passthrough" || (mode.id === "passthrough" && (
                  <motion.g
                    key="mob-passthrough"
                    initial={reduceMotion ? false : { opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={reduceMotion ? undefined : { opacity: 0 }}
                    transition={{ duration: 0.25 }}
                  >
                    <line x1="46" y1="90" x2="294" y2="90" stroke="#4ade80" strokeWidth="1.8" strokeDasharray="5 5" />

                    <g transform="translate(170, 90)">
                      <rect x="-34" y="-34" width="68" height="68" rx="10" fill="rgba(12,14,20,0.96)" stroke="#4ade80" strokeWidth="1.2" />
                      <circle cx="0" cy="-10" r="7" fill="rgba(74,222,128,0.15)" stroke="#4ade80" strokeWidth="1" />
                      <text x="0" y="9" textAnchor="middle" fill="#4ade80" fontSize="7.5" fontFamily="var(--mono)" fontWeight="600">PASSTHROUGH</text>
                      <text x="0" y="21" textAnchor="middle" fill="rgba(216,213,205,0.7)" fontSize="6" fontFamily="var(--mono)">TRANSPARENT</text>
                    </g>

                    <text x="170" y="148" textAnchor="middle" fill="#86efac" fontSize="6.5" fontFamily="var(--mono)">
                      LOGGED FOR AUDIT EVIDENCE
                    </text>
                  </motion.g>
                ))}

                {/* Mobile Block */}
                {mode.id === "block" && (
                  <motion.g
                    key="mob-block"
                    initial={reduceMotion ? false : { opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={reduceMotion ? undefined : { opacity: 0 }}
                    transition={{ duration: 0.25 }}
                  >
                    <line x1="46" y1="90" x2="136" y2="90" stroke="#ef4444" strokeWidth="2" />
                    <line x1="204" y1="90" x2="294" y2="90" stroke="rgba(255,255,255,0.06)" strokeWidth="1" strokeDasharray="3 4" />

                    <g transform="translate(170, 90)">
                      <rect x="-34" y="-34" width="68" height="68" rx="10" fill="rgba(18,10,12,0.98)" stroke="#ef4444" strokeWidth="1.3" />
                      <circle cx="0" cy="-10" r="7" fill="rgba(239,68,68,0.15)" stroke="#ef4444" strokeWidth="1" />
                      <path d="M-3 -13L3 -7M3 -13L-3 -7" stroke="#fca5a5" strokeWidth="1.4" strokeLinecap="round" />
                      <text x="0" y="9" textAnchor="middle" fill="#ef4444" fontSize="7.5" fontFamily="var(--mono)" fontWeight="600">DENIAL</text>
                      <text x="0" y="21" textAnchor="middle" fill="rgba(216,213,205,0.7)" fontSize="6" fontFamily="var(--mono)">FAIL-CLOSED</text>
                    </g>

                    <text x="170" y="148" textAnchor="middle" fill="#f87171" fontSize="6.5" fontFamily="var(--mono)">
                      NON-COMPLIANT PACKET SEVERED
                    </text>
                  </motion.g>
                )}
              </AnimatePresence>
            </svg>
          </div>
        </div>

        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={mode.id}
            className={styles.modeCopy}
            initial={reduceMotion ? false : { opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduceMotion ? undefined : { opacity: 0, y: -6 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className={styles.modeIcon} data-mode={mode.id}>
              <mode.icon aria-hidden="true" size={18} strokeWidth={1.5} />
            </div>
            <div>
              <h3>{mode.title}</h3>
              <p>{mode.description}</p>
            </div>
          </motion.div>
        </AnimatePresence>
        <div className={styles.modeDetail}>{mode.detail}</div>
      </div>
    </div>
  );
}
