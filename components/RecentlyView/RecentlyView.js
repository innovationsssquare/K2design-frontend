"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

import StandardVisitingCard from "../../public/images/StandardVisitingCard.jpeg";
import brochures from "../../public/images/brochures.jpeg";
import Stickers from "../../public/images/Stickers.jpeg";
import Stamp from "../../public/images/Stamp.jpeg";
import PaperBag from "../../public/images/PaperBag.jpeg";
import CardInvitation from "../../public/images/CardInvitation.jpeg";

export default function RecentlyView() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const cardsData = [
    {
      title: "Visiting Cards",
      subtitle: "from ₹200 / 100 pcs",
      img: StandardVisitingCard.src,
      link: "/paper-printing/VisitingCards",
    },
    {
      title: "Brochures",
      subtitle: "from ₹370 / 25 pcs",
      img: brochures.src,
      link: "/paper-printing/Brochure",
    },
    {
      title: "Sheet Stickers",
      subtitle: "from ₹160 / 24 pcs",
      img: Stickers.src,
      link: "/paper-printing/Sticker",
    },
    {
      title: "Rubber Stamps",
      subtitle: "from ₹290 / pc",
      img: Stamp.src,
      link: "/paper-printing/Stamp",
    },
    {
      title: "Paper Bags",
      subtitle: "from ₹100 / 10 pcs",
      img: PaperBag.src,
      link: "/paper-printing/PaperBags",
    },
    {
      title: "Invitation Cards",
      subtitle: "from ₹220 / 100 pcs",
      img: CardInvitation.src,
      link: "/paper-printing/InvitationCards",
    },
  ];

  if (!isMounted) {
    return (
      <div className="mx-4 shadow-sm my-1 mb-5 p-6 bg-white rounded-2xl border border-gray-100 min-h-[220px]">
        <h2 className="text-xl sm:text-2xl font-extrabold text-gray-900 mb-4">
          Recently Viewed & Recommended
        </h2>
        <div className="flex gap-4 overflow-hidden">
          {cardsData.slice(0, 6).map((_, index) => (
            <div key={index} className="w-32 h-32 bg-gray-100 rounded-xl animate-pulse flex-shrink-0" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="mx-4 shadow-sm my-3 mb-6 p-4 sm:p-6 bg-white rounded-2xl border border-gray-100">
      {/* Section Heading */}
      <div className="flex items-center justify-between pb-4 mb-4 border-b border-gray-100">
        <div>
          <span className="text-xs font-bold text-[#9c1dac] uppercase tracking-wider">
            Quick Reorder
          </span>
          <h2 className="text-xl sm:text-2xl font-extrabold text-gray-900 mt-0.5">
            Recently Viewed & Recommended
          </h2>
        </div>
      </div>

      <Carousel opts={{ align: "start" }} className="w-full relative">
        <CarouselContent className="flex gap-3 sm:gap-4">
          {cardsData.map((card, index) => (
            <CarouselItem
              key={index}
              className="flex-shrink-0 basis-1/2 sm:basis-1/3 md:basis-1/4 lg:basis-1/6"
            >
              <Link
                href={card.link}
                className="group block p-2.5 bg-gray-50/70 hover:bg-purple-50/60 rounded-xl border border-gray-200/80 hover:border-purple-300 transition"
              >
                <div className="h-28 sm:h-32 w-full rounded-lg overflow-hidden bg-white mb-2">
                  <img
                    src={card.img}
                    alt={card.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <h4 className="text-xs sm:text-sm font-bold text-gray-900 truncate group-hover:text-purple-700">
                  {card.title}
                </h4>
                <p className="text-[11px] text-purple-700 font-semibold mt-0.5">
                  {card.subtitle}
                </p>
              </Link>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="absolute -left-2 top-1/2 -translate-y-1/2 bg-white text-gray-800 shadow-md p-1 rounded-full h-9 w-9 cursor-pointer border border-gray-200" />
        <CarouselNext className="absolute -right-2 top-1/2 -translate-y-1/2 bg-white text-gray-800 shadow-md p-1 rounded-full h-9 w-9 cursor-pointer border border-gray-200" />
      </Carousel>
    </div>
  );
}
