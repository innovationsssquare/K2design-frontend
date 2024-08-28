
'use client'

import BasicDemo from "@/components/BasicDemo";
import HeroCarousel from "@/components/Carousel/HeroCarousel";
import  Categorynav  from "@/components/Navbarcomponents/Categorynav";

import Image from "next/image";


export default function Home() {
  return (
   <main className="font-sans text-gray h-screen bg-[#f1f2f4] flex flex-col gap-2">
    

    <Categorynav />
    <HeroCarousel/>

    {/* <BasicDemo/> */}
   </main>

  );
}
