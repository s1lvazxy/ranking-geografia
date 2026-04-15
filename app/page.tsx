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
  gap: 16,
}

const colSpan = (n: number): React.CSSProperties => ({
  gridColumn: `span ${n}`,
})

const colSpanResponsive = (n: number): React.CSSProperties => ({
  gridColumn: `span ${n}`,
})

export default function Home() {
  return (
    <main style={{ maxWidth: 1600, margin: "0 auto", padding: 24 }}>
      {/* ── Grid principal ── */}
      <section id="rankings" style={{ ...grid, marginBottom: 16 }}>
        {/* Painel A — Rankings */}
        <div style={colSpanResponsive(7)} className="col-span-12 lg:col-span-7">
          <PanelRankings />
        </div>

        {/* Painel B — Map */}
        <div style={colSpanResponsive(5)} className="col-span-12 lg:col-span-5">
          <PanelMap />
        </div>
      </section>

      <section id="evolution" style={{ ...grid, marginBottom: 16 }}>
        {/* Painel C — Evolution */}
        <div style={colSpanResponsive(7)} className="col-span-12 lg:col-span-7">
          <PanelEvolution />
        </div>

        {/* Painel D — Portugal */}
        <div id="portugal" style={colSpanResponsive(3)} className="col-span-12 lg:col-span-3">
          <PanelPortugal />
        </div>

        {/* Painel E — Radar */}
        <div style={colSpanResponsive(2)} className="col-span-12 lg:col-span-2">
          <PanelRadar />
        </div>
      </section>

      {/* ── Grid secundária ── */}
      <div style={{ ...grid, marginBottom: 16 }}>
        {/* Painel F — Context */}
        <section id="context" style={colSpanResponsive(6)} className="col-span-12 lg:col-span-6">
          <PanelContext />
        </section>

        {/* Painel G — Critical */}
        <section id="critical" style={colSpanResponsive(6)} className="col-span-12 lg:col-span-6">
          <PanelCritical />
        </section>
      </div>

      {/* Painel H — Sources */}
      <section id="sources" style={{ ...grid }}>
        <div style={{ gridColumn: "span 12" }}>
          <PanelSources />
        </div>
      </section>
    </main>
  )
}
