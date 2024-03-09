import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
const VITE_API_URL = import.meta.env.VITE_API_URL;

// Thunk para añadir un historial de venta a un usuario
export const completedSale = createAsyncThunk(
  'sales/completedSale',
  async (body, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${VITE_API_URL}/historialCompra`, body, {
        withCredentials: true,
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
