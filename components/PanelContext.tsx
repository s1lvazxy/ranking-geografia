"use client"

import { useState, useRef } from "react"
import { motion, useInView } from "framer-motion"
import { contextStats } from "@/lib/data"

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
  const [hovered, setHovered] = useState<number | null>(null)

  return (
    <tbody ref={ref}>
      {contextStats.map((row, i) => (
        <motion.tr
          key={row.label}
          initial={{ opacity: 0, y: 6 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: i * 0.045, duration: 0.28 }}
          onMouseEnter={() => setHovered(i)}
          onMouseLeave={() => setHovered(null)}
          style={{
            borderBottom: "1px solid #1C2438",
            background: hovered === i ? "rgba(255,255,255,0.025)" : "transparent",
            transition: "background 0.12s",
          }}
        >
          <td style={{ padding: "8px 8px", color: "#F1F5F9", fontSize: 12 }}>{row.label}</td>
          <td
            style={{
              padding: "8px 8px",
              color: "#F1F5F9",
              fontSize: 12,
              fontWeight: 600,
              textAlign: "right",
              whiteSpace: "nowrap",
              fontFamily: "var(--font-geist-mono)",
            }}
          >
            {row.value}
          </td>
          <td style={{ padding: "8px 8px", color: "#64748B", fontSize: 11 }}>{row.context}</td>
        </motion.tr>
      ))}
    </tbody>
  )
}

export default function PanelContext() {
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
        Contexto Global
      </span>
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr>
            <th style={thStyle}>Indicador</th>
            <th style={{ ...thStyle, textAlign: "right" }}>Valor</th>
            <th style={thStyle}>Contexto</th>
          </tr>
        </thead>
        <TableBody />
      </table>
    </div>
  )
}
