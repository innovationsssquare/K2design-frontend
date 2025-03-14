import {Flexbannerpremiumcalculation  } from "@/lib/API/Flex-printing/Flexbannerpremium";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";


export const GetFlecbannerpremiumcalculation = createAsyncThunk(
  "category/GetFlecbannerpremiumcalculation",
  async (data, { rejectWithValue }) => {
    try {
      const response = await Flexbannerpremiumcalculation(data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const flexbannerpremiumSlice = createSlice({
  name: "Flexbannerpremium",
  initialState: {
    Flexbannerpremiumresult: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(GetFlecbannerpremiumcalculation.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(GetFlecbannerpremiumcalculation.fulfilled, (state, action) => {
        state.loading = false;
        state.Flexbannerpremiumresult = action.payload;
      })
      .addCase(GetFlecbannerpremiumcalculation.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default flexbannerpremiumSlice.reducer;