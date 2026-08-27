"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import styles from "./Preloader.module.css";

export function Preloader() {
  const [progress, setProgress] = useState(5);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    document.body.style.overflow = "hidden";

    let current = 5;
    const interval = setInterval(() => {
      const step = current < 60 ? Math.random() * 4 + 3 : Math.random() * 6 + 5;
      current = Math.min(100, Math.round(current + step));
      setProgress(current);

      if (current >= 100) {
        clearInterval(interval);
        setTimeout(() => {
          setVisible(false);
          document.body.style.overflow = "";
        }, 200);
      }
    }, 30);

    const safetyTimer = setTimeout(() => {
      setProgress(100);
      setTimeout(() => {
        setVisible(false);
        document.body.style.overflow = "";
      }, 60);
    }, 1200);

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
            transition: { duration: 0.38, ease: [0.16, 1, 0.3, 1] },
          }}
        >
          <div className={styles.ambientAura} aria-hidden="true" />

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
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
