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
      title: "Available soon.",
      subtitle: "Get notified.",
      img: LEAFLETA.src,
    },
    {
      title: "Standard Visiting Card",
      subtitle: "Starting Price : 200",
      img: StandardVisitingCard.src,
    },
    {
      title: "Printed Paper Bags",
      subtitle: "Starting Price : 100",
      img: PaperBag.src,
    },
    {
      title: "Photo Albums",
      subtitle: "Starting Price : 1000",
      img: PhotoAlbum.src,
    },
    // {
    //   title: "Available soon.",
    //   subtitle: "Get notified.",
    //   img: "https://5.imimg.com/data5/SELLER/Default/2023/9/346156501/YV/HG/YC/7064140/backlit-sign-board-1000x1000.webp",
    // },
    {
      title: "Stand Board",
      subtitle: "Starting Price : 2500 ",
      img: StandBoard.src,
    },
    // {
    //   title: "Supercharged",
    //   subtitle: "Creates beauty like a beast",
    //   img: "https://nextui.org/images/card-example-2.jpeg",
    // },

    {
      title: "Stamp",
      subtitle: "Get notified.",
      img: Stamp.src,
    },

    {
      title: "Diry With Pen",
      subtitle: "Starting Price : 100",
      img: DiryWithPen.src,
    },
    {
      title: "Packaging Labels",
      subtitle: "Starting Price : 100",
      img: Stickers.src,
    },
    {
      title: "Lanyards",
      subtitle: "Starting Price : 100",
      img: Lanyards.src,
    },
    {
      title: "Card Invitation",
      subtitle: "Starting Price : 100",
      img: CardInvitation.src,
    },

    {
      title: "Brochures",
      subtitle: "Starting Price : 100",
      img: brochures.src,
    },
  ];

  return (
    <div className="mx-4 shadow-small my-1 mb-5 px-4 bg-white">
      {/* Section Heading */}
      <h2 className="p-4 mb-6 mt-3 text-[#000] text-lg lg:text-xl xl:text-[22px] xl:leading-8 font-bold font-inter 3xl:text-[25px] 3xl:leading-9">
        Our Most Popular Products
      </h2>

      {/* Card Grid */}
      {/* klsjdklsjds */}
      <div className="gap-6 grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 mb-8">
        {cardsData.map((card, index) => (
          <Card
            key={index}
            isFooterBlurred
            isPressable
            onPress={() => console.log("item pressed")}
            className="h-[300px] relative shadow-md "
          >
            <Image
              removeWrapper
              alt={`Card example ${index}`}
              className="z-0 w-full h-full scale-y-125 mb-6 object-contain"
              //   scale-y-125 mt-4 -translate-y-6
              src={card.img}
            />

            <CardFooter className="absolute bg-white/30 bottom-0 border-t-1 border-gray-light z-10 flex justify-between">
              {/* border-zinc-100/50 */}
              <div className="items-start flex flex-col">
                <p className="text-black text-tiny font-bold">{card.title}</p>
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
            {/* <div className="absolute top-0 block w-1/2 h-full transform -skew-x-12 ltr:-left-full rtl:-right-full z-5 bg-gradient-to-r from-transparent to-white opacity-40 group-hover:animate-shine"></div> */}
          </Card>
        ))}
      </div>
     
    </div>
  );
}
