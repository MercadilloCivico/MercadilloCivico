import { createSlice } from '@reduxjs/toolkit';

import { fetchProvidersAsync } from '../thunks/providerThunks.js';

const providersSlice = createSlice({
  name: 'providers',
  initialState: {
    providerArray: [],
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
  },
});

export default providersSlice.reducer;
