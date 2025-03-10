import { Nightglowprintcalculation } from "@/lib/API/Media-printing/Nightglowprint";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";


export const GetNightglowprintcalculation = createAsyncThunk(
  "category/GetNightglowprintcalculation",
  async (data, { rejectWithValue }) => {
    try {
      const response = await Nightglowprintcalculation(data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const nightglowprintSlice = createSlice({
  name: "Nightglowprint",
  initialState: {
    Nightglowprintresult: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(GetNightglowprintcalculation.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(GetNightglowprintcalculation.fulfilled, (state, action) => {
        state.loading = false;
        state.Nightglowprintresult = action.payload;
      })
      .addCase(GetNightglowprintcalculation.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default nightglowprintSlice.reducer;