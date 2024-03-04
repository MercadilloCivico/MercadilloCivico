import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
const VITE_API_URL = import.meta.env.VITE_API_URL;

export const fetchCards = createAsyncThunk(
  'cards/fetchCards',
  async (info, { rejectWithValue }) => {
    try {
      const { id, name, filtroPrecio, filtroMarca, precio, alfabetico, calificacion } = info;
      let url = `${VITE_API_URL}/filtro/${id}`;
      let querys = {};
      if (name) {
        querys.name = name;
      }
      if (filtroPrecio) {
        querys.filtroPrecio = filtroPrecio;
      }
      if (filtroMarca) {
        querys.filtroMarca = filtroMarca;
      }
      if (precio) {
        querys.precio = precio;
      }
      if (alfabetico) {
        querys.alfabetico = alfabetico;
      }
      if (calificacion) {
        querys.calificacion = calificacion;
      }
      if (Object.keys(querys).length === 0) {
        const response = await axios.get(url); // Sin parámetros
        return response.data;
      }
      const response = await axios.get(url, { params: querys });
      return response.data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.response);
    }
  }
);

export const fetchPuntosSelector = createAsyncThunk(
  'cards/fetchPuntosSelector',
  async (_, { rejectWithValue }) => {
    try {
      let url = `${VITE_API_URL}/punto_de_venta`;
      const response = await axios.get(url);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response ? error.response.data : error.message);
    }
  }
);
