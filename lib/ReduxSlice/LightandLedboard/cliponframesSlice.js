import { Cliponframecalculation } from "@/lib/API/LightandLedboards/Cliponframes";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const GetCliponframecalculation = createAsyncThunk(
  "category/GetCliponframecalculation",
  async (data, { rejectWithValue }) => {
    try {
      const response = await Cliponframecalculation(data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const cliponframeSlice = createSlice({
  name: "Cliponframe",
  initialState: {
    Cliponframeresult: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(GetCliponframecalculation.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(GetCliponframecalculation.fulfilled, (state, action) => {
        state.loading = false;
        state.Cliponframeresult = action.payload;
      })
      .addCase(GetCliponframecalculation.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default cliponframeSlice.reducer;
