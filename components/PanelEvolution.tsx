"use client"

import dynamic from "next/dynamic"

const VisxEvolutionChart = dynamic(() => import("./VisxEvolutionChart"), { ssr: false })

export default function PanelEvolution() {
  return (
    <div
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
      <VisxEvolutionChart />
    </div>
  )
}
