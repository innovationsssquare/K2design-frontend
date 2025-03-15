"use client";
import React, { useState, useEffect } from "react";
import { Galleria } from "primereact/galleria"; // Assuming you're using PrimeReact Galleria

import "primereact/resources/primereact.min.css";

import BrochureDesign1 from "../../public/images/StandBoard.jpeg";
import BrochureDesign2 from "../../public/images/BrochureDesign2.png";

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
  Spinner,
} from "@nextui-org/react";
import { useDispatch, useSelector } from "react-redux";
import { Input } from "@/components/ui/input";
import { GetFlecbannerWoodencalculation } from "@/lib/ReduxSlice/Flex-printing/FlexbannerwoodSlice";

const Flexbannerwood = () => {
  const [formData, setFormData] = useState({
    type: "",
    size: "",
    sqft: 0,
    qty: 1,
  });
  const [availableQuantities, setAvailableQuantities] = useState([]);
  const [availablePageCounts, setAvailablePageCounts] = useState([]);
  const [availableSizes, setAvailableSizes] = useState([]);
  const [availablePageDetails, setAvailablePageDetails] = useState([]);

  const [errorMessage, setErrorMessage] = useState("");

  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const dispatch = useDispatch();

  const { Flexbannerwoodenresult, loading, error } = useSelector(
    (state) => state.Flexbannerwooden
  );

  const handleSelectChange = (name, value) => {
    setFormData({ ...formData, [name]: value });
  };

  console.log(formData, "formData");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => {
      const updatedFormData = { ...prev, [name]: value };

      // Calculate square footage
      const height = parseFloat(updatedFormData.height) || 0;
      const width = parseFloat(updatedFormData.width) || 0;
      const squareFootage = height * width;

      // Validation check
      if (squareFootage > 0 && squareFootage < 3) {
        setErrorMessage("Square footage must be greater than 3 sq.ft.");
      } else {
        setErrorMessage(""); // Clear error if valid
      }

      return updatedFormData;
    });
  };

  useEffect(() => {
    if (formData.size && formData.sqft) {
      dispatch(GetFlecbannerWoodencalculation(formData));
    }
  }, [formData, dispatch]);

  useEffect(() => {
    if (Flexbannerwoodenresult?.message === "Configuration not found") {
      setErrorMessage("Selected options are not available");
    } else {
      setErrorMessage("");
    }
  }, [Flexbannerwoodenresult]);

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
            <h1 className="text-2xl font-bold mb-4">
              Flex (Banner) + Wooden Frame
            </h1>

            <p className="mb-4">
              {`High-quality Flex Banner printing with Wooden Frame.`}
            </p>
            <p class="mt-4 text-sm font-medium text-[#606060]">Available In:</p>

            <ul className="list-disc list-inside mb-4 flex justify-evenly items-center">
              <li>3x2</li>
              <li>4x3</li>
              <li>6x4</li>
              <li>8x6</li>
              <li>8x8</li>
              <li>10x8</li>
              <li>10x10</li>
              <li>10x12</li>
            </ul>
            {/* <p className="font-bold mb-4">
          {`We do not accept designs that belong to or represent government or government-affiliated organizations.`}
          </p> */}

            {/* Dropdowns for Options */}
            <div className="mb-4">
              <label htmlFor="type" className="block mb-2 font-semibold">
                Type
              </label>
              <Select
                onValueChange={(value) => handleSelectChange("type", value)}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="Economy">Economy</SelectItem>
                    <SelectItem value="Premium">Premium </SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            <div className="mb-4">
              <label htmlFor="size" className="block mb-2 font-semibold">
                size
              </label>
              <Select
                onValueChange={(value) => handleSelectChange("size", value)}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select Size" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="3x2">3x2</SelectItem>
                    <SelectItem value="4x3">4x3</SelectItem>
                    <SelectItem value="6x4">6x4</SelectItem>
                    <SelectItem value="8x6">8x6</SelectItem>
                    <SelectItem value="8x8">8x8</SelectItem>
                    <SelectItem value="10x8">10x8</SelectItem>
                    <SelectItem value="10x10">10x10</SelectItem>
                    <SelectItem value="10x12">10x12</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>

            <div className="mb-4">
              <label htmlFor="sqft" className="block mb-2 font-semibold">
                Sq.ft.
              </label>
              <Select
                onValueChange={(value) => handleSelectChange("sqft", value)}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select sqft" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {formData.size === "3x2" && (
                      <SelectItem value={6}>6</SelectItem>
                    )}
                    {formData.size === "4x3" && (
                      <SelectItem value={12}>12</SelectItem>
                    )}
                    {formData.size === "6x4" && (
                      <SelectItem value={24}>24</SelectItem>
                    )}{" "}
                    {formData.size === "8x6" && (
                      <SelectItem value={56}>56</SelectItem>
                    )}
                    {formData.size === "8x8" && (
                      <SelectItem value={64}>64</SelectItem>
                    )}
                    {formData.size === "10x8" && (
                      <SelectItem value={80}>80</SelectItem>
                    )}
                    {formData.size === "10x10" && (
                      <SelectItem value={100}>100</SelectItem>
                    )}
                    {formData.size === "10x12" && (
                      <SelectItem value={120}>120</SelectItem>
                    )}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>

            {errorMessage && (
              <div className="text-[#F44336] mb-4 text-sm">{errorMessage}</div>
            )}
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
                    <SelectItem value={1}>1</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>

            {/* <div className="mb-4">
              <label
                htmlFor="applyDiscount"
                className="block mb-2 font-semibold"
              >
                Apply 10% Discount
              </label>
              <Select
                onValueChange={(value) =>
                  handleSelectChange("applyDiscount", value)
                }
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Apply Discount" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value={true}>Yes</SelectItem>
                    <SelectItem value={false}>No</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div> */}

            <div className="flex justify-between items-center mb-4">
              <div>
                <Button
                  className="bg-white  "
                  disabled={Flexbannerwoodenresult == null}
                >
                  {loading ? (
                    <span className="loader4"></span>
                  ) : (
                    <strong className="text-Apptheme text-lg ">
                      ₹{Flexbannerwoodenresult?.finalTotalPrice || 0}
                    </strong>
                  )}
                </Button>
                <p className="inline-block ml-3">inclusive of all taxes</p>
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

export default Flexbannerwood;
