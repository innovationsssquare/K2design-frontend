
'use client';

import React from "react";
import HeroCarousel from "@/components/Carousel/HeroCarousel";
import TrustBar from "@/components/TrustBar/TrustBar";
import Exploreallcategories from "./categories/page";
import AllProductCard from "@/components/ProductCard/AllProductCard";
import AdsCrausal from "@/components/AdsCrausal/AdsCrausal";
import BranchShowcase from "@/components/BranchLocator/BranchShowcase";
import TrendingProductCards from "@/components/TrendingProductCard/TrendingProductCards";
import RecentlyView from "@/components/RecentlyView/RecentlyView";

export default function Home() {
  return (
    <main className="font-sans text-gray-900 bg-[#f1f2f4] flex flex-col gap-3 lg:gap-5 pb-8">
      {/* 1. Hero Promotional Slider */}
      <HeroCarousel />

      {/* 2. Trust Bar (6 Branches, 24h Turnaround, Free Proof, 100% Assurance) */}
      <TrustBar />

      {/* 3. Explore All 13 Categories */}
      <Exploreallcategories />

      {/* 4. Most Popular & High-Demand Print Products with Live Rates */}
      <AllProductCard />

      {/* 5. Promotional Campaigns (Business Identity Bundle + LED Boards) */}
      <AdsCrausal />

      {/* 6. 6 Physical Branch Stores & Local Touchpoint Locator */}
      <BranchShowcase />

      {/* 7. Trending Products Carousel */}
      <TrendingProductCards />

      {/* 8. Recently Viewed Items */}
      <RecentlyView />
    </main>
  );
}
