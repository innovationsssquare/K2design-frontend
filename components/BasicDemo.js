"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/outline"; // Importing Heroicons
import Logo from "../public/Logo.png";
import Image from "next/image";
const menuItems = [
  {
    title: "Categories",
    href: "#",
    icon: Logo,
    subLinks: [
      { title: "Fresh Vegetables", href: "/categories/fresh-vegetables" },
      { title: "Diet Nutrition", href: "/categories/diet-nutrition" },
      { title: "Healthy Foods", href: "/categories/healthy-foods" },
      { title: "Grocery Items", href: "/categories/grocery-items" },
      { title: "Beef Steak", href: "/categories/beef-steak" },
    ],
  },
  {
    title: "Dietary",
    href: "#",
    icon: Logo,
    subLinks: [
      { title: "Vegan", href: "/dietary/vegan" },
      { title: "Gluten-Free", href: "/dietary/gluten-free" },
      { title: "Keto", href: "/dietary/keto" },
    ],
  },
  {
    title: "Search",
    href: "/search",
    icon: Logo,
  },
  {
    title: "Shops",
    href: "#",
    icon: Logo,
    subLinks: [
      { title: "Supermarket", href: "/shops/supermarket" },
      { title: "Butcher Shop", href: "/shops/butcher-shop" },
      { title: "Grocery Store", href: "/shops/grocery-store" },
    ],
  },
  {
    title: "Pages",
    href: "#",
    icon: Logo,
    subLinks: [
      { title: "About Us", href: "/pages/about" },
      { title: "Contact Us", href: "/pages/contact" },
      { title: "FAQ", href: "/pages/faq" },
    ],
  },
];

export function BasicDemo() {
  const [openIndex, setOpenIndex] = useState(null);

  const handleMouseEnter = (index) => {
    setOpenIndex(index);
  };

  const handleMouseLeave = () => {
    setOpenIndex(null);
  };

  return (
    <nav className="w-full relative flex transition-all duration-200 ease-in-out border border-[#e5e7eb] items-center justify-between  mx-auto max-w-[1920px] px-4 md:px-6 lg:px-2 2xl:px-2">
      <div className="relative mx-3 cursor-pointer menuItem xl:mx-4">
        <ul className="space-x-6 p-4 relative inline-flex items-center py-2 text-sm font-normal lg:text-15px text-brand-dark group-hover:text-brand before:absolute before:w-0 before:ltr:right-0 rtl:left-0 before:bg-brand before:h-[3px] before:transition-all before:duration-300 before:-bottom-[14px] group-hover:before:w-full ltr:group-hover:before:left-0 rtl:group-hover:before:right-0 lrt:group-hover:before:right-auto rtl:group-hover:before:left-auto">
          {menuItems.map((item, index) => (
            <li
              key={index}
              className="relative group"
              onMouseEnter={() => handleMouseEnter(index)}
              onMouseLeave={handleMouseLeave}
            >
              <div className="flex justify-center  items-center space-x-2 text-lg font-medium text-gray-700 hover:text-green-600 cursor-pointer">
                <div className="flex flex-col justify-center items-center p-1">
                  {/* <Image
                    src={item.icon}
                    alt={`${item.title} icon`}
                    className="h-14 w-14"
                  /> */}

                  <div className="flex justify-center items-center gap-2 ">
                    <span className="text-nowrap ">{item.title}</span>

                    {item.subLinks &&
                      (openIndex === index ? (
                        <ChevronUpIcon className="h-4 w-4 transition-transform duration-300" />
                      ) : (
                        <ChevronDownIcon className="h-4 w-4 transition-transform duration-300" />
                      ))}
                  </div>
                </div>
              </div>
              {item.subLinks && (
                <div
                  className={`absolute left-0 top-full mt-2 bg-white shadow-lg rounded transition-all duration-300 ${
                    openIndex === index
                      ? "opacity-100 max-h-96"
                      : "opacity-0 max-h-0"
                  }`}
                >
                  <ul className="p-4 space-y-2">
                    {item.subLinks.map((subLink, subIndex) => (
                      <li key={subIndex}>
                        <Link
                          href={subLink.href}
                          className="text-nowrap block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        >
                          {subLink.title}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
