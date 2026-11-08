"use client";

import React, { useState, useEffect } from "react";
import { Button, Chip, Divider } from "@nextui-org/react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Calculator,
  UploadCloud,
  CheckCircle,
  FileCheck,
  ShoppingBag,
  Sparkles,
  Package,
  Layers,
  FileText,
  Check,
  RotateCw,
  Palette,
  Eye,
  ShieldCheck,
  Brush,
  ArrowRight,
  ExternalLink
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { calculatePriceApi, getPricingOptionsApi } from "@/lib/API/Pricing";
import { calculateProductPrice } from "@/lib/PricingEngine/pricingCalculator";
import rawPricingMatrix from "@/lib/PricingEngine/pricingMatrix";
const pricingMatrix = rawPricingMatrix?.pricingMatrix || rawPricingMatrix || {};
import { useRouter } from "next/navigation";

// Real High-Resolution Product Media
import StandardVisitingCard from "../../public/images/StandardVisitingCard.jpeg";
import ProductTagsHangtags from "../../public/images/product-tags-hangtags.jpg";
import SelfInkingStamps from "../../public/images/self-inking-stamps.jpg";
import PaperBagImg from "../../public/images/PaperBag.jpeg";
import BrochuresImg from "../../public/images/brochures.jpeg";
import DiryWithPenImg from "../../public/images/DiryWithPen.jpeg";
import StickersImg from "../../public/images/Stickers.jpeg";
import StandBoardImg from "../../public/images/StandBoard.jpeg";
import CardInvitationImg from "../../public/images/CardInvitation.jpeg";
import PhotoAlbumImg from "../../public/images/PhotoAlbum.jpeg";
import LeafletImg from "../../public/images/LEAFLETA.jpg";

function normalizeCategory(cat) {
  if (!cat) return "visitingCards";
  const key = String(cat).toLowerCase().replace(/[-_ ]/g, "");
  const map = {
    visitingcards: "visitingCards",
    visitingcard: "visitingCards",
    digitalprints: "digitalPrints",
    digitalprint: "digitalPrints",
    digitalprintproduct: "digitalPrints",
    weddingcards: "weddingCards",
    weddingcard: "weddingCards",
    billbooks: "billBooks",
    billbook: "billBooks",
    pavatibooks: "pavatiBooks",
    pavatibook: "pavatiBooks",
    brochures: "brochures",
    brochure: "brochures",
    brochurecover: "brochures",
    booklets: "booklets",
    booklet: "booklets",
    bookleta4a5: "booklets",
    brochuresbooklets: "brochuresBooklets",
    pamphlets: "pamphlets",
    pamphlet: "pamphlets",
    envelopes: "envelopes",
    envelope: "envelopes",
    filesfolders: "filesFolders",
    filesandfolders: "filesFolders",
    invitationcards: "invitationCards",
    invitationcard: "invitationCards",
    letterheads: "letterheads",
    letterhead: "letterheads",
    paperbags: "paperBags",
    paperbag: "paperBags",
    stickerslabels: "stickersLabels",
    stickerlabel: "stickersLabels",
    stickerandlabel: "stickersLabels",
    stickers: "stickersLabels",
    sticker: "stickersLabels",
    tags: "tags",
    tag: "tags",
    stamps: "stamps",
    stamp: "stamps",
    wallcalendars: "wallCalendars",
    wallcalendar: "wallCalendars",
    calendar: "wallCalendars",
    calendars: "wallCalendars"
  };
  return map[key] || cat;
}

