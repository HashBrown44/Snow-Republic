import { ImageResponse } from "next/og";

// Site-wide social share card (used for both og:image and twitter:image).
export const alt = "Snow Republic Brewery — West Dover, Vermont";
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
          background:
            "linear-gradient(135deg, #0a2536 0%, #103952 55%, #1a4a68 100%)",
          color: "#eef4fa",
          padding: "72px 80px",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            fontSize: 26,
            letterSpacing: 6,
            textTransform: "uppercase",
            color: "#cfe7f6",
          }}
        >
          Veteran-Owned · Est. 2019
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", fontSize: 92, fontWeight: 700, lineHeight: 1.02 }}>
            Snow Republic Brewery
          </div>
          <div
            style={{
              display: "flex",
              marginTop: 24,
              fontSize: 38,
              color: "#a9d6ef",
            }}
          >
            Craft beer &amp; wood-fired kitchen at the foot of Mount Snow.
          </div>
        </div>

        <div
          style={{
            display: "flex",
            fontSize: 30,
            color: "#cfe7f6",
          }}
        >
          West Dover, Vermont
        </div>
      </div>
    ),
    { ...size },
  );
}
