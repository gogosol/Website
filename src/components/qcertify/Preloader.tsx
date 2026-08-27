"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import styles from "./Preloader.module.css";

export function Preloader() {
  const [progress, setProgress] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    document.body.style.overflow = "hidden";

    let current = 0;
    const interval = setInterval(() => {
      const step = current < 65 ? Math.random() * 5 + 4 : Math.random() * 8 + 6;
      current = Math.min(100, Math.round(current + step));
      setProgress(current);

      if (current >= 100) {
        clearInterval(interval);
        setTimeout(() => {
          setVisible(false);
          document.body.style.overflow = "";
        }, 220);
      }
    }, 28);

    const safetyTimer = setTimeout(() => {
      setProgress(100);
      setTimeout(() => {
        setVisible(false);
        document.body.style.overflow = "";
      }, 80);
    }, 1100);

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
            scale: 1.008,
            filter: "blur(4px)",
            transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] },
          }}
        >
          <div className={styles.ambientAura} aria-hidden="true" />

          <motion.div
            className={styles.preloaderContent}
            initial={{ opacity: 0, y: 3 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          >
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

            <div
              className={styles.trackContainer}
              role="progressbar"
              aria-valuenow={progress}
              aria-valuemin={0}
              aria-valuemax={100}
              aria-label="Loading QCertify"
            >
              <div
                className={styles.trackFill}
                style={{ width: `${progress}%` }}
              />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
