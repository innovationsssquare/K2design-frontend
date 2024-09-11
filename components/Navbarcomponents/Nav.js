"use client";
import React from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Link,
  Input,
  DropdownItem,
  DropdownTrigger,
  Dropdown,
  DropdownMenu,
  Avatar,
  Badge,
} from "@nextui-org/react";
import { CiSearch } from "react-icons/ci";

// import "primeicons/primeicons.css";

import { IoSearchOutline } from "react-icons/io5";
import Image from "next/image";
import Logo from "../../public/Logo.png";
import { BsCart3 } from "react-icons/bs";
import { BsBell } from "react-icons/bs";



export default function Nav() {
  return (
    <header className="header-two sticky-header sticky top-0 z-20 lg:relative w-full h-14 lg:h-auto ">
      <div className="z-20 transition-all duration-200 ease-in-out innerSticky lg:w-full body-font ">
        <div className="w-full transition-all duration-200 ease-in-out top-bar-search hidden lg:max-w-[600px] absolute z-30 px-4 md:px-6 top-1">
          <div className="overlay cursor-pointer invisible w-full h-full opacity-0 flex top-0 ltr:left-0 rtl:right-0 transition-all duration-300 fixed"></div>
          <div className="relative z-30 flex flex-col justify-center w-full shrink-0">
            <div className="flex flex-col w-full mx-auto"></div>
          </div>
        </div>
      </div>
      <div className="flex items-center justify-between h-16 py-3 top-bar lg:h-auto mx-auto max-w-[1920px] px-4 md:px-6 lg:px-8 2xl:px-10">
        <Link
          className="inline-block focus:outline-none max-w-[131px] w-full logo -mt-1.5 md:-mt-1 "
          href="/"
        >
          <Image src={Logo} alt="logo" className="object-contain h-16 w-24" />
        </Link>
        <div className="w-full transition-all duration-200 ease-in-out hidden lg:flex lg:max-w-[650px] 2xl:max-w-[800px] lg:ltr:ml-7 lg:rtl:mr-7 lg:ltr:mr-5 lg:rtl:ml-5">
          <div className="overlay cursor-pointer invisible w-full h-full opacity-0 flex top-0 ltr:left-0 rtl:right-0 transition-all duration-300 fixed input-focus-overlay-open"></div>
          <div className="relative z-30 flex flex-col justify-center w-full shrink-0">
            <div className="flex flex-col w-full mx-auto">
              <form className="relative flex w-full rounded-md">
                {/* <Input
                  classNames={{
                    base: " sm:max-w-[10rem] bg-white h-[52px] ltr:pl-5 rtl:pr-5 text-heading border border-[#e5e7eb]  ",
                    mainWrapper: "h-full w-[450px] ",
                    input: "text-small bg-white border border-[#e5e7eb]",
                    inputWrapper:
                      "h-full font-normal text-default-500 bg-white border border-[#e5e7eb] ",
                  }}
                  placeholder="Type to search..."
                  size="sm"
                  startContent={<CiSearch size={18} />}
                  type="search"
                /> */}

                <label className="flex flex-1 items-center py-0.5">
                  <div className="relative w-full flex gap-2">
                 
                    <input
                      className="text-heading outline-none w-full h-[52px] ltr:pl-5 rtl:pr-5 md:ltr:pl-6 md:rtl:pr-6 ltr:pr-14 rtl:pl-14 md:ltr:pr-16 md:rtl:pl-16 bg-brand-light text-brand-dark text-sm lg:text-15px rounded-md transition-all duration-200 focus:border-secondary focus:ring-0 placeholder:text-brand-dark/50 border border-[#e5e7eb] p-4  bg-[#f8f9fb]"
                      placeholder="What are you looking..."
                      type="search"
                    />
                     <i className="pi pi-search absolute inset-y-0 right-4 flex items-center text-[#a4a4a4] pointer-events-none text-opacity-40 "></i>
                    

                    
                  </div>
                  
                </label>
              </form>
            </div>
          </div>
        </div>
        <div className="flex shrink-0 -mx-2.5 xl:-mx-3.5">
          <div className="xl:mx-3.5 mx-2.5">
            <div className="relative z-10 lg:top-[1px]">
              <div className="flex gap-2">
                {/* <div className="relative flex items-center">
                  <IoDocumentTextOutline size={20} />
                </div>
                <button className="relative w-full py-2 rounded-lg cursor-pointer text-brand-dark ltr:pl-3 rtl:pr-3 ltr:pr-5 rtl:pl-5 ltr:text-left rtl:text-right focus:outline-none">
                  <span className="leading-5 pb-0">Request Quote</span>
                </button> */}
              </div>
            </div>
          </div>

          <button className="flex items-center justify-center shrink-0 h-auto focus:outline-none transform  lg:flex mx-2.5 xl:mx-3.5">
            <div className="relative flex items-center">
              <Badge color="secondary" content={""} shape="circle">
                <BsBell size={20} />
              </Badge>
            </div>
            {/* <span className=" ltr:ml-2 rtl:mr-2 ml-2 leading-5 pb-0.">
              Cart
            </span> */}
          </button>
          <button className="flex items-center justify-center shrink-0 h-auto focus:outline-none transform  lg:flex mx-2.5 xl:mx-3.5">
            <div className="relative flex items-center">
              <Badge color="secondary" content={""} shape="circle">
                <BsCart3 size={20} />
              </Badge>
            </div>
            <span className=" ltr:ml-2 rtl:mr-2 ml-2 leading-5 pb-0.">
              Cart
            </span>
          </button>
          <div className="flex items-center justify-center shrink-0 h-auto focus:outline-none transform  lg:flex mx-2.5 xl:mx-3.5">
            <Dropdown placement="bottom-end">
              <DropdownTrigger>
                <Avatar
                  isBordered
                  as="button"
                  className="transition-transform"
                  color="secondary"
                  name="Jason Hughes"
                  size="sm"
                  src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
                />
              </DropdownTrigger>
              <DropdownMenu aria-label="Profile Actions" variant="flat">
                <DropdownItem key="profile" className="h-14 gap-2">
                  <p className="font-semibold">Signed in as</p>
                  <p className="font-semibold">zoey@example.com</p>
                </DropdownItem>
                <DropdownItem key="settings">My Settings</DropdownItem>
                <DropdownItem key="team_settings">Team Settings</DropdownItem>
                <DropdownItem key="analytics">Analytics</DropdownItem>
                <DropdownItem key="system">System</DropdownItem>
                <DropdownItem key="configurations">Configurations</DropdownItem>
                <DropdownItem key="help_and_feedback">
                  Help & Feedback
                </DropdownItem>
                <DropdownItem key="logout" color="danger">
                  Log Out
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </div>
        </div>
      </div>

      
    </header>
  );
}
