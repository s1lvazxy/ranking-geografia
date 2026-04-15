// /lib/data.ts

export type CityRanking = {
  rank: number
  city: string
  country: string
  meetings: number
  europeRank: number | null
  note?: string
  highlight?: boolean
}

export type HistoricalEntry = {
  year: number
  city: string
  meetings: number | null
  worldRank: number | null
}

export type PortugalCity = {
  city: string
  meetings: number
  worldRank: number
  europeRank: number
  note: string
}

export type PortugalEvolution = {
  year: number
  lisboaMeetings: number | null
  lisboaWorldRank: number | null
  portoMeetings: number | null
  portoWorldRank: number | null
  portugalTotal: number | null
}

export type CountryRanking = {
  rank: number
  country: string
  meetings: number | null
  note?: string
  highlight?: boolean
}

export type ContextStat = {
  label: string
  value: string
  context: string
}

export type GlobalTotals = {
  year: number
  totalMeetings: number | null
  note?: string
}

export type CriticalDimension = {
  dimension: string
  iccaMeasures: boolean
  alternative: string
  differentResult: string
}

// ── TABELA 1 — Top 10 Cidades Mundiais 2024 ──────────────────────────────────
export const top10Cities2024: CityRanking[] = [
  { rank: 1,  city: "Viena",       country: "Áustria",       meetings: 154, europeRank: 1,    note: "Sobe do 4.º lugar em 2022" },
  { rank: 2,  city: "Lisboa",      country: "Portugal",      meetings: 153, europeRank: 2,    note: "5.º ano consecutivo no Top 2 europeu", highlight: true },
  { rank: 3,  city: "Singapura",   country: "Singapura",     meetings: 144, europeRank: null, note: "Desce do 2.º lugar" },
  { rank: 4,  city: "Barcelona",   country: "Espanha",       meetings: 142, europeRank: 3,    note: "2.º em média de participantes" },
  { rank: 5,  city: "Praga",       country: "Rep. Checa",    meetings: 131, europeRank: 4 },
  { rank: 6,  city: "Paris",       country: "França",        meetings: 124, europeRank: 5,    note: "Desce do 1.º — impacto dos JO 2024" },
  { rank: 6,  city: "Seul",        country: "Coreia do Sul", meetings: 124, europeRank: null, note: "Sobe 3 lugares" },
  { rank: 8,  city: "Banguecoque", country: "Tailândia",     meetings: 115, europeRank: null, note: "Entra no Top 10" },
  { rank: 9,  city: "Roma",        country: "Itália",        meetings: 114, europeRank: 6,    note: "Sobe 2 lugares" },
  { rank: 10, city: "Atenas",      country: "Grécia",        meetings: 111, europeRank: 7,    note: "Entra no Top 10; saem Madrid e Dublim" },
]

