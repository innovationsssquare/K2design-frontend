"use client";
import React, { useState, useEffect, Suspense } from "react";
import { Galleria } from "primereact/galleria"; // Assuming you're using PrimeReact Galleria

import "primereact/resources/primereact.min.css";
import PaperPrintings from "../../../../../../public/images/PaperPrinting.png";
import PhotoAlbum from "../../../../../../public/images/Visiting_Card2.png";
import PaperBag from "../../../../../../public/images/Visiting_Card3.png";
import Visiting from "../../../../../../public/images/Visiting_Card.png";
import StandardVisitingCard from "../../../../../../public/images/StandardVisitingCard.jpeg";
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

import { Skeleton } from "@nextui-org/react";

import { useDispatch, useSelector } from "react-redux";
import { fetchProductBySlug } from "@/lib/ReduxSlice/ProductSlice";
import { useParams } from "next/navigation";









const Page = () => {
  const dispatch = useDispatch();

  const { productDetails } = useSelector((state) => state.product);

  const params = useParams(); // Get route params (including slug)
  // Extract slug from params

  const slug = params.slug;
  const productslug = params.productslug;

  console.log("params", params);

  useEffect(() => {
    dispatch(fetchProductBySlug({slug, productslug}));
  }, [slug, productslug]);

  console.log("fetchProductBySlug", productDetails);

  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  // Static array of image objects


  // State to hold images
  const [images, setImages] = useState(null);
  const [material, setMaterial] = useState("");
  const [lamination, setLamination] = useState("");
  const [orientation, setOrientation] = useState("");
  const [printingLocation, setPrintingLocation] = useState("");
  const [quantity, setQuantity] = useState("");
  const [loading, setLoading] = useState(true);

  const [selectedCustomizations, setSelectedCustomizations] = useState({});

  const handleSelectChange = (fieldName, value) => {
    setSelectedCustomizations((prev) => ({
      ...prev,
      [fieldName]: value,
    }));
  };

  useEffect(() => {
    if (productDetails?.data) {
      // Extract images from productDetails
      const imgData = productDetails.data.images.map((image) => ({
        itemImageSrc: image,
        thumbnailImageSrc: image,
        alt: "Product Image", // Update with a better alt description if needed
      }));
      setImages(imgData); // Set the images state
      setLoading(false);
    }
  }, [productDetails]);

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
          fill={true}
          style={{ width: "100%", display: "block" , }}
          className=" h-full  object-cover rounded-2xl "
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
        height={56}
        width={56}
        // fill={true}
        className="h-14 w-14 object-cover border   border-Apptheme"
      />
    );
  };

  // const thumbnailTemplate = (item) => {
  //   return (
  //     <div className="h-14 w-14 border border-Apptheme">
  //       <Image
  //         src={item.thumbnailImageSrc} // This will now be the same as itemImageSrc
  //         alt={item.alt}
  //         width={56} // Set width in pixels (for 14 tailwind classes)
  //         height={56} // Set height in pixels (for 14 tailwind classes)
  //         className="object-cover"
  //       />
  //     </div>
  //   );
  // };

  const handleProceed = () => {
    // Log the selected dropdown values to the console
    console.log("Material:", material);
    console.log("Lamination:", lamination);
    console.log("Orientation:", orientation);
    console.log("Printing Location:", printingLocation);
    console.log("Quantity:", quantity);
  };




  // to render difffrent component for diffrent slug

  // const renderFormComponent = () => {
  //   switch (slug) {
  //     case 'electronics':
  //       return <ElectronicsForm productData={productData} />;
  //     case 'furniture':
  //       return <FurnitureForm productData={productData} />;
  //     case 'clothing':
  //       return <ClothingForm productData={productData} />;
  //     default:
  //       return <div>Select a category to see the form.</div>;
  //   }
  // };

console.log(selectedCustomizations)


  const renderCustomizationDropdowns = () => {
    return productDetails?.data?.customizations?.map((customization) => (
      <div key={customization._id} className="mb-4">
        <label htmlFor={customization.fieldName} className="block mb-2 font-semibold">
          {customization?.fieldName}
        </label>
        <Select onValueChange={(value) => handleSelectChange(customization.fieldName, value)}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder={`Select a ${customization.fieldName}`} />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {customization.options.map((option) => (
                <SelectItem key={option._id} value={option.rate}>
                  {`${option.label}`}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
    ));
  };


  


  return (
    <div className="bg-[#f1f2f4] flex justify-center items-center w-full">
      <div className="w-full p-4 shadow-sm ml-4 mr-4 my-4 flex gap-4 justify-center    lg:flex-row flex-col bg-white">
        {/* Left Side: Galleria */}
        <div className=" ">
          <div className="card sticky top-5 lg:flex lg:justify-center md:flex md:justify-center w-full ">
            {/* {images && (
            
              <Galleria
                value={images}
                responsiveOptions={responsiveOptions}
                numVisible={7}
                circular
                style={{ maxWidth: "800px" }}
                item={itemTemplate}
                thumbnail={thumbnailTemplate}
              />
            )} */}

{loading ? ( // Show Skeleton while loading
              <Skeleton className="h-[450px] lg:h-[450px] md:h-[350px] w-[600px]" />
            ) : (
              images && (
                <Galleria
                  value={images}
                  responsiveOptions={responsiveOptions}
                  numVisible={7}
                  circular
                  style={{ maxWidth: "800px" }}
                  item={itemTemplate}
                  thumbnail={thumbnailTemplate}
                />
              )
            )}
          </div>
        </div>

        {/* Right Side: Details and Dropdowns */}
        <div className=" px-5 w-full">
          <h1 className="text-2xl font-bold mb-1"> {productDetails?.data?.name || "Loading..."}</h1>
          <p className="mb-2">
            {/* Make a lasting impression with our Standard Business Cards, designed
            to communicate your professional identity effectively. */}
            {productDetails?.data?.description || "Loading..."}
          </p>

         

          {/* <ul className="list-disc list-inside mb-4">
            <li>Size: 3.5 x 2 inches</li>
            <li>2 different paper materials available</li>
            <li>Available Lamination Options: Matte or Glossy</li>
            <li>Order from as low as 100 units</li>
            <li>Same-day delivery for orders before 3 PM</li>
          </ul> */}
          {/* <p className="font-bold mb-4">
          {`We do not accept designs that belong to or represent government or government-affiliated organizations.`}
          </p> */}

          <Suspense fallback={<p>loading...</p>}>
              {renderCustomizationDropdowns()}
          </Suspense>

      
         

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
        {productDetails?.data?.availableQuantities?.map((quantity) => (
          <SelectItem key={quantity} value={quantity}>
            {quantity}
          </SelectItem>
        ))}
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
  );
};

export default Page;
