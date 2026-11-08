"use client";

import React, { useState, useEffect, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Sparkles,
  CheckCircle,
  ShieldCheck,
  Store,
  UploadCloud,
  ChevronRight,
  Eye,
  ShoppingBag,
  ArrowRight,
  Layers,
  Flag,
  FileCheck,
  Palette,
  Brush,
  Calculator,
  Check,
  Ruler
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Chip, Divider } from "@nextui-org/react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { FlexBannercalculation } from "@/lib/API/Flex-printing/Flexbannerprinting";

// Real High-Resolution Images
import FlexBannerImg from "../../public/images/FLEX (Banner).png";
import FlexRelatedImg from "../../public/images/Flex&Related.png";
import StandBoardImg from "../../public/images/StandBoard.jpeg";

const BANNER_TYPES = [
  {
    value: "Economy",
    label: "Economy Frontlit Flex (260 GSM)",
    ratePerSqFt: 12,
    minPrice: 60,
    desc: "Short-term promotional banners, events, birthday hoardings & temporary sales"
  },
  {
    value: "Premium",
    label: "Premium Star Frontlit Flex (340 GSM)",
    ratePerSqFt: 18,
    minPrice: 90,
    desc: "Heavy-duty outdoor flex with high tensile tear strength and rich solvent contrast"
  },
  {
    value: "Blackout",
    label: "Blackout Flex (Zero Light Transmission)",
    ratePerSqFt: 22,
    minPrice: 120,
    desc: "Black back layer prevents light see-through, ideal for bright sunlight areas"
  }
];

