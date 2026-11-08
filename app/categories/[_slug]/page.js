"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { fetchcategoriesbyslug } from "@/lib/ReduxSlice/CategorySlice";
import Link from "next/link";
import { useParams } from "next/navigation";
import Image from "next/image";
import {
  ArrowRight,
  Layers,
  Sparkles,
  Zap,
  CheckCircle,
  Store,
  ChevronRight,
  ShieldCheck,
  Search
} from "lucide-react";

// Image Imports
import StandardVisitingCard from "../../../public/images/StandardVisitingCard.jpeg";
import PaperPrintingImg from "../../../public/images/PaperPrinting.png";
import BrochureImg from "../../../public/images/brochures.jpeg";
import PaperBagImg from "../../../public/images/PaperBag.jpeg";
import StickersImg from "../../../public/images/Stickers.jpeg";
import StampImg from "../../../public/images/Stamp.jpeg";
import PhotoAlbumImg from "../../../public/images/PhotoAlbum.jpeg";
import InvitationImg from "../../../public/images/CardInvitation.jpeg";
import LEDBoardImg from "../../../public/images/LEDBoard.png";
import ACPandAcrylicImg from "../../../public/images/ACPandAcrylic.png";
import CliponImg from "../../../public/images/CLIAPON FRAMES.png";
import NamePalatesImg from "../../../public/images/NamePalates.png";
import StandBoard1Img from "../../../public/images/StandBoard1.jpg";
import HeroImage3Img from "../../../public/images/HeroImage3.png";
import RigidSignImg from "../../../public/images/RigidSign.png";
import FlexImg from "../../../public/images/Flex&Related.png";
import VinylLetterImg from "../../../public/images/VinylLetter.png";
import VinylGoldSilverImg from "../../../public/images/vinyl-letters-gold-silver.jpg";
import VinylMultiColourImg from "../../../public/images/vinyl-letters-multicolour.jpg";
import VinylSingleColourImg from "../../../public/images/vinyl-letters-single-colour.jpg";

