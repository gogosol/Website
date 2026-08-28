"use client";

import styles from "./HndlDiagram.module.css";

export function HndlDiagram() {
  return (
    <div className={styles.archivePanel}>
      {/* Top Header */}
      <div className={styles.archiveHeader}>
        <span>HNDL / EXPOSURE SEQUENCE</span>
        <span>TIME →</span>
      </div>

      {/* Main Visual Track */}
      <div className={styles.timelineTrack} aria-hidden="true">
        {/* Desktop / Tablet Horizontal Timeline */}
        <div className={styles.desktopTimeline}>
          <svg
            viewBox="0 0 900 240"
            className={styles.timelineSvg}
            preserveAspectRatio="xMidYMid meet"
          >
            <defs>
              <linearGradient id="trackGlow" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="transparent" />
                <stop offset="15%" stopColor="#2d8cf0" stopOpacity="0.4" />
                <stop offset="50%" stopColor="#60a5fa" stopOpacity="0.7" />
                <stop offset="85%" stopColor="#ef4444" stopOpacity="0.6" />
                <stop offset="100%" stopColor="transparent" />
              </linearGradient>

              <radialGradient id="quantumRingGlow" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#ef4444" stopOpacity="0.25" />
                <stop offset="100%" stopColor="transparent" />
              </radialGradient>
            </defs>

            {/* Guide Wire */}
            <line x1="50" y1="120" x2="850" y2="120" stroke="rgba(255,255,255,0.08)" strokeWidth="1" />
            <line x1="50" y1="120" x2="850" y2="120" stroke="url(#trackGlow)" strokeWidth="2" />

            {/* 01: CAPTURE (LEFT) */}
            <g transform="translate(130, 120)">
              <circle cx="0" cy="0" r="32" fill="rgba(10,12,18,0.92)" stroke="rgba(56,189,248,0.4)" strokeWidth="1.2" />
              <circle cx="0" cy="0" r="40" fill="none" stroke="rgba(56,189,248,0.18)" strokeDasharray="3 4" />
              <rect x="-8" y="-4" width="16" height="14" rx="2" fill="none" stroke="#7dd3fc" strokeWidth="1.4" />
              <path d="M-5 -4V-8A5 5 0 0 1 5 -8V-4" fill="none" stroke="#7dd3fc" strokeWidth="1.4" />

              <text x="0" y="56" textAnchor="middle" fill="#7dd3fc" fontSize="8.5" fontFamily="var(--mono)" fontWeight="600" letterSpacing="0.1em">
                01 / CAPTURE
              </text>
              <text x="0" y="68" textAnchor="middle" fill="rgba(216,213,205,0.45)" fontSize="7" fontFamily="var(--mono)">
                ENCRYPTED TRAFFIC
              </text>
            </g>

            {/* Flow packets between 01 and 02 */}
            {[220, 260, 300, 340].map((xPos) => (
              <rect
                key={xPos}
                x={xPos}
                y="117"
                width="6"
                height="6"
                fill="#38bdf8"
                opacity="0.75"
                transform={`rotate(45, ${xPos + 3}, 120)`}
              />
            ))}

            {/* 02: ADVERSARY VAULT (CENTER) */}
            <g transform="translate(450, 120)">
              {/* Seamless Unified Vault Card */}
              <rect
                x="-68"
                y="-46"
                width="136"
                height="92"
                rx="14"
                fill="rgba(10,12,18,0.96)"
                stroke="url(#vaultBorderGlow)"
                strokeWidth="1.2"
              />
              <rect
                x="-68"
                y="-46"
                width="136"
                height="92"
                rx="14"
                fill="url(#vaultCoreGlow)"
              />
              
              {/* Inner subtle frame */}
              <rect
                x="-62"
                y="-40"
                width="124"
                height="80"
                rx="10"
                fill="none"
                stroke="rgba(255,255,255,0.04)"
                strokeWidth="1"
              />

              {/* Status / Vault Disc Indicator */}
              <circle cx="0" cy="-18" r="4" fill="#38bdf8" opacity="0.9" />
              <circle cx="0" cy="-18" r="8" fill="none" stroke="rgba(56,189,248,0.3)" strokeWidth="1" strokeDasharray="2 3" />

              {/* Internal Accent Divider Lines */}
              <line x1="-48" y1="-5" x2="48" y2="-5" stroke="rgba(255,255,255,0.06)" strokeWidth="1" />
              <line x1="-48" y1="21" x2="48" y2="21" stroke="rgba(255,255,255,0.06)" strokeWidth="1" />

              <text x="0" y="7" textAnchor="middle" fill="#ffffff" fontSize="8.5" fontFamily="var(--mono)" fontWeight="600" letterSpacing="0.14em">
                VAULT ARCHIVE
              </text>
              <text x="0" y="16.5" textAnchor="middle" fill="rgba(216,213,205,0.5)" fontSize="6.5" fontFamily="var(--mono)">
                RETAINED: 10–25+ YRS
              </text>

              {/* Step Sub-label Below Card */}
              <text x="0" y="60" textAnchor="middle" fill="#60a5fa" fontSize="8.5" fontFamily="var(--mono)" fontWeight="600" letterSpacing="0.1em">
                02 / RETAIN
              </text>
              <text x="0" y="72" textAnchor="middle" fill="rgba(216,213,205,0.45)" fontSize="7" fontFamily="var(--mono)">
                CIPHERTEXT STORED
              </text>
            </g>

            {/* Flow line between 02 and 03 */}
            <line x1="530" y1="120" x2="720" y2="120" stroke="rgba(239,68,68,0.35)" strokeWidth="1.5" strokeDasharray="4 4" />

            {/* 03: QUANTUM DECRYPTION (RIGHT) */}
            <g transform="translate(770, 120)">
              <circle cx="0" cy="0" r="48" fill="url(#quantumRingGlow)" />
              <circle cx="0" cy="0" r="40" fill="none" stroke="rgba(239,68,68,0.2)" strokeDasharray="4 6" />
              <circle cx="0" cy="0" r="32" fill="rgba(18,10,12,0.92)" stroke="rgba(239,68,68,0.5)" strokeWidth="1.2" />

              <rect x="-8" y="-2" width="16" height="14" rx="2" fill="none" stroke="#f87171" strokeWidth="1.4" />
              <path d="M-5 -2V-7A5 5 0 0 1 5 -7V-9" fill="none" stroke="#f87171" strokeWidth="1.4" />

              <text x="0" y="56" textAnchor="middle" fill="#f87171" fontSize="8.5" fontFamily="var(--mono)" fontWeight="600" letterSpacing="0.1em">
                03 / DECRYPT
              </text>
              <text x="0" y="68" textAnchor="middle" fill="rgba(216,213,205,0.45)" fontSize="7" fontFamily="var(--mono)">
                QUANTUM BREAKTHROUGH
              </text>
            </g>
          </svg>
        </div>

        {/* Mobile Vertical Timeline (for Screens <= 640px) */}
        <div className={styles.mobileTimeline}>
          <svg
            viewBox="0 0 320 400"
            className={styles.mobileTimelineSvg}
            preserveAspectRatio="xMidYMid meet"
          >
            <defs>
              <linearGradient id="mobileTrackGlow" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.8" />
                <stop offset="50%" stopColor="#60a5fa" stopOpacity="0.7" />
                <stop offset="100%" stopColor="#ef4444" stopOpacity="0.85" />
              </linearGradient>

              <radialGradient id="mobileQuantumGlow" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#ef4444" stopOpacity="0.28" />
                <stop offset="100%" stopColor="transparent" />
              </radialGradient>
            </defs>

            {/* Vertical Guide Wire */}
            <line x1="60" y1="40" x2="60" y2="350" stroke="rgba(255,255,255,0.08)" strokeWidth="1" />
            <line x1="60" y1="40" x2="60" y2="350" stroke="url(#mobileTrackGlow)" strokeWidth="2" />

            {/* 01: CAPTURE (TOP) */}
            <g transform="translate(60, 58)">
              <circle cx="0" cy="0" r="24" fill="rgba(10,12,18,0.95)" stroke="rgba(56,189,248,0.45)" strokeWidth="1.2" />
              <rect x="-6" y="-3" width="12" height="11" rx="2" fill="none" stroke="#7dd3fc" strokeWidth="1.3" />
              <path d="M-4 -3V-6A4 4 0 0 1 4 -6V-3" fill="none" stroke="#7dd3fc" strokeWidth="1.3" />
            </g>
            <g transform="translate(100, 58)">
              <text x="0" y="-4" fill="#7dd3fc" fontSize="11" fontFamily="var(--mono)" fontWeight="600" letterSpacing="0.08em">
                01 / CAPTURE
              </text>
              <text x="0" y="11" fill="rgba(216,213,205,0.7)" fontSize="9.5" fontFamily="var(--mono)">
                Encrypted in transit
              </text>
              <text x="0" y="24" fill="rgba(216,213,205,0.4)" fontSize="8" fontFamily="var(--mono)">
                PASSIVE INTERCEPTION TODAY
              </text>
            </g>

            {/* 02: RETAIN (MIDDLE) */}
            <g transform="translate(60, 195)">
              <rect x="-26" y="-20" width="52" height="40" rx="8" fill="rgba(10,11,16,0.98)" stroke="rgba(107,179,255,0.38)" strokeWidth="1.2" />
              <line x1="-18" y1="-5" x2="18" y2="-5" stroke="rgba(255,255,255,0.08)" strokeWidth="1" />
              <line x1="-18" y1="5" x2="18" y2="5" stroke="rgba(255,255,255,0.08)" strokeWidth="1" />
              <circle cx="0" cy="0" r="2.5" fill="#60a5fa" />
            </g>
            <g transform="translate(100, 195)">
              <text x="0" y="-4" fill="#60a5fa" fontSize="11" fontFamily="var(--mono)" fontWeight="600" letterSpacing="0.08em">
                02 / RETAIN
              </text>
              <text x="0" y="11" fill="rgba(216,213,205,0.7)" fontSize="9.5" fontFamily="var(--mono)">
                Adversary Vault
              </text>
              <text x="0" y="24" fill="rgba(216,213,205,0.4)" fontSize="8" fontFamily="var(--mono)">
                CIPHERTEXT HELD 10–25+ YRS
              </text>
            </g>

            {/* 03: DECRYPT (BOTTOM) */}
            <g transform="translate(60, 332)">
              <circle cx="0" cy="0" r="32" fill="url(#mobileQuantumGlow)" />
              <circle cx="0" cy="0" r="24" fill="rgba(18,10,12,0.95)" stroke="rgba(239,68,68,0.5)" strokeWidth="1.2" />
              <rect x="-6" y="-2" width="12" height="11" rx="2" fill="none" stroke="#f87171" strokeWidth="1.3" />
              <path d="M-4 -2V-5A4 4 0 0 1 4 -5V-7" fill="none" stroke="#f87171" strokeWidth="1.3" />
            </g>
            <g transform="translate(100, 332)">
              <text x="0" y="-4" fill="#f87171" fontSize="11" fontFamily="var(--mono)" fontWeight="600" letterSpacing="0.08em">
                03 / DECRYPT
              </text>
              <text x="0" y="11" fill="rgba(216,213,205,0.7)" fontSize="9.5" fontFamily="var(--mono)">
                Quantum Breakthrough
              </text>
              <text x="0" y="24" fill="rgba(216,213,205,0.4)" fontSize="8" fontFamily="var(--mono)">
                RETROACTIVE SHOR CRACK
              </text>
            </g>
          </svg>
        </div>
      </div>

      {/* 3 Clear Step Cards Below */}
      <div className={styles.stepGrid}>
        <div className={styles.stepCard}>
          <span className={styles.stepNum}>01 / CAPTURE</span>
          <b>Encrypted in transit</b>
          <p>Adversaries passively intercept and record classical ciphertext (RSA, ECC) on public networks without triggering alerts.</p>
        </div>

        <div className={styles.stepCard}>
          <span className={styles.stepNum}>02 / RETAIN</span>
          <b>Stored for years</b>
          <p>Ciphertext outlives the moment in high-density vaults. Sensitive financial, medical, and strategic data stays valuable for decades.</p>
        </div>

        <div className={styles.stepCard}>
          <span className={styles.stepNum}>03 / DECRYPT</span>
          <b>Cracked retroactively</b>
          <p>When a quantum computer running Shor&apos;s algorithm arrives, private keys are derived and all stored historical records are decrypted in bulk.</p>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className={styles.archiveFooter}>
        <span>SENSITIVE TODAY</span>
        <div>
          <i />
          <i />
          <i />
          <i />
        </div>
        <span>COMPROMISED TOMORROW</span>
      </div>
    </div>
  );
}
