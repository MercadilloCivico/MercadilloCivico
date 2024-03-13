import { createSlice } from '@reduxjs/toolkit';

import {
  fetchProvidersAsync,
  addProvider,
  putProvider,
  deleteProvider,
} from '../thunks/providerThunks.js';

const providersSlice = createSlice({
  name: 'providers',
  initialState: {
    providerArray: [],
    providersByName: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    //Obtener proveedores
    builder
      .addCase(fetchProvidersAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchProvidersAsync.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.providerArray = action.payload;
      })
      .addCase(fetchProvidersAsync.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload.message;
      });
    builder
      .addCase(addProvider.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(addProvider.fulfilled, (state) => {
        state.status = 'succeeded';
      })
      .addCase(addProvider.rejected, (state) => {
        state.status = 'failed';
      });
    builder
      .addCase(putProvider.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(putProvider.fulfilled, (state) => {
        state.status = 'succeeded';
      })
      .addCase(putProvider.rejected, (state) => {
        state.status = 'failed';
      });
    builder
      .addCase(deleteProvider.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(deleteProvider.fulfilled, (state) => {
        state.status = 'succeeded';
      })
      .addCase(deleteProvider.rejected, (state) => {
        state.status = 'failed';
      });
  },
});

export default providersSlice.reducer;
