"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { top10Cities2024, top10Countries2024 } from "@/lib/data"

const TABS = ["Top 10 Cidades", "Top 10 Países"] as const
type Tab = (typeof TABS)[number]

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

const thStyle: React.CSSProperties = {
  textAlign: "left",
  fontSize: 11,
  textTransform: "uppercase",
  letterSpacing: "0.1em",
  color: "#64748B",
  padding: "4px 8px",
  fontWeight: 500,
  borderBottom: "1px solid #1C2438",
  paddingBottom: 8,
}

export default function PanelRankings() {
  const [activeTab, setActiveTab] = useState<Tab>("Top 10 Cidades")
  const [hoveredRow, setHoveredRow] = useState<number | null>(null)

  return (
    <div style={panelStyle}>
      <span style={labelStyle}>Rankings ICCA 2024</span>

      {/* Tabs */}
      <div style={{ display: "flex", gap: 4, marginBottom: 16 }}>
        {TABS.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            style={{
              padding: "5px 12px",
              borderRadius: 6,
              border: "1px solid",
              borderColor: activeTab === tab ? "#3B82F6" : "#1C2438",
              background: activeTab === tab ? "rgba(59,130,246,0.1)" : "transparent",
              color: activeTab === tab ? "#3B82F6" : "#64748B",
              fontSize: 12,
              cursor: "pointer",
              transition: "all 0.15s",
            }}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Table */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
          transition={{ duration: 0.2 }}
        >
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr>
                {activeTab === "Top 10 Cidades" ? (
                  <>
                    <th style={thStyle}>Pos.</th>
                    <th style={thStyle}>Cidade</th>
                    <th style={thStyle}>País</th>
                    <th style={{ ...thStyle, textAlign: "right" }}>Reuniões</th>
                    <th style={{ ...thStyle, textAlign: "right" }}>Pos. Europeia</th>
                    <th style={thStyle}>Nota</th>
                  </>
                ) : (
                  <>
                    <th style={thStyle}>Pos.</th>
                    <th style={thStyle}>País</th>
                    <th style={{ ...thStyle, textAlign: "right" }}>Reuniões</th>
                    <th style={thStyle}>Nota</th>
                  </>
                )}
              </tr>
            </thead>
            <tbody>
              {activeTab === "Top 10 Cidades"
                ? top10Cities2024.map((row, i) => {
                    const isLisboa = row.highlight
                    const isHovered = hoveredRow === i
                    return (
                      <motion.tr
                        key={`${row.city}-${i}`}
                        initial={{ opacity: 0, x: -8 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.05, duration: 0.25 }}
                        onMouseEnter={() => setHoveredRow(i)}
                        onMouseLeave={() => setHoveredRow(null)}
                        style={{
                          background: isLisboa
                            ? "rgba(16,185,129,0.05)"
                            : isHovered
                            ? "#111520"
                            : "transparent",
                          borderBottom: "1px solid",
                          borderColor: isHovered ? "#3B82F6" : "#1C2438",
                          transition: "all 0.15s",
                          cursor: "default",
                        }}
                      >
                        <td style={{ padding: "8px 8px", color: isLisboa ? "#10B981" : "#64748B", fontSize: 13, width: 40 }}>
                          {row.rank}
                        </td>
                        <td style={{ padding: "8px 8px", color: isLisboa ? "#10B981" : "#F1F5F9", fontSize: 13, fontWeight: isLisboa ? 600 : 400 }}>
                          {row.city}
                        </td>
                        <td style={{ padding: "8px 8px", color: "#64748B", fontSize: 13 }}>
                          {row.country}
                        </td>
                        <td style={{ padding: "8px 8px", color: isLisboa ? "#10B981" : "#F1F5F9", fontSize: 13, textAlign: "right" }}>
                          {row.meetings}
                        </td>
                        <td style={{ padding: "8px 8px", color: "#64748B", fontSize: 13, textAlign: "right" }}>
                          {row.europeRank ?? "—"}
                        </td>
                        <td style={{ padding: "8px 8px", color: "#64748B", fontSize: 11, maxWidth: 180 }}>
                          {row.note ?? ""}
                        </td>
                      </motion.tr>
                    )
                  })
                : top10Countries2024.map((row, i) => {
                    const isPortugal = row.highlight
                    const isHovered = hoveredRow === i
                    return (
                      <motion.tr
                        key={`${row.country}-${i}`}
                        initial={{ opacity: 0, x: -8 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.05, duration: 0.25 }}
                        onMouseEnter={() => setHoveredRow(i)}
                        onMouseLeave={() => setHoveredRow(null)}
                        style={{
                          background: isPortugal
                            ? "rgba(16,185,129,0.05)"
                            : isHovered
                            ? "#111520"
                            : "transparent",
                          borderBottom: "1px solid",
                          borderColor: isHovered ? "#3B82F6" : "#1C2438",
                          transition: "all 0.15s",
                          cursor: "default",
                        }}
                      >
                        <td style={{ padding: "8px 8px", color: isPortugal ? "#10B981" : "#64748B", fontSize: 13, width: 40 }}>
                          {row.rank}
                        </td>
                        <td style={{ padding: "8px 8px", color: isPortugal ? "#10B981" : "#F1F5F9", fontSize: 13, fontWeight: isPortugal ? 600 : 400 }}>
                          {row.country}
                        </td>
                        <td style={{ padding: "8px 8px", color: isPortugal ? "#10B981" : "#F1F5F9", fontSize: 13, textAlign: "right" }}>
                          {row.meetings ?? "—"}
                        </td>
                        <td style={{ padding: "8px 8px", color: "#64748B", fontSize: 11 }}>
                          {row.note ?? ""}
                        </td>
                      </motion.tr>
                    )
                  })}
            </tbody>
          </table>
        </motion.div>
      </AnimatePresence>
    </div>
  )
}
