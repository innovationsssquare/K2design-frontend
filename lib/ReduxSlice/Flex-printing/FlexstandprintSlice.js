import {FlexStandcalculation  } from "@/lib/API/Flex-printing/Flexstandprint";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";


export const GetFlexstandcalculation = createAsyncThunk(
  "category/GetFlexstandcalculation",
  async (data, { rejectWithValue }) => {
    try {
      const response = await FlexStandcalculation(data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const flexstandSlice = createSlice({
  name: "Flexstand",
  initialState: {
    Flexstandresult: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(GetFlexstandcalculation.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(GetFlexstandcalculation.fulfilled, (state, action) => {
        state.loading = false;
        state.Flexstandresult = action.payload;
      })
      .addCase(GetFlexstandcalculation.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default flexstandSlice.reducer;