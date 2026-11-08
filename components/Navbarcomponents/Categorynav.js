"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  ArrowRight,
  Sparkles,
  ExternalLink
} from "lucide-react";

// Complete 13 Categories Catalog with Multicolumn Mega-Menu Links & Visual Spotlight Cards
export const MEGA_MENU_CATEGORIES = [
  {
    id: "visiting-cards",
    name: "Visiting Cards",
    slug: "/paper-printing/VisitingCards",
    badge: "Bestseller",
    spotlight: {
      title: "Standard & Luxury Visiting Cards",
      description: "350 GSM Art Card with Thermal Matte, Gloss or Spot UV Raised Finish.",
      rate: "From ₹200 / 1000 pcs",
      image: "/images/StandardVisitingCard.jpeg",
      link: "/paper-printing/VisitingCards"
    },
    columns: [
      {
        title: "Standard Business Cards",
        links: [
          { name: "Standard 350 GSM Art Card", href: "/paper-printing/VisitingCards", badge: "Factory Rate" },
          { name: "Single Side Business Cards", href: "/paper-printing/VisitingCards" },
          { name: "Double Side Full Colour Print", href: "/paper-printing/VisitingCards" },
          { name: "Thermal Matte Laminated Cards", href: "/paper-printing/VisitingCards" },
          { name: "High Gloss Protective Finish", href: "/paper-printing/VisitingCards" },
        ]
      },
      {
        title: "Luxury & Special Finishes",
        links: [
          { name: "Raised Spot UV Visiting Cards", href: "/paper-printing/VisitingCards", badge: "Premium" },
          { name: "Velvet Soft-Touch Luxury Cards", href: "/paper-printing/VisitingCards" },
          { name: "Rounded 6mm Corners Die-Cut", href: "/paper-printing/VisitingCards" },
          { name: "Metallic Gold & Silver Foil Stamping", href: "/paper-printing/VisitingCards" },
          { name: "Kraft Brown Textured Cards", href: "/paper-printing/VisitingCards" },
        ]
      },
      {
        title: "Corporate & Bulk Packs",
        links: [
          { name: "Corporate Employee Packs (500/1000)", href: "/paper-printing/VisitingCards" },
          { name: "Executive Metallic Lustre Cards", href: "/paper-printing/VisitingCards" },
          { name: "Transparent Frost PVC Cards", href: "/paper-printing/VisitingCards" },
          { name: "Embossed Visiting Cards", href: "/paper-printing/VisitingCards" },
          { name: "Same-Day Dispatch Cards", href: "/paper-printing/VisitingCards", badge: "Fast" },
        ]
      },
      {
        title: "Artwork & Production Paths",
        links: [
          { name: "Design in K2 Studio", href: "/studio", highlight: true },
          { name: "Upload Ready PDF / CorelDraw / AI", href: "/paper-printing/VisitingCards" },
          { name: "Hire K2 Graphic Artist (+₹299)", href: "/paper-printing/VisitingCards" },
          { name: "Free Store Pickup (Pune & Mumbai)", href: "/#branch-locator" }
        ]
      }
    ]
  },
  {
    id: "stationery-office",
    name: "Stationery & Office",
    slug: "/categories/paper-printing",
    spotlight: {
      title: "GST Tax Invoices & Corporate Stationery",
      description: "Carbonless NCR Duplicate/Triplicate books, executive letterheads & envelopes.",
      rate: "From ₹420 / 12 books",
      image: "/images/DiryWithPen.jpeg",
      link: "/categories/paper-printing/subcategories/bill-books"
    },
    columns: [
      {
        title: "Custom Stationery",
        links: [
          { name: "Executive Letterheads (100 GSM Bond)", href: "/categories/paper-printing/subcategories/letterheads" },
          { name: "Custom Letterhead Writing Pads", href: "/categories/paper-printing/subcategories/letterheads" },
          { name: "Peel & Seal Office Envelopes", href: "/categories/paper-printing/subcategories/envelopes" },
          { name: "Banker Envelopes (#10 / 9x4)", href: "/categories/paper-printing/subcategories/envelopes" },
          { name: "Window Mailing Envelopes", href: "/categories/paper-printing/subcategories/envelopes" },
        ]
      },
      {
        title: "Billing & Accounts Books",
        links: [
          { name: "GST Tax Invoices (1+1 Duplicate)", href: "/categories/paper-printing/subcategories/bill-books", badge: "Essential" },
          { name: "Triplicate NCR Books (1+2)", href: "/categories/paper-printing/subcategories/bill-books" },
          { name: "Receipt & Pavati Books", href: "/categories/paper-printing/subcategories/pavati-book" },
          { name: "Delivery Challan & Cash Memos", href: "/categories/paper-printing/subcategories/bill-books" },
          { name: "Consecutive Numbered Vouchers", href: "/categories/paper-printing/subcategories/bill-books" },
        ]
      },
      {
        title: "Files & Folders",
        links: [
          { name: "Corporate Presentation Folders", href: "/categories/paper-printing/subcategories/files-and-folders" },
          { name: "Custom Document Files", href: "/categories/paper-printing/subcategories/files-and-folders", badge: "NEW" },
          { name: "Office Ring Binder Files", href: "/categories/paper-printing/subcategories/files-and-folders" },
          { name: "Presentation Folders with Pocket", href: "/categories/paper-printing/subcategories/files-and-folders" },
          { name: "Shop all Files & Folders", href: "/categories/paper-printing/subcategories/files-and-folders" },
        ]
      },
      {
        title: "Packaging & Desk Supplies",
        links: [
          { name: "Custom Printed Paper Bags", href: "/categories/paper-printing/subcategories/paper-bags" },
          { name: "Die-Cut Product Stickers & Labels", href: "/categories/paper-printing/subcategories/sticker-and-label" },
          { name: "Executive Writing Notepads", href: "/categories/paper-printing/subcategories/letterheads" },
          { name: "Employee Welcome Kits", href: "/categories/paper-printing" },
          { name: "Shop all Office Stationery", href: "/paper-printing" }
        ]
      }
    ]
  },
  {
    id: "tags-stamps",
    name: "Product Tags & Stamps",
    slug: "/paper-printing/Tags",
    badge: "Popular",
    spotlight: {
      title: "Apparel Swing Tags & Pre-Inked Stamps",
      description: "Die-cut garment hang tags with brass eyelets and sharp Japanese flash stamps.",
      rate: "Tags from ₹0.60 • Stamps from ₹90",
      image: "/images/product-tags-hangtags.jpg",
      link: "/paper-printing/Tags"
    },
    columns: [
      {
        title: "Apparel & Garment Tags",
        links: [
          { name: "Product Swing Tags (350 GSM)", href: "/paper-printing/Tags", badge: "Hot" },
          { name: "Die-Cut Tags with 4mm Brass Eyelet", href: "/paper-printing/Tags" },
          { name: "Cotton Thread with Safety Pin", href: "/paper-printing/Tags" },
          { name: "Perforated Tear-off Counterfoil Tags", href: "/paper-printing/Tags" },
          { name: "Kraft Paper Eco Hang Tags", href: "/paper-printing/Tags" },
        ]
      },
      {
        title: "Self-Inking & Rubber Stamps",
        links: [
          { name: "Basic Nylon Stamps (1-4 lines)", href: "/paper-printing/Stamp", badge: "From ₹90" },
          { name: "Pre-Inked Japanese Flash Stamps", href: "/paper-printing/Stamp" },
          { name: "Round & Oval Official Seal Stamps", href: "/paper-printing/Stamp" },
          { name: "Heavy Duty Dater Stamps", href: "/paper-printing/Stamp" },
          { name: "Premium 2-Colour Imprint Stamps", href: "/paper-printing/Stamp" },
        ]
      },
      {
        title: "Stamp Inks & Accessories",
        links: [
          { name: "Refill Inks (Violet, Blue, Black, Red)", href: "/paper-printing/Stamp" },
          { name: "Replacement Ink Pads", href: "/paper-printing/Stamp" },
          { name: "Pocket Portable Self-Ink Stamps", href: "/paper-printing/Stamp" },
          { name: "Official Signature Stamps", href: "/paper-printing/Stamp" },
        ]
      },
      {
        title: "Stickers & Product Labels",
        links: [
          { name: "Gloss Vinyl Waterproof Stickers", href: "/categories/paper-printing/subcategories/sticker-and-label" },
          { name: "Matte Paper Barcode & Price Labels", href: "/categories/paper-printing/subcategories/sticker-and-label" },
          { name: "Kiss-Cut Optical Eye Label Sheets", href: "/categories/paper-printing/subcategories/sticker-and-label" },
          { name: "Custom Jar & Bottle Die-Cut Labels", href: "/categories/paper-printing/subcategories/sticker-and-label" }
        ]
      }
    ]
  },
  {
    id: "flex-banners",
    name: "Flex & Banners",
    slug: "/categories/flex-banner",
    spotlight: {
      title: "Large Format Banners & Standees",
      description: "Frontlit, Star Flex, framed hoardings, and aluminium roll-up marketing displays.",
      rate: "From ₹12 / sq.ft",
      image: "/images/Flex&Related.png",
      link: "/categories/flex-banner"
    },
    columns: [
      {
        title: "Flex Banner Media Printing",
        links: [
          { name: "Frontlit Normal Flex Banner", href: "/categories/flex-and-related-product/subcategories/flex-(banner)-printing", badge: "₹12/sq.ft" },
          { name: "Star Flex High-Gloss Media", href: "/categories/flex-and-related-product/subcategories/flex-(banner)-printing" },
          { name: "Blackout 100% Light-Blocking Flex", href: "/categories/flex-and-related-product/subcategories/flex-(banner)-printing" },
          { name: "Eco-Solvent HD Banner Printing", href: "/categories/flex-and-related-product/subcategories/flex-(banner)-printing" },
          { name: "Retro-Reflective Flex Printing", href: "/categories/flex-and-related-product/subcategories/flex-(banner)-printing" },
        ]
      },
      {
        title: "Framed Hoardings & Boards",
        links: [
          { name: "Economy Flex + 1\" MS Pipe Frame", href: "/categories/flex-and-related-product/subcategories/flex-(banner)-printing-economy-%2B-ms-frame" },
          { name: "Premium Flex + Heavy MS Tubular Frame", href: "/categories/flex-and-related-product/subcategories/flex-(banner)-printing-premium-%2B-ms-frame" },
          { name: "Sturdy Pine Wood Framework Board", href: "/categories/flex-and-related-product/subcategories/flex-(banner)-%2B-wooden-frame" },
          { name: "Roadside Advertising MS Hoarding", href: "/categories/flex-and-related-product/subcategories/flex-(banner)-printing-advertise-%2B-ms-frame" },
          { name: "Shop all Framed Banners", href: "/categories/flex-banner" },
        ]
      },
      {
        title: "Portable Marketing Standees",
        links: [
          { name: "Roll-Up Aluminium Standee (6x3 ft)", href: "/categories/flex-and-related-product/subcategories/roll-up-stand", badge: "Popular" },
          { name: "Compact 6x2.5 ft Event Standee", href: "/categories/flex-and-related-product/subcategories/roll-up-stand" },
          { name: "Luxury Chrome Base Standee", href: "/categories/flex-and-related-product/subcategories/flex-stand" },
          { name: "Tabletop Mini Roll-Up Standee", href: "/categories/flex-and-related-product/subcategories/roll-up-stand" },
          { name: "Replacement Banner Media Print", href: "/categories/flex-and-related-product/subcategories/flex-(banner)-printing" },
        ]
      },
      {
        title: "Fabric & Event Displays",
        links: [
          { name: "Tension Fabric Pop-Up Displays", href: "/categories/flex-banner" },
          { name: "Outdoor Event Canopy & Gazebo", href: "/categories/flex-banner" },
          { name: "Teardrop & Feather Event Flags", href: "/categories/flex-banner" },
          { name: "Same Day Urgent Printing Available", href: "/categories/flex-banner" }
        ]
      }
    ]
  },
  {
    id: "led-signboards",
    name: "LED Signboards",
    slug: "/categories/light-board-led-board",
    spotlight: {
      title: "Exterior Illuminated LED Signages",
      description: "CNC routed ACP stencil boards, 3D channel letters, and slim fabric lightboxes.",
      rate: "From ₹450 / sq.ft",
      image: "/images/LEDBoard.png",
      link: "/categories/light-board-led-board"
    },
    columns: [
      {
        title: "Storefront LED Signboards",
        links: [
          { name: "3D LED Channel Letters", href: "/categories/light-board-led-board/subcategories/3d-led-letters", badge: "Premium" },
          { name: "ACP Stencil CNC Cut LED Board", href: "/categories/light-board-led-board/subcategories/acp-stencil-led-board" },
          { name: "Commercial Heavy Lightbox Board", href: "/categories/light-board-led-board/subcategories/lightbox-board" },
          { name: "Backlit Tubular Frame Flex Board", href: "/categories/light-board-led-board/subcategories/backlit-tube-flex-board" },
        ]
      },
      {
        title: "Modern Indoor Displays",
        links: [
          { name: "Frameless SEG Fabrics LED Board", href: "/categories/light-board-led-board/subcategories/fabrics-led-board-textile-led-board", badge: "Ultra Slim" },
          { name: "LED Thinlite Snap Clip-on Frame", href: "/categories/light-board-led-board/subcategories/led-thinlite-frames-(cliapon-frames)" },
          { name: "Restaurant Menu Backlit Displays", href: "/categories/light-board-led-board/subcategories/led-thinlite-frames-(cliapon-frames)" },
          { name: "Double-Sided Hanging Lightboxes", href: "/categories/light-board-led-board/subcategories/lightbox-board" },
        ]
      },
      {
        title: "Engineering & Modules",
        links: [
          { name: "Waterproof Samsung LED Modules", href: "/categories/light-board-led-board/subcategories/lightbox-board" },
          { name: "Rainproof IP67 Power Supplies", href: "/categories/light-board-led-board" },
          { name: "Day/Night Twilight Light Sensors", href: "/categories/light-board-led-board" },
          { name: "Shop all LED Signboards", href: "/categories/light-board-led-board" },
        ]
      },
      {
        title: "Turnkey Signage Services",
        links: [
          { name: "On-Site Measurement & Survey", href: "/#branch-locator" },
          { name: "Free 3D Photomontage Simulation", href: "/#branch-locator" },
          { name: "Professional Night Installation", href: "/#branch-locator" },
          { name: "1-Year Electrical Guarantee", href: "/#branch-locator" }
        ]
      }
    ]
  },
  {
    id: "3d-letters",
    name: "3D Acrylic Letters",
    slug: "/categories/3d-letters",
    badge: "Trending",
    spotlight: {
      title: "Precision 3D Acrylic & Metal Letters",
      description: "CNC cut acrylic letters, titanium mirror gold finishes & halo LED backlighting.",
      rate: "From ₹85 / inch height",
      image: "/images/acrylic-3d-letters.jpg",
      link: "/categories/3d-letters"
    },
    columns: [
      {
        title: "Cast Acrylic 3D Letters",
        links: [
          { name: "Acrylic Letters & Numbers (Custom Cut)", href: "/categories/3d-letters/subcategories/acrylic-letters-and-numbers", badge: "Hot" },
          { name: "English & Marathi Font Channel Letters", href: "/categories/light-board-led-board/subcategories/3d-led-letters" },
          { name: "3mm to 25mm Thickness Profiles", href: "/categories/3d-letters/subcategories/acrylic-letters-and-numbers" },
          { name: "Solid Cast Acrylic Lettering", href: "/categories/3d-letters/subcategories/acrylic-letters-and-numbers" },
        ]
      },
      {
        title: "Illuminated 3D Letters",
        links: [
          { name: "Frontlit Acrylic Face LED Letters", href: "/categories/light-board-led-board/subcategories/3d-led-letters" },
          { name: "Backlit Halo Glow Letters", href: "/categories/light-board-led-board/subcategories/3d-led-letters" },
          { name: "Side Edge Glow Acrylic Letters", href: "/categories/light-board-led-board/subcategories/3d-led-letters" },
          { name: "Dual Colour Acrylic Letters", href: "/categories/3d-letters/subcategories/acrylic-letters-and-numbers" },
        ]
      },
      {
        title: "Architectural Metallic Finishes",
        links: [
          { name: "Titanium Gold Mirror Finish", href: "/categories/3d-letters/subcategories/acrylic-letters-and-numbers", badge: "Luxury" },
          { name: "Chrome Silver Mirror Acrylic", href: "/categories/3d-letters/subcategories/acrylic-letters-and-numbers" },
          { name: "Grade 304 Stainless Steel Letters", href: "/categories/light-board-led-board/subcategories/3d-led-letters" },
          { name: "Rose Gold Mirror Typography", href: "/categories/light-board-led-board/subcategories/3d-led-letters" },
        ]
      },
      {
        title: "Mounting & Templates",
        links: [
          { name: "Full Scale 1:1 Paper Stencil Included", href: "/categories/3d-letters" },
          { name: "3M High-Bond VHB Foam Tape", href: "/categories/3d-letters" },
          { name: "Brass & SS Stud Spacer Mounts", href: "/categories/3d-letters" },
          { name: "Easy DIY Installation Guide", href: "/categories/3d-letters" }
        ]
      }
    ]
  },
  {
    id: "brochures-marketing",
    name: "Brochures & Catalogs",
    slug: "/paper-printing/Brochure",
    spotlight: {
      title: "Marketing Brochures & Booklets",
      description: "Bi-fold & tri-fold flyers, multi-page stitched product catalogs with anti-crack creasing.",
      rate: "From ₹1,200 / 1000 pcs",
      image: "/images/brochures.jpeg",
      link: "/paper-printing/Brochure"
    },
    columns: [
      {
        title: "Multi-Fold Marketing Brochures",
        links: [
          { name: "Bi-Fold Marketing Brochures (A4/A5)", href: "/categories/paper-printing/subcategories/brochure-cover", badge: "Top Pick" },
          { name: "Tri-Fold 6-Panel Pocket Brochures", href: "/categories/paper-printing/subcategories/brochure-cover" },
          { name: "Gate-Fold Luxury Brochures", href: "/categories/paper-printing/subcategories/brochure-cover" },
          { name: "170 GSM & 250 GSM High-Bulk Gloss", href: "/categories/paper-printing/subcategories/brochure-cover" },
          { name: "Thermal Gloss & Matte Lamination", href: "/categories/paper-printing/subcategories/brochure-cover" },
        ]
      },
      {
        title: "Multi-Page Booklets & Catalogs",
        links: [
          { name: "Saddle-Stitch Center Pinned Booklets", href: "/categories/paper-printing/subcategories/booklet-a4a5" },
          { name: "8 to 32 Pages Product Catalogs", href: "/categories/paper-printing/subcategories/booklet-a4a5" },
          { name: "Corporate Annual Reports & Profiles", href: "/categories/paper-printing/subcategories/booklet-a4a5" },
          { name: "Technical Instruction Manuals", href: "/categories/paper-printing/subcategories/booklet-a4a5" },
          { name: "Heavy Laminated Outer Covers", href: "/categories/paper-printing/subcategories/booklet-a4a5" },
        ]
      },
      {
        title: "Promotional Flyers & Leaflets",
        links: [
          { name: "Multi-Colour Promotional Pamphlets", href: "/categories/paper-printing/subcategories/pamphlet" },
          { name: "Single Colour Economy Handbills", href: "/categories/paper-printing/subcategories/pamphlet" },
          { name: "12x18 HD Digital Press Posters", href: "/categories/paper-printing/subcategories/digital-print-product" },
          { name: "Newspaper Insert Leaflets", href: "/categories/paper-printing/subcategories/pamphlet" }
        ]
      },
      {
        title: "Paper Stocks & Creasing",
        links: [
          { name: "130 GSM Art Paper (Bulk Distribution)", href: "/categories/paper-printing/subcategories/pamphlet" },
          { name: "250 GSM Art Card (Heavy Premium)", href: "/categories/paper-printing/subcategories/brochure-cover" },
          { name: "Anti-Crack Mechanical Scoring", href: "/categories/paper-printing/subcategories/brochure-cover" },
          { name: "Spot UV on Catalog Covers", href: "/categories/paper-printing/subcategories/booklet-a4a5" }
        ]
      }
    ]
  },
  {
    id: "rigid-sign-plates",
    name: "Rigid Sign Plates",
    slug: "/categories/rigid-sign-plates",
    spotlight: {
      title: "Weatherproof Commercial Plates",
      description: "3mm ACP panels, acrylic stud plaques, and emergency glow-in-dark plates.",
      rate: "From ₹180 / sq.ft",
      image: "/images/RigidSign.png",
      link: "/categories/rigid-sign-plates"
    },
    columns: [
      {
        title: "Commercial Signboard Plates",
        links: [
          { name: "ACP Sign Plates (3mm Heavy Panel)", href: "/categories/rigid-sign-plates/subcategories/acp-plates", badge: "Weatherproof" },
          { name: "Acrylic Plates with Stud Mounts", href: "/categories/rigid-sign-plates/subcategories/acrylic-plates" },
          { name: "PVC Foam Board (5mm Forex Board)", href: "/categories/rigid-sign-plates/subcategories/pvc-foam-plates" },
          { name: "Stainless Steel Grade 304 Plates", href: "/categories/rigid-sign-plates/subcategories/stainless-steel-plates" },
          { name: "Polished Brass Chamber Plates", href: "/categories/rigid-sign-plates/subcategories/stainless-steel-plates" },
        ]
      },
      {
        title: "Safety & Directional Signs",
        links: [
          { name: "Night Glow Photoluminescent Signs", href: "/categories/rigid-sign-plates/subcategories/night-glow-plates", badge: "Glow 6 Hrs" },
          { name: "Fire Exit & Hazard Signs", href: "/categories/rigid-sign-plates/subcategories/night-glow-plates" },
          { name: "High Voltage Caution Signboards", href: "/categories/rigid-sign-plates/subcategories/night-glow-plates" },
          { name: "ISO Compliant Industrial Signs", href: "/categories/rigid-sign-plates/subcategories/night-glow-plates" },
          { name: "Emergency Evacuation Plan Plaques", href: "/categories/rigid-sign-plates/subcategories/night-glow-plates" },
        ]
      },
      {
        title: "Corporate & Chamber Plates",
        links: [
          { name: "Doctor & Hospital Chamber Nameplates", href: "/categories/rigid-sign-plates/subcategories/acrylic-plates" },
          { name: "Department & Room Number Plates", href: "/categories/rigid-sign-plates/subcategories/acrylic-plates" },
          { name: "Sliding Vacant/Engaged Plates", href: "/categories/rigid-sign-plates/subcategories/acrylic-plates" },
          { name: "Executive Desk Nameplates", href: "/categories/rigid-sign-plates/subcategories/acrylic-plates" },
        ]
      },
      {
        title: "Mounting Hardware",
        links: [
          { name: "Satin Chrome Stud Screws", href: "/categories/rigid-sign-plates" },
          { name: "Polished Brass Spacers", href: "/categories/rigid-sign-plates" },
          { name: "Concealed Keyhole Wall Brackets", href: "/categories/rigid-sign-plates" },
          { name: "Industrial Weatherproof Foam Tape", href: "/categories/rigid-sign-plates" }
        ]
      }
    ]
  },
  {
    id: "vinyl-letters",
    name: "Vinyl Cut Letters",
    slug: "/categories/vinyl-letters",
    spotlight: {
      title: "Plotter-Cut Vinyl Typography",
      description: "Self-adhesive commercial vinyl for storefronts, glass partitions & vehicles.",
      rate: "From ₹0.85 / sq.inch",
      image: "/images/vinyl-letters-gold-silver.jpg",
      link: "/categories/vinyl-letters"
    },
    columns: [
      {
        title: "Precision Plotter Cutting",
        links: [
          { name: "Custom Vinyl Letters & Numbers", href: "/categories/vinyl-letters/subcategories/vinyl-letters-and-numbers", badge: "Popular" },
          { name: "Gloss Black / Matte White Lettering", href: "/categories/vinyl-letters/subcategories/vinyl-letters-and-numbers" },
          { name: "Multi-Colour Layered Typography", href: "/categories/vinyl-letters/subcategories/vinyl-letters-and-numbers" },
          { name: "Mirror Gold & Chrome Silver Vinyl", href: "/categories/vinyl-letters/subcategories/vinyl-letters-and-numbers" },
          { name: "Holographic Rainbow Decals", href: "/categories/vinyl-letters/subcategories/vinyl-letters-and-numbers" },
        ]
      },
      {
        title: "Commercial Storefront Graphics",
        links: [
          { name: "Storefront Operating Hours Decals", href: "/categories/vinyl-letters/subcategories/vinyl-letters-and-numbers" },
          { name: "Glass Door Push / Pull Decals", href: "/categories/vinyl-letters/subcategories/vinyl-letters-and-numbers" },
          { name: "Social Media & QR Code Decals", href: "/categories/vinyl-letters/subcategories/vinyl-letters-and-numbers" },
          { name: "Promotional Sale Window Decals", href: "/categories/vinyl-letters/subcategories/vinyl-letters-and-numbers" },
        ]
      },
      {
        title: "Vehicle & Fleet Branding",
        links: [
          { name: "Commercial Fleet Vehicle Branding", href: "/categories/vinyl-letters/subcategories/vinyl-letters-and-numbers" },
          { name: "Delivery Van & Truck Lettering", href: "/categories/vinyl-letters/subcategories/vinyl-letters-and-numbers" },
          { name: "Machinery Serial Number Stencils", href: "/categories/vinyl-letters/subcategories/vinyl-letters-and-numbers" },
          { name: "Reflective Commercial Decals", href: "/categories/vinyl-letters/subcategories/vinyl-letters-and-numbers" },
        ]
      },
      {
        title: "Application Accessories",
        links: [
          { name: "Clear Transfer Tape Included", href: "/categories/vinyl-letters" },
          { name: "Professional Felt Edge Squeegee", href: "/categories/vinyl-letters" },
          { name: "Surface Cleaning Alcohol Wipes", href: "/categories/vinyl-letters" },
          { name: "Step-by-Step DIY Guide", href: "/categories/vinyl-letters" }
        ]
      }
    ]
  },
  {
    id: "media-printing",
    name: "Media Printing",
    slug: "/categories/media-printing",
    spotlight: {
      title: "Specialty Large Format Media",
      description: "Gallery-wrapped canvas, backlit translite films, and 3M reflective signage.",
      rate: "From ₹65 / sq.ft",
      image: "/images/StandBoard1.jpg",
      link: "/categories/media-printing"
    },
    columns: [
      {
        title: "Large Format Media",
        links: [
          { name: "Self-Adhesive Vinyl Print", href: "/categories/media-printing/subcategories/vinyl-print", badge: "High Res" },
          { name: "Backlit Translucent Media Print", href: "/categories/media-printing/subcategories/backlit-flex-print" },
          { name: "Fine Art Stretched Canvas Prints", href: "/categories/media-printing/subcategories/canvas-print", badge: "Art Quality" },
          { name: "Translit Film (for Clip-On Frames)", href: "/categories/media-printing/subcategories/translit-print-(for-cliapon)" },
          { name: "3M Commercial Reflective Vinyl", href: "/categories/media-printing/subcategories/3m-reflector" },
        ]
      },
      {
        title: "Protective Laminations",
        links: [
          { name: "Cold Matte Anti-Glare Film", href: "/categories/media-printing" },
          { name: "High Gloss Protective Laminate", href: "/categories/media-printing" },
          { name: "Sparkle Floor Graphic Lamination", href: "/categories/media-printing" },
          { name: "Anti-Graffiti Cleanable Film", href: "/categories/media-printing" },
        ]
      },
      {
        title: "Interior Wall Murals",
        links: [
          { name: "Custom Textured Wall Murals", href: "/categories/media-printing" },
          { name: "Removable Self-Adhesive Wallpapers", href: "/categories/media-printing" },
          { name: "Frosted Glass Media Printing", href: "/categories/media-printing" },
          { name: "High-Tack Concrete Surface Media", href: "/categories/media-printing" },
        ]
      },
      {
        title: "Print Technology & Inks",
        links: [
          { name: "HP Latex Eco Odourless Inks", href: "/categories/media-printing" },
          { name: "Mimaki Eco-Solvent UV Inks", href: "/categories/media-printing" },
          { name: "High Density 1200 DPI Micro-Piezo", href: "/categories/media-printing" },
          { name: "Bulk Roll Purchases Available", href: "/categories/media-printing" }
        ]
      }
    ]
  },
  {
    id: "glass-films",
    name: "Glass Films",
    slug: "/categories/glass-films-glass-decorative",
    spotlight: {
      title: "Frosted Privacy & Decorative Films",
      description: "Plotter-cut architectural frosted patterns and one-way vision perforated films.",
      rate: "From ₹45 / sq.ft",
      image: "/images/GLASSFILMS.png",
      link: "/categories/glass-films-glass-decorative"
    },
    columns: [
      {
        title: "Frosted Privacy Films",
        links: [
          { name: "Frosted Glass Privacy Film", href: "/categories/glass-films-glass-decorative/subcategories/glass-films" },
          { name: "Precision CNC Cut Striped Patterns", href: "/categories/glass-films-glass-decorative/subcategories/glass-films" },
          { name: "Frosted Square & Geometric Matrices", href: "/categories/glass-films-glass-decorative/subcategories/glass-films" },
          { name: "Gradient Dust-to-Clear Film", href: "/categories/glass-films-glass-decorative/subcategories/glass-films" },
        ]
      },
      {
        title: "One-Way Vision & Solar",
        links: [
          { name: "One Way Vision Perforated Print", href: "/categories/glass-films-glass-decorative/subcategories/one-way-vision-print-(glass-film)", badge: "Commercial" },
          { name: "See-Through Window Solar Graphics", href: "/categories/glass-films-glass-decorative/subcategories/one-way-vision-print-(glass-film)" },
          { name: "Full Colour Glass Decals & Murals", href: "/categories/glass-films-glass-decorative/subcategories/glass-films" },
          { name: "Rear Car Glass Perforated Decals", href: "/categories/glass-films-glass-decorative/subcategories/one-way-vision-print-(glass-film)" },
        ]
      },
      {
        title: "Corporate & Clinic Partitions",
        links: [
          { name: "Conference Room Center Bands", href: "/categories/glass-films-glass-decorative/subcategories/glass-films" },
          { name: "Corporate Logo Cutout Panels", href: "/categories/glass-films-glass-decorative/subcategories/glass-films" },
          { name: "Hospital & Clinic Opaque Films", href: "/categories/glass-films-glass-decorative/subcategories/glass-films" },
          { name: "Banker & Teller Counter Frosting", href: "/categories/glass-films-glass-decorative/subcategories/glass-films" },
        ]
      },
      {
        title: "Installation & Services",
        links: [
          { name: "Bubble-Free Wet Application Method", href: "/categories/glass-films-glass-decorative" },
          { name: "Clean Removal Without Glue Residue", href: "/categories/glass-films-glass-decorative" },
          { name: "Scratch Resistant Hardcoat", href: "/categories/glass-films-glass-decorative" },
          { name: "On-Site Installation (Pune/Mumbai)", href: "/#branch-locator" }
        ]
      }
    ]
  },
  {
    id: "modular-signs",
    name: "Modular Signs",
    slug: "/categories/modular-premium-sign-product",
    spotlight: {
      title: "Modular Architectural Signage",
      description: "Curv signs, opti frames, flat signs, and desk stands engineered for easy updates.",
      rate: "From ₹650 / unit",
      image: "/images/ArtFrames.png",
      link: "/categories/modular-premium-sign-product"
    },
    columns: [
      {
        title: "Snap Poster Frames",
        links: [
          { name: "Opti Frames (Snap Poster Frames)", href: "/categories/modular-premium-sign-product/subcategories/opti-frames" },
          { name: "A4, A3, A2, A1 Standard Sizes", href: "/categories/modular-premium-sign-product/subcategories/opti-frames" },
          { name: "Mitered 45° Corner Anodised Profiles", href: "/categories/modular-premium-sign-product/subcategories/opti-frames" },
          { name: "Anti-Glare PVC Protective Cover", href: "/categories/modular-premium-sign-product/subcategories/opti-frames" },
        ]
      },
      {
        title: "Curved Systems",
        links: [
          { name: "Curv Sign Convex Wall Directories", href: "/categories/modular-premium-sign-product/subcategories/curv-sign" },
          { name: "Curv Sign Table Stand Nameplates", href: "/categories/modular-premium-sign-product/subcategories/curv-sign" },
          { name: "Double-Sided Ceiling Hanger Signs", href: "/categories/modular-premium-sign-product/subcategories/curv-sign" },
          { name: "Interchangeable Paper Insert Slots", href: "/categories/modular-premium-sign-product/subcategories/curv-sign" },
        ]
      },
      {
        title: "Flat Sign Directories",
        links: [
          { name: "Flat Sign Wall Directories", href: "/categories/modular-premium-sign-product/subcategories/flat-sign-board" },
          { name: "I-Sign Interlocking Profiles", href: "/categories/modular-premium-sign-product/subcategories/i-sign" },
          { name: "Multi-Tenant Directory Boards", href: "/categories/modular-premium-sign-product/subcategories/flat-sign-board" },
          { name: "Department Wayfinding Signboards", href: "/categories/modular-premium-sign-product/subcategories/flat-sign-board" },
        ]
      },
      {
        title: "Desktop & Art Frames",
        links: [
          { name: "Tabletop Nameplates (Acrylic Base)", href: "/categories/modular-premium-sign-product/subcategories/table-stand-name-plates" },
          { name: "Triangle Aluminium Desk Nameplates", href: "/categories/modular-premium-sign-product/subcategories/table-stand-name-plates" },
          { name: "Executive Art Frames with Studs", href: "/categories/modular-premium-sign-product/subcategories/art-frame" },
          { name: "Countertop QR Code Payment Stands", href: "/categories/modular-premium-sign-product/subcategories/table-stand-name-plates" }
        ]
      }
    ]
  },
  {
    id: "wedding-calendars",
    name: "Wedding & Calendars",
    slug: "/paper-printing/Weddingcard",
    spotlight: {
      title: "Wedding Invitations & Calendars",
      description: "Imported textured wedding boards with foil stamping & 12-month corporate calendars.",
      rate: "From ₹22.20 / calendar",
      image: "/images/CardInvitation.jpeg",
      link: "/paper-printing/Weddingcard"
    },
    columns: [
      {
        title: "Royal Wedding Stationery",
        links: [
          { name: "Royal Wedding Cards (2-Side Foil)", href: "/categories/paper-printing/subcategories/wedding-card", badge: "Exclusive" },
          { name: "Premium Velvet Boxed Invitations", href: "/categories/paper-printing/subcategories/wedding-card" },
          { name: "Traditional Hindu, Muslim & Christian Cards", href: "/categories/paper-printing/subcategories/wedding-card" },
          { name: "Save The Date Floral Cards", href: "/categories/paper-printing/subcategories/wedding-card" },
          { name: "Coordinated RSVP & Shagun Envelopes", href: "/categories/paper-printing/subcategories/wedding-card" },
        ]
      },
      {
        title: "Corporate Wall Calendars",
        links: [
          { name: "12-Month Wall Calendars (Regular 11.5x18\")", href: "/categories/paper-printing/subcategories/calendar", badge: "Bulk Rates" },
          { name: "Small Format Wall Calendars (10x15\")", href: "/categories/paper-printing/subcategories/calendar" },
          { name: "Twin-Loop Wire-O Spiral Hangers", href: "/categories/paper-printing/subcategories/calendar" },
          { name: "Tin Rim Metal Top Binding Calendars", href: "/categories/paper-printing/subcategories/calendar" },
          { name: "Daily Date Tear-Off Panchang Calendars", href: "/categories/paper-printing/subcategories/calendar" },
        ]
      },
      {
        title: "Desk & Executive Calendars",
        links: [
          { name: "Desktop Tent Stand Calendars", href: "/categories/paper-printing/subcategories/calendar" },
          { name: "Wire-O Bound Executive Desk Calendars", href: "/categories/paper-printing/subcategories/calendar" },
          { name: "Custom Branded Company Desk Calendars", href: "/categories/paper-printing/subcategories/calendar" },
          { name: "Wooden Base Perpetual Desk Calendars", href: "/categories/paper-printing/subcategories/calendar" },
        ]
      },
      {
        title: "Invitations & Event Cards",
        links: [
          { name: "Event & Party Invitation Cards", href: "/categories/paper-printing/subcategories/invitation-card" },
          { name: "Inauguration & Opening Passes", href: "/categories/paper-printing/subcategories/invitation-card" },
          { name: "Metallic Foil Stamped Event Cards", href: "/categories/paper-printing/subcategories/invitation-card" },
          { name: "Same-Week Dispatch with Proof", href: "/categories/paper-printing/subcategories/invitation-card" }
        ]
      }
    ]
  }
];

