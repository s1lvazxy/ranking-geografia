"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { criticalDimensions } from "@/lib/data"

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

function TableBody() {
  const ref = useRef<HTMLTableSectionElement>(null)
  const inView = useInView(ref, { once: true, margin: "-60px" })

  return (
    <tbody ref={ref}>
      {criticalDimensions.map((row, i) => (
        <motion.tr
          key={row.dimension}
          initial={{ opacity: 0, y: 4 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: i * 0.05, duration: 0.22 }}
          style={{ borderBottom: "1px solid #1C2438" }}
        >
          <td style={{ padding: "8px 10px", color: "#F1F5F9", fontSize: 11 }}>{row.dimension}</td>
          <td style={{ padding: "8px 10px", textAlign: "center", fontSize: 12 }}>
            {row.iccaMeasures
              ? <span style={{ color: "#10B981" }}>✓</span>
              : <span style={{ color: "#EF4444" }}>✗</span>
            }
          </td>
          <td style={{ padding: "8px 10px", color: "#64748B", fontSize: 10 }}>{row.alternative}</td>
          <td style={{ padding: "8px 10px", color: "#334155", fontSize: 10 }}>{row.differentResult}</td>
        </motion.tr>
      ))}
    </tbody>
  )
}

export default function PanelCritical() {
  return (
    <div style={{
      background: "#0F1219",
      border: "1px solid #1C2438",
      borderRadius: 6,
      padding: 24,
      height: "100%",
      boxSizing: "border-box",
    }}>
      <span style={{
        fontSize: 10,
        textTransform: "uppercase",
        letterSpacing: "0.2em",
        color: "#64748B",
        marginBottom: 16,
        display: "block",
      }}>
        ── O QUE O RANKING NÃO MEDE ──
      </span>
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr>
            <th style={th}>Dimensão</th>
            <th style={{ ...th, textAlign: "center", width: 72 }}>ICCA?</th>
            <th style={th}>Alternativa</th>
            <th style={th}>Resultado Diferente</th>
          </tr>
        </thead>
        <TableBody />
      </table>
    </div>
  )
}
