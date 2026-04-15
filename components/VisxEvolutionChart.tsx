"use client"

import { useCallback, useMemo, useState } from "react"
import { AnimatePresence, motion } from "motion/react"
import { localPoint } from "@visx/event"
import { curveMonotoneX } from "@visx/curve"
import { GridRows } from "@visx/grid"
import { scaleLinear, scaleTime } from "@visx/scale"
import { LinePath } from "@visx/shape"
import { bisector, extent } from "d3-array"
import useMeasure from "react-use-measure"
import { historicalData } from "@/lib/data"

// ── Palette — terminal, restrained ───────────────────────────────────────────
const CITY_COLORS: Record<string, string> = {
  Lisboa:    "#10B981", // emerald — hero
  Viena:     "#60A5FA", // blue-400
  Barcelona: "#FBBF24", // amber-400
  Paris:     "#C084FC", // violet-400
  Singapura: "#F87171", // red-400
  Madrid:    "#6B7280", // gray-500
  Berlim:    "#94A3B8", // slate-400
  Praga:     "#38BDF8", // sky-400
  Seul:      "#FB923C", // orange-400
  Atenas:    "#86EFAC", // green-300
}

const ALL_CITIES = Object.keys(CITY_COLORS)
const DEFAULT_ACTIVE = ["Lisboa", "Viena", "Barcelona", "Paris"]

// ── Data ──────────────────────────────────────────────────────────────────────
type DataPoint = { date: Date; [city: string]: number | null | Date }

const YEARS = [2016, 2018, 2022, 2023, 2024]

function buildSeries(): DataPoint[] {
  return YEARS.map((year) => {
    const point: DataPoint = { date: new Date(year, 0, 1) }
    for (const city of ALL_CITIES) {
      const entry = historicalData.find((d) => d.year === year && d.city === city)
      point[city] = entry?.meetings ?? null
    }
    return point
  })
}

const SERIES = buildSeries()

// ── Types ─────────────────────────────────────────────────────────────────────
type HoverInfo = {
  x: number
  y: number
  date: Date
  values: Record<string, number | null>
}

// ── Constants ─────────────────────────────────────────────────────────────────
const MARGIN = { top: 12, right: 20, bottom: 32, left: 40 }
const bisectDate = bisector<DataPoint, Date>((d) => d.date).left

