"use client";
import React, { useRef } from "react";
import Image from "next/image";
import { ChevronDown, ChevronLeft, ChevronRight } from "lucide-react"; // Added ChevronLeft and ChevronRight icons

import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarTrigger,
} from "@/components/ui/menubar";

// Import images
import Logo from "../../public/Logo.png";
import FLEX from "../../public/images/FLEX (Banner).png";
import Calnedar from "../../public/images/Calnedar.jpg";
import VisitingCard from "../../public/images/Visiting_Card.png";
import FlexandRelated from "../../public/images/Flex&Related.png";
import MediaPrinting from "../../public/images/MediaPrinting.png";
import GLASSFILMS from "../../public/images/GLASSFILMS.png";
import RigidSign from "../../public/images/RigidSign.png";
import ModularPremiumSignProduct from "../../public/images/ModularPremiumSignProduct.png";
import NamePalates from "../../public/images/NamePalates.png";
import ArtFrames from "../../public/images/ArtFrames.png";
import LEDBoard from "../../public/images/LEDBoard.png";
import VinylLetter from "../../public/images/VinylLetter.png";
import ACPandAcrylic from "../../public/images/ACPandAcrylic.png";
import CLIAPON from "../../public/images/CLIAPON FRAMES.png";
import BROCHUR from "../../public/images/BROCHUR (3).jpg";
import Link from "next/link";

const data = [
  {
    mainMenu: "Paper Printing",
    logo: VisitingCard,
    subMenu: [
      {
        title: "Visiting Card",
        href: "/docs/primitives/alert-dialog",
      },
      {
        title: "Letter Head",
        href: "/docs/primitives/hover-card",
      },
      {
        title: "Envelopes",
        href: "/docs/primitives/hover-card",
      },
      {
        title: "Bill Books",
        href: "/docs/primitives/hover-card",
      },
      {
        title: "Pavati Books",
        href: "/docs/primitives/hover-card",
      },
      {
        title: "Brochure",
        href: "/docs/primitives/hover-card",
      },
      {
        title: "Booklet",
        href: "/docs/primitives/hover-card",
      },
      {
        title: "12*18 Digital Print (Poster)",
        href: "/docs/primitives/hover-card",
      },
      {
        title: "Stamps",
        href: "/docs/primitives/hover-card",
      },
      {
        title: "Pamphlets /Flyers Leaflets/ ",
        href: "/docs/primitives/hover-card",
      },
      {
        title: "Invitations ",
        href: "/docs/primitives/hover-card",
      },
      {
        title: "Sticker & Labels ",
        href: "/docs/primitives/hover-card",
      },
      {
        title: "Tags ",
        href: "/docs/primitives/hover-card",
      },
      {
        title: "Calendar ",
        href: "/docs/primitives/hover-card",
      },
      {
        title: "Files & Folder ",
        href: "/docs/primitives/hover-card",
      },
      {
        title: "Paper Bags ",
        href: "/docs/primitives/hover-card",
      },
      // More sub-menu items...
    ],
  },
  {
    mainMenu: "Media Printing",
    logo: MediaPrinting,
    subMenu: [
      {
        title: "Vinyl Print",
        href: "/docs/primitives/alert-dialog",
      },
      {
        title: "Night Glow Print",
        href: "/docs/primitives/hover-card",
      },
      {
        title: "Canvas Print",
        href: "/docs/primitives/hover-card",
      },
      {
        title: "3mm Reflector Print & Signs",
        href: "/docs/primitives/hover-card",
      },
      {
        title: "Translite Print",
        href: "/docs/primitives/hover-card",
      },
      {
        title: "Backlite Flex Print",
        href: "/docs/primitives/hover-card",
      },
      // More sub-menu items...
    ],
  },
  {
    mainMenu: "Flex & Related",
    logo: FlexandRelated,
    subMenu: [
      {
        title: "Flex ( Banner )",
        href: "/docs/primitives/tooltip",
       },
      {
        title: "Flex Wooden Frame Board",
        href: "/docs/primitives/tabs",
         },
      {
        title: "Flex Adv MS Frame Board",
        href: "/docs/primitives/tabs",
         },
      {
        title: "Flex Economy Frame Board",
        href: "/docs/primitives/tabs",
         },
      {
        title: "Flex Premium Frame Board",
        href: "/docs/primitives/tabs",
         },
      {
        title: "Flex Stand & Standee",
        href: "/docs/primitives/tabs",
         },
    ],
  },
  {
    mainMenu: "Rigid Sign Plates",
    logo: RigidSign,
    subMenu: [
      {
        title: "PVC Foam Plates",
        href: "/docs/primitives/tooltip",
        
      },
      {
        title: "Acp Plates",
        href: "/docs/primitives/tabs",
        },
      {
        title: "Acrylic Plates",
        href: "/docs/primitives/tabs",
        },
      {
        title: "Night Glow Plates",
        href: "/docs/primitives/tabs",
        },
      {
        title: "Stainless Steel / Plates (SS)",
        href: "/docs/primitives/tabs",
        },
    ],
  },
  {
    mainMenu: "Vinyl Letters",
    logo: VinylLetter,
    subMenu: [
      {
        title: "Vinyl Cut Lettering",
        href: "/docs/primitives/tooltip",
      },
     
    ],
  },
  {
    mainMenu: "ACP & Acrylic",
    logo: ACPandAcrylic,
    subMenu: [
      {
        title: "Acrylic Letters Cut & Paste",
        href: "/docs/primitives/tooltip",
            },
      {
        title: "Acp & Acrylic Boad",
        href: "/docs/primitives/tabs",
      },
      {
        title: "Acp Work + Aluminium Framing",
        href: "/docs/primitives/tabs",
      },
    ],
  },
  {
    mainMenu: "Light Board /LED Board",
    logo: LEDBoard,
    subMenu: [
      {
        title: "3D LED Letters",
        href: "/docs/primitives/tooltip",
      },
            {
        title: "Acp Stencil LED Board",
        href: "/docs/primitives/tabs",
            },
            {
        title: "Light Box",
        href: "/docs/primitives/tabs",
            },
            {
        title: "Fabrics / Texttile LED Board",
        href: "/docs/primitives/tabs",
            },
            {
        title: "LED Thinlite Frames",
        href: "/docs/primitives/tabs",
            },
            {
        title: "Backlit Flex Board- tube Light",
        href: "/docs/primitives/tabs",
            },
    ],
  },
  {
    mainMenu: "Modular / Premium Sign ",
    logo: ModularPremiumSignProduct,
    subMenu: [
      {
        title: "Opti Frames",
        href: "/docs/primitives/tooltip",
              },
      {
        title: "Flat Sign",
        href: "/docs/primitives/tabs",
      },
      {
        title: "Curv Sign",
        href: "/docs/primitives/tabs",
      },
    ],
  },
  {
    mainMenu: "Glass Films /Glass Decorative",
    logo: GLASSFILMS,
    subMenu: [
      {
        title: "One Way Vision Print",
        href: "/docs/primitives/tooltip",
        
      },
      {
        title: "Glass Films",
        href: "/docs/primitives/tabs",
        
      },
    ],
  },
  {
    mainMenu: "Name Plates",
    logo: NamePalates,
    subMenu: [
      {
        title: "Door Name Plates",
        href: "/docs/primitives/tooltip",
       
      },
      
    ],
  },
  {
    mainMenu: "Printed Frame",
    logo: ArtFrames,
    subMenu: [
      {
        title: "I Sign - Wall Mounted",
        href: "/docs/primitives/tooltip",
        
      },
      {
        title: "Art Frames",
        href: "/docs/primitives/tabs",
        
      },
      {
        title: "Table Stand",
        href: "/docs/primitives/tabs",
        
      },
      {
        title: "Table Name Plates",
        href: "/docs/primitives/tabs",
        
      },
    ],
  },
  
  // More main menu items...
];

