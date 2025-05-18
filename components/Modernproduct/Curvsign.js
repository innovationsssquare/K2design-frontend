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
import { GetCurvsigncalculation } from "@/lib/ReduxSlice/Modernproduct/curvsignSlice";

const Curvsign = () => {
  const [formData, setFormData] = useState({
    type: "",
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

  const { Curvsignresult, loading, error } = useSelector(
    (state) => state.Curvsign
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
      dispatch(GetCurvsigncalculation(formData));
    }
  }, [formData, dispatch]);

  useEffect(() => {
    if (Curvsignresult?.message === "Configuration not found") {
      setErrorMessage("Selected options are not available");
    } else {
      setErrorMessage("");
    }
  }, [Curvsignresult]);

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

  const wallmounted = [56, 78, 109, 150, 212, 300];
  const wallmounted56mm = [74, 105, 150, 200, 250, 300];
  const wallmounted78mm = [105, 150, 210, 250, 300, 420];
  const wallmounted109mm = [105, 150, 210, 250, 297, 420];
  const wallmounted150mm = [105, 150, 210, 297, 420];
  const wallmounted212mm = [148, 210, 297, 420];
  const wallmounted300mm = [210, 420, 600];

  const projected = [109, 150, 212];
  const projected109mm = [148, 210, 297];
  const projected150mm = [150, 210, 297];
  const projected212mm = [210, 297];

  const singlesuspended = [109, 150, 212];
  const singlesuspended109mm = [210, 297, 420, 600];
  const singlesuspended150mm = [297, 420, 600, 840];
  const singlesuspended212mm = [297, 420, 600, 840];

  const doublesuspended = [109, 150, 212];
  const doublesuspended109mm = [210, 297, 420, 600];
  const doublesuspended150mm = [297, 420, 600, 840];
  const doublesuspended212mm = [297, 420, 600, 840];

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
            <h1 className="text-2xl font-bold mb-4">Curv Sign</h1>
            <p className="text-sm text-gray-600 font-bold mb-4">
              Curved Sign- Aluminium Profile with multiple frame sizes{" "}
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
                    {formData.type === "Wall Mounted" &&
                      wallmounted.map((value, index) => (
                        <SelectItem key={index} value={value}>
                          {value} MM
                        </SelectItem>
                      ))}
                    {formData.type === "Projected" &&
                      projected.map((value, index) => (
                        <SelectItem key={index} value={value}>
                          {value} MM
                        </SelectItem>
                      ))}
                    {formData.type === "Suspended Single Level" &&
                      singlesuspended.map((value, index) => (
                        <SelectItem key={index} value={value}>
                          {value} MM
                        </SelectItem>
                      ))}
                    {formData.type === "Suspended Double Level" &&
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
                    {formData.type === "Wall Mounted" &&
                      formData.widthMM === 56 &&
                      wallmounted56mm.map((value, index) => (
                        <SelectItem value={value}>{value} MM</SelectItem>
                      ))}
                    {formData.type === "Wall Mounted" &&
                      formData.widthMM === 78 &&
                      wallmounted78mm.map((value, index) => (
                        <SelectItem value={value}>{value} MM</SelectItem>
                      ))}
                    {formData.type === "Wall Mounted" &&
                      formData.widthMM === 109 &&
                      wallmounted109mm.map((value, index) => (
                        <SelectItem value={value}>{value} MM</SelectItem>
                      ))}
                    {formData.type === "Wall Mounted" &&
                      formData.widthMM === 150 &&
                      wallmounted150mm.map((value, index) => (
                        <SelectItem key={index} value={value}>
                          {value} MM
                        </SelectItem>
                      ))}
                    {formData.type === "Wall Mounted" &&
                      formData.widthMM === 212 &&
                      wallmounted212mm.map((value, index) => (
                        <SelectItem key={index} value={value}>
                          {value} MM
                        </SelectItem>
                      ))}
                    {formData.type === "Wall Mounted" &&
                      formData.widthMM === 300 &&
                      wallmounted300mm.map((value, index) => (
                        <SelectItem key={index} value={value}>
                          {value} MM
                        </SelectItem>
                      ))}
                    {formData.type === "Projected" &&
                      formData.widthMM === 109 &&
                      projected109mm.map((value, index) => (
                        <SelectItem key={index} value={value}>
                          {value} MM
                        </SelectItem>
                      ))}
                    {formData.type === "Projected" &&
                      formData.widthMM === 150 &&
                      projected150mm.map((value, index) => (
                        <SelectItem key={index} value={value}>
                          {value} MM
                        </SelectItem>
                      ))}
                    {formData.type === "Projected" &&
                      formData.widthMM === 212 &&
                      projected212mm.map((value, index) => (
                        <SelectItem key={index} value={value}>
                          {value} MM
                        </SelectItem>
                      ))}
                    {formData.type === "Suspended Single Level" &&
                      formData.widthMM === 109 &&
                      singlesuspended109mm.map((value, index) => (
                        <SelectItem key={index} value={value}>
                          {value} MM
                        </SelectItem>
                      ))}
                    {formData.type === "Suspended Single Level" &&
                      formData.widthMM === 150 &&
                      singlesuspended150mm.map((value, index) => (
                        <SelectItem key={index} value={value}>
                          {value} MM
                        </SelectItem>
                      ))}
                    {formData.type === "Suspended Single Level" &&
                      formData.widthMM === 212 &&
                      singlesuspended212mm.map((value, index) => (
                        <SelectItem key={index} value={value}>
                          {value} MM
                        </SelectItem>
                      ))}
                    {formData.type === "Suspended Double Level" &&
                      formData.widthMM === 109 &&
                      doublesuspended109mm.map((value, index) => (
                        <SelectItem key={index} value={value}>
                          {value} MM
                        </SelectItem>
                      ))}
                    {formData.type === "Suspended Double Level" &&
                      formData.widthMM === 150 &&
                      doublesuspended150mm.map((value, index) => (
                        <SelectItem key={index} value={value}>
                          {value} MM
                        </SelectItem>
                      ))}
                    {formData.type === "Suspended Double Level" &&
                      formData.widthMM === 212 &&
                      doublesuspended212mm.map((value, index) => (
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
                  disabled={Curvsignresult == null}
                >
                  {loading ? (
                    <span className="loader4"></span>
                  ) : (
                    <strong className="text-Apptheme text-lg ">
                      ₹{Curvsignresult?.totalPrice || 0}
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

export default Curvsign;
