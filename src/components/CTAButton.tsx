import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

interface CTAButtonProps {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "secondary";
  className?: string;
}

export default function CTAButton({
  href,
  children,
  variant = "primary",
  className = "",
}: CTAButtonProps) {
  if (variant === "secondary") {
    return (
      <Link
        href={href}
        className={`inline-flex items-center gap-2 px-8 py-4 rounded-full font-medium text-white border border-white/15 hover:border-white/30 hover:bg-white/5 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0ea5e9] ${className}`}
      >
        {children}
        <ArrowRight className="w-4 h-4" />
      </Link>
    );
  }

  return (
    <Link
      href={href}
      className={`inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full font-bold text-white glass-panel glass-interactive transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0ea5e9] ${className}`}
    >
      {children}
    </Link>
  );
}
