"use client";

import React from "react";
import SignboardConfigurator from "./SignboardConfigurator";
import { Cliponframescalculation } from "@/lib/API/LightandLedboards/Cliponframes";

const CLIPON_TYPES = [
  { value: "Silver Anodised", label: "Silver Anodised Aluminium Snap Frame (Slim 25mm)" },
  { value: "Black Anodised", label: "Black Anodised Matte Snap Frame (Architectural)" },
];

const CLIPON_RATES = {
  "Silver Anodised": 1100,
  "Black Anodised": 1250,
};

export default function Cliponframes() {
  return (
    <SignboardConfigurator
      productKey="clipon"
      title="LED Thinlite Clip-on Snap Frame"
      subtitle="Ultra-Slim Anodised Aluminium Snap Frame with Laser-Dotted LGP Light Guide Panel for Instant Poster Changes"
      defaultImage="/images/CLIAPON FRAMES.png"
      types={CLIPON_TYPES}
      baseRates={CLIPON_RATES}
      calculateApi={Cliponframescalculation}
      isLetterBased={false}
    />
  );
}
