import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
const VITE_API_URL = import.meta.env.VITE_API_URL;

export const getCartIdThunk = createAsyncThunk('cart/fetchCart', async (_, { rejectWithValue }) => {
  try {
    const { data } = await axios.get(`${VITE_API_URL}/carrito_de_compras`, {
      withCredentials: true,
    });
    return data.id;
  } catch (error) {
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
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const removeProductFromCartDBThunk = createAsyncThunk(
  'cart/removeCartDB',
  async (body, { rejectWithValue }) => {
    try {
      const { data } = await axios.put(`${VITE_API_URL}/carrito_de_compras/remove`, body, {
        withCredentials: true,
      });
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const getCartDBThunk = createAsyncThunk('cart/getCartDB', async (_, { rejectWithValue }) => {
  try {
    const { data } = await axios.get(`${VITE_API_URL}/carrito_de_compras`, {
      withCredentials: true,
    });
    return data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

export const updateProductQtyDBThunk = createAsyncThunk(
  'cart/updateProductQtyDB',
  async (body, { rejectWithValue }) => {
    try {
      const { data } = await axios.put(`${VITE_API_URL}/carrito_de_compras/cantidad`, body, {
        withCredentials: true,
      });
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const cleanCartDBThunk = createAsyncThunk(
  'cart/cleanCartDB',
  async (id, { rejectWithValue }) => {
    try {
      const { data } = await axios.put(
        `${VITE_API_URL}/carrito_de_compras/limpiar`,
        { id },
        {
          withCredentials: true,
        }
      );
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const stripePaymentMethod = createAsyncThunk(
  'cart/stripePaymentMethod',
  async (price, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(`${VITE_API_URL}/session/payment?price=${price}`, {
        withCredentials: true,
      });
      return data.url;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
