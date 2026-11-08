"use client";

import React from "react";
import ModernSignConfigurator from "./ModernSignConfigurator";
import { Curvsigncalculation } from "@/lib/API/Modernproduct/Curvsign";

export default function Curvsign() {
  const types = [
    { value: "Wall Mounted", label: "Curved Wall Mounted Sign (Concealed Clips)", baseMultiplier: 1.0 },
    { value: "Projected", label: "Curved Double-Sided Corridor Projected Sign", baseMultiplier: 1.3 },
    { value: "Suspended Single Level", label: "Curved Single-Tier Ceiling Suspended", baseMultiplier: 1.4 },
    { value: "Suspended Double Level", label: "Curved Double-Tier Ceiling Suspended", baseMultiplier: 1.6 }
  ];

  const standardSizes = [
    { label: "100 × 150 mm (Office Door Tag)", value: "100x150", baseCost: 420, printCost: 80 },
    { label: "150 × 210 mm (A5 Curved Plate)", value: "A5", baseCost: 650, printCost: 120 },
    { label: "210 × 297 mm (A4 Curved Wayfinding)", value: "A4", baseCost: 950, printCost: 180 },
    { label: "297 × 420 mm (A3 Floor Directory)", value: "A3", baseCost: 1650, printCost: 300 }
  ];

  return (
    <ModernSignConfigurator
      productSlug="curv-sign"
      title="Curv-Sign Convex Architectural Signs"
      subtitle="Convex curved aluminium signage system offering high viewing angles, contemporary aesthetic, and easy graphic replacement."
      types={types}
      standardSizes={standardSizes}
      calculateApi={Curvsigncalculation}
      highlights={[
        "Aerodynamic Convex Curve Profile with High Off-Angle Readability",
        "Anodized Natural Silver Aluminium with High-Grade Polymer End Caps",
        "Flexible Clear Matte Anti-Glare Protective Insert Cover",
        "Suited for Hospitals, Universities, Corporate Headquarters & Airports"
      ]}
    />
  );
}
