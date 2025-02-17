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

const Vinylprint = () => {
  const [formData, setFormData] = useState({
    type: "",
    height: "",
    rigidSurface: "",
    width: "",
    qty: 0,
  });
  const [availableQuantities, setAvailableQuantities] = useState([]);
  const [availablePageCounts, setAvailablePageCounts] = useState([]);
  const [availableSizes, setAvailableSizes] = useState([]);
  const [availablePageDetails, setAvailablePageDetails] = useState([]);

  const [errorMessage, setErrorMessage] = useState("");

  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const dispatch = useDispatch();

  const { Billbooksresult, loading, error } = useSelector(
    (state) => state.Billbooks
  );

  const handleSelectChange = (name, value) => {
    setFormData({ ...formData, [name]: value });
  };

  useEffect(() => {
    if (formData.width && formData.height) {
      dispatch(GetBillbookscalculation(formData));
    }
  }, [formData, dispatch]);

  useEffect(() => {
    if (Billbooksresult?.message === "Configuration not found") {
      setErrorMessage("Selected options are not available");
    } else {
      setErrorMessage("");
    }
  }, [Billbooksresult]);

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
            <h1 className="text-2xl font-bold mb-4"> Vinyl Print </h1>
            <p className="text-sm text-gray-600 font-bold mb-4">
              High-quality vinyl prints with premium eco-solvent ink.{" "}
            </p>
            <p className="mb-4">
              {`High-quality custom bill books with various sizes and configurations.`}
            </p>
            <p class="mt-4 text-sm font-medium text-[#606060]">Available In:</p>

            <ul className="list-disc list-inside mb-4">
              <li> Vinyl Print Economy</li>
              <li>Vinyl Print (Premium) Eco-solvent</li>
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
                    <SelectItem value="Vinyl Print Economy">
                      Vinyl Print Economy
                    </SelectItem>
                    <SelectItem value="Vinyl Print (Premium) Eco-solvent">
                      Vinyl Print (Premium) Eco-solvent
                    </SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>

            <div className="mb-4">
              <label
                htmlFor="rigidSurface"
                className="block mb-2 font-semibold"
              >
                Rigid Surface
              </label>
              <Select
                onValueChange={(value) =>
                  handleSelectChange("rigidSurface", value)
                }
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select Rigid Surface Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="Vinyl Print">Vinyl Print</SelectItem>
                    <SelectItem value="Foamsheet3mm">Foamsheet 3mm</SelectItem>
                    <SelectItem value="Foamsheet5mm">Foamsheet 5mm</SelectItem>
                    <SelectItem value="ACP3mm">ACP 3mm</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            <div className="mb-4">
              <label htmlFor="height" className="block mb-2 font-semibold">
                Height
              </label>
              <Input placeholder="Enter height"></Input>
            </div>
            <div className="mb-4">
              <label htmlFor="width" className="block mb-2 font-semibold">
                Width
              </label>
              <Input placeholder="Enter Width"></Input>
            </div>

            {/* Dropdown for Quantity */}
            <div className="mb-4">
              <label htmlFor="qty" className="block mb-2 font-semibold">
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
                    {availableQuantities.map((quantity) => (
                      <SelectItem key={quantity} value={quantity}>
                        {quantity}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
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
                  disabled={Billbooksresult == null}
                >
                  {loading ? (
                    <span className="loader4"></span>
                  ) : (
                    <strong className="text-Apptheme text-lg ">
                      ₹{Billbooksresult?.totalPrice || 0}
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

export default Vinylprint;
