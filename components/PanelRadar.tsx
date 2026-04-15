"use client"

import {
  RadarChart, Radar, PolarGrid, PolarAngleAxis, ResponsiveContainer,
} from "recharts"

// Normalized metrics (0–1 scale)
// Lisboa: meetings=153 → norm=1.0; Porto: 59 → norm=0.39
// worldRank_inv: Lisboa=2→ inv=1−(2/100)=0.98; Porto=34→0.66
// europeRank_inv: Lisboa=2→0.98; Porto=22→0.78
const radarData = [
  {
    metric: "Reuniões",
    Lisboa: 1.0,
    Porto: 0.39,
  },
  {
    metric: "Rank Mundial",
    Lisboa: 0.98,
    Porto: 0.66,
  },
  {
    metric: "Rank Europa",
    Lisboa: 0.98,
    Porto: 0.78,
  },
]

const panelStyle: React.CSSProperties = {
  background: "#111520",
  border: "1px solid #1C2438",
  borderRadius: 12,
  padding: 20,
  display: "flex",
  flexDirection: "column",
}

const labelStyle: React.CSSProperties = {
  fontSize: 11,
  textTransform: "uppercase",
  letterSpacing: "0.15em",
  color: "#64748B",
  marginBottom: 12,
  display: "block",
}

export default function PanelRadar() {
  return (
    <div style={panelStyle}>
      <span style={labelStyle}>Lisboa vs Porto</span>

      <ResponsiveContainer width="100%" height={200}>
        <RadarChart data={radarData} margin={{ top: 10, right: 20, bottom: 10, left: 20 }}>
          <PolarGrid stroke="#1C2438" />
          <PolarAngleAxis
            dataKey="metric"
            tick={{ fill: "#64748B", fontSize: 10 }}
          />
          <Radar
            name="Lisboa"
            dataKey="Lisboa"
            stroke="#10B981"
            fill="#10B981"
            fillOpacity={0.15}
            strokeWidth={2}
          />
          <Radar
            name="Porto"
            dataKey="Porto"
            stroke="#3B82F6"
            fill="#3B82F6"
            fillOpacity={0.1}
            strokeWidth={1.5}
          />
        </RadarChart>
      </ResponsiveContainer>

      <div style={{ display: "flex", gap: 12, justifyContent: "center", marginTop: 4 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
          <span style={{ width: 10, height: 10, borderRadius: "50%", background: "#10B981", display: "block" }} />
          <span style={{ color: "#64748B", fontSize: 11 }}>Lisboa</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
          <span style={{ width: 10, height: 10, borderRadius: "50%", background: "#3B82F6", display: "block" }} />
          <span style={{ color: "#64748B", fontSize: 11 }}>Porto</span>
        </div>
      </div>
    </div>
  )
}
