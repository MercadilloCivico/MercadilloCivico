import { createSlice } from '@reduxjs/toolkit';
import {
  addProductAsync,
  deleteReviewAsyncThunk,
  fetchProductsAsync,
  logicDeleteProductAsync,
  postReviewAsyncThunk,
  putReviewAsyncThunk,
  trueDeleteProductAsync,
  fetchFilteredProducts,
  fetchProductIdsAsync,
} from '../thunks/productThunks';

export const productSlice = createSlice({
  name: 'products',
  initialState: {
    items: [],
    status: 'idle',
    error: null,
    filters: {
      id: '',
      filtroEstado: '',
      filtroPrecio: '',
      name: '',
    },
  },
  reducers: {
    setProducts(state, action) {
      state.items = action.payload;
      state.filteredItems = action.payload;
    },
    addProduct(state, action) {
      state.items.push(action.payload);
    },
    removeProduct(state, action) {
      state.items = state.items.filter((product) => product.id !== action.payload);
      state.filteredItems = state.filteredItems.filter((product) => product.id !== action.payload);
    },
    setStatus(state, action) {
      state.status = action.payload;
    },
    setError(state, action) {
      state.error = action.payload;
    },
    setFilterEstado: (state, action) => {
      state.filters.filtroEstado = action.payload;
    },
    setFilterPrecio: (state, action) => {
      state.filters.filtroPrecio = action.payload;
    },
    setName: (state, action) => {
      state.filters.name = action.payload;
    },
    resetFilters: (state) => {
      state.filters = {
        ...state.filters,
        filtroEstado: '',
        filtroPrecio: '',
      };
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
        const newItem = action.payload.data;
        state.items.push(newItem);
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
        const idToRemove = action.meta.arg;
        state.items = state.items.filter((product) => product.id !== idToRemove);
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
        const idToRemove = action.meta.arg;
        state.items = state.items.filter((product) => product.id !== idToRemove);
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

    // Manejo de obtener productos por ID
    builder
      .addCase(fetchProductIdsAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchProductIdsAsync.fulfilled, (state) => {
        state.status = 'succeeded';
      })
      .addCase(fetchProductIdsAsync.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload.message;
      });

    //Manejo de reseñas
    builder
      .addCase(postReviewAsyncThunk.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(postReviewAsyncThunk.fulfilled, (state) => {
        state.status = 'succeded';
      })
      .addCase(postReviewAsyncThunk.rejected, (state) => {
        state.status = 'failed';
      })
      .addCase(putReviewAsyncThunk.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(putReviewAsyncThunk.fulfilled, (state) => {
        state.status = 'succeded';
      })
      .addCase(putReviewAsyncThunk.rejected, (state) => {
        state.status = 'failed';
      })
      .addCase(deleteReviewAsyncThunk.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(deleteReviewAsyncThunk.fulfilled, (state) => {
        state.status = 'succeded';
      })
      .addCase(deleteReviewAsyncThunk.rejected, (state) => {
        state.status = 'failed';
      });

    // Manejo de filtros
    builder
      .addCase(fetchFilteredProducts.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchFilteredProducts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(fetchFilteredProducts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const {
  setProducts,
  addProduct,
  removeProduct,
  setStatus,
  setError,
  setFilterEstado,
  setFilterPrecio,
  setName,
  resetFilters,
} = productSlice.actions;

export default productSlice.reducer;
