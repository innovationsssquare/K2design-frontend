import { configureStore } from "@reduxjs/toolkit";
import productSlice from "./ReduxSlice/ProductSlice";
import CategorySlice from "./ReduxSlice/CategorySlice";
import brochureSlice from "@/lib/ReduxSlice/BrouchureSlice"
import bookletSlice from "@/lib/ReduxSlice/Paper-printing/BookletSlice"
import digitalPosterSlice from "@/lib/ReduxSlice/Paper-printing/DigitalPosterSlice"
import stampSlice from "@/lib/ReduxSlice/Paper-printing/StampSlice"
import billbooksSlice from "@/lib/ReduxSlice/Paper-printing/BillbooksSlice"



export const store = configureStore({
  reducer: {
    product:productSlice,
    category:CategorySlice,
    brochure:brochureSlice,
    booklet:bookletSlice,
    digitalPoster:digitalPosterSlice,
    stamp:stampSlice,
    Billbooks:billbooksSlice
  },
});
