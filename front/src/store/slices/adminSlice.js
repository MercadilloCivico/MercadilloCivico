import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  showListCard: false,
  view: 'grid',
  items: [],
  status: 'idle',
};

const adminSlice = createSlice({
  name: 'admin',
  initialState,
  reducers: {
    switchAdminCard: (state) => {
      state.showListCard = !state.showListCard;
    },
    switchView: (state, action) => {
      state.view = action.payload;
    },
  },
});

export const { switchAdminCard, switchView } = adminSlice.actions;
export default adminSlice.reducer;
