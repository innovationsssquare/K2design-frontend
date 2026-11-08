"use client";

import React from "react";
import ModernSignConfigurator from "./ModernSignConfigurator";
import { Optiframecalculation } from "@/lib/API/Modernproduct/Optiframes";

export default function Optiframes() {
  const types = [
    { value: "Silver Anodised", label: "Silver Anodized Aluminium (Classic Architectural)", baseMultiplier: 1.0 },
    { value: "Black Powder Coated", label: "Black Powder Coated (Contemporary Executive)", baseMultiplier: 1.15 },
    { value: "Wood Effect", label: "Natural Wood Grain Effect (Hospitality & Warm Decor)", baseMultiplier: 1.25 }
  ];

  const standardSizes = [
    { label: "A4 Size (210 × 297 mm)", value: "A4", baseCost: 450, printCost: 120 },
    { label: "A3 Size (297 × 420 mm)", value: "A3", baseCost: 750, printCost: 200 },
    { label: "A2 Size (420 × 594 mm)", value: "A2", baseCost: 1250, printCost: 350 },
    { label: "A1 Size (594 × 841 mm)", value: "A1", baseCost: 2100, printCost: 650 },
    { label: "A0 Size (841 × 1189 mm)", value: "A0", baseCost: 3600, printCost: 1100 }
  ];

  return (
    <ModernSignConfigurator
      productSlug="opti-frames"
      title="Opti-Frame Snap Poster Displays"
      subtitle="Heavy-duty 25mm extruded aluminium front-opening snap frames with anti-reflective UV lens for instant graphic updates."
      types={types}
      standardSizes={standardSizes}
      calculateApi={Optiframecalculation}
      highlights={[
        "Spring-Hinged 25mm Snap Profile Opens from Front on All 4 Sides",
        "Change Posters in Under 10 Seconds Without Removing Frame from Wall",
        "Includes Heavy-Duty UV-Resistant Non-Glare Protective Cover Lens",
        "Pre-Drilled Holes with Screws & Wall Plugs Supplied for Easy Mounting"
      ]}
    />
  );
}
