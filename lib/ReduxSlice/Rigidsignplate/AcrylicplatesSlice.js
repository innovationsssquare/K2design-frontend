import { Acrylicplatescalculation } from "@/lib/API/Rigidsignplates/Acrylicplates";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const GetAcrylicplatescalculation = createAsyncThunk(
  "category/GetAcrylicplatescalculation",
  async (data, { rejectWithValue }) => {
    try {
      const response = await Acrylicplatescalculation(data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const acrylicplatesSlice = createSlice({
  name: "Acrylicplates",
  initialState: {
   Acrylicplatesresult: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(GetAcrylicplatescalculation.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(GetAcrylicplatescalculation.fulfilled, (state, action) => {
        state.loading = false;
        state.Acrylicplatesresult = action.payload;
      })
      .addCase(GetAcrylicplatescalculation.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default acrylicplatesSlice.reducer;
