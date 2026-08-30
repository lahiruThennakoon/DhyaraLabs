import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "DhyaraLabs — Build software people actually use.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 72,
          background: "#07080d",
          color: "#ffffff",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* accent glow */}
        <div
          style={{
            position: "absolute",
            top: -160,
            right: -120,
            width: 620,
            height: 620,
            borderRadius: 620,
            background:
              "radial-gradient(circle at center, rgba(91,76,255,0.55), transparent 65%)",
          }}
        />
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div
            style={{
              width: 52,
              height: 52,
              borderRadius: 14,
              background: "#4c39f0",
              display: "flex",
            }}
          />
          <div style={{ fontSize: 34, fontWeight: 600 }}>DhyaraLabs</div>
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 76, fontWeight: 700, lineHeight: 1.05 }}>
            Build software
          </div>
          <div style={{ fontSize: 76, fontWeight: 700, lineHeight: 1.05, color: "#a3a8ff" }}>
            people actually use.
          </div>
        </div>
        <div style={{ fontSize: 26, color: "#b4b9c6" }}>
          Products · AI apps · Web apps · MVPs · Automation
        </div>
      </div>
    ),
    { ...size },
  );
}
