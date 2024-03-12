import { createSlice } from '@reduxjs/toolkit';
import {
  createInventoryThunk,
  deleteInventoryThunk,
  fetchInventoryThunk,
  updateInventoryThunk,
} from '../thunks/inventoryThunks';

export const inventorySlice = createSlice({
  name: 'inventory',
  initialState: {
    items: [],
    status: 'idle', // 'idle', 'loading', 'succeeded', 'failed'
    error: null,
  },
  reducers: {
    resetError(state) {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Crear inventory
      .addCase(createInventoryThunk.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(createInventoryThunk.fulfilled, (state, action) => {
        state.status = 'succeeded';
        if (Array.isArray(state.items)) state.items.push(action.payload);
      })
      .addCase(createInventoryThunk.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })

      // Fetch inventory
      .addCase(fetchInventoryThunk.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchInventoryThunk.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(fetchInventoryThunk.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })

      // Update inventory
      .addCase(updateInventoryThunk.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updateInventoryThunk.fulfilled, (state, action) => {
        state.status = 'succeeded';
        if (Array.isArray(state.items) && action.payload.stock) {
          const index = state.items.findIndex((item) => item.id === action.meta.arg.id);
          if (index !== -1) {
            state.items[index] = { ...state.items[index], ...action.meta.arg };
          }
        }
      })
      .addCase(updateInventoryThunk.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })

      // Delete inventory
      .addCase(deleteInventoryThunk.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(deleteInventoryThunk.fulfilled, (state, action) => {
        state.status = 'succeeded';
        if (Array.isArray(state.items)) {
          state.items = state.items.filter((item) => item.id !== action.meta.arg);
        }
      })
      .addCase(deleteInventoryThunk.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const { resetError } = inventorySlice.actions;

export default inventorySlice.reducer;
