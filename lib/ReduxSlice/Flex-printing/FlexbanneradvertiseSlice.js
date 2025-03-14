import {Flexbanneradvertisecalculation  } from "@/lib/API/Flex-printing/Flexbanneradvertise";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";


export const GetFlexbanneradvertisealculation = createAsyncThunk(
  "category/GetFlexbanneradvertisealculation",
  async (data, { rejectWithValue }) => {
    try {
      const response = await Flexbanneradvertisecalculation(data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const flexbanneradvertiseSlice = createSlice({
  name: "Flexbanneradvertise",
  initialState: {
    Flexbanneradvetiseresult: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(GetFlexbanneradvertisealculation.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(GetFlexbanneradvertisealculation.fulfilled, (state, action) => {
        state.loading = false;
        state.Flexbanneradvetiseresult = action.payload;
      })
      .addCase(GetFlexbanneradvertisealculation.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default flexbanneradvertiseSlice.reducer;