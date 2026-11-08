"use client";

import React from "react";
import SignboardConfigurator from "./SignboardConfigurator";
import { Acpstancilcalculation } from "@/lib/API/LightandLedboards/Acpstancil";

const ACP_STENCIL_TYPES = [
  { value: "ACP Stencil LED Board", label: "ACP Stencil LED Board (Standard 3mm ACP)" },
  { value: "Modular ACP Stencil LED Board", label: "Modular Heavy ACP Stencil LED Board (4mm Architectural)" },
];

const ACP_STENCIL_RATES = {
  "ACP Stencil LED Board": 680,
  "Modular ACP Stencil LED Board": 850,
};

export default function Acpstancil() {
  return (
    <SignboardConfigurator
      productKey="acpstencil"
      title="ACP Stencil LED Board"
      subtitle="CNC Routed Aluminium Composite Panel with Acrylic Inlay & Weatherproof High-Density LEDs"
      defaultImage="/images/ACPandAcrylic.png"
      types={ACP_STENCIL_TYPES}
      baseRates={ACP_STENCIL_RATES}
      calculateApi={Acpstancilcalculation}
      isLetterBased={false}
    />
  );
}