// ── TABELA 2 — Evolução Histórica Top Cidades 2016–2024 ──────────────────────
export const historicalData: HistoricalEntry[] = [
  // Viena
  { year: 2016, city: "Viena",       meetings: 182,  worldRank: 3 },
  { year: 2018, city: "Viena",       meetings: 190,  worldRank: 2 },
  { year: 2022, city: "Viena",       meetings: 162,  worldRank: 1 },
  { year: 2023, city: "Viena",       meetings: null,  worldRank: 4 },
  { year: 2024, city: "Viena",       meetings: 154,  worldRank: 1 },
  // Lisboa
  { year: 2016, city: "Lisboa",      meetings: 125,  worldRank: 9 },
  { year: 2018, city: "Lisboa",      meetings: null,  worldRank: 7 },
  { year: 2022, city: "Lisboa",      meetings: 144,  worldRank: 2 },
  { year: 2023, city: "Lisboa",      meetings: 138,  worldRank: 3 },
  { year: 2024, city: "Lisboa",      meetings: 153,  worldRank: 2 },
  // Barcelona
  { year: 2016, city: "Barcelona",   meetings: 179,  worldRank: 4 },
  { year: 2018, city: "Barcelona",   meetings: null,  worldRank: 4 },
  { year: 2022, city: "Barcelona",   meetings: 133,  worldRank: 4 },
  { year: 2023, city: "Barcelona",   meetings: null,  worldRank: 5 },
  { year: 2024, city: "Barcelona",   meetings: 142,  worldRank: 4 },
  // Paris
  { year: 2016, city: "Paris",       meetings: 204,  worldRank: 1 },
  { year: 2018, city: "Paris",       meetings: 240,  worldRank: 1 },
  { year: 2022, city: "Paris",       meetings: 134,  worldRank: 3 },
  { year: 2023, city: "Paris",       meetings: null,  worldRank: 1 },
  { year: 2024, city: "Paris",       meetings: 124,  worldRank: 6 },
  // Singapura
  { year: 2016, city: "Singapura",   meetings: 175,  worldRank: 6 },
  { year: 2018, city: "Singapura",   meetings: null,  worldRank: 6 },
  { year: 2022, city: "Singapura",   meetings: null,  worldRank: 5 },
  { year: 2023, city: "Singapura",   meetings: null,  worldRank: 2 },
  { year: 2024, city: "Singapura",   meetings: 144,  worldRank: 3 },
  // Madrid
  { year: 2016, city: "Madrid",      meetings: 186,  worldRank: 2 },
  { year: 2018, city: "Madrid",      meetings: null,  worldRank: 3 },
  { year: 2022, city: "Madrid",      meetings: 128,  worldRank: 6 },
  { year: 2023, city: "Madrid",      meetings: null,  worldRank: 8 },
  { year: 2024, city: "Madrid",      meetings: null,  worldRank: 11 },
  // Berlim
  { year: 2016, city: "Berlim",      meetings: 178,  worldRank: 5 },
  { year: 2018, city: "Berlim",      meetings: null,  worldRank: 5 },
  { year: 2022, city: "Berlim",      meetings: 113,  worldRank: 7 },
  { year: 2023, city: "Berlim",      meetings: null,  worldRank: null },
  { year: 2024, city: "Berlim",      meetings: null,  worldRank: null },
  // Praga
  { year: 2016, city: "Praga",       meetings: null,  worldRank: null },
  { year: 2018, city: "Praga",       meetings: null,  worldRank: null },
  { year: 2022, city: "Praga",       meetings: 129,  worldRank: 5 },
  { year: 2023, city: "Praga",       meetings: null,  worldRank: 6 },
  { year: 2024, city: "Praga",       meetings: 131,  worldRank: 5 },
  // Seul
  { year: 2016, city: "Seul",        meetings: 125,  worldRank: 9 },
  { year: 2018, city: "Seul",        meetings: null,  worldRank: null },
  { year: 2022, city: "Seul",        meetings: null,  worldRank: null },
  { year: 2023, city: "Seul",        meetings: null,  worldRank: 9 },
  { year: 2024, city: "Seul",        meetings: 124,  worldRank: 6 },
  // Atenas
  { year: 2016, city: "Atenas",      meetings: null,  worldRank: null },
  { year: 2018, city: "Atenas",      meetings: null,  worldRank: null },
  { year: 2022, city: "Atenas",      meetings: 109,  worldRank: 8 },
  { year: 2023, city: "Atenas",      meetings: null,  worldRank: null },
  { year: 2024, city: "Atenas",      meetings: 111,  worldRank: 10 },
]

