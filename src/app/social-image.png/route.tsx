import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

export const dynamic = "force-static";
/** Rendered once at build time to out/social-image.png (static export). */

export async function GET() {
  const [poster, wordmark] = await Promise.all([
    readFile(join(process.cwd(), "src/assets/hero/trust-architecture-wide.jpg")),
    readFile(join(process.cwd(), "src/assets/brand-wordmark-ink.png")),
  ]);
  return new ImageResponse(
    <div style={{ width: "100%", height: "100%", display: "flex", position: "relative", background: "#f3f2ee", color: "#0f1012" }}>
      {/* ImageResponse requires standard img elements with embedded bytes. */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={`data:image/jpeg;base64,${poster.toString("base64")}`} width={1200} height={675} alt="" style={{ position: "absolute", left: 40, top: -30 }} />
      <div style={{ position: "absolute", left: 0, top: 0, width: 1200, height: 630, display: "flex", background: "linear-gradient(90deg, rgba(247,246,243,0.97) 0%, rgba(247,246,243,0.82) 40%, rgba(247,246,243,0) 62%)" }} />
      <div style={{ position: "relative", display: "flex", flexDirection: "column", justifyContent: "space-between", padding: "56px 64px", width: 700, height: 630 }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={`data:image/png;base64,${wordmark.toString("base64")}`} width={200} height={23} alt="QCertify" />
        <div style={{ display: "flex", flexDirection: "column" }}>
          <span style={{ fontSize: 20, color: "#5b5e65", marginBottom: 22 }}>QuantumHalon by QCertify</span>
          <div style={{ display: "flex", fontSize: 64, lineHeight: 1.02, letterSpacing: -2.5 }}>Post-quantum protection.</div>
          <div style={{ display: "flex", fontSize: 64, lineHeight: 1.02, letterSpacing: -2.5, color: "#6b6e75" }}>On your existing network.</div>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 19, color: "#2a2c30" }}><span>Inline gateways · Customer-controlled control plane</span></div>
      </div>
      <span style={{ position: "absolute", right: 56, bottom: 52, fontSize: 19, color: "#0f1012" }}>qcertify.io</span>
    </div>,
    { width: 1200, height: 630 },
  );
}
