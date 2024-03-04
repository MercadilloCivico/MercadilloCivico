import { createSlice } from '@reduxjs/toolkit';
import {
  addFavorite as addFavoriteThunk,
  removeFavorite,
  getAllFavorite,
} from '../thunks/favoritesThuks.js';

const initialState = {
  status: 'idle',
  userFavorites: [],
};

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Casos para addFavoriteThunk.pending, addFavoriteThunk.fulfilled y addFavoriteThunk.rejected
    builder
      .addCase(addFavoriteThunk.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(addFavoriteThunk.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.userFavorites = action.payload;
      })
      .addCase(addFavoriteThunk.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload.error;
      });

    // Casos para removeFavorite.pending, removeFavorite.fulfilled y removeFavorite.rejected
    builder
      .addCase(removeFavorite.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(removeFavorite.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.userFavorites = action.payload;
      })
      .addCase(removeFavorite.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload.error;
      });

    // Casos para getAllFavorite.pending, getAllFavorite.fulfilled y getAllFavorite.rejected
    builder
      .addCase(getAllFavorite.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getAllFavorite.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.userFavorites = action.payload;
      })
      .addCase(getAllFavorite.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload.error;
      });
  },
});

export const {
  addFavorite: addFavoriteAction,
  getAllFavorite: getAllFavoriteAction,
  removeFavorite: removeFavoriteAction,
} = favoritesSlice.actions;

export default favoritesSlice.reducer;
