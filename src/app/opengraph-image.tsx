import { ImageResponse } from "next/og";

export const alt = "Hisweet – Layer cakes, tartes et salés sur mesure";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(160deg, #fbf5e7 0%, #efe3cc 100%)",
          border: "14px solid #d4af37",
          color: "#2b2014",
        }}
      >
        <div style={{ fontSize: 130, fontWeight: 700, color: "#7a5810" }}>Hisweet</div>
        <div style={{ fontSize: 44, marginTop: 16 }}>Layer cakes, tartes et salés sur mesure</div>
      </div>
    ),
    size,
  );
}
