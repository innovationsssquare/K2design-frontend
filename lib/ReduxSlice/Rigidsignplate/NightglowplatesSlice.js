import { Nightglowplatescalculation } from "@/lib/API/Rigidsignplates/Nightglowplates";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const GetNightglowplatescalculation = createAsyncThunk(
  "category/GetNightglowplatescalculation",
  async (data, { rejectWithValue }) => {
    try {
      const response = await Nightglowplatescalculation(data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const nightglowplatesSlice = createSlice({
  name: "Nightglowplates",
  initialState: {
   Nightglowplatesresult: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(GetNightglowplatescalculation.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(GetNightglowplatescalculation.fulfilled, (state, action) => {
        state.loading = false;
        state.Nightglowplatesresult = action.payload;
      })
      .addCase(GetNightglowplatescalculation.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default nightglowplatesSlice.reducer;
