import React from "react";

interface SectionLabelProps {
  label: string;
}

export default function SectionLabel({ label }: SectionLabelProps) {
  return (
    <div className="mb-4 inline-grid grid-cols-[10px_auto] items-center gap-2 text-[10px] font-semibold uppercase leading-none text-black/[0.55]">
      <span className="h-1.5 w-1.5 bg-[#126dff]" />
      <span>{label}</span>
    </div>
  );
}
