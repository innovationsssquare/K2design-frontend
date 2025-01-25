
import { Weddingcardcalculation } from "@/lib/API/Weddingcard";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";


export const Getweddingcardcalculation = createAsyncThunk(
  "category/Getweddingcardcalculation",
  async (data, { rejectWithValue }) => {
    try {
      const response = await Weddingcardcalculation(data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const weddingcardSlice = createSlice({
  name: "weddingcard",
  initialState: {
    weddingcardresult: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(Getweddingcardcalculation.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(Getweddingcardcalculation.fulfilled, (state, action) => {
        state.loading = false;
        state.weddingcardresult = action.payload;
      })
      .addCase(Getweddingcardcalculation.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default weddingcardSlice.reducer;