"use client"

import { useState, useEffect, useRef } from "react"
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend,
} from "recharts"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { historicalData } from "@/lib/data"

gsap.registerPlugin(ScrollTrigger)

const ALL_CITIES = ["Lisboa", "Viena", "Paris", "Barcelona", "Praga", "Seul", "Madrid", "Berlim", "Atenas", "Singapura"]
const DEFAULT_VISIBLE = ["Lisboa", "Viena", "Paris", "Barcelona"]

const CITY_COLORS: Record<string, string> = {
  Lisboa:    "#10B981",
  Viena:     "#3B82F6",
  Paris:     "#F59E0B",
  Barcelona: "#8B5CF6",
  Praga:     "#EC4899",
  Seul:      "#06B6D4",
  Madrid:    "#F97316",
  Berlim:    "#84CC16",
  Atenas:    "#A78BFA",
  Singapura: "#FB923C",
}

const YEARS = [2016, 2018, 2022, 2023, 2024]

function buildChartData(cities: string[]) {
  return YEARS.map((year) => {
    const point: Record<string, number | string> = { year }
    cities.forEach((city) => {
      const entry = historicalData.find((d) => d.year === year && d.city === city)
      if (entry?.meetings != null) point[city] = entry.meetings
    })
    return point
  })
}

type TooltipPayloadItem = {
  name: string
  value: number
  color: string
}

function CustomTooltip({ active, payload, label }: { active?: boolean; payload?: TooltipPayloadItem[]; label?: number }) {
  if (!active || !payload?.length) return null
  return (
    <div style={{
      background: "#0A0D14",
      border: "1px solid #1C2438",
      borderRadius: 8,
      padding: "10px 14px",
      fontSize: 12,
    }}>
      <div style={{ color: "#64748B", marginBottom: 6, fontWeight: 600 }}>{label}</div>
      {payload.map((p) => {
        const entry = historicalData.find((d) => d.year === Number(label) && d.city === p.name)
        return (
          <div key={p.name} style={{ color: p.color, marginBottom: 2 }}>
            <span style={{ fontWeight: 600 }}>{p.name}</span>
            {" — "}
            {p.value} reuniões
            {entry?.worldRank != null && (
              <span style={{ color: "#64748B" }}> · #{entry.worldRank} mundial</span>
            )}
          </div>
        )
      })}
    </div>
  )
}

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

export default function PanelEvolution() {
  const [selectedCities, setSelectedCities] = useState<string[]>(DEFAULT_VISIBLE)
  const [hiddenLines, setHiddenLines] = useState<Set<string>>(new Set())
  const containerRef = useRef<HTMLDivElement>(null)
  const animated = useRef(false)

  const chartData = buildChartData(selectedCities)

  useEffect(() => {
    if (!containerRef.current || animated.current) return
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: "top 85%",
        onEnter: () => {
          gsap.fromTo(
            containerRef.current,
            { opacity: 0, y: 20 },
            { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" }
          )
          animated.current = true
        },
      })
    }, containerRef)
    return () => ctx.revert()
  }, [])

  const toggleCity = (city: string) => {
    setHiddenLines((prev) => {
      const next = new Set(prev)
      if (next.has(city)) next.delete(city)
      else next.add(city)
      return next
    })
  }

  const toggleSelect = (city: string) => {
    setSelectedCities((prev) =>
      prev.includes(city) ? prev.filter((c) => c !== city) : [...prev, city]
    )
  }

  return (
    <div style={panelStyle} ref={containerRef}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12 }}>
        <span style={labelStyle}>Evolução Histórica 2016–2024</span>
        {/* City filter select */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: 4 }}>
          {ALL_CITIES.map((city) => (
            <button
              key={city}
              onClick={() => toggleSelect(city)}
              style={{
                padding: "3px 8px",
                borderRadius: 4,
                border: "1px solid",
                borderColor: selectedCities.includes(city) ? CITY_COLORS[city] : "#1C2438",
                background: selectedCities.includes(city) ? `${CITY_COLORS[city]}18` : "transparent",
                color: selectedCities.includes(city) ? CITY_COLORS[city] : "#334155",
                fontSize: 10,
                cursor: "pointer",
                transition: "all 0.15s",
              }}
            >
              {city}
            </button>
          ))}
        </div>
      </div>

      <ResponsiveContainer width="100%" height={260}>
        <LineChart data={chartData} margin={{ top: 4, right: 8, bottom: 4, left: -16 }}>
          <CartesianGrid stroke="#1C2438" strokeDasharray="3 3" />
          <XAxis dataKey="year" stroke="#334155" tick={{ fill: "#64748B", fontSize: 11 }} />
          <YAxis stroke="#334155" tick={{ fill: "#64748B", fontSize: 11 }} domain={["auto", "auto"]} />
          <Tooltip content={<CustomTooltip />} />
          {selectedCities.map((city) => (
            <Line
              key={city}
              type="monotone"
              dataKey={city}
              stroke={CITY_COLORS[city]}
              strokeWidth={city === "Lisboa" || city === "Viena" ? 3 : 1.5}
              dot={{ r: 3, fill: CITY_COLORS[city] }}
              activeDot={{ r: 5 }}
              hide={hiddenLines.has(city)}
              connectNulls={false}
            />
          ))}
        </LineChart>
      </ResponsiveContainer>

      {/* Clickable legend */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginTop: 10 }}>
        {selectedCities.map((city) => (
          <button
            key={city}
            onClick={() => toggleCity(city)}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 4,
              padding: "2px 6px",
              borderRadius: 4,
              border: "none",
              background: "transparent",
              cursor: "pointer",
              opacity: hiddenLines.has(city) ? 0.35 : 1,
              transition: "opacity 0.15s",
            }}
          >
            <span style={{ width: 10, height: 3, background: CITY_COLORS[city], display: "block", borderRadius: 2 }} />
            <span style={{ color: "#64748B", fontSize: 11 }}>{city}</span>
          </button>
        ))}
      </div>

      <div style={{ marginTop: 10, color: "#334155", fontSize: 11 }}>
        ⚠️ 2020–2021: dados incluem contabilização híbrida
      </div>
    </div>
  )
}
