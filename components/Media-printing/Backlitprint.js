"use client";

import React from "react";
import MediaPrintConfigurator from "./MediaPrintConfigurator";
import { Backlitprintcalculation } from "@/lib/API/Media-printing/Backlitprint";

export default function Backlitprint() {
  const types = [
    { value: "Backlit Flex Print - Economy", label: "Backlit Flex Print - Economy (Standard Density)", baseRate: 40 },
    { value: "Backlit Flex Print - Premium", label: "Backlit Flex Print - Premium (Double-Strike Rich Density)", baseRate: 65 }
  ];

  const baseRates = {
    "Backlit Flex Print - Economy": 40,
    "Backlit Flex Print - Premium": 65
  };

  const surfaceOptions = [
    { value: "Vinyl Print", label: "Roll Only (With Welded Edges & Eyelets)" },
    { value: "Foamsheet3mm", label: "Mounted on 3mm Translucent Acrylic / Diffuser" },
    { value: "ACP3mm", label: "Lightbox Ready Stretched Material" }
  ];

  const surfaceRates = {
    "Vinyl Print": 0,
    Foamsheet3mm: 85,
    ACP3mm: 140
  };

  return (
    <MediaPrintConfigurator
      productSlug="backlit-flex-print"
      title="Backlit Flex Media Print"
      subtitle="Specially coated light-diffusing translucent flex printed with double-strike saturation so graphics pop vividly under internal LED illumination."
      types={types}
      baseRates={baseRates}
      surfaceOptions={surfaceOptions}
      surfaceRates={surfaceRates}
      calculateApi={Backlitprintcalculation}
      highlights={[
        "Double-Strike Heavy Ink Saturation to Prevent Night Washout",
        "Even Light Diffusion with No Hot-Spotting from Tube/LED Bulbs",
        "Tear-Resistant Reinforced Polyester Scrim Core (510 GSM)",
        "Weatherproof Exterior Grade UV-Cured Pigment Colors"
      ]}
    />
  );
}
