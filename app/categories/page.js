"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Image, Skeleton } from "@nextui-org/react";
import { useDispatch, useSelector } from "react-redux";
import { fetchcategoriesbyslug } from "@/lib/ReduxSlice/CategorySlice";

import PaperPrintingImg from "../../public/images/PaperPrinting.png";
import VisitingCardImg from "../../public/images/StandardVisitingCard.jpeg";
import BrochureImg from "../../public/images/brochures.jpeg";
import PaperBagImg from "../../public/images/PaperBag.jpeg";
import StickersImg from "../../public/images/Stickers.jpeg";
import StampImg from "../../public/images/Stamp.jpeg";
import LEDBoardImg from "../../public/images/LEDBoard.png";
import RigidSignImg from "../../public/images/RigidSign.png";
import FlexImg from "../../public/images/Flex&Related.png";

const DEFAULT_CATEGORIES = [
  { name: "Paper Printing", img: PaperPrintingImg.src, link: "/paper-printing" },
  { name: "Visiting Cards", img: VisitingCardImg.src, link: "/paper-printing/VisitingCards" },
  { name: "Brochures & Flyers", img: BrochureImg.src, link: "/paper-printing/Brochure" },
  { name: "Custom Stickers", img: StickersImg.src, link: "/paper-printing/Sticker" },
  { name: "Paper Bags", img: PaperBagImg.src, link: "/paper-printing/PaperBags" },
  { name: "Rubber Stamps", img: StampImg.src, link: "/paper-printing/Stamp" },
  { name: "LED Light Boards", img: LEDBoardImg.src, link: "/categories" },
  { name: "Rigid Sign Plates", img: RigidSignImg.src, link: "/categories" },
  { name: "Flex & Banners", img: FlexImg.src, link: "/categories" },
];

export default function Exploreallcategories() {
  const dispatch = useDispatch();
  const { categoryslug } = useSelector((state) => state.category);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    dispatch(fetchcategoriesbyslug());
  }, [dispatch]);

  const cardsData = categoryslug && categoryslug.length > 0
    ? categoryslug.map((category) => ({
        title: category.name || "Custom Print",
        img: category.image || PaperPrintingImg.src,
        link: `/categories/${category.slug || "paper-printing"}`,
      }))
    : DEFAULT_CATEGORIES.map((c) => ({
        title: c.name,
        img: c.img,
        link: c.link,
      }));

  if (!isMounted) {
    return (
      <div className="mx-4 shadow-sm my-3 p-6 bg-white rounded-2xl border border-gray-100 min-h-[220px]">
        <h2 className="text-xl sm:text-2xl font-extrabold text-gray-900 mb-4">
          Explore All Categories
        </h2>
        <div className="flex gap-4 overflow-hidden">
          {DEFAULT_CATEGORIES.slice(0, 6).map((_, index) => (
            <div key={index} className="w-28 h-28 bg-gray-100 rounded-full animate-pulse flex-shrink-0" />
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
            Broad Spectrum
          </span>
          <h2 className="text-xl sm:text-2xl font-extrabold text-gray-900 mt-0.5">
            Explore All 13 Categories
          </h2>
          <p className="text-xs sm:text-sm text-gray-500 mt-0.5">
            Select from paper printing, architectural signage, LED glow boards and marketing kits.
          </p>
        </div>
      </div>

      <Carousel opts={{ align: "start" }} className="w-full relative">
        <CarouselContent className="flex gap-3 sm:gap-4">
          {cardsData.map((card, index) => (
            <CarouselItem
              key={index}
              className="flex-shrink-0 basis-1/3 sm:basis-1/4 md:basis-1/5 lg:basis-1/6"
            >
              <Link
                href={card.link}
                className="group flex flex-col items-center p-2 rounded-xl hover:bg-purple-50/50 transition"
              >
                <div className="w-24 h-24 sm:w-28 sm:h-28 lg:w-32 lg:h-32 rounded-full p-1 border-2 border-transparent group-hover:border-[#9c1dac] transition-all overflow-hidden shadow-sm bg-gray-50">
                  <img
                    src={card.img}
                    alt={card.title}
                    className="object-cover w-full h-full rounded-full group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <p className="text-gray-900 text-center text-xs sm:text-sm font-bold mt-2.5 group-hover:text-[#9c1dac] transition line-clamp-1">
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
