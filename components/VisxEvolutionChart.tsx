"use client"

import { useCallback, useMemo, useState } from "react"
import { AnimatePresence, motion, useMotionTemplate, useSpring } from "motion/react"
import { localPoint } from "@visx/event"
import { curveMonotoneX } from "@visx/curve"
import { GridColumns, GridRows } from "@visx/grid"
import { scaleLinear, scaleTime } from "@visx/scale"
import { AreaClosed, LinePath } from "@visx/shape"
import { bisector, extent } from "d3-array"
import useMeasure from "react-use-measure"
import { historicalData } from "@/lib/data"

// ── Palette ──────────────────────────────────────────────────────────────────
const CITY_COLORS: Record<string, string> = {
  Lisboa:     "#10B981",
  Viena:      "#3B82F6",
  Barcelona:  "#F59E0B",
  Paris:      "#8B5CF6",
  Singapura:  "#EC4899",
  Madrid:     "#64748B",
  Berlim:     "#94A3B8",
  Praga:      "#0EA5E9",
  Seul:       "#F97316",
  Atenas:     "#A3E635",
}

const ALL_CITIES = Object.keys(CITY_COLORS)

// ── Data transform ────────────────────────────────────────────────────────────
type DataPoint = { date: Date; [city: string]: number | Date | null }

function buildSeries(cities: string[]): DataPoint[] {
  const years = [...new Set(historicalData.map((d) => d.year))].sort()
  return years.map((year) => {
    const point: DataPoint = { date: new Date(year, 0, 1) }
    for (const city of cities) {
      const entry = historicalData.find((d) => d.year === year && d.city === city)
      point[city] = entry?.meetings ?? null
    }
    return point
  })
}

// ── Crosshair spring ─────────────────────────────────────────────────────────
function useCrosshair() {
  const x = useSpring(0, { stiffness: 300, damping: 30 })
  const y = useSpring(0, { stiffness: 300, damping: 30 })
  return { x, y, transform: useMotionTemplate`translate(${x}px,${y}px)` }
}

// ── Chart inner ───────────────────────────────────────────────────────────────
interface ChartProps {
  width: number
  height: number
  activeCities: string[]
  onHover: (info: HoverInfo | null) => void
  hovered: HoverInfo | null
}

type HoverInfo = {
  x: number
  y: number
  date: Date
  values: Record<string, number | null>
}

const MARGIN = { top: 16, right: 24, bottom: 36, left: 44 }

