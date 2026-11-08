"use client";

import React from "react";
import MediaPrintConfigurator from "./MediaPrintConfigurator";
import { Translitprintcalculation } from "@/lib/API/Media-printing/Translitprint";

export default function Translitprint() {
  const types = [
    { value: "Translit Print (for Cliapon)", label: "Translit Film (for LED Clip-On Frames)", baseRate: 90 },
    { value: "Duratrans Photographic Film", label: "Ultra-High Clarity Duratrans Film", baseRate: 130 }
  ];

  const baseRates = {
    "Translit Print (for Cliapon)": 90,
    "Duratrans Photographic Film": 130
  };

  const surfaceOptions = [
    { value: "Vinyl Print", label: "Translit Film Insert Only (Pre-Cut to Frame Size)" },
    { value: "Foamsheet3mm", label: "Supplied with Clear Protective Acrylic Overlay Sheet" }
  ];

  const surfaceRates = {
    "Vinyl Print": 0,
    Foamsheet3mm: 35
  };

  return (
    <MediaPrintConfigurator
      productSlug="translit-print-(for-cliapon)"
      title="Translit Film Print (For LED Clip-On Frames)"
      subtitle="High-density translucent polyester film designed specifically for ultra-thin LED snap and clip-on poster lightboxes."
      types={types}
      baseRates={baseRates}
      surfaceOptions={surfaceOptions}
      surfaceRates={surfaceRates}
      calculateApi={Translitprintcalculation}
      highlights={[
        "Specially Coated Light-Diffusing Translucent Polyester Film",
        "Microporous Ink Absorption for Needle-Sharp Photographic Resolution",
        "Designed Exactly for Thinlite LED Snap Frames & Clip-on Boxes",
        "Heat-Resistant Formula that Won't Curl or Bubble from Internal LEDs"
      ]}
    />
  );
}
