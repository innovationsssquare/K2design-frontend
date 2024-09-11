import React from "react";
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
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

export default function TrendingProductCards() {
  const cardsData = [
    {
      title: "Visiting Cards",
      img: StandardVisitingCard.src,
    },
    {
      title: "Custom Polo T-shirts",
      img: StandBoard.src,
    },
    {
      title: "Custom T-shirts",
      img: PhotoAlbum.src,
    },
    {
      title: "Custom Winter Wear",
      img: PaperBag.src,
    },
    {
      title: "Custom Stamps & Ink",
      img: Stamp.src,
    },
    {
      title: "Photo Gifts",
      img: brochures.src,
    },
  ];

  return (
    <div className="mx-4 shadow-small my-1 mb-5 px-4 bg-white">
      {/* Section Heading */}
      <h2 className=" p-4 mb-6 mt-3 text-[#000] text-lg lg:text-xl xl:text-[22px] xl:leading-8 font-bold font-inter 3xl:text-[25px] 3xl:leading-9">
        Trending Products
      </h2>

      <Carousel opts={{ align: "start" }} className="w-full ">
        <CarouselContent className="flex gap-4">
          {cardsData.map((card, index) => (
            <CarouselItem
              key={index}
              className="flex-shrink-0 basis-1/3 md:basis-1/4 lg:basis-1/6"
            >
              <Card className=" rounded-full border-none">
                <CardContent className="flex flex-col items-center">
                  <div className="w-28 h-28 sm:w-32 sm:h-32 md:w-40 md:h-40 lg:w-36 lg:h-36 xl:w-44 xl:h-44 bg-gray-100 rounded-full overflow-hidden mb-3">
                    <img
                      src={card.img}
                      alt={card.title}
                      className="object-cover w-full h-full"
                    />
                  </div>
                  <p className="text-black text-center text-base font-semibold">
                    {card.title}
                  </p>
                </CardContent>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="absolute -left-2 shadow-lg top-1/2 transform -translate-y-1/2 bg-white text-black p-1 rounded-full h-14 w-14 cursor-pointer border-none" />
        <CarouselNext className="bsolute -right-2 shadow-lg top-1/2 transform -translate-y-1/2 bg-white text-black p-1 rounded-full h-14 w-14 cursor-pointer border-none" />
      </Carousel>


      <h2 className="mb-6 mt-3 text-[#000] text-lg lg:text-xl xl:text-[22px] xl:leading-8 font-bold font-inter 3xl:text-[25px] 3xl:leading-9 p-4">
      Branded Products
      </h2>

      <Carousel opts={{ align: "start" }} className="w-full ">
        <CarouselContent className="flex gap-4">
          {cardsData.map((card, index) => (
            <CarouselItem
              key={index}
              className="flex-shrink-0 basis-1/3 md:basis-1/4 lg:basis-1/6"
            >
              <Card className=" rounded-full border-none">
                <CardContent className="flex flex-col items-center">
                  <div className="w-28 h-28 sm:w-32 sm:h-32 md:w-40 md:h-40 lg:w-36 lg:h-36 xl:w-44 xl:h-44 bg-gray-100 rounded-full overflow-hidden mb-3">
                    <img
                      src={card.img}
                      alt={card.title}
                      className="object-cover w-full h-full"
                    />
                  </div>
                  <p className="text-black text-center text-base font-semibold">
                    {card.title}
                  </p>
                </CardContent>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="absolute -left-2 shadow-lg top-1/2 transform -translate-y-1/2 bg-white text-black p-1 rounded-full h-14 w-14 cursor-pointer border-none" />
        <CarouselNext className="bsolute -right-2 shadow-lg top-1/2 transform -translate-y-1/2 bg-white text-black p-1 rounded-full h-14 w-14 cursor-pointer border-none" />
      </Carousel>
    </div>
  );
}
