import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { Brouchurecalculation} from "../API/Brochure";

export const GetBrouchurecalculation = createAsyncThunk(
  "category/GetBrouchurecalculation",
  async (data, { rejectWithValue }) => {
    try {
      const response = await Brouchurecalculation(data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);





const brochureSlice = createSlice({
  name: "brochure",
  initialState: {
    brochureresult:null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(GetBrouchurecalculation.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(GetBrouchurecalculation.fulfilled, (state, action) => {
        state.loading = false;
        state.brochureresult = action.payload;
      })
      .addCase(GetBrouchurecalculation.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })     
  },
});

export default brochureSlice.reducer;