// ── Chart SVG ─────────────────────────────────────────────────────────────────
function ChartInner({
  width,
  height,
  activeCities,
  onHover,
  hovered,
}: {
  width: number
  height: number
  activeCities: string[]
  onHover: (info: HoverInfo | null) => void
  hovered: HoverInfo | null
}) {
  const innerW = width - MARGIN.left - MARGIN.right
  const innerH = height - MARGIN.top - MARGIN.bottom

  const dates = SERIES.map((d) => d.date)

  const allValues = useMemo(
    () =>
      SERIES.flatMap((d) =>
        activeCities.map((c) => d[c])
      ).filter((v): v is number => v !== null),
    [activeCities]
  )

  const xScale = useMemo(
    () => scaleTime({ range: [0, innerW], domain: extent(dates) as [Date, Date] }),
    [innerW, dates]
  )

  const yMax = useMemo(() => Math.max(...allValues, 80), [allValues])
  const yScale = useMemo(
    () => scaleLinear({ range: [innerH, 0], domain: [0, yMax * 1.15], nice: true }),
    [innerH, yMax]
  )

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<SVGRectElement>) => {
      const pt = localPoint(e)
      if (!pt) return
      const mx = pt.x - MARGIN.left
      const dateAtX = xScale.invert(mx)
      const idx = bisectDate(SERIES, dateAtX, 1)
      const d0 = SERIES[idx - 1]
      const d1 = SERIES[idx]
      const nearest =
        d1 && Math.abs(+dateAtX - +d1.date) < Math.abs(+dateAtX - +d0.date) ? d1 : d0
      if (!nearest) return
      crosshairX.current = xScale(nearest.date) + MARGIN.left
      const values: Record<string, number | null> = {}
      for (const c of activeCities) values[c] = nearest[c] as number | null
      onHover({ x: crosshairX.current, y: pt.y, date: nearest.date, values })
    },
    [xScale, activeCities, onHover]
  )

  // We use a ref-style trick — just expose crosshairX via the hovered.x
  const crosshairX = { current: hovered ? hovered.x - MARGIN.left : 0 }

  if (innerW <= 0 || innerH <= 0) return null

  const yTicks = yScale.ticks(4)
  const xTicks = SERIES.map((d) => d.date)

  return (
    <svg width={width} height={height} style={{ display: "block" }}>
      <g transform={`translate(${MARGIN.left},${MARGIN.top})`}>
        {/* Subtle horizontal grid */}
        <GridRows
          scale={yScale}
          width={innerW}
          numTicks={4}
          stroke="#1C2438"
          strokeOpacity={0.8}
          strokeDasharray="2 5"
        />

        {/* Lines — one per active city */}
        {activeCities.map((city) => {
          const pts = SERIES.filter((d) => d[city] !== null)
          if (pts.length < 2) return null
          return (
            <LinePath
              key={city}
              data={pts}
              x={(d) => xScale(d.date)}
              y={(d) => yScale(d[city] as number)}
              stroke={CITY_COLORS[city]}
              strokeWidth={city === "Lisboa" ? 2.5 : 1.5}
              strokeOpacity={city === "Lisboa" ? 1 : 0.75}
              curve={curveMonotoneX}
            />
          )
        })}

        {/* Single data point cities — just a cross marker */}
        {activeCities.map((city) => {
          const pts = SERIES.filter((d) => d[city] !== null)
          if (pts.length !== 1) return null
          const px = xScale(pts[0].date)
          const py = yScale(pts[0][city] as number)
          return (
            <g key={`single-${city}`}>
              <line x1={px - 5} y1={py} x2={px + 5} y2={py} stroke={CITY_COLORS[city]} strokeWidth={1.5} />
              <line x1={px} y1={py - 5} x2={px} y2={py + 5} stroke={CITY_COLORS[city]} strokeWidth={1.5} />
            </g>
          )
        })}

        {/* Dots at real data points */}
        {activeCities.map((city) =>
          SERIES.filter((d) => d[city] !== null).map((d) => (
            <circle
              key={`dot-${city}-${d.date.getFullYear()}`}
              cx={xScale(d.date)}
              cy={yScale(d[city] as number)}
              r={city === "Lisboa" ? 3 : 2}
              fill={CITY_COLORS[city]}
              opacity={city === "Lisboa" ? 1 : 0.7}
            />
          ))
        )}

        {/* Crosshair vertical */}
        {hovered && (
          <line
            x1={hovered.x - MARGIN.left}
            x2={hovered.x - MARGIN.left}
            y1={0}
            y2={innerH}
            stroke="#334155"
            strokeWidth={1}
            strokeDasharray="3 4"
          />
        )}

        {/* Y axis */}
        {yTicks.map((tick) => (
          <text
            key={tick}
            x={-8}
            y={yScale(tick)}
            textAnchor="end"
            dominantBaseline="middle"
            fill="#334155"
            fontSize={9}
            fontFamily="var(--font-geist-mono)"
            letterSpacing="0.05em"
          >
            {tick}
          </text>
        ))}

        {/* X axis */}
        {xTicks.map((t) => (
          <text
            key={t.getFullYear()}
            x={xScale(t)}
            y={innerH + 20}
            textAnchor="middle"
            fill="#334155"
            fontSize={9}
            fontFamily="var(--font-geist-mono)"
            letterSpacing="0.08em"
          >
            {t.getFullYear()}
          </text>
        ))}

        {/* Baseline */}
        <line x1={0} y1={innerH} x2={innerW} y2={innerH} stroke="#1C2438" strokeWidth={1} />
        <line x1={0} y1={0} x2={0} y2={innerH} stroke="#1C2438" strokeWidth={1} />

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
  const entries = activeCities
    .filter((c) => info.values[c] !== null)
    .sort((a, b) => (info.values[b] ?? 0) - (info.values[a] ?? 0))

  if (entries.length === 0) return null

  return (
    <motion.div
      initial={{ opacity: 0, y: 3 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.1 }}
      style={{
        position: "absolute",
        left: info.x + 14,
        top: Math.max(8, info.y - 40),
        background: "#0A0D14",
        border: "1px solid #1C2438",
        borderRadius: 4,
        padding: "8px 12px",
        pointerEvents: "none",
        zIndex: 20,
        minWidth: 110,
      }}
    >
      <div style={{
        fontSize: 9,
        color: "#64748B",
        letterSpacing: "0.15em",
        marginBottom: 7,
        fontFamily: "var(--font-geist-mono)",
      }}>
        {info.date.getFullYear()}
      </div>
      {entries.map((city) => (
        <div key={city} style={{ display: "flex", alignItems: "center", gap: 7, marginBottom: 4 }}>
          <span style={{
            width: 6, height: 6,
            background: CITY_COLORS[city],
            borderRadius: 1,
            display: "block",
            flexShrink: 0,
          }} />
          <span style={{ fontSize: 9, color: "#64748B", width: 56, fontFamily: "var(--font-geist-mono)" }}>
            {city.toUpperCase()}
          </span>
          <span style={{
            fontSize: 10,
            color: city === "Lisboa" ? "#10B981" : "#F1F5F9",
            fontFamily: "var(--font-geist-mono)",
            fontVariantNumeric: "tabular-nums",
            marginLeft: "auto",
            paddingLeft: 6,
          }}>
            {info.values[city]}
          </span>
        </div>
      ))}
    </motion.div>
  )
}

