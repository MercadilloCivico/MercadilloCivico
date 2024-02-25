import { createSlice } from '@reduxjs/toolkit';
import {
  addProductAsync,
  fetchProductsAsync,
  logicDeleteProductAsync,
  trueDeleteProductAsync,
} from '../thunks/productThunks';

export const productSlice = createSlice({
  name: 'products',
  initialState: {
    items: [],
    status: 'idle',
    error: null,
  },
  reducers: {
    setProducts(state, action) {
      state.items = action.payload;
    },
    addProduct(state, action) {
      state.items.push(action.payload);
    },
    removeProduct(state, action) {
      state.items = state.items.filter((product) => product.id !== action.payload);
    },
    setStatus(state, action) {
      state.status = action.payload;
    },
    setError(state, action) {
      state.error = action.payload;
    },
  },
  extraReducers: (builder) => {
    // Manejo de agregar producto
    builder
      .addCase(addProductAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(addProductAsync.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items.push(action.payload.data);
      })
      .addCase(addProductAsync.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload.message;
      });

    // Manejo de eliminación lógica de un producto
    builder
      .addCase(logicDeleteProductAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(logicDeleteProductAsync.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = state.items.filter((product) => product.id !== action.meta.arg);
      })
      .addCase(logicDeleteProductAsync.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload.message;
      });

    // Manejo de eliminación permanente de un producto
    builder
      .addCase(trueDeleteProductAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(trueDeleteProductAsync.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = state.items.filter((product) => product.id !== action.meta.arg);
      })
      .addCase(trueDeleteProductAsync.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload.message;
      });

    // Manejo de obtener productos
    builder
      .addCase(fetchProductsAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchProductsAsync.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(fetchProductsAsync.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload.message;
      });
  },
});

export const { setProducts, addProduct, removeProduct, setStatus, setError } = productSlice.actions;

export default productSlice.reducer;
