import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import { WallCalendarcalculation } from "@/lib/API/WallCalendar";

export const GetWallCalendarCalculation = createAsyncThunk(
  "category/GetWallCalendarCalculation",
  async (data, { rejectWithValue }) => {
    try {
      const response = await WallCalendarcalculation(data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const wallCalendarSlice = createSlice({
  name: "wallCalendar",
  initialState: {
    wallCalendarresult: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(GetWallCalendarCalculation.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(GetWallCalendarCalculation.fulfilled, (state, action) => {
        state.loading = false;
        state.wallCalendarresult = action.payload;
      })
      .addCase(GetWallCalendarCalculation.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default wallCalendarSlice.reducer;


