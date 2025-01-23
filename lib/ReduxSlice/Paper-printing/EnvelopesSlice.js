import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";


import { Envelopescalculation } from "@/lib/API/Envelopes";

export const GetEnvelopesCalculation = createAsyncThunk(
  "category/GetEnvelopesCalculation",
  async (data, { rejectWithValue }) => {
    try {
      const response = await Envelopescalculation(data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const envelopeSlice = createSlice({
  name: "Envelope",
  initialState: {
    envelopesresult: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(GetEnvelopesCalculation.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(GetEnvelopesCalculation.fulfilled, (state, action) => {
        state.loading = false;
        state.envelopesresult = action.payload;
      })
      .addCase(GetEnvelopesCalculation.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default envelopeSlice.reducer;


