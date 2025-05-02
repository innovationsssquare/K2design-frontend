"use client";
import React, { Suspense, lazy } from "react";
import { useParams } from "next/navigation";
import Billbooks from "@/components/Paper-printing/Billbooks/Billbooks";
import Pavtibooks from "@/components/Paper-printing/Pavtibooks/Pavtibooks";
import WallCalendar from "@/components/Paper-printing/WallCalendar/WallCalendar";
import Envelopes from "@/components/Paper-printing/Envelopes/Envelopes";
import VisitingCards from "../../../../../components/Paper-printing/VisitingCards/VisitingCards";
import Tags from "@/components/Paper-printing/Tags/Tags";
import PaperBags from "@/components/Paper-printing/PaperBags/PaperBags";
import Filesandfolders from "@/components/Paper-printing/Filesandfolders/Filesandfolders";
import InvitationCards from "@/components/Paper-printing/InvitationCards/InvitationCards";
import Weddingcard from "@/components/Paper-printing/Weddingcard/Weddingcard";
import Sticker from "@/components/Paper-printing/Sticker/Sticker";
import Letterheads from "@/components/Paper-printing/Letterheads/Letterheads";
import Pamphlets from "@/components/Paper-printing/Pamphlets/Pamphlets";
import Vinylprint from "@/components/Media-printing/Vinylprint";
import Backlitprint from "@/components/Media-printing/Backlitprint";
import Canvasprint from "@/components/Media-printing/Canvasprint";
import Nightglowprint from "@/components/Media-printing/Nightglowprint";
import Translitprint from "@/components/Media-printing/Translitprint";
import Threereflector from "@/components/Media-printing/Threereflector";
import Flexbannerprinting from "@/components/Flexrelated-printing/Flexbannerprinting";
import Flexbannereconomy from "@/components/Flexrelated-printing/Flexbannereconomy";
import Flexrollupstand from "@/components/Flexrelated-printing/Flexrollupstand";
import Flexbannerpremium from "@/components/Flexrelated-printing/Flexbannerpremium";
import Flexbanneradvertise from "@/components/Flexrelated-printing/Flexbanneradvertise";
import Flexbannerwood from "@/components/Flexrelated-printing/Flexbannerwood";
import Flexstandprint from "@/components/Flexrelated-printing/Flexstandprint";

const Brochure = lazy(() =>
  import("@/components/Paper-printing/Brochure/Brochure")
);
const Booklet = lazy(() =>
  import("@/components/Paper-printing/Booklet/Booklet")
);
const DigitalPoster = lazy(() =>
  import("@/components/Paper-printing/DigitalPoster/DigitalPoster")
);
const Stamp = lazy(() => import("@/components/Paper-printing/Stamp/Stamp"));

const Page = () => {
  const params = useParams();
  const { slug } = params;

  const renderComponent = () => {
    switch (slug) {
      case "brochure-cover":
        return <Brochure />;
      case "booklet-a4a5":
        return <Booklet />;
      case "digital-print-product":
        return <DigitalPoster />;
      case "stamp":
        return <Stamp />;
      case "bill-books":
        return <Billbooks />;
      case "pavati-book":
        return <Pavtibooks />;
      case "calendar":
        return <WallCalendar />;
      case "envelopes":
        return <Envelopes />;
      case "visiting-cards":
        return <VisitingCards />;
      case "tags":
        return <Tags />;
      case "paper-bags":
        return <PaperBags />;
      case "files-and-folders":
        return <Filesandfolders />;
      case "invitation-card":
        return <InvitationCards />;
      case "pamphlet":
        return <Pamphlets />;
      case "wedding-card":
        return <Weddingcard />;
      case "sticker-and-label":
        return <Sticker />;
      case "letterheads":
        return <Letterheads />;
      case "vinyl-print":
        return <Vinylprint />;
      case "backlit-flex-print":
        return <Backlitprint />;
      case "canvas-print":
        return <Canvasprint />;
      case "night-glow-print-(green)":
        return <Nightglowprint/>;
      case "translit-print-(for-cliapon)":
        return <Translitprint/>;
      case "3m-reflector":
        return <Threereflector/>;
      case "flex-(banner)-printing":
        return <Flexbannerprinting/>;
      case "flex-(banner)-printing-economy-%2B-ms-frame":
        return <Flexbannereconomy/>;
      case "flex-(banner)-printing-premium-%2B-ms-frame":
        return <Flexbannerpremium/>;
      case "flex-(banner)-printing-advertise-%2B-ms-frame":
        return <Flexbanneradvertise/>;
      case "flex-(banner)-%2B-wooden-frame":
        return <Flexbannerwood/>;
      case "flex-stand":
        return <Flexstandprint/>;
      case "roll-up-stand":
        return <Flexrollupstand/>;
      default:
        return <div>Component not found for slug: {slug}</div>;
    }
  };

  return (
    <div>
     {renderComponent()}
    </div>
  );
};

export default Page;
