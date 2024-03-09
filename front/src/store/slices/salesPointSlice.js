import { createSlice } from '@reduxjs/toolkit';

import {
  fetchSalesPointsAsync,
  postPuntoDeVenta,
  deletePuntoDeVenta,
  putPuntoDeVenta,
} from '../thunks/salesPointThunks';

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
    builder
      .addCase(deletePuntoDeVenta.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(deletePuntoDeVenta.fulfilled, (state, action) => {
        state.status = 'succeeded';
        const idToRemove = action.meta.arg;
        state.items = state.items.filter((product) => product.id !== idToRemove);
      })
      .addCase(deletePuntoDeVenta.rejected, (state) => {
        state.status = 'failed';
      });
    builder
      .addCase(putPuntoDeVenta.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(putPuntoDeVenta.fulfilled, (state) => {
        state.status = 'succeeded';
      })
      .addCase(putPuntoDeVenta.rejected, (state) => {
        state.status = 'failed';
      });
  },
});

export default salesPointSlice.reducer;
