"use client";
import React from "react";
import { useParams } from "next/navigation";
import PrintConfigurator from "@/components/PrintConfigurator/PrintConfigurator";
import RecentlyView from "@/components/RecentlyView/RecentlyView";

const productMap = {
  visitingcards: { category: "visitingCards", title: "Visiting Cards" },
  brochure: { category: "brochure", title: "Brochures" },
  booklet: { category: "booklet", title: "Booklets" },
  digitalposter: { category: "digitalPoster", title: "Digital Posters" },
  billbooks: { category: "billBooks", title: "Bill Books" },
  pavtibooks: { category: "pavtiBooks", title: "Pavati / Receipt Books" },
  pamphlets: { category: "pamphlets", title: "Pamphlets & Flyers" },
  envelopes: { category: "envelopes", title: "Office Envelopes" },
  filesandfolders: { category: "filesAndFolders", title: "Files & Folders" },
  letterheads: { category: "letterheads", title: "Executive Letterheads" },
  paperbags: { category: "paperBags", title: "Printed Paper Bags" },
  sticker: { category: "sticker", title: "Custom Stickers & Labels" },
  stickers: { category: "sticker", title: "Custom Stickers & Labels" },
  tags: { category: "tags", title: "Product Tags" },
  stamp: { category: "stamp", title: "Self-Inking Stamps" },
  stamps: { category: "stamp", title: "Self-Inking Stamps" },
  wallcalendar: { category: "wallCalendar", title: "Wall & Desk Calendars" },
  weddingcard: { category: "weddingCard", title: "Wedding Invitations" },
  invitationcards: { category: "invitationCards", title: "Event Invitation Cards" },
};

export default function PaperProductPage() {
  const params = useParams();
  const rawProduct = params?.product ? String(params.product).toLowerCase().replace(/[-_ ]/g, "") : "visitingcards";

  const config = productMap[rawProduct] || {
    category: "visitingCards",
    title: params?.product ? String(params.product) : "Custom Print",
  };

  return (
    <div className="bg-[#f1f2f4] min-h-screen pb-10">
      <div className="max-w-[1920px] mx-auto">
        <PrintConfigurator category={config.category} title={config.title} />
        <div className="mt-8">
          <RecentlyView />
        </div>
      </div>
    </div>
  );
}

