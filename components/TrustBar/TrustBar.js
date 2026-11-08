"use client";
import React from "react";
import { Store, Zap, ShieldCheck, FileCheck, IndianRupee } from "lucide-react";

export default function TrustBar() {
  const features = [
    {
      icon: <Store className="text-purple-600" size={26} />,
      title: "6 Physical Branch Stores",
      desc: "Free local counter pickup, paper swatches & expert advice",
    },
    {
      icon: <Zap className="text-amber-500" size={26} />,
      title: "24-48 Hr Turnaround",
      desc: "Fast in-house offset & digital production dispatch",
    },
    {
      icon: <FileCheck className="text-blue-600" size={26} />,
      title: "Free File Proofing",
      desc: "Automated pre-flight check for 300 DPI, bleed & cut lines",
    },
    {
      icon: <IndianRupee className="text-emerald-600" size={26} />,
      title: "Direct Factory Pricing",
      desc: "Instant live rates starting ₹200 with 18% GST itemized",
    },
    {
      icon: <ShieldCheck className="text-rose-600" size={26} />,
      title: "100% Print Assurance",
      desc: "Guaranteed sharp colors & precision cut or we reprint",
    },
  ];

  return (
    <div className="mx-4 my-4 bg-white rounded-xl shadow-sm border border-gray-100 p-4 sm:p-6">
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 lg:gap-6 divide-y lg:divide-y-0 lg:divide-x divide-gray-100">
        {features.map((item, idx) => (
          <div
            key={idx}
            className={`flex items-start gap-3.5 ${
              idx > 0 ? "pt-3 lg:pt-0 lg:pl-5" : ""
            }`}
          >
            <div className="p-2.5 bg-gray-50 rounded-xl flex-shrink-0">
              {item.icon}
            </div>
            <div>
              <h3 className="text-xs sm:text-sm font-bold text-gray-900 leading-snug">
                {item.title}
              </h3>
              <p className="text-[11px] sm:text-xs text-gray-500 mt-0.5 leading-relaxed">
                {item.desc}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

