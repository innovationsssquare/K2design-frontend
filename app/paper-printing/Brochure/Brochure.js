"use client";
import React from "react";
import PrintConfigurator from "@/components/PrintConfigurator/PrintConfigurator";

export default function Brochure() {
  return (
    <div className="w-full">
      <PrintConfigurator
        category="brochuresBooklets"
        title="Custom Brochures & Booklets"
      />
    </div>
  );
}
