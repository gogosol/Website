"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Ban, Braces, Cable, ShieldCheck } from "lucide-react";
import { useState } from "react";
import styles from "@/app/home.module.css";

const modes = [
  {
    id: "mode-2",
    number: "01",
    short: "Mode 2",
    title: "Opaque wrap",
    description: "Gateway-to-gateway protection. The inner transport stream is restored unchanged at the far side.",
    detail: "TRANSPORT-AWARE · MUTUAL GATEWAY AUTH · FAIL-CLOSED",
    icon: Cable,
  },
  {
    id: "mode-1",
    number: "02",
    short: "Mode 1",
    title: "TLS mediation",
    description: "TLS-aware dual-leg mediation for destinations where a second QuantumHalon gateway is not available.",
    detail: "TLS-AWARE · CP-CUSTODY LEAVES · POLICY-BOUNDED",
    icon: Braces,
  },
  {
    id: "passthrough",
    number: "03",
    short: "Pass",
    title: "Explicit passthrough",
    description: "The packet-transparent exception. Traffic is relayed unmodified and the decision remains visible in policy.",
    detail: "EXPLICIT POLICY · METADATA TELEMETRY · NO SILENT CHANGE",
    icon: ShieldCheck,
  },
  {
    id: "block",
    number: "04",
    short: "Block",
    title: "Policy denial",
    description: "The connection stops at the enforcement point instead of drifting into an unapproved protection state.",
    detail: "DENY · AUDITABLE OUTCOME · NO FALLBACK",
    icon: Ban,
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
              <linearGradient id="dial-path" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0" stopColor="#5f5d68" stopOpacity="0.25" />
                <stop offset="0.46" stopColor="#9c8cff" stopOpacity="0.9" />
                <stop offset="1" stopColor="#c7bdff" stopOpacity="0.25" />
              </linearGradient>
              <radialGradient id="dial-core">
                <stop offset="0" stopColor="#e8e3ff" stopOpacity="0.9" />
                <stop offset="0.35" stopColor="#9c8cff" stopOpacity="0.32" />
                <stop offset="1" stopColor="#9c8cff" stopOpacity="0" />
              </radialGradient>
            </defs>
            <g className={styles.vizGrid}>
              <path d="M0 55H760M0 110H760M0 165H760M0 220H760" />
              <path d="M95 0V280M190 0V280M285 0V280M380 0V280M475 0V280M570 0V280M665 0V280" />
            </g>
            <path d="M62 140H698" className={styles.vizBase} />
            <motion.path
              key={`${mode.id}-path`}
              d={
                mode.id === "block"
                  ? "M62 140H344"
                  : mode.id === "mode-1"
                    ? "M62 140C176 140 246 140 318 140C350 140 350 92 380 92C410 92 410 188 442 188C512 188 582 140 698 140"
                    : mode.id === "mode-2"
                      ? "M62 140C178 140 215 88 310 88C350 88 350 192 380 192C410 192 410 88 450 88C545 88 582 140 698 140"
                      : "M62 140H698"
              }
              fill="none"
              stroke="url(#dial-path)"
              strokeWidth={mode.id === "mode-2" ? 2.2 : 1.5}
              strokeDasharray={mode.id === "passthrough" ? "7 9" : mode.id === "block" ? "0" : "4 7"}
              initial={reduceMotion ? false : { pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            />
            <circle cx="380" cy="140" r="92" fill="url(#dial-core)" opacity={mode.id === "block" ? 0.3 : 0.7} />
            <circle cx="380" cy="140" r="53" className={styles.vizRing} />
            <rect x="346" y="106" width="68" height="68" rx="14" className={styles.vizGate} />
            {mode.id === "block" ? (
              <g className={styles.blockGlyph}>
                <path d="M354 114L406 166M406 114L354 166" />
              </g>
            ) : (
              <g className={styles.gateGlyph}>
                <circle cx="380" cy="140" r="10" />
                <path d="M380 124V116M380 164V156M396 140H404M356 140H364" />
              </g>
            )}
            <text x="62" y="126" className={styles.vizText}>SOURCE</text>
            <text x="698" y="126" textAnchor="end" className={styles.vizText}>DESTINATION</text>
            <text x="380" y="218" textAnchor="middle" className={styles.vizText}>QUANTUMHALON GATEWAY</text>
          </svg>
        </div>

        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={mode.id}
            className={styles.modeCopy}
            initial={reduceMotion ? false : { opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduceMotion ? undefined : { opacity: 0, y: -8 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className={styles.modeIcon}><mode.icon aria-hidden="true" size={18} strokeWidth={1.5} /></div>
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
