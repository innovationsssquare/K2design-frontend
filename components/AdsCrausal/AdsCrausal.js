"use client";
import React from "react";
import Link from "next/link";
import { Sparkles, ArrowRight, Store } from "lucide-react";

const AdsCrausal = () => {
  return (
    <div className="mx-4 my-4 grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6">
      {/* Banner 1: Business Stationery Bundle */}
      <div className="relative rounded-2xl overflow-hidden bg-gradient-to-br from-[#1e1b4b] via-[#311042] to-[#4a044e] p-6 sm:p-8 text-white shadow-md flex flex-col justify-between min-h-[220px]">
        <div className="relative z-10">
          <div className="flex items-center gap-2 mb-2">
            <span className="inline-flex items-center gap-1 text-[11px] font-bold uppercase tracking-wider bg-purple-500/30 text-purple-200 border border-purple-400/30 px-2.5 py-0.5 rounded-full">
              <Sparkles size={12} />
              Startup Essentials
            </span>
            <span className="text-xs text-purple-200/80">• Flat 15% Off Combined</span>
          </div>

          <h3 className="text-xl sm:text-2xl font-black text-white leading-tight">
            Complete Business Identity Kit
          </h3>
          <p className="text-xs sm:text-sm text-purple-100/90 mt-2 max-w-md leading-relaxed">
            Coordinated Visiting Cards, Executive Letterheads, Bill Books & Self-Inking Stamps printed with matching CMYK brand colors.
          </p>
        </div>

        <div className="relative z-10 mt-6 flex items-center justify-between">
          <div className="flex items-baseline gap-1.5">
            <span className="text-xs text-purple-200">Starting from</span>
            <span className="text-lg sm:text-xl font-extrabold text-amber-300">₹890</span>
            <span className="text-[10px] text-purple-200/70">/ kit</span>
          </div>
          <Link
            href="/paper-printing"
            className="inline-flex items-center gap-1.5 px-4 py-2 bg-white text-[#311042] hover:bg-purple-50 text-xs sm:text-sm font-bold rounded-lg shadow transition transform hover:-translate-y-0.5"
          >
            Configure Kit <ArrowRight size={14} />
          </Link>
        </div>

        {/* Decorative background element */}
        <div className="absolute -right-8 -bottom-8 w-40 h-40 bg-purple-500/10 rounded-full blur-2xl pointer-events-none" />
      </div>

      {/* Banner 2: Storefront Signage & LED Boards */}
      <div className="relative rounded-2xl overflow-hidden bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#042f2e] p-6 sm:p-8 text-white shadow-md flex flex-col justify-between min-h-[220px]">
        <div className="relative z-10">
          <div className="flex items-center gap-2 mb-2">
            <span className="inline-flex items-center gap-1 text-[11px] font-bold uppercase tracking-wider bg-emerald-500/30 text-emerald-200 border border-emerald-400/30 px-2.5 py-0.5 rounded-full">
              <Store size={12} />
              Local Store Pickup
            </span>
            <span className="text-xs text-emerald-200/80">• Made in Maharashtra</span>
          </div>

          <h3 className="text-xl sm:text-2xl font-black text-white leading-tight">
            Storefront Signboards & 3D LED Letters
          </h3>
          <p className="text-xs sm:text-sm text-slate-200 mt-2 max-w-md leading-relaxed">
            Weatherproof ACP boards, laser-cut acrylic letters, and high-illumination backlit glow boxes built to elevate your retail outlet.
          </p>
        </div>

        <div className="relative z-10 mt-6 flex items-center justify-between">
          <div className="flex items-baseline gap-1.5">
            <span className="text-xs text-slate-300">Ready in</span>
            <span className="text-lg sm:text-xl font-extrabold text-emerald-300">3-4 Days</span>
          </div>
          <Link
            href="/categories"
            className="inline-flex items-center gap-1.5 px-4 py-2 bg-emerald-500 hover:bg-emerald-600 text-white text-xs sm:text-sm font-bold rounded-lg shadow transition transform hover:-translate-y-0.5"
          >
            Explore Signage <ArrowRight size={14} />
          </Link>
        </div>

        {/* Decorative background element */}
        <div className="absolute -right-8 -bottom-8 w-40 h-40 bg-emerald-500/10 rounded-full blur-2xl pointer-events-none" />
      </div>
    </div>
  );
};

export default AdsCrausal;