'use client';

import { useEffect, useState } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Sparkles, CheckCircle2, Package, Tag, ShieldCheck } from "lucide-react";

export default function CarouselDApiDemo() {
  const [api, setApi] = useState(null);
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);

  const slides = [
    {
      id: 1,
      badge: "⭐ BEST SELLER • STARTING ₹200",
      title: "Premium Business Cards with Instant Live Quoting",
      subtitle: "Choose from 350 GSM Matte, Velvet Touch, Gloss or Metallic with real-time 18% GST calculation and 300 DPI pre-press check.",
      primaryCta: { label: "Configure Cards", href: "/paper-printing/VisitingCards" },
      secondaryCta: { label: "Browse All Finishes", href: "/paper-printing" },
      features: ["350 GSM Art Card", "Thermal Matte / Spot UV", "Same Day Dispatch"],
      product: {
        title: "Standard & Luxury Visiting Cards",
        image: "/images/StandardVisitingCard.jpeg",
        tag: "From ₹200 / 1000 pcs",
        specs: "Spot UV Raised & Thermal Matte"
      }
    },
    {
      id: 2,
      badge: "⚡ 24-48 HR EXPRESS DISPATCH",
      title: "Marketing Brochures, Booklets & Pamphlets",
      subtitle: "High-definition commercial offset printing with anti-crack scoring, folding, and heavy protective lamination.",
      primaryCta: { label: "Order Brochures", href: "/paper-printing/Brochure" },
      secondaryCta: { label: "View All Products", href: "/paper-printing" },
      features: ["Bi-Fold & Tri-Fold", "170 & 250 GSM Gloss", "Center Stitched Catalogs"],
      product: {
        title: "Commercial Folded Brochures",
        image: "/images/brochures.jpeg",
        tag: "From ₹1,200 / 1000 pcs",
        specs: "High-Bulk Gloss Art Paper"
      }
    },
    {
      id: 3,
      badge: "🏬 6 PHYSICAL BRANCH STORES",
      title: "Architectural Signage, LED Boards & Acrylic Letters",
      subtitle: "Custom illuminated 3D letters, weatherproof ACP stencils, titanium mirror finishes, and retail storefront branding.",
      primaryCta: { label: "Explore Signage", href: "/categories/3d-letters" },
      secondaryCta: { label: "Find Nearest Store", href: "/#branch-locator" },
      features: ["Cast Acrylic & SS 304", "Samsung IP67 LEDs", "Free 1:1 Stencil Paper"],
      product: {
        title: "Precision 3D Acrylic & Metal Letters",
        image: "/images/acrylic-3d-letters.jpg",
        tag: "From ₹85 / inch height",
        specs: "Titanium Gold & Halo Backlit"
      }
    },
    {
      id: 4,
      badge: "📦 CUSTOM PACKAGING & LABELS",
      title: "Branded Paper Bags, Stickers & Custom Stamps",
      subtitle: "Custom roll/sheet stickers, self-inking stamps, and retail paper bags for luxury brand unboxing and packaging.",
      primaryCta: { label: "Customize Packaging", href: "/categories/paper-printing/subcategories/paper-bags" },
      secondaryCta: { label: "Stickers & Stamps", href: "/paper-printing/Tags" },
      features: ["100% Recycled Kraft Paper", "Waterproof Die-Cut Vinyl", "Pre-Inked Flash Stamps"],
      product: {
        title: "Branded Paper Bags & Packaging",
        image: "/images/PaperBag.jpeg",
        secondaryImage: "/images/Stickers.jpeg",
        tag: "Bags from ₹4.50 • Labels from ₹0.80",
        specs: "Kraft Bags & Kiss-Cut Stickers"
      }
    },
  ];

  useEffect(() => {
    if (!api) return;

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });

    const autoplay = setInterval(() => {
      api.scrollNext();
    }, 6000);

    return () => clearInterval(autoplay);
  }, [api]);

  return (
    <div className="relative mx-3 sm:mx-4 my-2 lg:my-3">
      <Carousel setApi={setApi} className="w-full">
        <CarouselContent>
          {slides.map((slide) => (
            <CarouselItem key={slide.id}>
              <div className="relative w-full min-h-[380px] sm:min-h-[420px] md:h-[460px] lg:h-[490px] rounded-2xl overflow-hidden shadow-xl bg-gradient-to-br from-[#0c0f17] via-[#161224] to-[#210f2c] border border-gray-800/80">
                
                {/* Background Ambient Glow Accents */}
                <div className="absolute -top-24 -left-24 w-96 h-96 bg-purple-600/15 rounded-full blur-3xl pointer-events-none" />
                <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-indigo-600/15 rounded-full blur-3xl pointer-events-none" />

                <div className="relative h-full max-w-[1920px] mx-auto px-6 sm:px-10 lg:px-16 py-8 sm:py-10 flex items-center">
                  <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12 items-center w-full">
                    
                    {/* Left Column: Text Content & CTAs */}
                    <div className="md:col-span-7 lg:col-span-7 flex flex-col justify-center z-10">
                      
                      {/* Badge */}
                      <div className="mb-3">
                        <span className="inline-flex items-center gap-1.5 text-[11px] sm:text-xs font-bold tracking-wider uppercase text-amber-300 bg-amber-500/15 border border-amber-400/30 px-3 py-1 rounded-full backdrop-blur-md">
                          <Sparkles size={12} className="text-amber-400" />
                          <span>{slide.badge}</span>
                        </span>
                      </div>

                      {/* Title */}
                      <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-white leading-tight mb-3 tracking-tight">
                        {slide.title}
                      </h1>

                      {/* Subtitle */}
                      <p className="text-xs sm:text-sm md:text-base text-gray-300 mb-5 max-w-xl leading-relaxed">
                        {slide.subtitle}
                      </p>

                      {/* Bullet Highlights */}
                      <div className="hidden sm:flex flex-wrap items-center gap-x-4 gap-y-1.5 mb-6 text-xs text-gray-300">
                        {slide.features.map((feat, i) => (
                          <span key={i} className="flex items-center gap-1.5 font-medium">
                            <CheckCircle2 size={14} className="text-emerald-400 shrink-0" />
                            <span>{feat}</span>
                          </span>
                        ))}
                      </div>

                      {/* Action Buttons */}
                      <div className="flex flex-wrap items-center gap-3">
                        <Link
                          href={slide.primaryCta.href}
                          className="px-5 py-2.5 bg-[#9c1dac] hover:bg-[#831492] text-white text-xs sm:text-sm font-bold rounded-xl shadow-lg hover:shadow-purple-900/40 transition transform hover:-translate-y-0.5 flex items-center gap-2"
                        >
                          <span>{slide.primaryCta.label}</span>
                          <ArrowRight size={15} />
                        </Link>
                        <Link
                          href={slide.secondaryCta.href}
                          className="px-4 py-2.5 bg-white/10 hover:bg-white/20 text-white border border-white/20 text-xs sm:text-sm font-semibold rounded-xl backdrop-blur-md transition"
                        >
                          {slide.secondaryCta.label}
                        </Link>
                      </div>
                    </div>

                    {/* Right Column: High-Impact Product Visual Showcase */}
                    <div className="md:col-span-5 lg:col-span-5 relative flex items-center justify-center">
                      
                      {/* Slide 4 Special Packaging & Labels Showcase (Paper Bag + Floating Sticker Card) */}
                      {slide.id === 4 ? (
                        <div className="relative w-full max-w-sm sm:max-w-md aspect-[4/3] flex items-center justify-center">
                          
                          {/* Main Showcase Card: Branded Paper Bag */}
                          <div className="relative w-4/5 h-[85%] rounded-2xl overflow-hidden border border-white/20 shadow-2xl bg-white/5 backdrop-blur-md transform -rotate-1 hover:rotate-0 transition-transform duration-300">
                            <Image
                              src={slide.product.image}
                              alt={slide.product.title}
                              fill
                              className="object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex flex-col justify-end p-4">
                              <span className="text-[10px] uppercase font-bold tracking-wider text-purple-300">
                                Retail Paper Bags
                              </span>
                              <h3 className="text-white text-sm font-bold truncate">
                                Kraft & Art Paper Bags
                              </h3>
                            </div>
                          </div>

                          {/* Secondary Floating Overlapping Card: Die-Cut Stickers */}
                          {slide.product.secondaryImage && (
                            <div className="absolute -bottom-2 -right-2 sm:-right-4 w-1/2 aspect-square rounded-2xl overflow-hidden border-2 border-purple-400/60 shadow-2xl bg-white/10 backdrop-blur-md transform rotate-3 hover:rotate-0 transition-transform duration-300">
                              <Image
                                src={slide.product.secondaryImage}
                                alt="Die-Cut Stickers"
                                fill
                                className="object-cover"
                              />
                              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex flex-col justify-end p-2.5">
                                <span className="text-[9px] uppercase font-bold tracking-wider text-amber-300">
                                  Die-Cut Labels
                                </span>
                                <p className="text-white text-xs font-bold truncate">
                                  Gloss Vinyl Stickers
                                </p>
                              </div>
                            </div>
                          )}

                          {/* Floating Price Pill */}
                          <div className="absolute top-2 -left-2 sm:-left-4 bg-black/80 backdrop-blur-md border border-white/20 text-white text-[11px] font-bold px-3 py-1.5 rounded-full shadow-lg flex items-center gap-1.5">
                            <Tag size={13} className="text-amber-400" />
                            <span>{slide.product.tag}</span>
                          </div>
                        </div>
                      ) : (
                        /* Standard Product Showcase for Slides 1, 2, 3 */
                        <div className="relative w-full max-w-sm sm:max-w-md aspect-[16/11] rounded-2xl overflow-hidden border border-white/20 shadow-2xl bg-white/5 backdrop-blur-md group">
                          <Image
                            src={slide.product.image}
                            alt={slide.product.title}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                          
                          {/* Bottom info banner */}
                          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent flex flex-col justify-end p-5">
                            <span className="text-[10px] uppercase font-extrabold tracking-wider text-[#d456e8] mb-0.5">
                              {slide.product.specs}
                            </span>
                            <h3 className="text-white text-base sm:text-lg font-bold">
                              {slide.product.title}
                            </h3>
                            <div className="mt-2 inline-flex items-center gap-1 text-[11px] font-bold text-amber-300 bg-amber-500/20 px-2.5 py-0.5 rounded-md border border-amber-400/30 self-start">
                              ⚡ {slide.product.tag}
                            </div>
                          </div>

                          {/* Floating Top Badge */}
                          <div className="absolute top-3 right-3 bg-black/75 backdrop-blur-md border border-white/20 text-white text-[10px] font-bold px-2.5 py-1 rounded-full">
                            300 DPI Pre-Press
                          </div>
                        </div>
                      )}

                    </div>

                  </div>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>

        <CarouselPrevious className="absolute left-3 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-gray-900 shadow-md p-2 rounded-full h-10 w-10 cursor-pointer border border-gray-200 transition" />
        <CarouselNext className="absolute right-3 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-gray-900 shadow-md p-2 rounded-full h-10 w-10 cursor-pointer border border-gray-200 transition" />
      </Carousel>

      {/* Slide dots indicator */}
      <div className="flex justify-center items-center gap-2 mt-3">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => api && api.scrollTo(i)}
            className={`h-2 rounded-full transition-all cursor-pointer ${
              current === i + 1 ? "w-8 bg-[#9c1dac]" : "w-2 bg-gray-300 hover:bg-gray-400"
            }`}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
}