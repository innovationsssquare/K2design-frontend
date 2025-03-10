import { Backlitprintcalculation } from "@/lib/API/Media-printing/Backlitprint";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";


export const GetBacklitprintcalculation = createAsyncThunk(
  "category/GetBacklitprintcalculation",
  async (data, { rejectWithValue }) => {
    try {
      const response = await Backlitprintcalculation(data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const backlitprintSlice = createSlice({
  name: "Backlitprint",
  initialState: {
    Backlitprintresult: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(GetBacklitprintcalculation.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(GetBacklitprintcalculation.fulfilled, (state, action) => {
        state.loading = false;
        state.Backlitprintresult = action.payload;
      })
      .addCase(GetBacklitprintcalculation.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default backlitprintSlice.reducer;