import React from "react";

export default function GlobalParticles() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[-1] opacity-60"
      style={{
        background:
          "linear-gradient(90deg, transparent 0 17.95%, rgba(5,5,5,0.045) 18% calc(18% + 1px), transparent calc(18% + 1px) 100%), linear-gradient(90deg, transparent 0 82.95%, rgba(5,5,5,0.04) 83% calc(83% + 1px), transparent calc(83% + 1px) 100%)",
      }}
    />
  );
}
