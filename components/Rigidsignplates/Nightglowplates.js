"use client";

import React from "react";
import RigidPlateConfigurator from "./RigidPlateConfigurator";
import { Nightglowplatescalculation } from "@/lib/API/Rigidsignplates/Nightglowplates";

export default function Nightglowplates() {
  const types = [
    {
      value: "Vinyl Cut Letter + Night Glow + PVC Foam",
      label: "Vinyl Cut Letter + Night Glow + PVC Foam",
      baseRate: 340
    },
    {
      value: "Vinyl Cut Letter + Night Glow + ACP",
      label: "Vinyl Cut Letter + Night Glow + ACP",
      baseRate: 410
    }
  ];

  const baseRates = {
    "Vinyl Cut Letter + Night Glow + PVC Foam": 340,
    "Vinyl Cut Letter + Night Glow + ACP": 410
  };

  const thicknessOptions = [
    { value: "3mm", label: "3mm ACP / PVC Foam Sheet Base" },
    { value: "5mm", label: "5mm High-Density Rigid Base" }
  ];

  return (
    <RigidPlateConfigurator
      productSlug="night-glow-plates"
      title="Photoluminescent Night Glow Plates"
      subtitle="Glow-in-the-dark emergency evacuation, fire safety, and exit wayfinding plates that charge under ambient light and glow for hours in power outages."
      types={types}
      baseRates={baseRates}
      defaultThickness="3mm"
      thicknessOptions={thicknessOptions}
      calculateApi={Nightglowplatescalculation}
      highlights={[
        "DIN 67510 Certified High-Intensity Photoluminescent Film",
        "Charges Automatically Under Ambient Sunlight or Tube Lights",
        "Glows Continuously in Dark for Up to 6-8 Hours During Power Cut",
        "Essential for Industrial Safety, Stairways, Evacuation & Fire Exits"
      ]}
    />
  );
}
