"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import Cookies from "js-cookie";
import {
  User,
  LogIn,
  LogOut,
  Palette,
  ShoppingBag,
  Store,
  ChevronDown,
  ShieldCheck,
  FileText,
  Sparkles,
  Phone,
  Clock
} from "lucide-react";

import Logo from "../../public/Logo.png";
import SearchBar from "./SearchBar";
import { NotificationCart } from "../NotificationCart/NotificationCart";
import { AddToCart } from "../AddToCart/AddToCart";
import { AuthModal } from "../Auth/AuthModal";

export default function Nav() {
  const [isMounted, setIsMounted] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [user, setUser] = useState(null);
  const profileMenuRef = useRef(null);

  // Sync authentication state from Cookies & localStorage
  const syncUserAuth = () => {
    if (typeof window !== "undefined") {
      const token = Cookies.get("token");
      if (token) {
        try {
          const storedUser = localStorage.getItem("k2_user");
          if (storedUser) {
            setUser(JSON.parse(storedUser));
          } else {
            setUser({
              name: "K2 Customer",
              email: "customer@k2sign.com",
              isVerified: true
            });
          }
        } catch (e) {
          setUser({ name: "K2 Customer", email: "customer@k2sign.com" });
        }
      } else {
        setUser(null);
      }
    }
  };

  useEffect(() => {
    setIsMounted(true);
    syncUserAuth();

    const handleClickOutside = (e) => {
      if (profileMenuRef.current && !profileMenuRef.current.contains(e.target)) {
        setIsProfileOpen(false);
      }
    };

    const handleOpenAuth = () => setIsAuthModalOpen(true);

    window.addEventListener("mousedown", handleClickOutside);
    window.addEventListener("storage", syncUserAuth);
    window.addEventListener("k2:open-auth-modal", handleOpenAuth);

    return () => {
      window.removeEventListener("mousedown", handleClickOutside);
      window.removeEventListener("storage", syncUserAuth);
      window.removeEventListener("k2:open-auth-modal", handleOpenAuth);
    };
  }, []);

  const handleLogout = () => {
    Cookies.remove("token");
    if (typeof window !== "undefined") {
      localStorage.removeItem("k2_user");
      window.dispatchEvent(new Event("storage"));
    }
    setUser(null);
    setIsProfileOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-white/95 backdrop-blur-md border-b border-gray-100 shadow-xs">
      
      {/* 1. TOP ANNOUNCEMENT RIBBON */}
      <div className="bg-[#0f172a] text-white py-1.5 px-4 text-[11px] sm:text-xs font-medium">
        <div className="max-w-[1920px] mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Link
              href="/#branch-locator"
              className="flex items-center gap-1.5 font-bold text-amber-300 hover:text-amber-200 transition"
            >
              <Store size={13} />
              <span>6 Branch Stores Across Maharashtra</span>
            </Link>
            <span className="hidden sm:inline text-gray-500">•</span>
            <span className="hidden sm:inline text-gray-300">
              Free In-Store Pickup & Texture Sample Books (Pune & Mumbai)
            </span>
          </div>

          <div className="flex items-center gap-4 text-gray-300">
            <span className="hidden md:inline-flex items-center gap-1 text-emerald-300 font-semibold">
              <Clock size={12} /> 24-48 Hr Production Dispatch
            </span>
            <span className="hidden md:inline text-gray-600">|</span>
            <a
              href="tel:+918999291978"
              className="flex items-center gap-1 hover:text-white transition font-bold"
            >
              <Phone size={12} className="text-purple-400" />
              <span>+91 8999291978</span>
            </a>
          </div>
        </div>
      </div>

      {/* 2. MAIN NAVIGATION BAR */}
      <div className="max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between gap-4">
        
        {/* Left: Brand Logo */}
        <div className="flex items-center gap-3 shrink-0">
          <Link href="/" className="flex items-center gap-2 focus:outline-none">
            <div className="relative h-12 w-28 sm:h-14 sm:w-32">
              <Image
                src={Logo}
                alt="K2 Sign & Print"
                fill
                priority
                className="object-contain object-left"
              />
            </div>
          </Link>
        </div>

        {/* Center: Intelligent Search Engine */}
        <div className="flex-1 max-w-2xl mx-auto hidden md:block">
          <SearchBar />
        </div>

        {/* Right: Actions (Studio CTA, Notifications, Cart, Profile) */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          
          {/* Quick Access to K2 Studio */}
          <Link
            href="/studio"
            className="hidden lg:flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-gradient-to-r from-purple-700 to-indigo-600 hover:from-purple-800 hover:to-indigo-700 text-white font-bold text-xs shadow-sm hover:shadow transition"
          >
            <Palette size={14} />
            <span>K2 Studio</span>
          </Link>

          {/* Functional Notification Dropdown */}
          <div className="relative flex items-center">
            <NotificationCart />
          </div>

          {/* Cart Slide-Over Drawer */}
          <div className="relative flex items-center">
            <AddToCart />
          </div>

          <div className="h-6 w-px bg-gray-200 hidden sm:block mx-1" />

          {/* My Account & Profile Dropdown */}
          <div ref={profileMenuRef} className="relative">
            {isMounted ? (
              user ? (
                /* Authenticated User Menu */
                <>
                  <button
                    type="button"
                    onClick={() => setIsProfileOpen((prev) => !prev)}
                    className="flex items-center gap-2 p-1 rounded-full hover:bg-gray-100 transition cursor-pointer focus:outline-none"
                    aria-label="User Account Menu"
                  >
                    <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-purple-700 to-indigo-600 text-white font-bold text-xs flex items-center justify-center shadow-xs">
                      {user.name ? user.name.charAt(0).toUpperCase() : "U"}
                    </div>
                    <ChevronDown size={14} className="text-gray-500 hidden sm:block" />
                  </button>

                  {isProfileOpen && (
                    <div
                      className="absolute right-0 top-11 w-64 bg-white rounded-2xl shadow-2xl border border-gray-100 py-2 z-50 animate-in fade-in zoom-in-95 duration-150"
                      style={{ backgroundColor: "#ffffff" }}
                    >
                      
                      {/* User Header */}
                      <div className="px-4 py-3 border-b border-gray-100 bg-gray-50/80">
                        <div className="flex items-center gap-2">
                          <span className="font-extrabold text-sm text-gray-900 truncate">
                            {user.name || "K2 Customer"}
                          </span>
                          <span className="text-[10px] font-bold bg-purple-100 text-purple-700 px-1.5 py-0.2 rounded-full">
                            Member
                          </span>
                        </div>
                        <p className="text-[11px] text-gray-500 truncate mt-0.5">
                          {user.email || "customer@k2sign.com"}
                        </p>
                      </div>

                      {/* Menu Links */}
                      <div className="py-1 text-xs font-semibold text-gray-700">
                        <Link
                          href="/ProceedToCheckout"
                          onClick={() => setIsProfileOpen(false)}
                          className="flex items-center gap-2.5 px-4 py-2 hover:bg-purple-50 hover:text-purple-700 transition"
                        >
                          <ShoppingBag size={15} className="text-purple-600" />
                          <span>My Active Cart & Checkout</span>
                        </Link>

                        <Link
                          href="/studio"
                          onClick={() => setIsProfileOpen(false)}
                          className="flex items-center gap-2.5 px-4 py-2 hover:bg-purple-50 hover:text-purple-700 transition"
                        >
                          <Palette size={15} className="text-purple-600" />
                          <span>K2 Studio Design Drafts</span>
                        </Link>

                        <Link
                          href="/#branch-locator"
                          onClick={() => setIsProfileOpen(false)}
                          className="flex items-center gap-2.5 px-4 py-2 hover:bg-purple-50 hover:text-purple-700 transition"
                        >
                          <Store size={15} className="text-purple-600" />
                          <span>Saved Pickup Branch (Swargate)</span>
                        </Link>

                        <Link
                          href="/paper-printing"
                          onClick={() => setIsProfileOpen(false)}
                          className="flex items-center gap-2.5 px-4 py-2 hover:bg-purple-50 hover:text-purple-700 transition"
                        >
                          <FileText size={15} className="text-purple-600" />
                          <span>Explore All 16 Print Products</span>
                        </Link>
                      </div>

                      {/* Logout Action */}
                      <div className="border-t border-gray-100 pt-1 mt-1">
                        <button
                          type="button"
                          onClick={handleLogout}
                          className="w-full flex items-center gap-2 px-4 py-2 text-xs font-bold text-red-600 hover:bg-red-50 transition cursor-pointer"
                        >
                          <LogOut size={14} />
                          <span>Sign Out</span>
                        </button>
                      </div>

                    </div>
                  )}
                </>
              ) : (
                /* Unauthenticated Sign In CTA opens Center Auth Modal */
                <button
                  type="button"
                  onClick={() => setIsAuthModalOpen(true)}
                  className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl border border-gray-200 hover:border-purple-600 hover:bg-purple-50 text-gray-700 hover:text-purple-700 font-bold text-xs transition shadow-2xs cursor-pointer"
                >
                  <User size={15} className="text-purple-700" />
                  <span>Sign In</span>
                </button>
              )
            ) : (
              <div className="w-8 h-8 rounded-full bg-gray-100 animate-pulse" />
            )}
          </div>

        </div>
      </div>

      {/* Mobile Search Bar (Visible on mobile/tablet screens) */}
      <div className="px-4 pb-3 md:hidden">
        <SearchBar />
      </div>

      {/* Center Auth Modal (WhatsApp OTP & Gmail Login) */}
      <AuthModal
        isOpen={isAuthModalOpen}
        setIsOpen={setIsAuthModalOpen}
        onLoginSuccess={(userData) => {
          setUser(userData);
        }}
      />
    </header>
  );
}
