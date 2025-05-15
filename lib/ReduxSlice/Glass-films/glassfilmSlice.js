import { Glassfilmscalculation } from "@/lib/API/Glass-films/glassfilms";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";


export const GetGlassfilmscalculation = createAsyncThunk(
  "category/GetGlassfilmscalculation",
  async (data, { rejectWithValue }) => {
    try {
      const response = await Glassfilmscalculation(data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const glassprintSlice = createSlice({
  name: "Glassfilmprint",
  initialState: {
   Glassfilmprintresult: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(GetGlassfilmscalculation.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(GetGlassfilmscalculation.fulfilled, (state, action) => {
        state.loading = false;
        state.Glassfilmprintresult = action.payload;
      })
      .addCase(GetGlassfilmscalculation.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default glassprintSlice.reducer;