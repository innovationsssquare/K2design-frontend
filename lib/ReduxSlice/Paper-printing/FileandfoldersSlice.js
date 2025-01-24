import { Fileandfolderscalculation } from "@/lib/API/Filesandfolder";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";



export const GetFileandfoldersCalculation = createAsyncThunk(
  "category/GetFileandfoldersCalculation",
  async (data, { rejectWithValue }) => {
    try {
      const response = await Fileandfolderscalculation(data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const FileandfoldersSlice = createSlice({
  name: "Fileandfolders",
  initialState: {
    Fileandfoldersresult: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(GetFileandfoldersCalculation.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(GetFileandfoldersCalculation.fulfilled, (state, action) => {
        state.loading = false;
        state.Fileandfoldersresult = action.payload;
      })
      .addCase(GetFileandfoldersCalculation.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default FileandfoldersSlice.reducer;


