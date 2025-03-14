import {Flexbannereconomycalculation  } from "@/lib/API/Flex-printing/Flexbannereconomy";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";


export const GetFlecbannereconomycalculation = createAsyncThunk(
  "category/GetFlecbannereconomycalculation",
  async (data, { rejectWithValue }) => {
    try {
      const response = await Flexbannereconomycalculation(data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const flexbannereconomySlice = createSlice({
  name: "Flexbannereconomy",
  initialState: {
    Flexbannereconomyresult: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(GetFlecbannereconomycalculation.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(GetFlecbannereconomycalculation.fulfilled, (state, action) => {
        state.loading = false;
        state.Flexbannereconomyresult = action.payload;
      })
      .addCase(GetFlecbannereconomycalculation.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default flexbannereconomySlice.reducer;