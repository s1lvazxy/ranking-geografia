export const tokens = {
  colors: {
    bg: "#0A0D14",
    surface: "#111520",
    border: "#1C2438",
    accent: "#3B82F6",
    accentPt: "#10B981",
    textPrimary: "#F1F5F9",
    textSecondary: "#64748B",
    textMuted: "#334155",
  },
  fonts: {
    mono: "Geist Mono",
  },
} as const

export type Tokens = typeof tokens
