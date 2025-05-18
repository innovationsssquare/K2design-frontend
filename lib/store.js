import { configureStore } from "@reduxjs/toolkit";
import productSlice from "./ReduxSlice/ProductSlice";
import CategorySlice from "./ReduxSlice/CategorySlice";
import brochureSlice from "@/lib/ReduxSlice/BrouchureSlice";
import bookletSlice from "@/lib/ReduxSlice/Paper-printing/BookletSlice";
import digitalPosterSlice from "@/lib/ReduxSlice/Paper-printing/DigitalPosterSlice";
import stampSlice from "@/lib/ReduxSlice/Paper-printing/StampSlice";
import billbooksSlice from "@/lib/ReduxSlice/Paper-printing/BillbooksSlice";
import visitingSlice from "@/lib/ReduxSlice/Paper-printing/VisitingcardSlice";
import pavtibooksSlice from "@/lib/ReduxSlice/Paper-printing/PavtibooksSlice";
import wallCalendarSlice from "@/lib/ReduxSlice/Paper-printing/WallCalendarSlice";
import envelopeSlice from "@/lib/ReduxSlice/Paper-printing/EnvelopesSlice";
import TagsSlice from "@/lib/ReduxSlice/Paper-printing/TagsSlice";
import PaperbagsSlice from "@/lib/ReduxSlice/Paper-printing/PaperbagsSlice";
import fileandfoldersSlice from "@/lib/ReduxSlice/Paper-printing/FileandfoldersSlice";
import invitationCardsSlice from "@/lib/ReduxSlice/Paper-printing/InvitationCardsSlice";
import weddingcardSlice from "@/lib/ReduxSlice/Paper-printing/WeddingSlice";
import PamphletsSlice from "@/lib/ReduxSlice/Paper-printing/PamphletsSlice";
import stickerSlice from "@/lib/ReduxSlice/Paper-printing/StickerSlice";
import letterheadSlice from "@/lib/ReduxSlice/Paper-printing/LetterheadSlice";
import vinylprintSlice from "@/lib/ReduxSlice/Media-printing/VinylprintSlice";
import backlitprintSlice from "@/lib/ReduxSlice/Media-printing/BacklitprintSlice";
import canvasprintSlice from "@/lib/ReduxSlice/Media-printing/CanvasprintSlice";
import nightglowprintSlice from "@/lib/ReduxSlice/Media-printing/NightglowSlice";
import threereflectorprintSlice from "@/lib/ReduxSlice/Media-printing/ThreereflectorSlice";
import translitprintSlice from "@/lib/ReduxSlice/Media-printing/TranslitprintSlice";

