
import { Billbookscalculation } from "@/lib/API/Billbooks";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";


export const GetBillbookscalculation = createAsyncThunk(
  "category/GetBillbookscalculation",
  async (data, { rejectWithValue }) => {
    try {
      const response = await Billbookscalculation(data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const billbooksSlice = createSlice({
  name: "Billbooks",
  initialState: {
    Billbooksresult: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(GetBillbookscalculation.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(GetBillbookscalculation.fulfilled, (state, action) => {
        state.loading = false;
        state.Billbooksresult = action.payload;
      })
      .addCase(GetBillbookscalculation.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default billbooksSlice.reducer;