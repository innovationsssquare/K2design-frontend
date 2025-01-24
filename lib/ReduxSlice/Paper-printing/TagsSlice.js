import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import { Tagscalculation } from "@/lib/API/Tags";

export const GetTagsCalculation = createAsyncThunk(
  "category/GetTagsCalculation",
  async (data, { rejectWithValue }) => {
    try {
      const response = await Tagscalculation(data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const TagsSlice = createSlice({
  name: "Tags",
  initialState: {
    Tagsresult: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(GetTagsCalculation.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(GetTagsCalculation.fulfilled, (state, action) => {
        state.loading = false;
        state.Tagsresult = action.payload;
      })
      .addCase(GetTagsCalculation.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default TagsSlice.reducer;


