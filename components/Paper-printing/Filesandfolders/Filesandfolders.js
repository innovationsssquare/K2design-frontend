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
import { GetFileandfoldersCalculation } from "@/lib/ReduxSlice/Paper-printing/FileandfoldersSlice";

const Filesandfolders = () => {
  const [formData, setFormData] = useState({
    productType: "",
    paperType: "",
    size: "",
    quantity: 0,
    glossLamination: false,
    mattLamination: false,
    mattSpotUV: false,
    innerSidePrinting: false,
  });

  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const dispatch = useDispatch();

  const { Fileandfoldersresult, loading, error } = useSelector(
    (state) => state.Fileandfolders
  );

  console.log("Fileandfoldersresult", Fileandfoldersresult);
  console.log("loading", loading);
  console.log("error", error);

  const handleSelectChange = (name, value) => {
    setFormData({ ...formData, [name]: value });
  };

  useEffect(() => {
    if (
      formData.size &&
      formData.quantity &&
      formData.glossLamination &&
      formData.innerSidePrinting &&
      formData.paperType &&
      formData.productType
    ) {
      dispatch(GetFileandfoldersCalculation(formData));
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

  const handleExtraOptionsChange = (selectedOption) => {
    setFormData((prev) => ({
      ...prev,
      glossLamination: selectedOption === "glossLamination",
      mattLamination: selectedOption === "mattLamination",
      mattSpotUV: selectedOption === "mattSpotUV",
      innerSidePrinting: selectedOption === "innerSidePrinting",
    }));
  };

  const [images, setImages] = useState(null);

  // Fetch image data (simulated with useEffect)
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
            <h1 className="text-2xl font-bold ">FILES & FOLDER</h1>
            <p className="mb-4 mt-1 font-semibold">
              <span>
                {" "}
                {`Paper Files | Premium Board Files | Plastic (PP) Files`}
              </span>
            </p>
            <p className="mb-4">
              {`Keep your documents safe and organized with our wide range of Files & Folders – from classic Paper Files to durable Premium Board Files and sleek Plastic (PP) Files, designed to meet all your storage needs.  
`}
            </p>
            <p class="mt-4 text-sm font-medium text-[#606060]">Available In:</p>

            <ul className="list-disc list-inside mb-4">
              <li>{`Paper 250gsm art`}</li>
              <li>{`Premium Board 320gsm`}</li>
              <li>{`PP 0.3 mm (PP Plastic)`}</li>
            </ul>

            <div className="mb-4">
              <label htmlFor="productType" className="block mb-2 font-semibold">
                Product Type
              </label>
              <Select
                onValueChange={(value) =>
                  handleSelectChange("productType", value)
                }
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select a Product Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="Paper Files">Paper Files</SelectItem>
                    <SelectItem value="Premium Board Files">
                      Premium Board Files
                    </SelectItem>
                    <SelectItem value="Plastic Files">Plastic Files</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            <div className="mb-4">
              <label htmlFor="paperType" className="block mb-2 font-semibold">
                paper Type
              </label>
              <Select
                onValueChange={(value) =>
                  handleSelectChange("paperType", value)
                }
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select a Paper Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="320gsm">320gsm</SelectItem>
                    <SelectItem value="PP 0.3mm Plastic">
                      PP 0.3mm Plastic
                    </SelectItem>
                    <SelectItem value="250gsm">250gsm</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            <div className="mb-4">
              <label htmlFor="size" className="block mb-2 font-semibold">
                Size
              </label>
              <Select
                onValueChange={(value) => handleSelectChange("size", value)}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select a size " />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="9x12 Inches">9x12 Inches</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>

            <div className="mb-4">
              <label htmlFor="Lamination" className="block mb-2 font-semibold">
                Lamination
              </label>
              <Select
                onValueChange={(value) => handleExtraOptionsChange(value)} // Pass the selected value directly
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select Lamination Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="glossLamination">
                      GlossLamination
                    </SelectItem>
                    <SelectItem value="mattLamination">
                      Matt Lamination
                    </SelectItem>
                    <SelectItem value="mattSpotUV">matt + SpotUV</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            <div className="mb-4">
              <label
                htmlFor="innerSidePrinting"
                className="block mb-2 font-semibold"
              >
                InnerSidePrinting
              </label>
              <Select
                onValueChange={(value) => handleExtraOptionsChange(value)} // Pass the selected value directly
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select innerSidePrinting" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="innerSidePrinting">
                      innerSidePrinting
                    </SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>

            <div className="mb-4">
              <label htmlFor="quantity" className="block mb-2 font-semibold">
                Quantity
              </label>
              <Select
                onValueChange={(value) => handleSelectChange("quantity", value)}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select Quantity" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value={1000}>1000</SelectItem>
                    <SelectItem value={2000}>2000</SelectItem>
                    <SelectItem value={3000}>3000</SelectItem>
                    <SelectItem value={4000}>4000</SelectItem>
                    <SelectItem value={5000}>5000</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>

            <div className="flex justify-between items-center mb-4">
              <div>
                <Button
                  className="bg-white  "
                  isLoading={loading}
                  disabled={Fileandfoldersresult == null}
                >
                  <strong className="text-Apptheme text-lg">
                    ₹{Fileandfoldersresult?.totalPrice || 0}
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

export default Filesandfolders;
