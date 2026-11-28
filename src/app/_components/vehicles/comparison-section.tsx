"use client"

import { ArrowUpRight } from "lucide-react"

export default function ComparisonSection() {
  return (
    <section className="space-y-4">
      <div className="flex flex-col justify-between gap-1 sm:flex-row sm:items-center h-10">
        <h2 className="text-orange-2xl text-lg font-semibold tracking-tight">
          Perbandingan Statistik Rute A/B
        </h2>
        <p className="text-xs text-slate-400">
<<<<<<< HEAD
          Kendaraan sama · 22 hari komuter · 5.000 percobaan per rute
=======
          Kendaraan sama · 22 hari perjalanan · 5,000 simulasi per rute
>>>>>>> d8df5f338ba4e8da30610f22ba398cb486647adf
        </p>
      </div>

      <div className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-xs">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 md:gap-0">
          <div className="md:border-r md:border-slate-100 md:pr-8">
            <h3 className="text-orange-2xl text-base font-semibold">
              Rute A: Cileunyi - Kampus UPI
            </h3>

            <div className="mt-5 grid grid-cols-2 items-end gap-4">
              <div>
                <p className="text-[11px] font-medium tracking-wider text-slate-400 uppercase">
<<<<<<< HEAD
                  ESTIMASI BIAYA BULANAN
=======
                  Estimasi Biaya Bulanan
>>>>>>> d8df5f338ba4e8da30610f22ba398cb486647adf
                </p>
                <p className="text-orange-2xl mt-1.5 font-mono text-2xl font-bold tracking-tight">
                  Rp 285.400
                </p>
              </div>

              <div>
<<<<<<< HEAD
                <p className="text-xs text-slate-400">Variansi biaya</p>
=======
                <p className="text-xs text-slate-400">Varians Biaya</p>
>>>>>>> d8df5f338ba4e8da30610f22ba398cb486647adf
                <p className="mt-1 font-mono text-xs font-medium text-slate-700">
                  745.290.000 Rp²
                </p>
              </div>
            </div>

            <div className="mt-6 flex items-center gap-4">
              <span className="shrink-0 text-xs text-slate-400">
                Skor stabilitas
              </span>
              <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-slate-100">
                <div
                  className="h-full rounded-full bg-slate-300"
                  style={{ width: "62%" }}
                />
              </div>
              <span className="text-orange-2xl shrink-0 font-mono text-xs font-semibold">
                62/100
              </span>
            </div>
          </div>

          <div className="md:pl-8">
            <div className="flex items-center justify-between gap-2">
              <h3 className="text-orange-2xl text-base font-semibold">
                Rute B: Alternative Ring Road
              </h3>
              <span className="bg-orange-sm text-orange-xl rounded-full px-3 py-1 text-xs font-medium">
                Direkomendasikan
              </span>
            </div>

            <div className="mt-5 grid grid-cols-2 items-end gap-4">
              <div>
                <p className="text-[11px] font-medium tracking-wider text-slate-400 uppercase">
<<<<<<< HEAD
                  ESTIMASI BIAYA BULANAN
=======
                  Estimasi Biaya Bulanan
>>>>>>> d8df5f338ba4e8da30610f22ba398cb486647adf
                </p>
                <p className="text-orange-2xl mt-1.5 font-mono text-2xl font-bold tracking-tight">
                  Rp 243.400
                </p>
              </div>

              <div>
<<<<<<< HEAD
                <p className="text-xs text-slate-400">Variansi biaya</p>
=======
                <p className="text-xs text-slate-400">Varians biaya</p>
>>>>>>> d8df5f338ba4e8da30610f22ba398cb486647adf
                <p className="mt-1 font-mono text-xs font-medium text-slate-700">
                  447.174.000 Rp²
                </p>
              </div>
            </div>

            <div className="mt-6 flex items-center gap-4">
              <span className="shrink-0 text-xs text-slate-400">
                Skor stabilitas
              </span>
              <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-slate-100">
                <div
                  className="bg-orange-lg h-full rounded-full"
                  style={{ width: "87%" }}
                />
              </div>
              <span className="text-orange-2xl shrink-0 font-mono text-xs font-semibold">
                87/100
              </span>
            </div>
          </div>
        </div>

        <div className="bg-orange-sm text-orange-xl mt-6 flex items-center gap-2 rounded-xl px-4 py-3 text-xs font-semibold">
          <ArrowUpRight className="size-4 shrink-0" />
          <span>
<<<<<<< HEAD
            Rute B hemat ~Rp 42.000/bulan dengan variansi biaya 40% lebih rendah.
=======
            Rute B hemat ~Rp 42.000/bulan dengan varians biaya 40% lebih rendah.
>>>>>>> d8df5f338ba4e8da30610f22ba398cb486647adf
          </span>
        </div>
      </div>
    </section>
  )
}