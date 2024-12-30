"use client";
import React, { useState, useEffect } from "react";
import { Galleria } from "primereact/galleria"; // Assuming you're using PrimeReact Galleria
import StandBoard from "../../../public/images/StandBoard.jpeg";
import "primereact/resources/primereact.min.css";
import PaperPrintings from "../../../public/images/PaperPrinting.png";
import PhotoAlbum from "../../../public/images/Visiting_Card2.png";
import PaperBag from "../../../public/images/Visiting_Card3.png";
import Visiting from "../../../public/images/Visiting_Card.png";
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

// import 'primeicons/primeicons.css';
// import 'primeflex/primeflex.css';
import Image from "next/image";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from "@nextui-org/react";

const Brochure = () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

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
          <h1 className="text-2xl font-bold mb-4">Brochure Design</h1>
          <p className="mb-4">
            {`Bring your message to a wider audience with customizable brochure design templates. Whether you're promoting a business or pitching a client, brochures are a quick and easy way to keep your message top of mind.
`}
          </p>
          <p class="mt-4 text-sm font-medium text-[#606060]">Available In:</p>
         

          <ul className="list-disc list-inside mb-4">
            <li>{`A5 (open Size: 11.65 x 8.26 inches) `}</li>
            <li>{`A4 (open Size: 16.54 x 11.26 inches) `}</li>
            <li>2 different paper materials available</li>
            <li>Available Lamination Options: Matte or Glossy</li>
            <li>Order from as low as 500 units</li>
          </ul>
          {/* <p className="font-bold mb-4">
          {`We do not accept designs that belong to or represent government or government-affiliated organizations.`}
          </p> */}

          {/* Dropdowns for Options */}
          <div className="mb-4">
            <label htmlFor="material" className="block mb-2 font-semibold">
              Type
            </label>
            <Select onValueChange={(value) => setMaterial(value)}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select a Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="Lykam Matte Coated Paper">
                    A5 (Open Size: 11.65 x 8.26)
                  </SelectItem>
                  <SelectItem value="Lykam Glass Coated Paper">
                    A4 (Open Size: 16.54 x 11.26)
                  </SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          {/* Dropdown for Lamination */}
          <div className="mb-4">
            <label htmlFor="lamination" className="block mb-2 font-semibold">
              Paper Type
            </label>
            <Select onValueChange={(value) => setLamination(value)}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select  Paper Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="300 gsm Art Paper">
                    300 gsm Art Paper
                  </SelectItem>
                  <SelectItem value="250 gsm Art Paper">
                    250 gsm Art Paper
                  </SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          {/* Dropdown for Orientation */}
          <div className="mb-4">
            <label htmlFor="Paper Fold" className="block mb-2 font-semibold">
              Paper Fold
            </label>
            <Select onValueChange={(value) => setOrientation(value)}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select Paper Fold" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="1 Fold (2 Panel)">
                    1 Fold (2 Panel)
                  </SelectItem>
                  <SelectItem value="2 Fold (3 Panel)">
                    2 Fold (3 Panel)
                  </SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          {/* Dropdown for Printing Location */}
          <div className="mb-4">
            <label
              htmlFor="printing-location"
              className="block mb-2 font-semibold"
            >
              Printing Location
            </label>
            <Select onValueChange={(value) => setPrintingLocation(value)}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select Printing Location" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="Horizontal">Horizontal</SelectItem>
                  <SelectItem value="Vertical">Vertical</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <div className="mb-4">
            <label htmlFor="lamination" className="block mb-2 font-semibold">
              Lamination
            </label>
            <Select onValueChange={(value) => setLamination(value)}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select  Paper Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="Gloss">Gloss</SelectItem>
                  <SelectItem value="Matt">Matt</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          {/* Dropdown for Quantity */}
          <div className="mb-4">
            <label htmlFor="quantity" className="block mb-2 font-semibold">
              Quantity
            </label>
            <Select onValueChange={(value) => setQuantity(value)}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select Quantity" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="500">500</SelectItem>
                  <SelectItem value="1000">1000</SelectItem>
                  <SelectItem value="2000">2000</SelectItem>
                  <SelectItem value="4000">4000</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          <div className="flex justify-between items-center mb-4">
            <div>
              <p className="text-lg  ">
                <strong className="text-Apptheme">₹739.86</strong> inclusive of
                all taxes
              </p>
              <p class=" text-sm font-medium text-[#606060]">
                {" "}
                for 100 Qty (₹2.60 / piece)
              </p>
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

          <Button onClick={handleProceed} color="secondary" className="w-full">
            Add to Cart
          </Button>
        
        </div>
        

        <Modal
          isOpen={isOpen}
          onOpenChange={onOpenChange}
          isDismissable={false}
          isKeyboardDismissDisabled={true}
        >
          <ModalContent>
            {(onClose) => (
              <>
                <ModalHeader className="flex flex-col gap-1">
                  Select Design
                </ModalHeader>
                <ModalBody>
                  <div className="flex gap-4 justify-center h-14 items-center">
                    <div className="group relative h-24  border border-slate flex justify-center items-center p-2 ">
                      <Image
                        src={PaperPrintings}
                        className=" object-cover cursor-pointer transition-transform transform group-hover:scale-110"
                        alt="Paper Printings"
                      />
                      <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-30 transition-opacity"></div>
                    </div>
                    <div className="group relative h-24  border border-slate flex justify-center items-center p-2 ">
                      <Image
                        src={PaperBag}
                        className="cursor-pointer transition-transform transform group-hover:scale-110"
                        alt="Paper Bag"
                      />
                      <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-30 transition-opacity"></div>
                    </div>
                    <div className="group relative h-24  border border-slate flex justify-center items-center p-2">
                      <Image
                        src={PhotoAlbum}
                        className="cursor-pointer transition-transform transform group-hover:scale-110"
                        alt="Photo Album"
                      />
                      <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-30 transition-opacity"></div>
                    </div>
                  </div>

                  <div className="card">
                    <FileUpload
                      name="demo[]"
                      url={"/api/upload"}
                      multiple
                      accept="image/*"
                      maxFileSize={1000000}
                      emptyTemplate={
                        <p className="m-0">
                          Drag and drop files to here to upload.
                        </p>
                      }
                    />
                  </div>
                </ModalBody>
                <ModalFooter>
                  <Button color="danger" variant="light" onPress={onClose}>
                    Close
                  </Button>
                  <Button color="primary" onPress={onClose}>
                    Select
                  </Button>
                </ModalFooter>
              </>
            )}
          </ModalContent>
        </Modal>
        
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

export default Brochure;
