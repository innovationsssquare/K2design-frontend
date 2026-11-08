"use client";

import React, { useState, useEffect } from "react";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Badge } from "@nextui-org/react";
import { BsCart3 } from "react-icons/bs";
import { Trash2, ShoppingBag, ArrowRight, Store, ShieldCheck } from "lucide-react";
import Link from "next/link";

export function AddToCart() {
  const [cartItems, setCartItems] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

  // Sync cart from localStorage
  const loadCart = () => {
    if (typeof window !== "undefined") {
      try {
        const stored = localStorage.getItem("k2_active_cart");
        if (stored) {
          const parsed = JSON.parse(stored);
          setCartItems(Array.isArray(parsed) ? parsed : []);
        } else {
          setCartItems([]);
        }
      } catch (err) {
        setCartItems([]);
      }
    }
  };

  useEffect(() => {
    loadCart();
    const handleStorageChange = () => loadCart();
    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  const handleClearAll = () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("k2_active_cart");
      setCartItems([]);
      window.dispatchEvent(new Event("storage"));
    }
  };

  const handleRemoveItem = (id) => {
    if (typeof window !== "undefined") {
      const updated = cartItems.filter((item) => item.id !== id);
      localStorage.setItem("k2_active_cart", JSON.stringify(updated));
      setCartItems(updated);
      window.dispatchEvent(new Event("storage"));
    }
  };

  const subtotal = cartItems.reduce(
    (sum, item) => sum + (Number(item.totalPrice || item.total || item.subtotal) || 0),
    0
  );
  const gst = Number((subtotal * 0.18).toFixed(2));
  const finalTotal = Number((subtotal + gst).toFixed(2));

  return (
    <Sheet open={isOpen} onOpenChange={(open) => { setIsOpen(open); if (open) loadCart(); }}>
      <SheetTrigger asChild>
        <button
          type="button"
          aria-label="View shopping cart"
          className="flex items-center gap-1.5 p-2 rounded-xl text-gray-700 hover:text-purple-700 hover:bg-purple-50 transition cursor-pointer"
        >
          <div className="relative flex items-center">
            <BsCart3 size={20} />
            {cartItems.length > 0 && (
              <span className="absolute -top-1.5 -right-2 flex h-4 w-4 items-center justify-center rounded-full bg-[#9c1dac] text-[9px] font-bold text-white shadow-xs">
                {cartItems.length}
              </span>
            )}
          </div>
          <span className="font-semibold text-xs hidden sm:inline-block">Cart</span>
        </button>
      </SheetTrigger>

      <SheetContent
        side="right"
        className="w-full sm:max-w-md bg-white border-l border-gray-200 p-0 flex flex-col justify-between"
      >
        <div>
          {/* Header */}
          <SheetHeader className="p-5 border-b border-gray-100 bg-gray-50/70">
            <div className="flex justify-between items-center pr-8">
              <div className="flex items-center gap-2.5">
                <div className="p-2 bg-purple-100 text-purple-700 rounded-xl">
                  <ShoppingBag size={18} />
                </div>
                <div>
                  <SheetTitle className="text-base font-extrabold text-gray-900 flex items-center gap-2">
                    Print Order Cart
                    <span className="text-[10px] bg-purple-100 text-purple-700 font-bold px-2 py-0.5 rounded-full">
                      {cartItems.length} items
                    </span>
                  </SheetTitle>
                  <p className="text-[11px] text-gray-500 mt-0.5">
                    Pre-press proofs & 18% GST invoice included
                  </p>
                </div>
              </div>

              {cartItems.length > 0 && (
                <button
                  type="button"
                  onClick={handleClearAll}
                  className="text-gray-400 hover:text-red-600 flex items-center text-xs font-semibold transition cursor-pointer"
                >
                  <Trash2 size={13} className="mr-1" />
                  <span>Clear</span>
                </button>
              )}
            </div>
          </SheetHeader>

          {/* Cart Items List */}
          <div className="overflow-y-auto max-h-[calc(100vh-270px)] p-4 space-y-3">
            {cartItems.length === 0 ? (
              <div className="text-center py-16 space-y-3">
                <div className="w-16 h-16 rounded-full bg-gray-100 text-gray-400 mx-auto flex items-center justify-center">
                  <BsCart3 size={30} />
                </div>
                <h4 className="text-sm font-bold text-gray-800">Your cart is empty</h4>
                <p className="text-xs text-gray-400 max-w-xs mx-auto leading-relaxed">
                  Explore our commercial print catalogs or launch K2 Studio to create a custom order.
                </p>
                <div className="pt-2">
                  <SheetClose asChild>
                    <Link
                      href="/paper-printing"
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-white bg-[#9c1dac] hover:bg-[#831492] px-4 py-2 rounded-xl shadow-xs transition"
                    >
                      Browse Print Products &rarr;
                    </Link>
                  </SheetClose>
                </div>
              </div>
            ) : (
              cartItems.map((item) => (
                <div
                  key={item.id}
                  className="p-3.5 border border-gray-200 rounded-xl hover:border-purple-300 transition bg-white shadow-2xs relative group"
                >
                  <div className="flex justify-between items-start gap-2">
                    <div className="flex-1 min-w-0 pr-2">
                      <h4 className="font-bold text-gray-900 text-xs sm:text-sm truncate">
                        {item.name}
                      </h4>
                      <p className="text-xs text-purple-700 font-bold mt-0.5">
                        Qty: {item.quantity} units
                        {item.unitPrice ? ` • ₹${Number(item.unitPrice).toFixed(2)}/unit` : ""}
                      </p>

                      {/* Specs badges */}
                      {item.specs && (
                        <div className="flex flex-wrap gap-1 mt-1.5">
                          {Array.isArray(item.specs)
                            ? item.specs.slice(0, 3).map((s, idx) => (
                              <span
                                key={idx}
                                className="text-[10px] bg-gray-100 text-gray-600 px-1.5 py-0.5 rounded font-medium"
                              >
                                {s.label ? `${s.label}: ${s.value}` : String(s)}
                              </span>
                            ))
                            : Object.entries(item.specs)
                              .slice(0, 3)
                              .map(([k, v], idx) => (
                                <span
                                  key={idx}
                                  className="text-[10px] bg-gray-100 text-gray-600 px-1.5 py-0.5 rounded font-medium"
                                >
                                  {k}: {String(v)}
                                </span>
                              ))}
                        </div>
                      )}

                      {item.artworkFile && (
                        <p className="text-[10px] text-emerald-700 font-semibold mt-1 truncate max-w-[240px]">
                          📎 {item.artworkFile}
                        </p>
                      )}
                    </div>

                    <div className="text-right shrink-0">
                      <p className="font-extrabold text-gray-900 text-sm">
                        ₹{Number(item.totalPrice || item.total || item.subtotal || 0).toFixed(2)}
                      </p>
                      <button
                        type="button"
                        onClick={() => handleRemoveItem(item.id)}
                        className="text-gray-400 hover:text-red-600 p-1 mt-1.5 transition cursor-pointer"
                        title="Remove item"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Footer & Checkout Action */}
        {cartItems.length > 0 && (
          <div className="border-t border-gray-100 p-4 space-y-3 bg-gray-50/80">
            <div className="space-y-1.5 text-xs text-gray-600">
              <div className="flex justify-between">
                <span>Items Subtotal:</span>
                <span className="font-semibold text-gray-800">₹{subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>GST (18% Input Credit):</span>
                <span className="font-semibold text-gray-800">₹{gst.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-base font-extrabold text-gray-900 pt-1.5 border-t border-gray-200">
                <span>Total Amount:</span>
                <span className="text-purple-700">₹{finalTotal.toFixed(2)}</span>
              </div>
            </div>

            <SheetClose asChild>
              <Link
                href="/ProceedToCheckout"
                className="w-full flex items-center justify-center gap-2 font-bold text-white bg-[#9c1dac] hover:bg-[#831492] py-3 rounded-xl shadow-md hover:shadow-lg transition-all"
              >
                <span>Proceed to Checkout</span>
                <ArrowRight size={17} />
              </Link>
            </SheetClose>

            <div className="flex items-center justify-center gap-1.5 text-[11px] text-gray-500 pt-0.5">
              <Store size={13} className="text-purple-600" />
              <span>Free Counter Pickup at 6 Pune & Mumbai Branches</span>
            </div>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}
