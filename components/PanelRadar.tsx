"use client"

import {
  RadarChart, Radar, PolarGrid, PolarAngleAxis, ResponsiveContainer,
} from "recharts"

const radarData = [
  { metric: "Reuniões",    Lisboa: 1.0,  Porto: 0.39 },
  { metric: "Rank Mundial", Lisboa: 0.98, Porto: 0.66 },
  { metric: "Rank Europa",  Lisboa: 0.98, Porto: 0.78 },
]

export default function PanelRadar() {
  return (
    <div
      style={{
        background: "#111520",
        border: "1px solid #1C2438",
        borderRadius: 6,
        padding: 24,
        display: "flex",
        flexDirection: "column",
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
          marginBottom: 12,
          display: "block",
        }}
      >
        ── LIS / OPO ──
      </span>

      <div style={{ flex: 1, minHeight: 0 }}>
        <ResponsiveContainer width="100%" height="100%">
          <RadarChart
            data={radarData}
            margin={{ top: 10, right: 20, bottom: 10, left: 20 }}
            outerRadius="80%"
          >
            <PolarGrid stroke="#1C2438" />
            <PolarAngleAxis
              dataKey="metric"
              tick={{ fill: "#334155", fontSize: 9, fontFamily: "inherit" }}
            />
            <Radar
              name="Lisboa"
              dataKey="Lisboa"
              stroke="#10B981"
              fill="#10B981"
              fillOpacity={0.12}
              strokeWidth={2}
            />
            <Radar
              name="Porto"
              dataKey="Porto"
              stroke="#3B82F6"
              fill="#3B82F6"
              fillOpacity={0.08}
              strokeWidth={1.5}
            />
          </RadarChart>
        </ResponsiveContainer>
      </div>

      <div style={{ display: "flex", gap: 14, justifyContent: "center", marginTop: 8 }}>
        {[{ label: "LIS", color: "#10B981" }, { label: "OPO", color: "#3B82F6" }].map(({ label, color }) => (
          <div key={label} style={{ display: "flex", alignItems: "center", gap: 5 }}>
            <span style={{ width: 8, height: 8, background: color, display: "block", borderRadius: 1 }} />
            <span style={{ color: "#64748B", fontSize: 10, letterSpacing: "0.1em" }}>{label}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
