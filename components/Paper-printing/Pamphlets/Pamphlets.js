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
import { GetPamphletCalculation } from "@/lib/ReduxSlice/Paper-printing/PamphletsSlice";

const Pamphlets = () => {
  const [formData, setFormData] = useState({
    size: " ",
    paperType: " ",
    printingType: " ",
    qty:0,
    twoSided: false,
    oneSided: false,
   
  });

  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const dispatch = useDispatch();

  const { pamphletsresult, loading, error } = useSelector(
    (state) => state.pamphlets
  );

  console.log("pamphletsresult", pamphletsresult);


  const handleSelectChange = (name, value) => {
    setFormData({ ...formData, [name]: value });
  };

  useEffect(() => {
    if (formData.size && formData.paperType && formData.qty && formData.printingType) {
      dispatch(GetPamphletCalculation(formData));
    }
  }, [formData, dispatch]);

  console.log(formData, "formData");
  console.log(formData.laminationRequired, "laminationRequiredformData");

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


  const handleExtraOptionsChange = (selectedOption) => {
    setFormData((prev) => ({
      ...prev,
      twoSided: selectedOption === "twoSided", // Set true if selected
      oneSided: selectedOption === "oneSided", // Set true if selected
    }));
  };


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
            <h1 className="text-2xl font-bold mb-4">Pamphlets, Flyers, and Leaflets</h1>
            <p className="mb-4">
              {`Spread the word with our high-quality Pamphlets, Flyers, and Leaflets – the ideal tools to promote your business, events, or special offers with impact and style.
`}
            </p>
            <p class="mt-4 text-sm font-medium text-[#606060]">Available In:</p>

            <ul className="list-disc list-inside mb-4">
              <li>{`130 gsm Gloss Finish `}</li>
              <li>{`70gsm Maplitho`}</li>
       
            </ul>
  

       

            <div className="mb-4">
              <label htmlFor="size" className="block mb-2 font-semibold">
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
                    <SelectItem value="A4 / 1/4">
                    A4 / 1/4
                    </SelectItem>
                    <SelectItem value="A4 / 1/18">
                    A4 / 1/18
                    </SelectItem>
                    <SelectItem value="A3 / 12x18">
                    A3 / 12x18
                    </SelectItem>
                    <SelectItem value="A3 / 18x23">
                    A3 / 18x23
                    </SelectItem>
                    <SelectItem value="10 x 15">
                    10 x 15
                    </SelectItem>
                    <SelectItem value="15 x 20">
                    15 x 20
                    </SelectItem>
                    <SelectItem value="20 x 30">
                    20 x 30
                    </SelectItem>
                    <SelectItem value="A5 / 1/8">
                    A5 / 1/8
                    </SelectItem>
                    <SelectItem value="A4 / 1/4">
                    A4 / 1/4
                    </SelectItem>
                    <SelectItem value="A3 / 12x18">
                    A3 / 12x18
                    </SelectItem>
                    <SelectItem value="A2 / 18x23">
                    A2 / 18x23
                    </SelectItem>
                    <SelectItem value="15 x 20">
                    15 x 20
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
                    <SelectItem value="130 gsm">130 gsm Gloss Finish</SelectItem>
                    <SelectItem value="70 gsm">70 gsm Maplitho Paper</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>


            <div className="mb-4">
              <label htmlFor="printingType" className="block mb-2 font-semibold">
              Printing Type
              </label>
              <Select
                onValueChange={(value) =>
                  handleSelectChange("printingType", value)
                }
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select  Printing Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="Multicolor">Multicolor</SelectItem>
                    <SelectItem value="Onecolour">Onecolour</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>

            {/* Dropdown for Orientation */}
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
            
                    <SelectItem value={500}>500</SelectItem>
                    <SelectItem value={1000}>1000</SelectItem>
                 
                    <SelectItem value={2000}>2000</SelectItem>
                    <SelectItem value={4000}>4000</SelectItem>
                    <SelectItem value={8000}>8000</SelectItem>
              
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>

            <div className="flex justify-between items-center mb-4">
              <div>
           
              
                <Button className="bg-white  " isLoading={loading} disabled={pamphletsresult==null}>
                  <strong className="text-Apptheme text-lg">₹{pamphletsresult?.totalPrice || 0 }</strong> inclusive
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

export default Pamphlets;
