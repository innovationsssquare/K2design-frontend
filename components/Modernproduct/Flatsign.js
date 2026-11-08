"use client";

import React from "react";
import ModernSignConfigurator from "./ModernSignConfigurator";
import { Flatsigncalculation } from "@/lib/API/Modernproduct/Flatsign";

export default function Flatsign() {
  const types = [
    { value: "Wall Mounted", label: "Wall Mounted Flat Profile (Concealed Track)", baseMultiplier: 1.0 },
    { value: "Projected", label: "Projected 90° Corridor Flag Sign", baseMultiplier: 1.25 },
    { value: "Suspended Single Level", label: "Ceiling Suspended Single-Tier Sign", baseMultiplier: 1.35 },
    { value: "Suspended Double Level", label: "Ceiling Suspended Double-Tier Directory", baseMultiplier: 1.55 }
  ];

  const standardSizes = [
    { label: "100 × 150 mm (Room / Cabin Sign)", value: "100x150", baseCost: 380, printCost: 80 },
    { label: "150 × 200 mm (Department Title)", value: "150x200", baseCost: 550, printCost: 120 },
    { label: "210 × 297 mm (A4 Directional)", value: "A4", baseCost: 850, printCost: 150 },
    { label: "300 × 400 mm (Main Directory Plate)", value: "300x400", baseCost: 1450, printCost: 280 },
    { label: "400 × 600 mm (Building Directory Board)", value: "400x600", baseCost: 2400, printCost: 450 }
  ];

  return (
    <ModernSignConfigurator
      productSlug="flat-sign-board"
      title="Flat-Sign Modular Wayfinding System"
      subtitle="Ultra-slim flat aluminium modular wayfinding and door signs with end-caps and paper/vinyl graphic insert channels."
      types={types}
      standardSizes={standardSizes}
      calculateApi={Flatsigncalculation}
      highlights={[
        "Precision Extruded Architectural Flat Aluminium Body",
        "Interchangeable Clear Acrylic Lens with Magnetic / Friction Lock",
        "Modular Multi-Tier Stacking for Growing Office Directories",
        "Choice of Flat Wall Mount, Corridor Flag, or Wire Suspension"
      ]}
    />
  );
}
