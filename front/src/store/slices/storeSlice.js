import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  showDropdownCard: false,
  items: [],
  status: 'idle',
};

const storeSlice = createSlice({
  name: 'store',
  initialState,
  reducers: {
    switchCard: (state) => {
      state.showDropdownCard = !state.showDropdownCard;
    },
  },
});

export const { switchCard } = storeSlice.actions;
export default storeSlice.reducer;