// ── TABELA 3 — Lisboa e Porto: Evolução Detalhada ────────────────────────────
export const portugalEvolution: PortugalEvolution[] = [
  { year: 2016, lisboaMeetings: 125, lisboaWorldRank: 9,  portoMeetings: null, portoWorldRank: null, portugalTotal: null },
  { year: 2019, lisboaMeetings: 170, lisboaWorldRank: 3,  portoMeetings: 63,   portoWorldRank: 39,   portugalTotal: 342 },
  { year: 2022, lisboaMeetings: 144, lisboaWorldRank: 2,  portoMeetings: 54,   portoWorldRank: 27,   portugalTotal: 294 },
  { year: 2023, lisboaMeetings: 138, lisboaWorldRank: 3,  portoMeetings: 50,   portoWorldRank: 23,   portugalTotal: 270 },
  { year: 2024, lisboaMeetings: 153, lisboaWorldRank: 2,  portoMeetings: 59,   portoWorldRank: 34,   portugalTotal: 290 },
]

export const portugalCities: PortugalCity[] = [
  { city: "Lisboa", meetings: 153, worldRank: 2,  europeRank: 2,  note: "5.º ano consecutivo no Top 2 europeu" },
  { city: "Porto",  meetings: 59,  worldRank: 34, europeRank: 22, note: "Acolhe 64.º Congresso ICCA nov. 2025" },
]

// ── TABELA 4 — Top 10 Países 2024 ────────────────────────────────────────────
export const top10Countries2024: CountryRanking[] = [
  { rank: 1,  country: "Estados Unidos", meetings: 709,  note: "Líder ininterrupto desde pelo menos 1995" },
  { rank: 2,  country: "Itália",         meetings: 635 },
  { rank: 3,  country: "Espanha",        meetings: 536,  note: "Barcelona no Top 5 cidades" },
  { rank: 4,  country: "Alemanha",       meetings: null },
  { rank: 5,  country: "Reino Unido",    meetings: null, note: "Sobe ao 5.º, acima de França" },
  { rank: 6,  country: "Japão",          meetings: null },
  { rank: 7,  country: "Países Baixos",  meetings: 295,  note: "Amesterdão 17.º mundial · €230M impacto" },
  { rank: 8,  country: "França",         meetings: null, note: "JO 2024 limitaram Paris" },
  { rank: 9,  country: "Portugal",       meetings: 290,  note: "7.º europeu · Lisboa 2.º · Porto 34.º", highlight: true },
  { rank: 10, country: "Canadá",         meetings: null },
]

// ── TABELA 5 — Contexto Global ────────────────────────────────────────────────
export const contextStats: ContextStat[] = [
  { label: "Total reuniões 2024",              value: "11.099",         context: "+9% vs 2023, mas −16,3% vs pico 2019 (13.269)" },
  { label: "Pico histórico global",            value: "13.269 (2019)",  context: "Setor ainda em recuperação pós-COVID" },
  { label: "Impacto económico direto",         value: "USD 11,6B",      context: "Gerado pelo turismo de congressos em 2024" },
  { label: "Gasto médio por delegado",         value: "USD 3.127",      context: "+24% vs 2015 (USD 2.518); −18% vs 2022 (USD 3.832)" },
  { label: "Quota reuniões médias (150–999)",  value: "53%",            context: "Contribuem USD 5,5B (47,4% do impacto total)" },
  { label: "Reuniões grandes (1.000+)",        value: "8% do total",    context: "Mas geram 59,4% do impacto económico (USD 6,9B)" },
  { label: "Cidade com maior média part.",     value: "Dubai · 899/ev", context: "Lisboa lidera entre congressos com +1.000 delegados" },
  { label: "Setores dominantes",               value: "Méd · Tec · Ci", context: "~44% de todas as reuniões; estáveis há +10 anos" },
  { label: "Regiões com crescimento 2022–24",  value: "Lat. Am + MO",   context: "Únicas regiões com crescimento ano a ano" },
  { label: "Portugal Events — candidaturas",   value: "238 em 2024",    context: "+63 vs 2023 · ~€800k em incentivos atribuídos" },
]

