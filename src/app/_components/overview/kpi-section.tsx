"use client"

// ============================================================
// KPISection — Tampilan Hasil Simulasi Monte Carlo
// ============================================================
// Perubahan dari versi sebelumnya:
//   + Terima prop `result` dari parent (OverviewClient)
//   + Kalau result null → tampilkan data default (placeholder)
//   + Kalau result ada → tampilkan angka hasil simulasi sesungguhnya
// ============================================================

import React from "react"
import { type SimResult } from "@/lib/monte-carlo"

// Props yang diterima dari parent
type Props = {
  result: SimResult | null  // null = belum ada simulasi yang dijalankan
}

// ---- Helper: Format Rupiah ----
// Contoh: 285400 → "285.400"
function formatRp(value: number): string {
  return Math.round(value).toLocaleString("id-ID")
}

// ---- Data Default (sebelum simulasi dijalankan) ----
// Ini yang tampil saat halaman baru dibuka
const DEFAULT: SimResult = {
  mean:           285_400,
  p5:             245_000,
  p95:            335_000,
  trafficPenalty:  75_200,
  budgetSafety:    78.4,
  histogramBars:  [2,3,5,8,12,16,22,28,38,48,58,68,76,88,98,92,100,94,90,80,68,56,44,34,26,18,12,8,5,3,2],
  xAxisLabels:    ["Rp 180k","Rp 220k","Rp 260k","Rp 300k","Rp 340k","Rp 380k"],
  meanPercent:    52,
  p95Percent:     74,
}

