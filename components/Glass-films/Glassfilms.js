"use client";

import React from "react";
import GlassFilmConfigurator from "./GlassFilmConfigurator";
import { Glassfilmscalculation } from "@/lib/API/Glass-films/glassfilms";

export default function Glassfilms() {
  const types = [
    { value: "Frosted Film-White crystal", label: "Frosted Film - White Crystal (Classic Office Privacy)", baseRate: 65 },
    { value: "Frosted Film-White-LG Hausys", label: "Frosted Film - White LG Hausys (Architectural Standard)", baseRate: 75 },
    { value: "Frosted Film-White 3M", label: "Frosted Film - White 3M™ Scotchcal Dusted / Frosted", baseRate: 85 },
    { value: "Frosted Film-Sparkle LG Hausys", label: "Frosted Film - Sparkle Crystal Texture (LG Hausys)", baseRate: 95 },
    { value: "Frosted Film-Semi Transparent LG Hausys", label: "Frosted Film - Semi-Transparent Soft Etch", baseRate: 75 },
    { value: "Frosted Film-Silver LG Hausys", label: "Frosted Film - Metallic Silver Frosting", baseRate: 80 },
    { value: "Film-Transparent-Gloss", label: "Clear Window Vinyl - Gloss Optical Transparency", baseRate: 55 },
    { value: "Film-Transparent-Matt", label: "Clear Window Vinyl - Matte Anti-Glare Finish", baseRate: 55 },
    { value: "Black Suncontrol film-Garware", label: "Sun-Control Solar Film - Garware (70% Heat Cut)", baseRate: 65 },
    { value: "Black Suncontrol film-Anti Scrach-Garware", label: "Anti-Scratch Solar Sun-Control - Garware High Rejection", baseRate: 85 },
    { value: "Decorative film for window & glass door", label: "Decorative Architectural Window & Glass Film", baseRate: 95 }
  ];

  const baseRates = {
    "Frosted Film-White crystal": 65,
    "Frosted Film-White-LG Hausys": 75,
    "Frosted Film-White 3M": 85,
    "Frosted Film-Sparkle LG Hausys": 95,
    "Frosted Film-Semi Transparent LG Hausys": 75,
    "Frosted Film-Silver LG Hausys": 80,
    "Film-Transparent-Gloss": 55,
    "Film-Transparent-Matt": 55,
    "Black Suncontrol film-Garware": 65,
    "Black Suncontrol film-Anti Scrach-Garware": 85,
    "Decorative film for window & glass door": 95
  };

  return (
    <GlassFilmConfigurator
      productSlug="glass-films"
      title="Architectural Frosted & Sun-Control Glass Films"
      subtitle="Commercial privacy frosted films, decorative manifestations, and Garware sun-control films for conference rooms, cabins, and glass facades."
      types={types}
      baseRates={baseRates}
      calculateApi={Glassfilmscalculation}
      highlights={[
        "LG Hausys & 3M™ Cast Films with 5+ Years Durability",
        "Diffuses Harsh Glare while Retaining Natural Daytime Lighting",
        "Available Plain or with Custom Computer Plotter Cut Bands & Logos",
        "Optional Doorstep Professional Installation Across Pune & Mumbai"
      ]}
    />
  );
}