export default function Categorynav() {
  const scrollRef = useRef(null);
  const containerRef = useRef(null);
  const pathname = usePathname();
  
  const [activeMenuId, setActiveMenuId] = useState(null);
  const hoverTimerRef = useRef(null);

  const activeCategory = MEGA_MENU_CATEGORIES.find((c) => c.id === activeMenuId);

  // Close mega menu on page navigation or Escape key
  useEffect(() => {
    setActiveMenuId(null);
  }, [pathname]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        setActiveMenuId(null);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Smooth hover intent with 200ms buffer
  const handleMouseEnterItem = (id) => {
    if (hoverTimerRef.current) {
      clearTimeout(hoverTimerRef.current);
    }
    setActiveMenuId(id);
  };

  const handleMouseLeaveItem = () => {
    hoverTimerRef.current = setTimeout(() => {
      setActiveMenuId(null);
    }, 220);
  };

  const handleMouseEnterDropdown = () => {
    if (hoverTimerRef.current) {
      clearTimeout(hoverTimerRef.current);
    }
  };

  const scroll = (direction) => {
    if (scrollRef.current) {
      const offset = direction === "left" ? -300 : 300;
      scrollRef.current.scrollBy({ left: offset, behavior: "smooth" });
    }
  };

  return (
    <div
      ref={containerRef}
      onMouseLeave={handleMouseLeaveItem}
      className="relative w-full bg-white border-b border-gray-200 z-30 select-none shadow-2xs"
    >
      <div className="max-w-[1920px] mx-auto px-2 sm:px-4 flex items-center relative">
        
        {/* Left Scroll Button */}
        <button
          type="button"
          onClick={() => scroll("left")}
          className="p-1 rounded-full hover:bg-gray-100 text-gray-500 hover:text-gray-900 transition shadow-xs z-10 shrink-0 cursor-pointer hidden md:flex items-center justify-center"
          aria-label="Scroll left"
        >
          <ChevronLeft size={16} />
        </button>

        {/* Scrollable Horizontal Category Bar (Vistaprint Style) */}
        <div
          ref={scrollRef}
          className="flex items-center gap-1 sm:gap-2 overflow-x-auto py-0 px-1 no-scrollbar scroll-smooth w-full"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {/* 13 Mega-Menu Categories - Vistaprint Clean Underline Tabs */}
          {MEGA_MENU_CATEGORIES.map((cat) => {
            const isOpen = activeMenuId === cat.id;
            const isCurrentPage = pathname?.startsWith(cat.slug);

            return (
              <div
                key={cat.id}
                onMouseEnter={() => handleMouseEnterItem(cat.id)}
                className="relative shrink-0 flex items-center"
              >
                <button
                  type="button"
                  onClick={() => setActiveMenuId(isOpen ? null : cat.id)}
                  className={`relative py-3.5 px-2.5 sm:px-3 text-[13px] font-semibold whitespace-nowrap transition-colors cursor-pointer flex items-center gap-1 focus:outline-none ${
                    isOpen
                      ? "text-[#9c1dac] font-bold"
                      : isCurrentPage
                      ? "text-[#9c1dac] font-bold"
                      : "text-gray-700 hover:text-[#9c1dac]"
                  }`}
                >
                  <span>{cat.name}</span>
                  <ChevronDown
                    size={12}
                    className={`transition-transform duration-200 ${
                      isOpen ? "rotate-180 text-[#9c1dac]" : "text-gray-400 group-hover:text-gray-600"
                    }`}
                  />

                  {/* Vistaprint Active Underline Indicator */}
                  {(isOpen || isCurrentPage) && (
                    <span className="absolute bottom-0 left-2 right-2 h-[3px] bg-[#9c1dac] rounded-t-sm" />
                  )}
                </button>
              </div>
            );
          })}
        </div>

        {/* Right Scroll Button */}
        <button
          type="button"
          onClick={() => scroll("right")}
          className="p-1 rounded-full hover:bg-gray-100 text-gray-500 hover:text-gray-900 transition shadow-xs z-10 shrink-0 cursor-pointer hidden md:flex items-center justify-center"
          aria-label="Scroll right"
        >
          <ChevronRight size={16} />
        </button>
      </div>

      {/* VISTAPRINT-STYLE ANIMATED FULL-WIDTH MEGA MENU DROPDOWN */}
      {activeCategory && (
        <div
          onMouseEnter={handleMouseEnterDropdown}
          onMouseLeave={handleMouseLeaveItem}
          className="absolute top-full left-0 right-0 w-full bg-white border-b border-gray-200 shadow-2xl z-50 animate-in fade-in slide-in-from-top-1 duration-150"
          style={{ backgroundColor: "#ffffff" }}
        >
          <div className="max-w-[1920px] mx-auto px-6 lg:px-12 py-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              
              {/* Product Links Columns (lg:col-span-8 or 9 across 4 clean columns) */}
              <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
                {activeCategory.columns.map((col, colIdx) => (
                  <div key={colIdx} className="space-y-3">
                    <h4 className="text-xs sm:text-[13px] font-bold tracking-tight text-gray-900 border-b border-gray-100 pb-2">
                      {col.title}
                    </h4>

                    <ul className="space-y-1.5">
                      {col.links.map((link, linkIdx) => (
                        <li key={linkIdx}>
                          <Link
                            href={link.href}
                            onClick={() => setActiveMenuId(null)}
                            className={`group flex items-center justify-between text-[13px] py-1 transition-colors leading-snug ${
                              link.highlight
                                ? "text-[#9c1dac] font-bold bg-purple-50 px-2 py-1 rounded-md"
                                : "text-gray-600 hover:text-[#9c1dac] hover:underline font-normal"
                            }`}
                          >
                            <span className="truncate pr-1">{link.name}</span>

                            {link.badge && (
                              <span className="text-[10px] bg-purple-100 text-[#9c1dac] font-bold px-1.5 py-0.5 rounded-full shrink-0 group-hover:bg-[#9c1dac] group-hover:text-white transition-colors">
                                {link.badge}
                              </span>
                            )}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>

              {/* Right: Visual Spotlight Card (Vistaprint Style) */}
              {activeCategory.spotlight && (
                <div className="lg:col-span-4 bg-gray-50/80 border border-gray-200/90 rounded-2xl p-5 flex flex-col justify-between shadow-xs">
                  <div>
                    <div className="relative aspect-[16/10] w-full rounded-xl overflow-hidden bg-white border border-gray-200 shadow-2xs mb-4">
                      <Image
                        src={activeCategory.spotlight.image}
                        alt={activeCategory.spotlight.title}
                        fill
                        className="object-cover hover:scale-105 transition-transform duration-300"
                      />
                      <span className="absolute top-2.5 left-2.5 bg-black/75 backdrop-blur-md text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                        Featured Product
                      </span>
                    </div>

                    <span className="text-[10px] uppercase tracking-wider font-extrabold text-[#9c1dac] block mb-1">
                      {activeCategory.name} Spotlight
                    </span>
                    <h3 className="font-extrabold text-gray-900 text-sm sm:text-base leading-snug">
                      {activeCategory.spotlight.title}
                    </h3>
                    <p className="text-xs text-gray-500 mt-1 leading-relaxed">
                      {activeCategory.spotlight.description}
                    </p>

                    <div className="mt-3 py-1.5 px-2.5 rounded-lg bg-purple-50 text-purple-900 text-xs font-bold inline-block border border-purple-200/70">
                      ⚡ {activeCategory.spotlight.rate}
                    </div>
                  </div>

                  <div className="pt-4 border-t border-gray-200/70 mt-4 flex items-center justify-between">
                    <Link
                      href={activeCategory.spotlight.link}
                      onClick={() => setActiveMenuId(null)}
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-white bg-[#9c1dac] hover:bg-[#831492] px-4 py-2 rounded-xl shadow-xs transition"
                    >
                      <span>Configure Now</span>
                      <ArrowRight size={14} />
                    </Link>

                    <Link
                      href={activeCategory.slug}
                      onClick={() => setActiveMenuId(null)}
                      className="text-xs font-semibold text-gray-600 hover:text-[#9c1dac] transition"
                    >
                      View all in category &rarr;
                    </Link>
                  </div>
                </div>
              )}

            </div>
          </div>
        </div>
      )}
    </div>
  );
}