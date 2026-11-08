"use client";

import React from "react";
import FlexFrameConfigurator from "./FlexFrameConfigurator";
import { Flexbanneradvertisecalculation } from "@/lib/API/Flex-printing/Flexbanneradvertise";

export default function Flexbanneradvertise() {
  return (
    <FlexFrameConfigurator
      productKey="advertise_ms_frame"
      title="Commercial Hoarding Banner + Angle Frame"
      subtitle="Large-Format Outdoor Hoarding & Highway Display Banner with Heavy-Duty Structural MS Angle Iron Frame"
      frameType="ms_angle"
      baseRatePerSqFt={68}
      minSqFt={20}
      minPrice={1360}
      features={[
        "Heavy-Duty Structural MS Angle Iron Bracing Frame",
        "Wind-Resistant 440 GSM Commercial Frontlit Flex",
        "Zinc-Coated Anti-Corrosion Fasteners & Anchors",
        "Designed for Rooftop, Highway & Shop Fascia Hoardings"
      ]}
      types={[
        { value: "Commercial Hoarding + Angle Frame", label: "Commercial Hoarding + Angle Frame (Standard)", rate: 68 },
        { value: "Heavy Highway Hoarding + Truss Frame", label: "Heavy Highway Hoarding + Truss Frame", rate: 85 }
      ]}
      calculateApi={Flexbanneradvertisecalculation}
    />
  );
}
