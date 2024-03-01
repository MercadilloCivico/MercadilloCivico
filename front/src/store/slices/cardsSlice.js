import { createSlice } from '@reduxjs/toolkit';
import { fetchCards } from '../thunks/cardsThunks';

const cardsSlice = createSlice({
  name: 'cards',
  initialState: {
    items: [],
    status: 'idle',
    error: null,
  },
  reducers: {
    searchCards(state, action) {
      state.items = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCards.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchCards.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(fetchCards.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const { searchCards } = cardsSlice.actions;
export default cardsSlice.reducer;
