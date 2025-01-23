"use client";
import React, { Suspense, lazy } from "react";
import { useParams } from "next/navigation";
import Billbooks from "@/components/Paper-printing/Billbooks/Billbooks";
import Pavtibooks from "@/components/Paper-printing/Pavtibooks/Pavtibooks";

const Brochure = lazy(() => import("@/components/Paper-printing/Brochure/Brochure"));
const Booklet = lazy(() => import("@/components/Paper-printing/Booklet/Booklet"));
const DigitalPoster = lazy(() => import("@/components/Paper-printing/DigitalPoster/DigitalPoster"));
const Stamp = lazy(() => import("@/components/Paper-printing/Stamp/Stamp"));

const Page = () => {
  const params = useParams();
  const { slug } = params;

  const renderComponent = () => {
    switch (slug) {
      case "brochure-cover":
        return <Brochure />;
      case "booklet-a4a5":
        return <Booklet />;
      case "digital-print-product":
        return <DigitalPoster />;
      case "stamp":
        return <Stamp/>;
      case "bill-books":
        return <Billbooks/>;
      case "pavati-book":
        return <Pavtibooks/>;
      default:
        return <div>Component not found for slug: {slug}</div>;
    }
  };

  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        {renderComponent()}
      </Suspense>
    </div>
  );
};

export default Page;
