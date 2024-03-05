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
      formData.append('marca', productData.marca);
      formData.append('image', productData.photo);
      formData.append('proveedoresCostos', JSON.stringify(productData.proveedoresCostos));
      // formData.append('calification', productData.calification);

      const response = await axios.post(`${VITE_API_URL}/postProduct`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data);
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
export const postReviewAsyncThunk = createAsyncThunk(
  'products/postReviewAsyncThunk',
  async (body, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${VITE_API_URL}/resenas`, body, { withCredentials: true });
      return response.data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.response.data);
    }
  }
);

// Thunk para añadir una reseña a un producto
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
