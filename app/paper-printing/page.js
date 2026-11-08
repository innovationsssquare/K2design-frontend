"use client";
import React from "react";
import { Card, CardFooter, Image, Button } from "@nextui-org/react";
import LEAFLETA from "../../public/images/LEAFLETA.jpg";
import StandBoard from "../../public/images/StandBoard.jpeg";
import PhotoAlbum from "../../public/images/PhotoAlbum.jpeg";
import PaperBag from "../../public/images/PaperBag.jpeg";
import StandardVisitingCard from "../../public/images/StandardVisitingCard.jpeg";
import brochures from "../../public/images/brochures.jpeg";
import DiryWithPen from "../../public/images/DiryWithPen.jpeg";
import Stickers from "../../public/images/Stickers.jpeg";
import Lanyards from "../../public/images/Lanyards.jpeg";
import CardInvitation from "../../public/images/CardInvitation.jpeg";
import Stamp from "../../public/images/Stamp.jpeg";
import PaperPrintings from "../../public/images/PaperPrinting.png";
import RecentlyView from "@/components/RecentlyView/RecentlyView";
import Link from "next/link";

export default function page() {
  const cardsData = [
    {
      title: "Standard Visiting Cards",
      subtitle: "Starting from ₹200 / 100 pcs",
      badge: "⭐ Best Seller",
      img: StandardVisitingCard.src,
      link: "/paper-printing/VisitingCards",
    },
    {
      title: "Bi-Fold & Tri-Fold Brochures",
      subtitle: "Starting from ₹370 / 25 pcs",
      badge: "⚡ 24h Express",
      img: brochures.src,
      link: "/paper-printing/Brochure",
    },
    {
      title: "Multi-Page Booklets & Catalogs",
      subtitle: "Starting from ₹1,200 / 50 pcs",
      badge: "📖 Center Pinned",
      img: PhotoAlbum.src,
      link: "/paper-printing/Booklet",
    },
    {
      title: "High-Resolution Digital Posters",
      subtitle: "Starting from ₹150 / 10 pcs",
      badge: "🎨 300 DPI Gloss",
      img: LEAFLETA.src,
      link: "/paper-printing/DigitalPoster",
    },
    {
      title: "Carbonless Bill Books (Duplicate)",
      subtitle: "Starting from ₹250 / book",
      badge: "📋 Numbered & Perforated",
      img: DiryWithPen.src,
      link: "/paper-printing/Billbooks",
    },
    {
      title: "Receipt & Pavati Books",
      subtitle: "Starting from ₹220 / book",
      badge: "🏦 Hardbound Cover",
      img: DiryWithPen.src,
      link: "/paper-printing/Pavtibooks",
    },
    {
      title: "Pamphlets & Promotional Flyers",
      subtitle: "Starting from ₹250 / 500 pcs",
      badge: "🚀 High Volume Direct",
      img: LEAFLETA.src,
      link: "/paper-printing/Pamphlets",
    },
    {
      title: "Executive Office Envelopes",
      subtitle: "Starting from ₹300 / 100 pcs",
      badge: "✉️ Peel & Seal",
      img: StandardVisitingCard.src,
      link: "/paper-printing/Envelopes",
    },
    {
      title: "Document Files & Pocket Folders",
      subtitle: "Starting from ₹450 / 50 pcs",
      badge: "📁 Die-Cut Pocket",
      img: StandardVisitingCard.src,
      link: "/paper-printing/Filesandfolders",
    },
    {
      title: "Official Letterheads (100 GSM Bond)",
      subtitle: "Starting from ₹350 / 100 pcs",
      badge: "📄 Copier Compatible",
      img: StandardVisitingCard.src,
      link: "/paper-printing/Letterheads",
    },
    {
      title: "Luxury Printed Paper Bags",
      subtitle: "Starting from ₹100 / 10 pcs",
      badge: "🛍️ Twisted Handle",
      img: PaperBag.src,
      link: "/paper-printing/PaperBags",
    },
    {
      title: "Die-Cut Vinyl Stickers & Labels",
      subtitle: "Starting from ₹160 / 24 pcs",
      badge: "💧 Waterproof Gloss",
      img: Stickers.src,
      link: "/paper-printing/Sticker",
    },
    {
      title: "Product & Apparel Swing Tags",
      subtitle: "Starting from ₹200 / 100 pcs",
      badge: "🏷️ Hole Punched",
      img: Lanyards.src,
      link: "/paper-printing/Tags",
    },
    {
      title: "Self-Inking Pre-Inked Stamps",
      subtitle: "Starting from ₹290 / stamp",
      badge: "🖊️ 10,000+ Impressions",
      img: Stamp.src,
      link: "/paper-printing/Stamp",
    },
    {
      title: "Wall & Desk Business Calendars",
      subtitle: "Starting from ₹180 / calendar",
      badge: "📅 12 Months Wiro",
      img: StandBoard.src,
      link: "/paper-printing/WallCalendar",
    },
    {
      title: "Royal Wedding Invitation Cards",
      subtitle: "Starting from ₹220 / 100 pcs",
      badge: "✨ Gold Emboss",
      img: CardInvitation.src,
      link: "/paper-printing/Weddingcard",
    },
    {
      title: "Event & Party Invitation Cards",
      subtitle: "Starting from ₹220 / 100 pcs",
      badge: "🎉 Metallic Paper",
      img: CardInvitation.src,
      link: "/paper-printing/InvitationCards",
    },
  ];

  return (
    <>
      <div className="bg-[#f1f2f4] flex justify-center items-center">
        <div className=" justify-center items-center  p-4 shadow-sm my-4 ml-4 mr-4 bg-white">
          {/* Header Section with Responsive Image */}
          <div className="relative  w-full h-[150px] lg:h-[500px] sm:h-[200px]">
            <div className="shine-box"></div>
            <Image
              src={PaperPrintings.src}
              alt="Visiting Cards"
              className="z-0 w-full h-full object-cover"
            />
            {/* Title Overlay */}
            <div className="absolute inset-10 flex items-center justify-start ml-4">
              <h1 className="text-white text-4xl md:text-5xl font-bold">
                Paper Printing
              </h1>
            </div>
          </div>

          {/* Responsive Card Grid */}
<div className="px-4 py-4">
          <h2 className="   text-[#000] text-lg lg:text-2xl xl:text-[22px] xl:leading-8 font-sans 3xl:text-[25px] 3xl:leading-9">
            Shop by shapes
          </h2>

          <p className="">{`Select from various shapes & sizes.`}</p>
          </div>

          <div className="gap-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5 lg:mx-4 sm:mx-4 mb-8">
            {cardsData.map((card, index) => (
              <Link key={index} href={card.link} className="block">
                <Card
                  isFooterBlurred
                  className="shine-effect h-[320px] relative shadow-md border border-gray-200 cursor-pointer hover:scale-[1.02] transition-all overflow-hidden"
                >
                  {card.badge && (
                    <div className="absolute top-2.5 left-2.5 z-10">
                      <span className="text-[10px] font-bold bg-white/95 backdrop-blur-sm text-gray-800 px-2 py-0.5 rounded-full shadow-sm border border-gray-200">
                        {card.badge}
                      </span>
                    </div>
                  )}
                  <Image
                    removeWrapper
                    alt={card.title}
                    className="z-0 w-full h-full scale-y-125 mb-6 object-cover"
                    src={card.img}
                  />

                  <CardFooter className="absolute bg-white/95 backdrop-blur-sm bottom-0 border-t border-gray-200 z-10 flex justify-between p-3">
                    <div className="items-start flex flex-col max-w-[70%]">
                      <p className="text-gray-900 text-xs font-bold truncate w-full">
                        {card.title}
                      </p>
                      <p className="text-purple-700 text-[11px] font-semibold">{card.subtitle}</p>
                    </div>
                    <span className="text-[11px] bg-[#9c1dac] text-white px-3 py-1 rounded-full font-bold shadow-sm flex-shrink-0">
                      Configure &rarr;
                    </span>
                  </CardFooter>

                  <div className="shine-box"></div>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
