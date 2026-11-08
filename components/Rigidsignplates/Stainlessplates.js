"use client";

import React from "react";
import RigidPlateConfigurator from "./RigidPlateConfigurator";
import { Stainlessplatescalculation } from "@/lib/API/Rigidsignplates/Stainlessplates";

export default function Stainlessplates() {
  const types = [
    {
      value: "Stainless Steel Plates + Colour Etching",
      label: "SS 304 Plate + Chemical Etching & Color Infill",
      baseRate: 750
    },
    {
      value: "Mirror Gold Stainless Steel Plates + Etching",
      label: "Titanium Mirror Gold SS 304 + Deep Etching",
      baseRate: 980
    },
    {
      value: "Hairline Silver Stainless Steel Plate",
      label: "Hairline Brushed Silver SS 304 + Enamel Color Infill",
      baseRate: 850
    }
  ];

  const baseRates = {
    "Stainless Steel Plates + Colour Etching": 750,
    "Mirror Gold Stainless Steel Plates + Etching": 980,
    "Hairline Silver Stainless Steel Plate": 850
  };

  const thicknessOptions = [
    { value: "1.2mm", label: "1.2mm SS 304 Grade (Executive Door Sign)" },
    { value: "1.5mm", label: "1.5mm Heavy Architectural Grade SS 304" },
    { value: "2.0mm", label: "2.0mm Monumental Solid Stainless Steel" }
  ];

  return (
    <RigidPlateConfigurator
      productSlug="stainless-steel-plates"
      title="Stainless Steel Etched Nameplates"
      subtitle="Lifetime rust-proof Grade 304 stainless steel plates with deep acid chemical etching and baked enamel color infill for corporate offices and villas."
      types={types}
      baseRates={baseRates}
      defaultThickness="1.5mm"
      thicknessOptions={thicknessOptions}
      calculateApi={Stainlessplatescalculation}
      highlights={[
        "Marine-Grade SS 304 Alloy (100% Rust & Corrosion Proof)",
        "Deep Chemical Acid Etching with Oven-Cured Industrial Enamel",
        "Choice of Mirror Gold, Brushed Hairline Silver & Rose Gold Finishes",
        "Includes Stainless Steel Mirror Screws / Concealed Keyhole Mounts"
      ]}
    />
  );
}
