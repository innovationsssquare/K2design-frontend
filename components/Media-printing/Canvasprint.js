"use client";

import React from "react";
import MediaPrintConfigurator from "./MediaPrintConfigurator";
import { Canvasprintcalculation } from "@/lib/API/Media-printing/Canvasprint";

export default function Canvasprint() {
  const types = [
    { value: "Canvas Print", label: "Art Cotton Canvas Print (Roll / Border Margin)", baseRate: 75 },
    { value: "Canvas Print + Wooden Frame", label: "Canvas Print + Stretched Wooden Gallery Wrap Frame", baseRate: 155 }
  ];

  const baseRates = {
    "Canvas Print": 75,
    "Canvas Print + Wooden Frame": 155
  };

  const surfaceOptions = [
    { value: "Vinyl Print", label: "Canvas Fabric Roll Only (With 2\" Border Margin)" },
    { value: "Foamsheet3mm", label: "Mounted on 5mm Rigid Board Backing" },
    { value: "ACP3mm", label: "Pinewood Stretched Gallery Stretcher Bar Frame" }
  ];

  const surfaceRates = {
    "Vinyl Print": 0,
    Foamsheet3mm: 45,
    ACP3mm: 80
  };

  return (
    <MediaPrintConfigurator
      productSlug="canvas-print"
      title="Museum-Quality Canvas Print"
      subtitle="Heavyweight textured 380 GSM natural cotton canvas printed with archival Giclée inks and optional solid wood gallery wrap stretcher bars."
      types={types}
      baseRates={baseRates}
      surfaceOptions={surfaceOptions}
      surfaceRates={surfaceRates}
      calculateApi={Canvasprintcalculation}
      highlights={[
        "380 GSM 100% Woven Natural Cotton Canvas Substrate",
        "Archival 12-Color Pigment Giclée Print (Fade-Resistant for 50+ Years)",
        "Deep Textured Surface for Authentic Oil Painting / Photographic Depth",
        "Available with Handcrafted Kiln-Dried Pine Stretcher Bars Ready to Hang"
      ]}
    />
  );
}
