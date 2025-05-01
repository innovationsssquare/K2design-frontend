"use client"

import * as React from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import useEmblaCarousel from "embla-carousel-react"

import { cn } from "@/lib/utils"
import { NavigationMenu } from "./navigation-menu"


const categories = [
  {
    id: "paper-printing",
    title: "Paper Printing",
    imageUrl: "/placeholder.svg?height=80&width=80",
    items: [
      { title: "Business Cards", href: "#" },
      { title: "Flyers", href: "#" },
      { title: "Brochures", href: "#" },
      { title: "Letterheads", href: "#" },
    ],
  },
  {
    id: "flex",
    title: "Flex and Related Product",
    imageUrl: "/placeholder.svg?height=80&width=80",
    items: [
      { title: "Flex Banners", href: "#" },
      { title: "Roll Up Banners", href: "#" },
      { title: "Standees", href: "#" },
      { title: "Posters", href: "#" },
    ],
  },
  {
    id: "media",
    title: "Media Printing",
    imageUrl: "/placeholder.svg?height=80&width=80",
    items: [
      { title: "Vinyl Prints", href: "#" },
      { title: "Canvas Prints", href: "#" },
      { title: "Fabric Prints", href: "#" },
      { title: "Wallpaper", href: "#" },
    ],
  },
  {
    id: "glass",
    title: "Glass Films",
    imageUrl: "/placeholder.svg?height=80&width=80",
    items: [
      { title: "Frosted Films", href: "#" },
      { title: "One Way Vision", href: "#" },
      { title: "Transparent Films", href: "#" },
      { title: "Decorative Films", href: "#" },
    ],
  },
  {
    id: "rigid",
    title: "Rigid Sign Plates",
    imageUrl: "/placeholder.svg?height=80&width=80",
    items: [
      { title: "Acrylic Signs", href: "#" },
      { title: "Aluminum Signs", href: "#" },
      { title: "PVC Signs", href: "#" },
      { title: "Wooden Signs", href: "#" },
    ],
  },
  {
    id: "vinyl",
    title: "Vinyl Letters",
    imageUrl: "/placeholder.svg?height=80&width=80",
    items: [
      { title: "Cut Vinyl Letters", href: "#" },
      { title: "Vinyl Decals", href: "#" },
      { title: "Window Graphics", href: "#" },
      { title: "Vehicle Lettering", href: "#" },
    ],
  },
  {
    id: "acp",
    title: "ACP & Acrylic",
    imageUrl: "/placeholder.svg?height=80&width=80",
    items: [
      { title: "ACP Boards", href: "#" },
      { title: "Acrylic Sheets", href: "#" },
      { title: "Acrylic Displays", href: "#" },
      { title: "Acrylic Signage", href: "#" },
    ],
  },
  {
    id: "light",
    title: "Light Boxes",
    imageUrl: "/placeholder.svg?height=80&width=80",
    items: [
      { title: "LED Light Boxes", href: "#" },
      { title: "Backlit Displays", href: "#" },
      { title: "Edge-lit Signs", href: "#" },
      { title: "Illuminated Frames", href: "#" },
    ],
  },
  {
    id: "vehicle",
    title: "Vehicle Graphics",
    imageUrl: "/placeholder.svg?height=80&width=80",
    items: [
      { title: "Vehicle Wraps", href: "#" },
      { title: "Car Magnets", href: "#" },
      { title: "Fleet Graphics", href: "#" },
      { title: "Window Perfs", href: "#" },
    ],
  },
]

export function NavigationCarousel() {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "start",
    loop: false,
    dragFree: true,
  })

  const scrollPrev = React.useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev()
  }, [emblaApi])

  const scrollNext = React.useCallback(() => {
    if (emblaApi) emblaApi.scrollNext()
  }, [emblaApi])

  const [canScrollPrev, setCanScrollPrev] = React.useState(false)
  const [canScrollNext, setCanScrollNext] = React.useState(true)

  const onSelect = React.useCallback(() => {
    if (!emblaApi) return
    setCanScrollPrev(emblaApi.canScrollPrev())
    setCanScrollNext(emblaApi.canScrollNext())
  }, [emblaApi])

  React.useEffect(() => {
    if (!emblaApi) return
    onSelect()
    emblaApi.on("select", onSelect)
    emblaApi.on("reInit", onSelect)
  }, [emblaApi, onSelect])

  return (
    <div className="relative w-full bg-white shadow-md">
      <div className="" ref={emblaRef}>
        <div className="flex py-4 px-4">
          {categories.map((category) => (
            <div key={category.id} className="flex-none mx-4 w-[120px]">
              <NavigationMenu category={category} />
            </div>
          ))}
        </div>
      </div>

      <button
        onClick={scrollPrev}
        disabled={!canScrollPrev}
        className={cn(
          "absolute left-1 top-1/2 z-10 -translate-y-1/2 p-2 bg-white rounded-full shadow-md",
          !canScrollPrev && "opacity-50 cursor-not-allowed",
        )}
      >
        <ChevronLeft className="w-6 h-6 text-gray-500" />
      </button>

      <button
        onClick={scrollNext}
        disabled={!canScrollNext}
        className={cn(
          "absolute right-1 top-1/2 z-10 -translate-y-1/2 p-2 bg-white rounded-full shadow-md",
          !canScrollNext && "opacity-50 cursor-not-allowed",
        )}
      >
        <ChevronRight className="w-6 h-6 text-gray-500" />
      </button>
    </div>
  )
}
