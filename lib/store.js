import { configureStore } from "@reduxjs/toolkit";
import productSlice from "./ReduxSlice/ProductSlice";
import CategorySlice from "./ReduxSlice/CategorySlice";



export const store = configureStore({
  reducer: {
    product:productSlice,
    category:CategorySlice,

  },
});
