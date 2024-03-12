import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const VITE_API_URL = import.meta.env.VITE_API_URL;

// Crear un nuevo inventory
export const createInventoryThunk = createAsyncThunk(
  'inventory/create',
  async (inventoryData, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${VITE_API_URL}/inventario`, inventoryData, {
        withCredentials: true,
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Obtener inventory(s)
export const fetchInventoryThunk = createAsyncThunk(
  'inventory/fetch',
  async (id, { rejectWithValue }) => {
    try {
      const url = id ? `${VITE_API_URL}/inventario/${id}` : VITE_API_URL;
      const response = await axios.get(url);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Actualizar un inventory
export const updateInventoryThunk = createAsyncThunk(
  'inventory/update',
  async (inventoryData, { rejectWithValue }) => {
    try {
      const response = await axios.put(`${VITE_API_URL}/inventario`, inventoryData, {
        withCredentials: true,
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Eliminar un inventory
export const deleteInventoryThunk = createAsyncThunk(
  'inventory/delete',
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.delete(`${VITE_API_URL}/inventario/${id}`, {
        withCredentials: true,
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