const CATEGORY_CATALOG = {
  "light-board-led-board": {
    name: "Light Board & LED Boards",
    tagline: "Commercial Exterior Signages & Illuminated Storefront Solutions",
    description: "Architectural 3D channel letters, CNC stencil cut ACP boards, illuminated fabric lightboxes, and slim clip-on frames engineered for high visibility and 24/7 durability.",
    image: LEDBoardImg.src,
    badge: "⚡ 24-48 Hr Production | 6 Branch Store Pickup",
    products: [
      {
        name: "Lightbox Board",
        slug: "lightbox-board",
        img: LEDBoardImg.src,
        price: "₹450 / sq.ft",
        specs: "Backlit Flex / Acrylic with 3\" Heavy Frame & Samsung LED Modules",
        badge: "⭐ Best Seller"
      },
      {
        name: "ACP Stencil LED Board",
        slug: "acp-stencil-led-board",
        img: ACPandAcrylicImg.src,
        price: "₹650 / sq.ft",
        specs: "3mm/4mm CNC Routed ACP Sheet with Raised Acrylic Inlay",
        badge: "Architectural Grade"
      },
      {
        name: "3D LED Channel Letters",
        slug: "3d-led-letters",
        img: NamePalatesImg.src,
        price: "₹85 / inch height",
        specs: "Fabricated Acrylic / Stainless Steel with Front & Halo Glow",
        badge: "Premium Storefront"
      },
      {
        name: "Fabrics Textile LED Board",
        slug: "fabrics-led-board-textile-led-board",
        img: HeroImage3Img.src,
        price: "₹750 / sq.ft",
        specs: "Frameless 75mm Aluminium Profile with Matrix LED Backlighting",
        badge: "SEG Frameless"
      },
      {
        name: "LED Thinlite Frame (Clip-on)",
        slug: "led-thinlite-frames-(cliapon-frames)",
        img: CliponImg.src,
        price: "₹1,100 / frame",
        specs: "Ultra-slim 25mm Anodised Aluminium Snap Frame with LGP Panel",
        badge: "Instant Poster Swap"
      },
      {
        name: "Backlit Tube Flex Board",
        slug: "backlit-tube-flex-board",
        img: StandBoard1Img.src,
        price: "₹280 / sq.ft",
        specs: "Heavy-duty 1.5\" MS Tubular Framework with High-Lumen LED Tubes",
        badge: "Economy Value"
      }
    ]
  },
  "paper-printing": {
    name: "Paper Printing & Stationery",
    tagline: "Commercial Offset & Digital Print Manufacturing",
    description: "Offset & digital high-definition commercial paper prints with certified factory pricing, 300 DPI pre-press proofing, and 18% GST tax invoices.",
    image: PaperPrintingImg.src,
    badge: "🏭 Direct Factory Rates | Express Turnaround",
    products: [
      { name: "Standard Visiting Cards", slug: "visiting-cards", img: StandardVisitingCard.src, price: "₹200 / 1000 pcs", specs: "350 GSM Art Card with Spot UV / Matte Finish" },
      { name: "Marketing Brochures & Flyers", slug: "brochure-cover", img: BrochureImg.src, price: "₹1,200 / 1000 pcs", specs: "Bi-Fold / Tri-Fold 170 GSM & 250 GSM Gloss" },
      { name: "Custom Printed Paper Bags", slug: "paper-bags", img: PaperBagImg.src, price: "₹450 / 100 pcs", specs: "Kraft & White Art Paper with D-cut / Rope Handles" },
      { name: "Die-Cut Stickers & Labels", slug: "sticker-and-label", img: StickersImg.src, price: "₹120 / 48 pcs", specs: "Gloss Vinyl & Paper Stickers with Kiss-Cut Lines" },
      { name: "Self-Inking Rubber Stamps", slug: "stamp", img: StampImg.src, price: "₹180 / stamp", specs: "Pre-inked Nylon & Flash Models (1-5 lines)" },
      { name: "GST Bill Books & Invoices", slug: "bill-books", img: PaperPrintingImg.src, price: "₹420 / 12 books", specs: "Duplicate & Triplicate NCR Paper with Perforation" },
      { name: "Executive Letterheads", slug: "letterheads", img: StandardVisitingCard.src, price: "₹650 / 1000 pcs", specs: "100 GSM Bond & Sunshine Superfine Smooth Finish" },
      { name: "Corporate Envelopes", slug: "envelopes", img: InvitationImg.src, price: "₹750 / 1000 pcs", specs: "Window & Non-Window Peel & Seal Commercial Envelopes" },
      { name: "Presentation Folders", slug: "files-and-folders", img: PhotoAlbumImg.src, price: "₹850 / 100 pcs", specs: "Interlocking Pocket with Business Card Holder Slot" },
    ]
  },
  "rigid-sign-plates": {
    name: "Rigid Sign Plates & Nameplates",
    tagline: "Durable Industrial, Commercial & Directional Signboards",
    description: "ACP, Acrylic, PVC Foam, Stainless Steel, and photoluminescent safety signage built to withstand outdoor weathering.",
    image: RigidSignImg.src,
    badge: "🛡️ Weatherproof & Scratch Resistant",
    products: [
      { name: "ACP Sign Plates", slug: "acp-plates", img: ACPandAcrylicImg.src, price: "₹180 / sq.ft", specs: "3mm Aluminium Composite Panel with UV Flatbed Print" },
      { name: "Acrylic Sign Plates", slug: "acrylic-plates", img: LEDBoardImg.src, price: "₹350 / sq.ft", specs: "Cast Clear & Frosted Acrylic with Stud Mount Spacers" },
      { name: "PVC Foam Board Plates", slug: "pvc-foam-plates", img: RigidSignImg.src, price: "₹120 / sq.ft", specs: "5mm Forex Lightweight High-Density Foam Board" },
      { name: "Night Glow Safety Signs", slug: "night-glow-plates", img: StandBoard1Img.src, price: "₹450 / sq.ft", specs: "Photoluminescent Self-Glow Emergency Exit Signs" },
      { name: "Stainless Steel Nameplates", slug: "stainless-steel-plates", img: NamePalatesImg.src, price: "₹650 / sq.ft", specs: "Grade 304 Etched & Color-Filled Metal Signboards" }
    ]
  },
  "flex-related-printing": {
    name: "Flex, Banners & Standees",
    tagline: "Large Format Outdoor & Event Marketing Displays",
    description: "Economy and star flex banners, roll-up aluminium standees, and wooden/MS promotional framed banners.",
    image: FlexImg.src,
    badge: "⚡ Same Day Dispatch Available",
    products: [
      { name: "Flex Banner Printing", slug: "flex-(banner)-printing", img: FlexImg.src, price: "₹12 / sq.ft", specs: "Frontlit High-Res Solvent / Eco-Solvent Print" },
      { name: "Roll-Up Standee", slug: "roll-up-stand", img: StandBoard1Img.src, price: "₹950 / unit", specs: "6x3 ft & 6x2.5 ft Aluminium Base with Carry Bag" },
      { name: "Flex Banner + MS Frame", slug: "flex-(banner)-printing-premium-%2B-ms-frame", img: FlexImg.src, price: "₹65 / sq.ft", specs: "1-inch Galvanised MS Frame with Welded Wall Hooks" },
      { name: "Flex Banner + Wooden Frame", slug: "flex-(banner)-%2B-wooden-frame", img: StandBoard1Img.src, price: "₹45 / sq.ft", specs: "Sturdy Pine Wood Framework for Temporary Stalls" }
    ]
  },
  "vinyl-letters": {
    name: "Vinyl Letters & Numbers",
    tagline: "Custom Precision Die-Cut Vinyl Graphics & Typography",
    description: "Commercial plotter-cut self-adhesive vinyl lettering for storefronts, glass partitions, vehicles, directional signs, and architectural spaces with transfer tape ready for peel-and-stick application.",
    image: VinylGoldSilverImg.src,
    badge: "✂️ Precision CNC Cut | 24 Hr Express Turnaround",
    products: [
      {
        name: "Vinyl Letters & Numbers (Custom Cut)",
        slug: "vinyl-letters-and-numbers",
        img: VinylGoldSilverImg.src,
        price: "From ₹0.85 / sq.inch",
        specs: "1 Colour, Multi Colour, and Metallic Gold & Silver with Free Transfer Tape",
        badge: "⭐ Top Choice"
      },
      {
        name: "Storefront Window Vinyl Typography",
        slug: "vinyl-letters-and-numbers",
        img: VinylMultiColourImg.src,
        price: "From ₹1.35 / sq.inch",
        specs: "Multi-Colour Die-Cut Vinyl for Storefront Windows & Operating Hours",
        badge: "Weatherproof 5-Yr Vinyl"
      },
      {
        name: "Single Colour Transfer Decals",
        slug: "vinyl-letters-and-numbers",
        img: VinylSingleColourImg.src,
        price: "From ₹0.85 / sq.inch",
        specs: "Gloss Black / Matte White Die-Cut Lettering with Squeegee Ready Kit",
        badge: "Easy DIY Peel & Stick"
      }
    ]
  }
};

