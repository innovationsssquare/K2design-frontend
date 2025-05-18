import { Tablestandcalculation } from "@/lib/API/Modernproduct/Tablestand";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const GetTablestandcalculation = createAsyncThunk(
  "category/GetTablestandcalculation",
  async (data, { rejectWithValue }) => {
    try {
      const response = await Tablestandcalculation(data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const tablestandSlice = createSlice({
  name: "Tablestand",
  initialState: {
   Tablestandresult: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(GetTablestandcalculation.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(GetTablestandcalculation.fulfilled, (state, action) => {
        state.loading = false;
        state.Tablestandresult = action.payload;
      })
      .addCase(GetTablestandcalculation.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default tablestandSlice.reducer;
