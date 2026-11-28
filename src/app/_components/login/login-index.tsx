"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { authClient } from "@/lib/auth-client";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

export default function LoginIndex() {
  const [loading, setLoading] = useState(false);

  const handleGoogleLogin = async () => {
    await authClient.signIn.social(
      {
        provider: "google",
        callbackURL: "/",
      },
      {
        onRequest: () => {
          setLoading(true);
        },
        onError: (ctx) => {
          alert(ctx.error.message ?? "Gagal masuk dengan Google");
          setLoading(false);
        },
      }
    );
  };

  return (
    <div className="min-h-screen w-full grid grid-cols-1 lg:grid-cols-2 bg-white text-slate-900">
      {/* left section */}
      <div className="flex flex-col justify-between p-6 sm:p-10 lg:p-14 border-b lg:border-b-0 lg:border-r border-slate-100">
        <div>
          <Link
            href="/"
            className="inline-flex items-center gap-2.5 focus:outline-none group"
          >
            <Image
              src="/oil.png"
              alt="CommuteCount Logo"
              width={44}
              height={44}
              className="object-contain transition-transform group-hover:scale-105"
              priority
            />
            <span className="text-2xl font-bold tracking-tight text-slate-900">
              CommuteCount
            </span>
          </Link>
        </div>

        <div className="w-full max-w-95 mx-auto my-12 lg:my-0">
          <p className="text-xs font-bold tracking-[0.08em] uppercase text-amber-600 mb-3">
<<<<<<< HEAD
            KOMUTER LEBIH CERDAS. ANGKA LEBIH JELAS.
          </p>
          <h1 className="text-3xl lg:text-5xl font-bold tracking-tight text-slate-900 leading-[1.15] mb-3.5">
            Selamat datang di
=======
            Perjalanan Cerdas. Biaya Lebih Jelas.
          </p>
          <h1 className="text-3xl lg:text-5xl font-bold tracking-tight text-slate-900 leading-[1.15] mb-3.5">
            <span className="text-nowrap">Selamat Datang di</span>
>>>>>>> d8df5f338ba4e8da30610f22ba398cb486647adf
            <br />
            CommuteCount
          </h1>
          <p className="text-sm lg:text-base text-slate-500 leading-relaxed mb-8">
<<<<<<< HEAD
            Prediksi pengeluaran BBM bulanan lo dengan presisi statistik dan
            simulasi Monte Carlo.
=======
            Prediksi pengeluaran BBM bulanan Anda dengan presisi statistik dan simulasi Monte Carlo.
>>>>>>> d8df5f338ba4e8da30610f22ba398cb486647adf
          </p>

          <Button
            type="button"
            variant="outline"
            onClick={handleGoogleLogin}
            disabled={loading}
            className="w-full h-12 rounded-xl border-slate-200 bg-white hover:bg-slate-50 text-slate-800 font-medium text-base shadow-xs transition-all cursor-pointer"
          >
            {loading ? (
              <>
                <Loader2 className="mr-2.5 h-4 w-4 animate-spin text-slate-500" />
<<<<<<< HEAD
                Menghubungkan ke Google...
=======
                Menyambungkan dengan Google...
>>>>>>> d8df5f338ba4e8da30610f22ba398cb486647adf
              </>
            ) : (
              <>
                <GoogleIcon className="mr-3 h-4 w-4" />
                Lanjutkan dengan Google
              </>
            )}
          </Button>

          <p className="mt-4 text-xs text-slate-400">
<<<<<<< HEAD
            Login aman pakai Google OAuth.
=======
            Autentikasi aman dengan Google OAuth.
>>>>>>> d8df5f338ba4e8da30610f22ba398cb486647adf
          </p>
        </div>

        {/* footer */}
        <div className="flex items-center justify-between text-xs text-slate-400">
          <span>© 2026 CommuteCount</span>
<<<<<<< HEAD
          <span>Dibuat buat perjalanan harian lo.</span>
=======
          <span>Dirancang untuk perjalanan sehari-hari.</span>
>>>>>>> d8df5f338ba4e8da30610f22ba398cb486647adf
        </div>
      </div>

      {/* right section */}
      <div className="hidden lg:flex flex-col justify-center items-center p-12 xl:p-20 bg-[#FAFAFB] relative overflow-hidden">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: `
              linear-gradient(to right, #f1f5f9 1px, transparent 2px),
              linear-gradient(to bottom, #f1f5f9 1px, transparent 2px)
            `,
            backgroundSize: "48px 48px",
          }}
        />

        <div className="relative z-10 w-full max-w-120">
          <p className="text-xs font-bold tracking-[0.08em] uppercase text-amber-600 mb-3">
<<<<<<< HEAD
            KURANG NEBAK-NEBAK. LEBIH YAKIN.
          </p>
          <h2 className="text-3xl lg:text-4xl font-bold tracking-tight text-slate-900 leading-[1.15] mb-3">
            Komuter lo,
            <br />
            dengan peluang di pihak lo.
          </h2>
          <p className="text-base text-slate-500 mb-8">
            Rencanain di tengah ketidakpastian. Bukan cuma rata-rata.
