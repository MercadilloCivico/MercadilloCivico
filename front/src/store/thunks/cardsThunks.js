import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
const VITE_API_URL = import.meta.env.VITE_API_URL;
// const onlyLetters = /^[A-Za-zÁáÉéÍíÓóÚúÑñ]{1,15}$/;

export const fetchCards = createAsyncThunk(
  'cards/fetchCards',
  async (info, { rejectWithValue }) => {
    try {
      const { name, id } = info;
      let url = `${VITE_API_URL}/filtro/${id}/?name=${name}`;
      //   if (onlyLetters.test(name)) {
      const responce = await axios.get(url);
      return responce.data;
      //   } else {
      //     return alert('El nombre debe contener solo letras');
      //   }
    } catch (error) {
      return rejectWithValue(error.response ? error.response.data : error.message);
    }
  }
);
