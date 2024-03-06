import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { clearCart } from '../slices/cartSlice';
const VITE_API_URL = import.meta.env.VITE_API_URL;

// Thunk para realizar el inicio de sesión del usuario
export const login = createAsyncThunk('auth/login', async (userData, { rejectWithValue }) => {
  try {
    const { data } = await axios.post(`${VITE_API_URL}/login`, userData, {
      withCredentials: true,
    });
    return data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

// Thunk para registrar un nuevo usuario
export const register = createAsyncThunk('auth/register', async (userData, { rejectWithValue }) => {
  const formData = new FormData();

  formData.append('firstName', userData.firstName);
  formData.append('lastName', userData.lastName);
  formData.append('email', userData.email);
  formData.append('password', userData.password);
  if (userData.secondName) formData.append('secondName', userData.secondName);
  if (userData.photo) formData.append('image', userData.photo);
  try {
    const response = await axios.post(`${VITE_API_URL}/register`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

// Thunk para cerrar sesión del usuario
export const logout = createAsyncThunk('auth/logout', async (_, { rejectWithValue, dispatch }) => {
  try {
    const { data } = await axios.post(`${VITE_API_URL}/logout`, {}, { withCredentials: true });
    dispatch(clearCart());
    return data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

// Thunk para solicitar el restablecimiento de contraseña
export const resetPassword = createAsyncThunk(
  'auth/resetPassword',
  async (email, { rejectWithValue }) => {
    try {
      const response = await axios.put(`${VITE_API_URL}/forgot/password`, {
        email,
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Thunk para crear una nueva contraseña
export const createNewPassword = createAsyncThunk(
  'auth/createNewPassword',
  async (password, { rejectWithValue }) => {
    try {
      const { data } = await axios.put(
        `${VITE_API_URL}/update/user`,
        { password },
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

// Thunk para actualizar info del perfil de usuario
export const putUser = createAsyncThunk('update/user', async (userData, { rejectWithValue }) => {
  const formData = new FormData();
  formData.append('firstName', userData.firstName);
  formData.append('lastName', userData.lastName);
  formData.append('email', userData.email);
  formData.append('password', userData.password);
  userData.secondName === ''
    ? formData.append('secondName', null)
    : formData.append('secondName', userData.secondName);
  if (userData.photo) formData.append('image', userData.photo);

  try {
    await axios.put(`${VITE_API_URL}/update/user`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      withCredentials: true,
    });
    return;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});
