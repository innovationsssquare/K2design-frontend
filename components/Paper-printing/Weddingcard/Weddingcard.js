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
import { Checkbox } from "@/components/ui/checkbox";
import { Getweddingcardcalculation } from "@/lib/ReduxSlice/Paper-printing/WeddingSlice";

const Weddingcard = () => {
  const [formData, setFormData] = useState({
    paperType: "",
    size: "",
    includeLamination: false,
    includeEnvelope: false,
    qty: 0,
  });

  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const dispatch = useDispatch();

  const { weddingcardresult, loading, error } = useSelector(
    (state) => state.weddingcard
  );


  const handleSelectChange = (name, value) => {
    setFormData({ ...formData, [name]: value });
  };

  useEffect(() => {
    if (formData.size && formData.qty && formData.paperType) {
      dispatch(Getweddingcardcalculation(formData));
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
  const [images, setImages] = useState(null);
  const [material, setMaterial] = useState("");
  const [lamination, setLamination] = useState("");
  const [orientation, setOrientation] = useState("");
  const [printingLocation, setPrintingLocation] = useState("");
  const [quantity, setQuantity] = useState("");

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

  const handleCheckboxToggle = () => {
    setFormData((prev) => ({
      ...prev,
      includeLamination: !prev.includeLamination,
    }));
  };
  const handleCheckboxToggleforenvelope = () => {
    setFormData((prev) => ({
      ...prev,
      includeEnvelope: !prev.includeEnvelope,
    }));
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
            <h1 className="text-2xl font-bold mb-4">Wedding Card</h1>
            <p className="mb-4">
              {`Premium wedding card with customizable options, including lamination and envelope.`}
            </p>
            <p class="mt-4 text-sm font-medium text-[#606060]">Available In:</p>

            <ul className="list-disc list-inside mb-4">
              <li>{`250gms Art Paper `}</li>
              <li>{`210gms Art Paper`}</li>
              <li>{`2 Sides`}</li>
            </ul>

            <div className="mb-4">
              <label htmlFor="paperType" className="block mb-2 font-semibold">
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
                    <SelectItem value="210 gsm art">
                      210gms Art Paper
                    </SelectItem>
                  </SelectGroup>
                  <SelectGroup>
                    <SelectItem value="250 gsm art">
                      250gms Art Paper
                    </SelectItem>
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
                  <SelectValue placeholder="Select a size" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {formData.paperType === "210 gsm art" && (
                      <SelectItem value="10 x 15">10x15</SelectItem>
                    )}
                    {formData.paperType === "250 gsm art" && (
                      <>
                        <SelectItem value="11.5 x 18">11.5x18</SelectItem>
                        <SelectItem value="12.5 x 18">12.5x18</SelectItem>
                        <SelectItem value="15 x 20">15x20</SelectItem>
                      </>
                    )}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>

            {/* Dropdown for Lamination */}

            <div className="mb-4">
              <label className="block mb-2 font-semibold">Lamination</label>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="Lamination"
                  checked={formData.includeLamination}
                  onCheckedChange={handleCheckboxToggle}
                />
                <label htmlFor="Lamination" className="text-sm font-medium">
                  Add Lamination
                </label>
              </div>
            </div>

           

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
                    {formData.size === "10 x 15" && (
                      <>
                        <SelectItem value={500}>500</SelectItem>
                        <SelectItem value={700}>700</SelectItem>
                        <SelectItem value={1000}>1000</SelectItem>
                      </>
                    )}
                    {formData.size === "15 x 20" && (
                      <>
                       
                        <SelectItem value={1000}>1000</SelectItem>
                        <SelectItem value={2000}>2000</SelectItem>
                      </>
                    )}
                    {(formData.size === "11.5 x 18" || formData.size==="12.5 x 18" ) && (
                      <>
                        <SelectItem value={500}>500</SelectItem>
                        <SelectItem value={700}>700</SelectItem>
                        <SelectItem value={1000}>1000</SelectItem>
                        <SelectItem value={2000}>2000</SelectItem>
                      </>
                    )}

                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>

           {formData.qty>=1000 && <div className="mb-4">
              <label className="block mb-2 font-semibold">Envelope</label>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="includeEnvelope"
                  checked={formData.includeEnvelope}
                  onCheckedChange={handleCheckboxToggleforenvelope}
                />
                <label
                  htmlFor="includeEnvelope"
                  className="text-sm font-medium"
                >
                  Add envelope
                </label>
              </div>
            </div>}


            <div className="flex justify-between items-center mb-4">
              <div>
                <Button
                  className="bg-white  "
                  disabled={weddingcardresult == null}
                >
                  {loading ? (
                    <span className="loader4"></span>
                  ) : (
                    <strong className="text-Apptheme text-lg">
                    ₹{(parseFloat(weddingcardresult?.totalPrice) || 0).toFixed(2)}
                    </strong>
                  )}
                </Button>
                <p className="inline-block ml-3"> inclusive of all taxes</p>
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

export default Weddingcard;
