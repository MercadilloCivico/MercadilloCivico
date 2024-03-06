import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
const VITE_API_URL = import.meta.env.VITE_API_URL;

export const getCartIdThunk = createAsyncThunk('cart/fetchCart', async (_, { rejectWithValue }) => {
  try {
    const { data } = await axios.get(`${VITE_API_URL}/carrito_de_compras`, {
      withCredentials: true,
    });
    console.log('🚀 ~ getCartIdThunk ~ data:', data);
    return data.id;
  } catch (error) {
    console.log('🚀 ~ getCartIdThunk ~ error:', error);
    return rejectWithValue(error.response.data);
  }
});

export const addProductToCartDBThunk = createAsyncThunk(
  'cart/addCartDB',
  async (body, { rejectWithValue }) => {
    try {
      const { data } = await axios.put(`${VITE_API_URL}/carrito_de_compras/add`, body, {
        withCredentials: true,
      });
      console.log('🚀 ~ data:', data);
      return data;
    } catch (error) {
      console.log('🚀 ~ error:', error);
      return rejectWithValue(error.response.data);
    }
  }
);

export const removeProductFromCartDBThunk = createAsyncThunk(
  'cart/removeCartDB',
  async (body, { rejectWithValue }) => {
    console.log('🚀 ~ body:', body);
    try {
      const { data } = await axios.put(`${VITE_API_URL}/carrito_de_compras/remove`, body, {
        withCredentials: true,
      });
      console.log('🚀 ~ data:', data);
      return data;
    } catch (error) {
      console.log('🚀 ~ error:', error);
      return rejectWithValue(error.response.data);
    }
  }
);

export const getCartDBThunk = createAsyncThunk('cart/getCartDB', async (_, { rejectWithValue }) => {
  try {
    const { data } = await axios.get(`${VITE_API_URL}/carrito_de_compras`, {
      withCredentials: true,
    });
    console.log('🚀 ~ getCartDBThunk ~ data:', data);
    return data;
  } catch (error) {
    console.log('🚀 ~ getCartDBThunk ~ error:', error);
    return rejectWithValue(error.response.data);
  }
});

export const updateProductQtyDBThunk = createAsyncThunk(
  'cart/updateProductQtyDB',
  async (body, { rejectWithValue }) => {
    console.log('🚀 ~ body:', body);
    try {
      const { data } = await axios.put(`${VITE_API_URL}/carrito_de_compras/cantidad`, body, {
        withCredentials: true,
      });
      console.log('🚀 ~ data:', data);
      return data;
    } catch (error) {
      console.log('🚀 ~ error:', error);
      return rejectWithValue(error.response.data);
    }
  }
);

export const cleanCartDBThunk = createAsyncThunk(
  'cart/cleanCartDB',
  async (id, { rejectWithValue }) => {
    console.log('🚀 ~ id:', id);
    try {
      const { data } = await axios.put(
        `${VITE_API_URL}/carrito_de_compras/limpiar`,
        { id },
        {
          withCredentials: true,
        }
      );
      console.log('🚀 ~ data:', data);
      return data;
    } catch (error) {
      console.log('🚀 ~ error:', error);
      return rejectWithValue(error.response.data);
    }
  }
);
