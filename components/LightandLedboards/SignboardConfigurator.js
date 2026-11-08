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
  Wrench,
  Palette,
  Calculator,
  Check,
  Brush,
  FileCheck,
  Lightbulb,
  Zap
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

// Real High-Resolution Signboard Photography
import LEDBoardImg from "../../public/images/LEDBoard.png";
import CliponFramesImg from "../../public/images/CLIAPON FRAMES.png";
import ArtFramesImg from "../../public/images/ArtFrames.png";

export default function SignboardConfigurator({
  productKey = "lightbox",
  title = "Commercial Lightbox Board",
  subtitle = "Heavy-Duty Exterior Backlit Flex & Acrylic LED Signboard",
  defaultImage = "/images/LEDBoard.png",
  types = [],
  baseRates = {},
  calculateApi = null,
  isLetterBased = false
}) {
  const router = useRouter();

  // Form State
  const [selectedType, setSelectedType] = useState(types[0]?.value || "");
  const [height, setHeight] = useState(3);
  const [width, setWidth] = useState(6);
  const [runningInches, setRunningInches] = useState(48);
  const [letterCount, setLetterCount] = useState(8);
  const [companyName, setCompanyName] = useState("K2 SIGNATURE STORE");
  const [lightingTemp, setLightingTemp] = useState("cool_white");
  const [includeInstallation, setIncludeInstallation] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [galleryImageIdx, setGalleryImageIdx] = useState(0);

  // 3-Way Artwork Ingestion State
  const [designMode, setDesignMode] = useState("upload");
  const [uploadedArtwork, setUploadedArtwork] = useState(null);
  const [designerBrief, setDesignerBrief] = useState("");
  const [designerPhone, setDesignerPhone] = useState("");

  // Quote State
  const [calcLoading, setCalcLoading] = useState(false);
  const [quote, setQuote] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");

  const sqFt = isLetterBased ? 0 : Number((Number(height) * Number(width)).toFixed(2));

  const galleryImages = [
    { src: LEDBoardImg, label: "Backlit LED Board", tag: "Waterproof IP67 Commercial Grade" },
    { src: CliponFramesImg, label: "Thinlite Clip-on", tag: "Even Light Guide Plate (LGP)" },
    { src: ArtFramesImg, label: "Architectural Signage", tag: "Heavy Extruded Aluminium Frame" }
  ];

  // Compute Live Quote
  useEffect(() => {
    async function updateQuote() {
      setCalcLoading(true);

      if (!isLetterBased && sqFt > 0 && sqFt < 3) {
        setErrorMessage("Minimum signage size is 3 sq.ft for stability and frame rigidity.");
        setCalcLoading(false);
        return;
      }
      setErrorMessage("");

      let calculatedBasePrice = 0;
      let effectiveRate = baseRates[selectedType] || 450;

      if (calculateApi) {
        try {
          const payload = isLetterBased
            ? { type: selectedType, runningInch: runningInches }
            : { type: selectedType, height: Number(height), width: Number(width) };

          const res = await calculateApi(payload);
          if (res && res.status && res.data && res.data.totalPrice) {
            calculatedBasePrice = res.data.totalPrice;
          } else {
            calculatedBasePrice = isLetterBased
              ? runningInches * effectiveRate
              : sqFt * effectiveRate;
          }
        } catch (e) {
          calculatedBasePrice = isLetterBased
            ? runningInches * effectiveRate
            : sqFt * effectiveRate;
        }
      } else {
        calculatedBasePrice = isLetterBased
          ? runningInches * effectiveRate
          : sqFt * effectiveRate;
      }

      const subtotalBeforeAddons = calculatedBasePrice * quantity;
      const installationFee = includeInstallation ? 1500 * quantity : 0;
      const subtotal = subtotalBeforeAddons + installationFee;
      const gst = Number((subtotal * 0.18).toFixed(2));
      const grandTotal = Number((subtotal + gst).toFixed(2));

      setQuote({
        rate: effectiveRate,
        basePrice: subtotalBeforeAddons,
        installationFee,
        subtotal,
        gst,
        grandTotal
      });

      setCalcLoading(false);
    }

    updateQuote();
  }, [selectedType, height, width, runningInches, quantity, includeInstallation, sqFt, isLetterBased, baseRates, calculateApi]);

  const designFee = designMode === "hire_designer" ? 299 : 0;
  const effectiveSubtotal = (quote?.subtotal || 0) + designFee;
  const effectiveGst = Number((effectiveSubtotal * 0.18).toFixed(2));
  const effectiveGrandTotal = Number((effectiveSubtotal + effectiveGst).toFixed(2));

  const handleAddToCartAndProceed = () => {
    const specs = [
      { label: "Signage Type", value: selectedType || title },
      {
        label: isLetterBased ? "Letter Specs" : "Dimensions",
        value: isLetterBased
          ? `${letterCount} Letters (${runningInches} Running Inches)`
          : `${height} ft × ${width} ft (${sqFt} sq.ft)`
      },
      {
        label: "LED Color Temperature",
        value:
          lightingTemp === "cool_white"
            ? "Cool White 6500K (High Visibility)"
            : lightingTemp === "warm_white"
            ? "Warm White 3000K (Luxury Glow)"
            : lightingTemp === "daylight"
            ? "Natural Daylight 4000K"
            : "RGB Multi-Color"
      },
      {
        label: "Site Installation",
        value: includeInstallation ? "On-Site Installation (Pune/Mumbai +₹1500)" : "Counter Pickup / Self-Mounting (Free)"
      },
      {
        label: "Artwork Preparation",
        value: designMode === "upload" ? (uploadedArtwork?.name || "Ready Artwork File") : designMode === "studio" ? "Designed in K2 Studio" : "K2 Graphic Artist Assisted"
      }
    ];

    if (companyName) {
      specs.push({ label: "Sign Text", value: companyName });
    }

    const item = {
      id: `sign-${Date.now()}`,
      name: title,
      category: "light-board-led-board",
      slug: productKey,
      specs,
      quantity,
      unitPrice: Math.round(effectiveSubtotal / quantity),
      totalPrice: effectiveGrandTotal,
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
      
      {/* Header Breadcrumb */}
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs text-gray-500 mb-1">
            <Link href="/" className="hover:text-purple-700 transition">Home</Link>
            <ChevronRight size={12} />
            <Link href="/categories/light-board-led-board" className="hover:text-purple-700 transition">Light Board & LED</Link>
            <ChevronRight size={12} />
            <span className="font-semibold text-gray-900">{title}</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight">
            {title}
          </h1>
          <p className="text-xs sm:text-sm text-gray-600 mt-1">{subtitle}</p>
        </div>

        <Link
          href="/categories/light-board-led-board"
          className="text-xs font-semibold text-purple-700 hover:text-purple-900 bg-purple-50 hover:bg-purple-100 px-3.5 py-1.5 rounded-full transition"
        >
          ← All LED Boards
        </Link>
      </div>

      {/* Golden Ratio 12-Column Responsive Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-7">
        
        {/* Left Column: Product Photography Showcase & Specifications (8 cols on xl) */}
        <div className="lg:col-span-7 xl:col-span-8 space-y-6">

          {/* HIGH-DEFINITION REAL PRODUCT PHOTOGRAPHY SHOWCASE */}
          <div className="shadow-md border border-gray-200/90 bg-white rounded-2xl overflow-hidden p-6">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 border-b border-gray-100 pb-3 mb-4">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-purple-100 text-[#9c1dac] flex items-center justify-center font-bold">
                  <Lightbulb size={18} />
                </div>
                <div>
                  <h3 className="font-bold text-sm text-gray-900 flex items-center gap-2">
                    {title}
                    <span className="text-[10px] bg-purple-100 text-[#9c1dac] font-bold px-2 py-0.5 rounded-full border border-purple-200">
                      IP67 Waterproof
                    </span>
                  </h3>
                  <p className="text-[11px] text-gray-500">Commercial grade branded LED modules with high-efficiency MeanWell SMPS</p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-xs text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-1 rounded-full font-semibold flex items-center gap-1">
                  <CheckCircle size={13} />
                  <span>3-Year Warranty</span>
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

                {/* Dimensions badge */}
                <div className="absolute bottom-3 left-3 right-3 bg-white/90 backdrop-blur-md border border-gray-200/80 rounded-xl p-2.5 flex items-center justify-between shadow-xs">
                  <div className="flex items-center gap-1.5 text-xs text-gray-800 font-semibold truncate">
                    <ShieldCheck size={14} className="text-[#9c1dac] shrink-0" />
                    <span className="truncate">
                      {isLetterBased ? `${runningInches} Running Inches` : `${height} ft × ${width} ft (${sqFt} sq.ft)`}
                    </span>
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
                    Board Structure & Lighting
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
                    Signboard Specifications
                  </h4>
                  <ul className="text-xs text-gray-600 space-y-1">
                    <li className="flex items-center gap-1.5">
                      <CheckCircle size={13} className="text-emerald-600 shrink-0" />
                      <span>Heavy aluminum extrusion or welded MS chassis</span>
                    </li>
                    <li className="flex items-center gap-1.5">
                      <CheckCircle size={13} className="text-emerald-600 shrink-0" />
                      <span>Epistar / Samsung lens-infused waterproof LED modules</span>
                    </li>
                    <li className="flex items-center gap-1.5">
                      <CheckCircle size={13} className="text-emerald-600 shrink-0" />
                      <span>Even luminescence without hot spots or shadows</span>
                    </li>
                    <li className="flex items-center gap-1.5">
                      <CheckCircle size={13} className="text-emerald-600 shrink-0" />
                      <span>Includes external IP67 power supply (12V SMPS)</span>
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
                  <h4 className="text-xs font-bold text-gray-900">Want to lay out your LED signboard online?</h4>
                  <p className="text-[11px] text-gray-500">
                    Use K2 Studio to compose brand lettering, logos, and check illumination aesthetics with adaptive viewport scaling.
                  </p>
                </div>
              </div>
              <Link href="/studio?product=led-signboards">
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
              <span>📐 Area: {isLetterBased ? `${runningInches} Running Inches` : `${sqFt} sq.ft`}</span>
              <span className="text-[#9c1dac] font-semibold">⚡ Power Supply Included & Factory Tested</span>
              <span>🏬 Pickup or On-Site Installation in Pune & Mumbai</span>
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
              {/* Type / Variant Selector */}
              {types.length > 0 && (
                <div>
                  <Label className="text-xs font-bold text-gray-800 uppercase tracking-wider block mb-1.5">
                    1. Signboard Structure / Variant
                  </Label>
                  <Select value={selectedType} onValueChange={setSelectedType}>
                    <SelectTrigger className="w-full text-xs font-medium">
                      <SelectValue placeholder="Select Signboard Specification" />
                    </SelectTrigger>
                    <SelectContent>
                      {types.map((t) => (
                        <SelectItem key={t.value} value={t.value} className="text-xs">
                          {t.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              )}

              {/* Dimensions or Running Inches */}
              {isLetterBased ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <Label className="text-xs font-bold text-gray-800 uppercase tracking-wider block mb-1.5">
                      Total Running Inches
                    </Label>
                    <Input
                      type="number"
                      min={10}
                      max={600}
                      value={runningInches}
                      onChange={(e) => setRunningInches(Number(e.target.value) || 10)}
                      className="font-bold h-10"
                    />
                  </div>
                  <div>
                    <Label className="text-xs font-bold text-gray-800 uppercase tracking-wider block mb-1.5">
                      Approximate Letter Count
                    </Label>
                    <Input
                      type="number"
                      min={1}
                      max={100}
                      value={letterCount}
                      onChange={(e) => setLetterCount(Number(e.target.value) || 1)}
                      className="font-bold h-10"
                    />
                  </div>
                </div>
              ) : (
                <div>
                  <Label className="text-xs font-bold text-gray-800 uppercase tracking-wider block mb-1.5">
                    2. Dimensions (Feet)
                  </Label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <span className="text-[11px] text-gray-500">Height (Feet)</span>
                      <Input
                        type="number"
                        min={1}
                        max={20}
                        step={0.5}
                        value={height}
                        onChange={(e) => setHeight(Number(e.target.value) || 1)}
                        className="mt-1 font-bold h-10"
                      />
                    </div>
                    <div>
                      <span className="text-[11px] text-gray-500">Width (Feet)</span>
                      <Input
                        type="number"
                        min={1}
                        max={50}
                        step={0.5}
                        value={width}
                        onChange={(e) => setWidth(Number(e.target.value) || 1)}
                        className="mt-1 font-bold h-10"
                      />
                    </div>
                  </div>

                  <div className="mt-2 flex items-center justify-between bg-purple-50 border border-purple-100 rounded-lg p-2.5 text-xs">
                    <span className="text-gray-600 font-medium">Calculated Area:</span>
                    <span className="font-bold text-purple-900">{sqFt} sq.ft per board</span>
                  </div>
                </div>
              )}

              {/* Illumination LED Color */}
              <div>
                <Label className="text-xs font-bold text-gray-800 uppercase tracking-wider block mb-1.5">
                  3. LED Illumination Color Temperature
                </Label>
                <Select value={lightingTemp} onValueChange={setLightingTemp}>
                  <SelectTrigger className="w-full text-xs font-medium">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="cool_white" className="text-xs">Cool White 6500K (Bright Commercial Visibility)</SelectItem>
                    <SelectItem value="warm_white" className="text-xs">Warm White 3000K (Boutique, Hospitality & Warm Glow)</SelectItem>
                    <SelectItem value="daylight" className="text-xs">Natural Daylight 4000K (Balanced Architectural)</SelectItem>
                    <SelectItem value="rgb" className="text-xs">RGB Multi-Color (Programmable Mood Lighting)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Quantity */}
              <div>
                <Label className="text-xs font-bold text-gray-800 uppercase tracking-wider block mb-1.5">
                  4. Quantity (Number of Signboards)
                </Label>
                <Input
                  type="number"
                  min={1}
                  max={50}
                  value={quantity}
                  onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                  className="font-bold h-10 w-full sm:w-48"
                />
              </div>

              {/* Installation Option */}
              <div className="pt-2 border-t border-gray-100">
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl border border-gray-200/80">
                  <div>
                    <strong className="text-xs text-gray-900 block">Include On-Site Wall Anchor Installation (+₹1,500/unit)</strong>
                    <span className="text-[11px] text-gray-500">Professional mounting team with safety harness, anchor bolts & electrical wiring across Pune & Mumbai.</span>
                  </div>
                  <input
                    type="checkbox"
                    checked={includeInstallation}
                    onChange={(e) => setIncludeInstallation(e.target.checked)}
                    className="h-5 w-5 rounded border-gray-300 text-purple-600 focus:ring-purple-500 cursor-pointer"
                  />
                </div>
              </div>

              {/* 3-Way Artwork Ingestion Section */}
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
                      <p className="text-xs text-gray-500 mt-1">PDF, AI, CDR, TIFF, or JPG.</p>
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
                      <p className="text-xs text-gray-500 mt-1">Customize text, logos & templates.</p>
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
                        Design storefront typography and illuminated signage with responsive auto-fit canvas.
                      </p>
                    </div>
                    <Link href="/studio?product=led-signboards">
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
                        Professional Signage Design Service (+ ₹299 design fee)
                      </h4>
                      <p className="text-xs text-amber-800 mt-0.5">
                        Our Senior Graphic Artists will prepare a bespoke signage layout and WhatsApp you digital proofs within 2-4 hours.
                      </p>
                    </div>
                    <div className="space-y-3 pt-1">
                      <textarea
                        rows={3}
                        className="w-full p-2.5 text-xs rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-600 bg-white"
                        placeholder="Provide company name, tagline, logo files or illumination preferences..."
                        value={designerBrief}
                        onChange={(e) => setDesignerBrief(e.target.value)}
                      />
                      <Input
                        placeholder="WhatsApp Number for Signage Proof (+91 98765 43210)"
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
                {calcLoading ? "Updating..." : "Verified Rate"}
              </Chip>
            </div>

            <div className="p-6 space-y-4">
              <div className="flex justify-between items-baseline border-b border-gray-100 pb-3">
                <span className="text-gray-600 text-sm">Calculated Quantity:</span>
                <span className="font-bold text-gray-900 text-lg">
                  {quantity} units ({isLetterBased ? `${runningInches} in` : `${sqFt} sq.ft`} each)
                </span>
              </div>

              <div className="flex justify-between items-baseline border-b border-gray-100 pb-3">
                <span className="text-gray-600 text-sm">Effective Unit Rate:</span>
                <span className="font-semibold text-purple-700">
                  ₹{(effectiveSubtotal / quantity).toFixed(2)} / unit
                </span>
              </div>

              {/* Itemized Breakdown */}
              <div className="space-y-2 py-2">
                <Label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Itemized Breakdown</Label>
                <div className="flex justify-between text-xs text-gray-600">
                  <span className="truncate max-w-[200px]">{selectedType || title}</span>
                  <span className="font-medium text-gray-800">₹{(quote?.basePrice || 0).toFixed(2)}</span>
                </div>
                {includeInstallation && (
                  <div className="flex justify-between text-xs text-gray-600">
                    <span>On-Site Wall Mounting & Electrical</span>
                    <span className="font-medium text-gray-800">₹{(quote?.installationFee || 0).toFixed(2)}</span>
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
                  <span className="font-medium">₹{effectiveSubtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>GST (18%):</span>
                  <span className="font-medium">₹{effectiveGst.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-lg font-bold text-gray-900 pt-2 border-t">
                  <span>Total Amount:</span>
                  <span className="text-purple-700 font-extrabold">₹{effectiveGrandTotal.toFixed(2)}</span>
                </div>
                <p className="text-[11px] text-gray-400 text-right">Inclusive of all applicable taxes</p>
              </div>

              <div className="pt-4 space-y-2">
                <Button
                  onClick={handleAddToCartAndProceed}
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
