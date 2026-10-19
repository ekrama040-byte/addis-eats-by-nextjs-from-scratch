import { ImageResponse } from "next/og";

export const alt = "Addis Eats — Ethiopian food menu";
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
          justifyContent: "center",
          padding: "72px",
          background: "#7f1d1d",
          color: "white",
        }}
      >
        <div style={{ fontSize: 32 }}>ETHIOPIAN FOOD</div>
        <div style={{ fontSize: 76, fontWeight: 700 }}>
          Addis Eats
        </div>
        <div style={{ fontSize: 30 }}>
          Discover your next favorite dish.
        </div>
      </div>
    ),
    size
  );
}