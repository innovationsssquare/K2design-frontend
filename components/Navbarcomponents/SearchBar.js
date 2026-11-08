"use client";

import React, { useState, useEffect, useRef, useMemo } from "react";
import { useRouter, usePathname } from "next/navigation";
import { SEARCH_INDEX } from "./searchIndex";
import {
  Search,
  X,
  Sparkles,
  ArrowRight,
  TrendingUp,
  Tag,
  CreditCard,
  Stamp,
  Flag,
  Layers,
  Palette,
  Store,
  Clock,
  Printer,
  ChevronRight
} from "lucide-react";

export default function SearchBar() {
  const router = useRouter();
  const pathname = usePathname();

  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [recentSearches, setRecentSearches] = useState([
    "Visiting Cards",
    "Apparel Hang Tags",
    "Flex Banners",
    "Acrylic 3D Letters"
  ]);

  const inputRef = useRef(null);
  const containerRef = useRef(null);

  // Close on route navigation
  useEffect(() => {
    setIsOpen(false);
    setQuery("");
  }, [pathname]);

  // Global Keyboard Shortcut: Ctrl + K / Cmd + K / '/' to focus
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        inputRef.current?.focus();
        setIsOpen(true);
      } else if (e.key === "/" && document.activeElement !== inputRef.current && !["INPUT", "TEXTAREA"].includes(document.activeElement?.tagName)) {
        e.preventDefault();
        inputRef.current?.focus();
        setIsOpen(true);
      } else if (e.key === "Escape" && isOpen) {
        setIsOpen(false);
        inputRef.current?.blur();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  // Click outside listener
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Filter search results with intelligent multi-field matching
  const searchResults = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [];

    return SEARCH_INDEX.filter((item) => {
      const matchTitle = item.title.toLowerCase().includes(q);
      const matchCategory = item.category.toLowerCase().includes(q);
      const matchKeywords = item.keywords.some((k) => k.toLowerCase().includes(q));
      return matchTitle || matchCategory || matchKeywords;
    }).slice(0, 8);
  }, [query]);

  // Popular items when query is empty
  const popularItems = useMemo(() => {
    return SEARCH_INDEX.filter((item) => item.popular).slice(0, 6);
  }, []);

  // Keyboard navigation up / down / enter
  const handleKeyDownInput = (e) => {
    const activeList = query.trim() ? searchResults : popularItems;
    if (activeList.length === 0) return;

    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev + 1) % activeList.length);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev - 1 + activeList.length) % activeList.length);
    } else if (e.key === "Enter") {
      e.preventDefault();
      const target = activeList[selectedIndex] || activeList[0];
      if (target) {
        handleSelect(target);
      }
    }
  };

  const handleSelect = (item) => {
    setIsOpen(false);
    setQuery("");
    if (item.title) {
      setRecentSearches((prev) => {
        const filtered = prev.filter((s) => s.toLowerCase() !== item.title.toLowerCase());
        return [item.title, ...filtered].slice(0, 5);
      });
    }
    router.push(item.route);
  };

  const getItemIcon = (item) => {
    if (item.id === "tool-studio") return <Palette className="text-purple-600" size={17} />;
    if (item.id === "tool-branches") return <Store className="text-amber-600" size={17} />;
    if (item.category.includes("Paper")) return <CreditCard className="text-blue-600" size={17} />;
    if (item.category.includes("Flex")) return <Flag className="text-orange-600" size={17} />;
    if (item.category.includes("Light") || item.category.includes("3D")) return <Sparkles className="text-purple-600" size={17} />;
    return <Printer className="text-gray-600" size={17} />;
  };

  return (
    <div ref={containerRef} className="relative w-full">
      {/* Input Box */}
      <div className="relative flex items-center w-full">
        <div className="absolute left-4 text-gray-400 pointer-events-none flex items-center justify-center">
          <Search size={18} />
        </div>

        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setSelectedIndex(0);
            if (!isOpen) setIsOpen(true);
          }}
          onFocus={() => setIsOpen(true)}
          onKeyDown={handleKeyDownInput}
          placeholder="Search products, signs, tags, flex banners..."
          className="w-full h-11 pl-11 pr-24 text-xs sm:text-sm bg-gray-50/80 hover:bg-gray-100/80 focus:bg-white text-gray-900 rounded-full border border-gray-200 focus:border-purple-600 focus:ring-4 focus:ring-purple-600/10 outline-none transition-all duration-200 placeholder:text-gray-400 font-medium"
        />

        <div className="absolute right-3 flex items-center gap-1.5">
          {query ? (
            <button
              type="button"
              onClick={() => {
                setQuery("");
                inputRef.current?.focus();
              }}
              className="p-1 text-gray-400 hover:text-gray-600 rounded-full transition"
            >
              <X size={15} />
            </button>
          ) : (
            <kbd className="hidden sm:inline-flex items-center gap-0.5 px-2 py-0.5 text-[10px] font-mono font-bold text-gray-400 bg-white border border-gray-200 rounded-md shadow-2xs pointer-events-none">
              Ctrl K
            </kbd>
          )}
        </div>
      </div>

      {/* Modern Autocomplete Dropdown Popover */}
      {isOpen && (
        <div
          className="absolute left-0 right-0 top-13 bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden z-50 animate-in fade-in zoom-in-95 duration-150"
          style={{ backgroundColor: "#ffffff" }}
        >
          
          {/* STATE 1: Query Typed with Results */}
          {query.trim() && searchResults.length > 0 && (
            <div className="p-2 divide-y divide-gray-50">
              <div className="px-3 py-2 text-[10px] font-bold uppercase tracking-wider text-gray-400 flex justify-between items-center">
                <span>Matching Products & Services</span>
                <span>{searchResults.length} results</span>
              </div>

              <div className="space-y-1 pt-1 max-h-80 overflow-y-auto">
                {searchResults.map((item, idx) => {
                  const isHighlighted = idx === selectedIndex;
                  return (
                    <div
                      key={item.id}
                      onClick={() => handleSelect(item)}
                      onMouseEnter={() => setSelectedIndex(idx)}
                      className={`p-2.5 rounded-xl cursor-pointer transition flex items-center justify-between ${
                        isHighlighted
                          ? "bg-purple-50/90 text-purple-950 font-semibold"
                          : "hover:bg-gray-50 text-gray-800"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`p-2 rounded-lg ${isHighlighted ? "bg-white shadow-xs" : "bg-gray-100"}`}>
                          {getItemIcon(item)}
                        </div>
                        <div>
                          <div className="text-xs sm:text-sm font-bold flex items-center gap-2">
                            <span>{item.title}</span>
                            <span className="text-[10px] font-medium bg-gray-100 text-gray-600 px-1.5 py-0.2 rounded">
                              {item.category}
                            </span>
                          </div>
                          <span className="text-[11px] text-gray-500 font-mono">
                            {item.priceHint}
                          </span>
                        </div>
                      </div>

                      <ChevronRight
                        size={16}
                        className={`transition-transform ${isHighlighted ? "text-purple-600 translate-x-1" : "text-gray-300"}`}
                      />
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* STATE 2: Query Typed with NO Results */}
          {query.trim() && searchResults.length === 0 && (
            <div className="p-8 text-center space-y-2">
              <p className="text-sm font-semibold text-gray-700">No print products found for &ldquo;{query}&rdquo;</p>
              <p className="text-xs text-gray-400 max-w-xs mx-auto">
                Try searching for visiting cards, banners, 3D letters, apparel tags, or K2 Studio.
              </p>
              <button
                type="button"
                onClick={() => handleSelect(SEARCH_INDEX[0])}
                className="mt-2 text-xs font-bold text-purple-700 hover:underline inline-flex items-center gap-1"
              >
                Open K2 Canvas Design Studio <ArrowRight size={12} />
              </button>
            </div>
          )}

          {/* STATE 3: Empty Query - Fast Quick Jump & Trending */}
          {!query.trim() && (
            <div className="p-4 space-y-4">
              {/* Recent Searches */}
              {recentSearches.length > 0 && (
                <div>
                  <div className="flex items-center justify-between text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-2">
                    <span className="flex items-center gap-1.5">
                      <Clock size={12} /> Recent Searches
                    </span>
                    <button
                      type="button"
                      onClick={() => setRecentSearches([])}
                      className="text-[10px] hover:text-gray-600 lowercase font-medium cursor-pointer"
                    >
                      clear
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {recentSearches.map((tag, i) => (
                      <button
                        key={i}
                        type="button"
                        onClick={() => {
                          setQuery(tag);
                          inputRef.current?.focus();
                        }}
                        className="text-xs px-2.5 py-1 bg-gray-100 hover:bg-purple-50 hover:text-purple-700 rounded-lg text-gray-700 font-medium transition"
                      >
                        {tag}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Quick Jump Popular Products */}
              <div>
                <div className="text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                  <TrendingUp size={12} className="text-purple-600" />
                  Popular Quick Access
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {popularItems.map((item, idx) => (
                    <div
                      key={item.id}
                      onClick={() => handleSelect(item)}
                      className="p-2.5 rounded-xl border border-gray-100 hover:border-purple-200 hover:bg-purple-50/50 cursor-pointer transition flex items-center justify-between group"
                    >
                      <div className="flex items-center gap-2.5">
                        <div className="p-1.5 bg-gray-100 group-hover:bg-white rounded-lg transition shadow-2xs">
                          {getItemIcon(item)}
                        </div>
                        <div>
                          <p className="text-xs font-bold text-gray-900 group-hover:text-purple-900 transition leading-tight">
                            {item.title}
                          </p>
                          <p className="text-[10px] text-gray-400 font-mono mt-0.5">
                            {item.priceHint}
                          </p>
                        </div>
                      </div>
                      <ChevronRight size={14} className="text-gray-300 group-hover:text-purple-600 group-hover:translate-x-0.5 transition" />
                    </div>
                  ))}
                </div>
              </div>

              {/* Footer Shortcut Helper */}
              <div className="pt-2 border-t border-gray-100 flex items-center justify-between text-[11px] text-gray-400">
                <span>Navigate with <kbd className="px-1.5 py-0.5 bg-gray-100 rounded text-[10px]">↑</kbd> <kbd className="px-1.5 py-0.5 bg-gray-100 rounded text-[10px]">↓</kbd></span>
                <span>Select with <kbd className="px-1.5 py-0.5 bg-gray-100 rounded text-[10px]">Enter</kbd></span>
                <span>Close with <kbd className="px-1.5 py-0.5 bg-gray-100 rounded text-[10px]">Esc</kbd></span>
              </div>
            </div>
          )}

        </div>
      )}
    </div>
  );
}
