"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Layers, ShieldBan, Split, Waypoints } from "lucide-react";
import { useState } from "react";
import styles from "@/app/home.module.css";

interface ModeItem {
  id: "mode-2" | "mode-1" | "passthrough" | "block";
  number: string;
  short: string;
  title: string;
  description: string;
  detail: string;
  icon: typeof Layers;
}

const modes: ModeItem[] = [
  {
    id: "mode-2",
    number: "01",
    short: "Mode 2",
    title: "Opaque wrap",
    description: "Gateway-to-gateway protection. The inner transport stream is encapsulated on egress and restored unchanged at the ingress gateway.",
    detail: "TRANSPORT-AWARE · MUTUAL GATEWAY AUTH · FAIL-CLOSED",
    icon: Layers,
  },
  {
    id: "mode-1",
    number: "02",
    short: "Mode 1",
    title: "TLS mediation",
    description: "TLS-aware dual-leg mediation for destinations where a second QuantumHalon gateway is not available.",
    detail: "TLS-AWARE · CP-CUSTODY LEAVES · POLICY-BOUNDED",
    icon: Split,
  },
  {
    id: "passthrough",
    number: "03",
    short: "Pass",
    title: "Explicit passthrough",
    description: "The packet-transparent exception. Traffic is relayed unmodified and the decision remains visible in policy.",
    detail: "EXPLICIT POLICY · METADATA TELEMETRY · NO SILENT CHANGE",
    icon: Waypoints,
  },
  {
    id: "block",
    number: "04",
    short: "Block",
    title: "Policy denial",
    description: "The connection stops at the enforcement point instead of drifting into an unapproved protection state.",
    detail: "DENY · AUDITABLE OUTCOME · NO FALLBACK",
    icon: ShieldBan,
  },
];

