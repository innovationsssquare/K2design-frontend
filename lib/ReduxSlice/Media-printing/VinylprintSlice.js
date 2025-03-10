import { Vinylprintcalculation } from "@/lib/API/Media-printing/Vinylprint";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";


export const GetVinylprintcalculation = createAsyncThunk(
  "category/GetVinylprintcalculation",
  async (data, { rejectWithValue }) => {
    try {
      const response = await Vinylprintcalculation(data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const vinylprintSlice = createSlice({
  name: "Vinylprint",
  initialState: {
    Vinylprintresult: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(GetVinylprintcalculation.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(GetVinylprintcalculation.fulfilled, (state, action) => {
        state.loading = false;
        state.Vinylprintresult = action.payload;
      })
      .addCase(GetVinylprintcalculation.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default vinylprintSlice.reducer;