const PRODUCT_CATALOG_MEDIA = {
  tags: {
    name: "Apparel & Product Swing Tags",
    tagline: "Die-Cut Garment Hang Tags with Eyelet Punch & String Tie",
    image: ProductTagsHangtags,
    aspectType: "tag",
    sizeSpec: "50mm × 90mm Standard Garment Tag",
    features: [
      "Heavy 350 GSM Art Board or Kraft Paper",
      "4mm Reinforced Metal Eyelet Punch Hole",
      "Cotton Hanging String Tie Loop with Safety Pin",
      "Optional Tear-Off Perforation Counterfoil Line"
    ]
  },
  stamps: {
    name: "Self-Inking & Rubber Stamps",
    tagline: "Pre-Inked Flash & Nylon Office Stamps",
    image: SelfInkingStamps,
    aspectType: "stamp",
    sizeSpec: "Custom Rectangular & Round Imprints (1-4 Lines)",
    features: [
      "10,000+ Sharp Crisp Impressions Guarantee",
      "Flash Pre-Inked Japanese Crystal Foam Technology",
      "Refillable Blue, Red, Black & Violet Ink Chambers",
      "Ergonomic Heavy-Duty Casing with Protective Cover"
    ]
  },
  paperBags: {
    name: "Luxury Printed Paper Shopping Bags",
    tagline: "Custom Brand Retail Bags with Twisted / Braided Rope Handles",
    image: PaperBagImg,
    aspectType: "bag",
    sizeSpec: "PB-1 to PB-20 Standard Dimensions (Inches)",
    features: [
      "250 GSM Premium Art Paper with Matt/Gloss Lamination",
      "Heavy Cardboard Bottom Board Reinforcement (Holds up to 8kg)",
      "Soft Cotton Twisted Rope or Satin Ribbon Handles",
      "Optional Spot UV & Gold/Silver Metallic Foil Stamping"
    ]
  },
  billBooks: {
    name: "Carbonless Duplicate & Triplicate Bill Books",
    tagline: "GST Tax Invoices & Cash Memos with Hardbound Cover",
    image: DiryWithPenImg,
    aspectType: "book",
    sizeSpec: "1/8 & 1/16 Standard Commercial Sizes",
    features: [
      "1+1 Duplicate (W+NP) or 1+2 Triplicate (W+P+Y) NCR Paper",
      "Consecutively Numbered with Red Ink Stamping",
      "Micro-Perforated Clean Tear-Off Lines",
      "Heavy Strawboard Backing with Protective Wrapping Flap"
    ]
  },
  pavatiBooks: {
    name: "Receipt & Pavati Books",
    tagline: "Cash Receipts & Donation Books with Perforated Counterfoil",
    image: DiryWithPenImg,
    aspectType: "book",
    sizeSpec: "Standard Receipt Formats with Counterfoil",
    features: [
      "Official Counterfoil Book Format for Audit Safety",
      "Color-Coded Client Copy & Office Copy",
      "Hardbound Spine with Red Cloth Binding Tape",
      "Numbered Sequentially with Pre-Printed Ruled Ledger"
    ]
  },
  wallCalendars: {
    name: "Wall & Desk Promotional Business Calendars",
    tagline: "12-Month High-Gloss Corporate Branding Calendars",
    image: StandBoardImg,
    aspectType: "calendar",
    sizeSpec: "11.5\" × 18\" Regular & 10\" × 15\" Small Sizes",
    features: [
      "130 GSM Art Paper with High-Gloss Coating",
      "Metal Twin-Loop Wire-O Spiral with Wall Hook",
      "365 Days Client Brand Visibility in Offices & Homes",
      "Pre-Printed National Holidays & Panchang Dates"
    ]
  },
  envelopes: {
    name: "Executive Office Envelopes",
    tagline: "Peel & Seal Commercial Banker Envelopes",
    image: BrochuresImg,
    aspectType: "envelope",
    sizeSpec: "9.5\" × 4.25\" Commercial Banker Size",
    features: [
      "High-Tack Peel & Seal Adhesive Strip (Instant Seal)",
      "100 GSM Bond & Superfine Paper Stock",
      "Window & Non-Window Configurations",
      "Matching Corporate Branding & Letterhead Set"
    ]
  },
  filesFolders: {
    name: "Corporate Presentation Pocket Folders",
    tagline: "Heavyweight 350 GSM Folders with Business Card Slot",
    image: PhotoAlbumImg,
    aspectType: "folder",
    sizeSpec: "Holds Standard A4 Sheets & Proposals",
    features: [
      "350 GSM High-Bulk Art Board with Anti-Scuff Coating",
      "4-inch Deep Glued Inner Pocket",
      "Die-Cut Slits for Standard Business Visiting Cards",
      "Professional Presentation for Client Proposals"
    ]
  },
  letterheads: {
    name: "Executive Official Letterheads",
    tagline: "100 GSM Bond Copier-Compatible Stationery",
    image: StandardVisitingCard,
    aspectType: "letterhead",
    sizeSpec: "A4 Size (210mm × 297mm)",
    features: [
      "100 GSM Premium Sunshine & Bond Stock",
      "Guaranteed Jam-Free on Laser & Inkjet Printers",
      "Full Color High-Resolution Header & Watermark",
      "Optional 50 or 100 Sheets Pad Binding"
    ]
  },
  stickersLabels: {
    name: "Die-Cut Vinyl Stickers & Product Labels",
    tagline: "Waterproof Gloss & Matt Self-Adhesive Sticker Sheets",
    image: StickersImg,
    aspectType: "sticker",
    sizeSpec: "Custom Shapes & Standard Slabs",
    features: [
      "100% Water, Oil & Tear Resistant Polymeric Vinyl",
      "Micro-Precision Optical Eye CNC Kiss-Cutting",
      "Easy Peel-and-Stick Backing Split Lines",
      "Vibrant 300 DPI Fade-Resistant Printing"
    ]
  },
  weddingCards: {
    name: "Royal Wedding Invitation Cards",
    tagline: "Multicolour 2-Side Foil & Textured Board with Matching Envelopes",
    image: CardInvitationImg,
    aspectType: "invitation",
    sizeSpec: "10\" × 15\" & 12.5\" × 18\" Royal Sheets",
    features: [
      "250 GSM Imported Textured & Metallic Boards",
      "Intricate Laser-Cut & Gold Hot Foil Stamping",
      "Matching Coordinated Mailing Envelopes Included",
      "Custom Hindi, Marathi & English Calligraphy Fonts"
    ]
  },
  invitationCards: {
    name: "Event & Party Invitation Cards",
    tagline: "6\" × 4\" Postcard & Event Stationery with Envelopes",
    image: CardInvitationImg,
    aspectType: "invitation",
    sizeSpec: "6\" × 4\" & 7\" × 5\" Formats",
    features: [
      "300 GSM Heavy Art Card with Double-Sided Print",
      "High Gloss UV or Silky Velvet Matte Finish",
      "Matching Peel & Seal Envelopes",
      "Fast 24-48 Hour Turnaround Dispatch"
    ]
  },
  brochures: {
    name: "Bi-Fold & Tri-Fold Marketing Brochures",
    tagline: "170 GSM & 250 GSM High-Bulk Gloss Paper",
    image: BrochuresImg,
    aspectType: "brochure",
    sizeSpec: "A4 Bi-Fold / 6-Panel Tri-Fold",
    features: [
      "170 & 250 GSM Art Paper with Rich Color Vibrancy",
      "Precision Machine Creasing to Prevent Fold Cracking",
      "Thermal Gloss or Matt Film Protection",
      "Perfect for Trade Fairs, Real Estate & Corporate Profiles"
    ]
  },
  booklets: {
    name: "Multi-Page Product Catalogs & Booklets",
    tagline: "8 to 32 Pages Saddle-Stitch Center Pinned",
    image: PhotoAlbumImg,
    aspectType: "booklet",
    sizeSpec: "A4 & A5 Multi-Page Booklets",
    features: [
      "Heavy Center Wire Saddle Stitching",
      "Thick Gloss Laminated Cover with Lightweight Inner Pages",
      "High-Density Industrial Color Saturation",
      "Ideal for Product Catalogs, Manuals & Annual Reports"
    ]
  },
  digitalPrints: {
    name: "High-Definition Digital Posters & Proofs",
    tagline: "12\" × 18\" & A4 Quick-Run Digital Proofs",
    image: LeafletImg,
    aspectType: "digital",
    sizeSpec: "12\" × 18\" & A4 Sheets",
    features: [
      "2400 × 2400 DPI Production Press Engine",
      "250 GSM Art Card or Metallic Pearl Textured Paper",
      "Single Sheets to 1,000+ Runs with Zero Plate Charges",
      "Same Day In-Store Counter Pickup Available"
    ]
  },
  visitingCards: {
    name: "Standard & Luxury Visiting Cards",
    tagline: "350 GSM Art Card with Spot UV & Velvet Finish",
    image: StandardVisitingCard,
    aspectType: "card",
    sizeSpec: "89mm × 51mm Standard Business Card",
    features: [
      "350 GSM Extra-Heavy Art Card with Spot UV & Velvet Lamination",
      "Rounded 6mm Corners or Square Architectural Cut",
      "Single or Double-Sided Full Color Printing",
      "Guaranteed 3mm Bleed Safety Pre-Press Inspection"
    ]
  }
};

