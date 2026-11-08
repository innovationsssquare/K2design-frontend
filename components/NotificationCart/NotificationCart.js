"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  Bell,
  CheckCircle2,
  Sparkles,
  Store,
  Tag,
  Clock,
  Check,
  ExternalLink,
  Trash2,
  Phone,
  Layers,
  ChevronRight
} from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";

const INITIAL_NOTIFICATIONS = [
  {
    id: "notif-1",
    title: "K2 Canvas Design Studio 2.0 Live",
    message: "Create business cards, swing tags, and flex banners directly in the browser with CMYK 300 DPI pre-press export.",
    timestamp: "10m ago",
    type: "feature",
    route: "/studio",
    unread: true,
  },
  {
    id: "notif-2",
    title: "6 Physical Retail Branch Stores Open",
    message: "Free counter pickup & texture sample inspection available at Swargate, Kothrud, Hadapsar, Hinjewadi, Pimpri & Vashi.",
    timestamp: "1h ago",
    type: "pickup",
    route: "/#branch-locator",
    unread: true,
  },
  {
    id: "notif-3",
    title: "New Product: Apparel & Garment Swing Tags",
    message: "Heavy 350 GSM die-cut tags with reinforced 4mm brass eyelets and hanging cotton thread now available from ₹0.60/tag.",
    timestamp: "3h ago",
    type: "product",
    route: "/paper-printing/Tags",
    unread: true,
  },
  {
    id: "notif-4",
    title: "Special Launch Coupon: K2PRINT15",
    message: "Get flat 15% off on your first order of Precision 3D Acrylic Letters or Illuminated LED Signboards.",
    timestamp: "1d ago",
    type: "promo",
    route: "/categories/3d-letters",
    unread: false,
  },
];