import flexbanneradvertiseSlice from "@/lib/ReduxSlice/Flex-printing/FlexbanneradvertiseSlice";
import flexbannereconomySlice from "@/lib/ReduxSlice/Flex-printing/FlexbannereconomySlice";
import flexbannerpremiumSlice from "@/lib/ReduxSlice/Flex-printing/FlexbannerpremiumSlice";
import flexbannerSlice from "@/lib/ReduxSlice/Flex-printing/FlexbannerprintingSlice";
import flexbannerwoodenSlice from "@/lib/ReduxSlice/Flex-printing/FlexbannerwoodSlice";
import flexrollupstandSlice from "@/lib/ReduxSlice/Flex-printing/FlexrollupstandSlice";
import flexstandSlice from "@/lib/ReduxSlice/Flex-printing/FlexstandprintSlice";
import glassprintSlice from "@/lib/ReduxSlice/Glass-films/glassfilmSlice";
import glassfilmprintSlice from "@/lib/ReduxSlice/Glass-films/glassfimonevisionSlice";
import acpplatesSlice from "@/lib/ReduxSlice/Rigidsignplate/acpplatesSlice";
import acrylicplatesSlice from "@/lib/ReduxSlice/Rigidsignplate/AcrylicplatesSlice";
import pvcfoamplatesSlice from "@/lib/ReduxSlice/Rigidsignplate/PvcfoamplatesSlice";
import nightglowplatesSlice from "@/lib/ReduxSlice/Rigidsignplate/NightglowplatesSlice";
import stainlessplatesSlice from "@/lib/ReduxSlice/Rigidsignplate/StainlessplatesSlice";
import vinylletterSlice from "@/lib/ReduxSlice/Vinyl-letter/VinylletterSlice";
import acryliclletterSlice from "@/lib/ReduxSlice/Acrylic-letter/acrylicletterSlice";
import acpstancilSlice from "@/lib/ReduxSlice/LightandLedboard/acpstancilSlice";
import backlittubeSlice from "@/lib/ReduxSlice/LightandLedboard/backlittubeSlice";
import fabricframesSlice from "@/lib/ReduxSlice/LightandLedboard/fabricsledSlice";
import cliponframeSlice from "@/lib/ReduxSlice/LightandLedboard/cliponframesSlice";
import lightboxboardSlice from "@/lib/ReduxSlice/LightandLedboard/LightboxSlice";
import artframeSlice from "@/lib/ReduxSlice/Modernproduct/artframeSlice";
import curvsignSlice from "@/lib/ReduxSlice/Modernproduct/curvsignSlice";
import flatsignSlice from "@/lib/ReduxSlice/Modernproduct/flatsignSlice";
import isignSlice from "@/lib/ReduxSlice/Modernproduct/isignSlice";
import optiframeSlice from "@/lib/ReduxSlice/Modernproduct/optiframeSlice";
import tablestandSlice from "@/lib/ReduxSlice/Modernproduct/tablestandSlice";

export const store = configureStore({
  reducer: {
    product: productSlice,
    category: CategorySlice,
    brochure: brochureSlice,
    booklet: bookletSlice,
    digitalPoster: digitalPosterSlice,
    stamp: stampSlice,
    Billbooks: billbooksSlice,
    Pavtibooks: pavtibooksSlice,
    wallCalendar: wallCalendarSlice,
    Envelope: envelopeSlice,
    Tags: TagsSlice,
    Paperbags: PaperbagsSlice,
    Fileandfolders: fileandfoldersSlice,
    Visitingcards: visitingSlice,
    invitationCards: invitationCardsSlice,
    weddingcard: weddingcardSlice,
    sticker: stickerSlice,
    letterhead: letterheadSlice,
    pamphlets: PamphletsSlice,
    Vinylprint: vinylprintSlice,
    Backlitprint: backlitprintSlice,
    Canvasprint: canvasprintSlice,
    Nightglowprint: nightglowprintSlice,
    Threereflectorprint: threereflectorprintSlice,
    Translitprint: translitprintSlice,
    Flexbanneradvertise: flexbanneradvertiseSlice,
    Flexbannereconomy: flexbannereconomySlice,
    Flexbannerpremium: flexbannerpremiumSlice,
    Flexbanner: flexbannerSlice,
    Flexbannerwooden: flexbannerwoodenSlice,
    Flexrollupstand: flexrollupstandSlice,
    Flexstand: flexstandSlice,
    Glassfilmprint: glassprintSlice,
    Glassfilmonevisionprint: glassfilmprintSlice,
    Acpplates: acpplatesSlice,
    Acrylicplates: acrylicplatesSlice,
    Pvcfoamplates: pvcfoamplatesSlice,
    Nightglowplates: nightglowplatesSlice,
    Stainlessplates: stainlessplatesSlice,
    Vinylletter: vinylletterSlice,
    Acrylicletter: acryliclletterSlice,
    Acpstancil: acpstancilSlice,
    Backlittube: backlittubeSlice,
    Fabricframes: fabricframesSlice,
    Cliponframe: cliponframeSlice,
    LightboxBoard: lightboxboardSlice,
    Artframe: artframeSlice,
    Curvsign: curvsignSlice,
    Flatsign: flatsignSlice,
    Isign: isignSlice,
    Optiframe: optiframeSlice,
    Tablestand: tablestandSlice,
  },
});
