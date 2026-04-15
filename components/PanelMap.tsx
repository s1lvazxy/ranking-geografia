"use client"

import dynamic from "next/dynamic"

const MapInner = dynamic(() => import("./MapInner"), {
  ssr: false,
  loading: () => (
    <div style={{ width: "100%", height: "100%", background: "#111520", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <span style={{ color: "#334155", fontSize: 12 }}>A carregar mapa…</span>
    </div>
  ),
})

const panelStyle: React.CSSProperties = {
  background: "#111520",
  border: "1px solid #1C2438",
  borderRadius: 12,
  padding: 20,
  display: "flex",
  flexDirection: "column",
}

const labelStyle: React.CSSProperties = {
  fontSize: 11,
  textTransform: "uppercase",
  letterSpacing: "0.15em",
  color: "#64748B",
  marginBottom: 12,
  display: "block",
}

export default function PanelMap() {
  return (
    <div style={{ ...panelStyle, minHeight: 300 }}>
      <span style={labelStyle}>Top 10 Cidades — Distribuição Mundial</span>
      <div style={{ flex: 1, minHeight: 220, position: "relative" }}>
        <MapInner />
      </div>
    </div>
  )
}
