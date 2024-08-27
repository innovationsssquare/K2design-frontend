
'use client'

import BasicDemo from "@/components/BasicDemo";
import  Categorynav  from "@/components/Navbarcomponents/Categorynav";
import Image from "next/image";


export default function Home() {
  return (
   <main className="font-sans text-gray h-screen bg-[#f1f2f4]">
    

    <Categorynav />
    {/* <BasicDemo/> */}
   </main>

  );
}
