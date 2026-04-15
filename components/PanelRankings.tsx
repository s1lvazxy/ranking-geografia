"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { top10Cities2024, top10Countries2024 } from "@/lib/data"

const TABS = ["Top 10 Cidades", "Top 10 Países"] as const
type Tab = (typeof TABS)[number]

const panel: React.CSSProperties = {
  background: "#111520",
  border: "1px solid #1C2438",
  borderRadius: 6,
  padding: 24,
  height: "100%",
  boxSizing: "border-box",
}

const label: React.CSSProperties = {
  fontSize: 10,
  textTransform: "uppercase",
  letterSpacing: "0.2em",
  color: "#64748B",
  marginBottom: 16,
  display: "block",
}

const th: React.CSSProperties = {
  textAlign: "left",
  fontSize: 10,
  textTransform: "uppercase",
  letterSpacing: "0.12em",
  color: "#334155",
  padding: "4px 10px 10px",
  fontWeight: 400,
  borderBottom: "1px solid #1C2438",
}

function zeroPad(n: number) {
  return String(n).padStart(2, "0")
}

export default function PanelRankings() {
  const [activeTab, setActiveTab] = useState<Tab>("Top 10 Cidades")
  const [hoveredRow, setHoveredRow] = useState<number | null>(null)

  return (
    <div style={panel}>
      <span style={label}>── RANKINGS ICCA 2024 ──</span>

      {/* Tabs */}
      <div style={{ display: "flex", gap: 2, marginBottom: 16 }}>
        {TABS.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            style={{
              padding: "4px 10px",
              borderRadius: 4,
              border: "1px solid",
              borderColor: activeTab === tab ? "#3B82F6" : "#1C2438",
              background: activeTab === tab ? "rgba(59,130,246,0.08)" : "transparent",
              color: activeTab === tab ? "#3B82F6" : "#334155",
              fontSize: 10,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              cursor: "pointer",
              transition: "all 0.12s",
              fontFamily: "inherit",
            }}
          >
            {tab}
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -4 }}
          transition={{ duration: 0.15 }}
        >
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr>
                {activeTab === "Top 10 Cidades" ? (
                  <>
                    <th style={{ ...th, width: 36 }}>#</th>
                    <th style={th}>Cidade</th>
                    <th style={th}>País</th>
                    <th style={{ ...th, textAlign: "right" }}>Rns.</th>
                    <th style={{ ...th, textAlign: "right" }}>EU</th>
                    <th style={th}>Nota</th>
                  </>
                ) : (
                  <>
                    <th style={{ ...th, width: 36 }}>#</th>
                    <th style={th}>País</th>
                    <th style={{ ...th, textAlign: "right" }}>Rns.</th>
                    <th style={th}>Nota</th>
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
                        initial={{ opacity: 0, x: -6 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.04, duration: 0.2 }}
                        onMouseEnter={() => setHoveredRow(i)}
                        onMouseLeave={() => setHoveredRow(null)}
                        style={{
                          background: isLisboa
                            ? "rgba(16,185,129,0.04)"
                            : isHovered
                            ? "rgba(59,130,246,0.04)"
                            : "transparent",
                          borderBottom: `1px solid ${isHovered ? "#3B82F6" : "#1C2438"}`,
                          transition: "all 0.12s",
                          cursor: "default",
                        }}
                      >
                        <td style={{ padding: "7px 10px", color: isLisboa ? "#10B981" : "#334155", fontSize: 11 }}>
                          {zeroPad(row.rank)}
                        </td>
                        <td style={{ padding: "7px 10px", color: isLisboa ? "#10B981" : "#F1F5F9", fontSize: 12, fontWeight: isLisboa ? 600 : 400, textShadow: isLisboa ? "0 0 8px rgba(16,185,129,0.35)" : "none" }}>
                          {row.city}
                        </td>
                        <td style={{ padding: "7px 10px", color: "#64748B", fontSize: 11 }}>
                          {row.country}
                        </td>
                        <td style={{ padding: "7px 10px", color: isLisboa ? "#10B981" : "#F1F5F9", fontSize: 12, textAlign: "right" }}>
                          {row.meetings}
                        </td>
                        <td style={{ padding: "7px 10px", color: "#64748B", fontSize: 11, textAlign: "right" }}>
                          {row.europeRank != null ? zeroPad(row.europeRank) : "——"}
                        </td>
                        <td style={{ padding: "7px 10px", color: "#334155", fontSize: 10 }}>
                          {row.note ?? ""}
                        </td>
                      </motion.tr>
                    )
                  })
                : top10Countries2024.map((row, i) => {
                    const isPT = row.highlight
                    const isHovered = hoveredRow === i
                    return (
                      <motion.tr
                        key={`${row.country}-${i}`}
                        initial={{ opacity: 0, x: -6 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.04, duration: 0.2 }}
                        onMouseEnter={() => setHoveredRow(i)}
                        onMouseLeave={() => setHoveredRow(null)}
                        style={{
                          background: isPT
                            ? "rgba(16,185,129,0.04)"
                            : isHovered
                            ? "rgba(59,130,246,0.04)"
                            : "transparent",
                          borderBottom: `1px solid ${isHovered ? "#3B82F6" : "#1C2438"}`,
                          transition: "all 0.12s",
                          cursor: "default",
                        }}
                      >
                        <td style={{ padding: "7px 10px", color: isPT ? "#10B981" : "#334155", fontSize: 11 }}>
                          {zeroPad(row.rank)}
                        </td>
                        <td style={{ padding: "7px 10px", color: isPT ? "#10B981" : "#F1F5F9", fontSize: 12, fontWeight: isPT ? 600 : 400, textShadow: isPT ? "0 0 8px rgba(16,185,129,0.35)" : "none" }}>
                          {row.country}
                        </td>
                        <td style={{ padding: "7px 10px", color: isPT ? "#10B981" : "#F1F5F9", fontSize: 12, textAlign: "right" }}>
                          {row.meetings ?? "——"}
                        </td>
                        <td style={{ padding: "7px 10px", color: "#334155", fontSize: 10 }}>
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
