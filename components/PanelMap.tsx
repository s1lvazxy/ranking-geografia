"use client"

import dynamic from "next/dynamic"

const MapInner = dynamic(() => import("./MapInner"), {
  ssr: false,
  loading: () => (
    <div style={{ width: "100%", height: "100%", background: "#0A0D14", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <span style={{ color: "#334155", fontSize: 11, letterSpacing: "0.15em", textTransform: "uppercase" }}>
        carregando mapa...
      </span>
    </div>
  ),
})

export default function PanelMap() {
  return (
    <div
      style={{
        background: "#111520",
        border: "1px solid #1C2438",
        borderRadius: 6,
        padding: 24,
        display: "flex",
        flexDirection: "column",
        height: "100%",
        boxSizing: "border-box",
      }}
    >
      <span
        style={{
          fontSize: 10,
          textTransform: "uppercase",
          letterSpacing: "0.2em",
          color: "#64748B",
          marginBottom: 16,
          display: "block",
        }}
      >
        ── TOP 10 — DISTRIBUIÇÃO MUNDIAL ──
      </span>
      <div style={{ flex: 1, minHeight: 220, position: "relative" }}>
        <MapInner />
      </div>
    </div>
  )
}
