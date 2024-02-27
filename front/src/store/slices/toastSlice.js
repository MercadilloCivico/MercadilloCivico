import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  toasts: [],
};

const toastSlice = createSlice({
  name: 'toast',
  initialState,
  reducers: {
    createToast: (state, action) => {
      state.toasts = state.toasts.concat(action.payload);
    },
  },
});

export const { createToast } = toastSlice.actions;
export default toastSlice.reducer;
