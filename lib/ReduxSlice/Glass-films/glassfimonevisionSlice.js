import { Glassfilmsonevisioncalculation } from "@/lib/API/Glass-films/glassfilmsonevision";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const GetGlassfilmsonevisioncalculation = createAsyncThunk(
  "category/GetGlassfilmsonevisioncalculation",
  async (data, { rejectWithValue }) => {
    try {
      const response = await Glassfilmsonevisioncalculation(data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const glassfilmprintSlice = createSlice({
  name: "Glassfilmonevisionprint",
  initialState: {
    Glassfilmonevisionprintresult: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(GetGlassfilmsonevisioncalculation.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(GetGlassfilmsonevisioncalculation.fulfilled, (state, action) => {
        state.loading = false;
        state.Glassfilmonevisionprintresult = action.payload;
      })
      .addCase(GetGlassfilmsonevisioncalculation.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default glassfilmprintSlice.reducer;
