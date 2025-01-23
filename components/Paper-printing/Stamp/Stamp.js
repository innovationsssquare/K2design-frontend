"use client";
import React, { useState, useEffect } from "react";
import { Galleria } from "primereact/galleria"; // Assuming you're using PrimeReact Galleria

import "primereact/resources/primereact.min.css";

import BrochureDesign1 from "../../../public/images/StandBoard.jpeg";
import BrochureDesign2 from "../../../public/images/BrochureDesign2.png";

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
} from "@nextui-org/react";
import { useDispatch, useSelector } from "react-redux";
import { GetStampcalculation } from "@/lib/ReduxSlice/Paper-printing/StampSlice";
import { Input } from "@/components/ui/input";

const Stamp = () => {
  const [formData, setFormData] = useState({
    Stampname: "",
   type: "",
    qty: 0,
    lines: 0,

  });

  const [errorMessage, setErrorMessage] = useState("");

  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const dispatch = useDispatch();

  const { stampresult, loading, error } = useSelector(
    (state) => state.stamp
  );

  console.log("stampresult", stampresult);

  // const handleSelectChange = (name, value) => {
  //   setFormData({ ...formData, [name]: value });
  // };

  const handleSelectChange = (name, value) => {
    if (name === "qty" && value > 1000) {
      setErrorMessage("Quantity cannot be greater than 1000");
    } else {
      setErrorMessage(""); // Clear the error if input is valid
    }

    setFormData({ ...formData, [name]: value });
  };

  useEffect(() => {
    if (formData.Stampname && formData.type && formData.qty) {
      dispatch(GetStampcalculation(formData));
    }
  }, [formData, dispatch]);

  console.log(formData, "formData");

  // Static array of image objects
  const imageData = [
    {
      itemImageSrc: BrochureDesign1,
      thumbnailImageSrc: BrochureDesign1,
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
  const [images, setImages] = useState(null);
  const [material, setMaterial] = useState("");
  const [lamination, setLamination] = useState("");
  const [orientation, setOrientation] = useState("");
  const [printingLocation, setPrintingLocation] = useState("");
  const [quantity, setQuantity] = useState("");

  useEffect(() => {
    // Simulating fetching data
    setTimeout(() => {
      setImages(imageData); // Set the image data after fetching
    }, 1000); // Simulate delay
  }, []);

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
            <h1 className="text-2xl font-bold mb-4">Stamp </h1>
            <p className="mb-4">
              {`Leave a lasting impression with custom stamps designed for precision and style—ideal for business or personal use
`}
            </p>
            <p class="mt-4 text-sm font-medium text-[#606060]">Available In:</p>

            <ul className="list-disc list-inside mb-4">
         
              <li>Available in Rectangular or Square Shape</li>
              <li>Available in Round or Oval Shape</li>
              
            </ul>
            {/* <p className="font-bold mb-4">
          {`We do not accept designs that belong to or represent government or government-affiliated organizations.`}
          </p> */}

            {/* Dropdowns for Options */}
            <div className="mb-4">
              <label htmlFor="material" className="block mb-2 font-semibold">
              Stamp Name
              </label>
              <Select
                onValueChange={(value) => handleSelectChange("Stampname", value)}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select a Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="Dater Stamp">Dater Stamp</SelectItem>
                    <SelectItem value="Basic - Nylon Stamp">Basic - Nylon Stamp</SelectItem>
                    <SelectItem value="Sun Stamp">Sun Stamp</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>

            <div className="mb-4">
              <label htmlFor="lamination" className="block mb-2 font-semibold">
                 Type
              </label>
              <Select
                onValueChange={(value) =>
                  handleSelectChange("type", value)
                }
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="Premium-2Colour-DateStamp(Small)">Premium-2 Colour DateStamp(Small)</SelectItem>
                    <SelectItem value="Rectangular or Square Shape">Rectangular or Square Shape</SelectItem>
                    <SelectItem value="Round or Oval Shape">Round or Oval Shape</SelectItem>
                    <SelectItem value="Rectangular or Oval Shape">Rectangular or Oval Shape</SelectItem>
                    <SelectItem value="Round or Square Shape">Round or Square Shape</SelectItem>
                    <SelectItem value="Basic-SelfInk-DateStamp">Basic-SelfInk-DateStamp</SelectItem>
                    <SelectItem value="Premium-2Colour-DateStamp(Big)">Premium-2Colour-DateStamp(Big)</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>

            {/* Dropdown for Orientation */}
  
        {formData?.type==='Rectangular or Square Shape' &&

<div className="mb-4">
<label htmlFor="Lines" className="block mb-2 font-semibold">
   Lines
</label>
<Select
  onValueChange={(value) =>
    handleSelectChange("lines", value)
  }
>
  <SelectTrigger className="w-full">
    <SelectValue placeholder="Select Line" />
  </SelectTrigger>
  <SelectContent>
    <SelectGroup>
      <SelectItem value={1}>1</SelectItem>
      <SelectItem value={2}>2</SelectItem>
      <SelectItem value={3}>3</SelectItem>
      <SelectItem value={4}>4</SelectItem>
      
    </SelectGroup>
  </SelectContent>
</Select>
</div>

        }
   

            {/* Dropdown for Quantity */}
            <div className="mb-4">
              <label htmlFor="qty" className="block mb-2 font-semibold">
                Quantity
              </label>

              <Input
                id="number-input"
                type="number"
                placeholder="Enter a number"
                min={1}
                max={1000}
                onChange={(e) => handleSelectChange("qty", e.target.value)}
              />
            </div>

            {errorMessage && (
              <div className="text-[#F44336] mb-4 text-sm">{errorMessage}</div>
            )}

            <div className="flex justify-between items-center mb-4">
              <div>
                {/* <p class=" text-sm font-medium text-[#606060] ml-4">
                           {" "}
                           ₹{brochureresult?.laminationCost || 0} Lamination Cost 
                         </p> */}

                <Button
                  className="bg-white  "
                  isLoading={loading}
                  disabled={stampresult == null}
                >
                  <strong className="text-Apptheme text-lg">
                    ₹{stampresult?.totalPrice || 0}
                  </strong>{" "}
                  inclusive of all taxes
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

export default Stamp;