function ChartInner({ width, height, activeCities, onHover, hovered }: ChartProps) {
  const data = useMemo(() => buildSeries(activeCities), [activeCities])
  const crosshair = useCrosshair()

  const innerW = width - MARGIN.left - MARGIN.right
  const innerH = height - MARGIN.top - MARGIN.bottom

  const dates = useMemo(() => data.map((d) => d.date), [data])
  const allMeetings = useMemo(() =>
    data.flatMap((d) => activeCities.map((c) => d[c] as number | null)).filter((v): v is number => v !== null),
    [data, activeCities]
  )

  const xScale = useMemo(() => scaleTime({
    range: [0, innerW],
    domain: extent(dates) as [Date, Date],
  }), [dates, innerW])

  const yMax = useMemo(() => Math.max(...allMeetings, 50), [allMeetings])
  const yScale = useMemo(() => scaleLinear({
    range: [innerH, 0],
    domain: [0, yMax * 1.12],
    nice: true,
  }), [innerH, yMax])

  const bisectDate = useMemo(() => bisector<DataPoint, Date>((d) => d.date).left, [])

  const handleMouseMove = useCallback((e: React.MouseEvent<SVGRectElement>) => {
    const pt = localPoint(e)
    if (!pt) return
    const mx = pt.x - MARGIN.left
    const dateAtX = xScale.invert(mx)
    const idx = bisectDate(data, dateAtX, 1)
    const d0 = data[idx - 1]
    const d1 = data[idx]
    let nearest = d0
    if (d1 && Math.abs(dateAtX.getTime() - d1.date.getTime()) < Math.abs(dateAtX.getTime() - d0.date.getTime())) {
      nearest = d1
    }
    if (!nearest) return
    const cx = xScale(nearest.date) + MARGIN.left
    const values: Record<string, number | null> = {}
    for (const city of activeCities) values[city] = nearest[city] as number | null
    crosshair.x.set(cx)
    onHover({ x: cx, y: pt.y, date: nearest.date, values })
  }, [data, xScale, bisectDate, activeCities, crosshair.x, onHover])

  const yearTicks = useMemo(() => {
    const ys = [...new Set(historicalData.map((d) => d.year))].sort()
    return ys.map((y) => new Date(y, 0, 1))
  }, [])

  if (innerW <= 0 || innerH <= 0) return null

  return (
    <svg width={width} height={height} style={{ overflow: "visible" }}>
      <defs>
        {activeCities.map((city) => (
          <linearGradient key={city} id={`grad-${city}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={CITY_COLORS[city]} stopOpacity={0.18} />
            <stop offset="100%" stopColor={CITY_COLORS[city]} stopOpacity={0} />
          </linearGradient>
        ))}
      </defs>

      <g transform={`translate(${MARGIN.left},${MARGIN.top})`}>
        {/* Grid */}
        <GridRows
          scale={yScale}
          width={innerW}
          strokeDasharray="2 4"
          stroke="var(--chart-grid)"
          strokeOpacity={0.6}
          numTicks={4}
        />
        <GridColumns
          scale={xScale}
          height={innerH}
          tickValues={yearTicks}
          strokeDasharray="2 4"
          stroke="var(--chart-grid)"
          strokeOpacity={0.3}
        />

        {/* Areas */}
        {activeCities.map((city) => (
          <AreaClosed
            key={`area-${city}`}
            data={data.filter((d) => d[city] !== null)}
            x={(d) => xScale(d.date)}
            y={(d) => yScale((d[city] as number) ?? 0)}
            yScale={yScale}
            curve={curveMonotoneX}
            fill={`url(#grad-${city})`}
          />
        ))}

        {/* Lines */}
        {activeCities.map((city) => (
          <LinePath
            key={`line-${city}`}
            data={data.filter((d) => d[city] !== null)}
            x={(d) => xScale(d.date)}
            y={(d) => yScale((d[city] as number) ?? 0)}
            stroke={CITY_COLORS[city]}
            strokeWidth={city === "Lisboa" ? 2 : 1.2}
            curve={curveMonotoneX}
            strokeOpacity={city === "Lisboa" ? 1 : 0.7}
          />
        ))}

        {/* Dots at each data point */}
        {activeCities.map((city) =>
          data
            .filter((d) => d[city] !== null)
            .map((d) => (
              <circle
                key={`dot-${city}-${d.date.getFullYear()}`}
                cx={xScale(d.date)}
                cy={yScale(d[city] as number)}
                r={city === "Lisboa" ? 3 : 2}
                fill={CITY_COLORS[city]}
                opacity={0.85}
              />
            ))
        )}

        {/* Crosshair vertical line */}
        {hovered && (
          <line
            x1={hovered.x - MARGIN.left}
            x2={hovered.x - MARGIN.left}
            y1={0}
            y2={innerH}
            stroke="var(--chart-crosshair)"
            strokeWidth={1}
            strokeDasharray="3 3"
          />
        )}

        {/* Y axis labels */}
        {yScale.ticks(4).map((tick) => (
          <text
            key={tick}
            x={-8}
            y={yScale(tick)}
            textAnchor="end"
            dominantBaseline="middle"
            fill="var(--chart-label)"
            fontSize={9}
            fontFamily="var(--font-geist-mono)"
          >
            {tick}
          </text>
        ))}

        {/* X axis labels */}
        {yearTicks.map((t) => (
          <text
            key={t.getFullYear()}
            x={xScale(t)}
            y={innerH + 20}
            textAnchor="middle"
            fill="var(--chart-label)"
            fontSize={9}
            fontFamily="var(--font-geist-mono)"
            letterSpacing="0.08em"
          >
            {t.getFullYear()}
          </text>
        ))}

        {/* Interaction overlay */}
        <rect
          x={0}
          y={0}
          width={innerW}
          height={innerH}
          fill="transparent"
          onMouseMove={handleMouseMove}
          onMouseLeave={() => onHover(null)}
        />
      </g>
    </svg>
  )
}

// ── Tooltip ───────────────────────────────────────────────────────────────────
function Tooltip({ info, activeCities }: { info: HoverInfo; activeCities: string[] }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 4 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.12 }}
      style={{
        position: "absolute",
        left: info.x + 12,
        top: info.y - 20,
        background: "var(--chart-tooltip-bg)",
        border: "1px solid var(--chart-tooltip-border)",
        borderRadius: 4,
        padding: "8px 10px",
        pointerEvents: "none",
        zIndex: 10,
        minWidth: 120,
      }}
    >
      <div style={{ fontSize: 9, color: "#64748B", letterSpacing: "0.12em", marginBottom: 6 }}>
        {info.date.getFullYear()}
      </div>
      {activeCities
        .filter((c) => info.values[c] !== null)
        .sort((a, b) => (info.values[b] ?? 0) - (info.values[a] ?? 0))
        .map((city) => (
          <div key={city} style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 3 }}>
            <span style={{ width: 6, height: 6, background: CITY_COLORS[city], display: "block", borderRadius: 1, flexShrink: 0 }} />
            <span style={{ fontSize: 9, color: "#64748B", minWidth: 58 }}>{city}</span>
            <span style={{ fontSize: 10, color: "#F1F5F9", fontFamily: "var(--font-geist-mono)", fontVariantNumeric: "tabular-nums", marginLeft: "auto", paddingLeft: 8 }}>
              {info.values[city]}
            </span>
          </div>
        ))}
    </motion.div>
  )
}

