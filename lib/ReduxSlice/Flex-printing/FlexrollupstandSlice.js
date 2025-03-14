import {FlexrollupStandalculation  } from "@/lib/API/Flex-printing/Flexrollupstand";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";


export const GetFlexrollupstandcalculation = createAsyncThunk(
  "category/GetFlexrollupstandcalculation",
  async (data, { rejectWithValue }) => {
    try {
      const response = await FlexrollupStandalculation(data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const flexrollupstandSlice = createSlice({
  name: "Flexrollupstand",
  initialState: {
    Flexrollupstandresult: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(GetFlexrollupstandcalculation.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(GetFlexrollupstandcalculation.fulfilled, (state, action) => {
        state.loading = false;
        state.Flexrollupstandresult = action.payload;
      })
      .addCase(GetFlexrollupstandcalculation.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default flexrollupstandSlice.reducer;