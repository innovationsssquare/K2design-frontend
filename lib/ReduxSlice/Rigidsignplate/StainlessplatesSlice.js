import { Stainlessplatescalculation } from "@/lib/API/Rigidsignplates/Stainlessplates";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const GetStainlessplatescalculation = createAsyncThunk(
  "category/GetStainlessplatescalculation",
  async (data, { rejectWithValue }) => {
    try {
      const response = await Stainlessplatescalculation(data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const stainlessplatesSlice = createSlice({
  name: "Stainlessplates",
  initialState: {
   Stainlessplatesresult: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(GetStainlessplatescalculation.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(GetStainlessplatescalculation.fulfilled, (state, action) => {
        state.loading = false;
        state.Stainlessplatesresult = action.payload;
      })
      .addCase(GetStainlessplatescalculation.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default stainlessplatesSlice.reducer;