// ── Legend + filter ───────────────────────────────────────────────────────────
function CityToggle({ city, active, onToggle }: { city: string; active: boolean; onToggle: () => void }) {
  return (
    <button
      onClick={onToggle}
      style={{
        display: "flex",
        alignItems: "center",
        gap: 5,
        background: "transparent",
        border: "1px solid",
        borderColor: active ? CITY_COLORS[city] : "#1C2438",
        borderRadius: 3,
        padding: "3px 8px",
        cursor: "pointer",
        transition: "border-color 0.12s, opacity 0.12s",
        opacity: active ? 1 : 0.4,
      }}
    >
      <span style={{ width: 6, height: 6, background: CITY_COLORS[city], display: "block", borderRadius: 1 }} />
      <span style={{ fontSize: 9, color: active ? CITY_COLORS[city] : "#334155", letterSpacing: "0.1em", fontFamily: "var(--font-geist-mono)" }}>
        {city.toUpperCase()}
      </span>
    </button>
  )
}

// ── Root ──────────────────────────────────────────────────────────────────────
export default function VisxEvolutionChart() {
  const [activeCities, setActiveCities] = useState<string[]>(["Lisboa", "Viena", "Barcelona", "Paris"])
  const [hovered, setHovered] = useState<HoverInfo | null>(null)
  const [ref, bounds] = useMeasure()

  const toggle = useCallback((city: string) => {
    setActiveCities((prev) =>
      prev.includes(city)
        ? prev.length > 1 ? prev.filter((c) => c !== city) : prev
        : [...prev, city]
    )
  }, [])

  return (
    <div style={{ height: "100%", display: "flex", flexDirection: "column" }}>
      {/* Header */}
      <span style={{
        fontSize: 10,
        textTransform: "uppercase",
        letterSpacing: "0.2em",
        color: "#64748B",
        marginBottom: 12,
        display: "block",
      }}>
        ── EVOLUÇÃO — Nº REUNIÕES 2016–2024 ──
      </span>

      {/* City filter */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 14 }}>
        {ALL_CITIES.map((city) => (
          <CityToggle
            key={city}
            city={city}
            active={activeCities.includes(city)}
            onToggle={() => toggle(city)}
          />
        ))}
      </div>

      {/* Chart */}
      <div ref={ref} style={{ flex: 1, minHeight: 0, position: "relative" }}>
        {bounds.width > 0 && (
          <ChartInner
            width={bounds.width}
            height={bounds.height}
            activeCities={activeCities}
            onHover={setHovered}
            hovered={hovered}
          />
        )}
        <AnimatePresence>
          {hovered && <Tooltip key="tooltip" info={hovered} activeCities={activeCities} />}
        </AnimatePresence>
      </div>
    </div>
  )
}
