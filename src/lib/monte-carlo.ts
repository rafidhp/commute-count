// ============================================================
// Monte Carlo Simulation — Commute Cost Estimator
// ============================================================
// Cara kerjanya:
//   1. Tiap "bulan" disimulasikan hari per hari
//   2. Delay macet di-randomize pakai distribusi normal (Box-Muller)
//   3. Delay → faktor boros BBM → biaya harian
//   4. Ulang 5.000x → dapat distribusi lengkap
// ============================================================

export type SimInput = {
  distanceKm: number          // Jarak PP per hari (km)
  commuteDays: number         // Hari komuter per bulan
  trafficDelayMin: number     // Rata-rata delay macet (menit)
  variability: "low" | "medium" | "high"  // Ketidakpastian macet
  fuelPricePerLiter: number   // Harga BBM per liter (Rp)
  kmPerLiter: number          // Efisiensi motor (km/L)
  budgetTarget: number        // Target budget bulanan (Rp)
}

export type SimResult = {
  mean: number            // Ekspektasi biaya bulanan (Rp)
  p5: number              // Batas bawah 95% confidence interval
  p95: number             // Batas atas 95% confidence interval (worst case)
  trafficPenalty: number  // Biaya ekstra akibat macet (Rp)
  budgetSafety: number    // % bulan yang aman di bawah budget (0–100)
  histogramBars: number[] // 31 nilai 0–100 untuk tinggi bar chart
  xAxisLabels: string[]   // Label sumbu X (Rp XYZk)
  meanPercent: number     // Posisi mean di chart (% dari kiri, untuk marker)
  p95Percent: number      // Posisi p95 di chart (% dari kiri, untuk marker)
}

// Peta variabilitas ke standar deviasi (menit)
const VARIABILITY_STD: Record<SimInput["variability"], number> = {
  low: 5,
  medium: 15,
  high: 30,
}

// ------------------------------------------------------------
// LANGKAH 1: Box-Muller Transform
// Mengubah 2 angka uniform random → 1 angka distribusi normal
//
//   Kenapa? Math.random() hasilnya flat (semua nilai sama peluang).
//   Delay macet di dunia nyata → kebanyakan sekitar nilai tengah,
//   jarang banget yang ekstrem. Distribusi normal merepresentasikan itu.
// ------------------------------------------------------------
function randomNormal(mean: number, stdDev: number): number {
  // u1 dan u2 adalah dua angka random antara 0–1
  const u1 = Math.random()
  const u2 = Math.random()

  // Rumus Box-Muller: menghasilkan z yang ber-distribusi normal (0, 1)
  const z = Math.sqrt(-2 * Math.log(u1)) * Math.cos(2 * Math.PI * u2)

  // Skala z ke mean dan stdDev yang kita mau
  return mean + z * stdDev
}

// ------------------------------------------------------------
// LANGKAH 2: Simulasi 1 Bulan
// Loop per hari → random delay → hitung biaya → akumulasi
// ------------------------------------------------------------
function simulateOneMonth(
  distanceKm: number,
  commuteDays: number,
  trafficDelayMin: number,
  variabilityMin: number,
  fuelPricePerLiter: number,
  kmPerLiter: number,
): number {
  let totalCost = 0

  for (let day = 0; day < commuteDays; day++) {
    // Random delay hari ini (minimal 0, nggak mungkin negatif)
    const todayDelay = Math.max(0, randomNormal(trafficDelayMin, variabilityMin))

    // Faktor macet: tiap 10 menit macet → +6% konsumsi BBM
    // Misal: 25 menit delay → faktor 1.15 (boros 15% lebih)
    const trafficFactor = 1 + (todayDelay / 10) * 0.06

    // Biaya hari ini:
    //   (jarak / efisiensi) = liter yang dipakai kalau normal
    //   × trafficFactor     = liter aktual (lebih boros karena macet)
    //   × harga             = rupiah
    const litersUsed = (distanceKm / kmPerLiter) * trafficFactor
    const dayCost = litersUsed * fuelPricePerLiter

    totalCost += dayCost
  }

  return totalCost
}

// ------------------------------------------------------------
// LANGKAH 3: Fungsi Utama — Jalanin 5.000 simulasi
// ------------------------------------------------------------
export function runMonteCarlo(input: SimInput, iterations = 5000): SimResult {
  const {
    distanceKm,
    commuteDays,
    trafficDelayMin,
    variability,
    fuelPricePerLiter,
    kmPerLiter,
    budgetTarget,
  } = input

  const variabilityMin = VARIABILITY_STD[variability]

  // Biaya baseline (tanpa macet sama sekali) → untuk hitung traffic penalty
  const baseCost = (distanceKm / kmPerLiter) * fuelPricePerLiter * commuteDays

  // Jalanin semua iterasi, kumpulin hasilnya
  const results: number[] = []
  for (let i = 0; i < iterations; i++) {
    results.push(
      simulateOneMonth(
        distanceKm,
        commuteDays,
        trafficDelayMin,
        variabilityMin,
        fuelPricePerLiter,
        kmPerLiter,
      ),
    )
  }

  // Sort ascending → wajib untuk percentile
  results.sort((a, b) => a - b)

  // Hitung statistik
  const mean = results.reduce((sum, v) => sum + v, 0) / iterations
  const p5 = results[Math.floor(iterations * 0.05)]!   // 5th percentile (best case)
  const p95 = results[Math.floor(iterations * 0.95)]!  // 95th percentile (worst case)
  const budgetSafety =
    (results.filter((v) => v <= budgetTarget).length / iterations) * 100

  // ---- Buat Histogram (31 bins) ----
  const minVal = results[0]!
  const maxVal = results[results.length - 1]!
  const range = maxVal - minVal
  const numBins = 31
  const binWidth = range / numBins

  // Hitung frekuensi tiap bin
  const bins = Array<number>(numBins).fill(0)
  for (const val of results) {
    const idx = Math.min(Math.floor((val - minVal) / binWidth), numBins - 1)
    bins[idx]!++
  }

  // Normalisasi ke 0–100 (untuk CSS height %)
  const maxCount = Math.max(...bins)
  const histogramBars = bins.map((count) => Math.round((count / maxCount) * 100))

  // ---- Label sumbu X (6 label merata) ----
  const xAxisLabels = Array.from({ length: 6 }, (_, i) => {
    const val = minVal + (range / 5) * i
    return `Rp ${Math.round(val / 1000)}k`
  })

  // ---- Posisi marker Mean & P95 di chart (% dari kiri) ----
  // Offset 10% kiri (untuk label Y-axis), 2% kanan → area chart = 88%
  const toPercent = (val: number) => 10 + ((val - minVal) / range) * 88
  const meanPercent = toPercent(mean)
  const p95Percent = toPercent(p95)

  return {
    mean,
    p5,
    p95,
    trafficPenalty: mean - baseCost,
    budgetSafety,
    histogramBars,
    xAxisLabels,
    meanPercent,
    p95Percent,
  }
}
