
import { Pavtibookscalculation } from "@/lib/API/Pavtibooks";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";


export const GetPavtibookscalculation = createAsyncThunk(
  "category/GetPavtibookscalculation",
  async (data, { rejectWithValue }) => {
    try {
      const response = await Pavtibookscalculation(data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const pavtibooksSlice = createSlice({
  name: "Pavtibooks",
  initialState: {
    Pavtibooksresult: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(GetPavtibookscalculation.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(GetPavtibookscalculation.fulfilled, (state, action) => {
        state.loading = false;
        state.Pavtibooksresult = action.payload;
      })
      .addCase(GetPavtibookscalculation.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default pavtibooksSlice.reducer;