import { Acpstancilcalculation } from "@/lib/API/LightandLedboards/Acpstancil";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const GetAcpstancilcalculation = createAsyncThunk(
  "category/GetAcpstancilcalculation",
  async (data, { rejectWithValue }) => {
    try {
      const response = await Acpstancilcalculation(data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const acpstancilSlice = createSlice({
  name: "Acpstancil",
  initialState: {
  Acpstancilresult: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(GetAcpstancilcalculation.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(GetAcpstancilcalculation.fulfilled, (state, action) => {
        state.loading = false;
        state.Acpstancilresult = action.payload;
      })
      .addCase(GetAcpstancilcalculation.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default acpstancilSlice.reducer;
