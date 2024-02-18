import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import CustomStore from './store/StoreProvider.jsx';
import { StyledEngineProvider } from '@mui/styled-engine';

ReactDOM.createRoot(document.getElementById('root')).render(
  <CustomStore>
    <React.StrictMode>
      <StyledEngineProvider injectFirst>
        <App />
      </StyledEngineProvider>
    </React.StrictMode>
  </CustomStore>
);
