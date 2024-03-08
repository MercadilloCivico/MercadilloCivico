import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
const VITE_API_URL = import.meta.env.VITE_API_URL;

export const fetchSalesPointsAsync = createAsyncThunk(
  'salesPoints/fetchSalesPointsAsync',
  async (pid, { rejectWithValue }) => {
    try {
      const url = pid ? `${VITE_API_URL}/punto_de_venta/${pid}` : `${VITE_API_URL}/punto_de_venta`;
      const response = await axios.get(url);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const postPuntoDeVenta = createAsyncThunk(
  'salesPoints/post',
  async (formData, { rejectWithValue }) => {
    try {
      const formSend = new FormData();
      formSend.append('companyName', formData.companyName);
      formSend.append('address', formData.address);
      formSend.append('postalCode', formData.postalCode);
      formSend.append('contactEmail', formData.contactEmail);
      formSend.append('contactTel', formData.contactTel);
      formSend.append('image', formData.image);

      const response = await axios.post(`${VITE_API_URL}/punto_de_venta`, formSend, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log(response.data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
