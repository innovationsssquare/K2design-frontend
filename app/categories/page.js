"use client";
'use cache'
import React, { useEffect } from "react";
import Link from "next/link";

import { Card, CardContent } from "@/components/ui/card";
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

export default function Exploreallcategories() {
  const dispatch = useDispatch();
  const { categoryslug } = useSelector((state) => state.category);

  useEffect(() => {
    dispatch(fetchcategoriesbyslug());
  }, []);

  const isLoading = !categoryslug || categoryslug.length === 0;

  // const cardsData = categoryslug.map((category) => ({
  //   title: category.name  || "Loading....", // Assuming category has a `name` property
  //   img: category.image || "/default-image.jpg", // Fallback to a default image if none exists
  //   link: `/categories/${category.slug}`, // Assuming category has a `slug` property for the link
  // }));

  const cardsData = isLoading
    ? Array(6).fill({}) // Create an array with empty objects for the skeleton
    : categoryslug.map((category) => ({
        title: category.name || "Loading....", // Assuming category has a `name` property
        img: category.image || "/default-image.jpg", // Fallback to a default image if none exists
        link: `/categories/${category.slug}`, // Assuming category has a `slug` property for the link
      }));

  return (
    <div className="mx-4 shadow-small my-4 lg:my-4 2xl:my-8 mb-5 px-4 bg-white">
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
                {isLoading ? (
                  <Skeleton
                    className="w-28 h-28 sm:w-32 sm:h-32 md:w-40 md:h-40 lg:w-36 lg:h-36 xl:w-44 xl:h-44 rounded-full"
                    radius="full"
                  />
                ) : (
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
                )}
                <p className="text-black text-center text-base font-semibold mt-2">
                  {isLoading ? (
                    <Skeleton width="80px" height="20px" />
                  ) : (
                    card.title
                  )}
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
