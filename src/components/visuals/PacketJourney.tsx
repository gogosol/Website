"use client";

import React, { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useInView, useScroll, useTransform } from "framer-motion";

const smoothEase = [0.22, 1, 0.36, 1] as const;

export interface JourneyStep {
  title: string;
  text: string;
  meta: string;
}

function JourneyRow({
  index,
  step,
  active,
  onActive,
  isLast,
}: {
  index: number;
  step: JourneyStep;
  active: boolean;
  onActive: (index: number) => void;
  isLast: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { margin: "-42% 0px -42% 0px" });

  useEffect(() => {
    if (inView) onActive(index);
  }, [inView, index, onActive]);

  return (
    <div ref={ref} className={`relative grid grid-cols-[40px_1fr] gap-4 sm:grid-cols-[56px_1fr] ${isLast ? "" : "pb-12 lg:pb-16"}`}>
      <div className="relative flex justify-center">
        <motion.span
          animate={{
            backgroundColor: active ? "#126dff" : "#f7f7f2",
            borderColor: active ? "#126dff" : "rgba(5,5,5,0.25)",
          }}
          transition={{ duration: 0.3 }}
          className="z-10 mt-1 h-3 w-3 border"
        />
      </div>
      <motion.div
        animate={{ opacity: active ? 1 : 0.42 }}
        transition={{ duration: 0.35, ease: smoothEase }}
        className="border-t border-black/10 pt-3"
      >
        <div className="flex items-center justify-between gap-4">
          <span className={`text-[10px] font-semibold uppercase ${active ? "text-[#126dff]" : "text-black/[0.4]"}`}>
            Stage {String(index + 1).padStart(2, "0")}
          </span>
          <span className="text-[9px] uppercase text-black/[0.35]">{step.meta}</span>
        </div>
        <h3 className="mt-3 text-xl font-semibold leading-tight text-black sm:text-2xl">{step.title}</h3>
        <p className="mt-3 max-w-xl text-sm leading-6 text-black/[0.58]">{step.text}</p>
      </motion.div>
    </div>
  );
}

/**
 * Scroll-driven pipeline: a packet square travels down a rail while the five
 * processing stages activate in sequence. Left panel stays sticky with the
 * current stage index.
 */
export default function PacketJourney({ steps }: { steps: JourneyStep[] }) {
  const railRef = useRef<HTMLDivElement>(null);
  const [activeStep, setActiveStep] = useState(0);
  const { scrollYProgress } = useScroll({
    target: railRef,
    offset: ["start 0.72", "end 0.55"],
  });
  const packetTop = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <div className="grid gap-12 lg:grid-cols-[0.42fr_1fr] lg:gap-16">
      <div className="lg:sticky lg:top-28 lg:self-start">
        <div className="border-t border-black pt-5">
          <div className="flex items-end justify-between gap-6">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeStep}
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -18 }}
                transition={{ duration: 0.3, ease: smoothEase }}
                className="text-7xl font-medium leading-[0.85] text-black sm:text-8xl lg:text-9xl"
                aria-hidden="true"
              >
                {String(activeStep + 1).padStart(2, "0")}
              </motion.div>
            </AnimatePresence>
            <div className="pb-2 text-[10px] font-semibold uppercase text-black/[0.42]">
              / {String(steps.length).padStart(2, "0")}
            </div>
          </div>

          <div className="mt-6 h-px overflow-hidden bg-black/10">
            <motion.div className="h-full origin-left bg-[#126dff]" style={{ scaleX: scrollYProgress }} />
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeStep}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="mt-4 text-[10px] font-semibold uppercase text-black/[0.55]"
            >
              {steps[activeStep]?.meta}
            </motion.div>
          </AnimatePresence>

          <p className="mt-6 hidden max-w-xs text-sm leading-6 text-black/[0.55] lg:block">
            The packet crosses every stage locally, on the gateway. Nothing in
            this pipeline routes through QCertify cloud services.
          </p>
        </div>
      </div>

      <div ref={railRef} className="relative">
        {/* static rail */}
        <div aria-hidden="true" className="absolute bottom-1 left-[19px] top-1 w-px bg-black/[0.14] sm:left-[27px]" />
        {/* progress rail */}
        <motion.div
          aria-hidden="true"
          className="absolute bottom-1 left-[19px] top-1 w-px origin-top bg-[#126dff] sm:left-[27px]"
          style={{ scaleY: scrollYProgress }}
        />
        {/* travelling packet */}
        <motion.div
          aria-hidden="true"
          className="absolute left-[15px] z-10 h-[9px] w-[9px] bg-[#126dff] sm:left-[23px]"
          style={{ top: packetTop, marginTop: -4 }}
        />

        {steps.map((step, index) => (
          <JourneyRow
            key={step.title}
            index={index}
            step={step}
            active={index <= activeStep}
            onActive={setActiveStep}
            isLast={index === steps.length - 1}
          />
        ))}
      </div>
    </div>
  );
}
