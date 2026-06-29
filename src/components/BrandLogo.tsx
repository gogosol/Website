import Image from "next/image";

export default function BrandLogo({
  tone = "light",
  className = "",
  priority = false,
}: {
  tone?: "light" | "dark";
  className?: string;
  priority?: boolean;
}) {
  return (
    <span className={`relative block aspect-[1155/254] ${className}`}>
      <Image
        src="/SF_White_Logo_Web.png"
        alt="QCertify"
        fill
        priority={priority}
        sizes="220px"
        className={`object-contain object-left ${tone === "light" ? "invert" : ""}`}
      />
    </span>
  );
}
