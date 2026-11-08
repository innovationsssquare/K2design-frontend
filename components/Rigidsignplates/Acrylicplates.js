"use client";

import React from "react";
import RigidPlateConfigurator from "./RigidPlateConfigurator";
import { Acrylicplatescalculation } from "@/lib/API/Rigidsignplates/Acrylicplates";

export default function Acrylicplates() {
  const types = [
    { value: "Acrylic 4mm + Vinyl Letter", label: "Acrylic 4mm + Vinyl Letter", baseRate: 320 },
    { value: "Acrylic 4mm + Golden Vinyl Letter", label: "Acrylic 4mm + Golden Vinyl Letter", baseRate: 380 },
    { value: "Acrylic Letter 2mm + Acrylic back 4mm", label: "Acrylic Letter 2mm + Acrylic back 4mm", baseRate: 490 },
    { value: "Acrylic Letter 2mm + ACP 3mm", label: "Acrylic Letter 2mm + ACP 3mm", baseRate: 420 }
  ];

  const baseRates = {
    "Acrylic 4mm + Vinyl Letter": 320,
    "Acrylic 4mm + Golden Vinyl Letter": 380,
    "Acrylic Letter 2mm + Acrylic back 4mm": 490,
    "Acrylic Letter 2mm + ACP 3mm": 420
  };

  const thicknessOptions = [
    { value: "4mm", label: "4mm Cast Acrylic Base (Standard)" },
    { value: "5mm", label: "5mm Heavy Architectural Cast Acrylic" },
    { value: "8mm", label: "8mm Deep Premium Cast Acrylic Block" }
  ];

  return (
    <RigidPlateConfigurator
      productSlug="acrylic-plates"
      title="Acrylic Sign Plates & Nameplates"
      subtitle="Laser flame-polished cast acrylic plates with high-gloss vinyl or 3D raised acrylic lettering for corporate reception and doors."
      types={types}
      baseRates={baseRates}
      defaultThickness="4mm"
      thicknessOptions={thicknessOptions}
      calculateApi={Acrylicplatescalculation}
      highlights={[
        "Grade-A Virgin Cast Acrylic with 92% Optical Transparency",
        "Laser-Cut Flame Polished Beveled Edges for Crystal Clarity",
        "Dual-Layer 3D Letter Overlay or High-Tack Mirror Vinyl Options",
        "Supplied with 4 Brass / SS Architectural Standoff Mounts"
      ]}
    />
  );
}
