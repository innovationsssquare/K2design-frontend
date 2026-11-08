"use client";

import React from "react";
import SignboardConfigurator from "./SignboardConfigurator";
import { Fabricsledcalculation } from "@/lib/API/LightandLedboards/Fabricsled";

const FABRICS_LED_TYPES = [
  { value: "LED Fabrics Frames 75mm Depth", label: "LED Fabrics Frame (75mm Single Sided Profile)" },
  { value: "Aluminium profile (Silver Ano.)", label: "Aluminium Profile Silver Anodised (100mm Heavy Profile)" },
  { value: "LED Module", label: "Frameless SEG Textile Lightbox with High-Density Matrix LED" },
];

const FABRICS_LED_RATES = {
  "LED Fabrics Frames 75mm Depth": 750,
  "Aluminium profile (Silver Ano.)": 850,
  "LED Module": 920,
};

export default function Fabricsled() {
  return (
    <SignboardConfigurator
      productKey="fabricsled"
      title="Fabrics Textile LED Board (SEG Lightbox)"
      subtitle="Frameless Silicone Edge Graphic (SEG) Textile Display with Edge-to-Edge Vibrant Illumination"
      defaultImage="/images/HeroImage3.png"
      types={FABRICS_LED_TYPES}
      baseRates={FABRICS_LED_RATES}
      calculateApi={Fabricsledcalculation}
      isLetterBased={false}
    />
  );
}
