import { createSlice } from '@reduxjs/toolkit';
import { fetchUsersAsync, logicDeleteUsersAsync, trueDeleteUsersAsync } from '../thunks/userThunks';

const initialState = {
  items: [],
  status: 'idle',
  error: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
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

    // Manejo de eliminación lógica de un usuario
    builder
      .addCase(logicDeleteUsersAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(logicDeleteUsersAsync.fulfilled, (state, action) => {
        state.status = 'succeeded';
        const idToRemove = action.meta.arg;
        state.items = state.items.filter((product) => product.id !== idToRemove);
      })
      .addCase(logicDeleteUsersAsync.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload.message;
      });

    // Manejo de eliminación permanente de un usuario
    builder
      .addCase(trueDeleteUsersAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(trueDeleteUsersAsync.fulfilled, (state, action) => {
        state.status = 'succeeded';
        const idToRemove = action.meta.arg;
        state.items = state.items.filter((product) => product.id !== idToRemove);
      })
      .addCase(trueDeleteUsersAsync.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload.message;
      });
  },
});

export default userSlice.reducer;
