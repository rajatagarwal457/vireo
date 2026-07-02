import { ImageResponse } from "next/og";

export const alt = "Vireo — AI Video Editor for TikTok, Reels & Shorts";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          background: "linear-gradient(165deg, #123724, #0b2015)",
          color: "#ffffff",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 20, marginBottom: 48 }}>
          <svg width="72" height="72" viewBox="0 0 30 30" fill="none">
            <path d="M25 5C13 5 6 13 5 24c10-1 19-6 20-19Z" fill="#17B26A" />
            <path d="M9 21 21 9" stroke="#FFFFFF" strokeWidth="1.6" strokeLinecap="round" />
          </svg>
          <span style={{ fontSize: 56, fontWeight: 800, letterSpacing: -1 }}>Vireo</span>
        </div>
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "0px 20px",
            fontSize: 72,
            fontWeight: 800,
            lineHeight: 1.1,
            letterSpacing: -2,
            maxWidth: 1000,
          }}
        >
          <span>Make scroll-stopping videos</span>
          <span style={{ display: "flex", gap: 20 }}>
            by just <span style={{ color: "#C9F08B" }}>describing</span> them.
          </span>
        </div>
        <div style={{ fontSize: 30, marginTop: 40, color: "rgba(234,240,230,0.8)" }}>
          The AI video editor for TikTok, Reels &amp; Shorts
        </div>
      </div>
    ),
    { ...size }
  );
}
