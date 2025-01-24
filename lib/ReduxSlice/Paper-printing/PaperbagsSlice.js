import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import { Paperbagscalculation } from "@/lib/API/Paperbags";

export const GetPaperbagsCalculation = createAsyncThunk(
  "category/GetPaperbagsCalculation",
  async (data, { rejectWithValue }) => {
    try {
      const response = await Paperbagscalculation(data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const PaperbagsSlice = createSlice({
  name: "Paperbags",
  initialState: {
    Paperbagsresult: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(GetPaperbagsCalculation.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(GetPaperbagsCalculation.fulfilled, (state, action) => {
        state.loading = false;
        state.Paperbagsresult = action.payload;
      })
      .addCase(GetPaperbagsCalculation.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default PaperbagsSlice.reducer;


