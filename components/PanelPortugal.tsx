"use client"

import { useEffect, useRef } from "react"
import { motion } from "framer-motion"
import { gsap } from "gsap"
import { portugalCities } from "@/lib/data"

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
      duration: 1.4,
      ease: "power2.out",
      delay: 0.4,
      onUpdate() {
        el.textContent = String(Math.round(obj.val))
      },
    })
  }, [meetings])

  return (
    <motion.div
      whileHover={{ scale: 1.015 }}
      transition={{ type: "spring", stiffness: 400, damping: 25 }}
      style={{
        background: "#0A0D14",
        border: "1px solid #1C2438",
        borderRadius: 4,
        padding: "14px 16px",
        cursor: "default",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Hover glow border */}
      <motion.div
        initial={{ opacity: 0 }}
        whileHover={{ opacity: 1 }}
        style={{
          position: "absolute",
          inset: 0,
          borderRadius: 4,
          border: "1px solid rgba(16,185,129,0.25)",
          boxShadow: "0 0 12px rgba(16,185,129,0.06) inset",
          pointerEvents: "none",
        }}
      />

      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
        <div>
          <div style={{ color: "#F1F5F9", fontSize: 13, fontWeight: 500, marginBottom: 3, letterSpacing: "0.05em" }}>
            {city.toUpperCase()}
          </div>
          <div style={{ color: "#334155", fontSize: 10, maxWidth: 140, lineHeight: 1.4 }}>{note}</div>
        </div>
        <div style={{ textAlign: "right" }}>
          <span
            ref={countRef}
            style={{
              color: "#10B981",
              fontSize: 32,
              fontWeight: 700,
              lineHeight: 1,
              textShadow: "0 0 12px rgba(16,185,129,0.4)",
            }}
          >
            0
          </span>
          <div style={{ color: "#334155", fontSize: 9, marginTop: 3, letterSpacing: "0.1em", textTransform: "uppercase" }}>
            reuniões
          </div>
        </div>
      </div>

      <div style={{ display: "flex", gap: 20, marginTop: 12, borderTop: "1px solid #1C2438", paddingTop: 10 }}>
        <div>
          <div style={{ color: "#334155", fontSize: 9, textTransform: "uppercase", letterSpacing: "0.12em", marginBottom: 3 }}>Mundial</div>
          <div style={{ color: "#F1F5F9", fontSize: 13 }}>
            <span style={{ color: "#64748B", fontSize: 10 }}>#</span>{String(worldRank).padStart(2, "0")}
          </div>
        </div>
        <div>
          <div style={{ color: "#334155", fontSize: 9, textTransform: "uppercase", letterSpacing: "0.12em", marginBottom: 3 }}>Europa</div>
          <div style={{ color: "#F1F5F9", fontSize: 13 }}>
            <span style={{ color: "#64748B", fontSize: 10 }}>#</span>{String(europeRank).padStart(2, "0")}
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default function PanelPortugal() {
  return (
    <div
      style={{
        background: "#111520",
        border: "1px solid #1C2438",
        borderRadius: 6,
        padding: 24,
        display: "flex",
        flexDirection: "column",
        gap: 12,
        height: "100%",
        boxSizing: "border-box",
      }}
    >
      <span
        style={{
          fontSize: 10,
          textTransform: "uppercase",
          letterSpacing: "0.2em",
          color: "#64748B",
          marginBottom: 4,
          display: "block",
        }}
      >
        ── PORTUGAL EM DESTAQUE ──
      </span>

      {portugalCities.map((c) => (
        <CityCard key={c.city} {...c} />
      ))}

      <div
        style={{
          marginTop: "auto",
          paddingTop: 12,
          borderTop: "1px solid #1C2438",
          color: "#334155",
          fontSize: 10,
          textAlign: "center",
          letterSpacing: "0.12em",
          textTransform: "uppercase",
        }}
      >
        PT · 09.º Mundial · 07.º Europeu
      </div>
    </div>
  )
}
