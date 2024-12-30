import { configureStore } from "@reduxjs/toolkit";
import productSlice from "./ReduxSlice/ProductSlice";
import CategorySlice from "./ReduxSlice/CategorySlice";
import brochureSlice from "@/lib/ReduxSlice/BrouchureSlice"



export const store = configureStore({
  reducer: {
    product:productSlice,
    category:CategorySlice,
    brochure:brochureSlice
  },
});
