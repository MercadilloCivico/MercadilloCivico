import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
const VITE_API_URL = import.meta.env.VITE_API_URL;

export const fetchProvidersAsync = createAsyncThunk(
  'providers/fetchProvidersAsync',
  async (param, { rejectWithValue }) => {
    try {
      const regexNumeros = /^\d+$/;
      const regexLetras = /^[a-zA-Z]+$/;
      if (param && regexNumeros.test(param)) {
        const url = `${VITE_API_URL}/proveedor/${param}`;
        const response = await axios.get(url, {
          withCredentials: true,
        });
        return response.data;
      } else if (param && regexLetras.test(param)) {
        const url = `${VITE_API_URL}/proveedor/?name=${param}`;
        const response = await axios.get(url, {
          withCredentials: true,
        });
        return response.data;
      }
      const url = `${VITE_API_URL}/proveedor`;
      const response = await axios.get(url, {
        withCredentials: true,
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// export const fetchProvidersByNameAsync = createAsyncThunk(
//   'providers/fetchProvidersByNameAsync',
//   async (param, { rejectWithValue }) => {
//     try {
//       const url = `${VITE_API_URL}/proveedor/?name=${param}`;
//       const response = await axios.get(url, {
//         withCredentials: true,
//       });
//       return response.data;
//     } catch (error) {
//       return rejectWithValue(error.response.data);
//     }
//   }
// );

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

export const putProvider = createAsyncThunk(
  'providers/putProvider',
  async (dataForm, { rejectWithValue }) => {
    try {
      let ubicacionString;
      if (dataForm.ubicacion) {
        ubicacionString = dataForm.ubicacion.join('-');
      }
      console.log('🚀 ~ dataForm:', ubicacionString);
      const formData = new FormData();
      formData.append('nameProv', dataForm.nameProv);
      formData.append('ubicacion', ubicacionString);
      formData.append('tel', dataForm.tel);
      formData.append('camaraDeComercio', dataForm.camaraDeComercio);
      formData.append('certificadoBancario', dataForm.certificadoBancario);
      console.log(formData.get('nameProv'));

      const { data } = await axios.put(`${VITE_API_URL}/proveedor`, formData, {
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
