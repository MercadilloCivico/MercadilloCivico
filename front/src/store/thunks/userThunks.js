import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
const VITE_API_URL = import.meta.env.VITE_API_URL;
const regexUuID = /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/;

// Thunk para obtener usuarios (todos o por ID)
export const fetchUsersAsync = createAsyncThunk(
  'users/fetchUsersAsync',
  async (param, { rejectWithValue }) => {
    try {
      let url;
      if (regexUuID.test(param)) {
        url = `${VITE_API_URL}/user/info/${param}`;
      } else if (!regexUuID.test(param) && param) {
        url = `${VITE_API_URL}/user/info/?name=${param}`;
      } else {
        url = `${VITE_API_URL}/user/info/`;
      }
      const response = await axios.get(url);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Thunk para eliminar un usuario lógicamente
export const logicDeleteUsersAsync = createAsyncThunk(
  'users/logicDeleteUsersAsync',
  async (uid, { rejectWithValue }) => {
    try {
      const response = await axios.put(`${VITE_API_URL}/disable/usuario/${uid}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Thunk para eliminar un usuario permanentemente
export const trueDeleteUsersAsync = createAsyncThunk(
  'users/trueDeleteUsersAsync',
  async (uid, { rejectWithValue }) => {
    try {
      const response = await axios.delete(`${VITE_API_URL}/delete/usuario/${uid}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
