"use client";

import React, { useState, useEffect, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Sparkles,
  CheckCircle,
  Truck,
  ShieldCheck,
  Store,
  UploadCloud,
  ChevronRight,
  Eye,
  ShoppingBag,
  ArrowRight,
  Layers,
  Flag,
  Wrench,
  Ruler,
  Palette,
  Brush,
  Calculator,
  Check,
  FileCheck
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

// Static asset fallbacks
import FlexBannerImg from "../../public/images/FLEX (Banner).png";
import FlexRelatedImg from "../../public/images/Flex&Related.png";
import StandBoardImg from "../../public/images/StandBoard1.jpg";

export default function FlexFrameConfigurator({
  productKey = "economy_frame",
  title = "Flex Banner with MS Tubular Frame",
  subtitle = "High-Durability Exterior Frontlit Flex Mounted on Heavy-Duty Welded MS Pipe Frame",
  frameType = "ms_pipe", // 'ms_pipe' | 'ms_heavy' | 'ms_angle' | 'wood' | 'x_stand'
  baseRatePerSqFt = 38,
  minSqFt = 10,
  minPrice = 380,
  features = [
    "Heavy 1-Inch Square MS Welded Pipe Frame",
    "Anti-Rust Red Oxide Primer Coat + Finish Paint",
    "High-Tensile Star Flex Stretched with Self-Tapping Screws",
    "Pre-Welded Wall L-Clamps for Easy Mounting"
  ],
  calculateApi = null,
  types = []
}) {
  const router = useRouter();

  // Preset Sizes (in Feet)
  const STANDARD_SIZES = [
    { label: "4 ft × 2 ft (8 sq.ft)", w: 4, h: 2 },
    { label: "6 ft × 3 ft (18 sq.ft)", w: 6, h: 3 },
    { label: "8 ft × 3 ft (24 sq.ft)", w: 8, h: 3 },
    { label: "8 ft × 4 ft (32 sq.ft)", w: 8, h: 4 },
    { label: "10 ft × 4 ft (40 sq.ft)", w: 10, h: 4 },
    { label: "10 ft × 5 ft (50 sq.ft)", w: 10, h: 5 },
    { label: "12 ft × 4 ft (48 sq.ft)", w: 12, h: 4 },
    { label: "12 ft × 6 ft (72 sq.ft)", w: 12, h: 6 },
    { label: "15 ft × 8 ft (120 sq.ft)", w: 15, h: 8 },
    { label: "20 ft × 10 ft (200 sq.ft)", w: 20, h: 10 },
  ];

  const [selectedType, setSelectedType] = useState(types.length > 0 ? types[0].value : "Standard");
  const [width, setWidth] = useState(6);
  const [height, setHeight] = useState(3);
  const [quantity, setQuantity] = useState(1);
  const [includeLighting, setIncludeLighting] = useState(false);
  const [installationService, setInstallationService] = useState(false);
  const [galleryImageIdx, setGalleryImageIdx] = useState(0);

  // 3-Way Artwork Ingestion
  const [designMode, setDesignMode] = useState("upload");
  const [uploadedArtwork, setUploadedArtwork] = useState(null);
  const [designerBrief, setDesignerBrief] = useState("");
  const [designerPhone, setDesignerPhone] = useState("");

  const [apiTotal, setApiTotal] = useState(null);
  const [isCalculating, setIsCalculating] = useState(false);
  const [calcNotice, setCalcNotice] = useState("");

  const totalSqFt = useMemo(() => {
    return Math.max(1, (Number(width) || 1) * (Number(height) || 1));
  }, [width, height]);

  const galleryImages = [
    { src: StandBoardImg, label: "Framed Hoarding", tag: "Heavy Welded MS Frame" },
    { src: FlexRelatedImg, label: "Industrial Structure", tag: "Anti-Rust Primer Coated" },
    { src: FlexBannerImg, label: "Star Flex Quality", tag: "Solvent Weatherproof Print" }
  ];

  // Local calculation formula
  const localQuote = useMemo(() => {
    let rate = baseRatePerSqFt;
    if (types.length > 0) {
      const match = types.find((t) => t.value === selectedType);
      if (match?.rate) rate = match.rate;
    }

    const effectiveSqFt = Math.max(minSqFt, totalSqFt);
    const frameBase = effectiveSqFt * rate;

    // Optional Lighting Addon: ₹850 per floodlight unit (approx 1 per 6 feet of width)
    const numLights = includeLighting ? Math.max(1, Math.ceil(width / 6)) : 0;
    const lightCost = numLights * 850;

    // Optional Installation Service: ₹12 per sq.ft
    const installCost = installationService ? effectiveSqFt * 12 : 0;

    const unitBase = frameBase + lightCost + installCost;
    const subtotal = Math.max(minPrice, unitBase) * quantity;
    const gst = Math.round(subtotal * 0.18);
    const grandTotal = subtotal + gst;

    return {
      rate,
      effectiveSqFt,
      frameBase,
      numLights,
      lightCost,
      installCost,
      unitBase,
      subtotal,
      gst,
      grandTotal
    };
  }, [baseRatePerSqFt, minSqFt, minPrice, totalSqFt, types, selectedType, includeLighting, installationService, width, quantity]);

  // Recalculate price via API with resilient fallback
  useEffect(() => {
    let isCancelled = false;

    if (!calculateApi) {
      setApiTotal(null);
      setCalcNotice("Live rate calculated via factory framework rules");
      return;
    }

    const runCalculation = async () => {
      setIsCalculating(true);
      try {
        const payload = {
          type: selectedType,
          height: Math.round(height),
          width: Math.round(width)
        };
        const res = await calculateApi(payload);

        if (!isCancelled) {
          if (res?.status && res?.data?.totalPrice) {
            setApiTotal(Number(res.data.totalPrice));
            setCalcNotice("Live price verified with K2 Signage Workshop");
          } else {
            setApiTotal(null);
            setCalcNotice("Factory pricing engine applied");
          }
        }
      } catch (err) {
        if (!isCancelled) {
          setApiTotal(null);
          setCalcNotice("Standard factory pricing applied");
        }
      } finally {
        if (!isCancelled) setIsCalculating(false);
      }
    };

    const timer = setTimeout(runCalculation, 350);
    return () => {
      isCancelled = true;
      clearTimeout(timer);
    };
  }, [calculateApi, selectedType, height, width]);

  // Final Billing Amounts
  const designFee = designMode === "hire_designer" ? 299 : 0;
  const activeSubtotal = useMemo(() => {
    if (apiTotal) {
      return (apiTotal + localQuote.lightCost + localQuote.installCost) * quantity + designFee;
    }
    return localQuote.subtotal + designFee;
  }, [apiTotal, localQuote, quantity, designFee]);

  const activeGst = Math.round(activeSubtotal * 0.18);
  const activeGrandTotal = activeSubtotal + activeGst;

  // Add to Cart
  const handleAddToCart = () => {
    const item = {
      id: `frame-${Date.now()}`,
      name: `${title} (${selectedType})`,
      category: "flex-and-related-product",
      slug: productKey,
      specs: [
        { label: "Frame Type", value: frameType.toUpperCase().replace("_", " ") },
        { label: "Variant", value: selectedType },
        { label: "Dimensions", value: `${width} ft Width × ${height} ft Height (${totalSqFt} sq.ft)` },
        { label: "Lighting", value: includeLighting ? `LED Floodlights Included (${localQuote.numLights} units)` : "None" },
        { label: "Installation", value: installationService ? "On-Site Installation Requested" : "Self-Mounting / Pickup" },
        { label: "Artwork Path", value: designMode === "upload" ? (uploadedArtwork?.name || "Ready Artwork File") : designMode === "studio" ? "Designed in K2 Studio" : "K2 Graphic Artist Assisted" }
      ],
      quantity,
      unitPrice: Math.round(activeSubtotal / quantity),
      totalPrice: activeGrandTotal,
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
      currentCart.push(item);
      localStorage.setItem("k2_active_cart", JSON.stringify(currentCart));
      window.dispatchEvent(new Event("storage"));
    }

    router.push("/ProceedToCheckout");
  };

  return (
    <div className="w-full max-w-[1520px] mx-auto py-6 px-4 sm:px-6 lg:px-8 font-sans">
      {/* Breadcrumb Navigation */}
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs text-gray-500 mb-1">
            <Link href="/" className="hover:text-purple-700 transition">Home</Link>
            <ChevronRight size={12} />
            <Link href="/categories/flex-and-related-product" className="hover:text-purple-700 transition">Flex & Banners</Link>
            <ChevronRight size={12} />
            <span className="text-gray-900 font-medium">{title}</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight">{title}</h1>
          <p className="text-xs sm:text-sm text-gray-600 mt-1">{subtitle}</p>
        </div>

        <Link
          href="/categories/flex-and-related-product"
          className="text-xs font-semibold text-purple-700 hover:text-purple-900 bg-purple-50 hover:bg-purple-100 px-3.5 py-1.5 rounded-full transition"
        >
          ← All Flex & Standees
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-7">
        
        {/* LEFT COLUMN: Visual Showcase & Specifications (8 Cols on xl) */}
        <div className="lg:col-span-7 xl:col-span-8 space-y-6">
          
          {/* HIGH-DEFINITION REAL PRODUCT PHOTOGRAPHY SHOWCASE */}
          <div className="shadow-md border border-gray-200/90 bg-white rounded-2xl overflow-hidden p-6">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 border-b border-gray-100 pb-3 mb-4">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-purple-100 text-[#9c1dac] flex items-center justify-center font-bold">
                  <Wrench size={18} />
                </div>
                <div>
                  <h3 className="font-bold text-sm text-gray-900 flex items-center gap-2">
                    {title}
                    <span className="text-[10px] bg-purple-100 text-[#9c1dac] font-bold px-2 py-0.5 rounded-full border border-purple-200">
                      Factory Welded
                    </span>
                  </h3>
                  <p className="text-[11px] text-gray-500">Fabricated with square section MS tubes & primer coating</p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-xs text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-1 rounded-full font-semibold flex items-center gap-1">
                  <CheckCircle size={13} />
                  <span>Structural Spec Verified</span>
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
                    <span className="truncate">{width} ft × {height} ft ({totalSqFt} sq.ft)</span>
                  </div>
                  <span className="text-[10px] bg-purple-50 text-[#9c1dac] font-bold px-2 py-0.5 rounded-md border border-purple-100 shrink-0">
                    Pre-Assembled
                  </span>
                </div>
              </div>

              {/* Angle Thumbnails & Specs List */}
              <div className="md:col-span-5 space-y-3.5">
                <div>
                  <label className="text-xs font-bold text-gray-700 uppercase tracking-wider block mb-2">
                    Structure & Hardware Finishes
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
                    Frame & Banner Highlights
                  </h4>
                  <ul className="text-xs text-gray-600 space-y-1">
                    {features.map((feat, i) => (
                      <li key={i} className="flex items-center gap-1.5">
                        <CheckCircle size={13} className="text-emerald-600 shrink-0" />
                        <span>{feat}</span>
                      </li>
                    ))}
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
                  <h4 className="text-xs font-bold text-gray-900">Need artwork designed for this hoarding?</h4>
                  <p className="text-[11px] text-gray-500">
                    Launch K2 Studio to arrange logos, headlines, contact numbers and maps in pre-press vector quality.
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
              <span>📐 Size: {width}ft × {height}ft ({totalSqFt} sq.ft)</span>
              <span className="text-[#9c1dac] font-semibold">⚡ Heavy Structural Welds Inspected</span>
              <span>🏬 Pickup or Delivery across Maharashtra</span>
            </div>
          </div>

          {/* CONFIGURE SPECIFICATIONS CARD */}
          <div className="shadow-md border border-gray-200/90 bg-white rounded-2xl overflow-hidden p-6 space-y-6">
            <div className="border-b border-gray-100 pb-4">
              <h3 className="text-xl font-bold flex items-center gap-2 text-gray-900">
                <Layers className="text-purple-700" size={22} />
                <span>Configure Specifications: {title}</span>
              </h3>
            </div>

            <div className="space-y-6">
              {/* Preset Sizes */}
              <div>
                <Label className="text-xs font-bold text-gray-800 uppercase tracking-wider block mb-2">
                  Standard Hoarding & Board Dimensions
                </Label>
                <div className="flex flex-wrap gap-2">
                  {STANDARD_SIZES.map((sz, idx) => {
                    const isSelected = width === sz.w && height === sz.h;
                    return (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => {
                          setWidth(sz.w);
                          setHeight(sz.h);
                        }}
                        className={`text-xs px-3 py-1.5 rounded-lg border font-medium transition cursor-pointer ${
                          isSelected
                            ? "bg-purple-600 text-white border-purple-600 shadow-xs"
                            : "bg-white text-gray-700 border-gray-200 hover:border-gray-300"
                        }`}
                      >
                        {sz.label}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Custom Dimensions */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <Label className="text-xs font-bold text-gray-800 uppercase tracking-wider">
                    Width (Feet)
                  </Label>
                  <Input
                    type="number"
                    min={1}
                    max={100}
                    step={0.5}
                    value={width}
                    onChange={(e) => setWidth(Math.max(1, parseFloat(e.target.value) || 1))}
                    className="mt-1 font-bold text-base h-10"
                  />
                </div>
                <div>
                  <Label className="text-xs font-bold text-gray-800 uppercase tracking-wider">
                    Height (Feet)
                  </Label>
                  <Input
                    type="number"
                    min={1}
                    max={50}
                    step={0.5}
                    value={height}
                    onChange={(e) => setHeight(Math.max(1, parseFloat(e.target.value) || 1))}
                    className="mt-1 font-bold text-base h-10"
                  />
                </div>
              </div>

              {/* Type selector if multiple variants provided */}
              {types.length > 0 && (
                <div>
                  <Label className="text-xs font-bold text-gray-800 uppercase tracking-wider block mb-1.5">
                    Material & Flex Specification
                  </Label>
                  <Select value={selectedType} onValueChange={setSelectedType}>
                    <SelectTrigger className="w-full text-xs">
                      <SelectValue placeholder="Select Type" />
                    </SelectTrigger>
                    <SelectContent>
                      {types.map((t) => (
                        <SelectItem key={t.value} value={t.value} className="text-xs">
                          {t.label} {t.rate ? `(₹${t.rate}/sq.ft)` : ""}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              )}

              {/* Quantity */}
              <div>
                <Label className="text-xs font-bold text-gray-800 uppercase tracking-wider block mb-1.5">
                  Quantity of Boards
                </Label>
                <Input
                  type="number"
                  min={1}
                  max={500}
                  value={quantity}
                  onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                  className="font-bold h-10 w-full sm:w-48"
                />
              </div>

              {/* Optional Hardware Add-ons for MS Frame */}
              {frameType !== "x_stand" && (
                <div className="pt-2 border-t border-gray-100 space-y-2">
                  <Label className="text-xs font-bold text-gray-800 uppercase tracking-wider block">
                    Installation & Illumination Add-ons
                  </Label>
                  <div className="space-y-2">
                    <div className="p-3 bg-purple-50/60 rounded-xl border border-purple-100 flex items-start gap-3">
                      <input
                        type="checkbox"
                        id="lightingCheckbox"
                        checked={includeLighting}
                        onChange={(e) => setIncludeLighting(e.target.checked)}
                        className="mt-0.5 h-4 w-4 rounded border-purple-300 text-purple-600 focus:ring-purple-500"
                      />
                      <label htmlFor="lightingCheckbox" className="text-xs text-gray-700 cursor-pointer">
                        <strong className="text-purple-900 block">Outdoor LED Floodlights with MS Extension Arms (+₹850/light)</strong>
                        High-lumen waterproof IP65 LED floodlights with 1.5ft projecting MS bracket arms pre-welded to the frame.
                      </label>
                    </div>

                    <div className="p-3 bg-purple-50/60 rounded-xl border border-purple-100 flex items-start gap-3">
                      <input
                        type="checkbox"
                        id="installCheckbox"
                        checked={installationService}
                        onChange={(e) => setInstallationService(e.target.checked)}
                        className="mt-0.5 h-4 w-4 rounded border-purple-300 text-purple-600 focus:ring-purple-500"
                      />
                      <label htmlFor="installCheckbox" className="text-xs text-gray-700 cursor-pointer">
                        <strong className="text-purple-900 block">On-Site Wall Anchor Installation (+₹12/sq.ft)</strong>
                        Professional mounting on building fascia, walls, or trusses using heavy anchor fasteners across Pune & Mumbai.
                      </label>
                    </div>
                  </div>
                </div>
              )}

              {/* 3-Way Artwork & Design Ingestion Section */}
              <div className="pt-6 border-t border-gray-100 space-y-4">
                <div>
                  <Label className="font-bold text-base text-gray-900 block mb-1">
                    Select How You Want to Prepare Your Artwork:
                  </Label>
                  <p className="text-xs text-gray-500">
                    Choose one of the 3 production paths below. All files undergo pre-press proofing.
                  </p>
                </div>

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
                  </div>
                )}

                {designMode === "studio" && (
                  <div className="p-5 bg-gradient-to-r from-purple-50 to-indigo-50 rounded-xl border border-purple-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                    <div>
                      <h4 className="font-bold text-gray-900 text-sm flex items-center gap-1.5">
                        <Palette size={18} className="text-purple-700" />
                        Launch K2 Studio Online
                      </h4>
                      <p className="text-xs text-gray-600 mt-0.5">
                        Design your hoarding with Stitch-style responsive auto-fit canvas and high-res vector output.
                      </p>
                    </div>
                    <Link href="/studio?product=flex-banners">
                      <Button className="bg-[#9c1dac] hover:bg-[#831492] text-white font-bold shadow-xs shrink-0" endContent={<ArrowRight size={16} />}>
                        Open Studio Editor
                      </Button>
                    </Link>
                  </div>
                )}

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
                      <textarea
                        rows={3}
                        className="w-full p-2.5 text-xs rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-600 bg-white"
                        placeholder="Provide hoarding headline, address, phone numbers or offer details..."
                        value={designerBrief}
                        onChange={(e) => setDesignerBrief(e.target.value)}
                      />
                      <Input
                        placeholder="WhatsApp Number for Proof Review (+91 98765 43210)"
                        value={designerPhone}
                        onChange={(e) => setDesignerPhone(e.target.value)}
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: Sticky Live Quote Summary (4 cols on xl) */}
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
                  ₹{(activeSubtotal / quantity).toFixed(2)} / unit
                </span>
              </div>

              {/* Itemized Breakdown */}
              <div className="space-y-2 py-2">
                <Label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Itemized Breakdown</Label>
                <div className="flex justify-between text-xs text-gray-600">
                  <span className="truncate max-w-[200px]">Frame & Star Flex ({width}x{height} ft)</span>
                  <span className="font-medium text-gray-800">₹{(localQuote.frameBase * quantity).toFixed(2)}</span>
                </div>
                {includeLighting && (
                  <div className="flex justify-between text-xs text-gray-600">
                    <span>LED Floodlights ({localQuote.numLights * quantity} units)</span>
                    <span className="font-medium text-gray-800">₹{(localQuote.lightCost * quantity).toFixed(2)}</span>
                  </div>
                )}
                {installationService && (
                  <div className="flex justify-between text-xs text-gray-600">
                    <span>On-Site Wall Anchor Mounting</span>
                    <span className="font-medium text-gray-800">₹{(localQuote.installCost * quantity).toFixed(2)}</span>
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
                  <span className="font-medium">₹{activeSubtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>GST (18%):</span>
                  <span className="font-medium">₹{activeGst.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-lg font-bold text-gray-900 pt-2 border-t">
                  <span>Total Amount:</span>
                  <span className="text-purple-700 font-extrabold">₹{activeGrandTotal.toFixed(2)}</span>
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
