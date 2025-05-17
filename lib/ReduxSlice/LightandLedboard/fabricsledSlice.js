import { FabricFramescalculation } from "@/lib/API/LightandLedboards/Fabricsled";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const GetFabricFramescalculation = createAsyncThunk(
  "category/GetFabricFramescalculation",
  async (data, { rejectWithValue }) => {
    try {
      const response = await FabricFramescalculation(data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const fabricframesSlice = createSlice({
  name: "Fabricframes",
  initialState: {
 Fabricframesresult: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(GetFabricFramescalculation.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(GetFabricFramescalculation.fulfilled, (state, action) => {
        state.loading = false;
        state.Fabricframesresult = action.payload;
      })
      .addCase(GetFabricFramescalculation.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default fabricframesSlice.reducer;
