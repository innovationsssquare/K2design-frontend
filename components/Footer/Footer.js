"use client";
import React from "react";
import Link from "next/link";
import { Phone, Mail, MapPin, ShieldCheck, Clock, Store } from "lucide-react";

export default function Footer() {
  return (
    <footer
      className="bg-[#0b0f19] text-gray-300 pt-14 pb-8 border-t border-gray-800"
      style={{ backgroundColor: "#0b0f19", color: "#d1d5db" }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 pb-10 border-b border-gray-800/80 text-xs sm:text-sm">
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2">
              <span className="text-xl sm:text-2xl font-black text-white tracking-wider">
                K2 <span className="text-[#a855f7]">SIGN & PRINT</span>
              </span>
              <span className="text-[10px] bg-purple-900/60 text-purple-300 border border-purple-600/50 px-2 py-0.5 rounded-full font-bold">
                Web-to-Print
              </span>
            </div>

            <p className="text-gray-300 leading-relaxed text-xs sm:text-sm max-w-sm">
              Maharashtra’s premier Web-to-Print manufacturing platform with 6 physical retail branch stores and a centralized industrial offset & digital production press.
            </p>

            <div className="space-y-2 pt-2 text-xs text-gray-200">
              <div className="flex items-center gap-2.5">
                <Phone size={15} className="text-[#c084fc] flex-shrink-0" />
                <span className="font-medium">+91 8999291978 / +91 8999291979</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail size={15} className="text-[#c084fc] flex-shrink-0" />
                <span className="font-medium">orders@k2signprint.com</span>
              </div>
              <div className="flex items-start gap-2.5">
                <MapPin size={15} className="text-[#c084fc] flex-shrink-0 mt-0.5" />
                <span className="font-medium">Central Hub: Shankarsheth Road, Swargate, Pune 411037</span>
              </div>
            </div>
          </div>

          {/* Quick Categories */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4 border-b border-gray-800 pb-2">
              Print Products
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <Link href="/paper-printing/VisitingCards" className="text-gray-300 hover:text-white hover:translate-x-0.5 transition inline-block">
                  Visiting & Business Cards
                </Link>
              </li>
              <li>
                <Link href="/paper-printing/Brochure" className="text-gray-300 hover:text-white hover:translate-x-0.5 transition inline-block">
                  Brochures & Pamphlets
                </Link>
              </li>
              <li>
                <Link href="/paper-printing/bill-books" className="text-gray-300 hover:text-white hover:translate-x-0.5 transition inline-block">
                  Carbonless Bill Books
                </Link>
              </li>
              <li>
                <Link href="/paper-printing/stickers" className="text-gray-300 hover:text-white hover:translate-x-0.5 transition inline-block">
                  Die-Cut Stickers & Labels
                </Link>
              </li>
              <li>
                <Link href="/paper-printing/paper-bags" className="text-gray-300 hover:text-white hover:translate-x-0.5 transition inline-block">
                  Printed Paper Bags
                </Link>
              </li>
              <li>
                <Link href="/paper-printing/Tags" className="text-gray-300 hover:text-white hover:translate-x-0.5 transition inline-block">
                  Garment & Product Tags
                </Link>
              </li>
              <li>
                <Link href="/paper-printing/stamps" className="text-gray-300 hover:text-white hover:translate-x-0.5 transition inline-block">
                  Self-Inking Stamps
                </Link>
              </li>
            </ul>
          </div>

          {/* Signage & Outdoor */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4 border-b border-gray-800 pb-2">
              Signage & Display
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <Link href="/categories/light-board-led-board" className="text-gray-300 hover:text-white hover:translate-x-0.5 transition inline-block">
                  Backlit LED Lightboards
                </Link>
              </li>
              <li>
                <Link href="/categories/3d-letters" className="text-gray-300 hover:text-white hover:translate-x-0.5 transition inline-block">
                  3D Acrylic & LED Letters
                </Link>
              </li>
              <li>
                <Link href="/categories/flex-banner" className="text-gray-300 hover:text-white hover:translate-x-0.5 transition inline-block">
                  Flex Banner & MS Frames
                </Link>
              </li>
              <li>
                <Link href="/categories/vinyl-letters" className="text-gray-300 hover:text-white hover:translate-x-0.5 transition inline-block">
                  Vinyl Cut Letters & Decals
                </Link>
              </li>
              <li>
                <Link href="/categories/light-board-led-board" className="text-gray-300 hover:text-white hover:translate-x-0.5 transition inline-block">
                  ACP Stencil Signage
                </Link>
              </li>
              <li>
                <Link href="/categories/flex-banner" className="text-gray-300 hover:text-white hover:translate-x-0.5 transition inline-block">
                  Rollup Banners & Standees
                </Link>
              </li>
            </ul>
          </div>

          {/* 6 Branch Network & Support */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4 border-b border-gray-800 pb-2">
              Store Pickup & Help
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <a href="#branch-locator" className="text-purple-300 hover:text-white font-medium flex items-center gap-1.5 transition">
                  <Store size={14} className="text-[#c084fc]" />
                  Find Nearest of 6 Branches
                </a>
              </li>
              <li>
                <Link href="/ProceedToCheckout" className="text-gray-300 hover:text-white hover:translate-x-0.5 transition inline-block">
                  Active Cart & Checkout
                </Link>
              </li>
              <li>
                <Link href="/studio" className="text-gray-300 hover:text-white hover:translate-x-0.5 transition inline-block">
                  K2 Design Studio
                </Link>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => {
                    if (typeof window !== "undefined") {
                      window.dispatchEvent(new CustomEvent("k2:open-auth-modal"));
                    }
                  }}
                  className="text-gray-300 hover:text-white hover:translate-x-0.5 transition inline-block text-left cursor-pointer"
                >
                  Customer Account Login
                </button>
              </li>
              <li className="pt-1 text-gray-400">
                <span className="block font-medium text-gray-300">GST Input Invoicing</span>
                <span>Tax invoices generated instantly</span>
              </li>
              <li className="text-gray-400">
                <span className="block font-medium text-gray-300">Store Hours:</span>
                <span>Mon-Sat 9:30am - 8:30pm</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar: Trust Badges & Copyright */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-gray-400 gap-3">
          <p>
            &copy; {new Date().getFullYear()} K2 Sign & Print Media Pvt. Ltd. All rights reserved. GST compliant Web-to-Print platform.
          </p>

          <div className="flex items-center gap-3 text-gray-300 text-[11px] font-medium">
            <span className="text-purple-400 font-bold">⚡ Free Store Pickup</span>
            <span>•</span>
            <span>UPI / NetBanking / Cards</span>
            <span>•</span>
            <span className="text-emerald-400 font-bold">✓ 300 DPI Press Quality</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
