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
  Type,
  Palette,
  Ruler,
  Anchor,
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
import { Acryliclettercalculation } from "@/lib/API/Acrylic-letter/Acrylicletter";

// Real High-Resolution Photography
import AcrylicLettersHero from "../../public/images/acrylic-3d-letters.jpg";
import AcpAndAcrylicImg from "../../public/images/ACPandAcrylic.png";
import NamePalatesImg from "../../public/images/NamePalates.png";

const THICKNESS_OPTIONS = [
  { value: "3mm", label: "3mm Solid Cast Acrylic (Interior Flat Profile)", baseRate: 15 },
  { value: "5mm", label: "5mm Cast Acrylic (Standard Commercial Profile)", baseRate: 22 },
  { value: "8mm", label: "8mm High-Density Acrylic (Bold Reception Look)", baseRate: 35 },
  { value: "10mm", label: "10mm Architectural Cast Acrylic (Executive Depth)", baseRate: 48 },
  { value: "12mm", label: "12mm Heavy-Gauge Acrylic (Deep Shadow)", baseRate: 65 },
  { value: "18mm", label: "18mm Premium 3D Block Acrylic", baseRate: 95 },
  { value: "25mm", label: "25mm Ultra-Depth Monument Block Acrylic", baseRate: 140 },
];

const FINISH_OPTIONS = [
  { value: "mirror_gold", label: "Mirror Finish Titanium Gold Acrylic", colorHex: "#d4af37", isMirror: true },
  { value: "mirror_silver", label: "Mirror Finish Chrome Silver Acrylic", colorHex: "#cbd5e1", isMirror: true },
  { value: "gloss_black", label: "High-Gloss Jet Black Cast Acrylic", colorHex: "#111111", isMirror: false },
  { value: "gloss_white", label: "Pure Snow White Cast Acrylic", colorHex: "#f8f9fa", isMirror: false },
  { value: "gloss_red", label: "Signal Red High-Gloss Acrylic", colorHex: "#dc2626", isMirror: false },
  { value: "gloss_blue", label: "Royal Corporate Blue Acrylic", colorHex: "#2563eb", isMirror: false },
  { value: "gloss_yellow", label: "Vibrant Golden Yellow Acrylic", colorHex: "#eab308", isMirror: false },
  { value: "frosted", label: "Architectural Frosted / Matte Sandblast Acrylic", colorHex: "#94a3b8", isMirror: false },
];

const HEIGHT_OPTIONS = [
  { value: 2, label: "2 Inches (Small Directory / Room Tag)" },
  { value: 3, label: "3 Inches (Office Door / Sub-heading)" },
  { value: 4, label: "4 Inches (Standard Reception Desk)" },
  { value: 6, label: "6 Inches (Main Reception Lobby Sign)" },
  { value: 8, label: "8 Inches (Executive Conference / Boardroom)" },
  { value: 10, label: "10 Inches (Storefront Fascia Letters)" },
  { value: 12, label: "12 Inches (1 Foot Architectural Letters)" },
  { value: 15, label: "15 Inches (Commercial Building Entrance)" },
  { value: 18, label: "18 Inches (Outdoor High-Visibility Sign)" },
  { value: 24, label: "24 Inches (2 Feet Monumental Letters)" },
];

