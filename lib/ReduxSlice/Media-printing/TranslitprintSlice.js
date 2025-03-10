import { Translitprintcalculation } from "@/lib/API/Media-printing/Translitprint";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";


export const GetTranslitprintcalculation = createAsyncThunk(
  "category/GetTranslitprintcalculation",
  async (data, { rejectWithValue }) => {
    try {
      const response = await Translitprintcalculation(data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const translitprintSlice = createSlice({
  name: "Translitprint",
  initialState: {
    Translitprintresult: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(GetTranslitprintcalculation.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(GetTranslitprintcalculation.fulfilled, (state, action) => {
        state.loading = false;
        state.Translitprintresult = action.payload;
      })
      .addCase(GetTranslitprintcalculation.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default translitprintSlice.reducer;