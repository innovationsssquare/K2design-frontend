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
  Printer
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
import MediaPrintingImg from "../../public/images/MediaPrinting.png";
import FlexBannerImg from "../../public/images/FLEX (Banner).png";
import FlexAndRelatedImg from "../../public/images/Flex&Related.png";

export default function MediaPrintConfigurator({
  productSlug = "vinyl-print",
  title = "Commercial Vinyl & Media Printing",
  subtitle = "High-definition wide-format eco-solvent & UV prints on self-adhesive vinyl, canvas, backlit films, and reflective media.",
  types = [],
  baseRates = {},
  surfaceOptions = [
    { value: "Vinyl Print", label: "Media Only (Roll / Die-Cut Sheet)" },
    { value: "Foamsheet3mm", label: "Mounted on 3mm Sunboard / PVC Foam Sheet" },
    { value: "Foamsheet5mm", label: "Mounted on 5mm Heavy Sunboard Foam Sheet" },
    { value: "ACP3mm", label: "Mounted on 3mm Aluminium Composite Panel (ACP)" }
  ],
  surfaceRates = {
    "Vinyl Print": 0,
    Foamsheet3mm: 35,
    Foamsheet5mm: 60,
    ACP3mm: 130
  },
  calculateApi = null,
  highlights = [
    "High-Density Japanese Eco-Solvent / UV Ink Technology (1440 DPI)",
    "Vibrant Long-Life Pigments Resistant to Fading, Water & Scuffs",
    "Choice of Cold Protective Lamination (Ultra-Gloss or Anti-Glare Matte)",
    "Suitable for Indoor Retail POS, Wall Murals, Hoardings & Fleet Graphics"
  ]
}) {
  const router = useRouter();

  // Selected Type
  const [selectedType, setSelectedType] = useState(types[0]?.value || "");
  const [selectedSurface, setSelectedSurface] = useState(surfaceOptions[0]?.value || "Vinyl Print");
  const [lamination, setLamination] = useState("gloss"); // 'gloss' | 'matte' | 'none'
  const [unitMode, setUnitMode] = useState("feet"); // 'feet' | 'inches'
  const [height, setHeight] = useState(3);
  const [width, setWidth] = useState(4);
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

  // Convert to sq.ft
  const sqFt = useMemo(() => {
    const h = parseFloat(height) || 0;
    const w = parseFloat(width) || 0;
    if (unitMode === "inches") {
      return Number(((h * w) / 144).toFixed(2));
    }
    return Number((h * w).toFixed(2));
  }, [height, width, unitMode]);

  const galleryImages = [
    { src: MediaPrintingImg, label: "Wide-Format Media Print", tag: "1440 DPI Eco-Solvent" },
    { src: FlexBannerImg, label: "Commercial Roll Vinyl", tag: "Scratch-Resistant Lamination" },
    { src: FlexAndRelatedImg, label: "Retail Graphics Display", tag: "Direct Board Mount" }
  ];

  // Dynamic Quote Calculation
  useEffect(() => {
    let isCancelled = false;

    async function computeQuote() {
      setCalcLoading(true);

      if (sqFt > 0 && sqFt < 1) {
        setErrorMessage("Minimum order size is 1 sq.ft for media prints.");
        setCalcLoading(false);
        return;
      }
      setErrorMessage("");

      const effectiveRate = baseRates[selectedType] || 45;
      const surfaceRate = surfaceRates[selectedSurface] || 0;
      const laminationRate = lamination === "none" ? 0 : 8; // ₹8 per sq.ft for lamination

      let calculatedBasePrice = 0;

      if (calculateApi) {
        try {
          const res = await calculateApi({
            type: selectedType,
            rigidSurface: selectedSurface,
            height: Number(height),
            width: Number(width),
            qty: Number(quantity)
          });
          if (!isCancelled && res && (res.totalPrice || res.data?.totalPrice)) {
            calculatedBasePrice = res.totalPrice || res.data.totalPrice;
          } else {
            const unitRateTotal = effectiveRate + surfaceRate + laminationRate;
            calculatedBasePrice = Math.max(sqFt, 1) * unitRateTotal;
          }
        } catch (e) {
          const unitRateTotal = effectiveRate + surfaceRate + laminationRate;
          calculatedBasePrice = Math.max(sqFt, 1) * unitRateTotal;
        }
      } else {
        const unitRateTotal = effectiveRate + surfaceRate + laminationRate;
        calculatedBasePrice = Math.max(sqFt, 1) * unitRateTotal;
      }

      const subtotalBeforeAddons = calculatedBasePrice * quantity;
      const subtotal = Math.round(subtotalBeforeAddons);
      const gst = Math.round(subtotal * 0.18);
      const grandTotal = subtotal + gst;

      if (!isCancelled) {
        setQuote({
          effectiveRate,
          surfaceRate,
          laminationRate,
          basePrice: Math.max(sqFt, 1) * effectiveRate * quantity,
          surfaceCost: Math.max(sqFt, 1) * surfaceRate * quantity,
          laminationCost: Math.max(sqFt, 1) * laminationRate * quantity,
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
  }, [selectedType, selectedSurface, lamination, height, width, unitMode, quantity, sqFt, baseRates, surfaceRates, calculateApi]);

  const designFee = designMode === "hire_designer" ? 299 : 0;
  const effectiveSubtotal = (quote?.subtotal || 0) + designFee;
  const effectiveGst = Math.round(effectiveSubtotal * 0.18);
  const effectiveGrandTotal = effectiveSubtotal + effectiveGst;

  const handleAddToCartAndProceed = () => {
    const specs = [
      { label: "Print Media Type", value: selectedType || title },
      {
        label: "Substrate / Mounting",
        value: surfaceOptions.find((s) => s.value === selectedSurface)?.label || selectedSurface
      },
      {
        label: "Dimensions",
        value: `${height} × ${width} ${unitMode} (${sqFt} sq.ft per print)`
      },
      {
        label: "Protective Lamination",
        value:
          lamination === "gloss"
            ? "High-Gloss UV Protective Film"
            : lamination === "matte"
            ? "Anti-Glare Velvet Matte Film"
            : "No Lamination (Raw Media)"
      },
      { label: "Calculated Quantity", value: `${quantity} ${quantity === 1 ? "Print" : "Prints"}` },
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
      name: `${title} - ${selectedType}`,
      category: "Media Printing",
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
            <Link href="/categories/media-printing" className="hover:text-purple-700 transition">
              Media Printing
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
          href="/categories/media-printing"
          className="text-xs font-semibold text-purple-700 hover:text-purple-900 bg-purple-50 hover:bg-purple-100 px-3.5 py-1.5 rounded-full transition"
        >
          ← All Media Printing
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
                  <Printer size={18} />
                </div>
                <div>
                  <h3 className="font-bold text-sm text-gray-900 flex items-center gap-2">
                    Wide-Format Commercial Digital Printing
                    <span className="text-[10px] bg-purple-100 text-[#9c1dac] font-bold px-2 py-0.5 rounded-full border border-purple-200">
                      1440 DPI
                    </span>
                  </h3>
                  <p className="text-[11px] text-gray-500">
                    High-definition Roland & Mimaki eco-solvent inkjet printing with protective overlay
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-xs text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-1 rounded-full font-semibold flex items-center gap-1">
                  <CheckCircle size={13} />
                  <span>Color Calibrated</span>
                </span>
                <span className="text-xs text-purple-700 bg-purple-50 border border-purple-200 px-2.5 py-1 rounded-full font-semibold">
                  Factory Direct
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
                    Product Views & Finishes
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
                    Want to create layout, banners or poster artwork online?
                  </h4>
                  <p className="text-[11px] text-gray-600">
                    Open K2 Studio with pre-configured print canvas, vector tools & instant cloud export.
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
                Configure Media & Print Specifications
              </h3>
              <p className="text-xs text-gray-500">
                Choose print grade, backing surface, protective lamination and dimensions
              </p>
            </div>

            {/* Form Fields Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {/* Media Type Selection */}
              <div className="space-y-1.5">
                <Label className="text-xs font-bold text-gray-700">Media / Print Grade</Label>
                <Select value={selectedType} onValueChange={(val) => setSelectedType(val)}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select print type" />
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

              {/* Rigid Surface / Substrate */}
              <div className="space-y-1.5">
                <Label className="text-xs font-bold text-gray-700">Backing / Mounting Substrate</Label>
                <Select value={selectedSurface} onValueChange={(val) => setSelectedSurface(val)}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select surface" />
                  </SelectTrigger>
                  <SelectContent>
                    {surfaceOptions.map((opt) => (
                      <SelectItem key={opt.value} value={opt.value}>
                        {opt.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Protective Lamination */}
              <div className="space-y-1.5">
                <Label className="text-xs font-bold text-gray-700">Surface Lamination</Label>
                <Select value={lamination} onValueChange={(val) => setLamination(val)}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select lamination" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="gloss">Gloss Protective Lamination (Adds Pop & Depth)</SelectItem>
                    <SelectItem value="matte">Matte Anti-Glare Lamination (Soft Velvet Elegance)</SelectItem>
                    <SelectItem value="none">No Lamination (Raw Media)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Quantity */}
              <div className="space-y-1.5">
                <Label className="text-xs font-bold text-gray-700">Quantity (Prints)</Label>
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
                        {q} {q === 1 ? "Print" : "Prints"}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Dimensions Section */}
              <div className="md:col-span-2 p-4 bg-gray-50/80 rounded-xl border border-gray-200 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <Ruler size={16} className="text-[#9c1dac]" />
                    <span className="text-xs font-bold text-gray-800">Print Dimensions & Square Footage</span>
                  </div>
                  {/* Unit Toggle */}
                  <div className="flex items-center bg-gray-200/80 p-0.5 rounded-lg text-xs font-semibold">
                    <button
                      type="button"
                      onClick={() => setUnitMode("feet")}
                      className={`px-3 py-1 rounded-md transition ${
                        unitMode === "feet"
                          ? "bg-white text-purple-700 shadow-xs font-bold"
                          : "text-gray-600 hover:text-gray-900"
                      }`}
                    >
                      Feet (ft)
                    </button>
                    <button
                      type="button"
                      onClick={() => setUnitMode("inches")}
                      className={`px-3 py-1 rounded-md transition ${
                        unitMode === "inches"
                          ? "bg-white text-purple-700 shadow-xs font-bold"
                          : "text-gray-600 hover:text-gray-900"
                      }`}
                    >
                      Inches (in)
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 items-center">
                  <div className="space-y-1">
                    <Label className="text-[11px] font-semibold text-gray-600">
                      Height ({unitMode})
                    </Label>
                    <Input
                      type="number"
                      step={unitMode === "feet" ? "0.5" : "1"}
                      min="1"
                      value={height}
                      onChange={(e) => setHeight(e.target.value)}
                      className="bg-white"
                    />
                  </div>

                  <div className="space-y-1">
                    <Label className="text-[11px] font-semibold text-gray-600">
                      Width ({unitMode})
                    </Label>
                    <Input
                      type="number"
                      step={unitMode === "feet" ? "0.5" : "1"}
                      min="1"
                      value={width}
                      onChange={(e) => setWidth(e.target.value)}
                      className="bg-white"
                    />
                  </div>

                  <div className="bg-white p-2.5 rounded-lg border border-gray-200 text-center sm:text-left flex sm:flex-col justify-between sm:justify-center items-center sm:items-start">
                    <span className="text-[10px] text-gray-500 font-semibold uppercase">Total Area</span>
                    <span className="text-sm font-extrabold text-[#9c1dac]">{sqFt} Sq.Ft</span>
                  </div>
                </div>

                {errorMessage && (
                  <p className="text-xs text-rose-600 font-semibold flex items-center gap-1">
                    <ShieldAlert size={13} />
                    {errorMessage}
                  </p>
                )}
              </div>
            </div>

            {/* 3-WAY ARTWORK INGESTION MODULE */}
            <div className="pt-2 border-t border-gray-100 space-y-4">
              <div>
                <Label className="text-xs font-bold text-gray-900 block mb-1">
                  Artwork & Design Preparation
                </Label>
                <p className="text-xs text-gray-500">
                  Select how you would like to prepare your graphics for print production
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
                      Template pre-configured for {width} × {height} {unitMode} dimensions.
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
                      Our Senior Print Artists will format your layout, colors, and resolution for direct print.
                    </p>
                  </div>
                  <div className="space-y-2">
                    <textarea
                      rows={2}
                      className="w-full p-2.5 text-xs rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-600 bg-white"
                      placeholder="Enter printing instructions, headline text, color codes or logos..."
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
                  {quantity} {quantity === 1 ? "Print" : "Prints"} ({sqFt} sq.ft ea)
                </span>
              </div>

              <div className="flex justify-between items-baseline border-b border-gray-100 pb-3">
                <span className="text-gray-600 text-sm">Effective Unit Price:</span>
                <span className="font-semibold text-purple-700">
                  ₹{quantity > 0 ? (effectiveSubtotal / quantity).toFixed(2) : "0.00"} / print
                </span>
              </div>

              {/* Itemized Breakdown */}
              <div className="space-y-2 py-2">
                <Label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Itemized Breakdown
                </Label>
                <div className="flex justify-between text-xs text-gray-600">
                  <span className="truncate max-w-[210px]">{selectedType || title}</span>
                  <span className="font-medium text-gray-800">
                    ₹{(quote?.basePrice || 0).toFixed(2)}
                  </span>
                </div>
                {selectedSurface !== "Vinyl Print" && (
                  <div className="flex justify-between text-xs text-gray-600">
                    <span className="truncate max-w-[210px]">{selectedSurface} Mounting</span>
                    <span className="font-medium text-gray-800">
                      ₹{(quote?.surfaceCost || 0).toFixed(2)}
                    </span>
                  </div>
                )}
                {lamination !== "none" && (
                  <div className="flex justify-between text-xs text-gray-600">
                    <span>{lamination === "gloss" ? "Gloss Lamination" : "Matte Lamination"}</span>
                    <span className="font-medium text-gray-800">
                      ₹{(quote?.laminationCost || 0).toFixed(2)}
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

