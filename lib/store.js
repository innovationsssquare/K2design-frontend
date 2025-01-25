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
    weddingcard:weddingcardSlice
  },
});
