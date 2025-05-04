"use client";
import React, { useState, useEffect } from "react";
import { Galleria } from "primereact/galleria"; // Assuming you're using PrimeReact Galleria

import "primereact/resources/primereact.min.css";

import BrochureDesign1 from "../../../public/images/BrochureDesign1.png";
import BrochureDesign2 from "../../../public/images/BrochureDesign2.png";
import brochures from "../../../public/images/brochures.jpeg";

import { GetPavtibookscalculation } from "@/lib/ReduxSlice/Paper-printing/PavtibooksSlice";
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
import { Input } from "@/components/ui/input";

const Pavtibooks = () => {
  const [formData, setFormData] = useState({
    type: "",
    size: "",
    qty: 0,
    pages: 0,
    pageNumbering: 0,
    bookNumbering: 0,
  });

  const [selectedType, setSelectedType] = useState(""); // Tracks selected type
  const [quantities, setQuantities] = useState([]);
  const [sizes, setSizes] = useState([]); // Tracks available sizes
  const [pages, setPages] = useState([]); // Tracks available pages

  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const dispatch = useDispatch();

  const { Pavtibooksresult, loading, error } = useSelector(
    (state) => state.Pavtibooks
  );

  console.log("Pavtibooksresult", Pavtibooksresult);

  //   const handleSelectChange = (name, value) => {
  //     setFormData({ ...formData, [name]: value });
  //   };

  // const handleSelectChange = (name, value) => {
  //     // Update the form data with the selected value
  //     setFormData({ ...formData, [name]: value });

  //     // Additional logic for updating quantities
  //     if (name === "type") {
  //       if (value === "Multi Colour") {
  //         setQuantities([2, 4, 6, 10, 20, 50]);
  //       } else if (value === "One Colour") {
  //         setQuantities([10, 20, 50]);
  //       } else {
  //         setQuantities([]); // Reset quantities if no valid type is selected
  //       }
  //     }
  //   };

  const handleSelectChange = (name, value) => {
    setFormData({ ...formData, [name]: value });

    // Update options based on type selection
    if (name === "type") {
      setSelectedType(value);

      if (value === "Multi Colour") {
        setQuantities([2, 4, 6, 10, 20, 50]);
        setSizes(["11 x 3.5 Inch"]);
        setPages([50, 100]);
      } else if (value === "One Colour") {
        setQuantities([10, 20, 50]);
        setSizes(["11 x 4 Inch"]);
        setPages([100]);
      } else {
        setQuantities([]);
        setSizes([]);
        setPages([]);
      }
    }
  };

  useEffect(() => {
    if (formData.size && formData.type && formData.qty && formData.pages) {
      dispatch(GetPavtibookscalculation(formData));
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
            <h1 className="text-2xl font-bold mb-4">
              Pavati Books (Traditional Receipt Book)
            </h1>
            <p className="mb-4">
              {`Keep your transactions organized and professional with Pavati Books – the perfect traditional receipt book for maintaining clear and reliable records.
`}
            </p>
            <p class="mt-4 text-sm font-medium text-[#606060]">Available In:</p>

            <ul className="list-disc list-inside mb-4">
              <li>{`Multi Colour `}</li>
              <li>{`One Colour `}</li>
            </ul>
            {/* <p className="font-bold mb-4">
          {`We do not accept designs that belong to or represent government or government-affiliated organizations.`}
          </p> */}

            {/* Dropdowns for Options */}
            <div className="mb-4">
              <label htmlFor="material" className="block mb-2 font-semibold">
                Type
              </label>
              <Select
                onValueChange={(value) => handleSelectChange("type", value)}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select a Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="Multi Colour">Multi Colour</SelectItem>
                    <SelectItem value="One Colour">One Colour</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>

            {/* Dropdown for Lamination */}

            {/* Dropdown for Orientation */}

            {/* Dropdown for Printing Location */}

            {/* Dropdown for Quantity */}

            {/* <div className="mb-4">
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
                    <SelectItem value={2}>2</SelectItem>
                    <SelectItem value={4}>4</SelectItem>
                    <SelectItem value={6}>6</SelectItem>
                    <SelectItem value={10}>10</SelectItem>
                    <SelectItem value={20}>20</SelectItem>
                    <SelectItem value={50}>50</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div> */}

            <div className="mb-4">
              <label htmlFor="size" className="block mb-2 font-semibold">
                Size
              </label>
              <Select
                onValueChange={(value) => handleSelectChange("size", value)}
                disabled={!selectedType} // Disable if no type is selected
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select Size" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {sizes.map((size, index) => (
                      <SelectItem key={index} value={size}>
                        {size}
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
              <Select
                onValueChange={(value) => handleSelectChange("qty", value)}
                disabled={!selectedType}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select Quantity" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {quantities.map((qty, index) => (
                      <SelectItem key={index} value={qty}>
                        {qty}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>

            {/* Pages Dropdown */}
            <div className="mb-4">
              <label htmlFor="pages" className="block mb-2 font-semibold">
                Pages
              </label>
              <Select
                onValueChange={(value) => handleSelectChange("pages", value)}
                disabled={!selectedType} // Disable if no type is selected
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select Pages" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {formData.qty <= 10 && (
                      <SelectItem value={50}>50</SelectItem>
                    )}

                    {formData.qty >= 10 && (
                      <SelectItem value={100}>100</SelectItem>
                    )}

                    
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>

            <div className="mb-4">
              <label
                htmlFor="printing-location"
                className="block mb-2 font-semibold"
              >
                Printing Orientation
              </label>
              <Select
                onValueChange={(value) => setPrintingLocation(value)}
                disabled={!selectedType}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select Printing Orientation" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="Horizontal">Horizontal</SelectItem>
                    <SelectItem value="Vertical">Vertical</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>

            <div className="flex justify-between items-center mb-4">
              <div>
                <Button
                  className="bg-white  "
                  isLoading={loading}
                  disabled={Pavtibooksresult == null}
                >
                  <strong className="text-Apptheme text-lg">
                    ₹{Pavtibooksresult?.totalPrice || 0}
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

export default Pavtibooks;
