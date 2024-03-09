import { createSlice } from '@reduxjs/toolkit';
import { completedSale } from '../thunks/salesThunks';
export const salesSlice = createSlice({
  name: 'ventas',
  initialState: {
    items: [],
    error: null,
    status: 'idle',
  },
  extraReducers: (builder) => {
    builder
      .addCase(completedSale.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(completedSale.fulfilled, (state) => {
        state.status = 'succeeded';
        state.error = null;
      })
      .addCase(completedSale.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error;
      });
  },
});

export default salesSlice.reducer;
