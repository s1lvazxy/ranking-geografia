"use client"

import { sources } from "@/lib/data"

export default function PanelSources() {
  return (
    <div
      style={{
        background: "#111520",
        border: "1px solid #1C2438",
        borderRadius: 12,
        padding: 20,
      }}
    >
      <span
        style={{
          fontSize: 11,
          textTransform: "uppercase",
          letterSpacing: "0.15em",
          color: "#64748B",
          marginBottom: 12,
          display: "block",
        }}
      >
        Fontes
      </span>

      <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: 0 }}>
        {sources.map((s, i) => (
          <span key={s.url} style={{ display: "flex", alignItems: "center" }}>
            <a
              href={s.url}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                color: "#334155",
                fontSize: 12,
                textDecoration: "none",
                transition: "color 0.15s",
                padding: "2px 0",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.color = "#64748B"
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.color = "#334155"
              }}
            >
              {s.label}
            </a>
            {i < sources.length - 1 && (
              <span style={{ color: "#1C2438", margin: "0 8px", userSelect: "none" }}>·</span>
            )}
          </span>
        ))}
      </div>

      <div
        style={{
          marginTop: 14,
          textAlign: "right",
          fontSize: 10,
          color: "#334155",
        }}
      >
        ICCA GlobeWatch 2024 · Dados verificados abril 2025 · Fontes públicas
      </div>
    </div>
  )
}
