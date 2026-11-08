"use client";

import React from "react";
import SignboardConfigurator from "./SignboardConfigurator";
import { ThreeDLEDLetterCalculation } from "@/lib/API/LightandLedboards/3dledletter";

const THREE_D_LETTER_TYPES = [
  { value: "Acrylic 3D Letters - English", label: "Acrylic 3D Channel Letters (English Font)" },
  { value: "Acrylic 3D Letters - MARATHI", label: "Acrylic 3D Channel Letters (Marathi / Devnagari Font)" },
  { value: "Aluminium 3D Channel Letters", label: "Aluminium Body 3D Letters (Acrylic Front Glow)" },
  { value: "SS 3D Letters", label: "Stainless Steel (SS 304) 3D Letters (Backlit / Halo Glow)" },
  { value: "GOLD 3D Letters", label: "Titanium Gold Mirror Finish 3D Letters with Warm LED" },
  { value: "ROSE GOLD 3D Letters", label: "Rose Gold Mirror Finish Architectural 3D Letters" },
  { value: "MS 3D Letters", label: "Mild Steel (MS) Powder Coated Industrial 3D Letters" },
];

const THREE_D_LETTER_RATES = {
  "Acrylic 3D Letters - English": 85,
  "Acrylic 3D Letters - MARATHI": 95,
  "Aluminium 3D Channel Letters": 110,
  "SS 3D Letters": 125,
  "GOLD 3D Letters": 150,
  "ROSE GOLD 3D Letters": 160,
  "MS 3D Letters": 75,
};

export default function Threedledletter() {
  return (
    <SignboardConfigurator
      productKey="3dletters"
      title="3D LED Channel Letters"
      subtitle="Fabricated Acrylic & Stainless Steel 3D Architectural Letters with Front Glow & Halo Illumination"
      defaultImage="/images/NamePalates.png"
      types={THREE_D_LETTER_TYPES}
      baseRates={THREE_D_LETTER_RATES}
      calculateApi={ThreeDLEDLetterCalculation}
      isLetterBased={true}
    />
  );
}