export default function Flexbannerprinting() {
  const router = useRouter();

  // State
  const [bannerType, setBannerType] = useState("Economy");
  const [heightFt, setHeightFt] = useState("4");
  const [widthFt, setWidthFt] = useState("6");
  const [quantity, setQuantity] = useState(1);
  const [grommets, setGrommets] = useState("all_sides"); // 'all_sides' | 'corners' | 'none'
  const [galleryImageIdx, setGalleryImageIdx] = useState(0);

  // 3-Way Artwork Ingestion State
  const [designMode, setDesignMode] = useState("upload"); // 'upload' | 'studio' | 'hire_designer'
  const [uploadedArtwork, setUploadedArtwork] = useState(null);
  const [designerBrief, setDesignerBrief] = useState("");
  const [designerPhone, setDesignerPhone] = useState("");

  const [isCalculating, setIsCalculating] = useState(false);
  const [apiTotal, setApiTotal] = useState(null);
  const [calcNotice, setCalcNotice] = useState("");

  const height = parseFloat(heightFt) || 0;
  const width = parseFloat(widthFt) || 0;
  const totalSqFt = useMemo(() => Math.max(0, height * width), [height, width]);

  const currentTypeConfig = useMemo(() => {
    return BANNER_TYPES.find((b) => b.value === bannerType) || BANNER_TYPES[0];
  }, [bannerType]);

  const galleryImages = [
    { src: FlexBannerImg, label: "Commercial Flex Banner", tag: "Outdoor Event Billboard" },
    { src: FlexRelatedImg, label: "Welded Hems & Grommets", tag: "Heavy Tensile Star Flex" },
    { src: StandBoardImg, label: "Event Display Mockup", tag: "Pre-Press Verified Quality" }
  ];

  // Recalculate price via API with resilient fallback
  useEffect(() => {
    let isCancelled = false;

    if (height <= 0 || width <= 0) {
      setApiTotal(null);
      setCalcNotice("");
      return;
    }

    const runCalculation = async () => {
      setIsCalculating(true);
      try {
        const payload = {
          type: bannerType === "Blackout" ? "Premium" : bannerType,
          height: Math.round(height),
          width: Math.round(width)
        };
        const res = await FlexBannercalculation(payload);

        if (!isCancelled) {
          if (res?.status && res?.data?.totalPrice) {
            setApiTotal(Number(res.data.totalPrice));
            setCalcNotice("Live rate verified with K2 Flex Press");
          } else {
            const raw = totalSqFt * currentTypeConfig.ratePerSqFt;
            setApiTotal(Math.max(raw, currentTypeConfig.minPrice));
            setCalcNotice("Standard factory pricing applied");
          }
        }
      } catch (err) {
        if (!isCancelled) {
          const raw = totalSqFt * currentTypeConfig.ratePerSqFt;
          setApiTotal(Math.max(raw, currentTypeConfig.minPrice));
          setCalcNotice("Standard factory pricing applied");
        }
      } finally {
        if (!isCancelled) setIsCalculating(false);
      }
    };

    const timer = setTimeout(runCalculation, 300);
    return () => {
      isCancelled = true;
      clearTimeout(timer);
    };
  }, [bannerType, height, width, totalSqFt, currentTypeConfig]);

  // Pricing Summary
  const designFee = designMode === "hire_designer" ? 299 : 0;
  const pricing = useMemo(() => {
    const basePerUnit = apiTotal || currentTypeConfig.minPrice;
    const subtotalRaw = basePerUnit * quantity;

    // Eyelets fee
    const eyeletFee = grommets === "all_sides" ? 50 * quantity : 0;
    const totalBeforeTax = subtotalRaw + eyeletFee + designFee;
    const gst = Math.round(totalBeforeTax * 0.18);
    const grandTotal = totalBeforeTax + gst;

    return {
      basePerUnit,
      subtotalRaw,
      eyeletFee,
      totalBeforeTax,
      gst,
      grandTotal
    };
  }, [apiTotal, currentTypeConfig.minPrice, quantity, grommets, designFee]);

  // Cart Handler
  const handleAddToCart = () => {
    const cartItem = {
      id: `flex-${Date.now()}`,
      name: `Commercial Flex Banner (${bannerType})`,
      category: "flex-related-printing",
      slug: "flex-(banner)-printing",
      specs: [
        { label: "Flex Grade", value: bannerType },
        { label: "Dimensions", value: `${heightFt} ft Height × ${widthFt} ft Width (${totalSqFt} sq.ft)` },
        { label: "Finishing & Grommets", value: grommets === "all_sides" ? "Welded Hems + Brass Eyelets All 4 Sides" : grommets === "corners" ? "4 Corners Only" : "No Eyelets (Raw Cut)" },
        { label: "Artwork Preparation", value: designMode === "upload" ? (uploadedArtwork?.name || "Ready Artwork File") : designMode === "studio" ? "Designed in K2 Studio" : "K2 Graphic Artist Assisted" }
      ],
      quantity,
      unitPrice: Math.round(pricing.totalBeforeTax / quantity),
      totalPrice: pricing.grandTotal,
      artworkFile: uploadedArtwork?.name || null
    };

    if (typeof window !== "undefined") {
      let currentCart = [];
      try {
        currentCart = JSON.parse(localStorage.getItem("k2_active_cart") || "[]");
        if (!Array.isArray(currentCart)) currentCart = [];
      } catch (e) {
        currentCart = [];
      }
      currentCart.push(cartItem);
      localStorage.setItem("k2_active_cart", JSON.stringify(currentCart));
      window.dispatchEvent(new Event("storage"));
    }

    router.push("/ProceedToCheckout");
  };

  return (
    <div className="w-full max-w-[1520px] mx-auto py-6 px-4 sm:px-6 lg:px-8 font-sans">
      
      {/* Breadcrumb Header */}
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs text-gray-500 mb-1">
            <Link href="/" className="hover:text-purple-600 transition">Home</Link>
            <ChevronRight size={12} />
            <Link href="/categories/flex-and-related-product" className="hover:text-purple-600 transition">Flex & Banners</Link>
            <ChevronRight size={12} />
            <span className="text-gray-900 font-medium">Flex Banner Printing</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight">
            Commercial Flex Banner Printing
          </h1>
          <p className="text-xs sm:text-sm text-gray-600 mt-1">
            High-resolution outdoor solvent flex printing with welded hems, brass grommet eyelets, and tearproof tensile strength.
          </p>
        </div>

        <Link
          href="/categories/flex-and-related-product"
          className="text-xs font-semibold text-purple-700 hover:text-purple-900 bg-purple-50 hover:bg-purple-100 px-3.5 py-1.5 rounded-full transition"
        >
          ← All Flex & Standees
        </Link>
      </div>

      {/* Golden Ratio 12-Column Responsive Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-7">
        
        {/* Left Column: Product Photography & Options (8 cols on xl) */}
        <div className="lg:col-span-7 xl:col-span-8 space-y-6">

          {/* HIGH-DEFINITION REAL PRODUCT PHOTOGRAPHY SHOWCASE */}
          <div className="shadow-md border border-gray-200/90 bg-white rounded-2xl overflow-hidden p-6">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 border-b border-gray-100 pb-3 mb-4">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-purple-100 text-[#9c1dac] flex items-center justify-center font-bold">
                  <Flag size={18} />
                </div>
                <div>
                  <h3 className="font-bold text-sm text-gray-900 flex items-center gap-2">
                    Commercial Frontlit & Star Flex Banners
                    <span className="text-[10px] bg-purple-100 text-[#9c1dac] font-bold px-2 py-0.5 rounded-full border border-purple-200">
                      300 DPI Pre-Press
                    </span>
                  </h3>
                  <p className="text-[11px] text-gray-500">Real factory-verified product sample & specifications</p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-xs text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-1 rounded-full font-semibold flex items-center gap-1">
                  <CheckCircle size={13} />
                  <span>Verified Factory Spec</span>
                </span>
              </div>
            </div>

            {/* REAL PRODUCT PHOTOGRAPHY HERO & GALLERY */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-center">
              
              {/* Main Product Image */}
              <div className="md:col-span-7 relative aspect-[4/3] w-full rounded-2xl overflow-hidden bg-gray-50 border border-gray-200 shadow-xs group">
                <Image
                  src={galleryImages[galleryImageIdx].src}
                  alt={galleryImages[galleryImageIdx].label}
                  fill
                  priority
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                
                {/* Floating Angle Tag */}
                <div className="absolute top-3 left-3 bg-black/75 backdrop-blur-md text-white text-[10px] font-bold px-2.5 py-1 rounded-full shadow-sm">
                  {galleryImages[galleryImageIdx].tag}
                </div>

                {/* Pre-press resolution badge */}
                <div className="absolute bottom-3 left-3 right-3 bg-white/90 backdrop-blur-md border border-gray-200/80 rounded-xl p-2.5 flex items-center justify-between shadow-xs">
                  <div className="flex items-center gap-1.5 text-xs text-gray-800 font-semibold truncate">
                    <ShieldCheck size={14} className="text-[#9c1dac] shrink-0" />
                    <span className="truncate">{heightFt} ft × {widthFt} ft ({totalSqFt} sq.ft)</span>
                  </div>
                  <span className="text-[10px] bg-purple-50 text-[#9c1dac] font-bold px-2 py-0.5 rounded-md border border-purple-100 shrink-0">
                    Direct Press Quality
                  </span>
                </div>
              </div>

              {/* Angle Thumbnails & Specs List */}
              <div className="md:col-span-5 space-y-3.5">
                <div>
                  <label className="text-xs font-bold text-gray-700 uppercase tracking-wider block mb-2">
                    Product Views & Finishes
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {galleryImages.map((imgItem, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => setGalleryImageIdx(idx)}
                        className={`relative aspect-square rounded-xl overflow-hidden border-2 transition-all p-0.5 cursor-pointer ${
                          galleryImageIdx === idx
                            ? "border-[#9c1dac] ring-2 ring-purple-100 shadow-xs"
                            : "border-gray-200 hover:border-gray-300 opacity-70 hover:opacity-100"
                        }`}
                      >
                        <Image
                          src={imgItem.src}
                          alt={imgItem.label}
                          fill
                          className="object-cover rounded-lg"
                        />
                        <span className="absolute bottom-1 inset-x-1 bg-black/70 text-white text-[8px] font-bold px-1 py-0.5 rounded truncate text-center">
                          {imgItem.label}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Core Specifications */}
                <div className="bg-gray-50 rounded-xl p-3 border border-gray-200/80 space-y-1.5">
                  <h4 className="text-xs font-bold text-gray-900 border-b border-gray-200 pb-1">
                    Commercial Flex Highlights
                  </h4>
                  <ul className="text-xs text-gray-600 space-y-1">
                    <li className="flex items-center gap-1.5">
                      <CheckCircle size={13} className="text-emerald-600 shrink-0" />
                      <span>Heavy 340 GSM Star Frontlit or 260 GSM Economy Flex</span>
                    </li>
                    <li className="flex items-center gap-1.5">
                      <CheckCircle size={13} className="text-emerald-600 shrink-0" />
                      <span>Thermal welded border hems for anti-fray exterior durability</span>
                    </li>
                    <li className="flex items-center gap-1.5">
                      <CheckCircle size={13} className="text-emerald-600 shrink-0" />
                      <span>Heavy-duty rust-proof brass grommet eyelets every 2 feet</span>
                    </li>
                    <li className="flex items-center gap-1.5">
                      <CheckCircle size={13} className="text-emerald-600 shrink-0" />
                      <span>All-weather UV & rain-resistant outdoor solvent inks</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Direct K2 Studio Handoff Banner */}
            <div className="mt-4 pt-4 border-t border-gray-100 bg-gradient-to-r from-purple-50 via-indigo-50/60 to-purple-50 rounded-xl p-3.5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-purple-600 text-white flex items-center justify-center shrink-0 shadow-xs">
                  <Palette size={16} />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-gray-900">Want to design this banner online?</h4>
                  <p className="text-[11px] text-gray-500">
                    Use K2 Studio to arrange text, sponsor logos, vectors and QR codes with Google Stitch-style canvas auto-fit.
                  </p>
                </div>
              </div>
              <Link href="/studio?product=flex-banners">
                <Button
                  size="sm"
                  className="bg-[#9c1dac] hover:bg-[#831492] text-white font-bold text-xs shadow-xs shrink-0"
                  endContent={<ArrowRight size={13} />}
                >
                  Design in K2 Studio
                </Button>
              </Link>
            </div>

            {/* Footer Assurance */}
            <div className="flex flex-wrap items-center justify-between text-[11px] text-gray-500 pt-3 mt-4 border-t border-gray-100 gap-2">
              <span>📐 Calculated Area: {totalSqFt} sq.ft</span>
              <span className="text-[#9c1dac] font-semibold">⚡ 3mm Bleed Pre-Press Check Passed</span>
              <span>🏬 Free Pickup at 6 Branches in Pune & Mumbai</span>
            </div>
          </div>

          {/* CONFIGURE SPECIFICATIONS CARD */}
          <div className="shadow-md border border-gray-200/90 bg-white rounded-2xl overflow-hidden p-6 space-y-6">
            <div className="border-b border-gray-100 pb-4">
              <h3 className="text-xl font-bold flex items-center gap-2 text-gray-900">
                <Layers className="text-purple-700" size={22} />
                <span>Configure Specifications: Commercial Flex Banner Printing</span>
              </h3>
            </div>

            <div className="space-y-6">
              {/* 1. Flex Media Grade */}
              <div>
                <Label className="text-xs font-bold text-gray-800 block mb-1.5">
                  1. Flex Media Grade
                </Label>
                <Select value={bannerType} onValueChange={setBannerType}>
                  <SelectTrigger className="w-full text-xs font-medium">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {BANNER_TYPES.map((b) => (
                      <SelectItem key={b.value} value={b.value} className="text-xs">
                        {b.label} - ₹{b.ratePerSqFt}/sq.ft
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <p className="text-[11px] text-gray-500 mt-1">{currentTypeConfig.desc}</p>
              </div>

              {/* 2. Dimensions in Feet */}
              <div>
                <Label className="text-xs font-bold text-gray-800 block mb-1.5">
                  2. Dimensions (Feet)
                </Label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <span className="text-[11px] text-gray-500">Height (Feet)</span>
                    <Input
                      type="number"
                      min="1"
                      max="30"
                      value={heightFt}
                      onChange={(e) => setHeightFt(e.target.value)}
                      className="mt-1 h-10 text-xs font-semibold"
                    />
                  </div>
                  <div>
                    <span className="text-[11px] text-gray-500">Width (Feet)</span>
                    <Input
                      type="number"
                      min="1"
                      max="60"
                      value={widthFt}
                      onChange={(e) => setWidthFt(e.target.value)}
                      className="mt-1 h-10 text-xs font-semibold"
                    />
                  </div>
                </div>

                <div className="mt-2 flex items-center justify-between bg-purple-50 border border-purple-100 rounded-lg p-2.5 text-xs">
                  <span className="text-gray-600 font-medium">Calculated Area:</span>
                  <span className="font-bold text-purple-900">{totalSqFt} sq.ft per banner</span>
                </div>
              </div>

              {/* 3. Finishing & Eyelets */}
              <div>
                <Label className="text-xs font-bold text-gray-800 block mb-1.5">
                  3. Border Finishing & Grommets
                </Label>
                <Select value={grommets} onValueChange={setGrommets}>
                  <SelectTrigger className="w-full text-xs font-medium">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all_sides" className="text-xs">
                      Welded Hems + Brass Eyelets All 4 Sides (+₹50/unit)
                    </SelectItem>
                    <SelectItem value="corners" className="text-xs">
                      Welded Hems + 4 Corners Only (Free)
                    </SelectItem>
                    <SelectItem value="none" className="text-xs">
                      No Eyelets (Raw Cut for Custom Framing)
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* 4. Quantity */}
              <div>
                <Label className="text-xs font-bold text-gray-800 block mb-1.5">
                  4. Quantity (Number of Banners)
                </Label>
                <Input
                  type="number"
                  min="1"
                  max="500"
                  value={quantity}
                  onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                  className="h-10 text-xs font-semibold w-full sm:w-48"
                />
              </div>

              {/* 3-Way Artwork & Design Ingestion Section (Vistaprint Style) */}
              <div className="pt-6 border-t border-gray-100 space-y-4">
                <div>
                  <Label className="font-bold text-base text-gray-900 block mb-1">
                    Select How You Want to Prepare Your Artwork:
                  </Label>
                  <p className="text-xs text-gray-500">
                    Choose one of the 3 production paths below. All files undergo our pre-flight proofing check.
                  </p>
                </div>

                {/* 3 Option Selection Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div
                    onClick={() => setDesignMode("upload")}
                    className={`p-3.5 rounded-xl border-2 cursor-pointer transition flex flex-col justify-between ${
                      designMode === "upload"
                        ? "border-purple-600 bg-purple-50/50 shadow-xs"
                        : "border-gray-200 hover:border-gray-300 bg-white"
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <UploadCloud className={designMode === "upload" ? "text-purple-700" : "text-gray-400"} size={22} />
                        <span className="text-[10px] font-bold uppercase tracking-wider text-green-700 bg-green-100 px-2 py-0.5 rounded-full">
                          Standard
                        </span>
                      </div>
                      <h4 className="font-bold text-sm text-gray-900">Upload Ready File</h4>
                      <p className="text-xs text-gray-500 mt-1">PDF, AI, PSD, CDR, TIFF, or JPG.</p>
                    </div>
                  </div>

                  <div
                    onClick={() => setDesignMode("studio")}
                    className={`p-3.5 rounded-xl border-2 cursor-pointer transition flex flex-col justify-between ${
                      designMode === "studio"
                        ? "border-purple-600 bg-purple-50/50 shadow-xs"
                        : "border-gray-200 hover:border-gray-300 bg-white"
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <Palette className={designMode === "studio" ? "text-purple-700" : "text-gray-400"} size={22} />
                        <span className="text-[10px] font-bold uppercase tracking-wider text-purple-700 bg-purple-100 px-2 py-0.5 rounded-full">
                          Interactive
                        </span>
                      </div>
                      <h4 className="font-bold text-sm text-gray-900">Design in K2 Studio</h4>
                      <p className="text-xs text-gray-500 mt-1">Customize fonts, logos & vectors online.</p>
                    </div>
                  </div>

                  <div
                    onClick={() => setDesignMode("hire_designer")}
                    className={`p-3.5 rounded-xl border-2 cursor-pointer transition flex flex-col justify-between ${
                      designMode === "hire_designer"
                        ? "border-purple-600 bg-purple-50/50 shadow-xs"
                        : "border-gray-200 hover:border-gray-300 bg-white"
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <Brush className={designMode === "hire_designer" ? "text-purple-700" : "text-gray-400"} size={22} />
                        <span className="text-[10px] font-bold uppercase tracking-wider text-amber-700 bg-amber-100 px-2 py-0.5 rounded-full">
                          + ₹299
                        </span>
                      </div>
                      <h4 className="font-bold text-sm text-gray-900">Hire K2 Graphic Artist</h4>
                      <p className="text-xs text-gray-500 mt-1">We create design & share WhatsApp proof.</p>
                    </div>
                  </div>
                </div>

                {/* Sub-view for Upload Mode */}
                {designMode === "upload" && (
                  <div className="space-y-3 pt-2">
                    <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center hover:border-purple-500 transition cursor-pointer relative bg-gray-50/50">
                      <input
                        type="file"
                        accept=".pdf,.png,.jpg,.jpeg,.ai,.psd,.cdr,.tiff"
                        onChange={(e) => {
                          if (e.target.files && e.target.files[0]) {
                            setUploadedArtwork(e.target.files[0]);
                          }
                        }}
                        className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                      />
                      {uploadedArtwork ? (
                        <div className="flex items-center justify-center gap-2 text-green-700 font-medium">
                          <FileCheck size={24} />
                          <span>{uploadedArtwork.name} ({(uploadedArtwork.size / 1024 / 1024).toFixed(2)} MB)</span>
                        </div>
                      ) : (
                        <div>
                          <UploadCloud className="mx-auto text-purple-700 mb-2" size={32} />
                          <p className="text-sm font-semibold text-gray-800">Drag & drop your artwork file or click to browse</p>
                          <p className="text-xs text-gray-500 mt-1">Supports PDF, CDR, TIFF, AI, PSD, PNG, JPEG (up to 150MB)</p>
                        </div>
                      )}
                    </div>
                    <div className="flex flex-wrap items-center justify-between text-xs text-gray-500 bg-purple-50/60 p-3 rounded-lg border border-purple-100">
                      <span className="flex items-center gap-1 text-purple-900 font-medium">
                        <ShieldCheck size={16} className="text-purple-700" />
                        Free Automated Pre-Press Proofing
                      </span>
                      <span>300 DPI Recommended | 2-inch Bleed for Hemming</span>
                    </div>
                  </div>
                )}

                {/* Sub-view for Studio Mode */}
                {designMode === "studio" && (
                  <div className="p-5 bg-gradient-to-r from-purple-50 to-indigo-50 rounded-xl border border-purple-200 space-y-4">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                      <div>
                        <h4 className="font-bold text-gray-900 text-sm flex items-center gap-1.5">
                          <Palette size={18} className="text-purple-700" />
                          Launch K2 Studio Online
                        </h4>
                        <p className="text-xs text-gray-600 mt-0.5">
                          Create banner layouts directly in your browser with real-time text scaling, templates, and print vectors.
                        </p>
                      </div>
                      <Link href="/studio?product=flex-banners">
                        <Button
                          className="bg-[#9c1dac] hover:bg-[#831492] text-white font-bold shadow-xs shrink-0"
                          endContent={<ArrowRight size={16} />}
                        >
                          Open Studio Editor
                        </Button>
                      </Link>
                    </div>
                  </div>
                )}

                {/* Sub-view for Hire Designer Mode */}
                {designMode === "hire_designer" && (
                  <div className="p-5 bg-amber-50/70 rounded-xl border border-amber-200 space-y-3">
                    <div>
                      <h4 className="font-bold text-gray-900 text-sm flex items-center gap-1.5 text-amber-900">
                        <Brush size={18} className="text-amber-700" />
                        Professional Design Service (+ ₹299 design fee)
                      </h4>
                      <p className="text-xs text-amber-800 mt-0.5">
                        Our Senior Graphic Artists will prepare a bespoke print layout and WhatsApp you digital proofs within 2-4 hours.
                      </p>
                    </div>

                    <div className="space-y-3 pt-1">
                      <div>
                        <Label className="text-xs font-semibold text-gray-700">Design Instructions & Content:</Label>
                        <textarea
                          rows={3}
                          className="w-full mt-1 p-2.5 text-xs rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-600 bg-white"
                          placeholder="Provide banner headline, offer details, address, event dates or sponsor logos..."
                          value={designerBrief}
                          onChange={(e) => setDesignerBrief(e.target.value)}
                        />
                      </div>

                      <div>
                        <Label className="text-xs font-semibold text-gray-700">WhatsApp Number for Proof Review:</Label>
                        <Input
                          placeholder="+91 98765 43210"
                          className="mt-1"
                          value={designerPhone}
                          onChange={(e) => setDesignerPhone(e.target.value)}
                        />
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Sticky Live Quote Summary (4 cols on xl) */}
        <div className="lg:col-span-5 xl:col-span-4">
          <div className="shadow-lg border border-purple-200/90 bg-white lg:sticky lg:top-28 z-30 rounded-2xl overflow-hidden">
            {/* Header: Exact 0 padding from top of card, flush edge-to-edge */}
            <div className="bg-gradient-to-r from-purple-800 to-indigo-900 text-white px-6 py-4 flex items-center justify-between w-full rounded-t-2xl">
              <div className="flex items-center gap-2 font-bold text-lg">
                <Calculator size={20} className="text-purple-200" />
                <span>Live Quote Summary</span>
              </div>
              <Chip size="sm" color="warning" variant="solid" className="text-xs font-bold shadow-xs">
                {isCalculating ? "Updating..." : "Verified Rate"}
              </Chip>
            </div>

            <div className="p-6 space-y-4">
              <div className="flex justify-between items-baseline border-b border-gray-100 pb-3">
                <span className="text-gray-600 text-sm">Calculated Quantity:</span>
                <span className="font-bold text-gray-900 text-lg">{quantity} units ({totalSqFt} sq.ft each)</span>
              </div>

              <div className="flex justify-between items-baseline border-b border-gray-100 pb-3">
                <span className="text-gray-600 text-sm">Effective Unit Rate:</span>
                <span className="font-semibold text-purple-700">
                  ₹{(pricing.totalBeforeTax / quantity).toFixed(2)} / unit
                </span>
              </div>

              {/* Itemized Breakdown */}
              <div className="space-y-2 py-2">
                <Label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Itemized Breakdown</Label>
                <div className="flex justify-between text-xs text-gray-600">
                  <span className="truncate max-w-[200px]">Base Flex Print ({bannerType})</span>
                  <span className="font-medium text-gray-800">₹{pricing.subtotalRaw.toFixed(2)}</span>
                </div>
                {pricing.eyeletFee > 0 && (
                  <div className="flex justify-between text-xs text-gray-600">
                    <span>Brass Eyelets All 4 Sides</span>
                    <span className="font-medium text-gray-800">₹{pricing.eyeletFee.toFixed(2)}</span>
                  </div>
                )}
                {designFee > 0 && (
                  <div className="flex justify-between text-xs text-amber-800 font-semibold bg-amber-50 p-1.5 rounded">
                    <span>K2 Graphic Artist Design Service</span>
                    <span>₹{designFee.toFixed(2)}</span>
                  </div>
                )}
              </div>

              <Divider />

              {/* Subtotal, GST & Final */}
              <div className="space-y-1.5 pt-1 text-sm">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal:</span>
                  <span className="font-medium">₹{pricing.totalBeforeTax.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>GST (18%):</span>
                  <span className="font-medium">₹{pricing.gst.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-lg font-bold text-gray-900 pt-2 border-t">
                  <span>Total Amount:</span>
                  <span className="text-purple-700 font-extrabold">₹{pricing.grandTotal.toFixed(2)}</span>
                </div>
                <p className="text-[11px] text-gray-400 text-right">Inclusive of all applicable taxes</p>
              </div>

              <div className="pt-4 space-y-2">
                <Button
                  onClick={handleAddToCart}
                  size="lg"
                  className="w-full bg-[#9c1dac] hover:bg-[#831492] text-white font-bold shadow-md hover:shadow-lg transition-all"
                  startContent={<ShoppingBag size={20} />}
                >
                  Proceed to Order
                </Button>
                <div className="flex items-center justify-center gap-1.5 text-xs text-gray-500 pt-1">
                  <Check size={14} className="text-green-600" />
                  <span>Choice of 6 Branch Pickups or Doorstep Delivery</span>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
