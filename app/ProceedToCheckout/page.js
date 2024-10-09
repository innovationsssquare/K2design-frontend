"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Button } from "@nextui-org/react";
import { Dropdown } from "primereact/dropdown";
import {
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ChevronUp,
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import PaperBag from "../../public/images/Visiting_Card3.png";
import Image from "next/image";

export default function CheckoutPage() {
  const [activeStep, setActiveStep] = useState("order-summary");
  const [quantity, setQuantity] = useState({});
  const [showOptions, setShowOptions] = useState({});
  const [isAddingCustomer, setIsAddingCustomer] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [customerInfo, setCustomerInfo] = useState({
    firstName: "",
    lastName: "",
    email: "",
    address: "",
    city: "",
    zip: "",
  });

  const steps = [
    { id: "order-summary", title: "Order Summary" },
    { id: "customer-info", title: "Customer Info" },
    { id: "payment", title: "Payment" },
  ];

  const handleNextStep = () => {
    const currentIndex = steps.findIndex((step) => step.id === activeStep);
    if (currentIndex < steps.length - 1) {
      setActiveStep(steps[currentIndex + 1].id);
    }
  };

  const handlePreviousStep = () => {
    const currentIndex = steps.findIndex((step) => step.id === activeStep);
    if (currentIndex > 0) {
      setActiveStep(steps[currentIndex - 1].id);
    }
  };

  const products = [
    {
      id: 1,
      name: "Standard Visiting Cards",
      price: 2.39,
      image: PaperBag,
      selectedOptions: [
        { name: "Finish", value: "None", price: "Included" },
        { name: "Stock", value: "Premium Plus Glossy", price: "₹203.39" },
      ],
      quantityOptions: [500, 1000, 1500],
    },
    {
      id: 2,
      name: "Premium Business Cards",
      price: 3.5,
      image: PaperBag,
      selectedOptions: [
        { name: "Corners", value: "Rounded", price: "₹100.00" },
        { name: "Backside", value: "Color", price: "₹150.00" },
      ],
      quantityOptions: [250, 500, 1000],
    },
  ];

  const total = Object.keys(quantity).reduce(
    (acc, productId) =>
      acc +
      (quantity[productId] || 0) *
        products.find((p) => p.id === parseInt(productId))?.price,
    0
  );

  const [selectedCity, setSelectedCity] = useState(null);
  const cities = [
    { name: "Sandeep Kadam", code: "NY" },
    { name: "Santosh Alimkar", code: "RM" },
    { name: "Rahul T", code: "LDN" },
    { name: "Sandesh Rokade", code: "IST" },
    { name: "Rohit Tajane", code: "PRS" },
  ];

  return (
    <div className="w-full min-h-screen  bg-[#f1f2f4] ">
      <div className=" shadow-sm ml-4 mr-4 my-4  bg-white">
        <div className="mb-8 flex justify-center pt-4">
          <ol className="flex items-center">
            {steps.map((step, index) => (
              <li key={step.id} className="flex items-center">
                <div className="flex flex-col items-center">
                  <div
                    className={`flex items-center justify-center w-8 h-8 rounded-full ${
                      activeStep === step.id
                        ? "bg-[#9c1dac] text-white"
                        : steps.findIndex((s) => s.id === activeStep) > index
                        ? "bg-[#9c1dac] text-white"
                        : "bg-gray-300 text-gray-600"
                    }`}
                  >
                    {index + 1}
                  </div>
                  <span
                    className={`mt-2 text-sm ${
                      activeStep === step.id
                        ? "font-medium text-[#9c1dac]"
                        : steps.findIndex((s) => s.id === activeStep) > index
                        ? "font-medium text-[#9c1dac]"
                        : "text-gray-500"
                    }`}
                  >
                    {step.title}
                  </span>
                </div>
                {index < steps.length - 1 && (
                  <div className="w-12 sm:w-20 border-t border-gray-300 mx-2"></div>
                )}
              </li>
            ))}
          </ol>
        </div>

        {/* Content */}
        <Card className="w-full">
          {activeStep === "order-summary" && (
            <>
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {products.map((product) => (
                    <div key={product.id} className="flex items-start mb-6">
                      <div className="relative w-24 h-24 mr-4">
                        <Image
                          src={product.image}
                          alt="Product"
                          className="w-full h-full object-cover rounded-lg"
                        />
                      </div>
                      <div className="flex-grow">
                        <h2 className="text-sm font-semibold text-gray-800 mb-2">
                          {product.name}
                        </h2>
                        <div className="flex items-center justify-between mb-2">
                          <Select
                            value={(
                              quantity[product.id] || product.quantityOptions[0]
                            ).toString()}
                            onValueChange={(value) =>
                              setQuantity((prev) => ({
                                ...prev,
                                [product.id]: parseInt(value),
                              }))
                            }
                          >
                            <SelectTrigger className="w-[180px] ">
                              <SelectValue placeholder="Quantity" />
                            </SelectTrigger>
                            <SelectContent>
                              {product.quantityOptions.map((qty) => (
                                <SelectItem key={qty} value={qty.toString()}>
                                  {qty}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <Button
                            variant="link"
                            className="text-Apptheme hover:underline"
                          >
                            Remove
                          </Button>
                        </div>

                        {/* Optional selected options */}
                        <div className="mb-4">
                          <Button
                            variant="outline"
                            className="w-full justify-between text-[#9c1dac] border-[#9c1dac] hover:bg-[#f3e6f6]"
                            onClick={() =>
                              setShowOptions((prev) => ({
                                ...prev,
                                [product.id]: !prev[product.id],
                              }))
                            }
                          >
                            Product Details
                            {showOptions[product.id] ? (
                              <ChevronUp className="ml-2 h-4 w-4 text-[#9c1dac]" />
                            ) : (
                              <ChevronDown className="ml-2 h-4 w-4 text-[#9c1dac]" />
                            )}
                          </Button>
                          {showOptions[product.id] && (
                            <div className="mt-2 border-t border-gray-200 pt-2 space-y-1">
                              {product.selectedOptions.map((option, index) => (
                                <div
                                  key={index}
                                  className="flex justify-between text-sm"
                                >
                                  <span>
                                    {option.name}: {option.value}
                                  </span>
                                  <span>{option.price}</span>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>

                        <div className="text-right font-semibold text-gray-800">
                          Item Total: ₹
                          {(quantity[product.id] || 0) * product.price}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="text-right font-bold text-lg mt-4">
                  Order Total: ₹{total.toFixed(2)}
                </div>
              </CardContent>

              <CardFooter className="flex justify-end">
                <Button onClick={handleNextStep} color="secondary" radius="sm">
                  Next
                </Button>
              </CardFooter>
            </>
          )}

          {activeStep === "customer-info" && (
            <>
              <CardHeader>
                <CardTitle>Customer Information</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {/* Search Existing Customer */}
                  {/* <div className="flex items-center mb-4">
                    <Input
                      placeholder="Search Existing Customer"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="flex-grow mr-2"
                    />
                    <Button
                      onClick={() => {
                        // Implement search logic
                        console.log("Searching for:", searchTerm);
                      }}
                    >
                      Search
                    </Button>
                  </div> */}

                  <div className="flex justify-center">
                    <div>
                      <Dropdown
                        value={selectedCity}
                        onChange={(e) => setSelectedCity(e.value)}
                        options={cities}
                        optionLabel="name"
                        editable
                        placeholder="Select Existing Customer"
                        className="w-full md:w-14rem"
                      />
                    </div>

                    <div className="flex items-center">
                      <Button
                        onClick={() => setIsAddingCustomer(!isAddingCustomer)}
                        color="default"
                        variant="bordered"
                        className="mr-2"
                      >
                        {isAddingCustomer ? "Cancel" : "Add Customer"}
                      </Button>
                    </div>
                  </div>

                  {isAddingCustomer && (
                    <div className="border border-gray-300 p-4 rounded-md">
                      <h3 className="font-semibold mb-2">Add New Customer</h3>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label>First Name</Label>
                          <Input
                            value={customerInfo.firstName}
                            onChange={(e) =>
                              setCustomerInfo({
                                ...customerInfo,
                                firstName: e.target.value,
                              })
                            }
                          />
                        </div>
                        <div>
                          <Label>Last Name</Label>
                          <Input
                            value={customerInfo.lastName}
                            onChange={(e) =>
                              setCustomerInfo({
                                ...customerInfo,
                                lastName: e.target.value,
                              })
                            }
                          />
                        </div>
                        <div>
                          <Label>Email</Label>
                          <Input
                            value={customerInfo.email}
                            onChange={(e) =>
                              setCustomerInfo({
                                ...customerInfo,
                                email: e.target.value,
                              })
                            }
                          />
                        </div>
                        <div>
                          <Label>Address</Label>
                          <Input
                            value={customerInfo.address}
                            onChange={(e) =>
                              setCustomerInfo({
                                ...customerInfo,
                                address: e.target.value,
                              })
                            }
                          />
                        </div>
                        <div>
                          <Label>Mobile Number</Label>
                          <Input
                            value={customerInfo.city}
                            onChange={(e) =>
                              setCustomerInfo({
                                ...customerInfo,
                                city: e.target.value,
                              })
                            }
                          />
                        </div>
                
                      </div>
                      <Button
                        onClick={() => {
                          // Add customer logic
                          console.log("Adding customer:", customerInfo);
                        }}
                        className="mt-4"
                      >
                        Add Customer
                      </Button>
                    </div>
                  )}
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button
                  color="default"
                  onClick={handlePreviousStep}
                  radius="sm"
                >
                  Previous
                </Button>
                <Button onClick={handleNextStep} color="secondary" radius="sm">
                  Next
                </Button>
              </CardFooter>
            </>
          )}

          {activeStep === "payment" && (
            <>
              <CardHeader>
                <CardTitle>Payment Confirmation</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                    {/* Paid Amount */}
                    <div className="space-y-2">
                      <Label htmlFor="paid-amount">Advance Amount</Label>
                      <Input id="paid-amount" placeholder="Enter paid amount" />
                    </div>

                    {/* Remaining Payment */}
                    <div className="space-y-2">
                      <Label htmlFor="remaining-payment">
                        Remaining Payment
                      </Label>
                      <Input
                        id="remaining-payment"
                        placeholder="Enter remaining payment"
                      />
                    </div>

                    {/* Payment Status */}
                    <div className="space-y-2">
                      <Label htmlFor="payment-status">Payment Status</Label>
                      <Select
                        id="payment-status"
                        className="w-full border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select payment status" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="unpaid">Unpaid</SelectItem>
                          <SelectItem value="paid">Paid</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
              </CardContent>

              <CardFooter className="flex justify-between">
                <Button onClick={handlePreviousStep} radius="sm">
                  Previous
                </Button>
                <Button
                  onClick={() => alert("Order placed successfully!")}
                  color="success"
                  radius="sm"
                >
                  Place Order
                </Button>
              </CardFooter>
            </>
          )}
        </Card>
      </div>
    </div>
  );
}
