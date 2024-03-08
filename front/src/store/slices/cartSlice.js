import { createSlice } from '@reduxjs/toolkit';
import {
  addProductToCartDBThunk,
  cleanCartDBThunk,
  getCartDBThunk,
  getCartIdThunk,
  removeProductFromCartDBThunk,
  stripePaymentMethod,
  updateProductQtyDBThunk,
} from '../thunks/cartThunks';

export const cartSlice = createSlice({
  name: 'carrito',
  initialState: {
    idCarrito: null,
    items: [],
    totalPrice: 0,
    error: null,
    status: 'idle',
  },
  reducers: {
    clearCart: (state) => {
      state.idCarrito = null;
      state.items = [];
      state.totalPrice = 0;
      state.error = null;
      state.status = 'idle';
    },
    setTotalPrice: (state, action) => {
      state.totalPrice = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCartIdThunk.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getCartIdThunk.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.idCarrito = action.payload;
      })
      .addCase(getCartIdThunk.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error;
      })
      .addCase(addProductToCartDBThunk.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(addProductToCartDBThunk.fulfilled, (state) => {
        state.status = 'succeeded';
        state.error = null;
      })
      .addCase(addProductToCartDBThunk.rejected, (state, action) => {
        state.status = 'rejected';
        state.error = action.error;
      })
      .addCase(getCartDBThunk.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getCartDBThunk.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(getCartDBThunk.rejected, (state, action) => {
        state.status = 'rejected';
        state.error = action.error;
      })
      .addCase(removeProductFromCartDBThunk.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(removeProductFromCartDBThunk.fulfilled, (state) => {
        state.status = 'succeeded';
        state.error = null;
      })
      .addCase(removeProductFromCartDBThunk.rejected, (state, action) => {
        state.status = 'rejected';
        state.error = action.error;
      })
      .addCase(updateProductQtyDBThunk.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updateProductQtyDBThunk.fulfilled, (state) => {
        state.status = 'succeeded';
        state.error = null;
      })
      .addCase(updateProductQtyDBThunk.rejected, (state, action) => {
        state.status = 'rejected';
        state.error = action.error;
      })
      .addCase(cleanCartDBThunk.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(cleanCartDBThunk.fulfilled, (state) => {
        state.status = 'succeeded';
        state.error = null;
      })
      .addCase(cleanCartDBThunk.rejected, (state, action) => {
        state.status = 'rejected';
        state.error = action.error;
      })
      .addCase(stripePaymentMethod.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(stripePaymentMethod.fulfilled, (state) => {
        state.status = 'succeeded';
        state.error = null;
      })
      .addCase(stripePaymentMethod.rejected, (state, action) => {
        state.status = 'rejected';
        state.error = action.error;
      });
  },
});

export const { clearCart, setTotalPrice } = cartSlice.actions;

export default cartSlice.reducer;
