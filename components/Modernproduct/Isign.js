"use client";

import React from "react";
import ModernSignConfigurator from "./ModernSignConfigurator";
import { Isigncalculation } from "@/lib/API/Modernproduct/Isign";

export default function Isign() {
  const types = [
    { value: "Silver Anodised", label: "Silver Anodized I-Sign Profile", baseMultiplier: 1.0 },
    { value: "Black Anodised", label: "Architectural Jet Black Anodized I-Sign", baseMultiplier: 1.15 },
    { value: "Bronze Anodised", label: "Metallic Champagne Bronze Anodized I-Sign", baseMultiplier: 1.25 }
  ];

  const standardSizes = [
    { label: "100 × 150 mm (Nameplate)", value: "100x150", baseCost: 480, printCost: 90 },
    { label: "150 × 200 mm (Department Tag)", value: "150x200", baseCost: 680, printCost: 130 },
    { label: "210 × 297 mm (A4 Directional)", value: "A4", baseCost: 1050, printCost: 200 },
    { label: "297 × 420 mm (A3 Floor Plan)", value: "A3", baseCost: 1850, printCost: 350 }
  ];

  return (
    <ModernSignConfigurator
      productSlug="i-sign"
      title="i-Sign Sleek Frame System"
      subtitle="Ultra-minimalist rimless architectural frame with magnetic locking mechanism for prestige office and boardroom displays."
      types={types}
      standardSizes={standardSizes}
      calculateApi={Isigncalculation}
      highlights={[
        "Ultra-Thin 9mm Depth Profile with Concealed Magnetic Clamping",
        "Zero-Bezel Rimless Aesthetic for Maximum Cleanliness and Elegance",
        "Suction-Cup Key Extraction for Tamper-Resistant Security",
        "Precision Swiss Architectural Anodized Finish"
      ]}
    />
  );
}
