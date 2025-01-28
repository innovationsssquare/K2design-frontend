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

import { Paperbagscalculation } from "@/lib/API/Paperbags";
import { GetPaperbagsCalculation } from "@/lib/ReduxSlice/Paper-printing/PaperbagsSlice";


const PaperBags = () => {
    const [formData, setFormData] = useState({
        size: "",
        qty: 0,
        extraOptions: {
          spotandmattLamination: false,
          mattLamination: false,
          silverandgoldFoil: false,
        },
      });

  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const dispatch = useDispatch();

  const { Paperbagsresult, loading, error } = useSelector(
    (state) => state.Paperbags
  );

  console.log("Paperbagsresult", Paperbagsresult);

  const handleSelectChange = (name, value) => {
    setFormData({ ...formData, [name]: value });
  };

  useEffect(() => {
    if (formData?.size && formData?.qty       ) {
      dispatch(GetPaperbagsCalculation(formData));
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
      extraOptions: {
        spotandmattLamination: selectedOption === "spotandmattLamination",
        mattLamination: selectedOption === "mattLamination",
        silverandgoldFoil: selectedOption === "silverandgoldFoil",
      },
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
            <h1 className="text-2xl font-bold mb-4">Paper Bags</h1>
            <p className="mb-4">
              {`Choose eco-friendly style with our versatile and durable Paper Bags – perfect for carrying your essentials while caring for the environment.
`}
            </p>
            <p class="mt-4 text-sm font-medium text-[#606060]">Available In:</p>

            <ul className="list-disc list-inside mb-4">
              <li>{`Art Card 250gsm with gloss lamination `}</li>
              <li>{`Multi Colour`}</li>
            </ul>

            <div className="mb-4">
              <label htmlFor="material" className="block mb-2 font-semibold">
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
                    <SelectItem value="8.25x13.75x2.5">
                    8.25x13.75x2.5
                    </SelectItem>
                    <SelectItem value="7.75x13.5x3">
                    7.75x13.5x3
                    </SelectItem>
                    <SelectItem value="8.25x5.5x2.5">
                    8.25x5.5x2.5
                    </SelectItem>
                    <SelectItem value="7.75x5x3">
                    7.75x5x3
                    </SelectItem>
                    <SelectItem value="11.25x16.25x3">
                    11.25x16.25x3
                    </SelectItem>
                    <SelectItem value="10.25x15.75x4">
                    10.25x15.75x4
                    </SelectItem>
                    <SelectItem value="9.25x14.75x5">
                    9.25x14.75x5
                    </SelectItem>
                    <SelectItem value="8.25x13.75x6">
                    8.25x13.75x6
                    </SelectItem>
                    <SelectItem value="11.75x7.25x2.5">
                    11.75x7.25x2.5
                    </SelectItem>
                    <SelectItem value="11.25x6.5x3">
                    11.25x6.5x3
                    </SelectItem>
                    <SelectItem value="10.25x6x4">
                    10.25x6x4
                    </SelectItem>
                    <SelectItem value="9.25x5x5">
                    9.25x5x5
                    </SelectItem>
                    <SelectItem value="13x7.75x3">
                    13x7.75x3
                    </SelectItem>
                    <SelectItem value="13.5x8.25x2.25">
                    13.5x8.25x2.25
                    </SelectItem>
                    <SelectItem value="12x7.25x4">
                    12x7.25x4
                    </SelectItem>
                    <SelectItem value="11x6.25x5">
                    11x6.25x5
                    </SelectItem>
                    <SelectItem value="16x11x3">
                    16x11x3
                    </SelectItem>
                    <SelectItem value="15x10.5x4">
                    15x10.5x4
                    </SelectItem>
                    <SelectItem value="14x9.5x5">
                    14x9.5x5
                    </SelectItem>
                    <SelectItem value="13x8.5x6">
                    13x8.5x6
                    </SelectItem>
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
        <SelectItem value="spotandmattLamination">Spot and Matt Lamination</SelectItem>
        <SelectItem value="mattLamination">Matt Lamination</SelectItem>
        <SelectItem value="silverandgoldFoil">Silver and Gold Foil</SelectItem>
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
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select Quantity" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value={100}>100</SelectItem>
                    <SelectItem value={250}>250</SelectItem>
                    <SelectItem value={500}>500</SelectItem>
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
                  disabled={Paperbagsresult == null}
                >
                  <strong className="text-Apptheme text-lg">
                    ₹{Paperbagsresult?.totalPrice || 0}
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

export default PaperBags;
