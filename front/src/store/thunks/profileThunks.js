import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
const VITE_API_URL = import.meta.env.VITE_API_URL;

// Thunk para obtener la info del usuario por ID
export const fetchUserProfileAsync = createAsyncThunk(
  'users/fetchUserProfileAsync',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${VITE_API_URL}/user/profile`, { withCredentials: true });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const deleteUserProfileAsync = createAsyncThunk(
  'users/deleteUserProfileAsync',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.delete(`${VITE_API_URL}/delete/user`, {
        withCredentials: true,
      });

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
