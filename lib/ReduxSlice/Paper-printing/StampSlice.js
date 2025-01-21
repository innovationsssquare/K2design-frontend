
import { Stampcalculation } from "@/lib/API/Stamp";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";


export const GetStampcalculation = createAsyncThunk(
  "category/GetStampcalculation",
  async (data, { rejectWithValue }) => {
    try {
      const response = await Stampcalculation(data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const stampSlice = createSlice({
  name: "stamp",
  initialState: {
    stampresult: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(GetStampcalculation.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(GetStampcalculation.fulfilled, (state, action) => {
        state.loading = false;
        state.stampresult = action.payload;
      })
      .addCase(GetStampcalculation.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default stampSlice.reducer;