"use client";

import React from "react";
import MediaPrintConfigurator from "./MediaPrintConfigurator";
import { Vinylprintcalculation } from "@/lib/API/Media-printing/Vinylprint";

export default function Vinylprint() {
  const types = [
    { value: "Vinyl Print Economy", label: "Vinyl Print Economy (Promotional / Short-Term)", baseRate: 35 },
    { value: "Vinyl Print (Premium) Eco-solvent", label: "Vinyl Print (Premium) Eco-Solvent (High-Durability)", baseRate: 55 }
  ];

  const baseRates = {
    "Vinyl Print Economy": 35,
    "Vinyl Print (Premium) Eco-solvent": 55
  };

  const surfaceOptions = [
    { value: "Vinyl Print", label: "Vinyl Only (Self-Adhesive Sticker Roll)" },
    { value: "Foamsheet3mm", label: "Mounted on 3mm Sunboard PVC Foam Sheet" },
    { value: "Foamsheet5mm", label: "Mounted on 5mm Heavy Sunboard PVC Foam Sheet" },
    { value: "ACP3mm", label: "Mounted on 3mm Aluminium Composite Panel (ACP)" }
  ];

  const surfaceRates = {
    "Vinyl Print": 0,
    Foamsheet3mm: 35,
    Foamsheet5mm: 60,
    ACP3mm: 130
  };

  return (
    <MediaPrintConfigurator
      productSlug="vinyl-print"
      title="Self-Adhesive Vinyl Print"
      subtitle="High-definition self-adhesive vinyl printing with bubble-free adhesive and protective lamination for storefronts, glass partitions, and wall branding."
      types={types}
      baseRates={baseRates}
      surfaceOptions={surfaceOptions}
      surfaceRates={surfaceRates}
      calculateApi={Vinylprintcalculation}
      highlights={[
        "Japanese Roland 1440 DPI Ultra-Vibrant Micro-Piezo Inks",
        "Bubble-Free Air-Release Self-Adhesive Vinyl Backing",
        "Clear Cold Lamination Film (Glossy Vibrant / Matte Anti-Glare)",
        "Optional Stiff Sunboard (3mm/5mm) or ACP Sheet Mounting"
      ]}
    />
  );
}
