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

import { GetTagsCalculation } from "@/lib/ReduxSlice/Paper-printing/TagsSlice";

const Tags = () => {
  const [formData, setFormData] = useState({
    lamination: "",
    paperType: "",
    qty: 0,
    sideType: "",
    extraOptions: {
      stringWithHole: false,
      perforation: false,
    },
  });

  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const dispatch = useDispatch();

  const { Tagsresult, loading, error } = useSelector((state) => state.Tags);

  console.log("Tagsresult", Tagsresult);

  const handleSelectChange = (name, value) => {
    setFormData({ ...formData, [name]: value });
  };

  useEffect(() => {
    if (
      formData.lamination &&
      formData.paperType &&
      formData.qty &&
      formData.sideType 
    ) {
      dispatch(GetTagsCalculation(formData));
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

  const handleExtraOptionsChange = (option) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      extraOptions: {
        ...prevFormData.extraOptions,
        [option]: !prevFormData.extraOptions[option],
      },
    }));
  };

  // State to hold images
  const [images, setImages] = useState(null);
  //   const [material, setMaterial] = useState("");
  //   const [lamination, setLamination] = useState("");
  //   const [orientation, setOrientation] = useState("");
  //   const [printingLocation, setPrintingLocation] = useState("");
  //   const [quantity, setQuantity] = useState("");

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
            <h1 className="text-2xl font-bold mb-4">Tags</h1>
            <p className="mb-4">
              {`Organize, label, and stand out with our durable and customizable Tags – perfect for adding a professional touch to your products or belongings.
`}
            </p>
            <p class="mt-4 text-sm font-medium text-[#606060]">Available In:</p>

            <ul className="list-disc list-inside mb-4">
              <li>{`Art Cards`}</li>
              <li>{`Matt Finish`}</li>
              <li>{`Size : 2''x 3.5''`}</li>
            </ul>

            <div className="mb-4">
              <label htmlFor="paperType" className="block mb-2 font-semibold">
                Select Paper Type
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
                    <SelectItem value="Art Cards - 250 gsm">
                      Art Cards - 250 gsm
                    </SelectItem>
                    <SelectItem value="350 gsm - Matt Finish">
                      350 gsm - Matt Finish
                    </SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>

            {/* Dropdown for Lamination */}
            <div className="mb-4">
              <label htmlFor="lamination" className="block mb-2 font-semibold">
                lamination
              </label>
              <Select
                onValueChange={(value) =>
                  handleSelectChange("lamination", value)
                }
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select lamination" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="glossFront">Gloss Front</SelectItem>
                    <SelectItem value="glossBack">Gloss Back</SelectItem>
                    <SelectItem value="uvFront">uvFront</SelectItem>
                    <SelectItem value="uvBack">UV Back</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>

            {/* Dropdown for Orientation */}
            <div className="mb-4">
              <label htmlFor="sideType" className="block mb-2 font-semibold">
                Side Type
              </label>
              <Select
                onValueChange={(value) => handleSelectChange("sideType", value)}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select Side Type " />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="oneSide">OneSide</SelectItem>
                    <SelectItem value="twoSide">TwoSide</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>

            <div className="mb-4">
              <label className="block mb-2 font-semibold">Extra Options</label>

              <div className="flex items-center gap-4">
                {/* Checkbox for String with Hole */}
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={formData.extraOptions.stringWithHole}
                    onChange={() => handleExtraOptionsChange("stringWithHole")}
                    className="form-checkbox"
                  />
                  String with Hole
                </label>

                {/* Checkbox for Perforation */}
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={formData.extraOptions.perforation}
                    onChange={() => handleExtraOptionsChange("perforation")}
                    className="form-checkbox"
                  />
                  Perforation
                </label>
              </div>
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
                    <SelectItem value={1000}>1000</SelectItem>
               
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>

            <div className="flex justify-between items-center mb-4">
              <div>
                <Button
                  className="bg-white  "
                  isLoading={loading}
                  disabled={Tagsresult == null}
                >
                  <strong className="text-Apptheme text-lg">
                    ₹{Tagsresult?.FinalPrice || 0}
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

export default Tags;
