import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
const VITE_API_URL = import.meta.env.VITE_API_URL;

export const fetchProvidersAsync = createAsyncThunk(
  'providers/fetchProvidersAsync',
  async (pid, { rejectWithValue }) => {
    try {
      const url = pid ? `${VITE_API_URL}/proveedor/${pid}` : `${VITE_API_URL}/proveedor`;
      const response = await axios.get(url);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
