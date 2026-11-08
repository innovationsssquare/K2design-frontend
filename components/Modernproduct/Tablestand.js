"use client";

import React from "react";
import ModernSignConfigurator from "./ModernSignConfigurator";
import { Tablestandcalculation } from "@/lib/API/Modernproduct/Tablestand";

export default function Tablestand() {
  const types = [
    { value: "Flat Table Stand - 31mm", label: "Flat Table Stand (31mm Slim Height)", baseMultiplier: 1.0 },
    { value: "Flat Table Stand - 62mm", label: "Flat Table Stand (62mm Executive Height)", baseMultiplier: 1.25 },
    { value: "Flat Table Stand - 31mm Slider", label: "Flat Table Stand (31mm with In/Out Slider)", baseMultiplier: 1.4 },
    { value: "Flat Table Stand - 62mm Slider", label: "Flat Table Stand (62mm with Vacant/Occupied Slider)", baseMultiplier: 1.6 },
    { value: "Curv Table Stand - 78mm", label: "Curved Convex Table Stand (78mm Executive)", baseMultiplier: 1.45 },
    { value: "Curv Table Stand - 109mm", label: "Curved Convex Table Stand (109mm Conference)", baseMultiplier: 1.7 }
  ];

  const standardSizes = [
    { label: "150 mm Width (Standard Desk Tag)", value: "150mm", baseCost: 350, printCost: 60 },
    { label: "200 mm Width (Executive Nameplate)", value: "200mm", baseCost: 450, printCost: 80 },
    { label: "250 mm Width (Director / MD Desk)", value: "250mm", baseCost: 580, printCost: 110 },
    { label: "300 mm Width (Conference / Reception)", value: "300mm", baseCost: 720, printCost: 140 }
  ];

  return (
    <ModernSignConfigurator
      productSlug="table-stand-name-plates"
      title="Table Stand & Desk Nameplate System"
      subtitle="Heavy-base extruded aluminium desktop nameplates with optional sliding availability indicators (In/Out, Vacant/Occupied) for executive desks."
      types={types}
      standardSizes={standardSizes}
      calculateApi={Tablestandcalculation}
      highlights={[
        "Solid Weighted Extruded Aluminium Base with Non-Slip Rubber Feet",
        "Optional Laser-Engraved Privacy Slider (Vacant / In-Use)",
        "Easy Slide-In Acrylic Lens for Instant Employee Name Updates",
        "Brushed Silver Anodized Finish Resisting Fingerprints and Scratches"
      ]}
    />
  );
}
