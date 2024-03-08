import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
const VITE_API_URL = import.meta.env.VITE_API_URL;

// Thunk para obtener productos (todos o por ID)
export const fetchProductsAsync = createAsyncThunk(
  'products/fetchProductsAsync',
  async (param, { rejectWithValue }) => {
    try {
      const url = param ? `${VITE_API_URL}/product/?name=${param}` : `${VITE_API_URL}/product`;
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

// Thunk para añadir una reseña
export const postReviewAsyncThunk = createAsyncThunk(
  'products/postReviewAsyncThunk',
  async (body, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${VITE_API_URL}/resenas`, body, { withCredentials: true });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Thunk para editar una reseña
export const putReviewAsyncThunk = createAsyncThunk(
  'products/putReviewAsyncThunk',
  async ({ id, body }, { rejectWithValue }) => {
    try {
      const response = await axios.put(`${VITE_API_URL}/resenas/${id}`, body, {
        withCredentials: true,
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Thunk para eliminar una reseña
export const deleteReviewAsyncThunk = createAsyncThunk(
  'products/deleteReviewAsyncThunk',
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.delete(
        `${VITE_API_URL}/resenas/${id}`,
        {},
        { withCredentials: true }
      );
      return response.data;
    } catch (error) {
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

// Thunk para editar productos
export const editProductAsync = createAsyncThunk(
  'products/editProductAsync',
  async (productData, { rejectWithValue }) => {
    try {
      const formData = new FormData();
      formData.append('name', productData.name);
      formData.append('description', productData.description);
      formData.append('marca', productData.marca);
      formData.append('image', productData.fiImg);
      formData.append('idProveedorActual', productData.idProveedorActual);
      formData.append('proveedoresCostos', JSON.stringify(productData.proveedoresCostos));
      const response = await axios.put(`${VITE_API_URL}/product/edit/${productData.id}`, formData, {
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
