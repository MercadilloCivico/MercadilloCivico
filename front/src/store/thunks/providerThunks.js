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

export const addProvider = createAsyncThunk(
  'providers/addProvider',
  async (dataForm, { rejectWithValue }) => {
    try {
      const ubicacionString = dataForm.ubicacion.join('-');
      const formData = new FormData();
      formData.append('nameProv', dataForm.nameProv);
      formData.append('ubicacion', ubicacionString);
      formData.append('tel', dataForm.tel);
      formData.append('camaraDeComercio', dataForm.camaraDeComercio);
      formData.append('certificadoBancario', dataForm.certificadoBancario);
      const { data } = await axios.post(`${VITE_API_URL}/proveedor`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        withCredentials: true,
      });
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