export function ProtectionDial() {
  const [selected, setSelected] = useState(0);
  const mode = modes[selected];
  const reduceMotion = useReducedMotion();

  return (
    <div className={styles.dialShell}>
      <div className={styles.modeRail} aria-label="QuantumHalon enforcement modes">
        {modes.map((item, index) => (
          <button
            type="button"
            key={item.id}
            className={styles.modeButton}
            data-active={selected === index}
            aria-pressed={selected === index}
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
          <svg viewBox="0 0 760 280" preserveAspectRatio="xMidYMid meet">
            <defs>
              <linearGradient id="pqc-tunnel-glow" x1="0" y1="0" x2="1" y2="0">
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
              <path d="M0 56H760M0 112H760M0 168H760M0 224H760" />
              <path d="M95 0V280M190 0V280M285 0V280M380 0V280M475 0V280M570 0V280M665 0V280" />
            </g>

            {/* Base guide wire */}
            <path d="M50 140H710" className={styles.vizBase} />

            {/* SOURCE Node (Left) */}
            <g transform="translate(50, 140)">
              <rect x="-36" y="-30" width="72" height="60" rx="10" fill="rgba(10,10,13,0.85)" stroke="rgba(255,255,255,0.08)" strokeWidth="1" />
              <circle cx="0" cy="-6" r="4" fill="#60a5fa" opacity="0.8" />
              <text x="0" y="14" textAnchor="middle" fill="rgba(216,213,205,0.7)" fontSize="8" fontFamily="var(--mono)" fontWeight="500" letterSpacing="0.08em">SOURCE</text>
              <text x="0" y="23" textAnchor="middle" fill="rgba(216,213,205,0.3)" fontSize="6.5" fontFamily="var(--mono)">LAN / APP</text>
            </g>

            {/* DESTINATION Node (Right) */}
            <g transform="translate(710, 140)">
              <rect
                x="-36"
                y="-30"
                width="72"
                height="60"
                rx="10"
                fill="rgba(10,10,13,0.85)"
                stroke={mode.id === "block" ? "rgba(239,68,68,0.2)" : "rgba(255,255,255,0.08)"}
                strokeWidth="1"
                opacity={mode.id === "block" ? 0.35 : 1}
              />
              <circle cx="0" cy="-6" r="4" fill={mode.id === "block" ? "#ef4444" : "#60a5fa"} opacity={mode.id === "block" ? 0.4 : 0.8} />
              <text x="0" y="14" textAnchor="middle" fill="rgba(216,213,205,0.7)" fontSize="8" fontFamily="var(--mono)" fontWeight="500" letterSpacing="0.08em">DEST</text>
              <text x="0" y="23" textAnchor="middle" fill="rgba(216,213,205,0.3)" fontSize="6.5" fontFamily="var(--mono)">WAN / CLOUD</text>
            </g>

            <AnimatePresence mode="wait">
              {/* ─────────────────────────────────────────────────────────────
                  MODE 2: OPAQUE WRAP
                  Left Gateway = EGRESS (Wrap / Encapsulate)
                  Right Gateway = INGRESS (Unwrap / Restore)
              ───────────────────────────────────────────────────────────── */}
              {mode.id === "mode-2" && (
                <motion.g
                  key="mode-2-diagram"
                  initial={reduceMotion ? false : { opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={reduceMotion ? undefined : { opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <line x1="86" y1="140" x2="190" y2="140" stroke="#38bdf8" strokeWidth="1.5" strokeDasharray="3 4" />

                  {/* Encapsulated PQC Wrap Container */}
                  <rect x="220" y="85" width="320" height="110" rx="16" fill="url(#pqc-wrap-glow)" stroke="rgba(56,189,248,0.28)" strokeWidth="1" />
                  <rect x="226" y="91" width="308" height="98" rx="12" fill="none" stroke="rgba(56,189,248,0.15)" strokeDasharray="4 6" />
                  
                  {/* Encapsulated Wrap Stream & Badges */}
                  <line x1="220" y1="140" x2="540" y2="140" stroke="url(#wire-glow-blue)" strokeWidth="2.5" />
                  <text x="380" y="114" textAnchor="middle" fill="#7dd3fc" fontSize="8" fontFamily="var(--mono)" fontWeight="600" letterSpacing="0.14em">
                    HYBRID PQC ENCRYPTED WRAP
                  </text>
                  <text x="380" y="130" textAnchor="middle" fill="rgba(147,197,253,0.55)" fontSize="5.5" fontFamily="var(--mono)" letterSpacing="0.1em">
                    [ ENCAPSULATED TRANSPORT STREAM ]
                  </text>
                  <text x="380" y="168" textAnchor="middle" fill="rgba(216,213,205,0.7)" fontSize="6.2" fontFamily="var(--mono)" letterSpacing="0.05em">
                    HYBRID PQC (X25519 + ML-KEM) · DUAL-CERT AUTH (ECDSA + ML-DSA-65)
                  </text>

                  {/* LEFT GATEWAY: EGRESS (WRAP / ENCAPSULATE) */}
                  <g transform="translate(210, 140)">
                    <rect x="-42" y="-48" width="84" height="96" rx="14" fill="rgba(12,14,20,0.96)" stroke="rgba(56,189,248,0.45)" strokeWidth="1.2" />
                    <circle cx="0" cy="-20" r="11" fill="url(#gateway-core)" stroke="rgba(56,189,248,0.6)" strokeWidth="1" />
                    <path d="M-4 -20L0 -24L4 -20M0 -24V-16" fill="none" stroke="#7dd3fc" strokeWidth="1.2" strokeLinecap="round" />
                    <text x="0" y="2" textAnchor="middle" fill="#38bdf8" fontSize="8" fontFamily="var(--mono)" fontWeight="600" letterSpacing="0.12em">EGRESS</text>
                    <text x="0" y="15" textAnchor="middle" fill="rgba(255,255,255,0.9)" fontSize="7" fontFamily="var(--mono)" fontWeight="500">WRAP</text>
                    <text x="0" y="27" textAnchor="middle" fill="rgba(216,213,205,0.45)" fontSize="5.5" fontFamily="var(--mono)">ENCAPSULATE</text>
                  </g>

                  {/* RIGHT GATEWAY: INGRESS (UNWRAP / RESTORE) */}
                  <g transform="translate(550, 140)">
                    <rect x="-42" y="-48" width="84" height="96" rx="14" fill="rgba(12,14,20,0.96)" stroke="rgba(56,189,248,0.45)" strokeWidth="1.2" />
                    <circle cx="0" cy="-20" r="11" fill="url(#gateway-core)" stroke="rgba(56,189,248,0.6)" strokeWidth="1" />
                    <path d="M-4 -20L0 -16L4 -20M0 -16V-24" fill="none" stroke="#7dd3fc" strokeWidth="1.2" strokeLinecap="round" />
                    <text x="0" y="2" textAnchor="middle" fill="#38bdf8" fontSize="8" fontFamily="var(--mono)" fontWeight="600" letterSpacing="0.12em">INGRESS</text>
                    <text x="0" y="15" textAnchor="middle" fill="rgba(255,255,255,0.9)" fontSize="7" fontFamily="var(--mono)" fontWeight="500">UNWRAP</text>
                    <text x="0" y="27" textAnchor="middle" fill="rgba(216,213,205,0.45)" fontSize="5.5" fontFamily="var(--mono)">RESTORE</text>
                  </g>

                  <line x1="592" y1="140" x2="674" y2="140" stroke="#38bdf8" strokeWidth="1.5" strokeDasharray="3 4" />
                </motion.g>
              )}

              {/* ─────────────────────────────────────────────────────────────
                  MODE 1: TLS MEDIATION
              ───────────────────────────────────────────────────────────── */}
              {mode.id === "mode-1" && (
                <motion.g
                  key="mode-1-diagram"
                  initial={reduceMotion ? false : { opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={reduceMotion ? undefined : { opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <line x1="86" y1="140" x2="330" y2="140" stroke="#60a5fa" strokeWidth="1.8" strokeDasharray="4 4" />
                  <rect x="162" y="100" width="100" height="25" rx="6" fill="rgba(96,165,250,0.08)" stroke="rgba(96,165,250,0.3)" strokeWidth="1" />
                  <text x="212" y="116" textAnchor="middle" fill="#93c5fd" fontSize="7" fontFamily="var(--mono)" fontWeight="500" letterSpacing="0.08em">CLIENT LEG</text>

                  {/* Central Mediation Gateway */}
                  <g transform="translate(380, 140)">
                    <circle cx="0" cy="0" r="56" fill="none" stroke="rgba(251,191,36,0.18)" strokeDasharray="3 5" />
                    <rect x="-50" y="-50" width="100" height="100" rx="15" fill="rgba(12,14,20,0.96)" stroke="rgba(251,191,36,0.5)" strokeWidth="1.2" />
                    <circle cx="0" cy="-20" r="12" fill="rgba(251,191,36,0.12)" stroke="rgba(251,191,36,0.6)" strokeWidth="1" />
                    <path d="M-6 -20H6M0 -26V-14" fill="none" stroke="#fde68a" strokeWidth="1.2" strokeLinecap="round" />
                    <text x="0" y="2" textAnchor="middle" fill="#fbbf24" fontSize="8" fontFamily="var(--mono)" fontWeight="600" letterSpacing="0.1em">MEDIATION</text>
                    <text x="0" y="15" textAnchor="middle" fill="rgba(255,255,255,0.9)" fontSize="7" fontFamily="var(--mono)" fontWeight="500">DUAL-LEG</text>
                    <text x="0" y="27" textAnchor="middle" fill="rgba(216,213,205,0.45)" fontSize="5.5" fontFamily="var(--mono)">HANDSHAKE VERIFY</text>
                  </g>

                  <line x1="430" y1="140" x2="674" y2="140" stroke="#fbbf24" strokeWidth="2" />
                  <rect x="475" y="100" width="145" height="25" rx="6" fill="rgba(251,191,36,0.08)" stroke="rgba(251,191,36,0.3)" strokeWidth="1" />
                  <text x="547" y="116" textAnchor="middle" fill="#fcd34d" fontSize="7" fontFamily="var(--mono)" fontWeight="500" letterSpacing="0.08em">SERVER LEG (HYBRID PQC)</text>
                </motion.g>
              )}

              {/* ─────────────────────────────────────────────────────────────
                  PASSTHROUGH
              ───────────────────────────────────────────────────────────── */}
              {mode.id === "passthrough" && (
                <motion.g
                  key="passthrough-diagram"
                  initial={reduceMotion ? false : { opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={reduceMotion ? undefined : { opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <line x1="86" y1="140" x2="674" y2="140" stroke="#4ade80" strokeWidth="1.8" strokeDasharray="6 6" />

                  {/* Monitoring Halo at Center Gateway */}
                  <g transform="translate(380, 140)">
                    <circle cx="0" cy="0" r="56" fill="none" stroke="rgba(74,222,128,0.2)" strokeWidth="1" strokeDasharray="2 4" />
                    <rect x="-48" y="-48" width="96" height="96" rx="15" fill="rgba(12,14,20,0.94)" stroke="rgba(74,222,128,0.45)" strokeWidth="1.2" />
                    <circle cx="0" cy="-18" r="10" fill="rgba(74,222,128,0.12)" stroke="rgba(74,222,128,0.6)" strokeWidth="1" />
                    <path d="M-4 -18H4" fill="none" stroke="#bbf7d0" strokeWidth="1.5" strokeLinecap="round" />
                    <text x="0" y="3" textAnchor="middle" fill="#4ade80" fontSize="8" fontFamily="var(--mono)" fontWeight="600" letterSpacing="0.1em">PASSTHROUGH</text>
                    <text x="0" y="16" textAnchor="middle" fill="rgba(255,255,255,0.9)" fontSize="7" fontFamily="var(--mono)" fontWeight="500">TRANSPARENT</text>
                    <text x="0" y="27" textAnchor="middle" fill="rgba(216,213,205,0.45)" fontSize="5.5" fontFamily="var(--mono)">TELEMETRY LOGGED</text>
                  </g>

                  <rect x="280" y="210" width="200" height="24" rx="6" fill="rgba(74,222,128,0.06)" stroke="rgba(74,222,128,0.2)" strokeWidth="1" />
                  <text x="380" y="225" textAnchor="middle" fill="#86efac" fontSize="6.5" fontFamily="var(--mono)" fontWeight="500" letterSpacing="0.1em">
                    EXPLICIT POLICY EXCEPTION RECORDED
                  </text>
                </motion.g>
              )}

              {/* ─────────────────────────────────────────────────────────────
                  BLOCK
              ───────────────────────────────────────────────────────────── */}
              {mode.id === "block" && (
                <motion.g
                  key="block-diagram"
                  initial={reduceMotion ? false : { opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={reduceMotion ? undefined : { opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <line x1="86" y1="140" x2="330" y2="140" stroke="url(#wire-glow-red)" strokeWidth="2" />
                  <line x1="430" y1="140" x2="674" y2="140" stroke="rgba(255,255,255,0.05)" strokeWidth="1" strokeDasharray="3 6" />

                  {/* Enforcement Barrier Gateway */}
                  <g transform="translate(380, 140)">
                    <circle cx="0" cy="0" r="56" fill="rgba(239,68,68,0.04)" stroke="rgba(239,68,68,0.25)" strokeWidth="1" />
                    <rect x="-48" y="-48" width="96" height="96" rx="15" fill="rgba(15,10,12,0.96)" stroke="rgba(239,68,68,0.6)" strokeWidth="1.4" />
                    <circle cx="0" cy="-18" r="11" fill="rgba(239,68,68,0.15)" stroke="rgba(239,68,68,0.7)" strokeWidth="1.2" />
                    <path d="M-4 -22L4 -14M4 -22L-4 -14" stroke="#fca5a5" strokeWidth="1.6" strokeLinecap="round" />
                    <text x="0" y="3" textAnchor="middle" fill="#ef4444" fontSize="8" fontFamily="var(--mono)" fontWeight="600" letterSpacing="0.1em">DENIAL</text>
                    <text x="0" y="16" textAnchor="middle" fill="rgba(255,255,255,0.9)" fontSize="7" fontFamily="var(--mono)" fontWeight="500">FAIL-CLOSED</text>
                    <text x="0" y="27" textAnchor="middle" fill="rgba(216,213,205,0.45)" fontSize="5.5" fontFamily="var(--mono)">NON-COMPLIANT STOP</text>
                  </g>

                  <rect x="280" y="210" width="200" height="24" rx="6" fill="rgba(239,68,68,0.08)" stroke="rgba(239,68,68,0.3)" strokeWidth="1" />
                  <text x="380" y="225" textAnchor="middle" fill="#f87171" fontSize="6.5" fontFamily="var(--mono)" fontWeight="500" letterSpacing="0.1em">
                    PACKET PATH SEVERED AT BOUNDARY
                  </text>
                </motion.g>
              )}
            </AnimatePresence>
          </svg>
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
