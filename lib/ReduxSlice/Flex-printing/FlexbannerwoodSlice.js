import {FlexBannerWoodencalculation  } from "@/lib/API/Flex-printing/Flexbannerwood";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";


export const GetFlecbannerWoodencalculation = createAsyncThunk(
  "category/GetFlecbannerWoodencalculation",
  async (data, { rejectWithValue }) => {
    try {
      const response = await FlexBannerWoodencalculation(data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const flexbannerwoodenSlice = createSlice({
  name: "Flexbannerwooden",
  initialState: {
    Flexbannerwoodenresult: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(GetFlecbannerWoodencalculation.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(GetFlecbannerWoodencalculation.fulfilled, (state, action) => {
        state.loading = false;
        state.Flexbannerwoodenresult = action.payload;
      })
      .addCase(GetFlecbannerWoodencalculation.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default flexbannerwoodenSlice.reducer;