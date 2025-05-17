import { Backlittubecalculation } from "@/lib/API/LightandLedboards/Backlittube";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const GetBacklittubecalculation = createAsyncThunk(
  "category/GetBacklittubecalculation",
  async (data, { rejectWithValue }) => {
    try {
      const response = await Backlittubecalculation(data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const backlittubeSlice = createSlice({
  name: "Backlittube",
  initialState: {
    Backlittuberesult: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(GetBacklittubecalculation.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(GetBacklittubecalculation.fulfilled, (state, action) => {
        state.loading = false;
        state.Backlittuberesult = action.payload;
      })
      .addCase(GetBacklittubecalculation.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default backlittubeSlice.reducer;
