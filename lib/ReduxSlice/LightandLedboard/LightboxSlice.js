import { LightboxBoardcalculation } from "@/lib/API/LightandLedboards/Lightbox";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const GetLightboxBoardcalculation = createAsyncThunk(
  "category/GetLightboxBoardcalculation",
  async (data, { rejectWithValue }) => {
    try {
      const response = await LightboxBoardcalculation(data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const lightboxboardSlice = createSlice({
  name: "LightboxBoard",
  initialState: {
  LightboxBoardresult: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(GetLightboxBoardcalculation.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(GetLightboxBoardcalculation.fulfilled, (state, action) => {
        state.loading = false;
        state.LightboxBoardresult = action.payload;
      })
      .addCase(GetLightboxBoardcalculation.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default lightboxboardSlice.reducer;
