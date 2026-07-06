"use client";

import { motion } from "framer-motion";

/**
 * Root template: remounts on every route change so pages enter with a
 * consistent, subtle editorial fade. Opacity-only on purpose — a transform
 * here would wrap every page's sticky layouts in a transformed ancestor,
 * which WebKit handles unreliably.
 */
export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}
