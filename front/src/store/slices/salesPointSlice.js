import { createSlice } from '@reduxjs/toolkit';

import { fetchSalesPointsAsync, postPuntoDeVenta } from '../thunks/salesPointThunks';

const salesPointSlice = createSlice({
  name: 'salesPoint',
  initialState: {
    items: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    //Obtener puntos de venta
    builder
      .addCase(fetchSalesPointsAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchSalesPointsAsync.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(fetchSalesPointsAsync.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload.message;
      });
    builder
      .addCase(postPuntoDeVenta.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(postPuntoDeVenta.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items.push(action.payload.puntoNuevo);
      })
      .addCase(postPuntoDeVenta.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload.message;
      });
  },
});

export default salesPointSlice.reducer;
