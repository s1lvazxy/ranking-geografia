"use client"

import { motion } from "framer-motion"
import { criticalDimensions } from "@/lib/data"

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

export default function PanelCritical() {
  return (
    <div style={panelStyle}>
      <span style={labelStyle}>O que o Ranking NÃO mede</span>
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr>
            <th style={thStyle}>Dimensão</th>
            <th style={{ ...thStyle, textAlign: "center" }}>ICCA Mede?</th>
            <th style={thStyle}>Alternativa</th>
            <th style={thStyle}>Resultado diferente</th>
          </tr>
        </thead>
        <tbody>
          {criticalDimensions.map((row, i) => (
            <motion.tr
              key={row.dimension}
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.05, duration: 0.25 }}
              style={{ borderBottom: "1px solid #1C2438" }}
            >
              <td style={{ padding: "8px 8px", color: "#F1F5F9", fontSize: 12 }}>{row.dimension}</td>
              <td style={{ padding: "8px 8px", textAlign: "center", fontSize: 14 }}>
                {row.iccaMeasures ? (
                  <span style={{ color: "#10B981" }}>✅</span>
                ) : (
                  <span style={{ color: "#EF4444" }}>❌</span>
                )}
              </td>
              <td style={{ padding: "8px 8px", color: "#64748B", fontSize: 11 }}>{row.alternative}</td>
              <td style={{ padding: "8px 8px", color: "#64748B", fontSize: 11 }}>{row.differentResult}</td>
            </motion.tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
