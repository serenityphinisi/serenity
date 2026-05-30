import { ImageResponse } from "next/og";
import { SITE_BRAND } from "@/lib/siteConfig";

export const alt = "Serenity Phinisi";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          position: "relative",
          backgroundColor: "#2D3C68",
          color: "#F4F5F2",
          fontFamily: "Arial, Helvetica, sans-serif",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "radial-gradient(circle at 85% 10%, rgba(176,141,87,0.2), transparent 45%), radial-gradient(circle at 15% 90%, rgba(244,245,242,0.08), transparent 40%), linear-gradient(135deg, rgba(26,26,26,0.35) 0%, rgba(26,26,26,0.6) 100%)",
          }}
        />

        <div
          style={{
            position: "relative",
            zIndex: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            width: "100%",
            padding: "76px 88px 68px",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "18px",
            }}
          >
            <div
              style={{
                fontSize: 24,
                letterSpacing: "0.22em",
                textTransform: "uppercase",
                color: "#D7C3A0",
                fontWeight: 600,
              }}
            >
              {SITE_BRAND.name.toUpperCase()}
            </div>

            <div
              style={{
                width: 180,
                height: 2,
                backgroundColor: "#B08D57",
              }}
            />
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "18px",
              maxWidth: "900px",
            }}
          >
            <div
              style={{
                fontSize: 72,
                lineHeight: 1.08,
                fontFamily: 'Georgia, "Times New Roman", serif',
                color: "#F4F5F2",
              }}
            >
              Intimate yacht journeys across Indonesia
            </div>

            <div
              style={{
                fontSize: 34,
                lineHeight: 1.25,
                color: "rgba(244,245,242,0.9)",
              }}
            >
              Komodo. Raja Ampat. Islands between.
            </div>
          </div>

          <div
            style={{
              fontSize: 24,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              color: "rgba(244,245,242,0.82)",
            }}
          >
            Private phinisi charter
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
