'use client'
import React from "react";
import {Navbar, NavbarBrand, NavbarContent, NavbarItem, Link, Input, DropdownItem, DropdownTrigger, Dropdown, DropdownMenu, Avatar, Badge} from "@nextui-org/react";
import { IoSearchOutline } from "react-icons/io5";
import Image from "next/image";
import Logo from '@/public/Logo.png'
import { BsCart3 } from "react-icons/bs";
import { BsBell } from "react-icons/bs";

export default function Nav() {
  return (
    <Navbar shouldHideOnScroll isBordered maxWidth="full">
      <NavbarContent justify="start" className="flex items-center justify-start">
        <NavbarBrand className="">
        <Image  src={Logo} alt="logo" className="object-contain h-16 w-24"/>
        </NavbarBrand>
      </NavbarContent>
      <Input
          classNames={{
            base: "w-[60%] h-10",
            mainWrapper: "h-full",
            input: "text-small",
            inputWrapper: "h-full font-normal text-default-500 bg-default-400/20 dark:bg-default-500/20",
          }}
          placeholder="Type to search..."
          size="sm"
          startContent={<IoSearchOutline size={18} />}
          type="search"
        />

      <NavbarContent as="div" className="items-center" justify="end">
        <div className="flex items-center gap-2 cursor-pointer">
        <Badge color="secondary" content={''} shape="circle" >

        <BsBell size={20} />
        </Badge>
        </div>
        <div className="flex items-center gap-2 cursor-pointer">
        <Badge color="secondary" content={5} shape="circle" >
        <BsCart3 size={20} />
        </Badge>
        <span className="text-sm">Cart</span>
        </div>
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
            <DropdownItem key="help_and_feedback">Help & Feedback</DropdownItem>
            <DropdownItem key="logout" color="danger">
              Log Out
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </NavbarContent>
    </Navbar>
  );
}
