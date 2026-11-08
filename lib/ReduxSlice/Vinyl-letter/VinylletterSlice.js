import { Vinyllettercalculation } from "@/lib/API/Vinyl-letter/Vinylletter";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const GetVinyllettercalculation = createAsyncThunk(
  "category/GetVinyllettercalculation",
  async (data, { rejectWithValue }) => {
    try {
      const response = await Vinyllettercalculation(data);
      if (response && response.status === false) {
        return rejectWithValue(response.message || "Failed to calculate price");
      }
      return response?.data || response;
    } catch (error) {
      return rejectWithValue(error?.response?.data || error.message);
    }
  }
);

const vinylletterSlice = createSlice({
  name: "Vinylletter",
  initialState: {
   Vinylletterresult: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(GetVinyllettercalculation.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(GetVinyllettercalculation.fulfilled, (state, action) => {
        state.loading = false;
        state.Vinylletterresult = action.payload;
      })
      .addCase(GetVinyllettercalculation.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default vinylletterSlice.reducer;
