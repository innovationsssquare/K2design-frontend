import { ThreeDLEDLetterCalculation } from "@/lib/API/LightandLedboards/3dledletter";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const GetThreeDLEDLetterCalculation = createAsyncThunk(
  "category/GetThreeDLEDLetterCalculation",
  async (data, { rejectWithValue }) => {
    try {
      const response = await ThreeDLEDLetterCalculation(data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error?.response?.data || error.message);
    }
  }
);

const threeDLEDLetterSlice = createSlice({
  name: "ThreeDLEDLetter",
  initialState: {
    result: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(GetThreeDLEDLetterCalculation.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(GetThreeDLEDLetterCalculation.fulfilled, (state, action) => {
        state.loading = false;
        state.result = action.payload;
      })
      .addCase(GetThreeDLEDLetterCalculation.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default threeDLEDLetterSlice.reducer;

