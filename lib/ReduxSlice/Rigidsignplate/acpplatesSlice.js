import { Acpplatescalculation } from "@/lib/API/Rigidsignplates/Acpplates";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const GetAcpplatescalculation = createAsyncThunk(
  "category/GetAcpplatescalculation",
  async (data, { rejectWithValue }) => {
    try {
      const response = await Acpplatescalculation(data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const acpplatesSlice = createSlice({
  name: "Acpplates",
  initialState: {
   Acpplatesresult: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(GetAcpplatescalculation.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(GetAcpplatescalculation.fulfilled, (state, action) => {
        state.loading = false;
        state.Acpplatesresult = action.payload;
      })
      .addCase(GetAcpplatescalculation.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default acpplatesSlice.reducer;
