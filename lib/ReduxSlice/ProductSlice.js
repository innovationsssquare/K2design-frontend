import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { Getallcategory, GetProductBySlug } from "../API/Product";

export const fetchproducts = createAsyncThunk(
  "product/fetchproducts",
  async (_, { rejectWithValue }) => {
    try {
      const response = await Getallcategory();
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const fetchProductBySlug = createAsyncThunk(
  "product/fetchProductBySlug",
  async ({ slug, productslug }, { rejectWithValue }) => {
    try {
      const response = await GetProductBySlug(slug, productslug);
      return response; // return the entire response if needed
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

const productSlice = createSlice({
  name: "product",
  initialState: {
    product: [],
    productDetails: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchproducts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchproducts.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.product = action.payload;
      })
      .addCase(fetchproducts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(fetchProductBySlug.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchProductBySlug.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.productDetails = action.payload; // Assign the fetched product details
      })
      .addCase(fetchProductBySlug.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload; // Display error message if the API call fails
      });
  },
});

export default productSlice.reducer;


