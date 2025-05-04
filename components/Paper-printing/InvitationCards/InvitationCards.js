"use client";
import React, { useState, useEffect } from "react";
import { Galleria } from "primereact/galleria"; // Assuming you're using PrimeReact Galleria
import StandBoard from "../../../public/images/StandBoard.jpeg";
import "primereact/resources/primereact.min.css";

import BrochureDesign1 from "../../../public/images/BrochureDesign1.png";
import BrochureDesign2 from "../../../public/images/BrochureDesign2.png";
import brochures from "../../../public/images/brochures.jpeg";
import { FileUpload } from "primereact/fileupload";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";


import Image from "next/image";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  useSelect,
} from "@nextui-org/react";
import { useDispatch, useSelector } from "react-redux";
import { GetWallCalendarCalculation } from "@/lib/ReduxSlice/Paper-printing/WallCalendarSlice";
import { GetInvitationCardsCalculation } from "@/lib/ReduxSlice/Paper-printing/InvitationCardsSlice";

const InvitationCards = () => {
  const [formData, setFormData] = useState({
    size: "",
    twoSided: false,
    oneSided: false,
    qty: 0,
   
  });

  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const dispatch = useDispatch();

  const { invitationCardsresult, loading, error } = useSelector(
    (state) => state.invitationCards
  );

  console.log("invitationCardsresult", invitationCardsresult);


  const handleSelectChange = (name, value) => {
    setFormData({ ...formData, [name]: value });
  };

  useEffect(() => {
    if (formData.size && formData.qty) {
      dispatch(GetInvitationCardsCalculation(formData));
    }
  }, [formData, dispatch]);

  console.log(formData, "formData");
 

  // Static array of image objects
  const imageData = [
    {
      itemImageSrc: brochures,
      thumbnailImageSrc: brochures,
      alt: "Business Card 1",
    },

    {
      itemImageSrc: BrochureDesign2,
      thumbnailImageSrc: BrochureDesign2,
      alt: "Business Card 3",
    },

    {
      itemImageSrc: BrochureDesign1,
      thumbnailImageSrc: BrochureDesign1,
      alt: "Business Card 4",
    },
  ];

  // State to hold images
  const [images, setImages] = useState(imageData);
  const [material, setMaterial] = useState("");
  const [lamination, setLamination] = useState("");
  const [orientation, setOrientation] = useState("");
  const [printingLocation, setPrintingLocation] = useState("");
  const [quantity, setQuantity] = useState("");



  // Galleria responsive options
  const responsiveOptions = [
    {
      breakpoint: "1024px",
      numVisible: 5,
    },
    {
      breakpoint: "960px",
      numVisible: 5,
    },
    {
      breakpoint: "768px",
      numVisible: 5,
    },
    {
      breakpoint: "560px",
      numVisible: 2,
    },
  ];

  const itemTemplate = (item) => {
    return (
      <div className=" h-[300px] lg:h-[450px] md:h-[350px]  w-[600px] border border-gray-light rounded-3xl ">
        <Image
          src={item.itemImageSrc}
          alt={item.alt}
          style={{ width: "100%", display: "block" }}
          className=" h-full  object-contain rounded-2xl "
        />
      </div>
    );
  };

  const handleExtraOptionsChange = (selectedOption) => {
    setFormData((prev) => ({
      ...prev,
      twoSided: selectedOption === "twoSided", // Set true if selected
      oneSided: selectedOption === "oneSided", // Set true if selected
    }));
  };
  
  
  const thumbnailTemplate = (item) => {
    return (
      <Image
        src={item.thumbnailImageSrc}
        alt={item.alt}
        style={{ display: "block" }}
        className="h-14 w-14 object-cover border   border-Apptheme"
      />
    );
  };

  const handleProceed = () => {
    // Log the selected dropdown values to the console
    console.log("Material:", material);
    console.log("Lamination:", lamination);
    console.log("Orientation:", orientation);
    console.log("Printing Location:", printingLocation);
    console.log("Quantity:", quantity);
  };

  return (
    <>
      <div className="bg-[#f1f2f4] flex justify-center items-center w-full">
        <div className="w-full p-4 shadow-sm ml-4 mr-4 my-4 flex gap-4 justify-center    lg:flex-row flex-col bg-white">
          {/* Left Side: Galleria */}
          <div className=" ">
            <div className="card sticky top-5 lg:flex lg:justify-center md:flex md:justify-center w-full ">
              {images && (
                <Galleria
                  value={images}
                  responsiveOptions={responsiveOptions}
                  numVisible={7}
                  circular
                  style={{ maxWidth: "800px" }}
                  item={itemTemplate}
                  thumbnail={thumbnailTemplate}
                />
              )}
            </div>
          </div>

          {/* Right Side: Details and Dropdowns */}
          <div className=" px-5 w-full">
            <h1 className="text-2xl font-bold mb-4">Invitation Card</h1>
            <p className="mb-4">
              {`Make every occasion special with our beautifully crafted Invitation Cards – the perfect way to share your joy and set the tone for your memorable event.
`}
            </p>
            <p class="mt-4 text-sm font-medium text-[#606060]">Available In:</p>

            <ul className="list-disc list-inside mb-4">
              <li>{`250gms Art Paper `}</li>
              <li>{`Multi Colour`}</li>
              
       
            </ul>
  
            <div className="mb-4">
              <label htmlFor="material" className="block mb-2 font-semibold">
              Size
              </label>
              <Select
                onValueChange={(value) => handleSelectChange("size", value)}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select a size" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="6x4">
                    6x4
                    </SelectItem>
                    <SelectItem value="7x5">
                    7x5
                    </SelectItem>
                    <SelectItem value="6x9">
                    6x9
                    </SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>

            {/* Dropdown for Lamination */}
            <div className="mb-4">
              <label htmlFor="lamination" className="block mb-2 font-semibold">
                Paper Type
              </label>
              <Select
                onValueChange={(value) =>
                  handleSelectChange("paperType", value)
                }
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select  Paper Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="250gsm">250gms Art Paper</SelectItem>
                    
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
        
            <div className="mb-4">
  <label htmlFor="Lamination" className="block mb-2 font-semibold">
    Printing Side
  </label>
  <Select
    onValueChange={(value) => handleExtraOptionsChange(value)} // Pass the selected value directly
  >
    <SelectTrigger className="w-full">
      <SelectValue
        placeholder="Select Printing Side"
        value={
          formData.twoSided
            ? "twoSided"
            : formData.oneSided
            ? "oneSided"
            : undefined
        }
      />
    </SelectTrigger>
    <SelectContent>
      <SelectGroup>
        <SelectItem value="twoSided">Two Side</SelectItem>
        <SelectItem value="oneSided">One Side</SelectItem>
      </SelectGroup>
    </SelectContent>
  </Select>
</div>


            {/* Dropdown for Orientation */}
      

            {/* Dropdown for Printing Location */}
       

            {/* Dropdown for Quantity */}
            <div className="mb-4">
              <label htmlFor="quantity" className="block mb-2 font-semibold">
                Quantity
              </label>
              <Select
                onValueChange={(value) => handleSelectChange("qty", value)}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select Quantity" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                  <SelectItem value={100}>100</SelectItem>
                  <SelectItem value={200}>200</SelectItem>
                  <SelectItem value={300}>300</SelectItem>
                  <SelectItem value={500}>500</SelectItem>
                    <SelectItem value={1000}>1000</SelectItem>
                    <SelectItem value={2000}>2000</SelectItem>
                  
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>

            <div className="flex justify-between items-center mb-4">
              <div>
           
              
                <Button className="bg-white  " isLoading={loading} disabled={invitationCardsresult==null}>
                  <strong className="text-Apptheme text-lg">₹{invitationCardsresult?.totalPrice || 0 }</strong> inclusive
                  of all taxes
                </Button>
              
              </div>

              <Button
                onPress={onOpen}
                color="danger"
                className=" text-white py-2 px-4 rounded-md"
              >
                Select Design
              </Button>
            </div>

            {/* <button className="bg-purple-600 text-Apptheme w-full py-3 rounded-md">
            Create your Design
          </button> */}

            <Button
              onClick={handleProceed}
              color="secondary"
              className="w-full"
            >
              Add to Cart
            </Button>
          </div>
        </div>
      </div>
      <div className="shadow-sm mx-4 my-4 flex justify-center items-center lg:flex-row flex-col bg-white">
        <div className="p-4">
          <Image
            src={BrochureDesign1}
            alt="First Image"
            className="w-full max-w-xs lg:max-w-xl rounded-lg "
          />
        </div>
        <div className="p-4">
          <Image
            src={BrochureDesign2}
            alt="Second Image"
            className="w-full max-w-xs lg:max-w-xl rounded-lg "
          />
        </div>
      </div>
    </>
  );
};

export default InvitationCards;
