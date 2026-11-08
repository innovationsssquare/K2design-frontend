"use client";

import React from "react";
import MediaPrintConfigurator from "./MediaPrintConfigurator";
import { Nightglowprintcalculation } from "@/lib/API/Media-printing/Nightglowprint";

export default function Nightglowprint() {
  const types = [
    { value: "Night Glow Print (Green)", label: "Night Glow Print - Neon Luminescent Green", baseRate: 220 },
    { value: "Night Glow Print (High-Intensity Blue)", label: "Night Glow Print - High-Intensity Cyan Blue", baseRate: 260 }
  ];

  const baseRates = {
    "Night Glow Print (Green)": 220,
    "Night Glow Print (High-Intensity Blue)": 260
  };

  const surfaceOptions = [
    { value: "NightGlow", label: "Self-Adhesive Night Glow Vinyl Sticker Roll" },
    { value: "Foamsheet3mm", label: "Mounted on 3mm Rigid PVC Foam Sheet" },
    { value: "Foamsheet5mm", label: "Mounted on 5mm Rigid PVC Foam Sheet" },
    { value: "ACP3mm", label: "Mounted on 3mm Aluminium Composite Panel (ACP)" }
  ];

  const surfaceRates = {
    NightGlow: 0,
    Foamsheet3mm: 45,
    Foamsheet5mm: 70,
    ACP3mm: 140
  };

  return (
    <MediaPrintConfigurator
      productSlug="night-glow-print-(green)"
      title="Night Glow Photoluminescent Print"
      subtitle="Glow-in-the-dark self-adhesive media printed with high-visibility safety symbols and text that illuminate emergency exits and pathways in total darkness."
      types={types}
      baseRates={baseRates}
      surfaceOptions={surfaceOptions}
      surfaceRates={surfaceRates}
      calculateApi={Nightglowprintcalculation}
      highlights={[
        "DIN 67510 High-Luminance Phosphorescent Pigment Film",
        "Charges Automatically Under Standard Indoor White or Natural Light",
        "Visible for Over 6-8 Hours in Complete Darkness / Blackout",
        "Waterproof, Chemical-Resistant, and Tearproof Construction"
      ]}
    />
  );
}