export default function CategoryPage() {
  const dispatch = useDispatch();
  const { categoryslug } = useSelector((state) => state.category);
  const params = useParams();
  const slug = params?._slug || "light-board-led-board";

  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    dispatch(fetchcategoriesbyslug());
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 400);
    return () => clearTimeout(timer);
  }, [dispatch]);

  useEffect(() => {
    // 1. Exact match in our rich verified catalog
    const catalogEntry = CATEGORY_CATALOG[slug];
    if (catalogEntry) {
      setActiveCategory(catalogEntry);
      setIsLoading(false);
      return;
    }

    // 2. Try matching backend API data if available
    if (slug && categoryslug && categoryslug.length > 0) {
      const match = categoryslug.find((c) => c.slug === slug);
      if (match && match.products && match.products.length > 0) {
        setActiveCategory({
          name: match.name,
          tagline: "Commercial Print & Signage Manufacturing",
          description: match.description || "Browse custom formats and live configurations with 6 store pickup points.",
          image: match.image && !match.image.includes("example.com") ? match.image : LEDBoardImg.src,
          badge: "🏬 6 Store Branches in Pune & Mumbai",
          products: match.products.map((p) => {
            const rawImg = (p.images && p.images[0]) || match.image;
            const safeImg = rawImg && !rawImg.includes("example.com") ? rawImg : ACPandAcrylicImg.src;
            return {
              name: p.name,
              slug: p.slug,
              img: safeImg,
              price: "Instant Quote",
              specs: p.description || "Commercial Grade Specifications"
            };
          })
        });
        setIsLoading(false);
        return;
      }
    }

    // 3. Fallback for any unknown category slug
    const formattedTitle = slug.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
    setActiveCategory({
      name: formattedTitle,
      tagline: "Custom Manufacturing & Signage Solutions",
      description: "Browse verified custom formats with instant pricing, artwork proofing, and 6-branch pickup across Maharashtra.",
      image: LEDBoardImg.src,
      badge: "⚡ Factory Direct Rates | 18% GST Compliant",
      products: CATEGORY_CATALOG["light-board-led-board"].products
    });
    setIsLoading(false);
  }, [slug, categoryslug]);

  const filteredProducts = activeCategory?.products?.filter((p) =>
    p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (p.specs && p.specs.toLowerCase().includes(searchQuery.toLowerCase()))
  ) || [];

  return (
    <div className="bg-[#f8f9fa] min-h-screen pb-16 font-sans">
      {/* Breadcrumb Bar */}
      <div className="bg-white border-b border-gray-200 py-2.5 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex items-center gap-2 text-xs text-gray-500">
          <Link href="/" className="hover:text-purple-700 transition">Home</Link>
          <ChevronRight size={14} className="text-gray-400" />
          <Link href="/categories" className="hover:text-purple-700 transition">Categories</Link>
          <ChevronRight size={14} className="text-gray-400" />
          <span className="font-semibold text-gray-900 capitalize">
            {activeCategory?.name || slug.replace(/-/g, " ")}
          </span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        {/* Category Hero Banner */}
        <div className="rounded-3xl bg-gradient-to-br from-[#0f0e1a] via-[#1a1736] to-[#0f0e1a] text-white p-6 sm:p-10 mb-8 shadow-xl relative overflow-hidden border border-purple-900/40">
          <div className="absolute -right-16 -bottom-16 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl pointer-events-none" />
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8 relative z-10">
            <div className="max-w-2xl text-center lg:text-left">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-purple-500/20 text-purple-300 border border-purple-400/30 mb-3">
                <Zap size={14} className="text-amber-400" />
                {activeCategory?.badge || "⚡ Factory Direct Signboard Manufacturing"}
              </span>
              <h1 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight mb-3 capitalize text-white">
                {activeCategory?.name || slug.replace(/-/g, " ")}
              </h1>
              <p className="text-purple-200 text-sm sm:text-base font-medium mb-3">
                {activeCategory?.tagline || "Engineered for 24/7 Commercial Visibility"}
              </p>
              <p className="text-gray-300 text-xs sm:text-sm leading-relaxed max-w-xl">
                {activeCategory?.description}
              </p>

              <div className="flex flex-wrap items-center gap-4 mt-6 justify-center lg:justify-start text-xs text-gray-300">
                <span className="flex items-center gap-1.5">
                  <Store size={16} className="text-amber-400" />
                  6 Store Branches in Pune & Mumbai
                </span>
                <span className="flex items-center gap-1.5">
                  <ShieldCheck size={16} className="text-emerald-400" />
                  Free In-Store Sample Inspection
                </span>
              </div>
            </div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
              className="w-full max-w-xs sm:max-w-sm rounded-2xl overflow-hidden shadow-2xl border border-white/10 bg-white/5 backdrop-blur-md p-3"
            >
              <div className="relative aspect-[4/3] rounded-xl overflow-hidden bg-black/40 flex items-center justify-center">
                <Image
                  src={activeCategory?.image || LEDBoardImg.src}
                  alt={activeCategory?.name || "Category Showcase"}
                  width={400}
                  height={300}
                  unoptimized={typeof activeCategory?.image === "string" && activeCategory.image.startsWith("http")}
                  className="w-full h-full object-contain p-2 hover:scale-105 transition-transform duration-300"
                />
              </div>
            </motion.div>
          </div>
        </div>

        {/* Search & Filter Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-6">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 flex items-center gap-2">
              <Layers className="text-purple-700" size={22} />
              Available Products & Customizers ({filteredProducts.length})
            </h2>
            <p className="text-xs text-gray-500 mt-0.5">
              Select any model below to configure dimensions, lighting specs, and live rates.
            </p>
          </div>

          <div className="relative w-full sm:w-72">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
            <input
              type="text"
              placeholder="Search signboards..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 text-xs rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-600 bg-white shadow-sm"
            />
          </div>
        </div>

        {/* Responsive Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
          {filteredProducts.map((card, index) => (
            <Link
              key={index}
              href={`/categories/${slug}/subcategories/${card.slug}`}
              className="group block"
            >
              <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 flex flex-col h-full">
                {/* Product Image Box */}
                <div className="relative aspect-[16/10] bg-gray-50 overflow-hidden flex items-center justify-center p-4 border-b border-gray-100">
                  {card.badge && (
                    <span className="absolute top-3 left-3 z-10 text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-purple-700 text-white shadow-sm">
                      {card.badge}
                    </span>
                  )}
                  <Image
                    alt={card.name}
                    src={card.img}
                    width={320}
                    height={200}
                    unoptimized={typeof card.img === "string" && card.img.startsWith("http")}
                    className="object-contain max-h-44 group-hover:scale-105 transition-transform duration-300"
                  />
                </div>

                {/* Content */}
                <div className="p-5 flex flex-col justify-between flex-1">
                  <div>
                    <h3 className="font-bold text-gray-900 text-base group-hover:text-purple-700 transition">
                      {card.name}
                    </h3>
                    <p className="text-xs text-gray-500 mt-1 line-clamp-2 leading-relaxed">
                      {card.specs}
                    </p>
                  </div>

                  <div className="mt-4 pt-4 border-t border-gray-100 flex items-center justify-between">
                    <div>
                      <span className="text-[10px] text-gray-400 uppercase tracking-wider font-semibold block">
                        Base Rate
                      </span>
                      <span className="text-sm font-extrabold text-purple-700">
                        {card.price}
                      </span>
                    </div>
                    <span
                      className="text-xs font-bold text-white bg-[#9c1dac] hover:bg-[#831492] px-4 py-2 rounded-xl shadow-md transition-all duration-200 flex items-center gap-1.5 group-hover:translate-x-0.5"
                      style={{ backgroundColor: "#9c1dac", color: "#ffffff" }}
                    >
                      Configure <ArrowRight size={14} className="text-white" />
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
