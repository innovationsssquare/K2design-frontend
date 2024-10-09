import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { Getallcategory, Getallcategorybyslug ,GetSubCategoryProducts} from "../API/Category";

export const fetchcategories = createAsyncThunk(
  "category/fetchcategories",
  async (_, { rejectWithValue }) => {
    try {
      const response = await Getallcategory();
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const fetchcategoriesbyslug = createAsyncThunk(
  "category/fetchcategoriesbyslug",
  async (_, { rejectWithValue }) => {
    try {
      const response = await Getallcategorybyslug();
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);


export const fetchSubCategoryProducts = createAsyncThunk(
  "category/fetchSubCategoryProducts",
  async (subcategoryId, { rejectWithValue }) => {
    try {
      const response = await GetSubCategoryProducts(subcategoryId);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const categorySlice = createSlice({
  name: "category",
  initialState: {
    category: [],
    categoryslug: [],
    subcategoryProducts: [], // New state for subcategory products
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchcategories.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchcategories.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.category = action.payload;
      })
      .addCase(fetchcategories.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(fetchcategoriesbyslug.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchcategoriesbyslug.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.categoryslug = action.payload;
      })
      .addCase(fetchcategoriesbyslug.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })

      // New cases for fetching subcategory products
      .addCase(fetchSubCategoryProducts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchSubCategoryProducts.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.subcategoryProducts = action.payload; // Store the fetched subcategory products
      })
      .addCase(fetchSubCategoryProducts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });

      
  },
});

export default categorySlice.reducer;
