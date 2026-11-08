"use client";

import React from "react";
import SignboardConfigurator from "./SignboardConfigurator";
import { Backlittubecalculation } from "@/lib/API/LightandLedboards/Backlittube";

const BACKLIT_TUBE_TYPES = [
  { value: "Backlit (Tube) Flex Board 1 side", label: "Backlit (Tube) Flex Board (Single Sided)" },
  { value: "Backlit (Tube) Flex Board 2 side", label: "Backlit (Tube) Flex Board (Double Sided Projecting)" },
  { value: "Lengthy Backlit (Tube) Flex Board 1 side", label: "Lengthy Highway Format Backlit Flex Board" },
];

const BACKLIT_TUBE_RATES = {
  "Backlit (Tube) Flex Board 1 side": 280,
  "Backlit (Tube) Flex Board 2 side": 420,
  "Lengthy Backlit (Tube) Flex Board 1 side": 320,
};

export default function Backlittube() {
  return (
    <SignboardConfigurator
      productKey="backlittube"
      title="Backlit Tube Flex Board"
      subtitle="Heavy-Duty MS Tubular Frame with Weatherproof Backlit Flex & Commercial Tube/LED Illumination"
      defaultImage="/images/StandBoard1.jpg"
      types={BACKLIT_TUBE_TYPES}
      baseRates={BACKLIT_TUBE_RATES}
      calculateApi={Backlittubecalculation}
      isLetterBased={false}
    />
  );
}
