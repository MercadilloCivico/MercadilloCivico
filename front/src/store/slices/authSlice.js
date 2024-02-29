import { createSlice } from '@reduxjs/toolkit';
import {
  login,
  logout,
  register,
  resetPassword,
  googleAuth,
  createNewPassword,
} from '../thunks/authThunks';

export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    token: null,
    status: 'idle', // 'idle', 'loading', 'succeeded', 'failed'
    error: null,
  },
  reducers: {
    setUser(state, action) {
      state.user = action.payload;
    },
    setToken(state, action) {
      state.token = action.payload;
    },
    clearAuthState(state) {
      state.user = null;
      state.token = null;
      state.status = 'idle';
      state.error = null;
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
        state.user = action.payload.user;
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
        state.user = null;
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
      // Google Auth Callback
      .addCase(googleAuth.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(googleAuth.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.user = action.payload.user;
        state.token = action.payload.token;
      })
      .addCase(googleAuth.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

export const { setUser, setToken, clearAuthState, setStatus, setError } = authSlice.actions;

export default authSlice.reducer;
