
'use client'

import AdsCrausal from "@/components/AdsCrausal/AdsCrausal";
import BasicDemo from "@/components/BasicDemo";
import HeroCarousel from "@/components/Carousel/HeroCarousel";
import Footer from "@/components/Footer/Footer";
import  Categorynav  from "@/components/Navbarcomponents/Categorynav";
import AllProductCard from "@/components/ProductCard/AllProductCard";
import RecentlyView from "@/components/RecentlyView/RecentlyView";
import TrendingProductCards from "@/components/TrendingProductCard/TrendingProductCards";

import Image from "next/image";


export default function Home() {
  return (
   <main className="font-sans text-gray  bg-[#f1f2f4] flex flex-col gap-2">
    

    <Categorynav />
    <HeroCarousel/>
    <AllProductCard/>
    <AdsCrausal/>
    <TrendingProductCards/>
    <RecentlyView/>
    <Footer/>

    {/* <BasicDemo/> */}
   </main>

  );
}
