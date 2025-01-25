import { Stickercalculation } from "@/lib/API/Sticker";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";



export const GetStickercalculation = createAsyncThunk(
  "category/GetStickercalculation",
  async (data, { rejectWithValue }) => {
    try {
      const response = await Stickercalculation(data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const stickerSlice = createSlice({
  name: "sticker",
  initialState: {
    stickerresult: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(GetStickercalculation.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(GetStickercalculation.fulfilled, (state, action) => {
        state.loading = false;
        state.stickerresult = action.payload;
      })
      .addCase(GetStickercalculation.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default stickerSlice.reducer;
