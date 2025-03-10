
import { Canvasprintcalculation } from "@/lib/API/Media-printing/Canvasprint";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";


export const GetCanvasprintcalculation = createAsyncThunk(
  "category/GetCanvasprintcalculation",
  async (data, { rejectWithValue }) => {
    try {
      const response = await Canvasprintcalculation(data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const canvasprintSlice = createSlice({
  name: "Canvasprint",
  initialState: {
    Canvasprintresult: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(GetCanvasprintcalculation.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(GetCanvasprintcalculation.fulfilled, (state, action) => {
        state.loading = false;
        state.Canvasprintresult = action.payload;
      })
      .addCase(GetCanvasprintcalculation.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default canvasprintSlice.reducer;