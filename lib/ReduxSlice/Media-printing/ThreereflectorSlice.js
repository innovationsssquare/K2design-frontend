import { Threereflectorprintcalculation } from "@/lib/API/Media-printing/Threereflector";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";


export const GetThreereflectorprintcalculation = createAsyncThunk(
  "category/GetThreereflectorprintcalculation",
  async (data, { rejectWithValue }) => {
    try {
      const response = await Threereflectorprintcalculation(data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const threereflectorprintSlice = createSlice({
  name: "Threereflectorprint",
  initialState: {
    Threereflectorprintresult: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(GetThreereflectorprintcalculation.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(GetThreereflectorprintcalculation.fulfilled, (state, action) => {
        state.loading = false;
        state.Threereflectorprintresult = action.payload;
      })
      .addCase(GetThreereflectorprintcalculation.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default threereflectorprintSlice.reducer;