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
    // {
    //   title: "Available soon.",
    //   subtitle: "Get notified.",
    //   img: LEAFLETA.src,
    //   link: "/paper-printing/VisitingCards",
    // },
    {
      title: "Standard Visiting Card",
      subtitle: "Starting Price : 200",
      img: StandardVisitingCard.src,
      link: "/paper-printing/VisitingCards",
    },
    // {
    //   title: "Printed Paper Bags",
    //   subtitle: "Starting Price : 100",
    //   img: PaperBag.src,
    //   link: "/paper-printing/VisitingCards",
    // },
    // {
    //   title: "Photo Albums",
    //   subtitle: "Starting Price : 1000",
    //   img: PhotoAlbum.src,
    //   link: "/paper-printing/VisitingCards",
    // },
    // {
    //   title: "Stand Board",
    //   subtitle: "Starting Price : 2500 ",
    //   img: StandBoard.src,
    //   link: "/paper-printing/VisitingCards",
    // },
    // {
    //   title: "Stamp",
    //   subtitle: "Get notified.",
    //   img: Stamp.src,
    //   link: "/paper-printing/VisitingCards",
    // },
    // {
    //   title: "Diry With Pen",
    //   subtitle: "Starting Price : 100",
    //   img: DiryWithPen.src,
    //   link: "/paper-printing/VisitingCards",
    // },
    // {
    //   title: "Packaging Labels",
    //   subtitle: "Starting Price : 100",
    //   img: Stickers.src,
    //   link: "/paper-printing/VisitingCards",
    // },
    // {
    //   title: "Lanyards",
    //   subtitle: "Starting Price : 100",
    //   img: Lanyards.src,
    //   link: "/paper-printing/VisitingCards",
    // },
    // {
    //   title: "Card Invitation",
    //   subtitle: "Starting Price : 100",
    //   img: CardInvitation.src,
    //   link: "/paper-printing/VisitingCards",
    // },
    // {
    //   title: "Brochures",
    //   subtitle: "Starting Price : 100",
    //   img: brochures.src,
    //   link: "/paper-printing/VisitingCards",
    // },
  ];

  return (
    <>
      <div className="bg-[#f1f2f4] flex justify-center items-center">
        <div className=" justify-center items-center  p-4 shadow-sm my-4 ml-4 mr-4 bg-white">
          {/* Header Section with Responsive Image */}
          <div className="relative  w-full h-[150px] lg:h-[500px] sm:h-[200px]">
            <div className="shine-box"></div>
            <Image
              // isBlurred
              src={PaperPrintings.src}
              alt="Visiting Cards"
              layout="fill"
              objectFit="cover"
              className="z-0"
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

          {/* <div className="gap-6 grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 lg:mx-4 sm:mx-4 mb-8">
         
            {cardsData.map((card, index) => (
              <Link key={index} href={card.link}>
                <Card
                  isFooterBlurred
                  isPressable
                  onPress={() => console.log("item pressed")}
                  className="shine-effect h-[300px] relative shadow-md border border-[#dee2e6]"
                >
                  <Image
                    removeWrapper
                    alt={`Card example ${index}`}
                    className="z-0 w-full h-full scale-y-125 mb-6 object-contain"
                    src={card.img}
                    layout="fill"
                    objectFit="cover"
                  />

                  <CardFooter className="absolute bg-white/30 bottom-0 border-t-1 border-gray-light z-10 flex justify-between">
                    <div className="items-start flex flex-col">
                      <p className="text-black text-tiny font-bold">
                        {card.title}
                      </p>
                      <p className="text-black text-tiny">{card.subtitle}</p>
                    </div>
                    <Button
                      className="text-tiny"
                      color="secondary"
                      radius="full"
                      size="sm"
                    >
                      View
                    </Button>
                  </CardFooter>

                  <div className="shine-box"></div>
                </Card>
              </Link>
            ))}
          </div> */}

          <div className="gap-6 grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 lg:mx-4 sm:mx-4 mb-8">
            {cardsData.map((card, index) => (
              <Card
                key={index}
                isFooterBlurred
                isPressable
                onPress={() => console.log("item pressed")}
                className="shine-effect h-[300px] relative shadow-md border border-[#ced4da] "
              >
                <Image
                  removeWrapper
                  alt={`Card example ${index}`}
                  className="z-0 w-full h-full scale-y-125 mb-6 object-contain"
                  src={card.img}
                  layout="fill"
                  objectFit="cover"
                />

                <CardFooter className="absolute bg-white/30 bottom-0 border-t-1 border-gray-light z-10 flex justify-between">
                  <div className="items-start flex flex-col">
                    <p className="text-black text-tiny font-bold">
                      {card.title}
                    </p>
                    <p className="text-black text-tiny">{card.subtitle}</p>
                  </div>
                  <Button
                    className="text-tiny"
                    color="secondary"
                    radius="full"
                    size="sm"
                  >
                    <Link href={card.link}>View</Link>
                  </Button>
                </CardFooter>

                <div className="shine-box"></div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
