import { Acryliclettercalculation } from "@/lib/API/Acrylic-letter/Acrylicletter";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const GetAcryliclettercalculation = createAsyncThunk(
  "category/GetAcryliclettercalculation",
  async (data, { rejectWithValue }) => {
    try {
      const response = await Acryliclettercalculation(data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const acryliclletterSlice = createSlice({
  name: "Acrylicletter",
  initialState: {
   Acrylicletterresult: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(GetAcryliclettercalculation.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(GetAcryliclettercalculation.fulfilled, (state, action) => {
        state.loading = false;
        state.Acrylicletterresult = action.payload;
      })
      .addCase(GetAcryliclettercalculation.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default acryliclletterSlice.reducer;
