import { DigitalPostercalculation } from "@/lib/API/DigitalPoster";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";


export const GetDigitalPostercalculation = createAsyncThunk(
  "category/GetDigitalPosterCalculation",
  async (data, { rejectWithValue }) => {
    try {
      const response = await DigitalPostercalculation(data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const digitalPosterSlice = createSlice({
  name: "digitalPoster",
  initialState: {
    digitalPosterresult: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(GetDigitalPostercalculation.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(GetDigitalPostercalculation.fulfilled, (state, action) => {
        state.loading = false;
        state.digitalPosterresult = action.payload;
      })
      .addCase(GetDigitalPostercalculation.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default digitalPosterSlice.reducer;