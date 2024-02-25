import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
const VITE_API_URL = import.meta.env.VITE_API_URL;

// Thunk para realizar el inicio de sesión del usuario
export const login = createAsyncThunk('auth/login', async (userData, { rejectWithValue }) => {
  try {
    const response = await axios.post(`${VITE_API_URL}/login`, userData);
    return {
      token: response.data.token,
      user: { email: userData.email },
    };
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
  if (userData.photo) formData.append('photo', userData.photo);

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
export const logout = createAsyncThunk('auth/logout', async (_, { rejectWithValue }) => {
  try {
    const response = await axios.post('/logout');
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

// Thunk para solicitar el restablecimiento de contraseña
export const resetPassword = createAsyncThunk(
  'auth/resetPassword',
  async ({ email }, { rejectWithValue }) => {
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
  async ({ newPassword }, { rejectWithValue }) => {
    try {
      // El token se envía automáticamente en la cookie `httpOnly` que se creó en el back
      const response = await axios.put(`${VITE_API_URL}/update/user`, {
        password: newPassword,
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Thunk para autenticación con Google
export const googleAuth = createAsyncThunk('auth/googleAuth', async (_, { rejectWithValue }) => {
  try {
    const response = await axios.get(`${VITE_API_URL}/auth/google/`);
    return { token: response.data.token, user: response.data.user };
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});
