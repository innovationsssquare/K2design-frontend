"use client";
import React, { useEffect, useState } from "react";
import { Card, CardFooter, Image } from "@nextui-org/react";
import Link from "next/link";

import StandardVisitingCard from "../../public/images/StandardVisitingCard.jpeg";
import brochures from "../../public/images/brochures.jpeg";
import PaperBag from "../../public/images/PaperBag.jpeg";
import Stickers from "../../public/images/Stickers.jpeg";
import Stamp from "../../public/images/Stamp.jpeg";
import StandBoard from "../../public/images/StandBoard.jpeg";
import PhotoAlbum from "../../public/images/PhotoAlbum.jpeg";
import DiryWithPen from "../../public/images/DiryWithPen.jpeg";
import Lanyards from "../../public/images/Lanyards.jpeg";
import CardInvitation from "../../public/images/CardInvitation.jpeg";
import LEAFLETA from "../../public/images/LEAFLETA.jpg";
import Calnedar from "../../public/images/Calnedar.jpg";

export default function App() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const cardsData = [
    {
      title: "Standard Visiting Cards",
      price: "₹200",
      unit: "per 100 pcs",
      badge: "⭐ Best Seller",
      img: StandardVisitingCard.src,
      link: "/paper-printing/VisitingCards",
    },
    {
      title: "Marketing Brochures",
      price: "₹370",
      unit: "per 25 pcs",
      badge: "⚡ 24-48h Dispatch",
      img: brochures.src,
      link: "/paper-printing/Brochure",
    },
    {
      title: "Custom Printed Paper Bags",
      price: "₹100",
      unit: "per 10 pcs",
      badge: "🌱 Luxury Kraft",
      img: PaperBag.src,
      link: "/paper-printing",
    },
    {
      title: "Die-Cut Vinyl Stickers",
      price: "₹160",
      unit: "per 24 pcs",
      badge: "💧 Waterproof",
      img: Stickers.src,
      link: "/paper-printing",
    },
    {
      title: "Self-Inking Rubber Stamps",
      price: "₹290",
      unit: "per stamp",
      badge: "🖊️ Instant Ink",
      img: Stamp.src,
      link: "/paper-printing",
    },
    {
      title: "Custom Photo Albums & Books",
      price: "₹1,000",
      unit: "per album",
      badge: "💎 Lay-Flat Bind",
      img: PhotoAlbum.src,
      link: "/paper-printing",
    },
    {
      title: "Executive Diaries & Pens",
      price: "₹100",
      unit: "starting rate",
      badge: "🎁 Corporate Gift",
      img: DiryWithPen.src,
      link: "/paper-printing",
    },
    {
      title: "Event & Wedding Invitations",
      price: "₹220",
      unit: "per 100 pcs",
      badge: "✨ Gold Foil",
      img: CardInvitation.src,
      link: "/paper-printing",
    },
    {
      title: "Architectural Stand Boards",
      price: "₹2,500",
      unit: "per frame",
      badge: "🏢 Weatherproof",
      img: StandBoard.src,
      link: "/categories",
    },
    {
      title: "Custom Desk Calendars",
      price: "₹180",
      unit: "per calendar",
      badge: "📅 12 Months",
      img: Calnedar.src,
      link: "/paper-printing",
    },
    {
      title: "Branded Lanyards & Badges",
      price: "₹45",
      unit: "per piece",
      badge: "🎫 Satin Ribbon",
      img: Lanyards.src,
      link: "/categories",
    },
    {
      title: "Promotional Leaflets & Flyers",
      price: "₹250",
      unit: "per 500 pcs",
      badge: "🚀 High Volume",
      img: LEAFLETA.src,
      link: "/paper-printing",
    },
  ];

  if (!isMounted) {
    return (
      <div className="mx-4 shadow-sm my-1 mb-5 p-6 bg-white rounded-2xl border border-gray-100 min-h-[350px]">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-gray-900">
              Popular & High-Demand Products
            </h2>
            <p className="text-xs sm:text-sm text-gray-500 mt-1">
              Top-selling custom printing products backed by our 6 local branch stores.
            </p>
          </div>
        </div>
        <div className="gap-5 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-6 mb-4">
          {cardsData.map((_, index) => (
            <div key={index} className="h-[280px] bg-gray-100 rounded-xl animate-pulse" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="mx-4 shadow-sm my-3 mb-6 p-4 sm:p-6 bg-white rounded-2xl border border-gray-100">
      {/* Section Heading */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 mb-4 border-b border-gray-100 gap-2">
        <div>
          <span className="text-xs font-bold text-[#9c1dac] uppercase tracking-wider">
            Verified Factory Rates
          </span>
          <h2 className="text-xl sm:text-2xl font-extrabold text-gray-900 mt-0.5">
            Most Popular Print Products
          </h2>
          <p className="text-xs sm:text-sm text-gray-500 mt-0.5">
            Real-time pricing with exact 18% GST calculation and instant store pickup.
          </p>
        </div>
        <Link
          href="/categories"
          className="self-start sm:self-auto text-xs sm:text-sm font-semibold text-[#146eb4] hover:text-blue-800 flex items-center gap-1 transition"
        >
          View all 13 categories &rarr;
        </Link>
      </div>

      {/* Card Grid */}
      <div className="gap-4 sm:gap-5 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-6">
        {cardsData.map((card, index) => (
          <Link
            key={index}
            href={card.link}
            className="group block relative bg-white border border-gray-200 rounded-xl overflow-hidden hover:border-[#9c1dac] hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
          >
            {/* Top Badge */}
            <div className="absolute top-2.5 left-2.5 z-10">
              <span className="text-[10px] font-bold bg-white/90 backdrop-blur-sm text-gray-800 px-2 py-0.5 rounded-full shadow-sm border border-gray-200/50">
                {card.badge}
              </span>
            </div>

            {/* Product Image */}
            <div className="relative h-44 sm:h-48 w-full bg-gray-50 overflow-hidden">
              <Image
                removeWrapper
                alt={card.title}
                className="z-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                src={card.img}
              />
            </div>

            {/* Product Info & Pricing */}
            <div className="p-3 sm:p-3.5 flex flex-col justify-between flex-grow bg-white border-t border-gray-100">
              <div>
                <h3 className="text-xs sm:text-sm font-bold text-gray-900 line-clamp-1 group-hover:text-[#9c1dac] transition">
                  {card.title}
                </h3>
                <div className="mt-1 flex items-baseline gap-1">
                  <span className="text-sm sm:text-base font-extrabold text-[#9c1dac]">
                    {card.price}
                  </span>
                  <span className="text-[10px] text-gray-400 font-medium">
                    {card.unit}
                  </span>
                </div>
              </div>

              <div className="mt-3 pt-2 border-t border-dashed border-gray-100 flex items-center justify-between">
                <span className="text-[11px] text-gray-500 font-medium group-hover:text-gray-900 transition">
                  Customize
                </span>
                <span className="text-[11px] font-bold text-[#146eb4] group-hover:translate-x-0.5 transition-transform">
                  Configure &rarr;
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
