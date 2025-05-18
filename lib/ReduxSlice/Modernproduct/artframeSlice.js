import { Artframecalculation } from "@/lib/API/Modernproduct/Artframe";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const GetArtframecalculation = createAsyncThunk(
  "category/GetArtframecalculation",
  async (data, { rejectWithValue }) => {
    try {
      const response = await Artframecalculation(data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const artframeSlice = createSlice({
  name: "Artframe",
  initialState: {
    Artframeresult: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(GetArtframecalculation.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(GetArtframecalculation.fulfilled, (state, action) => {
        state.loading = false;
        state.Artframeresult = action.payload;
      })
      .addCase(GetArtframecalculation.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default artframeSlice.reducer;
