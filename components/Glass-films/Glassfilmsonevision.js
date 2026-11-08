"use client";

import React from "react";
import GlassFilmConfigurator from "./GlassFilmConfigurator";
import { Glassfilmsonevisioncalculation } from "@/lib/API/Glass-films/glassfilmsonevision";

export default function Glassfilmsonevision() {
  const types = [
    { value: "Economy", label: "One-Way Vision Perforated Film - Economy (Promotional / Short-Term)", baseRate: 45 },
    { value: "Premium", label: "One-Way Vision Perforated Film - Premium (High UV Resistance)", baseRate: 70 }
  ];

  const baseRates = {
    Economy: 45,
    Premium: 70
  };

  return (
    <GlassFilmConfigurator
      productSlug="one-way-vision-print-(glass-film)"
      title="One-Way Vision Perforated Glass Film"
      subtitle="Micro-perforated adhesive film that shows full-color vibrant graphics from the outside while allowing clear see-through visibility from the inside."
      types={types}
      baseRates={baseRates}
      calculateApi={Glassfilmsonevisioncalculation}
      highlights={[
        "60/40 Perforation Ratio with 1.6mm Micro-Holes for Crystal Clear Vision from Inside",
        "Full Vibrant External Photographic Graphics for Storefront Advertising",
        "Reduces Solar Heat and Glare by Up to 50%",
        "Black Adhesive Backing Ensuring Daytime One-Way Privacy"
      ]}
    />
  );
}
