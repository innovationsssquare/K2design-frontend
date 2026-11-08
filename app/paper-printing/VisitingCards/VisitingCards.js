"use client";
import React from "react";
import PrintConfigurator from "@/components/PrintConfigurator/PrintConfigurator";

export default function VisitingCards() {
  return (
    <div className="w-full">
      <PrintConfigurator
        category="visitingCards"
        title="Custom Visiting & Business Cards"
      />
    </div>
  );
}
