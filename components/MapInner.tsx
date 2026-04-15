"use client"

import { useEffect, useRef, useState } from "react"
import { ComposableMap, Geographies, Geography, Marker } from "react-simple-maps"
import { motion, AnimatePresence } from "framer-motion"
import { gsap } from "gsap"

const GEO_URL = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json"

const pins = [
  { city: "Viena",       rank: 1,  meetings: 154, coords: [16.374, 48.208] as [number, number], lisboa: false },
  { city: "Lisboa",      rank: 2,  meetings: 153, coords: [-9.140, 38.717] as [number, number], lisboa: true  },
  { city: "Singapura",   rank: 3,  meetings: 144, coords: [103.820, 1.352] as [number, number], lisboa: false },
  { city: "Barcelona",   rank: 4,  meetings: 142, coords: [2.173, 41.385]  as [number, number], lisboa: false },
  { city: "Praga",       rank: 5,  meetings: 131, coords: [14.438, 50.076] as [number, number], lisboa: false },
  { city: "Paris",       rank: 6,  meetings: 124, coords: [2.352, 48.857]  as [number, number], lisboa: false },
  { city: "Seul",        rank: 6,  meetings: 124, coords: [126.978, 37.567] as [number, number], lisboa: false },
  { city: "Banguecoque", rank: 8,  meetings: 115, coords: [100.502, 13.756] as [number, number], lisboa: false },
  { city: "Roma",        rank: 9,  meetings: 114, coords: [12.496, 41.903] as [number, number], lisboa: false },
  { city: "Atenas",      rank: 10, meetings: 111, coords: [23.728, 37.984] as [number, number], lisboa: false },
]

type Tooltip = { city: string; rank: number; meetings: number; x: number; y: number } | null

export default function MapInner() {
  const pinsRef = useRef<(SVGCircleElement | null)[]>([])
  const [tooltip, setTooltip] = useState<Tooltip>(null)

  useEffect(() => {
    const validPins = pinsRef.current.filter(Boolean)
    gsap.fromTo(
      validPins,
      { scale: 0, opacity: 0, transformOrigin: "center center" },
      {
        scale: 1,
        opacity: 1,
        duration: 0.4,
        stagger: 0.08,
        ease: "back.out(1.5)",
        delay: 0.3,
      }
    )
  }, [])

  return (
    <div style={{ position: "relative", width: "100%", height: "100%" }}>
      <ComposableMap
        projection="geoRobinson"
        projectionConfig={{ scale: 130 }}
        style={{ width: "100%", height: "100%", background: "#111520" }}
      >
        <Geographies geography={GEO_URL}>
          {({ geographies }) =>
            geographies.map((geo) => (
              <Geography
                key={geo.rsmKey}
                geography={geo}
                style={{
                  default: { fill: "#1C2438", stroke: "#0A0D14", strokeWidth: 0.5, outline: "none" },
                  hover:   { fill: "#1C2438", stroke: "#0A0D14", strokeWidth: 0.5, outline: "none" },
                  pressed: { fill: "#1C2438", stroke: "#0A0D14", strokeWidth: 0.5, outline: "none" },
                }}
              />
            ))
          }
        </Geographies>

        {pins.map((pin, i) => (
          <Marker key={pin.city} coordinates={pin.coords}>
            <circle
              ref={(el) => { pinsRef.current[i] = el }}
              r={pin.lisboa ? 8 : 5}
              fill={pin.lisboa ? "#10B981" : "#3B82F6"}
              stroke={pin.lisboa ? "rgba(16,185,129,0.3)" : "rgba(59,130,246,0.3)"}
              strokeWidth={pin.lisboa ? 4 : 3}
              style={{ cursor: "pointer" }}
              onMouseEnter={(e) => {
                const rect = (e.target as SVGCircleElement).closest("svg")!.getBoundingClientRect()
                const svgEl = e.target as SVGCircleElement
                const svgRect = svgEl.getBoundingClientRect()
                setTooltip({
                  city: pin.city,
                  rank: pin.rank,
                  meetings: pin.meetings,
                  x: svgRect.left - rect.left + 12,
                  y: svgRect.top - rect.top - 10,
                })
              }}
              onMouseLeave={() => setTooltip(null)}
            />
          </Marker>
        ))}
      </ComposableMap>

      <AnimatePresence>
        {tooltip && (
          <motion.div
            key="tooltip"
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 4 }}
            transition={{ duration: 0.15 }}
            style={{
              position: "absolute",
              left: tooltip.x,
              top: tooltip.y,
              background: "#0A0D14",
              border: "1px solid #1C2438",
              borderRadius: 8,
              padding: "6px 10px",
              pointerEvents: "none",
              zIndex: 10,
              whiteSpace: "nowrap",
            }}
          >
            <div style={{ color: "#F1F5F9", fontSize: 12, fontWeight: 600 }}>{tooltip.city}</div>
            <div style={{ color: "#64748B", fontSize: 11 }}>
              #{tooltip.rank} mundial · {tooltip.meetings} reuniões
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