export function NotificationCart() {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("all"); // 'all' | 'unread'
  const [notifications, setNotifications] = useState(INITIAL_NOTIFICATIONS);

  // Load read state from localStorage
  useEffect(() => {
    if (typeof window !== "undefined") {
      try {
        const stored = localStorage.getItem("k2_read_notifs");
        if (stored) {
          const readIds = JSON.parse(stored);
          setNotifications((prev) =>
            prev.map((n) => (readIds.includes(n.id) ? { ...n, unread: false } : n))
          );
        }
      } catch (e) {
        console.error("Notif load error:", e);
      }
    }
  }, []);

  const unreadCount = notifications.filter((n) => n.unread).length;

  const markAllAsRead = () => {
    const updated = notifications.map((n) => ({ ...n, unread: false }));
    setNotifications(updated);
    if (typeof window !== "undefined") {
      localStorage.setItem("k2_read_notifs", JSON.stringify(updated.map((n) => n.id)));
    }
  };

  const handleNotificationClick = (item) => {
    // Mark as read
    const updated = notifications.map((n) => (n.id === item.id ? { ...n, unread: false } : n));
    setNotifications(updated);
    if (typeof window !== "undefined") {
      const readIds = updated.filter((n) => !n.unread).map((n) => n.id);
      localStorage.setItem("k2_read_notifs", JSON.stringify(readIds));
    }
    setIsOpen(false);
    if (item.route) {
      router.push(item.route);
    }
  };

  const handleClearAll = () => {
    setNotifications([]);
    if (typeof window !== "undefined") {
      localStorage.removeItem("k2_read_notifs");
    }
  };

  const filteredNotifications = notifications.filter((n) => {
    if (activeTab === "unread") return n.unread;
    return true;
  });

  const getNotifIcon = (type) => {
    switch (type) {
      case "feature":
        return (
          <div className="w-9 h-9 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center shrink-0">
            <Sparkles size={17} />
          </div>
        );
      case "pickup":
        return (
          <div className="w-9 h-9 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center shrink-0">
            <Store size={17} />
          </div>
        );
      case "product":
        return (
          <div className="w-9 h-9 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center shrink-0">
            <Tag size={17} />
          </div>
        );
      case "promo":
      default:
        return (
          <div className="w-9 h-9 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
            <CheckCircle2 size={17} />
          </div>
        );
    }
  };

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      {/* Bell Trigger Button */}
      <SheetTrigger asChild>
        <button
          type="button"
          aria-label="View notifications"
          className="relative p-2.5 rounded-full text-gray-700 hover:text-purple-700 hover:bg-purple-50 transition duration-150 cursor-pointer"
        >
          <Bell size={21} />
          {unreadCount > 0 && (
            <span className="absolute top-1 right-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-600 text-[9px] font-bold text-white shadow-sm ring-2 ring-white animate-pulse">
              {unreadCount}
            </span>
          )}
        </button>
      </SheetTrigger>

      {/* Slide-over Sheet from the Right */}
      <SheetContent
        side="right"
        className="w-full sm:max-w-md bg-white border-l border-gray-200 p-0 flex flex-col justify-between"
      >
        <div>
          {/* Header */}
          <SheetHeader className="p-5 border-b border-gray-100 bg-gray-50/70">
            <div className="flex items-center justify-between pr-8">
              <div className="flex items-center gap-2.5">
                <div className="p-2 bg-purple-100 text-purple-700 rounded-xl">
                  <Bell size={18} />
                </div>
                <div>
                  <SheetTitle className="text-base font-extrabold text-gray-900 flex items-center gap-2">
                    Notifications
                    {unreadCount > 0 && (
                      <span className="bg-purple-100 text-purple-700 text-[10px] font-bold px-2 py-0.5 rounded-full">
                        {unreadCount} new
                      </span>
                    )}
                  </SheetTitle>
                  <p className="text-[11px] text-gray-500 mt-0.5">
                    Live updates, product releases & store notices
                  </p>
                </div>
              </div>

              {unreadCount > 0 && (
                <button
                  type="button"
                  onClick={markAllAsRead}
                  className="text-xs font-semibold text-purple-700 hover:text-purple-900 flex items-center gap-1 transition cursor-pointer"
                >
                  <Check size={14} />
                  <span>Mark all read</span>
                </button>
              )}
            </div>

            {/* Filter Tabs */}
            <div className="flex gap-2 pt-3">
              <button
                type="button"
                onClick={() => setActiveTab("all")}
                className={`text-xs px-3 py-1.5 rounded-lg font-bold transition cursor-pointer ${
                  activeTab === "all"
                    ? "bg-purple-700 text-white shadow-xs"
                    : "bg-white border border-gray-200 text-gray-600 hover:bg-gray-100"
                }`}
              >
                All ({notifications.length})
              </button>
              <button
                type="button"
                onClick={() => setActiveTab("unread")}
                className={`text-xs px-3 py-1.5 rounded-lg font-bold transition cursor-pointer ${
                  activeTab === "unread"
                    ? "bg-purple-700 text-white shadow-xs"
                    : "bg-white border border-gray-200 text-gray-600 hover:bg-gray-100"
                }`}
              >
                Unread ({unreadCount})
              </button>
            </div>
          </SheetHeader>

          {/* Notifications List */}
          <div className="overflow-y-auto max-h-[calc(100vh-210px)] p-4 space-y-3">
            {filteredNotifications.length === 0 ? (
              <div className="text-center py-16 space-y-2.5">
                <div className="w-12 h-12 rounded-full bg-purple-50 text-purple-600 mx-auto flex items-center justify-center">
                  <CheckCircle2 size={24} />
                </div>
                <h4 className="font-bold text-gray-800 text-sm">You are all caught up!</h4>
                <p className="text-xs text-gray-400 max-w-xs mx-auto">
                  {activeTab === "unread"
                    ? "No unread alerts at the moment. Switch to 'All' to review earlier announcements."
                    : "No notifications to show."}
                </p>
              </div>
            ) : (
              filteredNotifications.map((item) => (
                <div
                  key={item.id}
                  onClick={() => handleNotificationClick(item)}
                  className={`p-3.5 rounded-xl border transition-all duration-150 cursor-pointer flex items-start gap-3 relative group ${
                    item.unread
                      ? "bg-purple-50/50 border-purple-200 hover:border-purple-300 hover:bg-purple-50"
                      : "bg-white border-gray-100 hover:border-gray-200 hover:bg-gray-50/70"
                  }`}
                >
                  {getNotifIcon(item.type)}

                  <div className="flex-1 min-w-0 pr-4">
                    <div className="flex items-center justify-between gap-1">
                      <h4
                        className={`text-xs truncate ${
                          item.unread ? "font-extrabold text-gray-900" : "font-semibold text-gray-800"
                        }`}
                      >
                        {item.title}
                      </h4>
                      <span className="text-[10px] text-gray-400 font-medium shrink-0 flex items-center gap-1">
                        <Clock size={10} />
                        {item.timestamp}
                      </span>
                    </div>

                    <p className="text-[11px] text-gray-600 mt-1 leading-relaxed line-clamp-2">
                      {item.message}
                    </p>

                    <div className="mt-2 flex items-center gap-1 text-[11px] font-bold text-purple-700 group-hover:translate-x-0.5 transition-transform">
                      <span>View details</span>
                      <ChevronRight size={13} />
                    </div>
                  </div>

                  {item.unread && (
                    <span className="absolute top-3.5 right-3 w-2 h-2 rounded-full bg-purple-600" />
                  )}
                </div>
              ))
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-gray-100 bg-gray-50/80 flex items-center justify-between text-xs text-gray-500">
          <div className="flex items-center gap-1.5">
            <Phone size={13} className="text-purple-600" />
            <span className="font-medium">+91 8999291978</span>
          </div>

          {notifications.length > 0 && (
            <button
              type="button"
              onClick={handleClearAll}
              className="text-gray-400 hover:text-red-600 flex items-center gap-1 text-[11px] font-medium transition cursor-pointer"
            >
              <Trash2 size={12} />
              <span>Clear history</span>
            </button>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}
