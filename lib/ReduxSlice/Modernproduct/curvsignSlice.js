import { Curvsigncalculation } from "@/lib/API/Modernproduct/Curvsign";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const GetCurvsigncalculation = createAsyncThunk(
  "category/GetCurvsigncalculation",
  async (data, { rejectWithValue }) => {
    try {
      const response = await Curvsigncalculation(data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const curvsignSlice = createSlice({
  name: "Curvsign",
  initialState: {
    Curvsignresult: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(GetCurvsigncalculation.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(GetCurvsigncalculation.fulfilled, (state, action) => {
        state.loading = false;
        state.Curvsignresult = action.payload;
      })
      .addCase(GetCurvsigncalculation.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default curvsignSlice.reducer;
