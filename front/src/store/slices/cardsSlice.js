import { createSlice } from '@reduxjs/toolkit';
import { fetchCards, fetchPuntosSelector, fetchFilteredCards } from '../thunks/cardsThunks';

const cardsSlice = createSlice({
  name: 'cards',
  initialState: {
    puntos: [],
    allItems: [],
    filteredItems: [],
    filters: {
      id: '',
      name: '',
      filtroMarca: '',
      filtroPrecio: '',
      precio: '',
      alfabetico: '',
      calificacion: '',
    },
    status: 'idle',
    error: null,
  },
  reducers: {
    setFilterId: (state, action) => {
      state.filters.id = action.payload;
    },
    setFilterName: (state, action) => {
      state.filters.name = action.payload;
    },
    setFilterMarca: (state, action) => {
      state.filters.filtroMarca = action.payload;
    },
    setFilterPrecio: (state, action) => {
      state.filters.filtroPrecio = action.payload;
    },
    setOrderPrecio: (state, action) => {
      state.filters.precio = action.payload;
    },
    setOrderAlfabetico: (state, action) => {
      state.filters.alfabetico = action.payload;
    },
    setOrderCalificacion: (state, action) => {
      state.filters.calificacion = action.payload;
    },
    resetFilters: (state) => {
      state.filters = {
        ...state.filters,
        name: '',
        filtroMarca: '',
        filtroPrecio: '',
        precio: '',
        alfabetico: '',
        calificacion: '',
      };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCards.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchCards.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.allItems = action.payload;
      })
      .addCase(fetchCards.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(fetchFilteredCards.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchFilteredCards.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.filteredItems = action.payload;
      })
      .addCase(fetchFilteredCards.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(fetchPuntosSelector.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchPuntosSelector.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.puntos = action.payload;
      })
      .addCase(fetchPuntosSelector.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const {
  setFilterId,
  setFilterName,
  setFilterMarca,
  setFilterPrecio,
  setOrderPrecio,
  setOrderAlfabetico,
  setOrderCalificacion,
  resetFilters,
} = cardsSlice.actions;
export default cardsSlice.reducer;
