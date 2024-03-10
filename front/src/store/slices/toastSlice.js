import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  toasts: [],
};

const toastSlice = createSlice({
  name: 'toast',
  initialState,
  reducers: {
    createToast: (state, action) => {
      state.toasts.push({
        id: Date.now(),
        message: action.payload,
      });
    },
    deleteToast: (state, action) => {
      state.toasts = state.toasts.filter((item) => item.id !== parseInt(action.payload));
    },
  },
});

export const { createToast, deleteToast } = toastSlice.actions;
export default toastSlice.reducer;
