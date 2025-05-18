import { Flatsigncalculation } from "@/lib/API/Modernproduct/Flatsign";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const GetFlatsigncalculation = createAsyncThunk(
  "category/GetFlatsigncalculation",
  async (data, { rejectWithValue }) => {
    try {
      const response = await Flatsigncalculation(data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const flatsignSlice = createSlice({
  name: "Flatsign",
  initialState: {
    Flatsignresult: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(GetFlatsigncalculation.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(GetFlatsigncalculation.fulfilled, (state, action) => {
        state.loading = false;
        state.Flatsignresult = action.payload;
      })
      .addCase(GetFlatsigncalculation.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default flatsignSlice.reducer;
