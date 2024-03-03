import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
const VITE_API_URL = import.meta.env.VITE_API_URL;

export const addFavorite = createAsyncThunk('favorites/add', async (id, { rejectWithValue }) => {
  try {
    const { data } = await axios.post(
      `${VITE_API_URL}/favorites/${id}`,
      {},
      {
        withCredentials: true,
      }
    );
    return data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

export const removeFavorite = createAsyncThunk(
  'favorites/remove',
  async (id, { rejectWithValue }) => {
    try {
      await axios.delete(`${VITE_API_URL}/favorites/${id}`, {
        withCredentials: true,
      });
      return true;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const getAllFavorite = createAsyncThunk(
  'favorites/getAllFavorites',
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(`${VITE_API_URL}/favorites`, {
        withCredentials: true,
      });

      return data[0].favorites;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
