"use client";

import React from "react";
import FlexFrameConfigurator from "./FlexFrameConfigurator";
import { Flexbannereconomycalculation } from "@/lib/API/Flex-printing/Flexbannereconomy";

export default function Flexbannereconomy() {
  return (
    <FlexFrameConfigurator
      productKey="economy_ms_frame"
      title="Flex Banner Economy + MS Frame"
      subtitle="Heavy-Duty 260 GSM Frontlit Flex Stretched on 1-Inch Square Mild Steel Welded Tubular Pipe Frame"
      frameType="ms_pipe"
      baseRatePerSqFt={38}
      minSqFt={10}
      minPrice={380}
      features={[
        "1-Inch Square MS Welded Pipe Frame Structure",
        "Anti-Rust Red Oxide Primer + Dark Grey Finish Coat",
        "260 GSM Frontlit Flex Stretched with Self-Tapping Fasteners",
        "Includes Pre-Welded Heavy Wall Mounting Clamps"
      ]}
      types={[
        { value: "Normal Flex (Economy) + MS Frame", label: "Normal Flex (Economy) + MS Frame", rate: 38 },
        { value: "Star Flex (Economy) + MS Frame", label: "Star Flex (Gloss Coating) + MS Frame", rate: 45 }
      ]}
      calculateApi={Flexbannereconomycalculation}
    />
  );
}
