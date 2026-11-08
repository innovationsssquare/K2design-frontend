"use client";

import React from "react";
import MediaPrintConfigurator from "./MediaPrintConfigurator";
import { Threereflectorprintcalculation } from "@/lib/API/Media-printing/Threereflector";

export default function Threereflector() {
  const types = [
    { value: "3M Reflector + Transparent Film Print", label: "3M Commercial Grade Reflective Sheeting + Print", baseRate: 280 },
    { value: "3M Engineering Grade Diamond Reflective Sheeting", label: "3M Engineering Diamond Grade Prismatic Reflective", baseRate: 360 }
  ];

  const baseRates = {
    "3M Reflector + Transparent Film Print": 280,
    "3M Engineering Grade Diamond Reflective Sheeting": 360
  };

  const surfaceOptions = [
    { value: "Vinyl Print", label: "Reflective Media Sticker Only (Self-Adhesive)" },
    { value: "Foamsheet3mm", label: "Mounted on 3mm Heavy PVC Foam Sheet" },
    { value: "ACP 3mm", label: "Mounted on 3mm Aluminium Composite Panel (ACP)" }
  ];

  const surfaceRates = {
    "Vinyl Print": 0,
    Foamsheet3mm: 45,
    "ACP 3mm": 130
  };

  return (
    <MediaPrintConfigurator
      productSlug="3m-reflector"
      title="3M™ High-Intensity Reflective Print"
      subtitle="Genuine 3M retro-reflective sheeting engineered for high night-time visibility under vehicle headlights, highway signs, and safety warnings."
      types={types}
      baseRates={baseRates}
      surfaceOptions={surfaceOptions}
      surfaceRates={surfaceRates}
      calculateApi={Threereflectorprintcalculation}
      highlights={[
        "Genuine 3M™ Microprismatic Retro-Reflective Sheeting",
        "Reflects Vehicle Headlights from Hundreds of Meters at Night",
        "Compliant with Road Safety & Industrial Traffic Regulatory Norms",
        "Optional Heavy-Duty 3mm ACP Sheet Backing for Highway Signposts"
      ]}
    />
  );
}
