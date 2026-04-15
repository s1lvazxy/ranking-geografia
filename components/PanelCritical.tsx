"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { criticalDimensions } from "@/lib/data"

const thStyle: React.CSSProperties = {
  textAlign: "left",
  fontSize: 11,
  textTransform: "uppercase",
  letterSpacing: "0.1em",
  color: "#64748B",
  padding: "4px 8px 8px",
  fontWeight: 500,
  borderBottom: "1px solid #1C2438",
}

function TableBody() {
  const ref = useRef<HTMLTableSectionElement>(null)
  const inView = useInView(ref, { once: true, margin: "-60px" })

  return (
    <tbody ref={ref}>
      {criticalDimensions.map((row, i) => (
        <motion.tr
          key={row.dimension}
          initial={{ opacity: 0, y: 6 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: i * 0.055, duration: 0.28 }}
          style={{ borderBottom: "1px solid #1C2438" }}
        >
          <td style={{ padding: "8px 8px", color: "#F1F5F9", fontSize: 12 }}>{row.dimension}</td>
          <td style={{ padding: "8px 8px", textAlign: "center", fontSize: 13 }}>
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
  )
}

export default function PanelCritical() {
  return (
    <div
      style={{
        background: "#0F1219",
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
        O que o Ranking Não Mede
      </span>
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr>
            <th style={thStyle}>Dimensão</th>
            <th style={{ ...thStyle, textAlign: "center" }}>ICCA Mede?</th>
            <th style={thStyle}>Alternativa</th>
            <th style={thStyle}>Resultado Diferente</th>
          </tr>
        </thead>
        <TableBody />
      </table>
    </div>
  )
}
