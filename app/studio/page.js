"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import {
  Layers,
  Type,
  Image as ImageIcon,
  Square,
  Circle,
  Minus,
  QrCode,
  Download,
  RotateCw,
  Trash2,
  CheckCircle2,
  Eye,
  EyeOff,
  ShoppingBag,
  Sparkles,
  ArrowLeft,
  ZoomIn,
  ZoomOut,
  Palette,
  LayoutTemplate,
  ShieldCheck,
  Save,
  FolderOpen,
  FileDown,
  Check,
  X,
  Wand2,
  Maximize2,
  ChevronDown,
  Package,
  Sliders,
  Move
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

// 13 STRICT Web-to-Print Categories with Precise Dimensions, Bleeds & Pre-press Specs
export const STUDIO_13_CATEGORIES = [
  {
    id: "visiting-cards",
    name: "Visiting Cards",
    width: 900,
    height: 510,
    unit: "89mm × 51mm Standard",
    bleed: 3,
    description: "350 GSM Art Card with Spot UV & Velvet Finish",
    defaultBg: "#0f172a",
    templates: [
      {
        id: "vc_corp",
        name: "Executive Dark Navy",
        frontBg: "#0f172a",
        backBg: "#1e293b",
        front: [
          { id: "1", type: "shape", shape: "rect", x: 0, y: 0, width: 20, height: 510, fill: "#3b82f6" },
          { id: "2", type: "text", text: "ALEXANDER MORGAN", x: 60, y: 160, fontSize: 26, fontWeight: "bold", fill: "#ffffff" },
          { id: "3", type: "text", text: "Chief Executive Officer", x: 60, y: 200, fontSize: 13, fill: "#94a3b8" },
          { id: "4", type: "text", text: "📞 +91 89992 91978", x: 60, y: 280, fontSize: 12, fill: "#cbd5e1" },
          { id: "5", type: "text", text: "✉️ alexander@morganenterprises.in", x: 60, y: 310, fontSize: 12, fill: "#cbd5e1" },
          { id: "6", type: "text", text: "🏢 Swargate / Market Yard, Pune", x: 60, y: 340, fontSize: 12, fill: "#cbd5e1" },
          { id: "7", type: "qr", x: 680, y: 160, size: 140 }
        ],
        back: [
          { id: "b1", type: "shape", shape: "circle", x: 380, y: 140, width: 140, height: 140, fill: "#1e3a8a" },
          { id: "b2", type: "text", text: "MORGAN CORP", x: 310, y: 320, fontSize: 32, fontWeight: "bold", fill: "#ffffff" },
          { id: "b3", type: "text", text: "EXCELLENCE IN INDUSTRIAL MANUFACTURING", x: 260, y: 365, fontSize: 11, fill: "#60a5fa" }
        ]
      },
      {
        id: "vc_gold",
        name: "Luxury Titanium Gold",
        frontBg: "#121212",
        backBg: "#0a0a0a",
        front: [
          { id: "1", type: "shape", shape: "rect", x: 40, y: 40, width: 820, height: 430, fill: "transparent", stroke: "#d4af37", strokeWidth: 2 },
          { id: "2", type: "text", text: "VIKRAMADITYA SINGHANIA", x: 80, y: 170, fontSize: 24, fontWeight: "bold", fill: "#fef08a" },
          { id: "3", type: "text", text: "Founder & Managing Director", x: 80, y: 210, fontSize: 13, fill: "#d4af37" },
          { id: "4", type: "shape", shape: "line", x: 80, y: 240, width: 220, height: 2, fill: "#d4af37" },
          { id: "5", type: "text", text: "T: +91 89992 91978", x: 80, y: 290, fontSize: 12, fill: "#e2e8f0" },
          { id: "6", type: "text", text: "E: vikram@singhaniaestates.in", x: 80, y: 325, fontSize: 12, fill: "#e2e8f0" }
        ],
        back: [
          { id: "b1", type: "text", text: "SINGHANIA", x: 320, y: 240, fontSize: 36, fontWeight: "bold", fill: "#fef08a" },
          { id: "b2", type: "text", text: "P R I V A T E   E S T A T E S", x: 335, y: 280, fontSize: 13, fill: "#d4af37" }
        ]
      }
    ]
  },
  {
    id: "stationery-office",
    name: "Stationery & Office",
    width: 800,
    height: 1130,
    unit: "A4 (210mm × 297mm)",
    bleed: 3,
    description: "Executive Letterheads, GST Invoices & Bill Books",
    defaultBg: "#ffffff",
    templates: [
      {
        id: "letterhead_modern",
        name: "Corporate Executive Letterhead",
        frontBg: "#ffffff",
        backBg: "#ffffff",
        front: [
          { id: "1", type: "shape", shape: "rect", x: 0, y: 0, width: 800, height: 18, fill: "#9c1dac" },
          { id: "2", type: "shape", shape: "rect", x: 0, y: 18, width: 800, height: 6, fill: "#f59e0b" },
          { id: "3", type: "text", text: "K2 INDUSTRIAL ENTERPRISES", x: 60, y: 80, fontSize: 24, fontWeight: "bold", fill: "#111827" },
          { id: "4", type: "text", text: "GSTIN: 27AABCU9603R1ZM • ISO 9001:2015 CERTIFIED", x: 60, y: 115, fontSize: 11, fill: "#6b7280" },
          { id: "5", type: "shape", shape: "line", x: 60, y: 145, width: 680, height: 2, fill: "#e5e7eb" },
          { id: "6", type: "text", text: "Date: ____ / ____ / 2026", x: 580, y: 180, fontSize: 12, fill: "#374151" },
          { id: "7", type: "text", text: "Ref No: K2/CORP/________", x: 60, y: 180, fontSize: 12, fill: "#374151" },
          { id: "8", type: "shape", shape: "line", x: 60, y: 1040, width: 680, height: 1, fill: "#e5e7eb" },
          { id: "9", type: "text", text: "Head Office: Shankarsheth Road, Swargate, Pune - 411037 | contact@k2signprint.com", x: 120, y: 1070, fontSize: 10, fill: "#6b7280" }
        ],
        back: []
      }
    ]
  },
  {
    id: "tags-stamps",
    name: "Product Tags & Stamps",
    width: 500,
    height: 900,
    unit: "50mm × 90mm Swing Tag",
    bleed: 3,
    description: "Apparel Garment Swing Tags & Pre-Inked Stamps",
    defaultBg: "#f8fafc",
    templates: [
      {
        id: "apparel_tag",
        name: "Luxury Boutique Garment Tag",
        frontBg: "#ffffff",
        backBg: "#0f172a",
        front: [
          { id: "1", type: "shape", shape: "circle", x: 235, y: 40, width: 30, height: 30, fill: "#d4af37" },
          { id: "2", type: "shape", shape: "circle", x: 242, y: 47, width: 16, height: 16, fill: "#ffffff" },
          { id: "3", type: "text", text: "A U T H E N T I C", x: 180, y: 220, fontSize: 13, fill: "#9c1dac", fontWeight: "bold" },
          { id: "4", type: "text", text: "COUTURE", x: 135, y: 270, fontSize: 36, fill: "#111827", fontWeight: "bold" },
          { id: "5", type: "text", text: "100% ORGANIC COMBED COTTON", x: 110, y: 320, fontSize: 11, fill: "#6b7280" },
          { id: "6", type: "qr", x: 175, y: 550, size: 150 },
          { id: "7", type: "text", text: "STYLE: LUX-902 • SIZE: XL", x: 140, y: 740, fontSize: 12, fill: "#374151", fontWeight: "bold" },
          { id: "8", type: "text", text: "M.R.P.: ₹ 2,499.00 (INCL. TAXES)", x: 120, y: 775, fontSize: 12, fill: "#111827", fontWeight: "bold" }
        ],
        back: [
          { id: "b1", type: "text", text: "CARE INSTRUCTIONS", x: 140, y: 240, fontSize: 16, fill: "#f8fafc", fontWeight: "bold" },
          { id: "b2", type: "text", text: "• Machine Wash Cold\n• Do Not Bleach\n• Warm Iron on Reverse\n• Dry Clean Friendly", x: 130, y: 300, fontSize: 13, fill: "#94a3b8" }
        ]
      }
    ]
  },
  {
    id: "flex-banners",
    name: "Flex & Banners",
    width: 450,
    height: 900,
    unit: "6ft × 2.5ft Roll-Up Standee",
    bleed: 5,
    description: "Roll-Up Standees, Star Flex & MS Framed Banners",
    defaultBg: "#0f172a",
    templates: [
      {
        id: "standee_promo",
        name: "Corporate Event Roll-Up Standee",
        frontBg: "#0f172a",
        backBg: "#0f172a",
        front: [
          { id: "1", type: "shape", shape: "rect", x: 0, y: 0, width: 450, height: 180, fill: "#9c1dac" },
          { id: "2", type: "text", text: "MEGA LAUNCH 2026", x: 70, y: 90, fontSize: 32, fill: "#ffffff", fontWeight: "bold" },
          { id: "3", type: "text", text: "INNOVATION SUMMIT", x: 110, y: 135, fontSize: 16, fill: "#fef08a" },
          { id: "4", type: "text", text: "DISCOVER THE FUTURE", x: 90, y: 320, fontSize: 22, fill: "#ffffff", fontWeight: "bold" },
          { id: "5", type: "text", text: "• Next-Gen Cloud Architecture\n• Automated Robotics & AI\n• Industry 4.0 Transformation", x: 80, y: 400, fontSize: 14, fill: "#cbd5e1" },
          { id: "6", type: "qr", x: 145, y: 640, size: 160 },
          { id: "7", type: "text", text: "SCAN TO REGISTER ENTRY", x: 110, y: 830, fontSize: 13, fill: "#fef08a", fontWeight: "bold" }
        ],
        back: []
      }
    ]
  },
  {
    id: "led-signboards",
    name: "LED Signboards",
    width: 1000,
    height: 500,
    unit: "Illuminated Lightbox 1000×500",
    bleed: 5,
    description: "Commercial Lightbox & 3D Stencil Glow Boards",
    defaultBg: "#09090b",
    templates: [
      {
        id: "led_storefront",
        name: "Storefront Glow Lightbox",
        frontBg: "#09090b",
        backBg: "#09090b",
        front: [
          { id: "1", type: "shape", shape: "rect", x: 30, y: 30, width: 940, height: 440, fill: "transparent", stroke: "#9c1dac", strokeWidth: 4 },
          { id: "2", type: "text", text: "K2 GRAND LUXE", x: 260, y: 220, fontSize: 54, fill: "#ffffff", fontWeight: "bold" },
          { id: "3", type: "text", text: "JEWELLERY & LUXURY TIMEPIECES", x: 300, y: 280, fontSize: 18, fill: "#f59e0b", fontWeight: "bold" }
        ],
        back: []
      }
    ]
  },
  {
    id: "3d-letters",
    name: "3D Acrylic Letters",
    width: 1000,
    height: 450,
    unit: "Storefront Typography",
    bleed: 3,
    description: "Cast Acrylic, Titanium Mirror Gold & Halo Backlit",
    defaultBg: "#18181b",
    templates: [
      {
        id: "acrylic_gold_letter",
        name: "Titanium Gold Mirror Cutout",
        frontBg: "#18181b",
        backBg: "#18181b",
        front: [
          { id: "1", type: "text", text: "MAHARAJA", x: 260, y: 210, fontSize: 68, fill: "#d4af37", fontWeight: "bold" },
          { id: "2", type: "text", text: "AUTHENTIC ROYAL DINING", x: 340, y: 280, fontSize: 18, fill: "#fef08a" }
        ],
        back: []
      }
    ]
  },
  {
    id: "brochures-marketing",
    name: "Brochures & Catalogs",
    width: 1100,
    height: 780,
    unit: "A4 Bi-Fold Spread",
    bleed: 3,
    description: "Multi-Fold Marketing Brochures & Catalogs",
    defaultBg: "#ffffff",
    templates: [
      {
        id: "bifold_gloss",
        name: "Corporate Bi-Fold Spread",
        frontBg: "#ffffff",
        backBg: "#f8fafc",
        front: [
          { id: "1", type: "shape", shape: "line", x: 550, y: 0, width: 2, height: 780, fill: "#cbd5e1" },
          { id: "2", type: "shape", shape: "rect", x: 0, y: 0, width: 550, height: 16, fill: "#9c1dac" },
          { id: "3", type: "text", text: "COMPANY PROFILE", x: 60, y: 100, fontSize: 32, fill: "#111827", fontWeight: "bold" },
          { id: "4", type: "text", text: "OUR CAPABILITIES & EXPERTISE", x: 60, y: 150, fontSize: 14, fill: "#6b7280" },
          { id: "5", type: "text", text: "CONTACT & LOCATIONS", x: 620, y: 100, fontSize: 28, fill: "#111827", fontWeight: "bold" }
        ],
        back: []
      }
    ]
  },
  {
    id: "rigid-sign-plates",
    name: "Rigid Sign Plates",
    width: 850,
    height: 600,
    unit: "3mm ACP Panel",
    bleed: 3,
    description: "Weatherproof ACP Sign Plates & Night Glow Signs",
    defaultBg: "#1e293b",
    templates: [
      {
        id: "acp_doctor",
        name: "Executive Chamber Nameplate",
        frontBg: "#1e293b",
        backBg: "#1e293b",
        front: [
          { id: "1", type: "shape", shape: "rect", x: 30, y: 30, width: 790, height: 540, fill: "transparent", stroke: "#cbd5e1", strokeWidth: 2 },
          { id: "2", type: "text", text: "DR. ARVIND JOSHI", x: 180, y: 220, fontSize: 44, fill: "#ffffff", fontWeight: "bold" },
          { id: "3", type: "text", text: "M.S., M.Ch. (Surgical Oncology) - Senior Consultant", x: 160, y: 290, fontSize: 16, fill: "#94a3b8" }
        ],
        back: []
      }
    ]
  },
  {
    id: "vinyl-letters",
    name: "Vinyl Cut Letters",
    width: 1000,
    height: 500,
    unit: "Storefront Window Hours",
    bleed: 0,
    description: "Storefront Window Hours & Plotter Cut Decals",
    defaultBg: "#0f172a",
    templates: [
      {
        id: "vinyl_hours",
        name: "Storefront Operating Hours",
        frontBg: "#0f172a",
        backBg: "#0f172a",
        front: [
          { id: "1", type: "text", text: "STORE HOURS", x: 360, y: 140, fontSize: 36, fill: "#ffffff", fontWeight: "bold" },
          { id: "2", type: "text", text: "MON - FRI : 10:00 AM - 08:30 PM\nSATURDAY  : 10:00 AM - 09:00 PM\nSUNDAY    : 11:00 AM - 06:00 PM", x: 300, y: 220, fontSize: 18, fill: "#cbd5e1" }
        ],
        back: []
      }
    ]
  },
  {
    id: "media-printing",
    name: "Media Printing",
    width: 800,
    height: 800,
    unit: "Canvas Square Print",
    bleed: 4,
    description: "Fine Art Stretched Canvas & Translit Film",
    defaultBg: "#ffffff",
    templates: [
      {
        id: "canvas_art",
        name: "Gallery Wrapped Art Canvas",
        frontBg: "#111827",
        backBg: "#111827",
        front: [
          { id: "1", type: "text", text: "SERENITY", x: 260, y: 380, fontSize: 48, fill: "#ffffff", fontWeight: "bold" },
          { id: "2", type: "text", text: "LIMITED EDITION FINE ART PRINT", x: 265, y: 440, fontSize: 14, fill: "#94a3b8" }
        ],
        back: []
      }
    ]
  },
  {
    id: "glass-films",
    name: "Glass Films",
    width: 900,
    height: 600,
    unit: "Frosted Privacy Band",
    bleed: 0,
    description: "Frosted Privacy Patterns & One-Way Vision Perforated",
    defaultBg: "#e2e8f0",
    templates: [
      {
        id: "frosted_band",
        name: "Conference Center Band",
        frontBg: "#f1f5f9",
        backBg: "#f1f5f9",
        front: [
          { id: "1", type: "shape", shape: "rect", x: 0, y: 180, width: 900, height: 240, fill: "#cbd5e1" },
          { id: "2", type: "text", text: "INNOVATION LAB", x: 300, y: 310, fontSize: 36, fill: "#0f172a", fontWeight: "bold" }
        ],
        back: []
      }
    ]
  },
  {
    id: "modular-signs",
    name: "Modular Signs",
    width: 750,
    height: 950,
    unit: "Opti Snap Poster Frame",
    bleed: 3,
    description: "Opti Snap Poster Frames & Curv Convex Wall Signs",
    defaultBg: "#ffffff",
    templates: [
      {
        id: "opti_frame_poster",
        name: "Snap Poster Showcase",
        frontBg: "#ffffff",
        backBg: "#ffffff",
        front: [
          { id: "1", type: "shape", shape: "rect", x: 40, y: 40, width: 670, height: 870, fill: "#f8fafc", stroke: "#cbd5e1", strokeWidth: 2 },
          { id: "2", type: "text", text: "FEATURED PROMOTION", x: 180, y: 280, fontSize: 36, fill: "#111827", fontWeight: "bold" },
          { id: "3", type: "text", text: "SPECIAL OFFERS INSIDE", x: 250, y: 340, fontSize: 18, fill: "#9c1dac", fontWeight: "bold" }
        ],
        back: []
      }
    ]
  },
  {
    id: "wedding-calendars",
    name: "Wedding & Calendars",
    width: 750,
    height: 1050,
    unit: "Royal Wedding Invitation",
    bleed: 3,
    description: "Gold Foil Royal Wedding Cards & 12-Month Wall Calendars",
    defaultBg: "#2a0845",
    templates: [
      {
        id: "royal_wedding",
        name: "Royal Golden Foil Invitation",
        frontBg: "#2a0845",
        backBg: "#1c042e",
        front: [
          { id: "1", type: "shape", shape: "rect", x: 40, y: 40, width: 670, height: 970, fill: "transparent", stroke: "#d4af37", strokeWidth: 3 },
          { id: "2", type: "text", text: "॥ शुभ विवाह ॥", x: 290, y: 160, fontSize: 32, fill: "#fef08a", fontWeight: "bold" },
          { id: "3", type: "text", text: "TOGETHER WITH THEIR FAMILIES", x: 220, y: 260, fontSize: 14, fill: "#e9d5ff" },
          { id: "4", type: "text", text: "ROHIT  &  ANANYA", x: 160, y: 340, fontSize: 44, fill: "#d4af37", fontWeight: "bold" },
          { id: "5", type: "text", text: "CORDIALLY INVITE YOU TO CELEBRATE THEIR WEDDING", x: 140, y: 420, fontSize: 13, fill: "#e9d5ff" },
          { id: "6", type: "text", text: "SUNDAY, 14 DECEMBER 2026\nAT 06:30 PM ONWARDS", x: 220, y: 520, fontSize: 16, fill: "#fef08a", fontWeight: "bold" },
          { id: "7", type: "text", text: "THE LEELA PALACE, PUNE", x: 240, y: 600, fontSize: 15, fill: "#ffffff" }
        ],
        back: []
      }
    ]
  }
];