export const globalTotals: GlobalTotals[] = [
  { year: 2012, totalMeetings: 11150 },
  { year: 2016, totalMeetings: 12000 },
  { year: 2017, totalMeetings: 12563 },
  { year: 2018, totalMeetings: 12937 },
  { year: 2019, totalMeetings: 13269, note: "Pico histórico" },
  { year: 2020, totalMeetings: 8500,  note: "COVID-19 — inclui virtual/híbrido" },
  { year: 2021, totalMeetings: 10000, note: "Recuperação — inclui híbrido" },
  { year: 2022, totalMeetings: 10500 },
  { year: 2023, totalMeetings: 10177 },
  { year: 2024, totalMeetings: 11099, note: "−16,3% vs 2019" },
]

// ── TABELA 6 — Análise Crítica: O que o ranking NÃO mede ─────────────────────
export const criticalDimensions: CriticalDimension[] = [
  {
    dimension: "Reuniões sem rotação entre países",
    iccaMeasures: false,
    alternative: "UIA (Union of Intl. Associations)",
    differentResult: "UIA 2023: Bruxelas 1.º (620 reuniões), Viena 2.º (298) — vs ICCA: Viena 1.º",
  },
  {
    dimension: "Reuniões corporativas e governamentais",
    iccaMeasures: false,
    alternative: "Vienna Convention Bureau (dados próprios)",
    differentResult: "Viena conta 781 congressos internacionais vs 154 contabilizados pela ICCA",
  },
  {
    dimension: "Reuniões com menos de 50 participantes",
    iccaMeasures: false,
    alternative: "Dados nacionais de turismo",
    differentResult: "Subestima destinos com muitos eventos pequenos e especializados",
  },
  {
    dimension: "Impacto económico real por cidade",
    iccaMeasures: false,
    alternative: "Oxford Economics / dados locais",
    differentResult: "Amesterdão: €230M de impacto verificado — não capturado no ranking de posições",
  },
  {
    dimension: "Eventos virtuais e híbridos",
    iccaMeasures: false,
    alternative: "—",
    differentResult: "2020–2021 inflacionados por contabilização híbrida; metodologia mudou em 2022",
  },
]

// ── FONTES ────────────────────────────────────────────────────────────────────
export const sources = [
  { label: "ICCA GlobeWatch 2024 (fonte primária)",    url: "https://www.iccaworld.org/news/post/icca-releases-icca-globewatch-business-analytics-country-city-rankings-2024-at-imex-frankfurt/" },
  { label: "ICCA GlobeWatch 2024 (PDF público)",       url: "https://s3.ap-northeast-1.amazonaws.com/content.osaka-info.jp/mice/release/ICCA+Globe+Watch_Business+Analytics+2024.pdf" },
  { label: "Turismo de Portugal (oficial)",            url: "https://www.turismodeportugal.pt/pt/Noticias/Paginas/portugal-em-destaque-ranking-icca.aspx" },
  { label: "Notícias ao Minuto",                       url: "https://www.noticiasaominuto.com/economia/2790370/lisboa-foi-por-pouco-a-2-cidade-com-mais-congressos-no-mundo-em-2024" },
  { label: "Skift Meetings (análise crítica)",         url: "https://meetings.skift.com/2025/05/29/top-destinations-for-association-meetings/" },
  { label: "Focus on Travel News",                     url: "https://ftnnews.com/travel-news/mice/icca-country-and-city-rankings-2024-reveal-global-meeting-leaders/" },
  { label: "Travel Daily News",                        url: "https://www.traveldailynews.com/mice-industry/icca-unveiled-2024-country-and-city-rankings-which-cities-claim-the-top/" },
  { label: "Conference & Meetings World",              url: "https://www.c-mw.net/the-usa-and-vienna-top-the-2024-icca-country-and-city-rankings/" },
  { label: "I Amsterdam (Países Baixos)",              url: "https://www.iamsterdam.com/en/conventions/amsterdam-solidifies-top-position-in-2024-icca-ranking" },
  { label: "Vienna Convention Bureau",                 url: "https://meeting.vienna.info" },
]
