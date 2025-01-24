import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import { InvitationCardscalculation } from "@/lib/API/InvitationCards";

export const GetInvitationCardsCalculation = createAsyncThunk(
  "category/GetInvitationCardsCalculation",
  async (data, { rejectWithValue }) => {
    try {
      const response = await InvitationCardscalculation(data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const invitationCardsSlice = createSlice({
  name: "invitationCards",
  initialState: {
    invitationCardsresult: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(GetInvitationCardsCalculation.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(GetInvitationCardsCalculation.fulfilled, (state, action) => {
        state.loading = false;
        state.invitationCardsresult = action.payload;
      })
      .addCase(GetInvitationCardsCalculation.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default invitationCardsSlice.reducer;