export default function PrintConfigurator({ category = "visitingCards", title = "Custom Print Order" }) {
  const router = useRouter();
  const normCat = normalizeCategory(category);

  const [options, setOptions] = useState(null);
  const [loading, setLoading] = useState(true);
  const [calcLoading, setCalcLoading] = useState(false);
  const [quote, setQuote] = useState(() => {
    try {
      return calculateProductPrice(normCat, {
        qty: normCat === "visitingCards" || normCat === "tags" || normCat === "pamphlets" || normCat === "letterheads" ? 1000 :
             normCat === "paperBags" || normCat === "invitationCards" ? 100 :
             normCat === "weddingCards" ? 500 :
             normCat === "billBooks" ? 12 :
             normCat === "pavatiBooks" ? 10 :
             normCat === "stickersLabels" ? 48 : 1,
        materialId: normCat === "tags" ? "art_250_f_no_lam" : "art_card_350",
        stringTie: normCat === "tags" ? true : false,
        sides: 2,
        lamination: "none"
      });
    } catch (e) {
      return null;
    }
  });
  const [uploadedFile, setUploadedFile] = useState(null);

  // Visual simulation and design ingestion states
  const [visualOrientation, setVisualOrientation] = useState("landscape"); // 'landscape' | 'portrait'
  const [visualSide, setVisualSide] = useState("front"); // 'front' | 'back'
  const [cornerStyle, setCornerStyle] = useState("square"); // 'square' | 'rounded'
  const [designMode, setDesignMode] = useState("upload"); // 'upload' | 'studio' | 'hire_designer'
  const [designerBrief, setDesignerBrief] = useState("");
  const [designerPhone, setDesignerPhone] = useState("");
  const [studioArtwork, setStudioArtwork] = useState(null);
  const [galleryImageIdx, setGalleryImageIdx] = useState(0);

  const getProductGallery = () => {
    switch (normCat) {
      case "paperBags":
        return [
          { label: "Kraft Paper Bag", src: "/images/PaperBag.jpeg" },
          { label: "Rope & Handle Detail", src: "/images/PaperBag.jpeg" },
          { label: "Retail Packaging", src: "/images/PaperPrinting.png" }
        ];
      case "tags":
        return [
          { label: "Apparel Swing Tag", src: "/images/product-tags-hangtags.jpg" },
          { label: "Brass Eyelet Punch", src: "/images/product-tags-hangtags.jpg" },
          { label: "Packaging Context", src: "/images/PaperPrinting.png" }
        ];
      case "stamps":
        return [
          { label: "Self-Inking Flash Stamp", src: "/images/self-inking-stamps.jpg" },
          { label: "Official Imprint Sample", src: "/images/Stamp.jpeg" },
          { label: "Dater & Nylon Stamp", src: "/images/Stamp.jpeg" }
        ];
      case "stickersLabels":
        return [
          { label: "Gloss Vinyl Stickers", src: "/images/Stickers.jpeg" },
          { label: "Kiss-Cut Sheet Detail", src: "/images/Stickers.jpeg" },
          { label: "Bottle & Box Labels", src: "/images/PaperPrinting.png" }
        ];
      case "brochures":
      case "booklets":
        return [
          { label: "Bi-Fold Gloss Brochure", src: "/images/brochures.jpeg" },
          { label: "Folding & Creasing Detail", src: "/images/BROCHUR (2).jpg" },
          { label: "Catalog Cover Spread", src: "/images/BROCHUR (3).jpg" }
        ];
      case "billBooks":
      case "pavatiBooks":
        return [
          { label: "NCR Carbonless Invoice", src: "/images/DiryWithPen.jpeg" },
          { label: "Perforation & Binding", src: "/images/PaperPrinting.png" },
          { label: "Triplicate Book Spread", src: "/images/DiryWithPen.jpeg" }
        ];
      case "wallCalendars":
        return [
          { label: "12-Month Wall Calendar", src: "/images/Calnedar.jpg" },
          { label: "Twin Wire-O Spiral", src: "/images/Desk Calnedar.jpg" }
        ];
      case "weddingCards":
      case "invitationCards":
        return [
          { label: "Royal Foil Wedding Card", src: "/images/CardInvitation.jpeg" },
          { label: "Textured Sheet & Envelope", src: "/images/Invitation Card.jpg" }
        ];
      case "visitingCards":
      default:
        return [
          { label: "350 GSM Matte Art Card", src: "/images/StandardVisitingCard.jpeg" },
          { label: "Raised Spot UV Reflection", src: "/images/Visiting_Card2.png" },
          { label: "Metallic Gold Foil Spread", src: "/images/Visiting_Card3.png" }
        ];
    }
  };

  const galleryImages = getProductGallery();

  // Sync artwork created in K2 Design Studio
  useEffect(() => {
    if (typeof window !== "undefined") {
      try {
        const storedStudio = localStorage.getItem("k2_studio_artwork");
        if (storedStudio) {
          const parsed = JSON.parse(storedStudio);
          if (parsed && (parsed.frontPreview || parsed.artworkName)) {
            setStudioArtwork(parsed);
            setUploadedFile({
              name: parsed.artworkName || "Studio_Design_Artwork.png",
              size: "High-Res 300 DPI Vector/PNG",
              preview: parsed.frontPreview || null
            });
            setDesignMode("studio");
          }
        }
      } catch (e) {
        console.error("Failed to load studio artwork:", e);
      }
    }
  }, []);

  // Form selections state with sensible defaults for each category
  const [params, setParams] = useState({
    qty: normCat === "visitingCards" || normCat === "tags" || normCat === "pamphlets" || normCat === "letterheads" ? 1000 :
         normCat === "paperBags" || normCat === "invitationCards" ? 100 :
         normCat === "weddingCards" ? 500 :
         normCat === "billBooks" ? 12 :
         normCat === "pavatiBooks" ? 10 :
         normCat === "stickersLabels" ? 48 : 1,
    materialId: normCat === "tags" ? "art_250_f_no_lam" : "art_card_350",
    sides: 2,
    lamination: "none",
    spotUV: "both",
    size: normCat === "invitationCards" ? "6x4" : normCat === "weddingCards" ? "10x15" : "12x18",
    paperType: "250gsm",
    colourType: "multicolour",
    categoryType: "multi_100gsm_bond",
    sizeCode: "PB-1",
    finish: "gloss",
    foil: false,
    envelope: false,
    binding: "none",
    stringTie: normCat === "tags" ? true : false,
    perforation: false,
    stampType: "basic_nylon_rect_1line",
    calendarType: "regular_130gsm",
    bookType: normCat === "pavatiBooks" ? "multicolour_100pg" : "1_16_wnp_100pg",
    productKey: normCat === "booklets" ? "A4_4side_170gsm" : "A4_250gsm",
    subType: normCat === "booklets" ? "booklet" : "brochure",
    fileType: "paper_250gsm",
    innerPrint: false,
    stickerType: "49x41mm"
  });

  // Load category pricing matrix options
  useEffect(() => {
    async function loadOptions() {
      setLoading(true);
      const res = await getPricingOptionsApi(normCat);
      if (res && res.status && res.data) {
        setOptions(res.data);
        if (normCat === "tags") {
          setParams(prev => ({
            ...prev,
            materialId: prev.materialId && prev.materialId.startsWith("art_250") ? prev.materialId : "art_250_f_no_lam",
            qty: prev.qty || 1000,
            stringTie: prev.stringTie !== undefined ? prev.stringTie : true
          }));
        }
      }
      setLoading(false);
    }
    loadOptions();
  }, [normCat]);

  // Recalculate quote whenever parameters change
  useEffect(() => {
    async function computeQuote() {
      setCalcLoading(true);
      const payload = { ...params };
      if (normCat === "stickersLabels") {
        payload.type = params.stickerType || params.type || "49x41mm";
      }
      if (normCat === "tags") {
        if (!payload.materialId || payload.materialId === "art_card_350") {
          payload.materialId = "art_250_f_no_lam";
        }
        if (!payload.qty) payload.qty = 1000;
      }
      const res = await calculatePriceApi(normCat, payload);
      if (res && res.status && res.data) {
        setQuote(res.data);
      }
      setCalcLoading(false);
    }
    computeQuote();
  }, [normCat, params]);

  const updateParam = (key, value) => {
    setParams(prev => ({ ...prev, [key]: value }));
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const isImg = file.type.startsWith("image/");
      setUploadedFile({
        name: file.name,
        size: (file.size / (1024 * 1024)).toFixed(2) + " MB",
        preview: isImg ? URL.createObjectURL(file) : null
      });
      setDesignMode("upload");
    }
  };

  const designFee = designMode === "hire_designer" ? 299 : 0;
  const effectiveSubtotal = Number((quote?.subtotal || 0) + designFee);
  const effectiveGst = Number((effectiveSubtotal * 0.18).toFixed(2));
  const effectiveFinalTotal = Number((effectiveSubtotal + effectiveGst).toFixed(2));

  const handleProceedToCheckout = () => {
    const specs = Object.entries(params).map(([k, v]) => ({ label: k, value: String(v) }));
    specs.push({ label: "Orientation", value: visualOrientation });
    if (cornerStyle === "rounded") {
      specs.push({ label: "Corners", value: "6mm Rounded Corners" });
    }
    if (designMode === "hire_designer") {
      specs.push({ label: "Design Assistance", value: "K2 In-House Graphic Artist (+₹299)" });
      if (designerBrief) specs.push({ label: "Design Brief", value: designerBrief });
      if (designerPhone) specs.push({ label: "WhatsApp Proof Contact", value: designerPhone });
    } else if (designMode === "studio") {
      specs.push({ label: "Design Method", value: "Custom Designed in K2 Studio" });
    }

    const configuredItem = {
      id: `print-${Date.now()}`,
      name: options?.name || title,
      category: normCat,
      specs,
      quantity: quote?.quantity || params.qty,
      unitPrice: quote?.unitPrice || 0,
      totalPrice: effectiveSubtotal,
      artworkFile: uploadedFile?.name || (designMode === "hire_designer" ? "K2 Designer Assistance Requested" : null)
    };

    if (typeof window !== "undefined") {
      let currentCart = [];
      try {
        currentCart = JSON.parse(localStorage.getItem("k2_active_cart") || "[]");
        if (!Array.isArray(currentCart)) currentCart = [];
      } catch (e) {
        currentCart = [];
      }
      currentCart.push(configuredItem);
      localStorage.setItem("k2_active_cart", JSON.stringify(currentCart));
      window.dispatchEvent(new Event("storage"));
    }

    router.push("/ProceedToCheckout");
  };

  const currentMedia = PRODUCT_CATALOG_MEDIA[normCat] || PRODUCT_CATALOG_MEDIA.visitingCards;

  return (
    <div className="w-full max-w-[1520px] mx-auto py-6 px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-7">
        {/* Left: Configuration Form (7 cols on lg, 8 cols on xl) */}
        <div className="lg:col-span-7 xl:col-span-8 space-y-6">

          {/* HIGH-DEFINITION REAL PRODUCT PHOTOGRAPHY SHOWCASE (Replacing synthetic live simulation) */}
          <div className="shadow-md border border-gray-200/90 bg-white rounded-2xl overflow-hidden p-6">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 border-b border-gray-100 pb-3 mb-4">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-purple-100 text-[#9c1dac] flex items-center justify-center font-bold">
                  <Package size={18} />
                </div>
                <div>
                  <h3 className="font-bold text-sm text-gray-900 flex items-center gap-2">
                    {currentMedia.name}
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
                  src={
                    galleryImages[galleryImageIdx]?.src || currentMedia.image
                  }
                  alt={currentMedia.name}
                  fill
                  priority
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                
                {/* Floating Angle Tag */}
                <div className="absolute top-3 left-3 bg-black/75 backdrop-blur-md text-white text-[10px] font-bold px-2.5 py-1 rounded-full shadow-sm">
                  {galleryImages[galleryImageIdx]?.label || "Factory Production Sample"}
                </div>

                {/* Pre-press resolution badge */}
                <div className="absolute bottom-3 left-3 right-3 bg-white/90 backdrop-blur-md border border-gray-200/80 rounded-xl p-2.5 flex items-center justify-between shadow-xs">
                  <div className="flex items-center gap-1.5 text-xs text-gray-800 font-semibold truncate">
                    <ShieldCheck size={14} className="text-[#9c1dac] shrink-0" />
                    <span className="truncate">{currentMedia.sizeSpec}</span>
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
                    {currentMedia.name} Highlights
                  </h4>
                  {currentMedia.features.slice(0, 3).map((feat, idx) => (
                    <div key={idx} className="flex items-start gap-1.5 text-xs text-gray-600 leading-snug">
                      <CheckCircle size={13} className="text-emerald-600 shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* SEAMLESS HANDOFF TO K2 STUDIO BANNER */}
            <div className="mt-5 p-4 rounded-xl bg-gradient-to-r from-purple-50 via-indigo-50 to-purple-50 border border-purple-200 flex flex-col sm:flex-row items-center justify-between gap-3 shadow-xs">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#9c1dac] text-white flex items-center justify-center shrink-0 shadow-xs">
                  <Palette size={20} />
                </div>
                <div>
                  <h4 className="text-xs sm:text-sm font-bold text-gray-900">
                    Want to create custom artwork or designs?
                  </h4>
                  <p className="text-[11px] text-gray-600">
                    Launch K2 Studio to customize text, logos, AI generative imagery & templates for this product.
                  </p>
                </div>
              </div>

              <Link
                href={`/studio?product=${normCat}`}
                className="px-4 py-2 bg-[#9c1dac] hover:bg-[#831492] text-white text-xs font-bold rounded-lg transition shadow-xs whitespace-nowrap shrink-0 flex items-center gap-1.5"
              >
                <span>Launch K2 Studio</span>
                <ArrowRight size={14} />
              </Link>
            </div>

            {/* Footer Assurance */}
            <div className="flex flex-wrap items-center justify-between text-[11px] text-gray-500 pt-3 mt-4 border-t border-gray-100 gap-2">
              <span>📐 Size: {currentMedia.sizeSpec}</span>
              <span className="text-[#9c1dac] font-semibold">⚡ 3mm Bleed Pre-Press Check Passed</span>
              <span>🏬 Free Pickup at 6 Branches in Pune & Mumbai</span>
            </div>
          </div>

          <div className="shadow-md border border-gray-200/90 bg-white rounded-2xl overflow-hidden p-6 space-y-6">
            <div className="border-b border-gray-100 pb-4">
              <h3 className="text-xl font-bold flex items-center gap-2 text-gray-900">
                <Layers className="text-purple-700" size={22} />
                <span>Configure Specifications: {options?.name || title}</span>
              </h3>
            </div>
            <div className="space-y-6">

              {/* 1. VISITING CARDS */}
              {normCat === "visitingCards" && (
                <div className="space-y-4">
                  <div>
                    <Label className="font-semibold text-sm">Paper Stock & Texture</Label>
                    <Select
                      value={params.materialId}
                      onValueChange={(v) => updateParam("materialId", v)}
                    >
                      <SelectTrigger className="w-full mt-1.5"><SelectValue /></SelectTrigger>
                      <SelectContent>
                        {options?.materials?.map((m) => (
                          <SelectItem key={m.id} value={m.id}>
                            {m.name} (Base: ₹{m.baseRate1Side}/card)
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <Label className="font-semibold text-sm">Print Sides</Label>
                      <Select
                        value={String(params.sides)}
                        onValueChange={(v) => updateParam("sides", Number(v))}
                      >
                        <SelectTrigger className="w-full mt-1.5"><SelectValue /></SelectTrigger>
                        <SelectContent>
                          <SelectItem value="1">Single Side (Front Only)</SelectItem>
                          <SelectItem value="2">Both Sides (Front & Back +₹0.30/card)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label className="font-semibold text-sm">Finishing / Lamination</Label>
                      <Select
                        value={params.lamination}
                        onValueChange={(v) => updateParam("lamination", v)}
                      >
                        <SelectTrigger className="w-full mt-1.5"><SelectValue /></SelectTrigger>
                        <SelectContent>
                          <SelectItem value="none">No Lamination</SelectItem>
                          <SelectItem value="glossFront">Gloss Lamination (Front Only +₹0.10)</SelectItem>
                          <SelectItem value="glossBoth">Gloss Lamination (Both Sides +₹0.15)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div>
                    <Label className="font-semibold text-sm">Spot UV Coating</Label>
                    <Select
                      value={params.spotUV}
                      onValueChange={(v) => updateParam("spotUV", v)}
                    >
                      <SelectTrigger className="w-full mt-1.5"><SelectValue /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="none">No Spot UV</SelectItem>
                        <SelectItem value="front">Spot UV Front Side (+₹0.20)</SelectItem>
                        <SelectItem value="both">Spot UV Both Sides (+₹0.35)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              )}

              {/* 2. DIGITAL PRINTS (12x18 & A4) */}
              {normCat === "digitalPrints" && (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <Label className="font-semibold text-sm">Sheet Size</Label>
                      <Select value={params.size} onValueChange={(v) => updateParam("size", v)}>
                        <SelectTrigger className="w-full mt-1.5"><SelectValue /></SelectTrigger>
                        <SelectContent>
                          <SelectItem value="12x18">12 x 18 inches (Standard Digital Sheet)</SelectItem>
                          <SelectItem value="A4">A4 (8.27 x 11.69 inches)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label className="font-semibold text-sm">Paper Stock</Label>
                      <Select value={params.paperType} onValueChange={(v) => updateParam("paperType", v)}>
                        <SelectTrigger className="w-full mt-1.5"><SelectValue /></SelectTrigger>
                        <SelectContent>
                          <SelectItem value="250gsm">250 GSM Art Card</SelectItem>
                          <SelectItem value="170gsm">170 GSM / 100 GSM Paper</SelectItem>
                          <SelectItem value="Texture">Metallic or Texture Paper</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <Label className="font-semibold text-sm">Sides</Label>
                      <Select value={String(params.sides)} onValueChange={(v) => updateParam("sides", Number(v))}>
                        <SelectTrigger className="w-full mt-1.5"><SelectValue /></SelectTrigger>
                        <SelectContent>
                          <SelectItem value="1">1 Side Print</SelectItem>
                          <SelectItem value="2">2 Side Print (Double Rate)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label className="font-semibold text-sm">Lamination Finish</Label>
                      <Select value={String(params.lamination)} onValueChange={(v) => updateParam("lamination", v === "true")}>
                        <SelectTrigger className="w-full mt-1.5"><SelectValue /></SelectTrigger>
                        <SelectContent>
                          <SelectItem value="false">No Lamination</SelectItem>
                          <SelectItem value="true">Include Thermal Lamination</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div>
                    <Label className="font-semibold text-sm">Quantity of Sheets</Label>
                    <Input
                      type="number"
                      min={1}
                      max={1000}
                      value={params.qty}
                      onChange={(e) => updateParam("qty", Number(e.target.value) || 1)}
                      className="mt-1.5"
                    />
                  </div>
                </div>
              )}

              {/* 3. WEDDING CARDS */}
              {normCat === "weddingCards" && (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <Label className="font-semibold text-sm">Card Size</Label>
                      <Select value={params.size} onValueChange={(v) => updateParam("size", v)}>
                        <SelectTrigger className="w-full mt-1.5"><SelectValue /></SelectTrigger>
                        <SelectContent>
                          <SelectItem value="10x15">10 x 15 inches (210 gsm Art)</SelectItem>
                          <SelectItem value="11.5x18">11.5 x 18 inches (250 gsm Art)</SelectItem>
                          <SelectItem value="12.5x18">12.5 x 18 inches (250 gsm Art)</SelectItem>
                          <SelectItem value="15x20">15 x 20 inches (250 gsm Art)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label className="font-semibold text-sm">Quantity Slot</Label>
                      <Select value={String(params.qty)} onValueChange={(v) => updateParam("qty", Number(v))}>
                        <SelectTrigger className="w-full mt-1.5"><SelectValue /></SelectTrigger>
                        <SelectContent>
                          <SelectItem value="500">500 Cards</SelectItem>
                          <SelectItem value="700">700 Cards</SelectItem>
                          <SelectItem value="1000">1,000 Cards</SelectItem>
                          <SelectItem value="2000">2,000 Cards</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <Label className="font-semibold text-sm">1-Side Lamination</Label>
                      <Select value={String(params.lamination)} onValueChange={(v) => updateParam("lamination", v === "true")}>
                        <SelectTrigger className="w-full mt-1.5"><SelectValue /></SelectTrigger>
                        <SelectContent>
                          <SelectItem value="false">No Lamination</SelectItem>
                          <SelectItem value="true">Include 1-Side Lamination</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label className="font-semibold text-sm">Matching Envelope</Label>
                      <Select value={String(params.envelope)} onValueChange={(v) => updateParam("envelope", v === "true")}>
                        <SelectTrigger className="w-full mt-1.5"><SelectValue /></SelectTrigger>
                        <SelectContent>
                          <SelectItem value="false">Without Envelope</SelectItem>
                          <SelectItem value="true">With Matching Envelopes</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
              )}

              {/* 4. BILL BOOKS */}
              {normCat === "billBooks" && (
                <div className="space-y-4">
                  <div>
                    <Label className="font-semibold text-sm">Book Specifications (Size, Paper, Colors)</Label>
                    <Select value={params.bookType} onValueChange={(v) => updateParam("bookType", v)}>
                      <SelectTrigger className="w-full mt-1.5"><SelectValue /></SelectTrigger>
                      <SelectContent className="max-h-60">
                        {Object.entries(options?.types || {}).map(([key, def]) => (
                          <SelectItem key={key} value={key}>{def.name}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label className="font-semibold text-sm">Quantity (Number of Books)</Label>
                    <Select value={String(params.qty)} onValueChange={(v) => updateParam("qty", Number(v))}>
                      <SelectTrigger className="w-full mt-1.5"><SelectValue /></SelectTrigger>
                      <SelectContent>
                        {options?.types?.[params.bookType]?.rates ? (
                          Object.keys(options.types[params.bookType].rates).map(q => (
                            <SelectItem key={q} value={q}>{q} Books</SelectItem>
                          ))
                        ) : (
                          [5, 6, 10, 12, 20, 24, 50, 52].map(q => (
                            <SelectItem key={q} value={String(q)}>{q} Books</SelectItem>
                          ))
                        )}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              )}

              {/* 5. PAVATI BOOKS */}
              {normCat === "pavatiBooks" && (
                <div className="space-y-4">
                  <div>
                    <Label className="font-semibold text-sm">Receipt / Pavati Book Format</Label>
                    <Select value={params.bookType} onValueChange={(v) => updateParam("bookType", v)}>
                      <SelectTrigger className="w-full mt-1.5"><SelectValue /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="multicolour_50pg">Multi Colour - 50 Pages</SelectItem>
                        <SelectItem value="multicolour_100pg">Multi Colour - 100 Pages</SelectItem>
                        <SelectItem value="onecolour_100pg">One Colour - 100 Pages</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label className="font-semibold text-sm">Quantity (Books)</Label>
                    <Select value={String(params.qty)} onValueChange={(v) => updateParam("qty", Number(v))}>
                      <SelectTrigger className="w-full mt-1.5"><SelectValue /></SelectTrigger>
                      <SelectContent>
                        {params.bookType === "multicolour_50pg" ? (
                          [2, 4, 6, 10].map(q => <SelectItem key={q} value={String(q)}>{q} Books</SelectItem>)
                        ) : (
                          [10, 20, 50].map(q => <SelectItem key={q} value={String(q)}>{q} Books</SelectItem>)
                        )}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              )}

              {/* 6. BROCHURES & BOOKLETS */}
              {(normCat === "brochures" || normCat === "booklets" || normCat === "brochuresBooklets") && (
                <div className="space-y-4">
                  <div>
                    <Label className="font-semibold text-sm">Size & Format</Label>
                    <Select value={params.productKey} onValueChange={(v) => updateParam("productKey", v)}>
                      <SelectTrigger className="w-full mt-1.5"><SelectValue /></SelectTrigger>
                      <SelectContent>
                        {normCat === "booklets" ? (
                          <>
                            <SelectItem value="A5_4side_250gsm">A5 Booklet - 4 Pages (250gsm)</SelectItem>
                            <SelectItem value="A5_4side_170gsm">A5 Booklet - 4 Pages (170gsm)</SelectItem>
                            <SelectItem value="A5_8side_170gsm">A5 Booklet - 8 Pages (170gsm)</SelectItem>
                            <SelectItem value="A5_12side_170gsm">A5 Booklet - 12 Pages (170gsm)</SelectItem>
                            <SelectItem value="A4_4side_250gsm">A4 Booklet - 4 Pages (250gsm)</SelectItem>
                            <SelectItem value="A4_4side_170gsm">A4 Booklet - 4 Pages (170gsm)</SelectItem>
                            <SelectItem value="A4_8side_170gsm">A4 Booklet - 8 Pages (170gsm)</SelectItem>
                          </>
                        ) : (
                          <>
                            <SelectItem value="A5_300gsm">A5 Brochure - 300 gsm</SelectItem>
                            <SelectItem value="A5_250gsm">A5 Brochure - 250 gsm</SelectItem>
                            <SelectItem value="A4_300gsm">A4 Brochure - 300 gsm</SelectItem>
                            <SelectItem value="A4_250gsm">A4 Brochure - 250 gsm</SelectItem>
                          </>
                        )}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <Label className="font-semibold text-sm">Quantity</Label>
                      <Select value={String(params.qty)} onValueChange={(v) => updateParam("qty", Number(v))}>
                        <SelectTrigger className="w-full mt-1.5"><SelectValue /></SelectTrigger>
                        <SelectContent>
                          {[500, 1000, 2000, 4000].map(q => (
                            <SelectItem key={q} value={String(q)}>{q} Units</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    {normCat !== "booklets" && (
                      <div>
                        <Label className="font-semibold text-sm">Lamination Finish</Label>
                        <Select value={String(params.lamination)} onValueChange={(v) => updateParam("lamination", v === "true")}>
                          <SelectTrigger className="w-full mt-1.5"><SelectValue /></SelectTrigger>
                          <SelectContent>
                            <SelectItem value="false">No Lamination</SelectItem>
                            <SelectItem value="true">Include Thermal Lamination</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* 7. PAMPHLETS / FLYERS */}
              {normCat === "pamphlets" && (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <Label className="font-semibold text-sm">Paper & Color Type</Label>
                      <Select value={params.colourType} onValueChange={(v) => updateParam("colourType", v)}>
                        <SelectTrigger className="w-full mt-1.5"><SelectValue /></SelectTrigger>
                        <SelectContent>
                          <SelectItem value="multicolour">Multicolour - 130 gsm Art Paper</SelectItem>
                          <SelectItem value="oneColour">One Colour - 70 gsm White Paper</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label className="font-semibold text-sm">Flyer Size</Label>
                      <Select value={params.size} onValueChange={(v) => updateParam("size", v)}>
                        <SelectTrigger className="w-full mt-1.5"><SelectValue /></SelectTrigger>
                        <SelectContent>
                          <SelectItem value="A5">A5 Size</SelectItem>
                          <SelectItem value="A4">A4 Size</SelectItem>
                          <SelectItem value="A3_12x18">A3 (12 x 18)</SelectItem>
                          <SelectItem value="A2_18x23">A2 (18 x 23)</SelectItem>
                          <SelectItem value="7x10">7 x 10 inches</SelectItem>
                          <SelectItem value="10x15">10 x 15 inches</SelectItem>
                          <SelectItem value="15x20">15 x 20 inches</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <Label className="font-semibold text-sm">Sides</Label>
                      <Select value={String(params.sides)} onValueChange={(v) => updateParam("sides", Number(v))}>
                        <SelectTrigger className="w-full mt-1.5"><SelectValue /></SelectTrigger>
                        <SelectContent>
                          <SelectItem value="1">1 Side Print</SelectItem>
                          <SelectItem value="2">2 Side Print</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label className="font-semibold text-sm">Quantity</Label>
                      <Select value={String(params.qty)} onValueChange={(v) => updateParam("qty", Number(v))}>
                        <SelectTrigger className="w-full mt-1.5"><SelectValue /></SelectTrigger>
                        <SelectContent>
                          {[500, 1000, 2000, 4000, 8000].map(q => (
                            <SelectItem key={q} value={String(q)}>{q} Flyers</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
              )}

              {/* 8. ENVELOPES */}
              {normCat === "envelopes" && (
                <div className="space-y-4">
                  <div>
                    <Label className="font-semibold text-sm">Envelope Material & Printing</Label>
                    <Select value={params.categoryType} onValueChange={(v) => updateParam("categoryType", v)}>
                      <SelectTrigger className="w-full mt-1.5"><SelectValue /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="multi_100gsm_bond">Multicolour - 100gsm Bond / Sunshine</SelectItem>
                        <SelectItem value="one_colour_100gsm_bond">One Colour - 100gsm Bond / Sunshine</SelectItem>
                        <SelectItem value="multi_130gsm_art">Multicolour - 130gsm Art Paper</SelectItem>
                        <SelectItem value="one_colour_70gsm_maplitho">One Colour - 70gsm Maplitho (6x4)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <Label className="font-semibold text-sm">Size</Label>
                      <Select value={params.size} onValueChange={(v) => updateParam("size", v)}>
                        <SelectTrigger className="w-full mt-1.5"><SelectValue /></SelectTrigger>
                        <SelectContent>
                          {params.categoryType === "one_colour_70gsm_maplitho" ? (
                            <SelectItem value="6x4">6 x 4 inches</SelectItem>
                          ) : (
                            <>
                              <SelectItem value="9x4">9 x 4 inches</SelectItem>
                              <SelectItem value="7x5">7 x 5 inches</SelectItem>
                              <SelectItem value="6x9">6 x 9 inches</SelectItem>
                              <SelectItem value="A4">A4 Size</SelectItem>
                            </>
                          )}
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label className="font-semibold text-sm">Quantity</Label>
                      <Select value={String(params.qty)} onValueChange={(v) => updateParam("qty", Number(v))}>
                        <SelectTrigger className="w-full mt-1.5"><SelectValue /></SelectTrigger>
                        <SelectContent>
                          {[100, 200, 300, 500, 1000, 2000].map(q => (
                            <SelectItem key={q} value={String(q)}>{q} Envelopes</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
              )}

              {/* 9. FILES & FOLDERS */}
              {normCat === "filesFolders" && (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <Label className="font-semibold text-sm">Folder Material</Label>
                      <Select value={params.fileType} onValueChange={(v) => updateParam("fileType", v)}>
                        <SelectTrigger className="w-full mt-1.5"><SelectValue /></SelectTrigger>
                        <SelectContent>
                          <SelectItem value="paper_250gsm">Paper Files (250 gsm)</SelectItem>
                          <SelectItem value="premium_board_320gsm">Premium Board Files (320 gsm)</SelectItem>
                          <SelectItem value="plastic_pp_03mm">Plastic Files (PP 0.3mm)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label className="font-semibold text-sm">Quantity</Label>
                      <Select value={String(params.qty)} onValueChange={(v) => updateParam("qty", Number(v))}>
                        <SelectTrigger className="w-full mt-1.5"><SelectValue /></SelectTrigger>
                        <SelectContent>
                          {[250, 500, 1000, 2000, 3000, 4000, 5000].map(q => (
                            <SelectItem key={q} value={String(q)}>{q} Folders</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <Label className="font-semibold text-sm">Lamination</Label>
                      <Select value={params.lamination} onValueChange={(v) => updateParam("lamination", v)}>
                        <SelectTrigger className="w-full mt-1.5"><SelectValue /></SelectTrigger>
                        <SelectContent>
                          <SelectItem value="none">No Lamination</SelectItem>
                          <SelectItem value="gloss">Gloss Lamination</SelectItem>
                          <SelectItem value="matt">Matt Lamination</SelectItem>
                          <SelectItem value="spotUV">Matt + Spot UV</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label className="font-semibold text-sm">Inner Side Printing</Label>
                      <Select value={String(params.innerPrint)} onValueChange={(v) => updateParam("innerPrint", v === "true")}>
                        <SelectTrigger className="w-full mt-1.5"><SelectValue /></SelectTrigger>
                        <SelectContent>
                          <SelectItem value="false">No Inner Print</SelectItem>
                          <SelectItem value="true">Include Inner Side Print</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
              )}

              {/* 10. INVITATION CARDS */}
              {normCat === "invitationCards" && (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <Label className="font-semibold text-sm">Card Size (250gsm Multicolour)</Label>
                      <Select value={params.size} onValueChange={(v) => updateParam("size", v)}>
                        <SelectTrigger className="w-full mt-1.5"><SelectValue /></SelectTrigger>
                        <SelectContent>
                          <SelectItem value="6x4">6 x 4 inches</SelectItem>
                          <SelectItem value="7x5">7 x 5 inches</SelectItem>
                          <SelectItem value="6x9">6 x 9 inches</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label className="font-semibold text-sm">Quantity</Label>
                      <Select value={String(params.qty)} onValueChange={(v) => updateParam("qty", Number(v))}>
                        <SelectTrigger className="w-full mt-1.5"><SelectValue /></SelectTrigger>
                        <SelectContent>
                          {[100, 200, 300, 500, 1000, 2000].map(q => (
                            <SelectItem key={q} value={String(q)}>{q} Cards</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <Label className="font-semibold text-sm">Sides</Label>
                      <Select value={String(params.sides)} onValueChange={(v) => updateParam("sides", Number(v))}>
                        <SelectTrigger className="w-full mt-1.5"><SelectValue /></SelectTrigger>
                        <SelectContent>
                          <SelectItem value="1">1 Side Print</SelectItem>
                          <SelectItem value="2">2 Side Print (Double Rate)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label className="font-semibold text-sm">Lamination</Label>
                      <Select value={String(params.lamination)} onValueChange={(v) => updateParam("lamination", v === "true")}>
                        <SelectTrigger className="w-full mt-1.5"><SelectValue /></SelectTrigger>
                        <SelectContent>
                          <SelectItem value="false">No Lamination</SelectItem>
                          <SelectItem value="true">Include Thermal Lamination</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
              )}

              {/* 11. LETTERHEADS */}
              {normCat === "letterheads" && (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <Label className="font-semibold text-sm">Quantity (A4 100gsm Bond / Maplitho)</Label>
                      <Select value={String(params.qty)} onValueChange={(v) => updateParam("qty", Number(v))}>
                        <SelectTrigger className="w-full mt-1.5"><SelectValue /></SelectTrigger>
                        <SelectContent>
                          {[100, 200, 300, 500, 1000, 2000, 4000, 8000, 10000].map(q => (
                            <SelectItem key={q} value={String(q)}>{q} Sheets</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label className="font-semibold text-sm">Pad Binding Option</Label>
                      <Select value={params.binding} onValueChange={(v) => updateParam("binding", v)}>
                        <SelectTrigger className="w-full mt-1.5"><SelectValue /></SelectTrigger>
                        <SelectContent>
                          <SelectItem value="none">Loose Sheets (No Binding)</SelectItem>
                          <SelectItem value="100sheet">Pad Binding (100 Sheets / Pad)</SelectItem>
                          <SelectItem value="50sheet">Pad Binding (50 Sheets / Pad)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
              )}

              {/* 12. PAPER BAGS */}
              {normCat === "paperBags" && (
                <div className="space-y-4">
                  <div>
                    <Label className="font-semibold text-sm">Bag Dimensions & Code (PB-1 to PB-20)</Label>
                    <Select value={params.sizeCode} onValueChange={(v) => updateParam("sizeCode", v)}>
                      <SelectTrigger className="w-full mt-1.5"><SelectValue /></SelectTrigger>
                      <SelectContent className="max-h-60">
                        {Object.entries(options?.sizes || {}).map(([code, def]) => (
                          <SelectItem key={code} value={code}>
                            {code} : {def.dimensions} inches
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <Label className="font-semibold text-sm">Quantity</Label>
                      <Select value={String(params.qty)} onValueChange={(v) => updateParam("qty", Number(v))}>
                        <SelectTrigger className="w-full mt-1.5"><SelectValue /></SelectTrigger>
                        <SelectContent>
                          {[100, 250, 500, 1000, 2000, 3000, 4000, 5000].map(q => (
                            <SelectItem key={q} value={String(q)}>{q} Bags</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label className="font-semibold text-sm">Surface Finish</Label>
                      <Select value={params.finish} onValueChange={(v) => updateParam("finish", v)}>
                        <SelectTrigger className="w-full mt-1.5"><SelectValue /></SelectTrigger>
                        <SelectContent>
                          <SelectItem value="gloss">Gloss Lamination (Base)</SelectItem>
                          <SelectItem value="matt">Matt Lamination Upgrade</SelectItem>
                          <SelectItem value="spotUV">Matt + Spot UV Upgrade</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label className="font-semibold text-sm">Hot Foil Stamping</Label>
                      <Select value={String(params.foil)} onValueChange={(v) => updateParam("foil", v === "true")}>
                        <SelectTrigger className="w-full mt-1.5"><SelectValue /></SelectTrigger>
                        <SelectContent>
                          <SelectItem value="false">No Foil</SelectItem>
                          <SelectItem value="true">Gold / Silver Foil Stamping</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
              )}

              {/* 13. STICKERS & LABELS */}
              {normCat === "stickersLabels" && (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <Label className="font-semibold text-sm">Sticker Size / Shape</Label>
                      <Select value={params.stickerType} onValueChange={(v) => updateParam("stickerType", v)}>
                        <SelectTrigger className="w-full mt-1.5"><SelectValue /></SelectTrigger>
                        <SelectContent>
                          <SelectItem value="49x41mm">49 x 41 mm</SelectItem>
                          <SelectItem value="vcard_size">Visiting Card Size (94 x 54 mm)</SelectItem>
                          <SelectItem value="4x3_inch">4 x 3 inch (3.8 x 2.8 in)</SelectItem>
                          <SelectItem value="5.8x3.8_inch">5.8 x 3.8 inch</SelectItem>
                          <SelectItem value="A5">A5 (8.6 x 5.6 inch)</SelectItem>
                          <SelectItem value="A4_custom">A4 Custom Sheet</SelectItem>
                          <SelectItem value="A3_custom">A3 Custom Sheet (12 x 18)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label className="font-semibold text-sm">Lamination</Label>
                      <Select value={String(params.lamination)} onValueChange={(v) => updateParam("lamination", v === "true")}>
                        <SelectTrigger className="w-full mt-1.5"><SelectValue /></SelectTrigger>
                        <SelectContent>
                          <SelectItem value="false">No Lamination</SelectItem>
                          <SelectItem value="true">Include Protective Lamination</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div>
                    <Label className="font-semibold text-sm">Quantity</Label>
                    <Input
                      type="number"
                      min={1}
                      value={params.qty}
                      onChange={(e) => updateParam("qty", Number(e.target.value) || 1)}
                      className="mt-1.5"
                    />
                  </div>
                </div>
              )}

              {/* 14. TAGS */}
              {normCat === "tags" && (
                <div className="space-y-4">
                  <div>
                    <Label className="font-semibold text-sm">Card Stock & Lamination</Label>
                    <Select value={params.materialId || "art_250_f_no_lam"} onValueChange={(v) => updateParam("materialId", v)}>
                      <SelectTrigger className="w-full mt-1.5"><SelectValue placeholder="Select Material" /></SelectTrigger>
                      <SelectContent>
                        {(options?.materials || pricingMatrix?.tags?.materials || []).map((m) => (
                          <SelectItem key={m.id} value={m.id}>
                            {m.name} (Base: ₹{m.baseRate}/tag)
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <Label className="font-semibold text-sm">Batch Quantity</Label>
                      <Select value={String(params.qty || 1000)} onValueChange={(v) => updateParam("qty", Number(v))}>
                        <SelectTrigger className="w-full mt-1.5"><SelectValue /></SelectTrigger>
                        <SelectContent>
                          <SelectItem value="1000">1,000 Tags (Standard Run)</SelectItem>
                          <SelectItem value="2000">2,000 Tags</SelectItem>
                          <SelectItem value="3000">3,000 Tags</SelectItem>
                          <SelectItem value="5000">5,000 Tags (Bulk Run)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label className="font-semibold text-sm">String Tie & Hole Punch</Label>
                      <Select value={String(params.stringTie ?? true)} onValueChange={(v) => updateParam("stringTie", v === "true")}>
                        <SelectTrigger className="w-full mt-1.5"><SelectValue /></SelectTrigger>
                        <SelectContent>
                          <SelectItem value="true">Include String Tie (+₹1.00/unit)</SelectItem>
                          <SelectItem value="false">Without String (Tags Only)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label className="font-semibold text-sm">Perforation Line</Label>
                      <Select value={String(params.perforation ?? false)} onValueChange={(v) => updateParam("perforation", v === "true")}>
                        <SelectTrigger className="w-full mt-1.5"><SelectValue /></SelectTrigger>
                        <SelectContent>
                          <SelectItem value="false">Without Perforation</SelectItem>
                          <SelectItem value="true">Include Perforation (+₹0.05/unit)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
              )}

              {/* 15. STAMPS */}
              {normCat === "stamps" && (
                <div className="space-y-4">
                  <div>
                    <Label className="font-semibold text-sm">Stamp Model & Ink Type</Label>
                    <Select value={params.stampType || "basic_nylon_rect_1line"} onValueChange={(v) => updateParam("stampType", v)}>
                      <SelectTrigger className="w-full mt-1.5"><SelectValue placeholder="Select Stamp Model" /></SelectTrigger>
                      <SelectContent>
                        {Object.entries(options?.types || pricingMatrix?.stamps?.types || {}).map(([key, def]) => (
                          <SelectItem key={key} value={key}>
                            {def.name} - ₹{def.price}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label className="font-semibold text-sm">Quantity of Stamps</Label>
                    <Input
                      type="number"
                      min={1}
                      max={50}
                      value={params.qty || 1}
                      onChange={(e) => updateParam("qty", Math.max(1, parseInt(e.target.value) || 1))}
                      className="mt-1.5"
                    />
                  </div>
                </div>
              )}

              {/* 16. WALL CALENDARS */}
              {normCat === "wallCalendars" && (
                <div className="space-y-4">
                  <div>
                    <Label className="font-semibold text-sm">Calendar Size & Paper Stock</Label>
                    <Select value={params.calendarType} onValueChange={(v) => updateParam("calendarType", v)}>
                      <SelectTrigger className="w-full mt-1.5"><SelectValue /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="regular_130gsm">Regular Size (11.5 x 18) - 130gsm Art Paper</SelectItem>
                        <SelectItem value="regular_80gsm">Regular Size (11.5 x 18) - 80gsm Maplitho</SelectItem>
                        <SelectItem value="small_130gsm">Small Size (10 x 15) - 130gsm Art Paper</SelectItem>
                        <SelectItem value="small_80gsm">Small Size (10 x 15) - 80gsm Maplitho</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label className="font-semibold text-sm">Quantity</Label>
                    <Select value={String(params.qty)} onValueChange={(v) => updateParam("qty", Number(v))}>
                      <SelectTrigger className="w-full mt-1.5"><SelectValue /></SelectTrigger>
                      <SelectContent>
                        {[1000, 2000, 4000].map(q => (
                          <SelectItem key={q} value={String(q)}>{q} Calendars</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              )}

              {/* 3-Way Artwork & Design Ingestion Section (Vistaprint Style) */}
              <div className="pt-6 border-t space-y-4">
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
                        ? "border-purple-600 bg-purple-50/50 shadow-sm"
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
                      <p className="text-xs text-gray-500 mt-1">PDF, AI, PSD, CDR or high-res images.</p>
                    </div>
                  </div>

                  <div
                    onClick={() => setDesignMode("studio")}
                    className={`p-3.5 rounded-xl border-2 cursor-pointer transition flex flex-col justify-between ${
                      designMode === "studio"
                        ? "border-purple-600 bg-purple-50/50 shadow-sm"
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
                      <p className="text-xs text-gray-500 mt-1">Customize text, logos & templates online.</p>
                    </div>
                  </div>

                  <div
                    onClick={() => setDesignMode("hire_designer")}
                    className={`p-3.5 rounded-xl border-2 cursor-pointer transition flex flex-col justify-between ${
                      designMode === "hire_designer"
                        ? "border-purple-600 bg-purple-50/50 shadow-sm"
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
                        accept=".pdf,.png,.jpg,.jpeg,.ai,.psd,.cdr"
                        onChange={handleFileUpload}
                        className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                      />
                      {uploadedFile ? (
                        <div className="flex items-center justify-center gap-2 text-green-700 font-medium">
                          <FileCheck size={24} />
                          <span>{uploadedFile.name} ({uploadedFile.size})</span>
                        </div>
                      ) : (
                        <div>
                          <UploadCloud className="mx-auto text-purple-700 mb-2" size={32} />
                          <p className="text-sm font-semibold text-gray-800">Drag & drop your artwork file or click to browse</p>
                          <p className="text-xs text-gray-500 mt-1">Supports PDF, AI, PSD, CDR, EPS, PNG, JPEG (up to 100MB)</p>
                        </div>
                      )}
                    </div>
                    <div className="flex flex-wrap items-center justify-between text-xs text-gray-500 bg-purple-50/60 p-3 rounded-lg border border-purple-100">
                      <span className="flex items-center gap-1 text-purple-900 font-medium">
                        <ShieldCheck size={16} className="text-purple-700" />
                        Free Automated Pre-Press Proofing
                      </span>
                      <span>300 DPI Recommended | 3mm Bleed Safety Margin</span>
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
                          Use pre-made business card templates, insert your company name, logo, QR code, and export print-ready vectors.
                        </p>
                      </div>
                      <Link href={`/studio?product=${normCat}`}>
                        <Button
                          color="secondary"
                          className="font-bold shadow shrink-0"
                          endContent={<ArrowRight size={16} />}
                        >
                          Open Studio Editor
                        </Button>
                      </Link>
                    </div>

                    {studioArtwork ? (
                      <div className="flex items-center gap-2 text-xs text-green-800 bg-green-100/80 p-2.5 rounded-lg border border-green-300">
                        <CheckCircle size={16} />
                        <span>Artwork linked: <strong>{studioArtwork.artworkName || "Studio Design"}</strong> ({studioArtwork.elementsCount || "Multi-layer"} objects)</span>
                      </div>
                    ) : (
                      <p className="text-[11px] text-gray-500 italic">
                        Tip: You can edit templates directly in your browser. When finished, click &quot;Save & Print&quot; in the studio to automatically link your artwork.
                      </p>
                    )}
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
                          placeholder="Provide your company name, tagline, address, color preference or required text..."
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

        {/* Right: Live Quote Summary (5 cols on lg, 4 cols on xl - Sticky) */}
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
              <div className="flex justify-between items-baseline border-b pb-3">
                <span className="text-gray-600 text-sm">Calculated Quantity:</span>
                <span className="font-bold text-gray-900 text-lg">{quote?.quantity || params.qty} units</span>
              </div>

              <div className="flex justify-between items-baseline border-b pb-3">
                <span className="text-gray-600 text-sm">Effective Unit Price:</span>
                <span className="font-semibold text-purple-700">
                  ₹{Number(quote?.unitPrice || 0).toFixed(2)} / unit
                </span>
              </div>

              {/* Itemized Breakdown */}
              <div className="space-y-2 py-2">
                <Label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Itemized Breakdown</Label>
                {quote?.addons?.map((addon, idx) => (
                  <div key={idx} className="flex justify-between text-xs text-gray-600">
                    <span className="truncate max-w-[200px]">{addon.name}</span>
                    <span className="font-medium text-gray-800">₹{Number(addon.total || 0).toFixed(2)}</span>
                  </div>
                ))}
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
                  <span className="text-purple-700">₹{effectiveFinalTotal.toFixed(2)}</span>
                </div>
                <p className="text-[11px] text-gray-400 text-right">Inclusive of all applicable taxes</p>
              </div>

              <div className="pt-4 space-y-2">
                <Button
                  onClick={handleProceedToCheckout}
                  color="secondary"
                  size="lg"
                  className="w-full font-bold shadow-md hover:shadow-lg transition-all"
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
