import PanelRankings from "@/components/PanelRankings"
import PanelMap from "@/components/PanelMap"
import PanelEvolution from "@/components/PanelEvolution"
import PanelPortugal from "@/components/PanelPortugal"
import PanelRadar from "@/components/PanelRadar"
import PanelContext from "@/components/PanelContext"
import PanelCritical from "@/components/PanelCritical"
import PanelSources from "@/components/PanelSources"

const grid: React.CSSProperties = {
  display: "grid",
  gridTemplateColumns: "repeat(12, 1fr)",
  gap: 20,
  alignItems: "stretch",
}

export default function Home() {
  return (
    <main style={{ maxWidth: 1600, margin: "0 auto", padding: 32 }}>

      {/* ── Row 1: Rankings + Map ── */}
      <section id="rankings" style={{ ...grid, marginBottom: 20 }}>
        <div style={{ gridColumn: "span 7", height: "100%" }} className="col-span-12 lg:col-span-7">
          <PanelRankings />
        </div>
        <div style={{ gridColumn: "span 5", height: "100%" }} className="col-span-12 lg:col-span-5">
          <PanelMap />
        </div>
      </section>

      {/* ── Row 2: Evolution + Portugal + Radar ── */}
      <section id="evolution" style={{ ...grid, marginBottom: 20 }}>
        <div style={{ gridColumn: "span 7", height: "100%" }} className="col-span-12 lg:col-span-7">
          <PanelEvolution />
        </div>
        <div id="portugal" style={{ gridColumn: "span 3", height: "100%" }} className="col-span-12 lg:col-span-3">
          <PanelPortugal />
        </div>
        <div style={{ gridColumn: "span 2", height: "100%" }} className="col-span-12 lg:col-span-2">
          <PanelRadar />
        </div>
      </section>

      {/* ── Row 3: Context + Critical ── */}
      <div style={{ ...grid, marginBottom: 20 }}>
        <section id="context" style={{ gridColumn: "span 6", height: "100%" }} className="col-span-12 lg:col-span-6">
          <PanelContext />
        </section>
        <section id="critical" style={{ gridColumn: "span 6", height: "100%" }} className="col-span-12 lg:col-span-6">
          <PanelCritical />
        </section>
      </div>

      {/* ── Row 4: Sources ── */}
      <section id="sources">
        <PanelSources />
      </section>

    </main>
  )
}
