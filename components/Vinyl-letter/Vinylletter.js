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
  Scissors,
  Layers,
  UploadCloud,
  ChevronRight,
  Type,
  Palette,
  Eye,
  ShoppingBag,
  ArrowRight,
  Calculator,
  Check,
  Brush,
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
import { Vinyllettercalculation } from "@/lib/API/Vinyl-letter/Vinylletter";

// Real High-Resolution Generated Product Images
import VinylGoldSilverImg from "../../public/images/vinyl-letters-gold-silver.jpg";
import VinylMultiColourImg from "../../public/images/vinyl-letters-multicolour.jpg";
import VinylSingleColourImg from "../../public/images/vinyl-letters-single-colour.jpg";

const PRODUCT_GALLERY = [
  {
    src: VinylGoldSilverImg,
    label: "Metallic Gold & Silver",
    tag: "Mirror Finish Titanium Chrome Foil",
    desc: "Mirror finish and brushed chrome architectural vinyl"
  },
  {
    src: VinylMultiColourImg,
    label: "Multi-Colour Decals",
    tag: "Layered Outdoor Storefront Graphics",
    desc: "Layered outdoor durable retail vinyl graphics"
  },
  {
    src: VinylSingleColourImg,
    label: "Single Colour Die-Cut",
    tag: "Pre-Masked Transfer Application Tape",
    desc: "Matte/Gloss solid color with squeegee transfer"
  }
];

const VINYL_TYPES = [
  {
    value: "1 Colour",
    label: "1 Colour (Single Tone Matte/Gloss)",
    ratePerSqInch: 0.85,
    minPrice: 150,
    desc: "Precision plotter-cut letters in solid colors (Black, White, Red, Blue, Yellow, Green)"
  },
  {
    value: "Multi Colour",
    label: "Multi Colour (Layered & Multi-Tone)",
    ratePerSqInch: 1.35,
    minPrice: 250,
    desc: "Multi-layer die-cut vinyl typography for vibrant storefront branding"
  },
  {
    value: "Gold & Silver",
    label: "Gold & Silver (Metallic Chrome / Mirror)",
    ratePerSqInch: 1.85,
    minPrice: 350,
    desc: "Reflective mirror gold, brushed silver, and rose-gold architectural foil"
  }
];

const FONTS = [
  { id: "font-sans", name: "Modern Clean Sans" },
  { id: "font-impact", name: "Bold Impact Display" },
  { id: "font-serif", name: "Luxury Serif" },
  { id: "font-mono", name: "Industrial Monospace" }
];

const COLOR_SWATCHES = {
  "1 Colour": [
    { name: "Matte Black", hex: "#111827" },
    { name: "Pure White", hex: "#FFFFFF" },
    { name: "Signal Red", hex: "#DC2626" },
    { name: "Royal Blue", hex: "#2563EB" },
    { name: "Sun Yellow", hex: "#EAB308" },
    { name: "Emerald Green", hex: "#16A34A" }
  ],
  "Multi Colour": [
    { name: "Corporate Duo (Navy & Gold)", hex: "#1E3A8A" },
    { name: "Vibrant Retail (Cyan & Magenta)", hex: "#06B6D4" },
    { name: "High Contrast (Black & Yellow)", hex: "#CA8A04" }
  ],
  "Gold & Silver": [
    { name: "Mirror Finish Titanium Gold", hex: "#D4AF37" },
    { name: "Brushed Chrome Silver", hex: "#E2E8F0" },
    { name: "Reflective Rose Gold", hex: "#FB7185" }
  ]
};

