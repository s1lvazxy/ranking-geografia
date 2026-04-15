"use client"

import { sources } from "@/lib/data"

const panelStyle: React.CSSProperties = {
  background: "#111520",
  border: "1px solid #1C2438",
  borderRadius: 12,
  padding: 20,
}

const labelStyle: React.CSSProperties = {
  fontSize: 11,
  textTransform: "uppercase",
  letterSpacing: "0.15em",
  color: "#64748B",
  marginBottom: 12,
  display: "block",
}

export default function PanelSources() {
  return (
    <div style={panelStyle}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 8 }}>
        <span style={labelStyle}>Fontes</span>
        <span style={{ color: "#334155", fontSize: 11 }}>
          ICCA GlobeWatch 2024 · Dados verificados abril 2025
        </span>
      </div>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
        {sources.map((s) => (
          <a
            key={s.url}
            href={s.url}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              color: "#334155",
              fontSize: 11,
              textDecoration: "none",
              padding: "4px 10px",
              border: "1px solid #1C2438",
              borderRadius: 6,
              transition: "color 0.15s, border-color 0.15s",
            }}
            onMouseEnter={(e) => {
              ;(e.currentTarget as HTMLAnchorElement).style.color = "#64748B"
              ;(e.currentTarget as HTMLAnchorElement).style.borderColor = "#3B82F6"
            }}
            onMouseLeave={(e) => {
              ;(e.currentTarget as HTMLAnchorElement).style.color = "#334155"
              ;(e.currentTarget as HTMLAnchorElement).style.borderColor = "#1C2438"
            }}
          >
            {s.label}
          </a>
        ))}
      </div>
    </div>
  )
}
