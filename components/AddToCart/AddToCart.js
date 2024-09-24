

import React, { useState } from "react";
// import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Badge, Button } from "@nextui-org/react";
import { BsCart3 } from "react-icons/bs";
import { FiTrash2 } from "react-icons/fi"; // For clear all icon
import { Divider, Input } from "@nextui-org/react";
import PhotoAlbum from "../../public/images/Visiting_Card2.png"; 
import PaperBag from "../../public/images/Visiting_Card3.png";
import Image from "next/image";
export function AddToCart() {
  const [quantity, setQuantity] = useState(1);
  const price = 1.5; // example price per item

  const handleIncrease = () => {
    setQuantity(quantity + 1);
  };

  const handleDecrease = () => {
    if (quantity > 1) setQuantity(quantity - 1);
  };

  return (
    <Sheet >
      <SheetTrigger asChild>
        <button className="flex items-center justify-center">
          <div className="relative flex items-center">
            <Badge color="secondary" content={""} shape="circle">
              <BsCart3 size={20} />
            </Badge>
          </div>
          <span className="ml-2 leading-5 pb-0 hover:text-Apptheme">Cart</span>
        </button>
      </SheetTrigger>
      <SheetContent className="lg:w-[450px] w-80 md:w-[450px] border border-[#e5e7eb]" >
        {/* Header */}
        <SheetHeader className="flex -mt-3">
          <div className="flex justify-around items-center">
            <div>
              <SheetTitle className="text-lg">Shipping Cart</SheetTitle>
            </div>

            <div className="flex">
              <button className="text-gray-500 flex">
                <FiTrash2 size={20} />
                <span className="ml-2">Clear All</span>
              </button>
            </div>
          </div>
        </SheetHeader>

        <div className="w-full  z-10 bg-[#e5e7eb] mt-4 ">
          <Divider orientation="horizontal" />
        </div>

        {/* Cart Items */}
        <div className="grid gap-4 py-4">
          <div className="flex items-center space-x-4">
            <Image
              src={PhotoAlbum} // Replace with actual image path
              alt="Organic Girl Lettuce"
              className="w-16 h-16 rounded"
            />
            <div className="flex-1">
              <p className="font-medium">Standard Visiting Card</p>
              <p className="text-sm text-gray-500">1 / Unit  X {quantity}</p>
            </div>
            <div className="flex items-center">
              <button
                onClick={handleDecrease}
                className="px-2 py-1 bg-gray-200 rounded"
              >
                –
              </button>
              <span className="px-4">{quantity}</span>
              <button
                onClick={handleIncrease}
                className="px-2 py-1 bg-gray-200 rounded"
              >
                +
              </button>
            </div>
            <p className="text-lg font-medium">
              ${(price * quantity).toFixed(2)}
            </p>
          </div>
        </div>
        <div className="grid gap-4 py-4">
          <div className="flex items-center space-x-4">
            <Image
              src={PaperBag} // Replace with actual image path
              alt="Organic Girl Lettuce"
              className="w-16 h-16 rounded"
            />
            <div className="flex-1">
              <p className="font-medium">Envelopes</p>
              <p className="text-sm text-gray-500">1 / Unit  X {quantity}</p>
            </div>
            <div className="flex items-center">
              <button
                onClick={handleDecrease}
                className="px-2 py-1 bg-gray-200 rounded"
              >
                –
              </button>
              <span className="px-4">{quantity}</span>
              <button
                onClick={handleIncrease}
                className="px-2 py-1 bg-gray-200 rounded"
              >
                +
              </button>
            </div>
            <p className="text-lg font-medium">
              ${(price * quantity).toFixed(2)}
            </p>
          </div>
        </div>

        {/* Subtotal Section */}
        <div className=" pt-4 py-4 w-full  z-10 border-t-2 border-[#e5e7eb]">
          <div className="flex justify-between">
            <p className="font-medium">Subtotal:</p>
            <p className="font-medium">${(price * quantity).toFixed(2)}</p>
          </div>
          <p className="text-sm text-gray-500">
            Final price and discounts will be determined at the time of payment
            processing.
          </p>
        </div>

        {/* Footer */}
        <SheetFooter >
          <SheetClose asChild>
            <Button color="secondary" className="w-full" type="submit">
              Proceed To Checkout
            </Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