export default function StudioPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const rawProduct = searchParams.get("product") || "visiting-cards";

  // Match active category to one of the STRICT 13 Categories
  const initialCategory = STUDIO_13_CATEGORIES.find(
    (c) => c.id === rawProduct || c.id.replace(/-/g, "") === rawProduct.toLowerCase().replace(/[-_ ]/g, "")
  ) || STUDIO_13_CATEGORIES[0];

  const [activeCategoryId, setActiveCategoryId] = useState(initialCategory.id);
  const currentCategory = STUDIO_13_CATEGORIES.find((c) => c.id === activeCategoryId) || STUDIO_13_CATEGORIES[0];

  // Viewport & Scaling State (Google Stitch Adaptive Viewport)
  const viewportRef = useRef(null);
  const [viewportSize, setViewportSize] = useState({ width: 1000, height: 700 });
  const [isAutoFit, setIsAutoFit] = useState(true);
  const [manualScale, setManualScale] = useState(1);
  const [fitScale, setFitScale] = useState(1);

  // Studio Elements State
  const [activeSide, setActiveSide] = useState("front"); // 'front' | 'back'
  const [activeTab, setActiveTab] = useState("templates"); // 'templates' | 'ai' | 'text' | 'shapes' | 'uploads' | 'qr' | 'bg'
  const [showGuides, setShowGuides] = useState(true);
  const [selectedElementId, setSelectedElementId] = useState(null);

  // Design Title & Saved Drafts
  const [designTitle, setDesignTitle] = useState(`${currentCategory.name} Project`);
  const [savedDrafts, setSavedDrafts] = useState([]);
  const [draftStatus, setDraftStatus] = useState("Ready");
  const [isDraftsOpen, setIsDraftsOpen] = useState(false);

  // Active Layers for Current Design
  const activeTemplate = currentCategory.templates[0] || { frontBg: currentCategory.defaultBg, backBg: currentCategory.defaultBg, front: [], back: [] };
  const [frontBg, setFrontBg] = useState(activeTemplate.frontBg || currentCategory.defaultBg);
  const [backBg, setBackBg] = useState(activeTemplate.backBg || currentCategory.defaultBg);
  const [frontElements, setFrontElements] = useState(activeTemplate.front || []);
  const [backElements, setBackElements] = useState(activeTemplate.back || []);

  // AI Image Generator State (Stitch-Style Generative Prompt Engine)
  const [aiPrompt, setAiPrompt] = useState("");
  const [aiStyle, setAiStyle] = useState("gold_luxury");
  const [isGeneratingAi, setIsGeneratingAi] = useState(false);
  const [aiProgressText, setAiProgressText] = useState("");
  const [generatedAiImages, setGeneratedAiImages] = useState([]);

  // Dragging Handlers
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [qrText, setQrText] = useState("https://k2sign.com");
  const canvasRef = useRef(null);

  const currentElements = activeSide === "front" ? frontElements : backElements;
  const setCurrentElements = activeSide === "front" ? setFrontElements : setBackElements;
  const currentBg = activeSide === "front" ? frontBg : backBg;
  const setCurrentBg = activeSide === "front" ? setFrontBg : setBackBg;

  // Adaptive Viewport Calculation (Auto-Scale Canvas like Google Stitch)
  const updateViewportScale = useCallback(() => {
    if (!viewportRef.current) return;
    const rect = viewportRef.current.getBoundingClientRect();
    const padX = 80;
    const padY = 80;
    const availableW = Math.max(300, rect.width - padX);
    const availableH = Math.max(300, rect.height - padY);
    const scaleW = availableW / currentCategory.width;
    const scaleH = availableH / currentCategory.height;
    const calculatedFit = Math.min(scaleW, scaleH, 1.25);
    setFitScale(calculatedFit);
    setViewportSize({ width: rect.width, height: rect.height });
  }, [currentCategory]);

  useEffect(() => {
    updateViewportScale();
    window.addEventListener("resize", updateViewportScale);
    return () => window.removeEventListener("resize", updateViewportScale);
  }, [updateViewportScale]);

  // Load Saved Drafts from localStorage
  useEffect(() => {
    if (typeof window !== "undefined") {
      try {
        const stored = localStorage.getItem("k2_studio_drafts");
        if (stored) {
          const parsed = JSON.parse(stored);
          if (Array.isArray(parsed)) setSavedDrafts(parsed);
        }
      } catch (e) {
        console.error(e);
      }
    }
  }, []);

  // When Category changes: adapt canvas dimensions & template
  const handleSelectCategory = (catId) => {
    const selected = STUDIO_13_CATEGORIES.find((c) => c.id === catId);
    if (!selected) return;
    setActiveCategoryId(catId);
    setDesignTitle(`${selected.name} Design`);
    const tpl = selected.templates[0] || { frontBg: selected.defaultBg, backBg: selected.defaultBg, front: [], back: [] };
    setFrontBg(tpl.frontBg || selected.defaultBg);
    setBackBg(tpl.backBg || selected.defaultBg);
    setFrontElements(tpl.front || []);
    setBackElements(tpl.back || []);
    setSelectedElementId(null);
    setIsAutoFit(true);
    setDraftStatus("Category Changed");
  };

  const selectedElement = currentElements.find((el) => el.id === selectedElementId);

  const updateSelectedElement = (key, value) => {
    if (!selectedElementId) return;
    setCurrentElements((prev) =>
      prev.map((el) => (el.id === selectedElementId ? { ...el, [key]: value } : el))
    );
    setDraftStatus("Unsaved Changes");
  };

  const deleteSelectedElement = () => {
    if (!selectedElementId) return;
    setCurrentElements((prev) => prev.filter((el) => el.id !== selectedElementId));
    setSelectedElementId(null);
    setDraftStatus("Unsaved Changes");
  };

  // Add Core Layer Elements
  const handleAddText = (type = "heading") => {
    const newId = `txt-${Date.now()}`;
    const newEl = {
      id: newId,
      type: "text",
      text: type === "heading" ? "COMPANY NAME" : type === "sub" ? "Professional Subtitle" : "Enter details here...",
      x: 80,
      y: 120,
      fontSize: type === "heading" ? 32 : type === "sub" ? 18 : 13,
      fontWeight: type === "heading" ? "bold" : "normal",
      fill: currentBg === "#ffffff" ? "#111827" : "#ffffff",
      fontFamily: "sans-serif"
    };
    setCurrentElements((prev) => [...prev, newEl]);
    setSelectedElementId(newId);
    setDraftStatus("Unsaved Changes");
  };

  const handleAddShape = (shape = "rect") => {
    const newId = `shp-${Date.now()}`;
    const newEl = {
      id: newId,
      type: "shape",
      shape: shape,
      x: 100,
      y: 100,
      width: shape === "line" ? 280 : 120,
      height: shape === "line" ? 3 : 120,
      fill: "#9c1dac"
    };
    setCurrentElements((prev) => [...prev, newEl]);
    setSelectedElementId(newId);
    setDraftStatus("Unsaved Changes");
  };

  const handleAddQr = () => {
    const newId = `qr-${Date.now()}`;
    const newEl = {
      id: newId,
      type: "qr",
      data: qrText,
      x: 120,
      y: 140,
      size: 130
    };
    setCurrentElements((prev) => [...prev, newEl]);
    setSelectedElementId(newId);
    setDraftStatus("Unsaved Changes");
  };

  // AI Image Generator Engine (Stitch-Style Multi-Vector Generative Synthesis)
  const handleGenerateAiImage = () => {
    if (!aiPrompt.trim()) return;
    setIsGeneratingAi(true);
    setAiProgressText("Formulating vector composition...");

    setTimeout(() => {
      setAiProgressText("Applying 300 DPI pre-press styling...");
    }, 900);

    setTimeout(() => {
      // Generate clean vector / generative SVG data URIs based on prompt & selected style
      const p = encodeURIComponent(aiPrompt.trim());
      const encodedTitle = aiPrompt.trim().substring(0, 24);

      // SVG Generative Presets
      let svgContent = "";
      if (aiStyle === "gold_luxury") {
        svgContent = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400" width="400" height="400"><defs><linearGradient id="gold" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="#fef08a"/><stop offset="50%" stop-color="#d4af37"/><stop offset="100%" stop-color="#aa7c11"/></linearGradient></defs><rect width="400" height="400" rx="30" fill="none" stroke="url(#gold)" stroke-width="6"/><circle cx="200" cy="180" r="90" fill="none" stroke="url(#gold)" stroke-width="4"/><path d="M150 180 L200 130 L250 180 L200 230 Z" fill="url(#gold)" opacity="0.85"/><text x="200" y="320" font-family="serif" font-size="20" font-weight="bold" fill="url(#gold)" text-anchor="middle" letter-spacing="4">${encodedTitle.toUpperCase()}</text></svg>`;
      } else if (aiStyle === "minimal_vector") {
        svgContent = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400" width="400" height="400"><rect width="400" height="400" rx="30" fill="none" stroke="#9c1dac" stroke-width="6"/><circle cx="200" cy="180" r="70" fill="#9c1dac" opacity="0.15"/><path d="M140 220 L200 120 L260 220 Z" fill="#9c1dac"/><text x="200" y="320" font-family="sans-serif" font-size="18" font-weight="bold" fill="#9c1dac" text-anchor="middle" letter-spacing="3">${encodedTitle.toUpperCase()}</text></svg>`;
      } else if (aiStyle === "watercolor_floral") {
        svgContent = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400" width="400" height="400"><defs><linearGradient id="pink" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="#f472b6"/><stop offset="100%" stop-color="#ec4899"/></linearGradient></defs><circle cx="200" cy="200" r="160" fill="none" stroke="url(#pink)" stroke-width="3" stroke-dasharray="6,6"/><circle cx="200" cy="180" r="60" fill="#fdf2f8"/><path d="M200 120 C220 150 220 190 200 220 C180 190 180 150 200 120 Z" fill="url(#pink)" opacity="0.8"/><text x="200" y="310" font-family="serif" font-size="18" fill="#be185d" text-anchor="middle">${encodedTitle.toUpperCase()}</text></svg>`;
      } else {
        svgContent = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400" width="400" height="400"><rect width="400" height="400" rx="20" fill="#18181b" stroke="#3b82f6" stroke-width="4"/><polygon points="200,80 320,160 320,300 200,380 80,300 80,160" fill="none" stroke="#60a5fa" stroke-width="3"/><text x="200" y="235" font-family="sans-serif" font-size="22" font-weight="bold" fill="#ffffff" text-anchor="middle">${encodedTitle.toUpperCase()}</text></svg>`;
      }

      const svgDataUri = `data:image/svg+xml;utf8,${encodeURIComponent(svgContent)}`;

      const newAiItem = {
        id: `ai-${Date.now()}`,
        prompt: aiPrompt,
        style: aiStyle,
        dataUri: svgDataUri,
        title: encodedTitle
      };

      setGeneratedAiImages((prev) => [newAiItem, ...prev]);
      setIsGeneratingAi(false);
      setDraftStatus("AI Asset Ready");
    }, 1600);
  };

  // Insert AI generated image onto canvas
  const handleInsertAiImage = (aiItem) => {
    const newId = `ai-img-${Date.now()}`;
    const newEl = {
      id: newId,
      type: "image",
      src: aiItem.dataUri,
      prompt: aiItem.prompt,
      x: Math.round(currentCategory.width / 2 - 110),
      y: Math.round(currentCategory.height / 2 - 110),
      width: 220,
      height: 220
    };
    setCurrentElements((prev) => [...prev, newEl]);
    setSelectedElementId(newId);
    setDraftStatus("AI Element Placed");
  };

  // Dragging Implementation
  const handleMouseDown = (e, el) => {
    e.stopPropagation();
    setSelectedElementId(el.id);
    setIsDragging(true);
    setDragOffset({
      x: e.clientX - el.x * (isAutoFit ? fitScale : manualScale),
      y: e.clientY - el.y * (isAutoFit ? fitScale : manualScale)
    });
  };

  const handleMouseMove = (e) => {
    if (!isDragging || !selectedElementId) return;
    const currentScale = isAutoFit ? fitScale : manualScale;
    const newX = Math.round((e.clientX - dragOffset.x) / currentScale);
    const newY = Math.round((e.clientY - dragOffset.y) / currentScale);

    setCurrentElements((prev) =>
      prev.map((el) => (el.id === selectedElementId ? { ...el, x: newX, y: newY } : el))
    );
    setDraftStatus("Unsaved Changes");
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  // Save Draft Locally
  const handleSaveDraft = () => {
    const draftPayload = {
      id: `draft-${Date.now()}`,
      categoryId: activeCategoryId,
      title: designTitle,
      updatedAt: new Date().toISOString(),
      frontBg,
      backBg,
      frontElements,
      backElements
    };

    const updated = [draftPayload, ...savedDrafts.filter((d) => d.title !== designTitle)];
    setSavedDrafts(updated);
    if (typeof window !== "undefined") {
      localStorage.setItem("k2_studio_drafts", JSON.stringify(updated));
    }
    setDraftStatus("Draft Saved Successfully");
  };

  // Export Design for Print Order Checkout
  const handleSaveAndPrint = () => {
    const artworkPayload = {
      artworkName: designTitle,
      categoryId: activeCategoryId,
      frontBg,
      backBg,
      frontElements,
      backElements,
      width: currentCategory.width,
      height: currentCategory.height,
      unit: currentCategory.unit,
      createdAt: new Date().toISOString()
    };

    if (typeof window !== "undefined") {
      localStorage.setItem("k2_studio_artwork", JSON.stringify(artworkPayload));
    }

    router.push(`/paper-printing/VisitingCards?artwork=studio&category=${activeCategoryId}`);
  };

  const currentScale = isAutoFit ? fitScale : manualScale;

  return (
    <div
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      className="w-full h-screen bg-[#0f1117] text-white flex flex-col font-sans select-none overflow-hidden"
    >
      {/* 1. TOP STUDIO CONTROL BAR */}
      <header className="h-14 border-b border-gray-800 bg-[#161922] px-4 flex items-center justify-between shrink-0 z-30">
        
        {/* Left: Brand & 13 Category Selector */}
        <div className="flex items-center gap-3">
          <Link
            href="/"
            className="flex items-center gap-1.5 text-xs text-gray-400 hover:text-white transition bg-gray-800/80 px-2.5 py-1 rounded-lg"
          >
            <ArrowLeft size={14} />
            <span className="hidden sm:inline">Store</span>
          </Link>

          <div className="h-5 w-px bg-gray-700 hidden sm:block" />

          {/* 13 Category Picker Dropdown (Restricted strictly to the 13 categories) */}
          <div className="relative flex items-center gap-2">
            <span className="font-black text-white text-sm tracking-tight flex items-center gap-1.5">
              <Sparkles size={16} className="text-[#9c1dac]" />
              K2 Studio
            </span>

            <div className="relative">
              <select
                value={activeCategoryId}
                onChange={(e) => handleSelectCategory(e.target.value)}
                className="bg-gray-800/90 border border-gray-700 text-xs text-white font-bold py-1 px-2.5 rounded-lg focus:outline-none focus:border-purple-500 cursor-pointer appearance-none pr-7"
              >
                {STUDIO_13_CATEGORIES.map((cat) => (
                  <option key={cat.id} value={cat.id} className="bg-gray-900 text-white">
                    {cat.name} ({cat.unit})
                  </option>
                ))}
              </select>
              <ChevronDown size={13} className="text-gray-400 absolute right-2 top-2 pointer-events-none" />
            </div>

            <input
              value={designTitle}
              onChange={(e) => {
                setDesignTitle(e.target.value);
                setDraftStatus("Unsaved Changes");
              }}
              className="bg-transparent border-b border-transparent hover:border-gray-600 focus:border-purple-500 focus:outline-none text-xs text-gray-300 font-medium px-1 py-0.5 max-w-[140px] sm:max-w-[180px] truncate"
            />
          </div>
        </div>

        {/* Center: Side Switcher & Guides */}
        <div className="flex items-center gap-2">
          <div className="bg-gray-800/90 p-0.5 rounded-lg flex items-center text-xs">
            <button
              onClick={() => {
                setActiveSide("front");
                setSelectedElementId(null);
              }}
              className={`px-3 py-1 rounded-md transition font-bold text-xs ${
                activeSide === "front" ? "bg-[#9c1dac] text-white shadow" : "text-gray-400 hover:text-white"
              }`}
            >
              Front
            </button>
            <button
              onClick={() => {
                setActiveSide("back");
                setSelectedElementId(null);
              }}
              className={`px-3 py-1 rounded-md transition font-bold text-xs ${
                activeSide === "back" ? "bg-[#9c1dac] text-white shadow" : "text-gray-400 hover:text-white"
              }`}
            >
              Back
            </button>
          </div>

          <button
            onClick={() => setShowGuides(!showGuides)}
            className={`px-2.5 py-1 rounded-lg border text-xs flex items-center gap-1.5 transition ${
              showGuides
                ? "border-purple-500 bg-purple-500/20 text-purple-300"
                : "border-gray-700 bg-gray-800 text-gray-400"
            }`}
          >
            {showGuides ? <Eye size={13} /> : <EyeOff size={13} />}
            <span className="hidden md:inline">Bleed Guides</span>
          </button>
        </div>

        {/* Right: Actions (Drafts, Save & Print Checkout) */}
        <div className="flex items-center gap-2">
          <Button
            onClick={handleSaveDraft}
            variant="outline"
            className="text-xs h-8 px-2.5 bg-gray-800 text-gray-300 hover:text-white border-gray-700 flex items-center gap-1.5 cursor-pointer hidden sm:flex"
          >
            <Save size={13} />
            <span>Save</span>
          </Button>

          <Button
            onClick={handleSaveAndPrint}
            className="text-xs h-8 px-3.5 bg-[#9c1dac] hover:bg-[#831492] text-white font-bold flex items-center gap-1.5 cursor-pointer shadow-md"
          >
            <CheckCircle2 size={14} />
            <span>Use for Print Order</span>
          </Button>
        </div>
      </header>

      {/* 2. MAIN STUDIO WORKSPACE */}
      <div className="flex-1 flex overflow-hidden">
        
        {/* Left Toolbar Icons (Width 64px) */}
        <aside className="w-16 bg-[#161922] border-r border-gray-800 flex flex-col items-center py-3 gap-2.5 shrink-0 z-20">
          {[
            { id: "templates", label: "Templates", icon: LayoutTemplate },
            { id: "ai", label: "AI Images", icon: Wand2, highlight: true },
            { id: "text", label: "Text", icon: Type },
            { id: "shapes", label: "Shapes", icon: Square },
            { id: "qr", label: "QR Code", icon: QrCode },
            { id: "bg", label: "Color", icon: Palette },
          ].map((tool) => {
            const Icon = tool.icon;
            const isActive = activeTab === tool.id;
            return (
              <button
                key={tool.id}
                onClick={() => setActiveTab(tool.id)}
                className={`flex flex-col items-center justify-center w-12 h-12 rounded-xl text-[10px] font-semibold transition relative cursor-pointer ${
                  isActive
                    ? "bg-[#9c1dac] text-white shadow-lg shadow-purple-950/60"
                    : tool.highlight
                    ? "text-purple-400 bg-purple-950/40 hover:bg-purple-900/50 hover:text-white border border-purple-500/30"
                    : "text-gray-400 hover:bg-gray-800 hover:text-gray-200"
                }`}
              >
                <Icon size={18} className="mb-0.5" />
                <span>{tool.label}</span>
                {tool.highlight && !isActive && (
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400 absolute top-1.5 right-1.5 animate-pulse" />
                )}
              </button>
            );
          })}
        </aside>

        {/* Sub-panel Drawer (Width 280px) */}
        <div className="w-72 bg-[#1c202d] border-r border-gray-800 p-4 overflow-y-auto shrink-0 space-y-4 z-10">
          
          {/* AI IMAGE GENERATOR PANEL (Stitch-Style Generative Prompt Engine) */}
          {activeTab === "ai" && (
            <div className="space-y-4">
              <div className="border-b border-gray-800 pb-2">
                <span className="text-[10px] font-bold text-purple-400 uppercase tracking-wider flex items-center gap-1">
                  <Sparkles size={12} />
                  Generative Studio AI
                </span>
                <h3 className="font-extrabold text-sm text-white">Generate Design Artwork</h3>
                <p className="text-[11px] text-gray-400 mt-0.5">
                  Type a prompt to synthesize 300 DPI vectors & logos directly for your {currentCategory.name}.
                </p>
              </div>

              {/* Prompt Input Box */}
              <div>
                <label className="text-[11px] font-bold text-gray-300 uppercase tracking-wider block mb-1.5">
                  AI Prompt
                </label>
                <textarea
                  value={aiPrompt}
                  onChange={(e) => setAiPrompt(e.target.value)}
                  placeholder="e.g. Minimalist luxury gold crown emblem for boutique..."
                  rows={3}
                  className="w-full bg-[#12141c] border border-gray-700 rounded-xl p-2.5 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 resize-none"
                />
              </div>

              {/* Style Selector */}
              <div>
                <label className="text-[11px] font-bold text-gray-300 uppercase tracking-wider block mb-1.5">
                  Artwork Style
                </label>
                <div className="grid grid-cols-2 gap-1.5 text-xs">
                  {[
                    { id: "gold_luxury", label: "✨ Gold Luxury Foil" },
                    { id: "minimal_vector", label: "📐 Minimal Vector" },
                    { id: "watercolor_floral", label: "🌸 Watercolor Floral" },
                    { id: "cyber_badge", label: "⚡ Corporate Badge" },
                  ].map((st) => (
                    <button
                      key={st.id}
                      type="button"
                      onClick={() => setAiStyle(st.id)}
                      className={`p-2 rounded-lg border text-left font-medium transition cursor-pointer ${
                        aiStyle === st.id
                          ? "border-[#9c1dac] bg-purple-900/30 text-white font-bold"
                          : "border-gray-800 bg-[#12141c] text-gray-400 hover:text-white"
                      }`}
                    >
                      {st.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Quick Prompt Starters */}
              <div>
                <span className="text-[10px] text-gray-400 block mb-1">Inspiration Starters:</span>
                <div className="flex flex-wrap gap-1">
                  {[
                    "☕ Artisan Coffee Emblem",
                    "👑 Luxury Gold Crown",
                    "🌿 Botanical Floral Wreath",
                    "🛍️ Retail Boutique Bag Monogram"
                  ].map((starter, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setAiPrompt(starter)}
                      className="text-[10px] bg-gray-800 hover:bg-gray-700 text-gray-300 px-2 py-1 rounded-md transition cursor-pointer"
                    >
                      {starter}
                    </button>
                  ))}
                </div>
              </div>

              {/* Generate CTA Button */}
              <button
                type="button"
                onClick={handleGenerateAiImage}
                disabled={isGeneratingAi || !aiPrompt.trim()}
                className="w-full py-2.5 bg-gradient-to-r from-purple-700 to-indigo-600 hover:from-purple-800 hover:to-indigo-700 disabled:opacity-50 text-white text-xs font-bold rounded-xl transition shadow-lg flex items-center justify-center gap-2 cursor-pointer"
              >
                {isGeneratingAi ? (
                  <>
                    <RotateCw size={14} className="animate-spin text-amber-300" />
                    <span>{aiProgressText || "Synthesizing..."}</span>
                  </>
                ) : (
                  <>
                    <Wand2 size={14} />
                    <span>Generate AI Image</span>
                  </>
                )}
              </button>

              {/* Generated AI Assets History */}
              {generatedAiImages.length > 0 && (
                <div className="space-y-2 pt-2 border-t border-gray-800">
                  <h4 className="text-[11px] font-bold text-gray-300 uppercase">Generated AI Assets</h4>
                  <div className="space-y-2 max-h-60 overflow-y-auto pr-1">
                    {generatedAiImages.map((item) => (
                      <div
                        key={item.id}
                        className="p-2.5 rounded-xl bg-[#12141c] border border-gray-800 flex items-center justify-between gap-3"
                      >
                        <div className="flex items-center gap-2.5">
                          <div className="w-12 h-12 rounded-lg bg-black/60 border border-gray-700 flex items-center justify-center overflow-hidden shrink-0">
                            <img src={item.dataUri} alt={item.title} className="w-full h-full object-contain" />
                          </div>
                          <div className="overflow-hidden">
                            <p className="text-xs font-bold text-white truncate">{item.title}</p>
                            <span className="text-[10px] text-gray-400 capitalize">{item.style.replace(/_/g, " ")}</span>
                          </div>
                        </div>

                        <button
                          type="button"
                          onClick={() => handleInsertAiImage(item)}
                          className="px-2.5 py-1.5 bg-[#9c1dac] hover:bg-[#831492] text-white text-[11px] font-bold rounded-lg transition shrink-0 cursor-pointer shadow-xs"
                        >
                          + Add
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Templates Tab */}
          {activeTab === "templates" && (
            <div className="space-y-3">
              <h3 className="font-bold text-xs text-gray-200 uppercase tracking-wider">
                {currentCategory.name} Templates
              </h3>
              <div className="space-y-2.5">
                {currentCategory.templates.map((tpl) => (
                  <div
                    key={tpl.id}
                    onClick={() => {
                      setFrontBg(tpl.frontBg);
                      setBackBg(tpl.backBg);
                      setFrontElements(tpl.front);
                      setBackElements(tpl.back || []);
                      setDraftStatus("Template Applied");
                    }}
                    className="p-3 bg-gray-800/80 hover:bg-gray-800 rounded-xl border border-gray-700/80 cursor-pointer transition"
                  >
                    <span className="text-xs font-bold text-white block">{tpl.name}</span>
                    <span className="text-[10px] text-gray-400 mt-1 block">
                      {tpl.front.length} Layers • Pre-press Ready
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Text Tab */}
          {activeTab === "text" && (
            <div className="space-y-3">
              <h3 className="font-bold text-xs text-gray-200 uppercase tracking-wider">Add Typography</h3>
              <div className="space-y-2">
                <button
                  onClick={() => handleAddText("heading")}
                  className="w-full py-2.5 px-3 bg-gray-800 hover:bg-gray-700 text-left font-bold text-sm text-white rounded-xl border border-gray-700 cursor-pointer"
                >
                  Add Large Heading
                </button>
                <button
                  onClick={() => handleAddText("sub")}
                  className="w-full py-2.5 px-3 bg-gray-800 hover:bg-gray-700 text-left font-medium text-xs text-gray-300 rounded-xl border border-gray-700 cursor-pointer"
                >
                  Add Subtitle / Designation
                </button>
                <button
                  onClick={() => handleAddText("body")}
                  className="w-full py-2.5 px-3 bg-gray-800 hover:bg-gray-700 text-left text-[11px] text-gray-400 rounded-xl border border-gray-700 cursor-pointer"
                >
                  Add Contact & Address Info
                </button>
              </div>
            </div>
          )}

          {/* Shapes Tab */}
          {activeTab === "shapes" && (
            <div className="space-y-3">
              <h3 className="font-bold text-xs text-gray-200 uppercase tracking-wider">Add Vectors & Shapes</h3>
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => handleAddShape("rect")}
                  className="p-3 bg-gray-800 hover:bg-gray-700 rounded-xl border border-gray-700 flex flex-col items-center gap-1.5 cursor-pointer"
                >
                  <Square size={22} className="text-purple-400" />
                  <span className="text-xs font-medium">Rectangle</span>
                </button>
                <button
                  onClick={() => handleAddShape("circle")}
                  className="p-3 bg-gray-800 hover:bg-gray-700 rounded-xl border border-gray-700 flex flex-col items-center gap-1.5 cursor-pointer"
                >
                  <Circle size={22} className="text-purple-400" />
                  <span className="text-xs font-medium">Circle</span>
                </button>
                <button
                  onClick={() => handleAddShape("line")}
                  className="col-span-2 p-3 bg-gray-800 hover:bg-gray-700 rounded-xl border border-gray-700 flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Minus size={20} className="text-purple-400" />
                  <span className="text-xs font-medium">Divider Rule Line</span>
                </button>
              </div>
            </div>
          )}

          {/* QR Code Tab */}
          {activeTab === "qr" && (
            <div className="space-y-3">
              <h3 className="font-bold text-xs text-gray-200 uppercase tracking-wider">Dynamic QR Code</h3>
              <div className="space-y-2">
                <label className="text-[11px] text-gray-400">Target URL / UPI / Contact</label>
                <Input
                  value={qrText}
                  onChange={(e) => setQrText(e.target.value)}
                  className="bg-gray-900 border-gray-700 text-xs text-white"
                />
                <button
                  onClick={handleAddQr}
                  className="w-full py-2 bg-[#9c1dac] hover:bg-[#831492] text-white text-xs font-bold rounded-xl transition cursor-pointer shadow-md"
                >
                  Insert QR Code
                </button>
              </div>
            </div>
          )}

          {/* Color & Background Tab */}
          {activeTab === "bg" && (
            <div className="space-y-3">
              <h3 className="font-bold text-xs text-gray-200 uppercase tracking-wider">
                {activeSide === "front" ? "Front" : "Back"} Background Color
              </h3>
              <div className="grid grid-cols-4 gap-2">
                {[
                  "#ffffff", "#0f172a", "#121212", "#1e1b4b",
                  "#042f2e", "#2e0854", "#3b0764", "#450a0a"
                ].map((color) => (
                  <button
                    key={color}
                    onClick={() => {
                      setCurrentBg(color);
                      setDraftStatus("Unsaved Changes");
                    }}
                    style={{ backgroundColor: color }}
                    className={`w-full aspect-square rounded-xl border-2 transition cursor-pointer ${
                      currentBg === color ? "border-[#9c1dac] ring-2 ring-purple-300" : "border-gray-700"
                    }`}
                  />
                ))}
              </div>
            </div>
          )}
        </div>

        {/* 3. CENTER VIEWPORT WORKSPACE (Google Stitch Adaptive Viewport) */}
        <main
          ref={viewportRef}
          className="flex-1 bg-[#0b0c10] relative flex items-center justify-center overflow-auto p-6"
        >
          {/* Canvas Wrapper scaled dynamically to fit viewport */}
          <div
            style={{
              width: `${currentCategory.width * currentScale}px`,
              height: `${currentCategory.height * currentScale}px`,
              transition: isDragging ? "none" : "width 0.2s ease, height 0.2s ease"
            }}
            className="relative flex items-center justify-center shrink-0"
          >
            {/* The Actual Canvas Surface */}
            <div
              ref={canvasRef}
              onClick={() => setSelectedElementId(null)}
              style={{
                width: `${currentCategory.width}px`,
                height: `${currentCategory.height}px`,
                backgroundColor: currentBg,
                transform: `scale(${currentScale})`,
                transformOrigin: "center center",
                position: "absolute"
              }}
              className="rounded-xl shadow-2xl overflow-hidden cursor-crosshair border border-gray-700/60"
            >
              {/* Render Layer Elements */}
              {currentElements.map((el) => {
                const isSelected = el.id === selectedElementId;

                if (el.type === "text") {
                  return (
                    <div
                      key={el.id}
                      onMouseDown={(e) => handleMouseDown(e, el)}
                      style={{
                        position: "absolute",
                        left: `${el.x}px`,
                        top: `${el.y}px`,
                        fontSize: `${el.fontSize}px`,
                        fontWeight: el.fontWeight || "normal",
                        color: el.fill,
                        fontFamily: el.fontFamily || "sans-serif",
                        lineHeight: "1.25",
                        whiteSpace: "pre-wrap"
                      }}
                      className={`cursor-move select-none p-1 rounded ${
                        isSelected ? "ring-2 ring-purple-500 bg-purple-500/10" : ""
                      }`}
                    >
                      {el.text}
                    </div>
                  );
                }

                if (el.type === "shape") {
                  if (el.shape === "circle") {
                    return (
                      <div
                        key={el.id}
                        onMouseDown={(e) => handleMouseDown(e, el)}
                        style={{
                          position: "absolute",
                          left: `${el.x}px`,
                          top: `${el.y}px`,
                          width: `${el.width}px`,
                          height: `${el.height}px`,
                          backgroundColor: el.fill,
                          borderRadius: "50%"
                        }}
                        className={`cursor-move ${isSelected ? "ring-2 ring-purple-500" : ""}`}
                      />
                    );
                  }

                  return (
                    <div
                      key={el.id}
                      onMouseDown={(e) => handleMouseDown(e, el)}
                      style={{
                        position: "absolute",
                        left: `${el.x}px`,
                        top: `${el.y}px`,
                        width: `${el.width}px`,
                        height: `${el.height}px`,
                        backgroundColor: el.fill,
                        border: el.stroke ? `${el.strokeWidth || 1}px solid ${el.stroke}` : "none"
                      }}
                      className={`cursor-move ${isSelected ? "ring-2 ring-purple-500" : ""}`}
                    />
                  );
                }

                if (el.type === "qr") {
                  return (
                    <div
                      key={el.id}
                      onMouseDown={(e) => handleMouseDown(e, el)}
                      style={{
                        position: "absolute",
                        left: `${el.x}px`,
                        top: `${el.y}px`,
                        width: `${el.size || 120}px`,
                        height: `${el.size || 120}px`
                      }}
                      className={`bg-white p-2 rounded-lg shadow cursor-move flex flex-col items-center justify-center ${
                        isSelected ? "ring-2 ring-purple-500" : ""
                      }`}
                    >
                      <QrCode size={(el.size || 120) - 20} className="text-black" />
                      <span className="text-[8px] text-gray-600 font-mono mt-0.5 font-bold">SCAN ME</span>
                    </div>
                  );
                }

                if (el.type === "image") {
                  return (
                    <div
                      key={el.id}
                      onMouseDown={(e) => handleMouseDown(e, el)}
                      style={{
                        position: "absolute",
                        left: `${el.x}px`,
                        top: `${el.y}px`,
                        width: `${el.width}px`,
                        height: `${el.height}px`
                      }}
                      className={`cursor-move overflow-hidden ${isSelected ? "ring-2 ring-purple-500" : ""}`}
                    >
                      <img src={el.src} alt="Canvas Asset" className="w-full h-full object-contain pointer-events-none" />
                    </div>
                  );
                }

                return null;
              })}

              {/* Pre-Press Print Guides Overlay (Red Bleed, Green Safety) */}
              {showGuides && (
                <>
                  <div className="absolute inset-2 border border-dashed border-red-500/40 pointer-events-none">
                    <span className="absolute top-1 left-2 text-[9px] text-red-400 font-mono">
                      {currentCategory.bleed}mm Pre-Press Bleed Margin
                    </span>
                  </div>
                  <div className="absolute inset-8 border border-dashed border-emerald-500/40 pointer-events-none">
                    <span className="absolute bottom-1 right-2 text-[9px] text-emerald-400 font-mono">
                      Safety Zone
                    </span>
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Bottom Adaptive Zoom Controls (Google Stitch Style) */}
          <div className="absolute bottom-4 inset-x-0 mx-auto w-fit flex items-center gap-3 bg-gray-900/90 backdrop-blur-md px-4 py-1.5 rounded-full border border-gray-700 shadow-xl z-20 text-xs text-gray-300">
            <button
              onClick={() => {
                setIsAutoFit(true);
                updateViewportScale();
              }}
              className={`px-2 py-0.5 rounded transition ${
                isAutoFit ? "bg-[#9c1dac] text-white font-bold" : "text-gray-400 hover:text-white"
              }`}
            >
              Fit Viewport
            </button>

            <div className="h-4 w-px bg-gray-700" />

            <button
              onClick={() => {
                setIsAutoFit(false);
                setManualScale(Math.max(0.3, manualScale - 0.1));
              }}
              className="hover:text-white cursor-pointer"
            >
              <ZoomOut size={14} />
            </button>

            <span className="font-mono text-[11px] min-w-10 text-center">
              {Math.round(currentScale * 100)}%
            </span>

            <button
              onClick={() => {
                setIsAutoFit(false);
                setManualScale(Math.min(1.8, manualScale + 0.1));
              }}
              className="hover:text-white cursor-pointer"
            >
              <ZoomIn size={14} />
            </button>
          </div>
        </main>

        {/* 4. RIGHT PROPERTY INSPECTOR (When an element is selected) */}
        {selectedElement && (
          <aside className="w-64 bg-[#161922] border-l border-gray-800 p-4 shrink-0 space-y-4 z-20 overflow-y-auto">
            <div className="flex items-center justify-between border-b border-gray-800 pb-2">
              <span className="text-xs font-bold uppercase tracking-wider text-purple-400">
                {selectedElement.type} Settings
              </span>
              <button
                onClick={deleteSelectedElement}
                className="text-red-400 hover:text-red-300 p-1 hover:bg-red-950/40 rounded transition cursor-pointer"
              >
                <Trash2 size={14} />
              </button>
            </div>

            {selectedElement.type === "text" && (
              <div className="space-y-3">
                <div>
                  <label className="text-[11px] text-gray-400 block mb-1">Text Content</label>
                  <textarea
                    value={selectedElement.text}
                    onChange={(e) => updateSelectedElement("text", e.target.value)}
                    rows={2}
                    className="w-full bg-[#12141c] border border-gray-700 rounded-lg p-2 text-xs text-white focus:outline-none focus:border-purple-500"
                  />
                </div>

                <div>
                  <label className="text-[11px] text-gray-400 block mb-1">Font Size ({selectedElement.fontSize}px)</label>
                  <input
                    type="range"
                    min="10"
                    max="80"
                    value={selectedElement.fontSize}
                    onChange={(e) => updateSelectedElement("fontSize", Number(e.target.value))}
                    className="w-full accent-purple-600"
                  />
                </div>

                <div>
                  <label className="text-[11px] text-gray-400 block mb-1">Font Color</label>
                  <div className="flex items-center gap-2">
                    <input
                      type="color"
                      value={selectedElement.fill}
                      onChange={(e) => updateSelectedElement("fill", e.target.value)}
                      className="w-8 h-8 rounded border-none cursor-pointer bg-transparent"
                    />
                    <span className="text-xs font-mono text-gray-300">{selectedElement.fill}</span>
                  </div>
                </div>
              </div>
            )}

            {selectedElement.type === "shape" && (
              <div className="space-y-3">
                <div>
                  <label className="text-[11px] text-gray-400 block mb-1">Fill Color</label>
                  <div className="flex items-center gap-2">
                    <input
                      type="color"
                      value={selectedElement.fill}
                      onChange={(e) => updateSelectedElement("fill", e.target.value)}
                      className="w-8 h-8 rounded border-none cursor-pointer bg-transparent"
                    />
                    <span className="text-xs font-mono text-gray-300">{selectedElement.fill}</span>
                  </div>
                </div>

                <div>
                  <label className="text-[11px] text-gray-400 block mb-1">Width ({selectedElement.width}px)</label>
                  <input
                    type="range"
                    min="10"
                    max="900"
                    value={selectedElement.width}
                    onChange={(e) => updateSelectedElement("width", Number(e.target.value))}
                    className="w-full accent-purple-600"
                  />
                </div>

                <div>
                  <label className="text-[11px] text-gray-400 block mb-1">Height ({selectedElement.height}px)</label>
                  <input
                    type="range"
                    min="2"
                    max="600"
                    value={selectedElement.height}
                    onChange={(e) => updateSelectedElement("height", Number(e.target.value))}
                    className="w-full accent-purple-600"
                  />
                </div>
              </div>
            )}

            {selectedElement.type === "image" && (
              <div className="space-y-3">
                {selectedElement.prompt && (
                  <div className="p-2 rounded bg-[#12141c] border border-gray-800 text-[11px]">
                    <span className="text-purple-400 font-bold block mb-0.5">AI Prompt:</span>
                    <p className="text-gray-300 italic">{selectedElement.prompt}</p>
                  </div>
                )}
                <div>
                  <label className="text-[11px] text-gray-400 block mb-1">Size ({selectedElement.width}px)</label>
                  <input
                    type="range"
                    min="50"
                    max="600"
                    value={selectedElement.width}
                    onChange={(e) => {
                      const val = Number(e.target.value);
                      updateSelectedElement("width", val);
                      updateSelectedElement("height", val);
                    }}
                    className="w-full accent-purple-600"
                  />
                </div>
              </div>
            )}
          </aside>
        )}
      </div>
    </div>
  );
}