export default function Vinylletter() {
  const router = useRouter();

  // Customization Form State
  const [selectedType, setSelectedType] = useState("1 Colour");
  const [customText, setCustomText] = useState("K2 SIGN & PRINT");
  const [selectedFont, setSelectedFont] = useState("font-sans");
  const [selectedColor, setSelectedColor] = useState(COLOR_SWATCHES["1 Colour"][0].name);

  // Dimensions
  const [unit, setUnit] = useState("Inches"); // 'Inches' | 'Feet'
  const [heightInput, setHeightInput] = useState("6");
  const [widthInput, setWidthInput] = useState("24");
  const [quantity, setQuantity] = useState(1);

  // Add-ons
  const [includeSqueegee, setIncludeSqueegee] = useState(true);
  const [includeInstallation, setIncludeInstallation] = useState(false);
  const [galleryImageIdx, setGalleryImageIdx] = useState(0);

  // 3-Way Artwork Ingestion State
  const [designMode, setDesignMode] = useState("upload");
  const [uploadedArtwork, setUploadedArtwork] = useState(null);
  const [designerBrief, setDesignerBrief] = useState("");
  const [designerPhone, setDesignerPhone] = useState("");

  const [isCalculating, setIsCalculating] = useState(false);
  const [apiTotal, setApiTotal] = useState(null);
  const [calcNotice, setCalcNotice] = useState("");

  // Normalize Dimensions to Inches
  const heightInches = useMemo(() => {
    const val = parseFloat(heightInput) || 0;
    return unit === "Feet" ? val * 12 : val;
  }, [heightInput, unit]);

  const widthInches = useMemo(() => {
    const val = parseFloat(widthInput) || 0;
    return unit === "Feet" ? val * 12 : val;
  }, [widthInput, unit]);

  const totalSqInches = useMemo(() => {
    return Math.max(1, Math.round(heightInches * widthInches));
  }, [heightInches, widthInches]);

  const totalSqFeet = useMemo(() => {
    return (totalSqInches / 144).toFixed(2);
  }, [totalSqInches]);

  const currentTypeConfig = useMemo(() => {
    return VINYL_TYPES.find((t) => t.value === selectedType) || VINYL_TYPES[0];
  }, [selectedType]);

  // When type changes, ensure valid color selection
  useEffect(() => {
    const swatches = COLOR_SWATCHES[selectedType] || COLOR_SWATCHES["1 Colour"];
    if (!swatches.some((s) => s.name === selectedColor)) {
      setSelectedColor(swatches[0].name);
    }
  }, [selectedType, selectedColor]);

  // Calculate Price via Backend API with Resilient Local Fallback
  useEffect(() => {
    let isCancelled = false;

    if (heightInches <= 0 || widthInches <= 0) {
      setApiTotal(null);
      setCalcNotice("");
      return;
    }

    const runCalculation = async () => {
      setIsCalculating(true);
      try {
        const payload = {
          type: selectedType,
          height: Math.round(heightInches),
          width: Math.round(widthInches)
        };
        const res = await Vinyllettercalculation(payload);

        if (!isCancelled) {
          if (res?.status && res?.data?.totalPrice) {
            setApiTotal(Number(res.data.totalPrice));
            setCalcNotice("Live rate verified with K2 factory server");
          } else {
            const baseRate = currentTypeConfig.ratePerSqInch;
            const rawPrice = totalSqInches * baseRate;
            const finalBase = Math.max(rawPrice, currentTypeConfig.minPrice);
            setApiTotal(Math.round(finalBase));
            setCalcNotice("Factory rate matrix applied (Offline standard)");
          }
        }
      } catch (err) {
        if (!isCancelled) {
          const baseRate = currentTypeConfig.ratePerSqInch;
          const rawPrice = totalSqInches * baseRate;
          const finalBase = Math.max(rawPrice, currentTypeConfig.minPrice);
          setApiTotal(Math.round(finalBase));
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
  }, [selectedType, heightInches, widthInches, currentTypeConfig, totalSqInches]);

  // Final Pricing Summary with Discounts, Add-ons & Taxes
  const designFee = designMode === "hire_designer" ? 299 : 0;
  const pricing = useMemo(() => {
    const basePerUnit = apiTotal || currentTypeConfig.minPrice;
    const subtotalRaw = basePerUnit * quantity;

    let discountPercent = 0;
    if (quantity >= 10) discountPercent = 15;
    else if (quantity >= 5) discountPercent = 10;

    const discountAmount = Math.round((subtotalRaw * discountPercent) / 100);
    const discountedSubtotal = subtotalRaw - discountAmount;

    const squeegeeCost = includeSqueegee ? 80 * quantity : 0;
    const installationCost = includeInstallation ? 450 : 0;
    const totalBeforeTax = discountedSubtotal + squeegeeCost + installationCost + designFee;

    const gst = Math.round(totalBeforeTax * 0.18);
    const grandTotal = totalBeforeTax + gst;

    return {
      basePerUnit,
      subtotalRaw,
      discountPercent,
      discountAmount,
      squeegeeCost,
      installationCost,
      totalBeforeTax,
      gst,
      grandTotal
    };
  }, [apiTotal, currentTypeConfig.minPrice, quantity, includeSqueegee, includeInstallation, designFee]);

  // Cart Handler
  const handleAddToCart = () => {
    const cartItem = {
      id: `vinyl-${Date.now()}`,
      name: `Custom Vinyl Letters & Decals (${selectedType})`,
      category: "vinyl-letters",
      slug: "vinyl-letters-and-numbers",
      specs: [
        { label: "Vinyl Type", value: selectedType },
        { label: "Dimensions", value: `${heightInput} × ${widthInput} ${unit} (${totalSqInches} sq.in)` },
        { label: "Color / Finish", value: selectedColor },
        { label: "Lettering Text", value: customText || "Custom Vector Artwork" },
        { label: "Transfer Tape", value: "Pre-Masked Application Tape Included Free" },
        { label: "Pro Squeegee", value: includeSqueegee ? "Included (+₹80)" : "None" },
        { label: "Artwork Path", value: designMode === "upload" ? (uploadedArtwork?.name || "Ready Artwork File") : designMode === "studio" ? "Designed in K2 Studio" : "K2 Graphic Artist Assisted" }
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
            <Link href="/" className="hover:text-purple-700 transition">Home</Link>
            <ChevronRight size={12} />
            <Link href="/categories/vinyl-letters" className="hover:text-purple-700 transition">Vinyl Graphics</Link>
            <ChevronRight size={12} />
            <span className="text-gray-900 font-medium">Vinyl Letters & Numbers</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight">
            Custom Plotter-Cut Vinyl Letters & Numbers
          </h1>
          <p className="text-xs sm:text-sm text-gray-600 mt-1">
            Precision die-cut adhesive vinyl lettering pre-masked with semi-rigid transfer tape for vehicles, windows & storefronts.
          </p>
        </div>

        <Link
          href="/categories/vinyl-letters"
          className="text-xs font-semibold text-purple-700 hover:text-purple-900 bg-purple-50 hover:bg-purple-100 px-3.5 py-1.5 rounded-full transition"
        >
          ← All Vinyl Letters
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
                  <Scissors size={18} />
                </div>
                <div>
                  <h3 className="font-bold text-sm text-gray-900 flex items-center gap-2">
                    Commercial Die-Cut Vinyl Decals
                    <span className="text-[10px] bg-purple-100 text-[#9c1dac] font-bold px-2 py-0.5 rounded-full border border-purple-200">
                      Pre-Masked
                    </span>
                  </h3>
                  <p className="text-[11px] text-gray-500">Includes clear transfer application tape for bubble-free mounting</p>
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
                  src={PRODUCT_GALLERY[galleryImageIdx].src}
                  alt={PRODUCT_GALLERY[galleryImageIdx].label}
                  fill
                  priority
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                
                {/* Floating Angle Tag */}
                <div className="absolute top-3 left-3 bg-black/75 backdrop-blur-md text-white text-[10px] font-bold px-2.5 py-1 rounded-full shadow-sm">
                  {PRODUCT_GALLERY[galleryImageIdx].tag}
                </div>

                {/* Pre-press / Material resolution badge */}
                <div className="absolute bottom-3 left-3 right-3 bg-white/90 backdrop-blur-md border border-gray-200/80 rounded-xl p-2.5 flex items-center justify-between shadow-xs">
                  <div className="flex items-center gap-1.5 text-xs text-gray-800 font-semibold truncate">
                    <ShieldCheck size={14} className="text-[#9c1dac] shrink-0" />
                    <span className="truncate">{widthInput} × {heightInput} {unit} ({totalSqInches} sq.in)</span>
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
                    Vinyl Finishes & Materials
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {PRODUCT_GALLERY.map((imgItem, idx) => (
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
                    Vinyl Lettering Highlights
                  </h4>
                  <ul className="text-xs text-gray-600 space-y-1">
                    <li className="flex items-center gap-1.5">
                      <CheckCircle size={13} className="text-emerald-600 shrink-0" />
                      <span>70-Micron Premium Polymeric Exterior Vinyl</span>
                    </li>
                    <li className="flex items-center gap-1.5">
                      <CheckCircle size={13} className="text-emerald-600 shrink-0" />
                      <span>Pre-weeded & masked with clear transfer application tape</span>
                    </li>
                    <li className="flex items-center gap-1.5">
                      <CheckCircle size={13} className="text-emerald-600 shrink-0" />
                      <span>5+ Year outdoor UV & car-wash weatherproof durability</span>
                    </li>
                    <li className="flex items-center gap-1.5">
                      <CheckCircle size={13} className="text-emerald-600 shrink-0" />
                      <span>Applies seamlessly to glass, vehicles, acrylic & metal</span>
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
                  <h4 className="text-xs font-bold text-gray-900">Want to design this vinyl decal online?</h4>
                  <p className="text-[11px] text-gray-500">
                    Use K2 Studio to type slogan text, select fonts, adjust letter kerning, or drop logos and export plotter cut paths.
                  </p>
                </div>
              </div>
              <Link href="/studio?product=vinyl-letters">
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
              <span>📐 Size: {widthInput} × {heightInput} {unit} ({totalSqInches} sq.in)</span>
              <span className="text-[#9c1dac] font-semibold">⚡ Precision Graphtec / Roland Plotter Cut</span>
              <span>🏬 Pickup or Express Courier Across India</span>
            </div>
          </div>

          {/* CONFIGURE SPECIFICATIONS CARD */}
          <div className="shadow-md border border-gray-200/90 bg-white rounded-2xl overflow-hidden p-6 space-y-6">
            <div className="border-b border-gray-100 pb-4">
              <h3 className="text-xl font-bold flex items-center gap-2 text-gray-900">
                <Layers className="text-purple-700" size={22} />
                <span>Configure Specifications: Custom Vinyl Letters & Decals</span>
              </h3>
            </div>

            <div className="space-y-6">
              {/* 1. Vinyl Grade & Finish */}
              <div>
                <Label className="text-xs font-bold text-gray-800 uppercase tracking-wider block mb-1.5">
                  1. Vinyl Grade & Material Type
                </Label>
                <Select value={selectedType} onValueChange={setSelectedType}>
                  <SelectTrigger className="w-full text-xs font-medium">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {VINYL_TYPES.map((t) => (
                      <SelectItem key={t.value} value={t.value} className="text-xs">
                        {t.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <p className="text-[11px] text-gray-500 mt-1">{currentTypeConfig.desc}</p>
              </div>

              {/* 2. Text Input */}
              <div>
                <Label className="text-xs font-bold text-gray-800 uppercase tracking-wider block mb-1.5">
                  2. Decal Text / Letters / Numbers
                </Label>
                <Input
                  type="text"
                  value={customText}
                  onChange={(e) => setCustomText(e.target.value)}
                  placeholder="ENTER WORDS, OPENING HOURS OR VEHICLE REGISTRATION"
                  className="font-bold text-sm h-11"
                />
              </div>

              {/* 3. Color Swatch Selector */}
              <div>
                <Label className="text-xs font-bold text-gray-800 uppercase tracking-wider block mb-2">
                  3. Color / Foil Finish
                </Label>
                <div className="flex flex-wrap gap-2.5">
                  {(COLOR_SWATCHES[selectedType] || COLOR_SWATCHES["1 Colour"]).map((swatch) => {
                    const isSelected = selectedColor === swatch.name;
                    return (
                      <button
                        key={swatch.name}
                        type="button"
                        onClick={() => setSelectedColor(swatch.name)}
                        className={`flex items-center gap-2 px-3 py-1.5 rounded-xl border text-xs font-medium transition cursor-pointer ${
                          isSelected
                            ? "border-purple-600 bg-purple-50 ring-2 ring-purple-200 font-bold"
                            : "border-gray-200 bg-white hover:border-gray-300"
                        }`}
                      >
                        <span
                          className="w-3.5 h-3.5 rounded-full border border-gray-300 shrink-0"
                          style={{ backgroundColor: swatch.hex }}
                        />
                        <span className="text-gray-900">{swatch.name}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* 4. Dimensions & Unit */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <Label className="text-xs font-bold text-gray-800 uppercase tracking-wider">
                    4. Overall Artwork Dimensions
                  </Label>
                  <div className="flex items-center gap-1 bg-gray-100 p-1 rounded-lg">
                    {["Inches", "Feet"].map((u) => (
                      <button
                        key={u}
                        type="button"
                        onClick={() => setUnit(u)}
                        className={`px-2.5 py-0.5 rounded text-[10px] font-bold transition ${
                          unit === u ? "bg-white text-purple-700 shadow-xs" : "text-gray-500"
                        }`}
                      >
                        {u}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <span className="text-[11px] text-gray-500">Width ({unit})</span>
                    <Input
                      type="number"
                      min="1"
                      max={unit === "Feet" ? 50 : 600}
                      value={widthInput}
                      onChange={(e) => setWidthInput(e.target.value)}
                      className="mt-1 h-10 font-bold text-sm"
                    />
                  </div>
                  <div>
                    <span className="text-[11px] text-gray-500">Height ({unit})</span>
                    <Input
                      type="number"
                      min="1"
                      max={unit === "Feet" ? 10 : 120}
                      value={heightInput}
                      onChange={(e) => setHeightInput(e.target.value)}
                      className="mt-1 h-10 font-bold text-sm"
                    />
                  </div>
                </div>

                <div className="mt-2 flex items-center justify-between bg-purple-50 border border-purple-100 rounded-lg p-2.5 text-xs">
                  <span className="text-gray-600 font-medium">Calculated Area:</span>
                  <span className="font-bold text-purple-900">{totalSqInches} sq.in ({totalSqFeet} sq.ft)</span>
                </div>
              </div>

              {/* 5. Quantity */}
              <div>
                <Label className="text-xs font-bold text-gray-800 uppercase tracking-wider block mb-1.5">
                  5. Quantity (Sets / Decals)
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

              {/* Hardware & Application Addons */}
              <div className="pt-2 border-t border-gray-100 space-y-2">
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl border border-gray-200/80">
                  <div>
                    <strong className="text-xs text-gray-900 block">Include Professional Felt-Edge Squeegee Tool (+₹80)</strong>
                    <span className="text-[11px] text-gray-500">Scratch-free application blade designed for smooth bubble-free vinyl pressing.</span>
                  </div>
                  <input
                    type="checkbox"
                    checked={includeSqueegee}
                    onChange={(e) => setIncludeSqueegee(e.target.checked)}
                    className="h-5 w-5 rounded border-gray-300 text-purple-600 focus:ring-purple-500 cursor-pointer"
                  />
                </div>
              </div>

              {/* 3-Way Artwork Ingestion Section */}
              <div className="pt-6 border-t border-gray-100 space-y-4">
                <div>
                  <Label className="font-bold text-base text-gray-900 block mb-1">
                    Select How You Want to Prepare Your Vector Paths:
                  </Label>
                  <p className="text-xs text-gray-500">
                    Choose one of the 3 production paths below. All vector curves undergo plotter blade check.
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
                      <h4 className="font-bold text-sm text-gray-900">Upload Vector File</h4>
                      <p className="text-xs text-gray-500 mt-1">AI, CDR, EPS, SVG or vector PDF.</p>
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
                      <p className="text-xs text-gray-500 mt-1">Font styling, kerning & scale.</p>
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
                      <p className="text-xs text-gray-500 mt-1">We create vectors & share WhatsApp proof.</p>
                    </div>
                  </div>
                </div>

                {designMode === "upload" && (
                  <div className="space-y-3 pt-2">
                    <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center hover:border-purple-500 transition cursor-pointer relative bg-gray-50/50">
                      <input
                        type="file"
                        accept=".ai,.cdr,.eps,.svg,.pdf"
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
                          <p className="text-sm font-semibold text-gray-800">Drag & drop your vector cut path or click to browse</p>
                          <p className="text-xs text-gray-500 mt-1">Supports AI, CDR, EPS, SVG, vector PDF (up to 100MB)</p>
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
                        Adjust text dimensions, font families, and export precision kiss-cut outlines directly.
                      </p>
                    </div>
                    <Link href="/studio?product=vinyl-letters">
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
                        Professional Vector Conversion Service (+ ₹299 design fee)
                      </h4>
                      <p className="text-xs text-amber-800 mt-0.5">
                        Our Senior Graphic Artists will convert your image/logo into clean CNC laser cut vectors.
                      </p>
                    </div>
                    <div className="space-y-3 pt-1">
                      <textarea
                        rows={3}
                        className="w-full p-2.5 text-xs rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-600 bg-white"
                        placeholder="Provide font names, brand guidelines, vehicle surface details..."
                        value={designerBrief}
                        onChange={(e) => setDesignerBrief(e.target.value)}
                      />
                      <Input
                        placeholder="WhatsApp Number for Vector Proof Review (+91 98765 43210)"
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
                {isCalculating ? "Updating..." : "Verified Rate"}
              </Chip>
            </div>

            <div className="p-6 space-y-4">
              <div className="flex justify-between items-baseline border-b border-gray-100 pb-3">
                <span className="text-gray-600 text-sm">Calculated Quantity:</span>
                <span className="font-bold text-gray-900 text-lg">{quantity} sets ({totalSqInches} sq.in each)</span>
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
                  <span className="truncate max-w-[200px]">Die-Cut Vinyl ({selectedType})</span>
                  <span className="font-medium text-gray-800">₹{pricing.subtotalRaw.toFixed(2)}</span>
                </div>
                {pricing.discountAmount > 0 && (
                  <div className="flex justify-between text-xs text-emerald-700 font-semibold">
                    <span>Volume Discount ({pricing.discountPercent}%)</span>
                    <span>-₹{pricing.discountAmount.toFixed(2)}</span>
                  </div>
                )}
                {includeSqueegee && (
                  <div className="flex justify-between text-xs text-gray-600">
                    <span>Felt Application Squeegee</span>
                    <span className="font-medium text-gray-800">₹{pricing.squeegeeCost.toFixed(2)}</span>
                  </div>
                )}
                {designFee > 0 && (
                  <div className="flex justify-between text-xs text-amber-800 font-semibold bg-amber-50 p-1.5 rounded">
                    <span>K2 Graphic Artist Vector Service</span>
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
