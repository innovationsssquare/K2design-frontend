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

export default function App() {
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
    <div className="mx-4 shadow-small my-1 mb-5 px-4 bg-white">
      {/* Section Heading */}
      <h2 className="p-4 mb-6 mt-3 text-[#000] text-lg lg:text-xl xl:text-[22px] xl:leading-8 font-bold font-inter 3xl:text-[25px] 3xl:leading-9">
        Your Recently Viewed Items
      </h2>

      {/* Horizontal Scrollable Card Grid */}
      <div className="flex gap-6 overflow-x-auto pb-4">
        {cardsData.map((card, index) => (
          <Card
            key={index}
            isPressable
            onPress={() => console.log("item pressed")}
            className="min-w-[200px] h-[300px] shadow-md"
          >
            <Image
              removeWrapper
              alt={`Card example ${index}`}
              className="w-full h-full object-cover"
              src={card.img}
            />
            <CardFooter className="bg-white/90 border-t-1 border-gray-light flex flex-col items-start">
              <p className="text-black text-tiny font-bold">{card.title}</p>
              <p className="text-black text-tiny">{card.subtitle}</p>
              <Button
                className="text-tiny mt-2"
                color="primary"
                radius="full"
                size="sm"
              >
                View
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
