import { createSlice } from '@reduxjs/toolkit';
import {
  addProductAsync,
  fetchProductsAsync,
  logicDeleteProductAsync,
  postReviewAsyncThunk,
  trueDeleteProductAsync,
} from '../thunks/productThunks';

function applyFiltersAndSort(state) {
  let filtered = [...state.items];

  if (state.filters.brand) {
    filtered = filtered.filter((item) => item.brand === state.filters.brand);
  }
  if (state.filters.priceRange.minPrice !== null && state.filters.priceRange.maxPrice !== null) {
    filtered = filtered.filter(
      (item) =>
        item.precio >= state.filters.priceRange.minPrice &&
        item.precio <= state.filters.priceRange.maxPrice
    );
  }

  if (state.sorts.sortOrder === 'asc') {
    filtered.sort((a, b) => a.precio - b.precio);
  } else if (state.sorts.sortOrder === 'desc') {
    filtered.sort((a, b) => b.precio - a.precio);
  }

  if (state.sorts.sortRating === 'asc') {
    filtered.sort((a, b) => a.calification - b.calification);
  } else if (state.sorts.sortRating === 'desc') {
    filtered.sort((a, b) => b.calification - a.calification);
  }

  state.filteredItems = filtered;
}

export const productSlice = createSlice({
  name: 'products',
  initialState: {
    items: [
      {
        id: 1,
        name: 'Manzana',
        description:
          'Input product name and keywords, separated by commas, describing key characteristics and attributes.',
        calification: 4.5,
        brand: 'Frutal',
        image: 'https://www.pngkey.com/png/full/932-9328480_apples-png-image-red-apple-fruit.png',
        precio: 200,
        proveedoresCostos: [
          { proveedor_id: 1, costo: 100 },
          { proveedor_id: 2, costo: 95 },
        ],
      },
      {
        id: 2,
        name: 'Pera',
        description:
          'Input product name and keywords, separated by commas, describing key characteristics and attributes.',
        calification: 3.5,
        brand: 'Frutal',
        image: 'https://www.pngkey.com/png/full/932-9328480_apples-png-image-red-apple-fruit.png',
        precio: 150,
        proveedoresCostos: [
          { proveedor_id: 3, costo: 200 },
          { proveedor_id: 4, costo: 190 },
        ],
      },
      {
        id: 3,
        name: 'Cereal',
        description:
          'Input product name and keywords, separated by commas, describing key characteristics and attributes.',
        calification: 2.5,
        brand: 'Maiz',
        image: 'https://www.pngkey.com/png/full/932-9328480_apples-png-image-red-apple-fruit.png',
        precio: 400,
        proveedoresCostos: [
          { proveedor_id: 3, costo: 200 },
          { proveedor_id: 4, costo: 190 },
        ],
      },
      {
        id: 4,
        name: 'Chocolate',
        description:
          'Input product name and keywords, separated by commas, describing key characteristics and attributes.',
        calification: 1.3,
        brand: 'Chatarra',
        image: 'https://www.pngkey.com/png/full/932-9328480_apples-png-image-red-apple-fruit.png',
        precio: 1000,
        proveedoresCostos: [
          { proveedor_id: 3, costo: 200 },
          { proveedor_id: 4, costo: 190 },
        ],
      },
      {
        id: 5,
        name: 'Manzana',
        description:
          'Input product name and keywords, separated by commas, describing key characteristics and attributes.',
        calification: 4.5,
        brand: 'Frutal',
        image: 'https://www.pngkey.com/png/full/932-9328480_apples-png-image-red-apple-fruit.png',
        precio: 600,
        proveedoresCostos: [
          { proveedor_id: 5, costo: 150 },
          { proveedor_id: 6, costo: 145 },
        ],
      },
      {
        id: 6,
        name: 'Pera',
        description:
          'Input product name and keywords, separated by commas, describing key characteristics and attributes.',
        calification: 3.5,
        brand: 'Frutal',
        image: 'https://www.pngkey.com/png/full/932-9328480_apples-png-image-red-apple-fruit.png',
        precio: 800,
        proveedoresCostos: [
          { proveedor_id: 5, costo: 150 },
          { proveedor_id: 6, costo: 145 },
        ],
      },
      {
        id: 7,
        name: 'Cereal',
        description:
          'Input product name and keywords, separated by commas, describing key characteristics and attributes.',
        calification: 2.5,
        brand: 'Maiz',
        image: 'https://www.pngkey.com/png/full/932-9328480_apples-png-image-red-apple-fruit.png',
        precio: 530,
        proveedoresCostos: [
          { proveedor_id: 1, costo: 100 },
          { proveedor_id: 2, costo: 95 },
        ],
      },
      {
        id: 8,
        name: 'Chocolate',
        description:
          'Input product name and keywords, separated by commas, describing key characteristics and attributes.',
        calification: 1.3,
        brand: 'Chatarra',
        image: 'https://www.pngkey.com/png/full/932-9328480_apples-png-image-red-apple-fruit.png',
        precio: 900,
        proveedoresCostos: [
          { proveedor_id: 5, costo: 150 },
          { proveedor_id: 6, costo: 145 },
        ],
      },
    ],
    filteredItems: [],
    status: 'idle',
    error: null,
    filters: {
      brand: null,
      priceRange: { minPrice: null, maxPrice: null },
    },
    sorts: {
      sortOrder: null,
      sortRating: null,
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

    sortByPrice(state, action) {
      state.sorts.sortOrder = action.payload;
      applyFiltersAndSort(state);
    },
    sortByRating(state, action) {
      state.sorts.sortRating = action.payload;
      applyFiltersAndSort(state);
    },
    filterByBrand(state, action) {
      state.filters.brand = action.payload;
      applyFiltersAndSort(state);
    },
    filterByPriceRange(state, action) {
      const { minPrice, maxPrice } = action.payload;
      state.filters.priceRange = { minPrice, maxPrice };
      applyFiltersAndSort(state);
    },
    resetFilters(state) {
      state.filteredItems = [...state.items];
      state.filters = { brand: null, priceRange: { minPrice: null, maxPrice: null } };
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
        state.filteredItems.push(newItem);
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
        state.filteredItems = state.filteredItems.filter((product) => product.id !== idToRemove);
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
        state.filteredItems = state.filteredItems.filter((product) => product.id !== idToRemove);
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
        state.filteredItems = action.payload;
      })
      .addCase(fetchProductsAsync.rejected, (state, action) => {
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
      });
  },
});

export const {
  setProducts,
  addProduct,
  removeProduct,
  setStatus,
  setError,
  sortByPrice,
  sortByRating,
  filterByBrand,
  filterByPriceRange,
  resetFilters,
} = productSlice.actions;

export default productSlice.reducer;
