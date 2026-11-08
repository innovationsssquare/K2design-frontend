"use client";

import React from "react";
import FlexFrameConfigurator from "./FlexFrameConfigurator";
import { FlexBannerWoodencalculation } from "@/lib/API/Flex-printing/Flexbannerwood";

export default function Flexbannerwood() {
  return (
    <FlexFrameConfigurator
      productKey="wood_batten_frame"
      title="Flex Banner + Wooden Batten Frame"
      subtitle="Lightweight Wooden Batten (Patta) Frame Flex Banner for Short-Term Campaigns, Exhibitions & Event Stages"
      frameType="wood"
      baseRatePerSqFt={24}
      minSqFt={8}
      minPrice={192}
      features={[
        "Durable Kiln-Dried Wooden Batten (Patta) Framing",
        "High-Speed Flush Staple Pin Tensioning",
        "Lightweight for Quick Hanging & Event Stage Backdrop",
        "Cost-Effective Solution for Promotional & Short-Term Events"
      ]}
      types={[
        { value: "Wooden Frame (1.5 inch Patta)", label: "Wooden Batten Frame (1.5 inch Patta)", rate: 24 },
        { value: "Heavy Wooden Frame (2 inch Patta)", label: "Heavy Wooden Batten Frame (2 inch Patta)", rate: 30 }
      ]}
      calculateApi={FlexBannerWoodencalculation}
    />
  );
}