// ── Toggle button ─────────────────────────────────────────────────────────────
function CityToggle({
  city,
  active,
  onToggle,
}: {
  city: string
  active: boolean
  onToggle: () => void
}) {
  const color = CITY_COLORS[city]
  return (
    <button
      onClick={onToggle}
      style={{
        display: "flex",
        alignItems: "center",
        gap: 5,
        background: active ? `${color}10` : "transparent",
        border: `1px solid ${active ? color : "#1C2438"}`,
        borderRadius: 3,
        padding: "3px 8px",
        cursor: "pointer",
        transition: "all 0.1s",
        opacity: active ? 1 : 0.45,
        fontFamily: "var(--font-geist-mono)",
      }}
    >
      <span style={{
        width: 6, height: 6,
        background: color,
        borderRadius: 1,
        display: "block",
        flexShrink: 0,
      }} />
      <span style={{
        fontSize: 9,
        color: active ? color : "#334155",
        letterSpacing: "0.12em",
      }}>
        {city.toUpperCase()}
      </span>
    </button>
  )
}

// ── Root ──────────────────────────────────────────────────────────────────────
export default function VisxEvolutionChart() {
  const [activeCities, setActiveCities] = useState<string[]>(DEFAULT_ACTIVE)
  const [hovered, setHovered] = useState<HoverInfo | null>(null)
  const [ref, bounds] = useMeasure()

  const toggle = useCallback((city: string) => {
    setActiveCities((prev) =>
      prev.includes(city)
        ? prev.length > 1
          ? prev.filter((c) => c !== city)
          : prev
        : [...prev, city]
    )
  }, [])

  return (
    <div style={{ height: "100%", display: "flex", flexDirection: "column" }}>
      <span style={{
        fontSize: 10,
        textTransform: "uppercase",
        letterSpacing: "0.2em",
        color: "#64748B",
        marginBottom: 12,
        display: "block",
        fontFamily: "var(--font-geist-mono)",
      }}>
        ── EVOLUÇÃO — Nº REUNIÕES 2016–2024 ──
      </span>

      <div style={{ display: "flex", flexWrap: "wrap", gap: 5, marginBottom: 14 }}>
        {ALL_CITIES.map((city) => (
          <CityToggle
            key={city}
            city={city}
            active={activeCities.includes(city)}
            onToggle={() => toggle(city)}
          />
        ))}
      </div>

      <div ref={ref} style={{ flex: 1, minHeight: 0, position: "relative" }}>
        {bounds.width > 0 && bounds.height > 0 && (
          <ChartInner
            width={bounds.width}
            height={bounds.height}
            activeCities={activeCities}
            onHover={setHovered}
            hovered={hovered}
          />
        )}
        <AnimatePresence>
          {hovered && (
            <Tooltip key="tt" info={hovered} activeCities={activeCities} />
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
