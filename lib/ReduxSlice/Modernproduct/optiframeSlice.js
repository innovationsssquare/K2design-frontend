import { Optiframecalculation } from "@/lib/API/Modernproduct/Optiframes";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const GetOptiframecalculation = createAsyncThunk(
  "category/GetOptiframecalculation",
  async (data, { rejectWithValue }) => {
    try {
      const response = await Optiframecalculation(data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const optiframeSlice = createSlice({
  name: "Optiframe",
  initialState: {
    Optiframeresult: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(GetOptiframecalculation.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(GetOptiframecalculation.fulfilled, (state, action) => {
        state.loading = false;
        state.Optiframeresult = action.payload;
      })
      .addCase(GetOptiframecalculation.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default optiframeSlice.reducer;
