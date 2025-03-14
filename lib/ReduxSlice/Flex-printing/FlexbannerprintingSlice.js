import {FlexBannercalculation  } from "@/lib/API/Flex-printing/Flexbannerprinting";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";


export const GetFlecbannercalculation = createAsyncThunk(
  "category/GetFlecbannercalculation",
  async (data, { rejectWithValue }) => {
    try {
      const response = await FlexBannercalculation(data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const flexbannerSlice = createSlice({
  name: "Flexbanner",
  initialState: {
    Flexbannerresult: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(GetFlecbannercalculation.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(GetFlecbannercalculation.fulfilled, (state, action) => {
        state.loading = false;
        state.Flexbannerresult = action.payload;
      })
      .addCase(GetFlecbannercalculation.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default flexbannerSlice.reducer;