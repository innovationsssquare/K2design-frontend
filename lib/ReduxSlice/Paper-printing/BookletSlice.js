import { Bookletcalculation } from "@/lib/API/Booklet";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";



export const GetBookletcalculation = createAsyncThunk(
  "category/GetBookletcalculation",
  async (data, { rejectWithValue }) => {
    try {
      const response = await Bookletcalculation(data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const bookletSlice = createSlice({
  name: "booklet",
  initialState: {
    bookletresult: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(GetBookletcalculation.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(GetBookletcalculation.fulfilled, (state, action) => {
        state.loading = false;
        state.bookletresult = action.payload;
      })
      .addCase(GetBookletcalculation.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default bookletSlice.reducer;
