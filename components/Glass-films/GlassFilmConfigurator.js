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
  Maximize2
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
import GlassFilmsHero from "../../public/images/GLASSFILMS.png";
import ArtFramesImg from "../../public/images/ArtFrames.png";
import CliponFramesImg from "../../public/images/CLIAPON FRAMES.png";

export default function GlassFilmConfigurator({
  productSlug = "glass-films",
  title = "Architectural Glass Films & Privacy Frosting",
  subtitle = "High-performance privacy frosted films, decorative glass manifestations, and solar sun-control window films for corporate offices and residences.",
  types = [],
  baseRates = {},
  calculateApi = null,
  highlights = [
    "Premium LG Hausys & 3M Cast Privacy Architectural Glass Film",
    "Translucent Light Transmission with 100% Visual Privacy",
    "High UV Rejection Protecting Interior Furniture & Flooring",
    "Residue-Free Removal Suitable for Rented Corporate Spaces"
  ]
}) {
  const router = useRouter();

  // Selected Type
  const [selectedType, setSelectedType] = useState(types[0]?.value || "");
  const [patternCut, setPatternCut] = useState("plain"); // 'plain' | 'plotter_lines' | 'logo_cut'
  const [includeInstallation, setIncludeInstallation] = useState(false);
  const [unitMode, setUnitMode] = useState("feet"); // 'feet' | 'inches'
  const [height, setHeight] = useState(4);
  const [width, setWidth] = useState(6);
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
    { src: GlassFilmsHero, label: "Frosted Glass Manifestation", tag: "Corporate Privacy Film" },
    { src: ArtFramesImg, label: "One-Way Vision Window", tag: "Perforated Day Privacy" },
    { src: CliponFramesImg, label: "Sun-Control Tint", tag: "Anti-Glare Solar Film" }
  ];

  // Dynamic Quote Calculation
  useEffect(() => {
    let isCancelled = false;

    async function computeQuote() {
      setCalcLoading(true);

      if (sqFt > 0 && sqFt < 1) {
        setErrorMessage("Minimum order area is 1 sq.ft for window films.");
        setCalcLoading(false);
        return;
      }
      setErrorMessage("");

      const effectiveRate = baseRates[selectedType] || 65;
      const patternCutRate = patternCut === "logo_cut" ? 25 : patternCut === "plotter_lines" ? 15 : 0;
      const installationRate = includeInstallation ? 20 : 0; // ₹20/sq.ft for installation

      let calculatedBasePrice = 0;

      if (calculateApi) {
        try {
          const res = await calculateApi({
            type: selectedType,
            height: Number(height),
            width: Number(width),
            qty: Number(quantity)
          });
          if (!isCancelled && res && (res.totalPrice || res.data?.totalPrice)) {
            calculatedBasePrice = res.totalPrice || res.data.totalPrice;
          } else {
            const unitRateTotal = effectiveRate + patternCutRate;
            calculatedBasePrice = Math.max(sqFt, 1) * unitRateTotal;
          }
        } catch (e) {
          const unitRateTotal = effectiveRate + patternCutRate;
          calculatedBasePrice = Math.max(sqFt, 1) * unitRateTotal;
        }
      } else {
        const unitRateTotal = effectiveRate + patternCutRate;
        calculatedBasePrice = Math.max(sqFt, 1) * unitRateTotal;
      }

      const installationCost = Math.max(sqFt, 1) * installationRate * quantity;
      const subtotalBeforeAddons = calculatedBasePrice * quantity + installationCost;
      const subtotal = Math.round(subtotalBeforeAddons);
      const gst = Math.round(subtotal * 0.18);
      const grandTotal = subtotal + gst;

      if (!isCancelled) {
        setQuote({
          effectiveRate,
          patternCutRate,
          installationRate,
          basePrice: Math.max(sqFt, 1) * effectiveRate * quantity,
          patternCost: Math.max(sqFt, 1) * patternCutRate * quantity,
          installationCost,
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
  }, [selectedType, patternCut, includeInstallation, height, width, unitMode, quantity, sqFt, baseRates, calculateApi]);

  const designFee = designMode === "hire_designer" ? 299 : 0;
  const effectiveSubtotal = (quote?.subtotal || 0) + designFee;
  const effectiveGst = Math.round(effectiveSubtotal * 0.18);
  const effectiveGrandTotal = effectiveSubtotal + effectiveGst;

  const handleAddToCartAndProceed = () => {
    const specs = [
      { label: "Glass Film Type", value: selectedType || title },
      {
        label: "Pattern Finishing",
        value:
          patternCut === "plain"
            ? "Solid Full-Cover Frosting"
            : patternCut === "plotter_lines"
            ? "Computer-Cut Privacy Stripe Lines"
            : "Precision Plotter Logo & Text Cutout"
      },
      {
        label: "Dimensions",
        value: `${height} × ${width} ${unitMode} (${sqFt} sq.ft per glass pane)`
      },
      {
        label: "Installation Service",
        value: includeInstallation
          ? "Professional Doorstep Installation Included"
          : "Material Only (With Application Guide & Free Squeegee)"
      },
      { label: "Glass Pane Count", value: `${quantity} ${quantity === 1 ? "Pane" : "Panes"}` },
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
      name: `${title} (${selectedType})`,
      category: "Glass Films",
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
              href="/categories/glass-films-glass-decorative"
              className="hover:text-purple-700 transition"
            >
              Glass Films & Manifestation
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
          href="/categories/glass-films-glass-decorative"
          className="text-xs font-semibold text-purple-700 hover:text-purple-900 bg-purple-50 hover:bg-purple-100 px-3.5 py-1.5 rounded-full transition"
        >
          ← All Glass Films
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
                  <Maximize2 size={18} />
                </div>
                <div>
                  <h3 className="font-bold text-sm text-gray-900 flex items-center gap-2">
                    Architectural Grade Privacy Glass Film
                    <span className="text-[10px] bg-purple-100 text-[#9c1dac] font-bold px-2 py-0.5 rounded-full border border-purple-200">
                      LG Hausys / 3M
                    </span>
                  </h3>
                  <p className="text-[11px] text-gray-500">
                    Precision computer-cut frosted films, sun control tints & one-way graphics
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-xs text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-1 rounded-full font-semibold flex items-center gap-1">
                  <CheckCircle size={13} />
                  <span>Optical Grade</span>
                </span>
                <span className="text-xs text-purple-700 bg-purple-50 border border-purple-200 px-2.5 py-1 rounded-full font-semibold">
                  Factory Verified
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
                  <span>Real Installation Sample</span>
                </div>
              </div>

              {/* Angle Selector & Bullet Points */}
              <div className="md:col-span-5 space-y-4">
                <div>
                  <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">
                    Film Variations & Effects
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
                    Want to create custom film cutouts or corporate logos?
                  </h4>
                  <p className="text-[11px] text-gray-600">
                    Open K2 Studio with pre-configured glass pane dimensions and vector plotting tools.
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
                Configure Glass Film Specifications
              </h3>
              <p className="text-xs text-gray-500">
                Choose film grade, decorative manifestation cut, glass measurements and installation
              </p>
            </div>

            {/* Form Fields Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {/* Film Type Selection */}
              <div className="space-y-1.5">
                <Label className="text-xs font-bold text-gray-700">Glass Film Product</Label>
                <Select value={selectedType} onValueChange={(val) => setSelectedType(val)}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select film type" />
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

              {/* Pattern / Manifestation Cut */}
              <div className="space-y-1.5">
                <Label className="text-xs font-bold text-gray-700">Pattern Cut / Manifestation</Label>
                <Select value={patternCut} onValueChange={(val) => setPatternCut(val)}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select pattern" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="plain">Solid Full Cover (Standard Privacy)</SelectItem>
                    <SelectItem value="plotter_lines">
                      Computer-Cut Privacy Stripe Lines (+₹15/sq.ft)
                    </SelectItem>
                    <SelectItem value="logo_cut">
                      Plotter Logo & Text Negative Cutout (+₹25/sq.ft)
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Professional Installation Option */}
              <div className="space-y-1.5">
                <Label className="text-xs font-bold text-gray-700">Installation Option</Label>
                <Select
                  value={includeInstallation ? "yes" : "no"}
                  onValueChange={(val) => setIncludeInstallation(val === "yes")}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select installation" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="no">
                      DIY Material Only (Includes Application Squeegee)
                    </SelectItem>
                    <SelectItem value="yes">
                      Doorstep Professional Installation (+₹20/sq.ft)
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Quantity */}
              <div className="space-y-1.5">
                <Label className="text-xs font-bold text-gray-700">Glass Pane Count</Label>
                <Select
                  value={String(quantity)}
                  onValueChange={(val) => setQuantity(Number(val))}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select pane count" />
                  </SelectTrigger>
                  <SelectContent>
                    {[1, 2, 3, 4, 5, 8, 10, 15, 20, 30].map((q) => (
                      <SelectItem key={q} value={String(q)}>
                        {q} {q === 1 ? "Glass Pane" : "Glass Panes"}
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
                    <span className="text-xs font-bold text-gray-800">Glass Pane Dimensions & Area</span>
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
                  Select how you would like to prepare your graphics or stripe patterns
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
                      Our Senior Architectural Artists will draft custom geometric bands, frosted logos, or gradient patterns.
                    </p>
                  </div>
                  <div className="space-y-2">
                    <textarea
                      rows={2}
                      className="w-full p-2.5 text-xs rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-600 bg-white"
                      placeholder="Enter partition layout, line spacing, company logo or frosted height..."
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
                  {quantity} {quantity === 1 ? "Pane" : "Panes"} ({sqFt} sq.ft ea)
                </span>
              </div>

              <div className="flex justify-between items-baseline border-b border-gray-100 pb-3">
                <span className="text-gray-600 text-sm">Effective Unit Price:</span>
                <span className="font-semibold text-purple-700">
                  ₹{quantity > 0 ? (effectiveSubtotal / quantity).toFixed(2) : "0.00"} / pane
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
                {patternCut !== "plain" && (
                  <div className="flex justify-between text-xs text-gray-600">
                    <span>Computer-Cut Pattern Manifestation</span>
                    <span className="font-medium text-gray-800">
                      ₹{(quote?.patternCost || 0).toFixed(2)}
                    </span>
                  </div>
                )}
                {includeInstallation && (
                  <div className="flex justify-between text-xs text-gray-600">
                    <span>Doorstep Professional Installation</span>
                    <span className="font-medium text-gray-800">
                      ₹{(quote?.installationCost || 0).toFixed(2)}
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

