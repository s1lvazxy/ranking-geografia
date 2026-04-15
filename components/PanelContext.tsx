"use client"

import { motion } from "framer-motion"
import { contextStats } from "@/lib/data"

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

export default function PanelContext() {
  return (
    <div style={panelStyle}>
      <span style={labelStyle}>Contexto Global 2024</span>
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr>
            <th style={thStyle}>Indicador</th>
            <th style={{ ...thStyle, textAlign: "right" }}>Valor</th>
            <th style={thStyle}>Contexto</th>
          </tr>
        </thead>
        <tbody>
          {contextStats.map((row, i) => (
            <motion.tr
              key={row.label}
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.04, duration: 0.25 }}
              style={{ borderBottom: "1px solid #1C2438" }}
            >
              <td style={{ padding: "8px 8px", color: "#F1F5F9", fontSize: 12 }}>{row.label}</td>
              <td style={{ padding: "8px 8px", color: "#10B981", fontSize: 13, fontWeight: 600, textAlign: "right", whiteSpace: "nowrap" }}>{row.value}</td>
              <td style={{ padding: "8px 8px", color: "#64748B", fontSize: 11 }}>{row.context}</td>
            </motion.tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
