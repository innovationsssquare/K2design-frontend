'use client';

import { useEffect, useState } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";


import HeroImage1 from "../../public/images/HeroImage1.png"
import HeroImage2 from "../../public/images/HeroImage2.png"
import HeroImage3 from "../../public/images/HeroImage3.png"
import HeroImage4 from "../../public/images/HeroImage4.png"
import HeroImage5 from "../../public/images/HeroImage5.png"
import Image from "next/image";

export default function CarouselDApiDemo() {
  const [api, setApi] = useState(null);
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);

  const slides = [
    {
      id: 1,
      imageUrl: HeroImage1,
      caption: "Gaming PC Find the Perfect Gaming Laptop From ₹46,990",
    },
    {
      id: 2,
      imageUrl: HeroImage2,
      caption: "Slide 2: Best Deals on Laptops",
    },
    {
      id: 3,
      imageUrl: HeroImage3,
      caption: "Slide 3: Latest Smartphone Offers",
    },
    {
      id: 4,
      imageUrl: HeroImage4,
      caption: "Slide 4: Discover New Gadgets",
    },
    {
      id: 5,
      imageUrl: HeroImage5,
      caption: "Slide 5: Accessories and More",
    },
  ];

  useEffect(() => {
    if (!api) return;

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });

    const autoplay = setInterval(() => {
      api.scrollNext();
    }, 7000); // 3 seconds autoplay interval

    return () => clearInterval(autoplay);
  }, [api]);

  return (
    <div className="relative mx-4 my-3 mt-4 ">
      <Carousel setApi={setApi} className="w-full h-64">
        <CarouselContent>
          {slides.map((slide) => (
            <CarouselItem key={slide.id}>
              <div className="relative w-full  h-64 md:h-96">
                <Image
                  src={slide.imageUrl}
                  alt={`Slide ${slide.id}`}
                  
                  className="w-full h-64 object-cover rounded-md"
                />
                {/* <span className="absolute  left-4 text-black bottom-14 text-xl font-semibold">
                  {slide.caption}
                </span> */}
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        
        <CarouselPrevious className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-white text-black p-1 rounded h-20 cursor-pointer border-none" />
        <CarouselNext className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white text-black p-1 rounded h-20 cursor-pointer border-none" />
      </Carousel>
      {/* <div className="py-2 text-center text-sm text-muted-foreground">
        Slide {current} of {count}
      </div> */}
    </div>
  );
}
