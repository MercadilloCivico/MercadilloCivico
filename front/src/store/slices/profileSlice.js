import { createSlice } from '@reduxjs/toolkit';
import { fetchUserProfileAsync } from '../thunks/profileThunks';

const initialState = {
  items: [],
  status: 'idle',
  error: null,
  data: {},
};

const userSlice = createSlice({
  name: 'userData',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Casos para fetchUserProfileAsync
      .addCase(fetchUserProfileAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchUserProfileAsync.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
        state.data = action.payload;
      })
      .addCase(fetchUserProfileAsync.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload.error;
      });
  },
});

export default userSlice.actions;
