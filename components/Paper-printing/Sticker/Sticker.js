"use client";
import React, { useState, useEffect } from "react";
import { Galleria } from "primereact/galleria"; // Assuming you're using PrimeReact Galleria

import "primereact/resources/primereact.min.css";
import PaperPrintings from "../../../public/images/PaperPrinting.png";
import PhotoAlbum from "../../../public/images/Visiting_Card2.png";
import PaperBag from "../../../public/images/Visiting_Card3.png";
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
import { Checkbox } from "@/components/ui/checkbox";

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
import { useDispatch, useSelector } from "react-redux";
import { GetBookletcalculation } from "@/lib/ReduxSlice/Paper-printing/BookletSlice";
import { Input } from "@/components/ui/input";
import { GetStickercalculation } from "@/lib/ReduxSlice/Paper-printing/StickerSlice";

const stickerData = {
  "49 x 41 mm": [48, 96, 144, 192, 288, 384, 576, 768, 960],
  "94 x 54 mm": [24, 48, 96, 144, 216, 312, 408, 504, 888, 1296],
  "3.8 x 2.8 inches": [12, 24, 48, 96, 144, 216, 360, 552, 828, 1104],
  "5.8 x 3.8 inches": [6, 12, 24, 48, 96, 144, 282, 426, 564, 846, 1128],
  "8.6 x 5.6 inches (A5)": [
    4, 8, 12, 24, 48, 96, 192, 384, 576, 768, 846, 1000, 2000, 4000,
  ],
};

const Sticker = () => {
  const [formData, setFormData] = useState({
    size: "",
    qty: 0,
    includeLamination: false,
  });
  const [quantities, setQuantities] = useState([]);
  const [errorr, setError] = useState("");

  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const dispatch = useDispatch();

  const { stickerresult, loading, error } = useSelector(
    (state) => state.sticker
  );

  console.log("formData", formData);

  //   const handleSelectChange = (name, value) => {
  //     setFormData({ ...formData, [name]: value });
  //   };

  const handleSelectChange = (name, value) => {
    setFormData((prev) => {
      if (name === "size") {
        setQuantities(stickerData[value] || []);
        return { ...prev, size: value, qty: "" };
      }
      return { ...prev, [name]: value };
    });
  };

  const handleInputChange = (name, value) => {
    setFormData((prev) => ({
      ...prev,
      [name]: name === "qty" ? Number(value) : value,
    }));

    // Reset error if the user starts typing
    if (name === "qty") {
      setError("");
    }
  };

  const handleCheckboxToggle = () => {
    setFormData((prev) => ({
      ...prev,
      includeLamination: !prev.includeLamination,
    }));
  };

  const validateFormData = () => {
    if (
      formData.size === "8.2 x 11.6 inches (A4)" &&
      (formData.qty < 1 || formData.qty > 2000)
    ) {
      setError(
        "Quantity for A4 (8.2 x 11.6 inches) must be between 1 and 2000."
      );
      return false;
    }
    if (
      formData.size === "12 x 18 inches (A3)" &&
      (formData.qty < 1 || formData.qty > 1000)
    ) {
      setError("Quantity for A3 (12 x 18 inches) must be between 1 and 1000.");
      return false;
    }
    setError(""); // Clear errors if all validations pass
    return true;
  };

  useEffect(() => {
    // Validate before dispatching the action
    if (formData.size && formData.qty) {
      if (validateFormData()) {
        dispatch(GetStickercalculation(formData));
      }
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
            <h1 className="text-2xl font-bold mb-4">Sticker & Label</h1>
            <p className="mb-4">
              {`A collection of all available sticker sizes with configurations and pricing.`}
            </p>

            {/* Dropdowns for Options */}
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
                    <SelectItem value="49 x 41 mm">49 x 41 mm</SelectItem>
                    <SelectItem value="94 x 54 mm">
                      94 x 54 mm (V.Card size sticker)
                    </SelectItem>
                    <SelectItem value="3.8 x 2.8 inches">
                      3.8 x 2.8 inches
                    </SelectItem>
                    <SelectItem value="5.8 x 3.8 inches">
                      5.8 x 3.8 inches
                    </SelectItem>
                    <SelectItem value="8.6 x 5.6 inches (A5)">
                      8.6 x 5.6 inches (A5)
                    </SelectItem>
                    <SelectItem value="8.2 x 11.6 inches (A4)">
                      8.2 x 11.6 inches (A4)
                    </SelectItem>
                    <SelectItem value="12 x 18 inches (A3)">
                      12 x 18 inches (A3)
                    </SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>

            <div className="mb-4">
              <label
                className="block mb-2 font-semibold"
              >
                Lamination
              </label>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="includeLamination "
                  checked={formData.includeLamination }
                  onCheckedChange={handleCheckboxToggle}
                />
                <label
                  htmlFor="includeLamination "
                  className="text-sm font-medium"
                >
                 Add Lamination
                </label>
              </div>
            </div>

            {formData.size === "8.2 x 11.6 inches (A4)" ||
            formData.size === "12 x 18 inches (A3)" ? (
              ""
            ) : (
              <div className="mb-4">
                <label htmlFor="qty" className="block mb-2 font-semibold">
                  Select Quantity
                </label>
                <Select
                  onValueChange={(value) => handleSelectChange("qty", value)}
                  disabled={!formData.size} // Disable if no size is selected
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select Quantity" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      {quantities.length > 0 ? (
                        quantities.map((qty, index) => (
                          <SelectItem key={index} value={qty}>
                            {qty}
                          </SelectItem>
                        ))
                      ) : (
                        // Provide a disabled item when no quantities are available
                        <SelectItem key="no-qty" value="no-qty" disabled>
                          Select a size first
                        </SelectItem>
                      )}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
            )}

            {(formData.size === "8.2 x 11.6 inches (A4)" ||
              formData.size === "12 x 18 inches (A3)") && (
              <div className="mb-4">
                <label htmlFor="qty" className="block mb-2 font-semibold">
                  Enter Quantity
                </label>
                <Input
                  type="number"
                  value={formData.qty}
                  onChange={(e) => handleInputChange("qty", e.target.value)}
                  placeholder="Enter customize Qty"
                  className={errorr ? "border-red-500" : ""}
                />
                {errorr && (
                  <p className="text-red-500 text-sm mt-1">{errorr}</p>
                )}
              </div>
            )}

            <div className="flex justify-between items-center mb-4">
              <div>
                {/* <p class=" text-sm font-medium text-[#606060] ml-4">
                           {" "}
                           ₹{brochureresult?.laminationCost || 0} Lamination Cost 
                         </p> */}

                <Button className="bg-white  " disabled={stickerresult == null}>
                  {loading ? (
                    <span className="loader4"></span>
                  ) : (
                    <strong className="text-Apptheme text-lg">
                      ₹{parseFloat(stickerresult?.totalPrice || 0).toFixed(2)}
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

export default Sticker;
