"use client";
import React, { useEffect, useState } from "react";
import { Card, CardFooter, Image, Button } from "@nextui-org/react";

import StandardVisitingCard from "../../../../../public/images/StandardVisitingCard.jpeg";

import PaperPrintings from "../../../../../public/images/PaperPrinting.png";

import { useDispatch, useSelector } from "react-redux";
import { fetchSubCategoryProducts } from "@/lib/ReduxSlice/CategorySlice";

import Link from "next/link";
import { useParams } from "next/navigation";

export default function page() {
  const dispatch = useDispatch();
  const { subcategoryProducts } = useSelector((state) => state.category);

  const params = useParams(); // Get route params (including slug)
  // Extract slug from params

  console.log("params",params)
  const slug = params.slug;

  console.log("fetchSubCategoryProductsslug", slug);

  useEffect(() => {
    dispatch(fetchSubCategoryProducts(slug));
  }, [slug]);

  console.log("fetchSubCategoryProducts", subcategoryProducts);



  const cardsData =
    subcategoryProducts?.map((item) => ({
      title: item.name,
      // subtitle: item.description ? `Description: ${item.description}` : "No description",
      img: item.images[0] || StandardVisitingCard.src,
      link: `/categories/${params._slug}/subcategories/${slug}/${item.slug}`,
    })) || [];
  console.log(" cards", cardsData);

  return (
    <>
      <div className="bg-[#f1f2f4] flex justify-center items-center w-full">
        <div className=" justify-center items-center  p-4 shadow-sm w-full my-4 ml-4 mr-4 bg-white">
          {/* Header Section with Responsive Image */}
          {/* <div className="relative  w-full h-[150px] lg:h-[500px] sm:h-[200px]">
            <div className="shine-box"></div>
            <Image
             
              src={PaperPrintings.src}
              alt="Visiting Cards"
              layout="fill"
              objectFit="cover"
              className="z-0"
            />
   
            <div className="absolute inset-10 flex items-center justify-start ml-4">
              <h1 className="text-white text-4xl md:text-5xl font-bold capitalize">
             {slug}
              </h1>
            </div>
          </div> */}

          {/* <div className=" inset-10 flex items-center justify-center ml-4 bg-[#9c6d9657] h-20">
            <h1 className="text-Apptheme text-4xl md:text-5xl font-bold capitalize">
             Explore {slug}
            </h1>
          </div> */}

<header className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white" style={{ background: "linear-gradient(to right, #6A1B9A, #1E88E5)" }}>
        <div className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 capitalize">
            Explore {slug}
          </h1>
          <p className="text-xl md:text-2xl opacity-80">
            Discover our wide range of high-quality products
          </p>
        </div>
      </header>
      

          {/* Responsive Card Grid */}
          <div className="px-4 py-4">
            <h2 className="   text-[#000] text-lg lg:text-2xl xl:text-[22px] xl:leading-8 font-sans 3xl:text-[25px] 3xl:leading-9">
              Shop by shapes
            </h2>

            <p className="">{`Select from various shapes & sizes.`}</p>
          </div>

          <div className="gap-6 grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 2xl:grid-cols-6 lg:mx-4 sm:mx-4 mb-8">
            {cardsData.map((card, index) => (
              <Card
                key={index}
                isFooterBlurred
                isPressable
                onPress={() => console.log("item pressed")}
                className="shine-effect h-[300px] relative shadow-md border border-[#ced4da]  "
              >
                <Image
                  removeWrapper
                  alt={`Card example ${index}`}
                  className="z-0 w-full h-full  mb-6 object-fill"
                  // scale-y-125
                  src={card.img}
                  layout="fill"
                  objectFit="contain"
                />

                <CardFooter className="absolute bg-white bottom-0 border-t-1 border-gray-light z-10 flex justify-between">
                  <div className="items-start flex flex-col">
                    <p className="text-black text-tiny font-bold">
                      {card.title}
                    </p>
                    {/* <p className="text-black text-tiny">{card.subtitle}</p> */}
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
