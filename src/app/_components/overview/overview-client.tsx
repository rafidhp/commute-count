"use client"

// ============================================================
// OverviewClient — Client Wrapper Component
// ============================================================
// Kenapa perlu ini?
//
//   page.tsx adalah Server Component (nggak bisa pakai useState).
//   SimulationSection dan KPISection adalah sibling (saudara),
//   jadi mereka nggak bisa langsung share state satu sama lain.
//
//   Solusinya: "lift state up" — state simResult ditaruh di
//   komponen parent ini, lalu di-pass ke kedua child via props.
//
//   Data flow:
//     OverviewClient (punya state simResult)
//       ├── SimulationSection → pas tombol diklik, panggil onResult()
//       └── KPISection        → terima result, tampilkan data dinamis
// ============================================================

import { useState } from "react"
import SimulationSection from "./simulation-section"
import KPISection from "./kpi-section"
import { type SimResult } from "@/lib/monte-carlo"

export default function OverviewClient() {
  // State ini yang "dimiliki" bersama oleh kedua komponen
  const [simResult, setSimResult] = useState<SimResult | null>(null)

  return (
    <div className="flex flex-col lg:flex-row gap-4 sm:gap-6 items-start">
      {/* Panel kiri: form input + tombol run */}
      <div className="w-full flex-1 lg:w-95 xl:w-105 shrink-0">
        <SimulationSection
          // Callback ini dipanggil oleh SimulationSection
          // setiap kali simulasi selesai dijalankan
          onResult={setSimResult}
        />
      </div>

      {/* Panel kanan: KPI cards + chart */}
      <div className="w-full flex-2 min-w-0">
        <KPISection
          // Kalau result null → tampilkan data default (placeholder)
          // Kalau result ada → tampilkan hasil simulasi sesungguhnya
          result={simResult}
        />
      </div>
    </div>
  )
}
