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
import { GetBillbookscalculation } from "@/lib/ReduxSlice/Paper-printing/BillbooksSlice";
import { Input } from "@/components/ui/input";
import { GetTablestandcalculation } from "@/lib/ReduxSlice/Modernproduct/tablestandSlice";

const Tablestand = () => {
  const [formData, setFormData] = useState({
    type: "",
    widthMM: "",
    heightMM: "",
    quantity: 1,
  });
  const [availableQuantities, setAvailableQuantities] = useState([]);
  const [availablePageCounts, setAvailablePageCounts] = useState([]);
  const [availableSizes, setAvailableSizes] = useState([]);
  const [availablePageDetails, setAvailablePageDetails] = useState([]);

  const [errorMessage, setErrorMessage] = useState("");

  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const dispatch = useDispatch();

  const { Tablestandresult, loading, error } = useSelector(
    (state) => state.Tablestand
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
    if (formData.heightMM && formData.widthMM) {
      dispatch(GetTablestandcalculation(formData));
    }
  }, [formData, dispatch]);

  useEffect(() => {
    if (Tablestandresult?.message === "Configuration not found") {
      setErrorMessage("Selected options are not available");
    } else {
      setErrorMessage("");
    }
  }, [Tablestandresult]);

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
  const [images, setImages] = useState(imageData);
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

  const FLATTABLESTAND = [31, 62];
  const FLATTABLESTAND31mm = [250, 300];
  const FLATTABLESTAND62mm = [250];

  const CURVTABLESTAND = [78, 109];
  const CURVTABLESTAND78mm = [105, 150];
  const CURVTABLESTAND109mm = [75, 148, 210, 297];

  console.log(formData);
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
              Table Stand / Name Plates
            </h1>
            <p className="text-sm text-gray-600 font-bold mb-4">
              Table name plates available in Flat 2-side and Curved 1-side
              styles with different size options.
            </p>

            <p class="mt-4 text-sm font-medium text-[#606060]">Available In:</p>

            <ul className="list-disc list-inside mb-4">
              <li>Flat Table Stand</li>
              <li>Curved Table Stand</li>
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
                    <SelectItem value="Flat Table Stand - 31mm">
                      Flat Table Stand - 31mm
                    </SelectItem>
                    <SelectItem value="Flat Table Stand - 62mm">
                      Flat Table Stand - 62mm
                    </SelectItem>
                    <SelectItem value="Flat Table Stand - 31mm Slider">
                      Flat Table Stand - 31mm Slider
                    </SelectItem>
                    <SelectItem value="Flat Table Stand - 62mm Slider">
                      Flat Table Stand - 62mm Slider
                    </SelectItem>
                    <SelectItem value="Curv Table Stand - 78mm">
                      Curv Table Stand - 78mm
                    </SelectItem>
                    <SelectItem value="Curv Table Stand - 109mm">
                      Curv Table Stand - 109mm
                    </SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>

            <div className="mb-4">
              <label htmlFor="widthMM" className="block mb-2 font-semibold">
                Width
              </label>
              <Select
                onValueChange={(value) => handleSelectChange("widthMM", value)}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select Width Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {formData.type === "Flat Table Stand - 31mm" &&
                      FLATTABLESTAND.map((value, index) => (
                        <SelectItem key={index} value={value}>
                          {value} MM
                        </SelectItem>
                      ))}
                    {formData.type === "Flat Table Stand - 62mm" &&
                      FLATTABLESTAND.map((value, index) => (
                        <SelectItem key={index} value={value}>
                          {value} MM
                        </SelectItem>
                      ))}
                    {formData.type === "Flat Table Stand - 31mm Slider" &&
                      FLATTABLESTAND.map((value, index) => (
                        <SelectItem key={index} value={value}>
                          {value} MM
                        </SelectItem>
                      ))}
                    {formData.type === "Flat Table Stand - 62mm Slider" &&
                      FLATTABLESTAND.map((value, index) => (
                        <SelectItem key={index} value={value}>
                          {value} MM
                        </SelectItem>
                      ))}
                    {formData.type === "Curv Table Stand - 78mm" &&
                      CURVTABLESTAND.map((value, index) => (
                        <SelectItem key={index} value={value}>
                          {value} MM
                        </SelectItem>
                      ))}
                    {formData.type === "Curv Table Stand - 109mm" &&
                      CURVTABLESTAND.map((value, index) => (
                        <SelectItem key={index} value={value}>
                          {value} MM
                        </SelectItem>
                      ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>

            <div className="mb-4">
              <label htmlFor="heightMM" className="block mb-2 font-semibold">
                height
              </label>
              <Select
                onValueChange={(value) => handleSelectChange("heightMM", value)}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select Height Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {formData.type === "Flat Table Stand - 31mm" &&
                      formData.widthMM === 31 &&
                      FLATTABLESTAND31mm.map((value, index) => (
                        <SelectItem value={value}>{value} MM</SelectItem>
                      ))}
                    {formData.type === "Flat Table Stand - 62mm" &&
                      formData.widthMM === 62 &&
                      FLATTABLESTAND62mm.map((value, index) => (
                        <SelectItem value={value}>{value} MM</SelectItem>
                      ))}
                    {formData.type === "Flat Table Stand - 31mm Slider" &&
                      formData.widthMM === 31 &&
                      FLATTABLESTAND31mm.map((value, index) => (
                        <SelectItem value={value}>{value} MM</SelectItem>
                      ))}
                    {formData.type === "Flat Table Stand - 62mm Slider" &&
                      formData.widthMM === 62 &&
                      FLATTABLESTAND62mm.map((value, index) => (
                        <SelectItem key={index} value={value}>
                          {value} MM
                        </SelectItem>
                      ))}
                    {formData.type === "Curv Table Stand - 78mm" &&
                      formData.widthMM === 78 &&
                      CURVTABLESTAND78mm.map((value, index) => (
                        <SelectItem key={index} value={value}>
                          {value} MM
                        </SelectItem>
                      ))}
                    {formData.type === "Curv Table Stand - 109mm" &&
                      formData.widthMM === 109 &&
                      CURVTABLESTAND109mm.map((value, index) => (
                        <SelectItem key={index} value={value}>
                          {value} MM
                        </SelectItem>
                      ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>

            <div className="mb-4">
              <label htmlFor="quantity" className="block mb-2 font-semibold">
                Quantity
              </label>
              <Input
                name="quantity"
                placeholder="Enter Quantity"
                value={formData.qty}
                onChange={handleInputChange}
              />
            </div>

            {errorMessage && (
              <div className="text-[#F44336] mb-4 text-sm">{errorMessage}</div>
            )}

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
                  disabled={Tablestandresult == null}
                >
                  {loading ? (
                    <span className="loader4"></span>
                  ) : (
                    <strong className="text-Apptheme text-lg ">
                      ₹{Tablestandresult?.totalPrice || 0}
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

export default Tablestand;