=======
            Kurangi Tebakan. Tambah Keyakinan.
          </p>
          <h2 className="text-3xl lg:text-4xl font-bold tracking-tight text-slate-900 leading-[1.15] mb-3">
            Perjalanan Anda,
            <br />
            dengan kepastian lebih baik.
          </h2>
          <p className="text-base text-slate-500 mb-8">
            Rencanakan ketidakpastian. Bukan sekedar rata-rata.
>>>>>>> d8df5f338ba4e8da30610f22ba398cb486647adf
          </p>

          <div className="relative pb-8">
            <div className="bg-white rounded-2xl border border-slate-200/80 shadow-[0_8px_30px_rgb(0,0,0,0.04)] p-6">
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-[10px] font-semibold tracking-wider uppercase text-slate-400">
<<<<<<< HEAD
                  PREDIKSI BBM BULANAN
                </span>
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-amber-50 text-amber-700 border border-amber-200/60">
                  5.000 simulasi
=======
                  Prediksi BBM Bulanan
                </span>
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-amber-50 text-amber-700 border border-amber-200/60">
                  5,000 simulasi
>>>>>>> d8df5f338ba4e8da30610f22ba398cb486647adf
                </span>
              </div>
              <h3 className="text-base font-semibold text-slate-900 mb-6">
                Sebulan. 5,000 kemungkinan perjalanan.
              </h3>
              <div className="w-full">
                <svg
                  viewBox="0 0 400 135"
                  className="w-full h-auto overflow-visible"
                  fill="none"
                >
                  <defs>
                    <linearGradient
                      id="bellCurveFill"
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >
                      <stop offset="0%" stopColor="#F59E0B" stopOpacity="0.28" />
                      <stop
                        offset="100%"
                        stopColor="#F59E0B"
                        stopOpacity="0.06"
                      />
                    </linearGradient>
                  </defs>
                  <line
                    x1="10"
                    y1="20"
                    x2="390"
                    y2="20"
                    stroke="#F1F5F9"
                    strokeWidth="1"
                  />
                  <line
                    x1="10"
                    y1="52"
                    x2="390"
                    y2="52"
                    stroke="#F1F5F9"
                    strokeWidth="1"
                  />
                  <line
                    x1="10"
                    y1="84"
                    x2="390"
                    y2="84"
                    stroke="#F1F5F9"
                    strokeWidth="1"
                  />
                  <line
                    x1="10"
                    y1="115"
                    x2="390"
                    y2="115"
                    stroke="#E2E8F0"
                    strokeWidth="1"
                  />

                  {/* curve */}
                  <path
                    d="M 15 113 C 65 113, 85 105, 115 62 C 138 28, 158 14, 185 14 C 212 14, 235 32, 265 68 C 295 104, 330 112, 385 113 L 385 115 L 15 115 Z"
                    fill="url(#bellCurveFill)"
                  />

                  {/* mean (Rp 285k) */}
                  <line
                    x1="185"
                    y1="14"
                    x2="185"
                    y2="115"
                    stroke="#F59E0B"
                    strokeWidth="1.5"
                  />

                  {/* stroke curve */}
                  <path
                    d="M 15 113 C 65 113, 85 105, 115 62 C 138 28, 158 14, 185 14 C 212 14, 235 32, 265 68 C 295 104, 330 112, 385 113"
                    stroke="#F59E0B"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                  />
                </svg>

                {/* label */}
                <div className="flex items-center justify-between text-[11px] mt-2 px-1">
                  <span className="text-slate-400">Rp 245.000</span>
                  <span className="font-semibold text-slate-900">Rp 285.000</span>
                  <span className="text-slate-400">Rp 335.000</span>
                </div>
              </div>
            </div>

            {/* floating card */}
            <div className="mx-4 -mt-3 relative z-20 bg-white rounded-xl border border-slate-200/90 shadow-md px-5 py-3.5 flex items-center gap-3.5">
              <div className="w-1 h-9 rounded-full bg-amber-500 shrink-0" />
              <div>
                <p className="text-[11px] text-slate-400 font-medium mb-0.5">
<<<<<<< HEAD
                  95% Interval Kepercayaan
=======
                  Interval Kepercayaan 95%
>>>>>>> d8df5f338ba4e8da30610f22ba398cb486647adf
                </p>
                <p className="font-mono text-sm sm:text-base font-bold tracking-tight text-slate-900">
                  Rp 245.000 - Rp 335.000
                </p>
              </div>
            </div>
          </div>

          <p className="text-xs text-slate-400 pl-4 mt-1">
<<<<<<< HEAD
            Ditenagai probabilitas. Berbasis rutinitas harian lo.
=======
            Berbasis probabilitas. Sesuai rutinitas harian Anda.
>>>>>>> d8df5f338ba4e8da30610f22ba398cb486647adf
          </p>
        </div>
      </div>
    </div>
  );
}

// google icon
function GoogleIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden="true">
      <path
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
        fill="#4285F4"
      />
      <path
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
        fill="#34A853"
      />
      <path
        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
        fill="#FBBC05"
      />
      <path
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
        fill="#EA4335"
      />
    </svg>
  );
}