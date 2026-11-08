"use client";
import React, { useState } from "react";
import { Store, MapPin, Phone, Clock, CheckCircle2, ChevronRight } from "lucide-react";
import Link from "next/link";

export default function BranchShowcase() {
  const branches = [
    {
      id: "b1",
      name: "Main Production Hub & Store",
      code: "BR-01",
      area: "Swargate / Market Yard",
      city: "Pune",
      address: "Survey No. 42, Shankarsheth Road, Near Swargate Metro, Pune 411037",
      phone: "+91 8999291978",
      timings: "9:00 AM - 9:00 PM (Mon-Sat)",
      facilities: ["Heavy Offset Press", "Direct Pickup Counter", "Sample Book Room"],
    },
    {
      id: "b2",
      name: "Kothrud Retail Branch",
      code: "BR-02",
      area: "Paud Road / Kothrud",
      city: "Pune",
      address: "Shop 4, Commercial Complex, Opp. Karishma Society, Paud Road, Kothrud 411038",
      phone: "+91 8999291979",
      timings: "10:00 AM - 8:30 PM (Mon-Sat)",
      facilities: ["Free Store Pickup", "Paper Texture Swatches", "Express Card Cut"],
    },
    {
      id: "b3",
      name: "Hadapsar & Magarpatta Branch",
      code: "BR-03",
      area: "Hadapsar / Magarpatta",
      city: "Pune",
      address: "Shop 12, Mega Centre, Next to Magarpatta City Gate, Solapur Road 411028",
      phone: "+91 8999291980",
      timings: "10:00 AM - 8:30 PM (Mon-Sat)",
      facilities: ["Corporate B2B Desk", "Free Store Pickup", "Large Format Standees"],
    },
    {
      id: "b4",
      name: "Hinjewadi Tech Hub Branch",
      code: "BR-04",
      area: "Hinjewadi Phase 1",
      city: "Pune",
      address: "Shop 7, Prime Plaza, Opp. Infosys Circle, Hinjewadi Phase 1, Pune 411057",
      phone: "+91 8999291981",
      timings: "9:30 AM - 8:30 PM (Mon-Sat)",
      facilities: ["Startup ID Kits", "Same-Day Dispatch", "Lanyard Printing"],
    },
    {
      id: "b5",
      name: "Pimpri-Chinchwad Branch",
      code: "BR-05",
      area: "Pimpri Station Road",
      city: "Pimpri-Chinchwad",
      address: "Plot 18, MIDC Road, Near Dr. Ambedkar Chowk, Pimpri 411018",
      phone: "+91 8999291982",
      timings: "10:00 AM - 8:30 PM (Mon-Sat)",
      facilities: ["Industrial Signages", "Bill Book Stamping", "Free Store Pickup"],
    },
    {
      id: "b6",
      name: "Vashi Navi Mumbai Branch",
      code: "BR-06",
      area: "Sector 17, Vashi",
      city: "Navi Mumbai",
      address: "Shop 21, Big Splash Mall, Sector 17, Vashi, Navi Mumbai 400703",
      phone: "+91 8999291983",
      timings: "10:00 AM - 8:30 PM (Mon-Sat)",
      facilities: ["Express Pickup Point", "Signage Consultations", "Sample Inspection"],
    },
  ];

  const [activeBranch, setActiveBranch] = useState(branches[0]);

  return (
    <div id="branch-locator" className="mx-4 my-5 p-4 sm:p-6 bg-white rounded-2xl shadow-sm border border-gray-100">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between pb-4 mb-5 border-b border-gray-100 gap-2">
        <div>
          <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-purple-700">
            <Store size={15} />
            Omnichannel Print Advantage
          </div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-gray-900 mt-0.5">
            Our 6 Physical Branch Stores & Local Hubs
          </h2>
          <p className="text-xs sm:text-sm text-gray-500 mt-0.5">
            Touch and feel paper weights, inspect finishing swatches, or choose FREE store pickup during checkout.
          </p>
        </div>
        <Link
          href="/ProceedToCheckout"
          className="self-start md:self-auto text-xs font-bold text-[#9c1dac] hover:text-purple-800 bg-purple-50 hover:bg-purple-100 px-3 py-1.5 rounded-lg transition"
        >
          Select Pickup Store at Checkout &rarr;
        </Link>
      </div>

      {/* Grid: Branch Selector Tabs & Detail Card */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Left: 6 Branch Quick List */}
        <div className="lg:col-span-5 flex flex-col gap-2.5 max-h-[380px] overflow-y-auto pr-1">
          {branches.map((b) => {
            const isSelected = activeBranch.id === b.id;
            return (
              <div
                key={b.id}
                onClick={() => setActiveBranch(b)}
                style={
                  isSelected
                    ? { backgroundColor: "#faf5ff", borderColor: "#9c1dac", borderWidth: "2px" }
                    : { backgroundColor: "#f9fafb", borderColor: "#e5e7eb" }
                }
                className={`p-3.5 rounded-xl border text-left cursor-pointer transition-all duration-200 flex items-center justify-between ${
                  isSelected
                    ? "shadow-md ring-2 ring-[#9c1dac]/20"
                    : "hover:bg-gray-100 hover:border-gray-300"
                }`}
              >
                <div className="flex items-start gap-3">
                  <div
                    className={`p-2 rounded-lg transition-colors ${
                      isSelected ? "bg-[#9c1dac] text-white shadow-sm" : "bg-gray-200 text-gray-600"
                    }`}
                  >
                    <Store size={16} />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className={`text-xs ${isSelected ? "font-black text-[#9c1dac]" : "font-extrabold text-gray-900"}`}>
                        {b.name}
                      </span>
                      <span className={`text-[10px] px-1.5 py-0.5 rounded font-bold transition-colors ${
                        isSelected ? "bg-[#9c1dac] text-white" : "bg-white border border-gray-200 text-gray-600"
                      }`}>
                        {b.code}
                      </span>
                    </div>
                    <p className="text-[11px] text-gray-500 mt-0.5">{b.area}, {b.city}</p>
                  </div>
                </div>
                <ChevronRight
                  size={16}
                  className={`transition-transform duration-200 ${
                    isSelected ? "text-[#9c1dac] translate-x-1 font-bold" : "text-gray-400"
                  }`}
                />
              </div>
            );
          })}
        </div>

        {/* Right: Active Branch Spotlight Card */}
        <div className="lg:col-span-7 bg-gradient-to-br from-gray-900 via-gray-900 to-[#2e1065] text-white rounded-xl p-5 sm:p-6 shadow-md flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-gray-800">
              <div>
                <span className="text-[11px] font-bold text-amber-300 uppercase tracking-wider">
                  Store Spotlight • {activeBranch.code}
                </span>
                <h3 className="text-lg sm:text-xl font-extrabold text-white mt-0.5">
                  {activeBranch.name}
                </h3>
              </div>
              <span className="inline-flex items-center gap-1 text-[11px] bg-emerald-500/20 border border-emerald-400/30 text-emerald-300 px-2.5 py-0.5 rounded-full font-semibold">
                Open for Pickup
              </span>
            </div>

            <div className="mt-4 space-y-3 text-xs sm:text-sm">
              <div className="flex items-start gap-2.5 text-gray-300">
                <MapPin size={17} className="text-purple-400 flex-shrink-0 mt-0.5" />
                <span className="leading-relaxed">{activeBranch.address}</span>
              </div>
              <div className="flex items-center gap-2.5 text-gray-300">
                <Phone size={16} className="text-purple-400 flex-shrink-0" />
                <span className="font-medium">{activeBranch.phone}</span>
              </div>
              <div className="flex items-center gap-2.5 text-gray-300">
                <Clock size={16} className="text-purple-400 flex-shrink-0" />
                <span>{activeBranch.timings}</span>
              </div>
            </div>

            {/* In-store capabilities */}
            <div className="mt-5 pt-4 border-t border-gray-800">
              <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider block mb-2">
                Available In-Store Facilities:
              </span>
              <div className="flex flex-wrap gap-2">
                {activeBranch.facilities.map((fac, i) => (
                  <span
                    key={i}
                    className="inline-flex items-center gap-1.5 text-xs bg-white/10 text-purple-200 border border-white/15 px-2.5 py-1 rounded-lg backdrop-blur-sm"
                  >
                    <CheckCircle2 size={13} className="text-emerald-400" />
                    {fac}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-gray-800 flex items-center justify-between text-xs text-gray-300">
            <span>Free packaging on all counter collections</span>
            <Link
              href="/paper-printing"
              className="px-3.5 py-1.5 bg-[#9c1dac] hover:bg-[#851694] text-white font-bold rounded-lg shadow transition"
            >
              Order for this Store &rarr;
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

