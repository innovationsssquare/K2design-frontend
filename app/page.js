
'use client'

import AdsCrausal from "@/components/AdsCrausal/AdsCrausal";
import BasicDemo from "@/components/BasicDemo";
import HeroCarousel from "@/components/Carousel/HeroCarousel";
// import Exploreallcategories from "@/components/Exploreallcategories/Exploreallcategories";
import Footer from "@/components/Footer/Footer";
import  Categorynav  from "@/components/Navbarcomponents/Categorynav";
import AllProductCard from "@/components/ProductCard/AllProductCard";
import RecentlyView from "@/components/RecentlyView/RecentlyView";
import TrendingProductCards from "@/components/TrendingProductCard/TrendingProductCards";

import Image from "next/image";
import Exploreallcategories from "./categories/page";


export default function Home() {
  return (
   <main className="font-sans text-gray  bg-[#f1f2f4] flex flex-col gap-4 lg:gap-4 2xl:gap-8">
    

    {/* <Categorynav /> */}
    <HeroCarousel/>
    <Exploreallcategories/>
    
    <AllProductCard/>
    <AdsCrausal/>
    <TrendingProductCards/>
    <RecentlyView/>
    {/* <Footer/> */}

    {/* <BasicDemo/> */}
   </main>

  );
}
