"use client"

import { useState, useEffect, useRef } from "react"
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
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

type TooltipPayloadItem = { name: string; value: number; color: string }

function CustomTooltip({ active, payload, label }: { active?: boolean; payload?: TooltipPayloadItem[]; label?: number }) {
  if (!active || !payload?.length) return null
  return (
    <div style={{
      background: "#0A0D14",
      border: "1px solid #1C2438",
      borderRadius: 4,
      padding: "10px 14px",
      fontSize: 11,
    }}>
      <div style={{ color: "#64748B", marginBottom: 6, letterSpacing: "0.1em" }}>{label}</div>
      {payload.map((p) => {
        const entry = historicalData.find((d) => d.year === Number(label) && d.city === p.name)
        return (
          <div key={p.name} style={{ color: p.color, marginBottom: 3 }}>
            <span style={{ fontWeight: 600 }}>{p.name}</span>
            {" — "}{p.value} rns.
            {entry?.worldRank != null && (
              <span style={{ color: "#334155" }}> · #{String(entry.worldRank).padStart(2, "0")} mundial</span>
            )}
          </div>
        )
      })}
    </div>
  )
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
            { opacity: 0, y: 16 },
            { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" }
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
    <div
      ref={containerRef}
      style={{
        background: "#111520",
        border: "1px solid #1C2438",
        borderRadius: 6,
        padding: 24,
        height: "100%",
        boxSizing: "border-box",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Header */}
      <span style={{
        fontSize: 10,
        textTransform: "uppercase",
        letterSpacing: "0.2em",
        color: "#64748B",
        marginBottom: 12,
        display: "block",
      }}>
        ── EVOLUÇÃO HISTÓRICA 2016–2024 ──
      </span>

      {/* City filter buttons — own row below title */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: 4, marginBottom: 14 }}>
        {ALL_CITIES.map((city) => (
          <button
            key={city}
            onClick={() => toggleSelect(city)}
            style={{
              padding: "3px 8px",
              borderRadius: 3,
              border: "1px solid",
              borderColor: selectedCities.includes(city) ? CITY_COLORS[city] : "#1C2438",
              background: selectedCities.includes(city) ? `${CITY_COLORS[city]}14` : "transparent",
              color: selectedCities.includes(city) ? CITY_COLORS[city] : "#334155",
              fontSize: 10,
              letterSpacing: "0.08em",
              cursor: "pointer",
              transition: "all 0.12s",
              fontFamily: "inherit",
              textTransform: "uppercase",
            }}
          >
            {city}
          </button>
        ))}
      </div>

      {/* Chart */}
      <ResponsiveContainer width="100%" height={240}>
        <LineChart data={chartData} margin={{ top: 4, right: 8, bottom: 4, left: -18 }}>
          <CartesianGrid stroke="#1C2438" strokeDasharray="2 4" />
          <XAxis dataKey="year" stroke="#1C2438" tick={{ fill: "#334155", fontSize: 10 }} />
          <YAxis stroke="#1C2438" tick={{ fill: "#334155", fontSize: 10 }} domain={["auto", "auto"]} />
          <Tooltip content={<CustomTooltip />} />
          {selectedCities.map((city) => (
            <Line
              key={city}
              type="monotone"
              dataKey={city}
              stroke={CITY_COLORS[city]}
              strokeWidth={city === "Lisboa" || city === "Viena" ? 2.5 : 1.5}
              dot={{ r: 2.5, fill: CITY_COLORS[city], strokeWidth: 0 }}
              activeDot={{ r: 4 }}
              hide={hiddenLines.has(city)}
              connectNulls={false}
            />
          ))}
        </LineChart>
      </ResponsiveContainer>

      {/* Clickable legend */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginTop: 10 }}>
        {selectedCities.map((city) => (
          <button
            key={city}
            onClick={() => toggleCity(city)}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 5,
              padding: "2px 0",
              border: "none",
              background: "transparent",
              cursor: "pointer",
              opacity: hiddenLines.has(city) ? 0.3 : 1,
              transition: "opacity 0.12s",
              fontFamily: "inherit",
            }}
          >
            <span style={{ width: 12, height: 2, background: CITY_COLORS[city], display: "block" }} />
            <span style={{ color: "#64748B", fontSize: 10, letterSpacing: "0.06em" }}>{city}</span>
          </button>
        ))}
      </div>

      <div style={{ marginTop: 10, color: "#334155", fontSize: 10, letterSpacing: "0.05em" }}>
        ⚠ 2020–2021: dados incluem contabilização híbrida
      </div>
    </div>
  )
}
