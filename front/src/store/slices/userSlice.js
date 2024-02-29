import { createSlice } from '@reduxjs/toolkit';
import { fetchUsersAsync } from '../thunks/userThunks';

const initialState = {
  items: [],
  status: 'idle',
  error: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    createToast: (state, action) => {
      state.toasts.push({
        id: state.toasts.length,
        message: action.payload,
      });
    },
    deleteToast: (state, action) => {
      state.toasts = state.toasts.filter((item) => item.id !== parseInt(action.payload));
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsersAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchUsersAsync.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(fetchUsersAsync.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload.error;
      });
  },
});

export default userSlice.reducer;
