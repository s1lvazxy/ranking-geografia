"use client"

import { useState, useRef } from "react"
import { motion, useInView } from "framer-motion"
import { contextStats } from "@/lib/data"

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
  const [hovered, setHovered] = useState<number | null>(null)

  return (
    <tbody ref={ref}>
      {contextStats.map((row, i) => (
        <motion.tr
          key={row.label}
          initial={{ opacity: 0, y: 4 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: i * 0.04, duration: 0.22 }}
          onMouseEnter={() => setHovered(i)}
          onMouseLeave={() => setHovered(null)}
          style={{
            borderBottom: "1px solid #1C2438",
            background: hovered === i ? "rgba(255,255,255,0.02)" : "transparent",
            transition: "background 0.1s",
          }}
        >
          <td style={{ padding: "8px 10px", color: "#64748B", fontSize: 11 }}>{row.label}</td>
          <td style={{
            padding: "8px 10px",
            color: "#F1F5F9",
            fontSize: 12,
            fontWeight: 600,
            textAlign: "right",
            whiteSpace: "nowrap",
            fontFamily: "var(--font-geist-mono)",
            fontVariantNumeric: "tabular-nums",
          }}>
            {row.value}
          </td>
          <td style={{ padding: "8px 10px", color: "#334155", fontSize: 10 }}>{row.context}</td>
        </motion.tr>
      ))}
    </tbody>
  )
}

export default function PanelContext() {
  return (
    <div style={{
      background: "#111520",
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
        ── CONTEXTO GLOBAL ──
      </span>
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr>
            <th style={th}>Indicador</th>
            <th style={{ ...th, textAlign: "right" }}>Valor</th>
            <th style={th}>Contexto</th>
          </tr>
        </thead>
        <TableBody />
      </table>
    </div>
  )
}
