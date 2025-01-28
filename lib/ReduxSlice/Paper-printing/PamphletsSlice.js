import { Pamphletcalculation } from "@/lib/API/Pamphlets";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";



export const GetPamphletCalculation = createAsyncThunk(
  "category/GetPamphletCalculation",
  async (data, { rejectWithValue }) => {
    try {
      const response = await Pamphletcalculation(data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const PamphletsSlice = createSlice({
  name: "pamphlets",
  initialState: {
    pamphletsresult: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(GetPamphletCalculation.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(GetPamphletCalculation.fulfilled, (state, action) => {
        state.loading = false;
        state.pamphletsresult = action.payload;
      })
      .addCase(GetPamphletCalculation.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default PamphletsSlice.reducer;


