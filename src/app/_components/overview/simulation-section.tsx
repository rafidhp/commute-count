"use client"

// ============================================================
// SimulationSection — Form Input + Tombol Run Simulasi
// ============================================================
// Perubahan dari versi sebelumnya:
//   + Terima prop `onResult` (callback ke parent OverviewClient)
//   + Tombol "Run Simulation" sekarang beneran menjalankan simulasi
//   + Ada loading state biar UX lebih enak
// ============================================================

import { useState } from "react"
import { ChevronDown } from "lucide-react"
import { runMonteCarlo, type SimResult } from "@/lib/monte-carlo"

// Props yang diterima dari parent (OverviewClient)
type Props = {
  onResult: (result: SimResult) => void
}

// Mapping vehicle ke spesifikasi teknis
const VEHICLE_SPECS: Record<string, { fuelPrice: number; kmPerLiter: number }> = {
  "honda-beat":  { fuelPrice: 10_000, kmPerLiter: 45 },
  "honda-vario": { fuelPrice: 12_500, kmPerLiter: 42 },
  "yamaha-nmax": { fuelPrice: 12_500, kmPerLiter: 38 },
}

export default function SimulationParameters({ onResult }: Props) {
  // ---- State untuk setiap input field ----
  const [vehicle, setVehicle] = useState("honda-beat")
  const [distance, setDistance] = useState("24")
  const [commuteDays, setCommuteDays] = useState(22)
  const [trafficDelay, setTrafficDelay] = useState("25")
  const [variability, setVariability] = useState<"low" | "medium" | "high">("medium")
  const [budget, setBudget] = useState("300000")

  // Loading state: true saat simulasi sedang berjalan
  const [isRunning, setIsRunning] = useState(false)

  // ---- Handler tombol Run Simulation ----
  async function handleRun() {
    setIsRunning(true) // Aktifkan loading state

    // Ambil spek kendaraan yang dipilih
    const specs = VEHICLE_SPECS[vehicle] ?? VEHICLE_SPECS["honda-beat"]!

    // Beri waktu sebentar biar UI update dulu (loading spinner muncul)
    // Ini teknik standard React: simulasi berat bisa block UI render
    await new Promise((resolve) => setTimeout(resolve, 50))

    // Jalankan simulasi Monte Carlo
    // Input dari form → masuk ke fungsi → dapat SimResult
    const result = runMonteCarlo({
      distanceKm:        Number(distance) || 24,
      commuteDays:       commuteDays,
      trafficDelayMin:   Number(trafficDelay) || 25,
      variability:       variability,
      fuelPricePerLiter: specs.fuelPrice,
      kmPerLiter:        specs.kmPerLiter,
      budgetTarget:      Number(budget.replace(/\./g, "")) || 300_000,
    })

    // Kirim hasil ke parent (OverviewClient) → diteruskan ke KPISection
    onResult(result)

    setIsRunning(false) // Matikan loading state
  }

  return (
    <section className="space-y-4">
      <div className="overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-xs p-5 sm:p-6">
        {/* Header */}
        <div className="flex flex-col gap-1">
          <h2 className="text-xl font-bold tracking-tight text-slate-900">
            Parameter Simulasi
          </h2>
          <p className="text-sm text-slate-500">
            Sesuaikan model dengan rutinitas harian lo.
          </p>
        </div>

        {/* Save Scenario Button */}
        <div className="mt-4">
          <button
            type="button"
            className="w-full rounded-xl border border-slate-200 bg-white py-3 px-4 text-center text-sm font-semibold text-slate-900 shadow-2xs hover:bg-slate-50 transition cursor-pointer"
          >
            Simpan Skenario
          </button>
        </div>

        {/* Divider */}
        <div className="my-5 border-t border-slate-100" />

        {/* Form Fields */}
        <div className="space-y-5">
          {/* Vehicle & Fuel */}
          <div className="space-y-2">
            <label className="text-xs sm:text-sm font-medium text-slate-700">
              Kendaraan &amp; BBM
            </label>
            <div className="relative">
              <select
                value={vehicle}
                onChange={(e) => setVehicle(e.target.value)}
                className="w-full appearance-none rounded-xl border border-slate-200 bg-white px-3.5 py-3 text-sm font-medium text-slate-900 pr-10 focus:border-amber-500 focus:outline-hidden focus:ring-2 focus:ring-amber-500/20 transition cursor-pointer"
              >
                <option value="honda-beat">Honda Beat — Pertalite (Rp 10.000/L)</option>
                <option value="honda-vario">Honda Vario — Pertamax (Rp 12.500/L)</option>
                <option value="yamaha-nmax">Yamaha NMAX — Pertamax (Rp 12.500/L)</option>
              </select>
              <ChevronDown className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 size-4 text-slate-500" />
            </div>
          </div>

          {/* Daily Round-trip Distance */}
          <div className="space-y-2">
            <label className="text-xs sm:text-sm font-medium text-slate-700">
              Jarak PP harian
            </label>
            <div className="relative flex items-center">
              <input
                type="number"
                value={distance}
                onChange={(e) => setDistance(e.target.value)}
                className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-3 text-sm font-medium text-slate-900 pr-12 focus:border-amber-500 focus:outline-hidden focus:ring-2 focus:ring-amber-500/20 transition"
                placeholder="24"
              />
              <span className="absolute right-3.5 text-xs sm:text-sm text-slate-500 font-medium">
                km
              </span>
            </div>
          </div>

          {/* Active Commute Days */}
          <div className="space-y-3">
            <div className="flex items-center justify-between text-xs sm:text-sm">
              <span className="font-medium text-slate-700">Hari komuter aktif</span>
              <span className="font-semibold text-slate-900">
                {commuteDays} <span className="font-normal text-slate-600">hari / bulan</span>
              </span>
            </div>
            <div className="relative flex items-center py-1">
              <input
                type="range"
                min="1"
                max="31"
                value={commuteDays}
                onChange={(e) => setCommuteDays(Number(e.target.value))}
                className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-orange-lg"
              />
            </div>
          </div>

          {/* Average Daily Traffic Delay */}
          <div className="space-y-2">
            <label className="text-xs sm:text-sm font-medium text-slate-700">
              Rata-rata macet harian
            </label>
            <div className="relative flex items-center">
              <input
                type="number"
                value={trafficDelay}
                onChange={(e) => setTrafficDelay(e.target.value)}
                className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-3 text-sm font-medium text-slate-900 pr-12 focus:border-amber-500 focus:outline-hidden focus:ring-2 focus:ring-amber-500/20 transition"
                placeholder="25"
              />
              <span className="absolute right-3.5 text-xs sm:text-sm text-slate-500 font-medium">
                min
              </span>
            </div>
          </div>

          {/* Traffic Variability */}
          <div className="space-y-2">
            <label className="text-xs sm:text-sm font-medium text-slate-700">
              Variabilitas macet / ketidakpastian
            </label>
            <div className="grid grid-cols-3 gap-1 rounded-xl border border-slate-200/80 bg-slate-50/50 p-1">
              {(["low", "medium", "high"] as const).map((v) => (
                <button
                  key={v}
                  type="button"
                  onClick={() => setVariability(v)}
                  className={`rounded-lg py-2 text-center text-xs font-medium transition cursor-pointer ${
                    variability === v
                      ? "bg-orange-lg text-white shadow-xs font-semibold"
                      : "text-slate-600 hover:text-slate-900"
                  }`}
                >
                  {v === "low" ? "Rendah (±5m)" : v === "medium" ? "Sedang (±15m)" : "Tinggi (±30m)"}
                </button>
              ))}
            </div>
          </div>

          {/* Target Monthly Budget */}
          <div className="space-y-2">
            <label className="text-xs sm:text-sm font-medium text-slate-700">
              Target budget bulanan
            </label>
            <div className="relative flex items-center">
              <span className="absolute left-3.5 text-xs sm:text-sm text-slate-900 font-medium">
                Rp
              </span>
              <input
                type="text"
                value={budget}
                onChange={(e) => setBudget(e.target.value)}
                className="w-full rounded-xl border border-slate-200 bg-white pl-10 pr-3.5 py-3 text-sm font-medium text-slate-900 focus:border-amber-500 focus:outline-hidden focus:ring-2 focus:ring-amber-500/20 transition"
                placeholder="300000"
              />
            </div>
          </div>

          {/* Run Simulation CTA Button */}
          <div className="pt-2">
            <button
              type="button"
              onClick={handleRun}
              disabled={isRunning}
              className="w-full rounded-xl bg-orange-lg py-3.5 px-4 text-center text-sm font-semibold text-slate-950 hover:opacity-90 active:scale-[0.99] transition shadow-xs cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {/* Teks berubah saat loading */}
              {isRunning ? "Lagi ngitung…" : "Jalanin 5.000 Simulasi Monte Carlo"}
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
