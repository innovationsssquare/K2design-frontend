"use client";

import React from "react";
import SignboardConfigurator from "./SignboardConfigurator";
import { LightboxBoardcalculation } from "@/lib/API/LightandLedboards/Lightbox";

const LIGHTBOX_TYPES = [
  { value: "Backlit Flex + LED Module 3'' Depth", label: "Backlit Flex + LED Module (3\" Depth)" },
  { value: "Acrylic + Vinyl cut letter + LED Module 3''depth board", label: "Acrylic + Vinyl Cut Letters + LED Module" },
  { value: "Acrylic + Acrylic cut letter + LED Module 3''depth board", label: "Acrylic + Raised Acrylic 3D Letters + LED" },
  { value: "Backlit flex + LED Strip 3''depth board", label: "Backlit Flex + High-Lumen LED Strip" },
];

const LIGHTBOX_RATES = {
  "Backlit Flex + LED Module 3'' Depth": 450,
  "Acrylic + Vinyl cut letter + LED Module 3''depth board": 650,
  "Acrylic + Acrylic cut letter + LED Module 3''depth board": 750,
  "Backlit flex + LED Strip 3''depth board": 380,
};

export default function Lightbox() {
  return (
    <SignboardConfigurator
      productKey="lightbox"
      title="Commercial Lightbox Board"
      subtitle="Heavy-Duty Exterior Backlit Flex & Cast Acrylic Illuminated Signage with Samsung LED Modules"
      defaultImage="/images/LEDBoard.png"
      types={LIGHTBOX_TYPES}
      baseRates={LIGHTBOX_RATES}
      calculateApi={LightboxBoardcalculation}
      isLetterBased={false}
    />
  );
}
