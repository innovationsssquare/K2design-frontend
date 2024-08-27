"use client";
import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import Logo from "../../public/Logo.png";
import FLEX from "../../public/images/FLEX (Banner).png";
import Calnedar from "../../public/images/Calnedar.jpg";
import CLIAPON from "../../public/images/CLIAPON FRAMES.png";
import BROCHUR from "../../public/images/BROCHUR (3).jpg";

const data = [
  {
    mainMenu: "Paper Printing",
    logo: FLEX,
    subMenu: [
      {
        title: "Visiting Card",
        href: "/docs/primitives/alert-dialog",
        
      },
      {
        title: " Letter Head",
        href: "/docs/primitives/hover-card",
        
      },
      {
        title: "Envelopes",
        href: "/docs/primitives/progress",
        
      },
      {
        title: "Bill Booka",
        href: "/docs/primitives/scroll-area",
        
      },
      {
        title: "Pavati Books",
        href: "/docs/primitives/tabs",
        
      },
      {
        title: " Brochure",
        href: "/docs/primitives/tooltip",
      },
      {
        title: " Booklet",
        href: "/docs/primitives/tooltip",
      },
    ],
  },
  {
    mainMenu: "Flex",
    logo: Calnedar,
    subMenu: [
      {
        title: "Tooltip",
        href: "/docs/primitives/tooltip",
        description:
          "A popup that displays information related to an element when the element receives keyboard focus or the mouse hovers over it.",
      },
      {
        title: "Tabs",
        href: "/docs/primitives/tabs",
        description:
          "A set of layered sections of content—known as tab panels—that are displayed one at a time.",
      },
    ],
  },
  {
    mainMenu: "Utilities",
    logo: CLIAPON,
    subMenu: [
      {
        title: "Tooltip",
        href: "/docs/primitives/tooltip",
        description:
          "A popup that displays information related to an element when the element receives keyboard focus or the mouse hovers over it.",
      },
      {
        title: "Tabs",
        href: "/docs/primitives/tabs",
        description:
          "A set of layered sections of content—known as tab panels—that are displayed one at a time.",
      },
    ],
  },
  {
    mainMenu: "Media Printing ",
    logo: BROCHUR,
    subMenu: [
      {
        title: "Tooltip",
        href: "/docs/primitives/tooltip",
        description:
          "A popup that displays information related to an element when the element receives keyboard focus or the mouse hovers over it.",
      },
      {
        title: "Tabs",
        href: "/docs/primitives/tabs",
        description:
          "A set of layered sections of content—known as tab panels—that are displayed one at a time.",
      },
    ],
  },
  {
    mainMenu: "Glass Films",
    logo: Calnedar,
    subMenu: [
      {
        title: "Tooltip",
        href: "/docs/primitives/tooltip",
        description:
          "A popup that displays information related to an element when the element receives keyboard focus or the mouse hovers over it.",
      },
      {
        title: "Tabs",
        href: "/docs/primitives/tabs",
        description:
          "A set of layered sections of content—known as tab panels—that are displayed one at a time.",
      },
    ],
  },
  {
    mainMenu: "Flex",
    logo: Logo,
    subMenu: [
      {
        title: "Tooltip",
        href: "/docs/primitives/tooltip",
        description:
          "A popup that displays information related to an element when the element receives keyboard focus or the mouse hovers over it.",
      },
      {
        title: "Tabs",
        href: "/docs/primitives/tabs",
        description:
          "A set of layered sections of content—known as tab panels—that are displayed one at a time.",
      },
    ],
  },
  {
    mainMenu: "Utilities",
    logo: Logo,
    subMenu: [
      {
        title: "Tooltip",
        href: "/docs/primitives/tooltip",
        description:
          "A popup that displays information related to an element when the element receives keyboard focus or the mouse hovers over it.",
      },
      {
        title: "Tabs",
        href: "/docs/primitives/tabs",
        description:
          "A set of layered sections of content—known as tab panels—that are displayed one at a time.",
      },
    ],
  },
  {
    mainMenu: "Utilities",
    logo: Logo,
    subMenu: [
      {
        title: "Tooltip",
        href: "/docs/primitives/tooltip",
        description:
          "A popup that displays information related to an element when the element receives keyboard focus or the mouse hovers over it.",
      },
      {
        title: "Tabs",
        href: "/docs/primitives/tabs",
        description:
          "A set of layered sections of content—known as tab panels—that are displayed one at a time.",
      },
    ],
  },
  // Add more main menus as needed
];

export function Categorynav() {
  return (
    <nav className="flex justify-center items-center mx-auto mt-2">
      <NavigationMenu>
        <NavigationMenuList>
          {data.map((menuItem, index) => (
            <NavigationMenuItem key={index}>
              <NavigationMenuTrigger>
                <div className="flex flex-col gap-2 items-center">
                  <Image
                    src={menuItem.logo}
                    alt="logo"
                    className="rounded-full object-cover border border-gray-light h-12 w-12 "
                  />
                  <p className="flex gap-1 items-center relative  py-2  font-inter text-[14px]   font-semibold">
                    {menuItem.mainMenu}
                    <ChevronDown
                      className="relative top-[1px] ml-1 h-3 w-3 transition duration-200 group-data-[state=open]:rotate-180"
                      aria-hidden="true"
                    />
                  </p>
                </div>
              </NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid w-[400px] gap-1 p-1 md:w-[500px] md:grid-cols-2 lg:grid-cols-3 lg:w-[800px]">
                  {menuItem.subMenu.map((component, subIndex) => (
                    <ListItem
                      key={subIndex}
                      title={component.title}
                      href={component.href}
                    >
                     
                    </ListItem>
                  ))}
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
          ))}
        </NavigationMenuList>
      </NavigationMenu>
    </nav>
  );
}

const ListItem = React.forwardRef(
  ({ className, title, children, ...props }, ref) => {
    return (
      <li>
        <NavigationMenuLink asChild>
          <a
            ref={ref}
            className={cn(
              "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
              className
            )}
            {...props}
          >
            <div className="text-sm font-medium leading-none">{title}</div>
            <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
              {children}
            </p>
          </a>
        </NavigationMenuLink>
      </li>
    );
  }
);

ListItem.displayName = "ListItem";
