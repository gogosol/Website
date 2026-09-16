import { ImageResponse } from "next/og";
import fs from "fs";
import path from "path";

export const alt = "QCertify · The Quantum Transition. In Line.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpenGraphImage() {
  let logoBase64 = "";

  try {
    const pubDir = path.join(process.cwd(), "public");
    const logoPath = path.join(pubDir, "sf-white-logo-web.png");
    const altLogoPath = path.join(pubDir, "Logo SF White.png");

    if (fs.existsSync(logoPath)) {
      logoBase64 = `data:image/png;base64,${fs.readFileSync(logoPath).toString("base64")}`;
    } else if (fs.existsSync(altLogoPath)) {
      logoBase64 = `data:image/png;base64,${fs.readFileSync(altLogoPath).toString("base64")}`;
    }
  } catch {
    logoBase64 = "";
  }

  return new ImageResponse(
    (
      <div
        style={{
          position: "relative",
          display: "flex",
          width: "100%",
          height: "100%",
          padding: "24px",
          background: "#040507",
          color: "#f4f2ec",
          fontFamily: "Arial, Helvetica, sans-serif",
          boxSizing: "border-box",
          overflow: "hidden",
        }}
      >
        {/* Ambient background glows */}
        <div
          style={{
            position: "absolute",
            top: "-140px",
            right: "-60px",
            width: "720px",
            height: "720px",
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(0, 212, 255, 0.18) 0%, rgba(45, 140, 240, 0.07) 45%, transparent 70%)",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: "-150px",
            left: "-80px",
            width: "600px",
            height: "600px",
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(45, 140, 240, 0.15) 0%, rgba(20, 40, 90, 0.05) 50%, transparent 70%)",
          }}
        />

        {/* Main Framed Card */}
        <div
          style={{
            position: "relative",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            width: "100%",
            height: "100%",
            padding: "36px 44px",
            borderRadius: "24px",
            border: "1px solid rgba(255, 255, 255, 0.11)",
            background: "rgba(7, 9, 14, 0.92)",
            boxShadow: "inset 0 1px 0 rgba(255, 255, 255, 0.14), 0 24px 60px rgba(0, 0, 0, 0.6)",
          }}
        >
          {/* Subtle Grid Corner Accents */}
          <div style={{ position: "absolute", top: "14px", left: "16px", color: "rgba(0, 212, 255, 0.5)", fontSize: "14px", fontFamily: "monospace" }}>+</div>
          <div style={{ position: "absolute", top: "14px", right: "16px", color: "rgba(0, 212, 255, 0.5)", fontSize: "14px", fontFamily: "monospace" }}>+</div>
          <div style={{ position: "absolute", bottom: "14px", left: "16px", color: "rgba(0, 212, 255, 0.5)", fontSize: "14px", fontFamily: "monospace" }}>+</div>
          <div style={{ position: "absolute", bottom: "14px", right: "16px", color: "rgba(0, 212, 255, 0.5)", fontSize: "14px", fontFamily: "monospace" }}>+</div>

          {/* Top Bar: Brand Logo & Platform Status Badge */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              width: "100%",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
              {logoBase64 ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={logoBase64}
                  alt="QCertify"
                  width="210"
                  height="46"
                  style={{
                    width: "210px",
                    height: "46px",
                    objectFit: "contain",
                  }}
                />
              ) : (
                <div style={{ display: "flex", alignItems: "center", gap: "10px", fontSize: 26, fontWeight: 800, letterSpacing: "0.1em" }}>
                  <span style={{ color: "#00f0ff" }}>Q</span>
                  <span>QCERTIFY</span>
                </div>
              )}
            </div>

            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                padding: "8px 18px",
                borderRadius: "100px",
                background: "rgba(0, 212, 255, 0.08)",
                border: "1px solid rgba(0, 212, 255, 0.32)",
              }}
            >
              <div
                style={{
                  width: "8px",
                  height: "8px",
                  borderRadius: "50%",
                  background: "#00f0ff",
                  boxShadow: "0 0 10px #00f0ff",
                }}
              />
              <span
                style={{
                  color: "#d8d5cd",
                  fontSize: "13px",
                  fontWeight: 700,
                  letterSpacing: "0.1em",
                }}
              >
                HYBRID PQC PLATFORM
              </span>
            </div>
          </div>

          {/* Middle Content Section */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              width: "100%",
              margin: "8px 0",
            }}
          >
            {/* Left Column: Headlines & Cryptographic Spec Pills */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                maxWidth: "625px",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  marginBottom: "12px",
                  color: "#2d8cf0",
                  fontSize: "14px",
                  fontWeight: 700,
                  letterSpacing: "0.16em",
                }}
              >
                QUANTUMHALON // INLINE GOVERNANCE
              </div>

              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  fontSize: "46px",
                  fontWeight: 800,
                  lineHeight: "1.12",
                  letterSpacing: "-0.02em",
                  color: "#f4f2ec",
                  marginBottom: "14px",
                }}
              >
                <span>The quantum transition.</span>
                <span style={{ color: "#6bb3ff" }}>In line.</span>
              </div>

              <div
                style={{
                  fontSize: "17px",
                  lineHeight: "1.45",
                  color: "#9da1ab",
                  marginBottom: "22px",
                }}
              >
                Customer-controlled gateways and an off-path control plane for critical traffic that cannot wait for every application to change.
              </div>

              {/* Badges / Specs */}
              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: "10px",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    padding: "7px 14px",
                    borderRadius: "10px",
                    background: "rgba(255, 255, 255, 0.05)",
                    border: "1px solid rgba(255, 255, 255, 0.12)",
                    color: "#f4f2ec",
                    fontSize: "12.5px",
                    fontWeight: 600,
                  }}
                >
                  <span style={{ color: "#00f0ff" }}>●</span> Hybrid X25519 + ML-KEM
                </div>

                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    padding: "7px 14px",
                    borderRadius: "10px",
                    background: "rgba(255, 255, 255, 0.05)",
                    border: "1px solid rgba(255, 255, 255, 0.12)",
                    color: "#f4f2ec",
                    fontSize: "12.5px",
                    fontWeight: 600,
                  }}
                >
                  <span style={{ color: "#00f0ff" }}>●</span> Dual-Cert (ECDSA + ML-DSA-65)
                </div>

                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    padding: "7px 14px",
                    borderRadius: "10px",
                    background: "rgba(255, 255, 255, 0.05)",
                    border: "1px solid rgba(255, 255, 255, 0.12)",
                    color: "#f4f2ec",
                    fontSize: "12.5px",
                    fontWeight: 600,
                  }}
                >
                  <span style={{ color: "#00f0ff" }}>●</span> NIST FIPS 203 / 204 · CNSA 2.0
                </div>
              </div>
            </div>

            {/* Right Column: Hardware / Verification Node Graphic Card */}
            <div
              style={{
                position: "relative",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                width: "385px",
                height: "290px",
                padding: "22px 24px",
                borderRadius: "20px",
                border: "1px solid rgba(45, 140, 240, 0.4)",
                background: "rgba(10, 18, 32, 0.85)",
                boxShadow: "0 20px 50px rgba(0, 0, 0, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.1)",
                overflow: "hidden",
              }}
            >
              {/* Subtle inner blue glow */}
              <div
                style={{
                  position: "absolute",
                  top: "20px",
                  right: "20px",
                  width: "160px",
                  height: "160px",
                  borderRadius: "50%",
                  background: "radial-gradient(circle, rgba(0, 212, 255, 0.25) 0%, transparent 70%)",
                }}
              />

              {/* Node Card Header */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  width: "100%",
                }}
              >
                <div style={{ display: "flex", gap: "6px" }}>
                  <div style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#ff5f56" }} />
                  <div style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#ffbd2e" }} />
                  <div style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#27c93f" }} />
                </div>
                <div style={{ fontSize: "11px", color: "#6bb3ff", fontFamily: "monospace", letterSpacing: "0.12em" }}>
                  INLINE_GATEWAY // NODE_01
                </div>
              </div>

              {/* Radar & Cryptographic Rings Visual */}
              <div
                style={{
                  position: "relative",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: "100%",
                  height: "145px",
                }}
              >
                {/* Outer Ring */}
                <div
                  style={{
                    position: "absolute",
                    width: "136px",
                    height: "136px",
                    borderRadius: "50%",
                    border: "1px dashed rgba(107, 179, 255, 0.4)",
                  }}
                />
                {/* Mid Ring */}
                <div
                  style={{
                    position: "absolute",
                    width: "100px",
                    height: "100px",
                    borderRadius: "50%",
                    border: "1px solid rgba(0, 212, 255, 0.65)",
                    background: "rgba(45, 140, 240, 0.08)",
                  }}
                />
                {/* Diamond Core */}
                <div
                  style={{
                    position: "absolute",
                    width: "58px",
                    height: "58px",
                    border: "2.5px solid #00f0ff",
                    transform: "rotate(45deg)",
                    background: "rgba(0, 240, 255, 0.15)",
                    boxShadow: "0 0 24px rgba(0, 240, 255, 0.45)",
                  }}
                />
                {/* Center Core Dot with glow */}
                <div
                  style={{
                    width: "12px",
                    height: "12px",
                    borderRadius: "50%",
                    background: "#ffffff",
                    boxShadow: "0 0 16px #00f0ff, 0 0 30px #00f0ff",
                  }}
                />
              </div>

              {/* Node Card Footer */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  borderTop: "1px solid rgba(45, 140, 240, 0.25)",
                  paddingTop: "10px",
                  width: "100%",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                  <div
                    style={{
                      width: "6px",
                      height: "6px",
                      borderRadius: "50%",
                      background: "#b7f5ca",
                      boxShadow: "0 0 6px #b7f5ca",
                    }}
                  />
                  <span style={{ fontSize: "11px", color: "#b7f5ca", fontWeight: 700, letterSpacing: "0.08em" }}>
                    STATUS: FAIL-CLOSED
                  </span>
                </div>
                <span style={{ fontSize: "11px", color: "#929098", letterSpacing: "0.06em" }}>
                  ACTIVE ENFORCEMENT
                </span>
              </div>
            </div>
          </div>

          {/* Bottom Bar: Trust Pillars & Domain */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              borderTop: "1px solid rgba(255, 255, 255, 0.12)",
              paddingTop: "18px",
              width: "100%",
              color: "#929098",
              fontSize: "14px",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
              <span style={{ color: "#d8d5cd", fontWeight: 500 }}>Customer-Controlled Gateways</span>
              <span style={{ color: "#2d8cf0", fontWeight: 700 }}>•</span>
              <span style={{ color: "#d8d5cd", fontWeight: 500 }}>Off-Path Authority</span>
              <span style={{ color: "#2d8cf0", fontWeight: 700 }}>•</span>
              <span style={{ color: "#d8d5cd", fontWeight: 500 }}>Zero Application Rewrites</span>
            </div>

            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                padding: "6px 14px",
                borderRadius: "8px",
                background: "rgba(255, 255, 255, 0.06)",
                border: "1px solid rgba(255, 255, 255, 0.12)",
                color: "#f4f2ec",
                fontSize: "13.5px",
                fontWeight: 600,
                letterSpacing: "0.02em",
              }}
            >
              <span style={{ color: "#6bb3ff" }}>https://</span>
              <span>qcertify.io</span>
            </div>
          </div>
        </div>
      </div>
    ),
    size,
  );
}

