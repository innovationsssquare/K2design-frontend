"use client";

import React from "react";
import ModernSignConfigurator from "./ModernSignConfigurator";
import { Artframecalculation } from "@/lib/API/Modernproduct/Artframe";

export default function Artframe() {
  const types = [
    { value: "Steller - 50 mm Depth", label: "Steller Series (50mm Deep Box Profile - Silver)", baseMultiplier: 1.0 },
    { value: "Lunar - 50 mm Depth", label: "Lunar Series (50mm Deep Box Profile - Black)", baseMultiplier: 1.15 },
    { value: "Terra - 50 mm Depth", label: "Terra Series (50mm Deep Box Profile - Bronze)", baseMultiplier: 1.25 }
  ];

  const standardSizes = [
    { label: "A4 Size (210 × 297 mm)", value: "A4", baseCost: 650, printCost: 150 },
    { label: "A3 Size (297 × 420 mm)", value: "A3", baseCost: 1050, printCost: 250 },
    { label: "A2 Size (420 × 594 mm)", value: "A2", baseCost: 1750, printCost: 400 },
    { label: "A1 Size (594 × 841 mm)", value: "A1", baseCost: 2800, printCost: 750 },
    { label: "A0 Size (841 × 1189 mm)", value: "A0", baseCost: 4500, printCost: 1300 }
  ];

  return (
    <ModernSignConfigurator
      productSlug="art-frame"
      title="Architectural Art-Frame Deep Displays"
      subtitle="Heavy-gauge 50mm deep extruded aluminium profile art and canvas display frames for galleries, corporate lobbies, and flagship showrooms."
      types={types}
      standardSizes={standardSizes}
      calculateApi={Artframecalculation}
      highlights={[
        "Substantial 50mm Deep Heavy-Duty Extruded Aluminium Box Profile",
        "Concealed Corner Lock Mitre Joints with High Structural Rigidity",
        "Accommodates Fine Art Canvas, Backlit Graphics, or Acrylic Overlays",
        "Museum-Grade Anodized Surface (Silver, Matte Black & Terra Bronze)"
      ]}
    />
  );
}