const Categorynav = () => {
  const menubarRef = useRef(null);

  const scrollLeft = () => {
    if (menubarRef.current) {
      menubarRef.current.scrollBy({ left: -200, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (menubarRef.current) {
      menubarRef.current.scrollBy({ left: 200, behavior: "smooth" });
    }
  };

  return (
    <div className="relative flex justify-center items-center">
      <button
        onClick={scrollLeft}
        className="absolute left-0 z-20 p-2 bg-white shadow-md rounded-full  hover:bg-Apptheme transition-colors "
      >
        <ChevronLeft className="h-6 w-6 text-gray-600 hover:text-white transition-colors" />
      </button>

      <Menubar
        ref={menubarRef}
        className="relative flex justify-start items-center space-x-6 px-8 bg-white shadow-small mx-4 mt-2 z-10 overflow-x-auto scrollbar-hide"
      >
        <div className="flex space-x-6">
          {data.map((menuItem, index) => (
            <MenubarMenu key={index} className="min-w-max">
              <MenubarTrigger>
                <div className="flex flex-col items-center">
                  <Image
                    src={menuItem.logo}
                    alt={menuItem.mainMenu}
                    className="object-cover h-24 w-auto"

                    // w-24 overflow-hidden bg-slate p-2 border border-[#e5e7eb]
                  />
                  <p className="flex items-center text-center font-inter text-sm font-semibold whitespace-nowrap mt-1  hover:text-Apptheme transition-colors ">
                    {menuItem.mainMenu}
                    {menuItem.subMenu.length > 0 && (
                      <ChevronDown
                        className="ml-1 h-4 w-4 transition-transform duration-200 group-data-[state=open]:rotate-180"
                        aria-hidden="true"
                      />
                    )}
                  </p>
                </div>
              </MenubarTrigger>
              {menuItem.subMenu.length > 0 && (
                <MenubarContent className="-mt-3 grid lg:grid-cols-2 grid-cols-2">
                  {menuItem.subMenu.map((subItem, subIndex) => (
                    <MenubarItem key={subIndex} asChild>
                      <Link href={subItem.href} className=" hover:bg-[#f0f5ff] hover:text-Apptheme h-10  duration-750 transition-all ">
                        {subItem.title}
                      </Link>
                    </MenubarItem>
                  ))}
                </MenubarContent>
              )}
            </MenubarMenu>
          ))}
        </div>
      </Menubar>

      <button
        onClick={scrollRight}
        className="absolute right-0 z-20 p-2 bg-white shadow-md rounded-full hover:bg-Apptheme transition-colors"
      >
        <ChevronRight className="h-6 w-6 text-gray-600 hover:text-white transition-colors" />
      </button>
    </div>
  );
};

export default Categorynav;
