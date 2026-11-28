"use client"

import { Bike, MoreHorizontal, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"

interface Vehicle {
  id: string
  name: string
  subtitle: string
  efficiency: string
  fuelType: string
  fuelPrice: string
  isDefault?: boolean
}

const VEHICLES_DATA: Vehicle[] = [
  {
    id: "1",
    name: "Honda Beat",
    subtitle: "Daily ride",
    efficiency: "45 km/L",
    fuelType: "Pertalite",
    fuelPrice: "Rp 10.000/L",
    isDefault: true,
  },
  {
    id: "2",
    name: "Honda Vario 160",
    subtitle: "Weekend ride",
    efficiency: "40 km/L",
    fuelType: "Pertamax",
    fuelPrice: "Rp 12.100/L",
    isDefault: false,
  },
]

export default function VehiclesSection() {
  return (
    <section className="space-y-4">
      <div className="flex items-center justify-between h-10">
        <div className="flex items-baseline gap-3">
          <h2 className="text-orange-2xl text-lg font-semibold tracking-tight">
<<<<<<< HEAD
            Motor Gw
=======
            Kendaraan Saya
>>>>>>> d8df5f338ba4e8da30610f22ba398cb486647adf
          </h2>
          <span className="text-xs text-slate-400">
            {VEHICLES_DATA.length} kendaraan tersimpan
          </span>
        </div>
<<<<<<< HEAD

        <Button className="bg-orange-lg hover:bg-orange-lg/90 text-orange-2xl cursor-pointer rounded-lg px-4 font-semibold shadow-none">
          <Plus className="mr-1.5 size-4" />
=======
        <Button className="bg-orange-lg hover:bg-orange-lg/90 text-orange-2xl cursor-pointer rounded-lg px-4 font-semibold shadow-none h-full">
          <Plus className="mr-1.5 size-4 font-semibold" />
>>>>>>> d8df5f338ba4e8da30610f22ba398cb486647adf
          Tambah Kendaraan
        </Button>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        {VEHICLES_DATA.map((vehicle) => (
          <div
            key={vehicle.id}
            className={`flex flex-col justify-between rounded-2xl border bg-white p-5 transition ${
              vehicle.isDefault
                ? "border-orange-md shadow-[0_2px_10px_rgba(255,160,1,0.06)]"
                : "border-slate-200/80 shadow-xs"
            }`}
          >
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3.5">
                <div className="bg-orange-sm text-orange-lg flex size-11 items-center justify-center rounded-xl">
                  <Bike className="size-5" />
                </div>
                <div>
                  <h3 className="text-orange-2xl text-base font-semibold">
                    {vehicle.name}
                  </h3>
                  <p className="text-xs text-slate-400">{vehicle.subtitle === "Daily ride" ? "Motor harian" : vehicle.subtitle === "Weekend ride" ? "Motor weekend" : vehicle.subtitle}</p>
                </div>
              </div>

              {vehicle.isDefault ? (
                <span className="bg-orange-sm text-orange-xl rounded-full px-3 py-1 text-xs font-medium">
                  Utama
                </span>
              ) : (
                <button
                  type="button"
                  className="cursor-pointer rounded-md p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-600"
                  aria-label="Vehicle options"
                >
                  <MoreHorizontal className="size-4" />
                </button>
              )}
            </div>

            <hr className="my-4 border-slate-100" />

            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-[11px] font-medium tracking-wider text-slate-400 uppercase">
<<<<<<< HEAD
                  EFISIENSI
=======
                  Efisiensi
>>>>>>> d8df5f338ba4e8da30610f22ba398cb486647adf
                </p>
                <p className="text-orange-2xl mt-1 font-mono text-base font-semibold">
                  {vehicle.efficiency}
                </p>
              </div>

              <div>
                <p className="text-[11px] font-medium tracking-wider text-slate-400 uppercase">
<<<<<<< HEAD
                  JENIS BBM
=======
                  Jenis BBM
>>>>>>> d8df5f338ba4e8da30610f22ba398cb486647adf
                </p>
                <div className="mt-1 flex items-baseline justify-between gap-2">
                  <span className="text-orange-2xl text-sm font-medium">
                    {vehicle.fuelType}
                  </span>
                  <span className="font-mono text-xs text-slate-600">
                    {vehicle.fuelPrice}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}

        <button
          type="button"
          className="hover:border-orange-md hover:bg-orange-sm/20 flex min-h-43 cursor-pointer flex-col items-center justify-center rounded-2xl border border-dashed border-slate-300 bg-white/60 p-6 text-center transition"
        >
          <Plus className="mb-2 size-6 text-slate-400" />
          <span className="text-orange-2xl text-sm font-semibold">
            Tambah Kendaraan Baru
          </span>
          <span className="mt-1 text-xs text-slate-400">
<<<<<<< HEAD
            Bandingin sama motor lain.
=======
            Bandingkan Kendaraan Lainnya.
>>>>>>> d8df5f338ba4e8da30610f22ba398cb486647adf
          </span>
        </button>
      </div>
    </section>
  )
}