import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import CustomStore from './store/StoreProvider.jsx';
import { StyledEngineProvider } from '@mui/styled-engine';
import { BrowserRouter } from 'react-router-dom';

ReactDOM.createRoot(document.getElementById('root')).render(
  <CustomStore>
    <React.StrictMode>
      <BrowserRouter>
        <StyledEngineProvider injectFirst>
          <App />
        </StyledEngineProvider>
      </BrowserRouter>
    </React.StrictMode>
  </CustomStore>
);
