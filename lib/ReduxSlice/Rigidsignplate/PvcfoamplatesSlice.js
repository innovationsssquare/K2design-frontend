import { Pvcfoamplatescalculation } from "@/lib/API/Rigidsignplates/Pvcfoamplate";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const GetPvcfoamplatescalculation = createAsyncThunk(
  "category/GetPvcfoamplatescalculation",
  async (data, { rejectWithValue }) => {
    try {
      const response = await Pvcfoamplatescalculation(data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const pvcfoamplatesSlice = createSlice({
  name: "Pvcfoamplates",
  initialState: {
   Pvcfoamplatesresult: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(GetPvcfoamplatescalculation.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(GetPvcfoamplatescalculation.fulfilled, (state, action) => {
        state.loading = false;
        state.Pvcfoamplatesresult = action.payload;
      })
      .addCase(GetPvcfoamplatescalculation.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default pvcfoamplatesSlice.reducer;
