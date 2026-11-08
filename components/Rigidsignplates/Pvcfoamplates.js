"use client";

import React from "react";
import RigidPlateConfigurator from "./RigidPlateConfigurator";
import { Pvcfoamplatescalculation } from "@/lib/API/Rigidsignplates/Pvcfoamplate";

export default function Pvcfoamplates() {
  const types = [
    { value: "Vinyl Print + PVC Foam", label: "Vinyl Print + PVC Foam", baseRate: 140 },
    { value: "Ecosolvent Print + PVC Foam", label: "Ecosolvent Print + PVC Foam", baseRate: 160 },
    { value: "Vinyl Cutting (1 Colour ) + PVC Foam", label: "Vinyl Cutting (1 Colour) + PVC Foam", baseRate: 190 },
    { value: "Vinyl Cutting (2 Colour ) + PVC Foam", label: "Vinyl Cutting (2 Colour) + PVC Foam", baseRate: 230 }
  ];

  const baseRates = {
    "Vinyl Print + PVC Foam": 140,
    "Ecosolvent Print + PVC Foam": 160,
    "Vinyl Cutting (1 Colour ) + PVC Foam": 190,
    "Vinyl Cutting (2 Colour ) + PVC Foam": 230
  };

  const thicknessOptions = [
    { value: "3mm", label: "3mm Lightweight Forex PVC Foam Sheet" },
    { value: "5mm", label: "5mm Stiff High-Density PVC Foam Board" },
    { value: "8mm", label: "8mm Heavy-Gauge Rigid PVC Sheet" }
  ];

  return (
    <RigidPlateConfigurator
      productSlug="pvc-foam-plates"
      title="PVC Foam Sheet Sign Plates"
      subtitle="Ultra-lightweight, moisture-resistant rigid foam boards for indoor wall displays, exhibitions, and cost-effective retail signs."
      types={types}
      baseRates={baseRates}
      defaultThickness="5mm"
      thicknessOptions={thicknessOptions}
      calculateApi={Pvcfoamplatescalculation}
      highlights={[
        "High-Density Rigid Closed-Cell PVC Foam Substrate",
        "Smooth Matte White Surface for Vivid High-Resolution Inks",
        "Featherlight & Water-Resistant (Ideal for Easy Double-Tape Mounting)",
        "Precision CNC Contour Cut to Custom Rectangles or Shapes"
      ]}
    />
  );
}
