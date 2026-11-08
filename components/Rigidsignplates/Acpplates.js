"use client";

import React from "react";
import RigidPlateConfigurator from "./RigidPlateConfigurator";
import { Acpplatescalculation } from "@/lib/API/Rigidsignplates/Acpplates";

export default function Acpplates() {
  const types = [
    { value: "Ecosolvent Print + ACP", label: "Ecosolvent Print + ACP", baseRate: 220 },
    { value: "Vinyl Cutting (1 Colour) + ACP", label: "Vinyl Cutting (1 Colour) + ACP", baseRate: 260 },
    { value: "Vinyl Cutting (2 Colour) + ACP", label: "Vinyl Cutting (2 Colour) + ACP", baseRate: 310 }
  ];

  const baseRates = {
    "Ecosolvent Print + ACP": 220,
    "Vinyl Cutting (1 Colour) + ACP": 260,
    "Vinyl Cutting (2 Colour) + ACP": 310
  };

  const thicknessOptions = [
    { value: "3mm", label: "3mm Aluminium Composite Panel (Standard)" },
    { value: "4mm", label: "4mm Heavy Commercial ACP (Enhanced Flatness)" }
  ];

  return (
    <RigidPlateConfigurator
      productSlug="acp-plates"
      title="ACP Rigid Plates"
      subtitle="High-durability aluminium composite signboards with premium eco-solvent printing or plotter-cut vinyl graphics."
      types={types}
      baseRates={baseRates}
      defaultThickness="3mm"
      thicknessOptions={thicknessOptions}
      calculateApi={Acpplatescalculation}
      highlights={[
        "Weatherproof 3mm / 4mm Aluminium Composite Sheet (ACP)",
        "Eco-Solvent 1440 DPI Vibrant Print with Protective Lamination",
        "Optional Computer-Cut Vinyl Lettering in 1 or 2 Spot Colours",
        "Pre-drilled Holes & SS Standoff Mount Option for Sleek Floating Appearance"
      ]}
    />
  );
}
