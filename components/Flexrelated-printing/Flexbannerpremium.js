"use client";

import React from "react";
import FlexFrameConfigurator from "./FlexFrameConfigurator";
import { Flexbannerpremiumcalculation } from "@/lib/API/Flex-printing/Flexbannerpremium";

export default function Flexbannerpremium() {
  return (
    <FlexFrameConfigurator
      productKey="premium_ms_frame"
      title="Flex Banner Premium + MS Frame"
      subtitle="Heavy-Duty 340 GSM Star / Blackout Flex Stretched on Extra-Rigid 1.25-Inch Square Tubular MS Pipe Frame"
      frameType="ms_heavy"
      baseRatePerSqFt={55}
      minSqFt={10}
      minPrice={550}
      features={[
        "Extra-Rigid 1.25-Inch Square MS Welded Pipe Frame",
        "High-Durability 340 GSM Star / Blackout Flex Material",
        "Anti-Rust Industrial Protective Finish Coating",
        "Heavy-Duty Wall Mounting Anchor Brackets Included"
      ]}
      types={[
        { value: "Star Flex + Heavy MS Frame", label: "Star Flex (340 GSM) + Heavy MS Frame", rate: 55 },
        { value: "Blackout Flex + Heavy MS Frame", label: "Blackout Flex (100% Light Blocking) + Heavy MS Frame", rate: 65 }
      ]}
      calculateApi={Flexbannerpremiumcalculation}
    />
  );
}
