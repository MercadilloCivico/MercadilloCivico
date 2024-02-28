import './App.css';
import { Routes, Route, useMatch } from 'react-router-dom';
import { useState } from 'react';
import Home from './views/Home/Home.jsx';
import Store from './views/Store/Store.jsx';
import Contact from './views/Contact/Contact.jsx';
import Nav from './components/Nav/Nav.jsx';
import Favorites from './views/Favorites/Favorites.jsx';

import Register from './views/Register/Register.jsx';
import RecoveryPassword from './views/RecoveryPassword/RecoveryPassword.jsx';
import NewPassword from './views/NewPassword/NewPassword.jsx';

import Profile from './views/Profile/Profile.jsx';
import Login from './views/Login/Login.jsx';

import ProfileHistoryContainer from './components/ProfileHistoryContainer/ProfileHistoryContainer.jsx';
import ProfileFavoritesContainer from './components/ProfileFavoritesContainer/ProfileFavoritesContainer.jsx';

import { ThemeProvider, createTheme } from '@mui/material';
import Detail from './views/Detail/Detail.jsx';
import Cart from './views/Cart/Cart.jsx';
import AdminDashboard from './views/AdminDashboard/AdminDashboard.jsx';
import AdminProducts from './views/AdminProducts/AdminProducts.jsx';
import CreateProduct from './views/CreateProduct/CreateProduct.jsx';

import Toasts from './components/Toast/Toasts.jsx';

export const theme = createTheme({
  components: {
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
            borderColor: '#c55d38',
          },
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          '&.Mui-focused': {
            color: '#c55d38',
          },
        },
      },
    },
  },
});
function App() {
  //Estado temporal
  const [products, setProducts] = useState([
    {
      id: 1,
      name: 'Manzana',
      brand: 'Frutal',
      image: 'https://www.pngkey.com/png/full/932-9328480_apples-png-image-red-apple-fruit.png',
      precio: 200,
      calification: 4.5,
      stock: 15,
      cantidad: 1,
    },
    {
      id: 2,
      name: 'Pera',
      brand: 'Frutal',
      image: 'https://www.pngkey.com/png/full/932-9328480_apples-png-image-red-apple-fruit.png',
      precio: 150,
      calification: 3.5,
      stock: 15,
      cantidad: 1,
    },
    {
      id: 3,
      name: 'Cereal',
      brand: 'Maiz',
      image: 'https://www.pngkey.com/png/full/932-9328480_apples-png-image-red-apple-fruit.png',
      precio: 500,
      calification: 2.5,
      stock: 15,
      cantidad: 1,
    },
    {
      id: 4,
      name: 'Chocolate',
      brand: 'Chatarra',
      image: 'https://www.pngkey.com/png/full/932-9328480_apples-png-image-red-apple-fruit.png',
      precio: 1000,
      calification: 1.3,
      stock: 15,
      cantidad: 1,
    },
    {
      id: 5,
      name: 'Manzana',
      brand: 'Frutal',
      image: 'https://www.pngkey.com/png/full/932-9328480_apples-png-image-red-apple-fruit.png',
      precio: 200,
      calification: 4.5,
      stock: 15,
      cantidad: 1,
    },
    {
      id: 6,
      name: 'Pera',
      brand: 'Frutal',
      image: 'https://www.pngkey.com/png/full/932-9328480_apples-png-image-red-apple-fruit.png',
      precio: 150,
      calification: 3.5,
      stock: 15,
      cantidad: 1,
    },
    {
      id: 7,
      name: 'Cereal',
      brand: 'Maiz',
      image: 'https://www.pngkey.com/png/full/932-9328480_apples-png-image-red-apple-fruit.png',
      precio: 500,
      calification: 2.5,
      stock: 15,
      cantidad: 1,
    },
    {
      id: 8,
      name: 'Chocolate',
      brand: 'Chatarra',
      image: 'https://www.pngkey.com/png/full/932-9328480_apples-png-image-red-apple-fruit.png',
      precio: 1000,
      calification: 1.3,
      stock: 15,
      cantidad: 1,
    },
  ]);

  const isDetailPage = useMatch('/Detail/:id');
  const isCartPage = useMatch('/Cart');

  return (
    <ThemeProvider theme={theme}>
      <div className='min-h-[calc(100vh-55px)]'>
        <Toasts />

        {!isDetailPage && !isCartPage && <Nav />}

        <Routes>
          <Route path='/' element={<Home />} />

          <Route path='/store' element={<Store />} />
          <Route path='/contact' element={<Contact />} />
          <Route path='/favorites' element={<Favorites />} />
          <Route path='/detail/:id' element={<Detail />} />

          <Route path='/register' element={<Register />} />
          <Route path='/recover_password' element={<RecoveryPassword />} />
          <Route path='/new_password' element={<NewPassword />} />

          <Route path='/cart' element={<Cart />} />
          <Route path='/login' element={<Login />} />

          <Route path='/profile' element={<Profile />}>
            <Route path='/profile/history' element={<ProfileHistoryContainer />}></Route>
            <Route path='/profile/favorites' element={<ProfileFavoritesContainer />}></Route>
          </Route>

          <Route path='/admin' element={<AdminDashboard />} />
          <Route
            path='/admin/products'
            element={<AdminProducts products={products} setProducts={setProducts} />}
          />
          <Route
            path='/admin/products/newproduct'
            element={<CreateProduct products={products} setProducts={setProducts} />}
          />
        </Routes>
      </div>
    </ThemeProvider>
  );
}

export default App;
