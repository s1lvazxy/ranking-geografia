"use client"

import { useEffect, useRef } from "react"
import { motion } from "framer-motion"
import { gsap } from "gsap"
import { portugalCities } from "@/lib/data"

const panelStyle: React.CSSProperties = {
  background: "#111520",
  border: "1px solid #1C2438",
  borderRadius: 12,
  padding: 20,
  display: "flex",
  flexDirection: "column",
  gap: 12,
}

const labelStyle: React.CSSProperties = {
  fontSize: 11,
  textTransform: "uppercase",
  letterSpacing: "0.15em",
  color: "#64748B",
  marginBottom: 4,
  display: "block",
}

function CityCard({ city, meetings, worldRank, europeRank, note }: {
  city: string
  meetings: number
  worldRank: number
  europeRank: number
  note: string
}) {
  const countRef = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    if (!countRef.current) return
    const obj = { val: 0 }
    const el = countRef.current
    gsap.to(obj, {
      val: meetings,
      duration: 1.2,
      ease: "power2.out",
      delay: 0.3,
      onUpdate() {
        el.textContent = String(Math.round(obj.val))
      },
    })
  }, [meetings])

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      style={{
        background: "#0A0D14",
        border: "1px solid #1C2438",
        borderRadius: 10,
        padding: "14px 16px",
        cursor: "default",
        position: "relative",
        overflow: "hidden",
      }}
      whileFocus={{}}
    >
      {/* Glow */}
      <motion.div
        initial={{ opacity: 0 }}
        whileHover={{ opacity: 1 }}
        style={{
          position: "absolute",
          inset: 0,
          borderRadius: 10,
          border: "1px solid rgba(16,185,129,0.3)",
          boxShadow: "0 0 16px rgba(16,185,129,0.08) inset",
          pointerEvents: "none",
        }}
      />

      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
        <div>
          <div style={{ color: "#F1F5F9", fontSize: 15, fontWeight: 600, marginBottom: 2 }}>{city}</div>
          <div style={{ color: "#64748B", fontSize: 11 }}>{note}</div>
        </div>
        <div style={{ textAlign: "right" }}>
          <span ref={countRef} style={{ color: "#10B981", fontSize: 28, fontWeight: 700, lineHeight: 1 }}>0</span>
          <div style={{ color: "#64748B", fontSize: 10, marginTop: 2 }}>reuniões</div>
        </div>
      </div>

      <div style={{ display: "flex", gap: 12, marginTop: 10 }}>
        <div>
          <div style={{ color: "#64748B", fontSize: 10, textTransform: "uppercase", letterSpacing: "0.08em" }}>Mundial</div>
          <div style={{ color: "#F1F5F9", fontSize: 13, fontWeight: 500 }}>#{worldRank}</div>
        </div>
        <div>
          <div style={{ color: "#64748B", fontSize: 10, textTransform: "uppercase", letterSpacing: "0.08em" }}>Europa</div>
          <div style={{ color: "#F1F5F9", fontSize: 13, fontWeight: 500 }}>#{europeRank}</div>
        </div>
      </div>
    </motion.div>
  )
}

export default function PanelPortugal() {
  return (
    <div style={panelStyle}>
      <span style={labelStyle}>Portugal em Destaque</span>

      {portugalCities.map((c) => (
        <CityCard key={c.city} {...c} />
      ))}

      <div style={{
        marginTop: "auto",
        paddingTop: 8,
        borderTop: "1px solid #1C2438",
        color: "#64748B",
        fontSize: 11,
        textAlign: "center",
        letterSpacing: "0.05em",
      }}>
        Portugal · 9.º Mundial · 7.º Europeu
      </div>
    </div>
  )
}
