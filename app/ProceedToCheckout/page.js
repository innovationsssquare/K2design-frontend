'use client'
import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
// import { Input } from "@/components/ui/input"
// import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
// import { Checkbox } from "@/components/ui/checkbox"
import { ChevronDown, ChevronLeft, ChevronRight, ChevronUp } from 'lucide-react'

export default function CheckoutPage() {
  const [quantity, setQuantity] = useState(500)
  const [generateInvoice, setGenerateInvoice] = useState(false)
  const [showOptions, setShowOptions] = useState(true)

  const itemPrice = 2.39
  const total = quantity * itemPrice

  const selectedOptions = [
    { name: "Finish", value: "None", price: "Included" },
    { name: "Corners", value: "Standard (89 x 51 mm)", price: "Included" },
    { name: "Shape", value: "Standard (89 x 51 mm)", price: "Included" },
    { name: "Product Orientation", value: "Horizontal", price: "Included" },
    { name: "Stock", value: "Premium Plus Glossy", price: "₹203.39" },
    { name: "Corners", value: "Standard", price: "₹593.22" },
    { name: "Backside", value: "Color", price: "₹398.31" },
  ]

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Order Summary <span className="inline-block bg-Apptheme text-white rounded-full w-6 h-6 text-center items-center -mt-5 text-sm">1</span></h1>
      <div className="flex flex-col md:flex-row gap-8">
        <div className="flex-grow">
          <div className="flex items-start mb-6">
            <div className="relative w-24 h-24 mr-4">
              <img src="/placeholder.svg?height=96&width=96" alt="Product" className="w-full h-full object-cover" />
              <div className="absolute inset-0 flex justify-between items-center">
                <Button variant="ghost" size="icon" className="bg-white/80"><ChevronLeft className="h-4 w-4" /></Button>
                <Button variant="ghost" size="icon" className="bg-white/80"><ChevronRight className="h-4 w-4" /></Button>
              </div>
            </div>
            <div className="flex-grow">
              <h2 className="text-lg font-semibold mb-2">Standard Visiting Cards</h2>
              <div className="flex items-center justify-between mb-2">
                <Select value={quantity.toString()} onValueChange={(value) => setQuantity(parseInt(value))}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Quantity" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="500">500</SelectItem>
                    <SelectItem value="1000">1000</SelectItem>
                    <SelectItem value="1500">1500</SelectItem>
                  </SelectContent>
                </Select>
                <Button variant="link" className="text-[#9c1dac]">Remove</Button>
              </div>
              {/* <div className="flex items-center space-x-2 mb-2">
                <Checkbox 
                  id="invoice" 
                  checked={generateInvoice} 
                  onCheckedChange={() => setGenerateInvoice(!generateInvoice)}
                />
                <Label htmlFor="invoice" className="text-sm">Generate Invoice</Label>
              </div> */}
              <div className="mb-4">
                {/* <Button 
                  variant="outline" 
                  className="text-[#9c1dac] border-[#9c1dac] w-full justify-between"
                  onClick={() => setShowOptions(!showOptions)}
                >
                  Selected options
                  {showOptions ? <ChevronUp className="ml-2 h-4 w-4" /> : <ChevronDown className="ml-2 h-4 w-4" />}
                </Button> */}
                {showOptions && (
                  <div className="mt-2 border-t border-[#eaeaec] pt-2">
                    {selectedOptions.map((option, index) => (
                      <div key={index} className="flex justify-between text-sm py-1">
                        <span>{option.name}: {option.value}</span>
                        <span>{option.price}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
              <div className="text-right font-semibold">
                Item Total: ₹{total.toFixed(2)}
              </div>
            </div>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-4">More with your design</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="bg-gray-100 h-32 rounded-lg"></div>
              ))}
            </div>
          </div>
        </div>
        <Card className="w-full md:w-80">
          <CardContent className="pt-6">
            <h3 className="text-xl font-semibold mb-4">Order Summary</h3>
            <div className="flex justify-between mb-4">
              <span>Subtotal</span>
              <span className="font-semibold">₹{total.toFixed(2)}</span>
            </div>
            {/* <div className="mb-4">
              <Label htmlFor="code" className="mb-1 block">Have a code?</Label>
              <Input id="code" placeholder="Enter code" />
            </div> */}
          </CardContent>
          <CardFooter>
            <Button className="w-full bg-[#9c1dac] hover:bg-[#8c19a0] text-white">
              Checkout
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}