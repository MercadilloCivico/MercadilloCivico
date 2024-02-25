import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
const VITE_API_URL = import.meta.env.VITE_API_URL;

// Thunk para obtener productos (todos o por ID)
export const fetchProductsAsync = createAsyncThunk(
  'products/fetchProductsAsync',
  async (pid, { rejectWithValue }) => {
    try {
      const url = pid ? `${VITE_API_URL}/product/${pid}` : `${VITE_API_URL}/product`;
      const response = await axios.get(url);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Thunk para agregar un producto
export const addProductAsync = createAsyncThunk(
  'products/addProductAsync',
  async (productData, { rejectWithValue }) => {
    try {
      const formData = new FormData();
      formData.append('name', productData.name);
      formData.append('description', productData.description);
      formData.append('calification', productData.calification);
      formData.append('marca', productData.marca);
      formData.append('image', productData.image);
      productData.proveedoresCostos.forEach((pc, index) => {
        formData.append(`proveedoresCostos[${index}][proveedor_id]`, pc.proveedor_id);
        formData.append(`proveedoresCostos[${index}][costo]`, pc.costo);
      });

      const response = await axios.post(`${VITE_API_URL}/postProduct`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Thunk para eliminar un producto lógicamente
export const logicDeleteProductAsync = createAsyncThunk(
  'products/logicDeleteProductAsync',
  async (pid, { rejectWithValue }) => {
    try {
      const response = await axios.delete(`${VITE_API_URL}/productoLogic/${pid}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Thunk para eliminar un producto permanentemente
export const trueDeleteProductAsync = createAsyncThunk(
  'products/trueDeleteProductAsync',
  async (pid, { rejectWithValue }) => {
    try {
      const response = await axios.delete(`${VITE_API_URL}/productoTrue/${pid}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
