import { ImageResponse } from "next/og";

export const alt = "QCertify — Govern the transition to hybrid PQC";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          position: "relative",
          display: "flex",
          width: "100%",
          height: "100%",
          flexDirection: "column",
          justifyContent: "space-between",
          overflow: "hidden",
          padding: "58px 64px",
          background: "#050506",
          color: "#f4f2ec",
          fontFamily: "Arial, Helvetica, sans-serif",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: "-170px",
            right: "-80px",
            display: "flex",
            width: "720px",
            height: "720px",
            border: "1px solid rgba(45,140,240,.28)",
            borderRadius: "50%",
            boxShadow: "inset 0 0 160px rgba(45,140,240,.12)",
          }}
        />
        <div
          style={{
            position: "absolute",
            top: "128px",
            right: "144px",
            display: "flex",
            width: "312px",
            height: "312px",
            alignItems: "center",
            justifyContent: "center",
            border: "1px solid rgba(107,179,255,.45)",
            borderRadius: "50%",
            background: "rgba(45,140,240,.04)",
          }}
        >
          <div style={{ width: "82px", height: "82px", border: "2px solid #6bb3ff", transform: "rotate(45deg)" }} />
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "12px", fontSize: 20, letterSpacing: "0.12em" }}>
          <span style={{ color: "#6bb3ff" }}>Q</span>
          <span>QCERTIFY</span>
        </div>
        <div style={{ display: "flex", maxWidth: "800px", flexDirection: "column" }}>
          <div style={{ marginBottom: "22px", color: "#2d8cf0", fontSize: 16, letterSpacing: "0.14em" }}>
            QUANTUMHALON / ARCHITECTURE
          </div>
          <div style={{ fontSize: 44, lineHeight: 1.15, fontWeight: 600 }}>
            Post-quantum protection at wire speed.
          </div>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", borderTop: "1px solid rgba(255,255,255,.14)", paddingTop: "22px", color: "#929098", fontSize: 15 }}>
          <span>Customer-controlled gateways</span>
          <span>Off-path control plane</span>
          <span>Lab-proven / not enterprise-certified</span>
        </div>
      </div>
    ),
    size,
  );
}
