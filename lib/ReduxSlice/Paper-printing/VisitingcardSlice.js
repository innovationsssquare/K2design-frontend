import { Visitingcalculation } from "@/lib/API/Visitingcard";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const CalculateVisitingcalculation = createAsyncThunk(
  "category/CalculateVisitingcalculation",
  async (data, { rejectWithValue }) => {
    try {
      const response = await Visitingcalculation(data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const visitingSlice = createSlice({
  name: "Visitingcards",
  initialState: {
    Visitingresult: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(CalculateVisitingcalculation.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(CalculateVisitingcalculation.fulfilled, (state, action) => {
        state.loading = false;
        state.Visitingresult = action.payload;
      })
      .addCase(CalculateVisitingcalculation.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default visitingSlice.reducer;
