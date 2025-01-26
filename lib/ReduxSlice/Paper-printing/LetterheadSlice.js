import { Letterheadcalculation } from "@/lib/API/Letterhead";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";



export const GetLetterheadcalculation = createAsyncThunk(
  "category/GetLetterheadcalculation",
  async (data, { rejectWithValue }) => {
    try {
      const response = await Letterheadcalculation(data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const letterheadSlice = createSlice({
  name: "letterhead",
  initialState: {
   letterheadresult: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(GetLetterheadcalculation.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(GetLetterheadcalculation.fulfilled, (state, action) => {
        state.loading = false;
        state.letterheadresult = action.payload;
      })
      .addCase(GetLetterheadcalculation.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default letterheadSlice.reducer;
