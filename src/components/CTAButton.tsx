import React from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

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
  const primary =
    "border-black bg-black text-[#fff] hover:bg-transparent hover:text-black";
  const secondary =
    "border-black/25 bg-transparent text-black hover:border-black hover:bg-white";

  return (
    <Link
      href={href}
      className={`group inline-flex items-center justify-between gap-5 border px-5 py-3 text-[11px] font-semibold uppercase leading-none transition-colors focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-4 focus-visible:outline-black ${
        variant === "primary" ? primary : secondary
      } ${className}`}
    >
      <span>{children}</span>
      <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
    </Link>
  );
}
