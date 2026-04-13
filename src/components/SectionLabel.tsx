import React from "react";

interface SectionLabelProps {
  label: string;
}

export default function SectionLabel({ label }: SectionLabelProps) {
  return (
    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/20 bg-white/5 text-xs font-bold uppercase tracking-[0.2em] text-slate-300 mb-6 backdrop-blur-md">
      {label}
    </div>
  );
}
