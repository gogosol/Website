"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import styles from "./Preloader.module.css";

export function Preloader() {
  const [progress, setProgress] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) {
      setVisible(false);
      return;
    }

    document.body.style.overflow = "hidden";

    let current = 0;
    const interval = setInterval(() => {
      const step = current < 50 ? Math.random() * 12 + 8 : Math.random() * 18 + 12;
      current = Math.min(100, Math.round(current + step));
      setProgress(current);

      if (current >= 100) {
        clearInterval(interval);
        setTimeout(() => {
          setVisible(false);
          document.body.style.overflow = "";
        }, 220);
      }
    }, 40);

    const safetyTimer = setTimeout(() => {
      setProgress(100);
      setTimeout(() => {
        setVisible(false);
        document.body.style.overflow = "";
      }, 100);
    }, 1400);

    return () => {
      clearInterval(interval);
      clearTimeout(safetyTimer);
      document.body.style.overflow = "";
    };
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className={styles.preloaderOverlay}
          initial={{ opacity: 1 }}
          exit={{
            opacity: 0,
            transition: { duration: 0.45, ease: [0.16, 1, 0.3, 1] },
          }}
        >
          <div className={styles.preloaderContent}>
            <div className={styles.logoWrap}>
              <Image
                src="/Logo SF White.png"
                alt="QCertify"
                width={654}
                height={96}
                className={styles.logoImage}
                priority
              />
            </div>

            <div className={styles.spinner} aria-hidden="true">
              <div className={styles.spinnerRing} />
            </div>

            <div className={styles.metaWrap}>
              <div className={styles.progressBar} role="progressbar" aria-valuenow={progress} aria-valuemin={0} aria-valuemax={100}>
                <div className={styles.progressFill} style={{ width: `${progress}%` }} />
              </div>
              <p className={styles.statusText}>INITIALIZING HYBRID PQC</p>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
