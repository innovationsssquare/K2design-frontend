
'use client'

import { BasicDemo } from "@/components/BasicDemo";

import { Categorynav } from "@/components/Navbarcomponents/Categorynav";
import Image from "next/image";


export default function Home() {
  return (
   <main className="font-sans text-gray h-screen ">
    <BasicDemo/>

    <Categorynav />
   </main>

  );
}
