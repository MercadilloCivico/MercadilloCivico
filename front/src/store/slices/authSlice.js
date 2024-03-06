import { createSlice } from '@reduxjs/toolkit';
import {
  login,
  logout,
  register,
  resetPassword,
  createNewPassword,
  putUser,
} from '../thunks/authThunks';

const VITE_API_URL = import.meta.env.VITE_API_URL;

export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    token: null,
    status: 'idle', // 'idle', 'loading', 'succeeded', 'failed'
    error: null,
  },
  reducers: {
    setToken(state, action) {
      state.token = action.payload;
    },
    clearAuthState(state) {
      state.token = null;
      state.status = 'idle';
      state.error = null;
    },
    googleAuth(state) {
      window.location.href = `${VITE_API_URL}/auth/google`;
      state.status = 'loading';
    },
    googleErrorChecker(state) {
      state.status = 'error';
      state.error = 'Error al autenticar con Google';
    },
    getGoogleCookie(state) {
      const cookie = document.cookie.split(';').find((cookie) => {
        return cookie.includes('sessionToken');
      });
      if (cookie) {
        const token = cookie.split('=')[1];
        state.token = token;
        state.status = 'succeeded';
        state.error = null;
      }
    },
    setStatus(state, action) {
      state.status = action.payload;
    },
    setError(state, action) {
      state.error = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // Login
      .addCase(login.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(login.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.token = action.payload.token;
        state.error = null;
      })
      .addCase(login.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      // Logout
      .addCase(logout.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(logout.fulfilled, (state) => {
        state.token = null;
        state.status = 'idle';
        state.error = null;
      })
      .addCase(logout.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload ? action.payload : 'Error desconocido en el logout';
      })
      // Register
      .addCase(register.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(register.fulfilled, (state) => {
        state.status = 'succeeded';
      })
      .addCase(register.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload.error;
      })
      // Reset de la Contraseña
      .addCase(resetPassword.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(resetPassword.fulfilled, (state) => {
        state.status = 'succeeded';
      })
      .addCase(resetPassword.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      // Crear Nueva Contraseña
      .addCase(createNewPassword.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(createNewPassword.fulfilled, (state) => {
        state.status = 'succeeded';
      })
      .addCase(createNewPassword.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      // putUser
      .addCase(putUser.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(putUser.fulfilled, (state) => {
        state.status = 'succeeded';
      })
      .addCase(putUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload.error;
      });
  },
});

export const {
  setUser,
  setToken,
  clearAuthState,
  setStatus,
  setError,
  googleAuth,
  getGoogleCookie,
  googleErrorChecker,
} = authSlice.actions;

export default authSlice.reducer;
