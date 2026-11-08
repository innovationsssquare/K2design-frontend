"use client";

import React from "react";
import FlexFrameConfigurator from "./FlexFrameConfigurator";
import { FlexStandcalculation } from "@/lib/API/Flex-printing/Flexstandprint";

export default function Flexstandprint() {
  return (
    <FlexFrameConfigurator
      productKey="x_stand_display"
      title="Promotional Flex X-Banner Standee"
      subtitle="Lightweight Portable Fiberglass X-Frame Tension Display Stand with High-Resolution Matte Flex & Brass Corner Eyelets"
      frameType="x_stand"
      baseRatePerSqFt={65}
      minSqFt={10}
      minPrice={650}
      features={[
        "Durable Lightweight Fiberglass & Carbon Rod X-Frame",
        "4 Heavy Brass Corner Eyelet Grommets Pre-Installed",
        "High-Resolution 300 DPI Non-Glare Matte Flex Graphic",
        "Includes Padded Compact Fabric Carry Bag"
      ]}
      types={[
        { value: "X-Stand (2ft x 5ft)", label: "Standard X-Standee (2 ft × 5 ft)", rate: 65 },
        { value: "X-Stand (2.5ft x 6ft)", label: "Large X-Standee (2.5 ft × 6 ft)", rate: 75 }
      ]}
      calculateApi={FlexStandcalculation}
    />
  );
}
