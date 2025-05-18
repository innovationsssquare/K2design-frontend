import { Isigncalculation } from "@/lib/API/Modernproduct/Isign";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const GetIsigncalculation = createAsyncThunk(
  "category/GetIsigncalculation",
  async (data, { rejectWithValue }) => {
    try {
      const response = await Isigncalculation(data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const isignSlice = createSlice({
  name: "Isign",
  initialState: {
   Isignresult: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(GetIsigncalculation.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(GetIsigncalculation.fulfilled, (state, action) => {
        state.loading = false;
        state.Isignresult = action.payload;
      })
      .addCase(GetIsigncalculation.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default isignSlice.reducer;
