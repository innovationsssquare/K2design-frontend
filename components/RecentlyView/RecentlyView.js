import React from "react";
import { CardFooter, Image, Button } from "@nextui-org/react";

import StandardVisitingCard from "../../public/images/StandardVisitingCard.jpeg";
import brochures from "../../public/images/brochures.jpeg";

import Stickers from "../../public/images/Stickers.jpeg";

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

export default function RecentlyView() {
  const cardsData = [
    {
      title: "Brochures",
      subtitle: "25 starting at ₹370.00",
      img: brochures.src,
    },
    {
      title: "Sheet Stickers",
      subtitle: "24 starting at ₹160.00",
      img: Stickers.src,
    },
    {
      title: "Standard Visiting Cards",
      subtitle: "100 starting at ₹200.00",
      img: StandardVisitingCard.src,
    },
    {
      title: "Self Inking Stamps",
      subtitle: "1 starting at ₹290.00",
      img: Stamp.src,
    },
    {
      title: "Classic Visiting Cards",
      subtitle: "100 starting at ₹220.00",
      img: CardInvitation.src,
    },
    {
      title: "Classic Visiting Cards",
      subtitle: "100 starting at ₹220.00",
      img: CardInvitation.src,
    },
    {
      title: "Classic Visiting Cards",
      subtitle: "100 starting at ₹220.00",
      img: CardInvitation.src,
    },
  ];

  return (
    <div className="mx-4 shadow-small my-1 mb-5 px-4 bg-white ">
      {/* Section Heading */}
      <h2 className="p-4 mb-6 mt-3 text-[#000] text-lg lg:text-xl xl:text-[22px] xl:leading-8 font-bold  3xl:text-[25px] 3xl:leading-9">
        Your Recently Viewed Items
      </h2>

      <Carousel className="w-full mb-8"> {/* Added Carousel wrapper */}
        <CarouselContent className="flex gap-4">
          {cardsData.map((card, index) => (
            <CarouselItem
              key={index}
              className="flex-shrink-0 basis-1/3 md:basis-1/4 lg:basis-1/6"
            >
              <Card className="border border-none bg-slate mb-4">
                <CardContent className="flex flex-col items-center">
                  <div className="w-28 h-28 sm:w-32 sm:h-32 md:w-40 md:h-40 lg:w-36 lg:h-36 xl:w-44 xl:h-44 rounded-full">
                    <Image
                      src={card.img}
                      alt={card.title}
                      className="object-fill w-full h-full"
                    />
                    <p className="text-black text-center text-sm font-bold whitespace-nowrap">
                      {card.title}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="absolute -left-2 shadow-lg top-1/2 transform -translate-y-1/2 bg-white text-black p-1 rounded-full h-14 w-14 cursor-pointer border-none" />
        <CarouselNext className="absolute -right-2 shadow-lg top-1/2 transform -translate-y-1/2 bg-white text-black p-1 rounded-full h-14 w-14 cursor-pointer border-none" /> {/* Corrected typo here */}
      </Carousel>
    </div>
  );
}
