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
  ShieldAlert,
  Ruler,
  Frame
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

// Real High-Resolution Photography
import ModularSignImg from "../../public/images/ModularPremiumSignProduct.png";
import ArtFramesImg from "../../public/images/ArtFrames.png";
import CliponFramesImg from "../../public/images/CLIAPON FRAMES.png";

export default function ModernSignConfigurator({
  productSlug = "opti-frames",
  title = "Modular Premium Architectural Signs",
  subtitle = "Precision extruded aluminium snap frames, curved wayfinding signs, and directory systems for contemporary corporate environments.",
  types = [
    { value: "Silver Anodised", label: "Brushed Natural Silver Anodized Aluminium", baseMultiplier: 1.0 },
    { value: "Black Powder Coated", label: "Matte Jet Black Architectural Powder Coat", baseMultiplier: 1.15 },
    { value: "Wood Effect", label: "Natural Walnut Wood Grain Hydro-Dip Effect", baseMultiplier: 1.25 }
  ],
  standardSizes = [
    { label: "A4 Size (210 × 297 mm)", value: "A4", baseCost: 450, printCost: 120 },
    { label: "A3 Size (297 × 420 mm)", value: "A3", baseCost: 750, printCost: 200 },
    { label: "A2 Size (420 × 594 mm)", value: "A2", baseCost: 1250, printCost: 350 },
    { label: "A1 Size (594 × 841 mm)", value: "A1", baseCost: 2100, printCost: 650 },
    { label: "A0 Size (841 × 1189 mm)", value: "A0", baseCost: 3600, printCost: 1100 }
  ],
  calculateApi = null,
  highlights = [
    "Precision 25mm / 32mm Spring-Loaded Aluminium Snap Profile",
    "Front-Loading Mechanism Allows Instant Graphic Changes in 10 Seconds",
    "UV-Stabilized Non-Reflective Anti-Glare PVC Protective Cover Lens",
    "Supplied with Concealed Mounting Screws & Heavy-Duty Anchors"
  ]
}) {
  const router = useRouter();

  // Selected Profile & Size
  const [selectedType, setSelectedType] = useState(types[0]?.value || "");
  const [selectedSize, setSelectedSize] = useState(standardSizes[0]?.value || "A4");
  const [includePrint, setIncludePrint] = useState(true);
  const [mountingStyle, setMountingStyle] = useState("wall"); // 'wall' | 'projected' | 'suspended'
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

  const activeSizeObj = useMemo(() => {
    return standardSizes.find((s) => s.value === selectedSize) || standardSizes[0];
  }, [selectedSize, standardSizes]);

  const activeTypeObj = useMemo(() => {
    return types.find((t) => t.value === selectedType) || types[0];
  }, [selectedType, types]);

  const galleryImages = [
    { src: ModularSignImg, label: "Snap Frame Profile", tag: "Front-Loading Aluminium" },
    { src: ArtFramesImg, label: "Architectural Wayfinding", tag: "Concealed Wall Mounting" },
    { src: CliponFramesImg, label: "Slim Display Frame", tag: "Anti-Glare Lens Included" }
  ];

  // Dynamic Quote Calculation
  useEffect(() => {
    let isCancelled = false;

    async function computeQuote() {
      setCalcLoading(true);

      const multiplier = activeTypeObj?.baseMultiplier || 1.0;
      const baseHardwareCost = Math.round((activeSizeObj?.baseCost || 450) * multiplier);
      const printCost = includePrint ? activeSizeObj?.printCost || 120 : 0;
      const mountingCost = mountingStyle === "projected" ? 350 : mountingStyle === "suspended" ? 480 : 0;

      let calculatedBasePrice = baseHardwareCost + printCost + mountingCost;

      if (calculateApi) {
        try {
          const res = await calculateApi({
            type: selectedType,
            frameLabel: activeSizeObj.label,
            qty: Number(quantity)
          });
          if (!isCancelled && res && (res.totalPrice || res.data?.totalPrice)) {
            calculatedBasePrice = res.totalPrice || res.data.totalPrice;
          }
        } catch (e) {
          // Fall back gracefully
        }
      }

      const subtotalBeforeAddons = calculatedBasePrice * quantity;
      const subtotal = Math.round(subtotalBeforeAddons);
      const gst = Math.round(subtotal * 0.18);
      const grandTotal = subtotal + gst;

      if (!isCancelled) {
        setQuote({
          baseHardwareCost: baseHardwareCost * quantity,
          printCost: printCost * quantity,
          mountingCost: mountingCost * quantity,
          subtotal,
          gst,
          grandTotal
        });
        setCalcLoading(false);
      }
    }

    computeQuote();

    return () => {
      isCancelled = true;
    };
  }, [selectedType, selectedSize, includePrint, mountingStyle, quantity, activeSizeObj, activeTypeObj, calculateApi]);

  const designFee = designMode === "hire_designer" ? 299 : 0;
  const effectiveSubtotal = (quote?.subtotal || 0) + designFee;
  const effectiveGst = Math.round(effectiveSubtotal * 0.18);
  const effectiveGrandTotal = effectiveSubtotal + effectiveGst;

  const handleAddToCartAndProceed = () => {
    const specs = [
      { label: "Product & Frame Finish", value: `${title} - ${selectedType}` },
      { label: "Frame Size", value: activeSizeObj.label },
      {
        label: "Graphic Print Insert",
        value: includePrint
          ? "High-Definition 240 GSM Photo Matte Poster Print Included"
          : "Hardware Frame Only (No Print Insert)"
      },
      {
        label: "Mounting Style",
        value:
          mountingStyle === "wall"
            ? "Concealed Wall Screws & Anchors (Included)"
            : mountingStyle === "projected"
            ? "Side Wall Flag / Projected Bracket Mount (+₹350)"
            : "Ceiling Wire Suspension Cable Kit (+₹480)"
      },
      { label: "Calculated Quantity", value: `${quantity} ${quantity === 1 ? "Frame" : "Frames"}` },
      {
        label: "Artwork Preparation",
        value:
          designMode === "upload"
            ? uploadedArtwork?.name || "Uploaded Production File"
            : designMode === "studio"
            ? "Designed in K2 Studio"
            : `K2 Senior Artist Assisted (+₹299)`
      }
    ];

    if (designMode === "hire_designer" && designerBrief) {
      specs.push({ label: "Design Brief", value: designerBrief });
    }

    const cartItem = {
      id: `${productSlug}-${Date.now()}`,
      name: `${title} (${activeSizeObj.value})`,
      category: "Modular Premium Signs",
      slug: productSlug,
      specs,
      quantity: Number(quantity),
      unitPrice: quote ? Math.round(effectiveSubtotal / quantity) : effectiveSubtotal,
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
            <Link href="/" className="hover:text-purple-700 transition">
              Home
            </Link>
            <ChevronRight size={12} />
            <Link
              href="/categories/modular-premium-sign-product"
              className="hover:text-purple-700 transition"
            >
              Modular Premium Signs
            </Link>
            <ChevronRight size={12} />
            <span className="text-gray-900 font-medium">{title}</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight">
            {title}
          </h1>
          <p className="text-xs sm:text-sm text-gray-600 mt-1">{subtitle}</p>
        </div>

        <Link
          href="/categories/modular-premium-sign-product"
          className="text-xs font-semibold text-purple-700 hover:text-purple-900 bg-purple-50 hover:bg-purple-100 px-3.5 py-1.5 rounded-full transition"
        >
          ← All Modular Signs
        </Link>
      </div>

      {/* Golden Ratio 12-Column Responsive Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-7">
        {/* Left Column: Product Photography Showcase & Configurator (8 cols on xl / 7 cols on lg) */}
        <div className="lg:col-span-7 xl:col-span-8 space-y-6">
          {/* REAL PRODUCT PHOTOGRAPHY SHOWCASE */}
          <div className="shadow-md border border-gray-200/90 bg-white rounded-2xl overflow-hidden p-6">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 border-b border-gray-100 pb-3 mb-4">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-purple-100 text-[#9c1dac] flex items-center justify-center font-bold">
                  <Frame size={18} />
                </div>
                <div>
                  <h3 className="font-bold text-sm text-gray-900 flex items-center gap-2">
                    Commercial Architectural Snap Frame
                    <span className="text-[10px] bg-purple-100 text-[#9c1dac] font-bold px-2 py-0.5 rounded-full border border-purple-200">
                      Snap-Open 4 Sides
                    </span>
                  </h3>
                  <p className="text-[11px] text-gray-500">
                    High-strength extruded aluminium with anti-glare protective lens & concealed mounting
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-xs text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-1 rounded-full font-semibold flex items-center gap-1">
                  <CheckCircle size={13} />
                  <span>Factory Verified</span>
                </span>
                <span className="text-xs text-purple-700 bg-purple-50 border border-purple-200 px-2.5 py-1 rounded-full font-semibold">
                  Pre-Assembled
                </span>
              </div>
            </div>

            {/* PRODUCT PHOTOGRAPHY HERO & THUMBNAILS */}
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

                {/* Floating Tag */}
                <div className="absolute top-3 left-3 bg-black/75 backdrop-blur-md text-white text-[10px] font-bold px-2.5 py-1 rounded-full shadow-sm">
                  {galleryImages[galleryImageIdx].tag}
                </div>

                <div className="absolute bottom-3 right-3 bg-white/90 backdrop-blur-md text-gray-800 text-[11px] font-semibold px-2.5 py-1 rounded-md shadow-xs flex items-center gap-1.5">
                  <Eye size={12} className="text-purple-600" />
                  <span>Real Production Sample</span>
                </div>
              </div>

              {/* Angle Selector & Bullet Points */}
              <div className="md:col-span-5 space-y-4">
                <div>
                  <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">
                    Profile Views & Finishes
                  </p>
                  <div className="grid grid-cols-3 gap-2">
                    {galleryImages.map((img, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => setGalleryImageIdx(idx)}
                        className={`relative aspect-square rounded-xl overflow-hidden border-2 transition-all p-0.5 ${
                          galleryImageIdx === idx
                            ? "border-[#9c1dac] shadow-md scale-102"
                            : "border-gray-200 opacity-70 hover:opacity-100"
                        }`}
                      >
                        <Image
                          src={img.src}
                          alt={img.label}
                          fill
                          className="object-cover rounded-lg"
                        />
                      </button>
                    ))}
                  </div>
                </div>

                <div className="p-3.5 bg-gray-50 rounded-xl border border-gray-200/80 space-y-2">
                  <h4 className="font-bold text-xs text-gray-900 flex items-center gap-1.5">
                    <Sparkles size={14} className="text-[#9c1dac]" />
                    Specification Highlights
                  </h4>
                  <ul className="text-[11px] text-gray-600 space-y-1.5">
                    {highlights.map((h, i) => (
                      <li key={i} className="flex items-start gap-1.5">
                        <Check size={12} className="text-emerald-600 mt-0.5 shrink-0" />
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Direct Studio Banner */}
            <div className="mt-5 p-3.5 rounded-xl bg-gradient-to-r from-purple-50 via-indigo-50 to-purple-50 border border-purple-100 flex flex-col sm:flex-row items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#9c1dac] text-white flex items-center justify-center shrink-0 shadow-sm">
                  <Palette size={20} />
                </div>
                <div>
                  <h4 className="font-bold text-xs sm:text-sm text-gray-900">
                    Want to create custom poster graphics for this frame?
                  </h4>
                  <p className="text-[11px] text-gray-600">
                    Open K2 Studio with pre-calibrated A4/A3/A2 snap frame templates and high-res vector tools.
                  </p>
                </div>
              </div>
              <Link href={`/studio?product=${productSlug}`} className="shrink-0 w-full sm:w-auto">
                <Button
                  size="sm"
                  className="w-full sm:w-auto bg-[#9c1dac] hover:bg-[#831492] text-white text-xs font-semibold px-4 py-2"
                >
                  Design in K2 Studio
                  <ArrowRight size={14} className="ml-1" />
                </Button>
              </Link>
            </div>
          </div>

          {/* CONFIGURE SPECIFICATIONS CARD */}
          <div className="shadow-md border border-gray-200/90 bg-white rounded-2xl p-6 space-y-6">
            <div className="border-b border-gray-100 pb-3">
              <h3 className="font-bold text-base text-gray-900 flex items-center gap-2">
                <Layers size={18} className="text-[#9c1dac]" />
                Configure Frame & Poster Specifications
              </h3>
              <p className="text-xs text-gray-500">
                Choose aluminium profile finish, standardized poster size, graphic insert and mounting
              </p>
            </div>

            {/* Form Fields Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {/* Frame Profile Finish */}
              <div className="space-y-1.5">
                <Label className="text-xs font-bold text-gray-700">Frame Profile & Finish</Label>
                <Select value={selectedType} onValueChange={(val) => setSelectedType(val)}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select finish" />
                  </SelectTrigger>
                  <SelectContent>
                    {types.map((t) => (
                      <SelectItem key={t.value} value={t.value}>
                        {t.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Standard Frame Size */}
              <div className="space-y-1.5">
                <Label className="text-xs font-bold text-gray-700">Standard Frame Size</Label>
                <Select value={selectedSize} onValueChange={(val) => setSelectedSize(val)}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select size" />
                  </SelectTrigger>
                  <SelectContent>
                    {standardSizes.map((s) => (
                      <SelectItem key={s.value} value={s.value}>
                        {s.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Poster Insert Option */}
              <div className="space-y-1.5">
                <Label className="text-xs font-bold text-gray-700">Graphic Print Insert</Label>
                <Select
                  value={includePrint ? "with_print" : "no_print"}
                  onValueChange={(val) => setIncludePrint(val === "with_print")}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select graphic option" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="with_print">
                      Include 240 GSM Photo Matte Poster Print (+₹{activeSizeObj?.printCost || 120})
                    </SelectItem>
                    <SelectItem value="no_print">
                      Hardware Frame Only (No Print Insert)
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Mounting Configuration */}
              <div className="space-y-1.5">
                <Label className="text-xs font-bold text-gray-700">Mounting Style</Label>
                <Select value={mountingStyle} onValueChange={(val) => setMountingStyle(val)}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select mounting" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="wall">Concealed Wall Mounting (Screws Included)</SelectItem>
                    <SelectItem value="projected">
                      Flag / Projected Wall Mount Bracket (+₹350)
                    </SelectItem>
                    <SelectItem value="suspended">
                      Ceiling Suspension Wire Kit (+₹480)
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Quantity */}
              <div className="md:col-span-2 space-y-1.5">
                <Label className="text-xs font-bold text-gray-700">Quantity (Frames)</Label>
                <Select
                  value={String(quantity)}
                  onValueChange={(val) => setQuantity(Number(val))}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select quantity" />
                  </SelectTrigger>
                  <SelectContent>
                    {[1, 2, 3, 4, 5, 10, 20, 50, 100].map((q) => (
                      <SelectItem key={q} value={String(q)}>
                        {q} {q === 1 ? "Frame" : "Frames"}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* 3-WAY ARTWORK INGESTION MODULE */}
            <div className="pt-2 border-t border-gray-100 space-y-4">
              <div>
                <Label className="text-xs font-bold text-gray-900 block mb-1">
                  Poster Artwork & Design Preparation
                </Label>
                <p className="text-xs text-gray-500">
                  Select how you would like to prepare your poster insert design
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <button
                  type="button"
                  onClick={() => setDesignMode("upload")}
                  className={`p-3.5 rounded-xl border-2 text-left transition-all ${
                    designMode === "upload"
                      ? "border-[#9c1dac] bg-purple-50/50 shadow-xs"
                      : "border-gray-200 hover:border-gray-300 bg-white"
                  }`}
                >
                  <div className="flex items-center gap-2 mb-1.5">
                    <UploadCloud
                      size={18}
                      className={designMode === "upload" ? "text-[#9c1dac]" : "text-gray-500"}
                    />
                    <span className="font-bold text-xs text-gray-900">Upload Ready File</span>
                  </div>
                  <p className="text-[11px] text-gray-500 leading-snug">
                    Upload CDR, AI, PDF, or High-Res TIFF/PNG.
                  </p>
                </button>

                <button
                  type="button"
                  onClick={() => setDesignMode("studio")}
                  className={`p-3.5 rounded-xl border-2 text-left transition-all ${
                    designMode === "studio"
                      ? "border-[#9c1dac] bg-purple-50/50 shadow-xs"
                      : "border-gray-200 hover:border-gray-300 bg-white"
                  }`}
                >
                  <div className="flex items-center gap-2 mb-1.5">
                    <Palette
                      size={18}
                      className={designMode === "studio" ? "text-[#9c1dac]" : "text-gray-500"}
                    />
                    <span className="font-bold text-xs text-gray-900">Design in Studio</span>
                  </div>
                  <p className="text-[11px] text-gray-500 leading-snug">
                    Use our free canvas editor with vectors & text.
                  </p>
                </button>

                <button
                  type="button"
                  onClick={() => setDesignMode("hire_designer")}
                  className={`p-3.5 rounded-xl border-2 text-left transition-all ${
                    designMode === "hire_designer"
                      ? "border-amber-500 bg-amber-50/60 shadow-xs"
                      : "border-gray-200 hover:border-gray-300 bg-white"
                  }`}
                >
                  <div className="flex items-center gap-2 mb-1.5">
                    <Brush
                      size={18}
                      className={designMode === "hire_designer" ? "text-amber-600" : "text-gray-500"}
                    />
                    <span className="font-bold text-xs text-gray-900">Hire Graphic Artist</span>
                  </div>
                  <p className="text-[11px] text-gray-500 leading-snug">
                    + ₹299 for custom vector layout & proof.
                  </p>
                </button>
              </div>

              {/* Sub-panel based on selection */}
              {designMode === "upload" && (
                <div className="p-4 bg-gray-50 rounded-xl border border-dashed border-gray-300 text-center space-y-2">
                  <div className="w-9 h-9 rounded-full bg-white mx-auto flex items-center justify-center text-[#9c1dac] shadow-xs">
                    <FileCheck size={18} />
                  </div>
                  <div>
                    <label className="cursor-pointer text-xs font-bold text-purple-700 hover:text-purple-800">
                      <span>Click to select artwork file</span>
                      <input
                        type="file"
                        className="hidden"
                        accept=".pdf,.cdr,.ai,.eps,.tiff,.png,.jpg"
                        onChange={(e) => {
                          if (e.target.files?.[0]) {
                            setUploadedArtwork(e.target.files[0]);
                          }
                        }}
                      />
                    </label>
                    <p className="text-[11px] text-gray-500 mt-0.5">
                      {uploadedArtwork
                        ? `Selected: ${uploadedArtwork.name} (${(
                            uploadedArtwork.size /
                            1024 /
                            1024
                          ).toFixed(2)} MB)`
                        : "Accepted: PDF, AI, CDR, TIFF, JPG (Max 50MB)"}
                    </p>
                  </div>
                </div>
              )}

              {designMode === "studio" && (
                <div className="p-4 bg-purple-50/60 rounded-xl border border-purple-200 flex flex-col sm:flex-row items-center justify-between gap-3">
                  <div>
                    <h5 className="font-bold text-xs text-purple-900">
                      Launch K2 Studio for {title}
                    </h5>
                    <p className="text-[11px] text-purple-700">
                      Template pre-configured for {activeSizeObj.label} print dimensions.
                    </p>
                  </div>
                  <Link href={`/studio?product=${productSlug}`} target="_blank">
                    <Button
                      size="sm"
                      className="bg-[#9c1dac] hover:bg-[#831492] text-white text-xs font-semibold px-4"
                    >
                      Open Studio Editor
                    </Button>
                  </Link>
                </div>
              )}

              {designMode === "hire_designer" && (
                <div className="p-4 bg-amber-50/70 rounded-xl border border-amber-200 space-y-3">
                  <div>
                    <h5 className="font-bold text-xs text-amber-900 flex items-center gap-1.5">
                      <Brush size={14} className="text-amber-700" />
                      Professional Graphic Designer Service (+₹299 fee)
                    </h5>
                    <p className="text-[11px] text-amber-800">
                      Our Senior Print Artists will design your corporate poster, wayfinding map, or promotional graphic.
                    </p>
                  </div>
                  <div className="space-y-2">
                    <textarea
                      rows={2}
                      className="w-full p-2.5 text-xs rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-600 bg-white"
                      placeholder="Enter poster headline, room names, or brand guidelines..."
                      value={designerBrief}
                      onChange={(e) => setDesignerBrief(e.target.value)}
                    />
                    <Input
                      placeholder="WhatsApp Phone Number for digital proof confirmation"
                      value={designerPhone}
                      onChange={(e) => setDesignerPhone(e.target.value)}
                      className="bg-white text-xs"
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right Column: Sticky Live Quote Summary (4 cols on xl / 5 cols on lg) */}
        <div className="lg:col-span-5 xl:col-span-4">
          <div className="shadow-lg border border-purple-200/90 bg-white lg:sticky lg:top-28 z-30 rounded-2xl overflow-hidden">
            {/* Header: Flush Edge-to-Edge with 0px top padding */}
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
                  {quantity} {quantity === 1 ? "Frame" : "Frames"} ({activeSizeObj.value})
                </span>
              </div>

              <div className="flex justify-between items-baseline border-b border-gray-100 pb-3">
                <span className="text-gray-600 text-sm">Effective Unit Price:</span>
                <span className="font-semibold text-purple-700">
                  ₹{quantity > 0 ? (effectiveSubtotal / quantity).toFixed(2) : "0.00"} / frame
                </span>
              </div>

              {/* Itemized Breakdown */}
              <div className="space-y-2 py-2">
                <Label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Itemized Breakdown
                </Label>
                <div className="flex justify-between text-xs text-gray-600">
                  <span className="truncate max-w-[210px]">{selectedType} Snap Frame</span>
                  <span className="font-medium text-gray-800">
                    ₹{(quote?.baseHardwareCost || 0).toFixed(2)}
                  </span>
                </div>
                {includePrint && (
                  <div className="flex justify-between text-xs text-gray-600">
                    <span>Photo Matte Poster Print</span>
                    <span className="font-medium text-gray-800">
                      ₹{(quote?.printCost || 0).toFixed(2)}
                    </span>
                  </div>
                )}
                {mountingStyle !== "wall" && (
                  <div className="flex justify-between text-xs text-gray-600">
                    <span>{mountingStyle === "projected" ? "Flag Bracket Kit" : "Suspension Cable Kit"}</span>
                    <span className="font-medium text-gray-800">
                      ₹{(quote?.mountingCost || 0).toFixed(2)}
                    </span>
                  </div>
                )}
                {designFee > 0 && (
                  <div className="flex justify-between text-xs text-amber-800 font-semibold bg-amber-50 p-1.5 rounded">
                    <span>K2 Graphic Artist Assisted</span>
                    <span>₹{designFee.toFixed(2)}</span>
                  </div>
                )}
              </div>

              <Divider />

              {/* Subtotal, GST & Total */}
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
                  <span className="text-purple-700 font-extrabold">
                    ₹{effectiveGrandTotal.toFixed(2)}
                  </span>
                </div>
                <p className="text-[11px] text-gray-400 text-right">
                  Inclusive of all applicable taxes
                </p>
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