export default function Acrylicletter() {
  const router = useRouter();

  // Customization Form State
  const [customText, setCustomText] = useState("K2 SIGN & PRINT");
  const [letterHeight, setLetterHeight] = useState(6);
  const [thickness, setThickness] = useState("5mm");
  const [finish, setFinish] = useState("mirror_gold");
  const [mountingStyle, setMountingStyle] = useState("studs"); // 'flush' | 'studs'
  const [stencilTemplate, setStencilTemplate] = useState(true);
  const [galleryImageIdx, setGalleryImageIdx] = useState(0);

  // 3-Way Artwork Ingestion State
  const [designMode, setDesignMode] = useState("upload");
  const [uploadedArtwork, setUploadedArtwork] = useState(null);
  const [designerBrief, setDesignerBrief] = useState("");
  const [designerPhone, setDesignerPhone] = useState("");

  // Pricing & status states
  const [isCalculating, setIsCalculating] = useState(false);
  const [apiTotal, setApiTotal] = useState(null);
  const [calcNotice, setCalcNotice] = useState("");

  const charCount = useMemo(() => {
    return (customText || "").replace(/\s+/g, "").length || 1;
  }, [customText]);

  const selectedThickness = useMemo(() => {
    return THICKNESS_OPTIONS.find((t) => t.value === thickness) || THICKNESS_OPTIONS[1];
  }, [thickness]);

  const selectedFinish = useMemo(() => {
    return FINISH_OPTIONS.find((f) => f.value === finish) || FINISH_OPTIONS[0];
  }, [finish]);

  const galleryImages = [
    { src: AcrylicLettersHero, label: "Titanium Gold 3D", tag: "CNC Flame-Polished Edge" },
    { src: AcpAndAcrylicImg, label: "Reception Wall Mount", tag: "Standoff Stud Float" },
    { src: NamePalatesImg, label: "Architectural Signage", tag: "Cast Acrylic Quality" }
  ];

  // Local calculation formula
  const localQuote = useMemo(() => {
    let ratePerInch = selectedThickness.baseRate;
    if (selectedFinish.isMirror) {
      ratePerInch = Math.round(ratePerInch * 1.25);
    }

    const letterPrice = ratePerInch * letterHeight;
    const baseLettersTotal = letterPrice * charCount;

    // Mounting hardware add-on
    let mountingCost = 0;
    if (mountingStyle === "studs") {
      mountingCost = charCount * 35; // Stainless steel brass standoffs per letter
    } else {
      mountingCost = charCount * 10; // High-tack 3M VHB laser pre-taped back
    }

    const stencilCost = stencilTemplate ? 150 : 0;
    const subtotal = Math.max(350, baseLettersTotal + mountingCost + stencilCost);
    const gstAmount = Math.round(subtotal * 0.18);
    const totalAmount = subtotal + gstAmount;

    return {
      ratePerInch,
      letterPrice,
      baseLettersTotal,
      mountingCost,
      stencilCost,
      subtotal,
      gstAmount,
      totalAmount,
    };
  }, [selectedThickness, selectedFinish, letterHeight, charCount, mountingStyle, stencilTemplate]);

  // Sync with backend API
  useEffect(() => {
    let isCancelled = false;

    const runBackendCalc = async () => {
      setIsCalculating(true);
      try {
        const payload = {
          thickness,
          height: Number(letterHeight),
          width: Number(letterHeight * 0.8),
          qty: charCount,
          finish,
        };

        const res = await Acryliclettercalculation(payload);
        if (!isCancelled) {
          if (res?.status && res?.data?.FinalPrice) {
            setApiTotal(Number(res.data.FinalPrice));
            setCalcNotice("Live rate verified with K2 Signage Workshop");
          } else if (res?.data?.totalPrice) {
            setApiTotal(Number(res.data.totalPrice));
            setCalcNotice("Live rate verified with K2 Signage Workshop");
          } else {
            setApiTotal(null);
            setCalcNotice("Factory Rate Standard (Laser CNC Pre-Calibrated)");
          }
        }
      } catch (err) {
        if (!isCancelled) {
          setApiTotal(null);
          setCalcNotice("Factory Rate Standard (Laser CNC Pre-Calibrated)");
        }
      } finally {
        if (!isCancelled) setIsCalculating(false);
      }
    };

    const timer = setTimeout(runBackendCalc, 300);
    return () => {
      isCancelled = true;
      clearTimeout(timer);
    };
  }, [thickness, letterHeight, charCount, finish]);

  const designFee = designMode === "hire_designer" ? 299 : 0;
  const activeSubtotal = (apiTotal !== null ? apiTotal : localQuote.subtotal) + designFee;
  const activeGst = Math.round(activeSubtotal * 0.18);
  const activeGrandTotal = activeSubtotal + activeGst;

  const handleAddToCart = () => {
    const cartItem = {
      id: `acrylic-letters-${Date.now()}`,
      name: `Custom Acrylic 3D Letters: "${customText}"`,
      category: "3D Letters & Signage",
      slug: "acrylic-letters-and-numbers",
      specs: [
        { label: "Lettering Text", value: customText },
        { label: "Letter Count", value: `${charCount} Characters` },
        { label: "Letter Height", value: `${letterHeight} Inches` },
        { label: "Acrylic Thickness", value: selectedThickness.label },
        { label: "Color / Finish", value: selectedFinish.label },
        { label: "Mounting Style", value: mountingStyle === "studs" ? "SS Standoff Studs (1-inch Wall Float)" : "3M VHB Flush Mount Tape" },
        { label: "1:1 Paper Stencil", value: stencilTemplate ? "Included" : "None" },
        { label: "Artwork Path", value: designMode === "upload" ? (uploadedArtwork?.name || "Ready Artwork File") : designMode === "studio" ? "Designed in K2 Studio" : "K2 Graphic Artist Assisted" }
      ],
      quantity: 1,
      unitPrice: activeSubtotal,
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
            <Link href="/categories/3d-letters" className="hover:text-purple-700 transition">3D Letters & Signage</Link>
            <ChevronRight size={12} />
            <span className="text-gray-900 font-medium">Acrylic 3D Letters</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight">
            Custom 3D Acrylic Letters & Numbers
          </h1>
          <p className="text-xs sm:text-sm text-gray-600 mt-1">
            Laser CNC cut architectural solid cast acrylic with laser-polished flame edges and titanium mirror finishes.
          </p>
        </div>

        <Link
          href="/categories/3d-letters"
          className="text-xs font-semibold text-purple-700 hover:text-purple-900 bg-purple-50 hover:bg-purple-100 px-3.5 py-1.5 rounded-full transition"
        >
          ← All 3D Letters
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
                  <Type size={18} />
                </div>
                <div>
                  <h3 className="font-bold text-sm text-gray-900 flex items-center gap-2">
                    Architectural Cast Acrylic 3D Letters
                    <span className="text-[10px] bg-purple-100 text-[#9c1dac] font-bold px-2 py-0.5 rounded-full border border-purple-200">
                      Laser CNC Cut
                    </span>
                  </h3>
                  <p className="text-[11px] text-gray-500">Flame-polished glass-like edges & precision acrylic finishes</p>
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

                {/* Pre-press / Material resolution badge */}
                <div className="absolute bottom-3 left-3 right-3 bg-white/90 backdrop-blur-md border border-gray-200/80 rounded-xl p-2.5 flex items-center justify-between shadow-xs">
                  <div className="flex items-center gap-1.5 text-xs text-gray-800 font-semibold truncate">
                    <ShieldCheck size={14} className="text-[#9c1dac] shrink-0" />
                    <span className="truncate">{letterHeight}&quot; Height • {thickness} Thickness</span>
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
                    Acrylic 3D Letter Highlights
                  </h4>
                  <ul className="text-xs text-gray-600 space-y-1">
                    <li className="flex items-center gap-1.5">
                      <CheckCircle size={13} className="text-emerald-600 shrink-0" />
                      <span>100% Virgin Cast High-Density Acrylic Sheets</span>
                    </li>
                    <li className="flex items-center gap-1.5">
                      <CheckCircle size={13} className="text-emerald-600 shrink-0" />
                      <span>Flame-polished crystal edge finish with smooth radius</span>
                    </li>
                    <li className="flex items-center gap-1.5">
                      <CheckCircle size={13} className="text-emerald-600 shrink-0" />
                      <span>Stainless steel standoff studs or 3M VHB pre-taped back</span>
                    </li>
                    <li className="flex items-center gap-1.5">
                      <CheckCircle size={13} className="text-emerald-600 shrink-0" />
                      <span>Includes 1:1 paper stencil for effortless wall alignment</span>
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
                  <h4 className="text-xs font-bold text-gray-900">Want to lay out your 3D letter signage online?</h4>
                  <p className="text-[11px] text-gray-500">
                    Use K2 Studio to preview fonts, kerning, scale, and dimensional alignment before manufacturing.
                  </p>
                </div>
              </div>
              <Link href="/studio?product=3d-letters">
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
              <span>🔡 Lettering: {charCount} Characters ({letterHeight}&quot; height)</span>
              <span className="text-[#9c1dac] font-semibold">⚡ Laser CNC Tolerance ±0.2mm</span>
              <span>🏬 Pickup or Installation in Pune & Mumbai</span>
            </div>
          </div>

          {/* CONFIGURE SPECIFICATIONS CARD */}
          <div className="shadow-md border border-gray-200/90 bg-white rounded-2xl overflow-hidden p-6 space-y-6">
            <div className="border-b border-gray-100 pb-4">
              <h3 className="text-xl font-bold flex items-center gap-2 text-gray-900">
                <Layers className="text-purple-700" size={22} />
                <span>Configure Specifications: Acrylic 3D Letters</span>
              </h3>
            </div>

            <div className="space-y-6">
              {/* Text Input */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <Label className="text-xs font-bold text-gray-800 uppercase tracking-wider">
                    Signage Text / Company Name
                  </Label>
                  <span className="text-xs font-mono font-bold text-purple-700 bg-purple-50 px-2 py-0.5 rounded border border-purple-200">
                    {charCount} Characters
                  </span>
                </div>
                <Input
                  type="text"
                  value={customText}
                  onChange={(e) => setCustomText(e.target.value.toUpperCase())}
                  placeholder="ENTER SIGNAGE TEXT"
                  className="font-black text-base tracking-wider uppercase h-11"
                />
              </div>

              {/* Letter Height Selector */}
              <div>
                <Label className="text-xs font-bold text-gray-800 uppercase tracking-wider block mb-1.5">
                  Letter Height (Inches)
                </Label>
                <Select value={String(letterHeight)} onValueChange={(v) => setLetterHeight(Number(v))}>
                  <SelectTrigger className="w-full text-xs font-medium">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {HEIGHT_OPTIONS.map((h) => (
                      <SelectItem key={h.value} value={String(h.value)} className="text-xs">
                        {h.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Acrylic Thickness & Depth */}
              <div>
                <Label className="text-xs font-bold text-gray-800 uppercase tracking-wider block mb-1.5">
                  Acrylic Thickness & Depth
                </Label>
                <Select value={thickness} onValueChange={setThickness}>
                  <SelectTrigger className="w-full text-xs font-medium">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {THICKNESS_OPTIONS.map((t) => (
                      <SelectItem key={t.value} value={t.value} className="text-xs">
                        {t.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Color & Material Finish */}
              <div>
                <Label className="text-xs font-bold text-gray-800 uppercase tracking-wider block mb-1.5">
                  Color & Surface Finish
                </Label>
                <Select value={finish} onValueChange={setFinish}>
                  <SelectTrigger className="w-full text-xs font-medium">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {FINISH_OPTIONS.map((f) => (
                      <SelectItem key={f.value} value={f.value} className="text-xs">
                        {f.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Mounting Hardware Style */}
              <div>
                <Label className="text-xs font-bold text-gray-800 uppercase tracking-wider block mb-2">
                  Mounting & Installation Method
                </Label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div
                    onClick={() => setMountingStyle("studs")}
                    className={`p-3 rounded-xl border-2 cursor-pointer transition flex items-start gap-3 ${
                      mountingStyle === "studs"
                        ? "border-purple-600 bg-purple-50/50 shadow-xs"
                        : "border-gray-200 bg-white hover:border-gray-300"
                    }`}
                  >
                    <Anchor className={mountingStyle === "studs" ? "text-purple-700" : "text-gray-400"} size={20} />
                    <div>
                      <strong className="text-xs text-gray-900 block font-bold">1-Inch Floating Standoff Studs (+₹35/char)</strong>
                      <span className="text-[11px] text-gray-500">Brass pins welded on back for luxury architectural 3D shadow float.</span>
                    </div>
                  </div>

                  <div
                    onClick={() => setMountingStyle("flush")}
                    className={`p-3 rounded-xl border-2 cursor-pointer transition flex items-start gap-3 ${
                      mountingStyle === "flush"
                        ? "border-purple-600 bg-purple-50/50 shadow-xs"
                        : "border-gray-200 bg-white hover:border-gray-300"
                    }`}
                  >
                    <CheckCircle className={mountingStyle === "flush" ? "text-purple-700" : "text-gray-400"} size={20} />
                    <div>
                      <strong className="text-xs text-gray-900 block font-bold">Flush Mount 3M VHB Tape (+₹10/char)</strong>
                      <span className="text-[11px] text-gray-500">High-tack double-sided adhesive for direct flat wall or glass mounting.</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Stencil Paper Toggle */}
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl border border-gray-200/80">
                <div>
                  <strong className="text-xs text-gray-900 block">Include 1:1 Full-Scale Plotter Stencil (+₹150)</strong>
                  <span className="text-[11px] text-gray-500">Master template sheet for 100% level and exact letter spacing during mounting.</span>
                </div>
                <input
                  type="checkbox"
                  checked={stencilTemplate}
                  onChange={(e) => setStencilTemplate(e.target.checked)}
                  className="h-5 w-5 rounded border-gray-300 text-purple-600 focus:ring-purple-500 cursor-pointer"
                />
              </div>

              {/* 3-Way Artwork & Design Ingestion Section */}
              <div className="pt-6 border-t border-gray-100 space-y-4">
                <div>
                  <Label className="font-bold text-base text-gray-900 block mb-1">
                    Select How You Want to Prepare Your Vector Paths:
                  </Label>
                  <p className="text-xs text-gray-500">
                    Choose one of the 3 production paths below. All vector curves undergo laser kerf pre-flight.
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
                      <p className="text-xs text-gray-500 mt-1">DXF, AI, CDR, EPS, PDF vectors.</p>
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
                      <p className="text-xs text-gray-500 mt-1">Custom font matching & WhatsApp proof.</p>
                    </div>
                  </div>
                </div>

                {designMode === "upload" && (
                  <div className="space-y-3 pt-2">
                    <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center hover:border-purple-500 transition cursor-pointer relative bg-gray-50/50">
                      <input
                        type="file"
                        accept=".dxf,.ai,.cdr,.eps,.pdf,.svg"
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
                          <p className="text-xs text-gray-500 mt-1">Supports DXF, CDR, AI, EPS, SVG, PDF</p>
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
                        Test fonts, proportions, and export clean laser cut paths in your browser.
                      </p>
                    </div>
                    <Link href="/studio?product=3d-letters">
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
                        placeholder="Provide font names, brand guidelines, wall dimensions..."
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
                <span className="text-gray-600 text-sm">Calculated Characters:</span>
                <span className="font-bold text-gray-900 text-lg">{charCount} Letters ({letterHeight}&quot; height)</span>
              </div>

              <div className="flex justify-between items-baseline border-b border-gray-100 pb-3">
                <span className="text-gray-600 text-sm">Effective Unit Rate:</span>
                <span className="font-semibold text-purple-700">
                  ₹{(activeSubtotal / charCount).toFixed(2)} / character
                </span>
              </div>

              {/* Itemized Breakdown */}
              <div className="space-y-2 py-2">
                <Label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Itemized Breakdown</Label>
                <div className="flex justify-between text-xs text-gray-600">
                  <span className="truncate max-w-[200px]">Solid Cast Acrylic ({thickness})</span>
                  <span className="font-medium text-gray-800">₹{localQuote.baseLettersTotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-xs text-gray-600">
                  <span>Mounting ({mountingStyle === "studs" ? "SS Standoff Studs" : "3M VHB Tape"})</span>
                  <span className="font-medium text-gray-800">₹{localQuote.mountingCost.toFixed(2)}</span>
                </div>
                {stencilTemplate && (
                  <div className="flex justify-between text-xs text-gray-600">
                    <span>1:1 Plotter Paper Stencil</span>
                    <span className="font-medium text-gray-800">₹150.00</span>
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
