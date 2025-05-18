
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
import { GetFlatsigncalculation } from "@/lib/ReduxSlice/Modernproduct/flatsignSlice";

const Flatsign = () => {
  const [formData, setFormData] = useState({
    mainType: "",
    widthMM: "",
    heightMM: "",
    qty: 1,
  });
  const [availableQuantities, setAvailableQuantities] = useState([]);
  const [availablePageCounts, setAvailablePageCounts] = useState([]);
  const [availableSizes, setAvailableSizes] = useState([]);
  const [availablePageDetails, setAvailablePageDetails] = useState([]);

  const [errorMessage, setErrorMessage] = useState("");

  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const dispatch = useDispatch();

  const { Flatsignresult, loading, error } = useSelector(
    (state) => state.Flatsign
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
      dispatch(GetFlatsigncalculation(formData));
    }
  }, [formData, dispatch]);

  useEffect(() => {
    if (Flatsignresult?.message === "Configuration not found") {
      setErrorMessage("Selected options are not available");
    } else {
      setErrorMessage("");
    }
  }, [Flatsignresult]);

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

  const wallmounted = [31, 62, 93, 125, 156, 187,250,300];
  const wallmounted31mm = [150, 200, 250];
  const wallmounted62mm = [150, 200, 250, 300];
  const wallmounted93mm = [93, 200, 300, 400];
  const wallmounted125mm = [125, 300, 400, 500];
  const wallmounted156mm = [156, 300, 400, 500];
  const wallmounted187mm = [187, 450, 600];
  const wallmounted250mm = [250, 450, 600];
  const wallmounted300mm = [210, 600];

  const projected = [93, 125, 156,187,250,300];
  const projected93mm = [300];
  const projected125mm = [125,300];
  const projected156mm = [156, 300];
  const projected187mm = [187, 300];
  const projected250mm = [150, 250];
  const projected300mm = [210, 300];

  const singlesuspended = [93, 125, 156,187,250,300];
  const singlesuspended93mm = [300, 450, 600];
  const singlesuspended125mm = [300, 450, 600];
  const singlesuspended156mm = [450, 600, 750,900];
  const singlesuspended187mm = [450, 600, 750,900];
  const singlesuspended250mm = [750,900,1200];
  const singlesuspended300mm = [600,750,900,1200];

  const doublesuspended = [93, 125, 156,187,250,300];
  const doublesuspended93mm = [300, 450, 600];
  const doublesuspended125mm = [300, 450, 600];
  const doublesuspended156mm = [450, 600, 750,900];
  const doublesuspended187mm = [450, 600, 750,900];
  const doublesuspended250mm = [750,900,1200];
  const doublesuspended300mm = [600,750,900,1200];

 

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
            <h1 className="text-2xl font-bold mb-4">Flat Sign Board</h1>
            <p className="text-sm text-gray-600 font-bold mb-4">
             Flat sign boards available in various mounting types and sizes.
            </p>

            <p class="mt-4 text-sm font-medium text-[#606060]">Available In:</p>

            <ul className="list-disc list-inside mb-4">
              <li>Wall Mounted</li>
              <li>Projected</li>
              <li>Suspended Single Level</li>
              <li>Suspended Double Level</li>
            </ul>
            {/* <p className="font-bold mb-4">
          {`We do not accept designs that belong to or represent government or government-affiliated organizations.`}
          </p> */}

            {/* Dropdowns for Options */}
            <div className="mb-4">
              <label htmlFor="mainType" className="block mb-2 font-semibold">
                Type
              </label>
              <Select
                onValueChange={(value) => handleSelectChange("mainType", value)}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="Wall Mounted">Wall Mounted</SelectItem>
                    <SelectItem value="Projected">Projected</SelectItem>
                    <SelectItem value="Suspended Single Level">
                      Suspended Single Level
                    </SelectItem>
                    <SelectItem value="Suspended Double Level">
                      Suspended Double Level
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
                    {formData.mainType === "Wall Mounted" &&
                      wallmounted.map((value, index) => (
                        <SelectItem key={index} value={value}>
                          {value} MM
                        </SelectItem>
                      ))}
                    {formData.mainType === "Projected" &&
                      projected.map((value, index) => (
                        <SelectItem key={index} value={value}>
                          {value} MM
                        </SelectItem>
                      ))}
                    {formData.mainType === "Suspended Single Level" &&
                      singlesuspended.map((value, index) => (
                        <SelectItem key={index} value={value}>
                          {value} MM
                        </SelectItem>
                      ))}
                    {formData.mainType === "Suspended Double Level" &&
                      doublesuspended.map((value, index) => (
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
                    {formData.mainType === "Wall Mounted" &&
                      formData.widthMM === 31 &&
                      wallmounted31mm.map((value, index) => (
                        <SelectItem key={index} value={value}>{value} MM</SelectItem>
                      ))}
                    {formData.mainType === "Wall Mounted" &&
                      formData.widthMM === 62 &&
                      wallmounted62mm.map((value, index) => (
                        <SelectItem key={index} value={value}>{value} MM</SelectItem>
                      ))}
                    {formData.mainType === "Wall Mounted" &&
                      formData.widthMM === 93 &&
                      wallmounted93mm.map((value, index) => (
                        <SelectItem key={index} value={value}>{value} MM</SelectItem>
                      ))}
                    {formData.mainType === "Wall Mounted" &&
                      formData.widthMM === 125 &&
                      wallmounted125mm.map((value, index) => (
                        <SelectItem key={index} value={value}>
                          {value} MM
                        </SelectItem>
                      ))}
                    {formData.mainType === "Wall Mounted" &&
                      formData.widthMM === 156 &&
                      wallmounted156mm.map((value, index) => (
                        <SelectItem key={index} value={value}>
                          {value} MM
                        </SelectItem>
                      ))}
                    {formData.mainType === "Wall Mounted" &&
                      formData.widthMM === 187 &&
                      wallmounted187mm.map((value, index) => (
                        <SelectItem key={index} value={value}>
                          {value} MM
                        </SelectItem>
                      ))}
                    {formData.mainType === "Wall Mounted" &&
                      formData.widthMM === 250 &&
                      wallmounted250mm.map((value, index) => (
                        <SelectItem key={index} value={value}>
                          {value} MM
                        </SelectItem>
                      ))}
                    {formData.mainType === "Wall Mounted" &&
                      formData.widthMM === 300 &&
                      wallmounted300mm.map((value, index) => (
                        <SelectItem key={index} value={value}>
                          {value} MM
                        </SelectItem>
                      ))}
                    {formData.mainType === "Projected" &&
                      formData.widthMM === 93 &&
                      projected93mm.map((value, index) => (
                        <SelectItem key={index} value={value}>
                          {value} MM
                        </SelectItem>
                      ))}
                    {formData.mainType === "Projected" &&
                      formData.widthMM === 125 &&
                      projected125mm.map((value, index) => (
                        <SelectItem key={index} value={value}>
                          {value} MM
                        </SelectItem>
                      ))}
                    {formData.mainType === "Projected" &&
                      formData.widthMM === 156 &&
                      projected156mm.map((value, index) => (
                        <SelectItem key={index} value={value}>
                          {value} MM
                        </SelectItem>
                      ))}
                    {formData.mainType === "Projected" &&
                      formData.widthMM === 187 &&
                      projected187mm.map((value, index) => (
                        <SelectItem key={index} value={value}>
                          {value} MM
                        </SelectItem>
                      ))}
                    {formData.mainType === "Projected" &&
                      formData.widthMM === 250 &&
                      projected250mm.map((value, index) => (
                        <SelectItem key={index} value={value}>
                          {value} MM
                        </SelectItem>
                      ))}
                    {formData.mainType === "Projected" &&
                      formData.widthMM === 300 &&
                      projected300mm.map((value, index) => (
                        <SelectItem key={index} value={value}>
                          {value} MM
                        </SelectItem>
                      ))}
                    {formData.mainType === "Suspended Single Level" &&
                      formData.widthMM === 93 &&
                      singlesuspended93mm.map((value, index) => (
                        <SelectItem key={index} value={value}>
                          {value} MM
                        </SelectItem>
                      ))}
                    {formData.mainType === "Suspended Single Level" &&
                      formData.widthMM === 125 &&
                      singlesuspended125mm.map((value, index) => (
                        <SelectItem key={index} value={value}>
                          {value} MM
                        </SelectItem>
                      ))}
                    {formData.mainType === "Suspended Single Level" &&
                      formData.widthMM === 156 &&
                      singlesuspended156mm.map((value, index) => (
                        <SelectItem key={index} value={value}>
                          {value} MM
                        </SelectItem>
                      ))}
      
                    {formData.mainType === "Suspended Single Level" &&
                      formData.widthMM === 187 &&
                      singlesuspended187mm.map((value, index) => (
                        <SelectItem key={index} value={value}>
                          {value} MM
                        </SelectItem>
                      ))}
                    {formData.mainType === "Suspended Single Level" &&
                      formData.widthMM === 250 &&
                      singlesuspended250mm.map((value, index) => (
                        <SelectItem key={index} value={value}>
                          {value} MM
                        </SelectItem>
                      ))}
                    {formData.mainType === "Suspended Single Level" &&
                      formData.widthMM === 300 &&
                      singlesuspended300mm.map((value, index) => (
                        <SelectItem key={index} value={value}>
                          {value} MM
                        </SelectItem>
                      ))}
                    {formData.mainType === "Suspended Double Level" &&
                      formData.widthMM === 93 &&
                      doublesuspended93mm.map((value, index) => (
                        <SelectItem key={index} value={value}>
                          {value} MM
                        </SelectItem>
                      ))}
                    {formData.mainType === "Suspended Double Level" &&
                      formData.widthMM === 125 &&
                      doublesuspended125mm.map((value, index) => (
                        <SelectItem key={index} value={value}>
                          {value} MM
                        </SelectItem>
                      ))}
                    {formData.mainType === "Suspended Double Level" &&
                      formData.widthMM === 156 &&
                      doublesuspended156mm.map((value, index) => (
                        <SelectItem key={index} value={value}>
                          {value} MM
                        </SelectItem>
                      ))}
      
                    {formData.mainType === "Suspended Double Level" &&
                      formData.widthMM === 187 &&
                      doublesuspended187mm.map((value, index) => (
                        <SelectItem key={index} value={value}>
                          {value} MM
                        </SelectItem>
                      ))}
                    {formData.mainType === "Suspended Double Level" &&
                      formData.widthMM === 250 &&
                      doublesuspended250mm.map((value, index) => (
                        <SelectItem key={index} value={value}>
                          {value} MM
                        </SelectItem>
                      ))}
                    {formData.mainType === "Suspended Double Level" &&
                      formData.widthMM === 300 &&
                      doublesuspended300mm.map((value, index) => (
                        <SelectItem key={index} value={value}>
                          {value} MM
                        </SelectItem>
                      ))}
                    
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>

            <div className="mb-4">
              <label htmlFor="qty" className="block mb-2 font-semibold">
                Quantity
              </label>
              <Input
                name="qty"
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
                  disabled={Flatsignresult == null}
                >
                  {loading ? (
                    <span className="loader4"></span>
                  ) : (
                    <strong className="text-Apptheme text-lg ">
                      ₹{Flatsignresult?.totalPrice || 0}
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

export default Flatsign;
