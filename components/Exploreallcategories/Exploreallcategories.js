"use client"

import React, { useEffect } from "react";
import Link from "next/link";

import StandBoard from "../../public/images/StandBoard.jpeg";
import PhotoAlbum from "../../public/images/PhotoAlbum.jpeg";
import PaperBag from "../../public/images/PaperBag.jpeg";
import StandardVisitingCard from "../../public/images/StandardVisitingCard.jpeg";
import brochures from "../../public/images/brochures.jpeg";
import Stamp from "../../public/images/Stamp.jpeg";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Image } from "@nextui-org/react";
import { useDispatch,useSelector } from "react-redux";
import {fetchcategoriesbyslug} from "@/lib/ReduxSlice/CategorySlice"

export default function Exploreallcategories() {
  const dispatch=useDispatch()
  const {  categoryslug}=useSelector((state)=>state.category)


useEffect(() => {
 dispatch(fetchcategoriesbyslug())
}, [])

console.log(categoryslug)

  // const cardsData = [
  //   {
  //     title: "Paper Printing",
  //     img: StandardVisitingCard.src,
  //     link: "/paper-printing", // Add the link for this card
  //   },
  //   {
  //     title: "Media Printing",
  //     img: StandBoard.src,
  //     link: "/media-printing",
  //   },
  //   {
  //     title: "Flex & Related",
  //     img: PhotoAlbum.src,
  //     link: "/flex-related",
  //   },
  //   {
  //     title: "Rigid Sign Plates",
  //     img: PaperBag.src,
  //     link: "/rigid-sign-plates",
  //   },
  //   {
  //     title: "Vinyl Letters",
  //     img: Stamp.src,
  //     link: "/vinyl-letters",
  //   },
  //   {
  //     title: "ACP & Acrylic",
  //     img: brochures.src,
  //     link: "/acp-acrylic",
  //   },
  //   {
  //     title: "Light Board",
  //     img: brochures.src,
  //     link: "/light-board",
  //   },
  //   {
  //     title: "Modular/ Premium Sign",
  //     img: brochures.src,
  //     link: "/modular-sign",
  //   },
  //   {
  //     title: "Glass Films",
  //     img: brochures.src,
  //     link: "/glass-films",
  //   },
  //   {
  //     title: "Name Plates",
  //     img: brochures.src,
  //     link: "/name-plates",
  //   },
  //   {
  //     title: "Printed Frame",
  //     img: brochures.src,
  //     link: "/printed-frame",
  //   },
  // ];


  const cardsData = categoryslug.map((category) => ({
    title: category.name, // Assuming category has a `name` property
    img: category.image || "/default-image.jpg", // Fallback to a default image if none exists
    link: `/categories/${category.slug}`, // Assuming category has a `slug` property for the link
  }));

  return (
    <div className="mx-4 shadow-small my-1 mb-5 px-4 bg-white">
      {/* Section Heading */}
      <h2 className=" p-4 mb-6 mt-3 text-[#000] text-lg lg:text-xl xl:text-[22px] xl:leading-8 font-bold 3xl:text-[25px] 3xl:leading-9">
        Explore all categories
      </h2>

      <Carousel opts={{ align: "start" }} className="w-full">
        <CarouselContent className="flex gap-4">
          {cardsData.map((card, index) => (
            <CarouselItem
              key={index}
              className="flex-shrink-0 basis-1/3 md:basis-1/4 lg:basis-1/6"
            >
              <CardContent className="flex flex-col items-center mb-8">
                <Link href={card.link}>
                  <div className="shine-effect w-28 h-28 sm:w-32 sm:h-32 md:w-40 md:h-40 lg:w-36 lg:h-36 xl:w-44 xl:h-44  rounded-full cursor-pointer">
                    <Image
                    isZoomed
                      src={card.img}
                      alt={card.title}
                      className="object-cover w-full rounded-full h-full "
                       layout="fill"
              objectFit="cover"
                    />
                    <div class="shine-box"></div>
                  </div>
                </Link>
                <p className="text-black text-center text-xs  mt-2">
                  {card.title}
                </p>
              </CardContent>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="absolute -left-2 shadow-lg top-1/2 transform -translate-y-1/2 bg-white text-black p-1 rounded-full h-14 w-14 cursor-pointer border-none" />
        <CarouselNext className="absolute -right-2 shadow-lg top-1/2 transform -translate-y-1/2 bg-white text-black p-1 rounded-full h-14 w-14 cursor-pointer border-none" />
      </Carousel>
    </div>
  );
}
