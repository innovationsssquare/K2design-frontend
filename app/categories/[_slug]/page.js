"use client";
import React, { useEffect, useState } from "react";
import { Card, CardFooter, Image, Button } from "@nextui-org/react";

import StandardVisitingCard from "../../../public/images/StandardVisitingCard.jpeg";
import { motion } from "framer-motion";

import PaperPrintings from "../../../public/images/PaperPrinting.png";

import { useDispatch, useSelector } from "react-redux";
import { fetchcategoriesbyslug } from "@/lib/ReduxSlice/CategorySlice";

import Link from "next/link";
import { useParams } from "next/navigation";

export default function Page() {
  const dispatch = useDispatch();
  const { categoryslug } = useSelector((state) => state.category);

  const params = useParams(); // Get route params (including slug)
  // Extract slug from params

  const slug = params._slug;

  console.log(params._slug);

  const [filteredCategory, setFilteredCategory] = useState(null);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    dispatch(fetchcategoriesbyslug());
  }, []);

  useEffect(() => {
    if (slug && categoryslug.length > 0) {
      const filtered = categoryslug.find((category) => category.slug === slug);
      setFilteredCategory(filtered);
    }
  }, [slug, categoryslug]);

  console.log("Filtered Category:", filteredCategory);

  const cardsData =
    filteredCategory?.subcategories?.map((item) => ({
      title: item.name,
      // subtitle: item.description ? `Description: ${item.description}` : "No description",
      img: item.image || StandardVisitingCard.src,
      link: `/categories/${slug}/subcategories/${item.slug}`,
    })) || [];
  console.log(" cards", cardsData);

  return (
    <>
      <div className="bg-[#f1f2f4] flex justify-center items-center">
        <div className="  justify-center items-center   shadow-sm my-4 ml-4 mr-4 bg-white w-full">
          {/* Header Section with Responsive Image */}
          {/* 
          <div className="relative w-full h-[200px] sm:h-[300px] md:h-[400px] lg:h-[500px] 2xl:h-[600px]">
            <Image
              src={PaperPrintings.src}
              alt={filteredCategory?.name || "Hero Image"}
              layout="fill"
              objectFit="cover"
              className="z-0"
              priority
            />
            <div className="absolute inset-0 bg-black bg-opacity-40" />{" "}
           
            <div className="absolute inset-0 flex items-center justify-start p-6 sm:p-10 md:p-16">
              <h1 className="text-white text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
                {filteredCategory?.name || "Category Name"}
              </h1>
            </div>
          </div> */}

          {/* <header
        className="bg-gradient-to-r text-white"
        style={{ background: "linear-gradient(to right, #FFDEE9, #B5FFFC)" }} // Pastel pink and blue gradient
      >
        <div className=" mx-auto px-4 py-20  items-center flex justify-between ">
          <div className="">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-4 capitalize">
             {slug}
          </h1>
          <p className="text-xl md:text-2xl text-gray-700 opacity-90">
            Find the perfect products for every occasion
          </p>
          </div>
          <div className=" h-60">
          <Image
              src={filteredCategory?.image || PaperPrintings.src }
              alt={filteredCategory?.name || "Hero Image"}
              layout="fill"
              objectFit="cover"
              className="z-0 h-60"
              priority
            />
          </div>
        </div>
      </header> */}

          <header
            className="bg-gradient-to-r text-white"
            style={{
              background: "linear-gradient(to right, #FFDEE9, #B5FFFC)",
            }}
          >
            <div className="container mx-auto px-4 py-16 sm:py-24 lg:py-10">
              <div className="flex flex-col lg:flex-row items-center justify-center gap-5">
                <div className="flex-1 text-center lg:text-left">
                  <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-4 capitalize">
                    {slug}
                  </h1>
                  <p className="text-lg sm:text-xl lg:text-2xl text-gray-700 mb-8">
                    Discover the perfect products for every occasion
                  </p>
                </div>
                {/* <div className="flex-1 relative w-full max-w-md aspect-[4/3]">
            <Image
              src={filteredCategory?.image || "filteredCategory?.image"}
              alt={filteredCategory?.name || "Featured Products"}
              layout="fill"
              objectFit="cover"
              className="rounded-lg shadow-lg"
              priority
            />
          </div> */}

                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5 }}
                  className="lg:mr-4 relative w-full max-w-md aspect-[4/3]"
                  onMouseEnter={() => setIsHovered(true)}
                  onMouseLeave={() => setIsHovered(false)}
                >
                  <div className="absolute inset-0 bg-[linear-gradient(90deg,#ff007f,#08d9d6)] rounded-lg transform rotate-3 scale-105 opacity-20" />
                  <Image
                    src={
                      filteredCategory?.image ||
                      "/placeholder.svg?height=400&width=600"
                    }
                    alt={filteredCategory?.name || "Featured Products"}
                    layout="fill"
                    objectFit="cover"
                    className="rounded-lg shadow-2xl transition-transform duration-300 ease-in-out"
                    style={{
                      transform: isHovered ? "scale(1.05)" : "scale(1)",
                    }}
                    priority
                  />
                </motion.div>
              </div>
            </div>
          </header>

          {/* Responsive Card Grid */}
          <div className="px-4 py-4">
            <h2 className="   text-[#000] text-lg lg:text-2xl xl:text-[22px] xl:leading-8 font-sans 3xl:text-[25px] 3xl:leading-9">
              Shop by shapes
            </h2>

            <p className="">{`Select from various shapes & sizes.`}</p>
          </div>

          <div className="gap-6 grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 2xl:grid-cols-6  2xl:mx-4   lg:mx-4 sm:mx-4 mb-8">
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
                  className="z-0 w-full h-full mb-6 object-fill"
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