export default function KPISection({ result }: Props) {
  // Pakai hasil simulasi jika ada, kalau belum pakai default
  const data = result ?? DEFAULT

  // Path SVG untuk kurva densitas probabilitas (smooth line)
  const smoothCurvePath =
    "M 40 285 C 120 282 220 260 320 215 C 400 170 460 70 520 65 C 580 65 640 160 720 215 C 800 260 900 282 960 285"

  return (
    <div className="space-y-4 w-full">
      {/* ===== 1. Grid 4 KPI Summary Cards ===== */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-3 sm:gap-4">

        {/* Card 1: Expected Monthly Cost */}
        <div className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-xs flex flex-col justify-between">
          <div className="space-y-3">
            <span className="text-xs sm:text-sm font-medium text-slate-500">
              Estimasi Biaya Bulanan
            </span>
            {/* Angka dari simulasi — berubah tiap run */}
            <div className="text-2xl sm:text-[1.75rem] font-bold tracking-tight text-slate-900 font-mono">
              Rp {formatRp(data.mean)}
            </div>
          </div>
          <div className="pt-4">
            <span className="inline-flex items-center rounded-full bg-orange-sm px-2.5 py-0.5 text-xs font-semibold text-orange-xl">
              Mean E[X]
            </span>
          </div>
        </div>

        {/* Card 2: 95% Confidence Range */}
        <div className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-xs flex flex-col justify-between">
          <div className="space-y-3">
            <span className="text-xs sm:text-sm font-medium text-slate-500">
              Rentang 95% Confidence
            </span>
            <div className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 font-mono">
              Rp {Math.round(data.p5 / 1000)}k{" "}
              <span className="font-sans font-normal text-slate-400">–</span>{" "}
              Rp {Math.round(data.p95 / 1000)}k
            </div>
          </div>
          <div className="pt-4 text-xs font-medium text-slate-500">
            Kemungkinan Pengeluaran Terbaik sampai Terburuk
          </div>
        </div>

        {/* Card 3: Traffic Congestion Penalty */}
        <div className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-xs flex flex-col justify-between">
          <div className="space-y-3">
            <span className="text-xs sm:text-sm font-medium text-slate-500">
              Biaya Tambahan Macet
            </span>
            <div className="text-2xl sm:text-[1.75rem] font-bold tracking-tight text-slate-900 font-mono">
              Rp {formatRp(data.trafficPenalty)}
            </div>
          </div>
          <div className="pt-4 text-xs font-medium text-slate-500">
            {/* Hitung % penalty dari total */}
            {data.mean > 0
              ? `${((data.trafficPenalty / data.mean) * 100).toFixed(1)}% of total fuel cost`
              : "—"}
          </div>
        </div>

        {/* Card 4: Budget Safety Probability */}
        <div className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-xs flex flex-col justify-between">
          <div className="space-y-3">
            <span className="text-xs sm:text-sm font-medium text-slate-500">
              Probabilitas Aman Budget
            </span>
            <div className="text-2xl sm:text-[1.75rem] font-bold tracking-tight text-slate-900 font-mono">
              {data.budgetSafety.toFixed(1)}%
            </div>
          </div>
          <div className="pt-4 text-xs font-medium text-slate-500">
            Chance of staying ≤ Rp {Math.round((result?.p95 ?? 300_000) / 1000)}k
          </div>
        </div>

      </div>

      {/* ===== 2. Main Card: Probability Distribution Chart ===== */}
      <div className="rounded-2xl border border-slate-200/80 bg-white p-5 sm:p-6 shadow-xs">
        {/* Header & Badges */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div>
            <h2 className="text-lg sm:text-xl font-bold tracking-tight text-slate-900">
              Distribusi Probabilitas Biaya BBM Bulanan
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
              N = 5.000 Percobaan · Berdasarkan asumsi komuter lo saat ini
            </p>
          </div>
          <span className="self-start sm:self-auto rounded-full bg-orange-sm px-3.5 py-1 text-xs font-semibold text-orange-xl">
            Monte Carlo
          </span>
        </div>

        {/* Legend */}
        <div className="flex items-center gap-6 mt-4 text-xs font-medium text-slate-600">
          <div className="flex items-center gap-2">
            <span className="size-3 rounded-xs bg-orange-md" />
            <span>Simulated outcomes</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="h-0.5 w-4 bg-orange-lg rounded-full" />
            <span>Probability density</span>
          </div>
        </div>

        {/* Chart */}
        <div className="mt-6 w-full overflow-x-auto">
          <div className="min-w-155 relative pt-6 pb-2">

            {/* Markers: Mean & P95 — posisinya dinamis dari hasil simulasi */}
            <div className="absolute top-0 left-0 right-0 h-6 pointer-events-none">
              {/* Mean Marker */}
              <div
                className="absolute -translate-x-1/2 flex flex-col items-center"
                style={{ left: `${data.meanPercent}%` }}
              >
                <div className="rounded-full bg-orange-sm px-2.5 py-0.5 text-[11px] font-semibold text-orange-xl shadow-2xs whitespace-nowrap border border-amber-200/50">
                  Mean (Rp {Math.round(data.mean / 1000)}k)
                </div>
              </div>

              {/* 95th Percentile Marker */}
              <div
                className="absolute -translate-x-1/2 flex flex-col items-center"
                style={{ left: `${data.p95Percent}%` }}
              >
                <div className="rounded-full bg-slate-100 px-2.5 py-0.5 text-[11px] font-semibold text-slate-700 shadow-2xs whitespace-nowrap border border-slate-200/60">
                  95th Percentile (Rp {Math.round(data.p95 / 1000)}k)
                </div>
              </div>
            </div>

            {/* Chart Body */}
            <div className="relative h-60 w-full mt-2">
              {/* Horizontal Gridlines & Y-Axis Labels */}
              <div className="absolute inset-0 flex flex-col justify-between pointer-events-none text-[11px] font-medium text-slate-400">
                {["500", "375", "250", "125", "0"].map((label) => (
                  <div key={label} className="flex items-center w-full">
                    <span className="w-8 shrink-0">{label}</span>
                    <div className={`h-px w-full ${label === "0" ? "bg-slate-200" : "bg-slate-100"}`} />
                  </div>
                ))}
              </div>

              {/* Vertical Dashed Lines for Markers */}
              <div
                className="absolute top-0 bottom-0 w-px border-l-2 border-dashed border-amber-400/80 pointer-events-none"
                style={{ left: `${data.meanPercent}%` }}
              />
              <div
                className="absolute top-0 bottom-0 w-px border-l-2 border-dashed border-slate-300 pointer-events-none"
                style={{ left: `${data.p95Percent}%` }}
              />

              {/* Histogram Bars — dari data simulasi */}
              <div className="absolute inset-0 pl-10 pr-2 flex items-end justify-between gap-1 pointer-events-none">
                {data.histogramBars.map((val, idx) => (
                  <div
                    key={idx}
                    className="flex-1 bg-orange-md rounded-t-xs hover:bg-orange-lg transition-colors"
                    style={{ height: `${val * 0.9}%` }}
                  />
                ))}
              </div>

              {/* SVG Probability Density Curve */}
              <svg
                className="absolute inset-0 pl-10 pr-2 h-full w-full pointer-events-none overflow-visible"
                viewBox="0 0 1000 300"
                preserveAspectRatio="none"
              >
                <path
                  d={smoothCurvePath}
                  fill="none"
                  stroke="#FFA001"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                />
              </svg>
            </div>

            {/* X-Axis Labels — dari data simulasi */}
            <div className="flex justify-between pl-10 pr-2 pt-3 text-[11px] font-mono text-slate-500">
              {data.xAxisLabels.map((label) => (
                <span key={label}>{label}</span>
              ))}
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="my-4 border-t border-slate-100" />

        {/* Footer Statement */}
        <p className="text-xs sm:text-sm font-medium text-slate-700">
          <span className="font-semibold text-slate-900">
            {data.budgetSafety.toFixed(1)}%
          </span>{" "}
          of simulated months stay within your Rp{" "}
          {formatRp(result ? Number(String(result.p95).slice(0, -3)) * 1000 : 300_000)} budget.
        </p>
      </div>

      {/* ===== 3. Callout Box ===== */}
      <div className="rounded-2xl border border-amber-200/60 bg-orange-sm p-5 shadow-2xs space-y-1">
        <h3 className="text-sm sm:text-base font-bold text-slate-900">
          Sedikit cadangan, beda banget hasilnya.
        </h3>
        <p className="text-xs sm:text-sm text-slate-700">
          Sisihkan Rp {formatRp(data.p95)} buat nutup kemungkinan bulan yang boros.
        </p>
      </div>
    </div>
  )
}
