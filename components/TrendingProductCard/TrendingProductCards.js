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
import PaperBag from "../../public/images/PaperBag.jpeg";
import Stickers from "../../public/images/Stickers.jpeg";
import Stamp from "../../public/images/Stamp.jpeg";
import PhotoAlbum from "../../public/images/PhotoAlbum.jpeg";
import StandBoard from "../../public/images/StandBoard.jpeg";
import CardInvitation from "../../public/images/CardInvitation.jpeg";

export default function TrendingProductCards() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const cardsData = [
    {
      title: "Visiting Cards",
      img: StandardVisitingCard.src,
      link: "/paper-printing/VisitingCards",
    },
    {
      title: "Brochures & Flyers",
      img: brochures.src,
      link: "/paper-printing/Brochure",
    },
    {
      title: "Paper Bags",
      img: PaperBag.src,
      link: "/paper-printing/PaperBags",
    },
    {
      title: "Custom Stickers",
      img: Stickers.src,
      link: "/paper-printing/Sticker",
    },
    {
      title: "Rubber Stamps",
      img: Stamp.src,
      link: "/paper-printing/Stamp",
    },
    {
      title: "Photo Albums",
      img: PhotoAlbum.src,
      link: "/paper-printing/Booklet",
    },
    {
      title: "Stand Boards",
      img: StandBoard.src,
      link: "/categories",
    },
    {
      title: "Wedding Cards",
      img: CardInvitation.src,
      link: "/paper-printing/Weddingcard",
    },
  ];

  if (!isMounted) {
    return (
      <div className="mx-4 shadow-sm my-1 mb-5 p-6 bg-white rounded-2xl border border-gray-100 min-h-[220px]">
        <h2 className="text-xl sm:text-2xl font-extrabold text-gray-900 mb-4">
          Trending Print Items
        </h2>
        <div className="flex gap-4 overflow-hidden">
          {cardsData.slice(0, 6).map((_, index) => (
            <div key={index} className="w-32 h-32 bg-gray-100 rounded-full animate-pulse flex-shrink-0" />
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
            Curated Picks
          </span>
          <h2 className="text-xl sm:text-2xl font-extrabold text-gray-900 mt-0.5">
            Trending Print Categories
          </h2>
        </div>
      </div>

      <Carousel opts={{ align: "start" }} className="w-full relative">
        <CarouselContent className="flex gap-2 sm:gap-4">
          {cardsData.map((card, index) => (
            <CarouselItem
              key={index}
              className="flex-shrink-0 basis-1/3 sm:basis-1/4 md:basis-1/5 lg:basis-1/6"
            >
              <Link
                href={card.link}
                className="group flex flex-col items-center p-2 rounded-xl hover:bg-purple-50/50 transition"
              >
                <div className="w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 rounded-full p-1 border-2 border-transparent group-hover:border-[#9c1dac] transition-all overflow-hidden shadow-sm bg-gray-50">
                  <img
                    src={card.img}
                    alt={card.title}
                    className="object-cover w-full h-full rounded-full group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <p className="text-gray-800 text-center text-xs sm:text-sm font-bold mt-2.5 group-hover:text-[#9c1dac] transition">
                  {card.title}
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
