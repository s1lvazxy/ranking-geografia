"use client"

import { sources } from "@/lib/data"

export default function PanelSources() {
  return (
    <div style={{
      background: "#111520",
      border: "1px solid #1C2438",
      borderRadius: 6,
      padding: 24,
    }}>
      <span style={{
        fontSize: 10,
        textTransform: "uppercase",
        letterSpacing: "0.2em",
        color: "#64748B",
        marginBottom: 14,
        display: "block",
      }}>
        ── FONTES ──
      </span>

      <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center" }}>
        {sources.map((s, i) => (
          <span key={s.url} style={{ display: "flex", alignItems: "center" }}>
            <a
              href={s.url}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                color: "#334155",
                fontSize: 11,
                textDecoration: "none",
                transition: "color 0.12s",
                letterSpacing: "0.03em",
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
              <span style={{ color: "#1C2438", margin: "0 10px", userSelect: "none", fontSize: 12 }}>·</span>
            )}
          </span>
        ))}
      </div>

      <div style={{
        marginTop: 16,
        paddingTop: 12,
        borderTop: "1px solid #1C2438",
        textAlign: "right",
        fontSize: 10,
        color: "#334155",
        letterSpacing: "0.08em",
      }}>
        ICCA GLOBEWATCH 2024 · DADOS VERIFICADOS ABRIL 2025 · FONTES PÚBLICAS
      </div>
    </div>
  )
}
