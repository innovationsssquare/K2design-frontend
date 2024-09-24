import React, { useState } from "react";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Badge, Button } from "@nextui-org/react";
import { BsBell } from "react-icons/bs";
import { Divider } from "@nextui-org/react";
import Image from "next/image";
import PhotoAlbum from "../../public/images/Visiting_Card2.png"; 
import PaperBag from "../../public/images/Visiting_Card3.png";

export function NotificationCart() {
  const [quantity, setQuantity] = useState(1);
  const price = 1.5; // example price per item

  const handleIncrease = () => setQuantity(quantity + 1);
  const handleDecrease = () => {
    if (quantity > 1) setQuantity(quantity - 1);
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        <button className="flex items-center justify-center">
          <div className="relative flex items-center">
            <Badge color="secondary" content={""} shape="circle" className="hover:bg-white" >
              <BsBell size={20} className=" hover:text-Apptheme" />
            </Badge>
          </div>
        </button>
      </SheetTrigger>

      <SheetContent
        side="left"
        className="lg:w-[450px] w-80 md:w-[450px] border border-[#e5e7eb] left-0 animate-slide-in-left custom-scrollbar"
        style={{ maxHeight: "100%", overflowX: "auto" }} // Add maxHeight and overflow styles
      >
        <SheetHeader className="flex -mt-3">
          <div className="flex justify-around items-center">
            <SheetTitle className="text-lg">Notifications</SheetTitle>
          </div>
        </SheetHeader>

        <div className="w-full z-10 bg-[#e5e7eb] mt-4">
          <Divider orientation="horizontal" />
        </div>

        {/* Orders Sections */}
        <div className="px-4 py-2">
          {/* Orders Pending */}
          <div className="bg-[#FFEBD0] p-3 rounded-lg mb-4">
            <h3 className="font-semibold text-[#F28A2E]">Orders Pending</h3>
            <div className="grid gap-4 py-4">
              <div className="flex items-center space-x-4">
                <Image
                  src={PhotoAlbum}
                  alt="Pending Order Item"
                  className="w-16 h-16 rounded"
                />
                <div className="flex-1">
                  <p className="font-medium">Standard Visiting Card</p>
                  <p className="text-sm text-gray-500">1 / Unit X {quantity}</p>
                </div>
                <div className="flex items-center">
                  <span className="px-4">Unit {quantity}</span>
                </div>
                <p className="text-lg font-medium">
                  ${(price * quantity).toFixed(2)}
                </p>
              </div>
            </div>
          </div>

          {/* Orders Complete */}
          <div className="bg-[#E5FFEB] p-3 rounded-lg mb-4">
            <h3 className="font-semibold text-[#28A745]">Orders Complete</h3>
            <div className="grid gap-4 py-4">
              <div className="flex items-center space-x-4">
                <Image
                  src={PaperBag}
                  alt="Completed Order Item"
                  className="w-16 h-16 rounded"
                />
                <div className="flex-1">
                  <p className="font-medium">Envelopes</p>
                </div>
                <div className="flex items-center">
                  <span className="px-4"> Unit {quantity}</span>
                </div>
                <p className="text-lg font-medium">
                  ${(price * quantity).toFixed(2)}
                </p>
              </div>
            </div>
          </div>

          {/* Orders Done */}
          <div className="bg-[#E5F3FF] p-3 rounded-lg mb-4">
            <h3 className="font-semibold text-[#007BFF]">Orders Cancel</h3>
            <div className="grid gap-4 py-4">
              <div className="flex items-center space-x-4">
                <Image
                  src={PhotoAlbum}
                  alt="Done Order Item"
                  className="w-16 h-16 rounded"
                />
                <div className="flex-1">
                  <p className="font-medium">Custom Business Cards</p>
                  <p className="text-sm text-gray-500"> Unit  {quantity}</p>
                </div>
                <div className="flex items-center">
                  
                  <span className="px-4">Unit {quantity}</span>
                  
                </div>
                <p className="text-lg font-medium">
                  ${(price * quantity).toFixed(2)}
                </p>
              </div>
            </div>
          </div>

          {/* Notifications Section */}
          <div className="bg-[#FFF5F5] p-3 rounded-lg">
            <h3 className="font-semibold text-[#FF6347]">Notifications</h3>
            <div className="py-2">
              <p className="text-sm text-gray-600">You have new updates on your orders.</p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <SheetFooter>
          <SheetClose asChild>
            <Button color="secondary" className="w-full" type="submit">
              Go To Orders
            </Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
