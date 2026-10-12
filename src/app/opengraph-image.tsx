import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

export const alt = "Eletricista Martins — Ponta Grossa / PR";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  const original = await readFile(join(process.cwd(), "public/brand/logo-martins-original.png"));
  const logo = `data:image/png;base64,${original.toString("base64")}`;
  return new ImageResponse(
    <div style={{ background: "#0b0d10", width: "100%", height: "100%", display: "flex", flexDirection: "column", padding: "54px 75px", color: "#f8f9fa", borderBottom: "12px solid #ff710a" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
        <img src={logo} width={104} height={104} alt="Eletricista Martins" />
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          <span style={{ fontSize: 22, letterSpacing: 4, color: "#ff710a" }}>ELETRICISTA MARTINS</span>
          <span style={{ fontSize: 16, letterSpacing: 3, color: "#b6bdc8" }}>PONTA GROSSA / PR</span>
        </div>
      </div>
      <div style={{ display: "flex", flexDirection: "column", fontSize: 80, fontWeight: 700, lineHeight: 1.08, marginTop: 42 }}>
        <span>Precisou?</span><span style={{ color: "#ff710a" }}>Chama a Martins.</span>
      </div>
      <div style={{ display: "flex", fontSize: 22, color: "#b1b7c1", marginTop: 40 }}>ELÉTRICA + MANUTENÇÃO + REFORMAS</div>
    </div>,
    size,
  );
}
