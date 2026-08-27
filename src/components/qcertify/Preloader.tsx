"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import styles from "./Preloader.module.css";

const statusSteps = [
  { threshold: 25, label: "CALIBRATING HYBRID PQC (ML-KEM-768)..." },
  { threshold: 55, label: "VERIFYING DUAL-CERT CATALYST..." },
  { threshold: 80, label: "ENFORCING FAIL-CLOSED RUNTIME..." },
  { threshold: 99, label: "FINALIZING SECURITY BOUNDARIES..." },
  { threshold: 100, label: "POST-QUANTUM CORES ACTIVE" },
];

export function Preloader() {
  const [progress, setProgress] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    // Check if user prefers reduced motion
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) {
      setVisible(false);
      return;
    }

    // Prevent body scroll during intro loading sequence
    document.body.style.overflow = "hidden";

    let current = 0;
    const interval = setInterval(() => {
      // Accelerating progress curve
      const step = current < 40 ? Math.random() * 8 + 4 : current < 80 ? Math.random() * 12 + 6 : Math.random() * 16 + 8;
      current = Math.min(100, Math.round(current + step));
      setProgress(current);

      if (current >= 100) {
        clearInterval(interval);
        setTimeout(() => {
          setVisible(false);
          document.body.style.overflow = "";
        }, 320);
      }
    }, 45);

    // Hard fallback timeout: never block longer than 1.8 seconds
    const safetyTimer = setTimeout(() => {
      setProgress(100);
      setTimeout(() => {
        setVisible(false);
        document.body.style.overflow = "";
      }, 150);
    }, 1800);

    return () => {
      clearInterval(interval);
      clearTimeout(safetyTimer);
      document.body.style.overflow = "";
    };
  }, []);

  const currentStatus =
    statusSteps.find((s) => progress <= s.threshold)?.label ?? "CRYPTOGRAPHIC CORES READY";

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className={styles.preloaderOverlay}
          initial={{ opacity: 1 }}
          exit={{
            opacity: 0,
            scale: 1.03,
            filter: "blur(8px)",
            transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] },
          }}
        >
          <div className={styles.ambientGlow} />
          <div className={styles.backgroundGrid} />

          {/* ── High-Tech Multi-Axis Quantum Gyroscope Spinner ── */}
          <div className={styles.spinnerContainer} aria-hidden="true">
            <svg className={styles.spinnerSvg} viewBox="0 0 160 160">
              <defs>
                <linearGradient id="qcert-grad-1" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#00f0ff" stopOpacity="0.95" />
                  <stop offset="60%" stopColor="#2d8cf0" stopOpacity="0.4" />
                  <stop offset="100%" stopColor="#00f0ff" stopOpacity="0.05" />
                </linearGradient>
                <linearGradient id="qcert-grad-2" x1="100%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#60a5fa" stopOpacity="0.9" />
                  <stop offset="100%" stopColor="#00d4ff" stopOpacity="0.1" />
                </linearGradient>
                <filter id="qcert-glow" x="-50%" y="-50%" width="200%" height="200%">
                  <feGaussianBlur stdDeviation="4" result="blur" />
                  <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>

              {/* 1. Outer Static Guide Ring */}
              <circle
                cx="80"
                cy="80"
                r="74"
                fill="none"
                stroke="rgba(255, 255, 255, 0.08)"
                strokeWidth="1"
              />

              {/* 2. Outer Segmented Rotating Ring (Clockwise) */}
              <circle
                cx="80"
                cy="80"
                r="74"
                fill="none"
                stroke="url(#qcert-grad-1)"
                strokeWidth="1.8"
                strokeDasharray="42 16 10 16"
                strokeLinecap="round"
                className={styles.spinClockwiseSlow}
              />

              {/* 3. Middle Segmented Compass Ring (Counter-Clockwise) */}
              <circle
                cx="80"
                cy="80"
                r="56"
                fill="none"
                stroke="rgba(0, 212, 255, 0.55)"
                strokeWidth="1.2"
                strokeDasharray="22 12 6 12"
                strokeLinecap="round"
                className={styles.spinCounterMedium}
              />

              {/* 4. Cardinal Reticle Crosshair Ticks */}
              <g className={styles.spinClockwiseFast}>
                <line x1="80" y1="12" x2="80" y2="22" stroke="#00f0ff" strokeWidth="1.5" />
                <line x1="80" y1="138" x2="80" y2="148" stroke="#00f0ff" strokeWidth="1.5" />
                <line x1="12" y1="80" x2="22" y2="80" stroke="#00f0ff" strokeWidth="1.5" />
                <line x1="138" y1="80" x2="148" y2="80" stroke="#00f0ff" strokeWidth="1.5" />
              </g>

              {/* 5. Orbiting Quantum Particle Nodes */}
              <g className={styles.spinCounterFast}>
                <circle cx="80" cy="40" r="3.2" fill="#00f0ff" filter="url(#qcert-glow)" />
                <circle cx="80" cy="120" r="2.2" fill="#60a5fa" />
              </g>

              {/* 6. Central Quantum Diamond & Resonator Core */}
              <g className={styles.pulseCore}>
                <rect
                  x="64"
                  y="64"
                  width="32"
                  height="32"
                  rx="6"
                  fill="rgba(8, 14, 24, 0.92)"
                  stroke="rgba(0, 212, 255, 0.85)"
                  strokeWidth="1.2"
                />
                <circle cx="80" cy="80" r="4.5" fill="#00f0ff" filter="url(#qcert-glow)" />
              </g>
            </svg>
          </div>

          {/* ── Telemetry & Progress Readout ── */}
          <div className={styles.metaContainer}>
            <div className={styles.badge}>
              <span className={styles.badgeDot} />
              <span>QCERTIFY // SYSTEM_BOOT</span>
            </div>

            <div className={styles.percentDisplay} aria-live="polite">
              {progress.toString().padStart(2, "0")}
              <span className={styles.percentUnit}>%</span>
            </div>

            <div className={styles.progressBarTrack} role="progressbar" aria-valuenow={progress} aria-valuemin={0} aria-valuemax={100}>
              <div className={styles.progressBarFill} style={{ width: `${progress}%` }} />
            </div>

            <p className={styles.statusMessage}>{currentStatus}</p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
