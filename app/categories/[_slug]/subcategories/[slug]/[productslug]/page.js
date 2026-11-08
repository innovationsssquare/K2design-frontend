"use client";

import React, { useState, useEffect, useMemo, Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductBySlug } from "@/lib/ReduxSlice/ProductSlice";

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
  Palette,
  Calculator,
  Check,
  Brush,
  FileCheck,
  Package
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Chip, Divider, Skeleton } from "@nextui-org/react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";

import StandardVisitingCard from "../../../../../../public/images/StandardVisitingCard.jpeg";
import PaperPrintings from "../../../../../../public/images/PaperPrinting.png";
import PaperBag from "../../../../../../public/images/Visiting_Card3.png";

const defaultImages = [
  { itemImageSrc: StandardVisitingCard, label: "Studio Product Sample", tag: "300 DPI Pre-Press" },
  { itemImageSrc: PaperPrintings, label: "Premium Factory Print", tag: "Offset & Digital" },
  { itemImageSrc: PaperBag, label: "Finished Product", tag: "Direct Factory Quality" }
];

export default function ProductDetailPage() {
  const router = useRouter();
  const dispatch = useDispatch();
  const params = useParams();

  const slug = params?.slug;
  const productslug = params?.productslug;

  const { productDetails } = useSelector((state) => state.product);

  const [activeImageIdx, setActiveImageIdx] = useState(0);
  const [selectedCustomizations, setSelectedCustomizations] = useState({});
  const [quantity, setQuantity] = useState(100);
  const [totalRate, setTotalRate] = useState(0);

  // 3-Way Artwork Ingestion State
  const [designMode, setDesignMode] = useState("upload");
  const [uploadedArtwork, setUploadedArtwork] = useState(null);
  const [designerBrief, setDesignerBrief] = useState("");
  const [designerPhone, setDesignerPhone] = useState("");

  useEffect(() => {
    if (slug && productslug) {
      dispatch(fetchProductBySlug({ slug, productslug }));
    }
  }, [slug, productslug, dispatch]);

  // Build images array
  const displayImages = useMemo(() => {
    if (productDetails?.data?.images && productDetails.data.images.length > 0) {
      return productDetails.data.images.map((img, i) => ({
        itemImageSrc: typeof img === "string" ? img : img.src || PaperPrintings,
        label: `View ${i + 1}`,
        tag: "Verified Factory Spec"
      }));
    }
    return defaultImages;
  }, [productDetails]);

  const handleSelectChange = (fieldName, value, label) => {
    setSelectedCustomizations((prev) => {
      if (productDetails?.data?.qty === 0) {
        return {
          [fieldName]: parseFloat(value) || 0,
          Quantity2: parseInt(label) || 0
        };
      } else {
        return {
          ...prev,
          [fieldName]: parseFloat(value) || 0,
          [`${fieldName}_label`]: label || value
        };
      }
    });
  };

  // Calculate pricing
  useEffect(() => {
    let baseRate = 0;
    Object.keys(selectedCustomizations).forEach((key) => {
      if (!key.endsWith("_label") && typeof selectedCustomizations[key] === "number") {
        baseRate += selectedCustomizations[key];
      }
    });

    const qtyMultiplier = parseFloat(selectedCustomizations.Quantity) || 1;
    const finalCalculated = baseRate > 0 ? (baseRate * (quantity || 100)) / 100 : (quantity || 100) * 1.5;
    setTotalRate(Math.max(finalCalculated, 50));
  }, [selectedCustomizations, quantity]);

  const designFee = designMode === "hire_designer" ? 299 : 0;
  const subtotal = Math.round(totalRate + designFee);
  const gst = Math.round(subtotal * 0.18);
  const grandTotal = subtotal + gst;

  const handleAddToCartAndProceed = () => {
    const specs = [
      { label: "Product", value: productDetails?.data?.name || productslug },
      { label: "Quantity", value: `${quantity} Units` },
      ...Object.keys(selectedCustomizations)
        .filter((k) => k.endsWith("_label"))
        .map((k) => ({
          label: k.replace("_label", "").replace(/([A-Z])/g, " $1"),
          value: String(selectedCustomizations[k])
        })),
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
      id: `${productslug}-${Date.now()}`,
      name: productDetails?.data?.name || "Custom Printed Product",
      category: "Print Products",
      slug: productslug,
      specs,
      quantity: Number(quantity),
      unitPrice: Math.round(subtotal / (quantity || 1)),
      totalPrice: grandTotal,
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
            <Link href="/categories" className="hover:text-purple-700 transition">
              Categories
            </Link>
            <ChevronRight size={12} />
            <span className="text-gray-900 font-medium">
              {productDetails?.data?.name || "Product Customizer"}
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight">
            {productDetails?.data?.name || "Commercial Print Product"}
          </h1>
          <p className="text-xs sm:text-sm text-gray-600 mt-1">
            {productDetails?.data?.description ||
              "Configure materials, print finishes, volume tiers, and order with instant factory pre-press validation."}
          </p>
        </div>

        <Link
          href="/categories"
          className="text-xs font-semibold text-purple-700 hover:text-purple-900 bg-purple-50 hover:bg-purple-100 px-3.5 py-1.5 rounded-full transition"
        >
          ← All Products
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
                  <Package size={18} />
                </div>
                <div>
                  <h3 className="font-bold text-sm text-gray-900 flex items-center gap-2">
                    {productDetails?.data?.name || "Official K2 Product"}
                    <span className="text-[10px] bg-purple-100 text-[#9c1dac] font-bold px-2 py-0.5 rounded-full border border-purple-200">
                      Direct Press
                    </span>
                  </h3>
                  <p className="text-[11px] text-gray-500">
                    High-speed commercial production with precision color control
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-xs text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-1 rounded-full font-semibold flex items-center gap-1">
                  <CheckCircle size={13} />
                  <span>300 DPI Pre-Press</span>
                </span>
                <span className="text-xs text-purple-700 bg-purple-50 border border-purple-200 px-2.5 py-1 rounded-full font-semibold">
                  Factory Spec
                </span>
              </div>
            </div>

            {/* PRODUCT PHOTOGRAPHY HERO & THUMBNAILS */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-center">
              {/* Main Product Image */}
              <div className="md:col-span-7 relative aspect-[4/3] w-full rounded-2xl overflow-hidden bg-gray-50 border border-gray-200 shadow-xs group">
                <Image
                  src={displayImages[activeImageIdx]?.itemImageSrc || PaperPrintings}
                  alt={displayImages[activeImageIdx]?.label || "Product Image"}
                  fill
                  priority
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />

                {/* Floating Tag */}
                <div className="absolute top-3 left-3 bg-black/75 backdrop-blur-md text-white text-[10px] font-bold px-2.5 py-1 rounded-full shadow-sm">
                  {displayImages[activeImageIdx]?.tag || "Verified Spec"}
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
                    {displayImages.map((img, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => setActiveImageIdx(idx)}
                        className={`relative aspect-square rounded-xl overflow-hidden border-2 transition-all p-0.5 ${
                          activeImageIdx === idx
                            ? "border-[#9c1dac] shadow-md scale-102"
                            : "border-gray-200 opacity-70 hover:opacity-100"
                        }`}
                      >
                        <Image
                          src={img.itemImageSrc}
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
                    <li className="flex items-start gap-1.5">
                      <Check size={12} className="text-emerald-600 mt-0.5 shrink-0" />
                      <span>Direct-to-plate Heidelberg 4-color offset printing</span>
                    </li>
                    <li className="flex items-start gap-1.5">
                      <Check size={12} className="text-emerald-600 mt-0.5 shrink-0" />
                      <span>Matte, Gloss, or Soft-Touch Velvet lamination available</span>
                    </li>
                    <li className="flex items-start gap-1.5">
                      <Check size={12} className="text-emerald-600 mt-0.5 shrink-0" />
                      <span>Compliant with standard automated pre-flight checks</span>
                    </li>
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
                    Want to customize graphics or layout in real-time?
                  </h4>
                  <p className="text-[11px] text-gray-600">
                    Open K2 Studio with pre-calibrated templates, vector assets, and instant pre-flight export.
                  </p>
                </div>
              </div>
              <Link href={`/studio?product=${productslug}`} className="shrink-0 w-full sm:w-auto">
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
                Configure Specifications
              </h3>
              <p className="text-xs text-gray-500">
                Customize material properties, finishes, and order quantity
              </p>
            </div>

            {/* Dynamic Customization Dropdowns from Backend */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {productDetails?.data?.customizations?.map((customization, index) => (
                <div key={index} className="space-y-1.5">
                  <Label className="text-xs font-bold text-gray-700 capitalize">
                    {customization?.fieldName}
                  </Label>
                  <Select
                    onValueChange={(val) => {
                      const opt = customization.options.find((o) => String(o.rate) === String(val));
                      handleSelectChange(customization.fieldName, val, opt?.label);
                    }}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder={`Select ${customization.fieldName}`} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        {customization.options?.map((option) => (
                          <SelectItem key={option._id || option.rate} value={String(option.rate)}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
              ))}

              {/* Quantity */}
              <div className="space-y-1.5">
                <Label className="text-xs font-bold text-gray-700">Order Quantity</Label>
                <Select
                  value={String(quantity)}
                  onValueChange={(val) => setQuantity(parseInt(val, 10))}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select Quantity" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      {(
                        productDetails?.data?.availableQuantities || [
                          100, 250, 500, 1000, 2000, 5000
                        ]
                      ).map((qty) => (
                        <SelectItem key={qty} value={String(qty)}>
                          {qty} Units
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
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
                      Launch K2 Studio Editor
                    </h5>
                    <p className="text-[11px] text-purple-700">
                      Template pre-configured for this product size.
                    </p>
                  </div>
                  <Link href={`/studio?product=${productslug}`} target="_blank">
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
                      Our Senior Print Artists will design your artwork, verify bleed, and send digital proof.
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
                Verified Rate
              </Chip>
            </div>

            <div className="p-6 space-y-4">
              <div className="flex justify-between items-baseline border-b border-gray-100 pb-3">
                <span className="text-gray-600 text-sm">Calculated Quantity:</span>
                <span className="font-bold text-gray-900 text-lg">
                  {quantity} Units
                </span>
              </div>

              <div className="flex justify-between items-baseline border-b border-gray-100 pb-3">
                <span className="text-gray-600 text-sm">Effective Unit Price:</span>
                <span className="font-semibold text-purple-700">
                  ₹{quantity > 0 ? (subtotal / quantity).toFixed(2) : "0.00"} / unit
                </span>
              </div>

              {/* Itemized Breakdown */}
              <div className="space-y-2 py-2">
                <Label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Itemized Breakdown
                </Label>
                <div className="flex justify-between text-xs text-gray-600">
                  <span className="truncate max-w-[210px]">
                    {productDetails?.data?.name || "Print Production"}
                  </span>
                  <span className="font-medium text-gray-800">
                    ₹{totalRate.toFixed(2)}
                  </span>
                </div>
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
                  <span className="font-medium">₹{subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>GST (18%):</span>
                  <span className="font-medium">₹{gst.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-lg font-bold text-gray-900 pt-2 border-t">
                  <span>Total Amount:</span>
                  <span className="text-purple-700 font-extrabold">
                    ₹{grandTotal.toFixed(2)}
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
