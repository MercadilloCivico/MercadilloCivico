import './App.css';
import { Routes, Route, useMatch, Navigate } from 'react-router-dom';
import { useState } from 'react';
import Landing from './views/Landing/Landing.jsx';
import Store from './views/Store/Store.jsx';
import Contact from './views/Contact/Contact.jsx';
import Nav from './components/Nav/Nav.jsx';
import Favorites from './views/Favorites/Favorites.jsx';

import Register from './views/Register/Register.jsx';
import RecoveryPassword from './views/RecoveryPassword/RecoveryPassword.jsx';
import NewPassword from './views/NewPassword/NewPassword.jsx';

import Profile from './views/Profile/Profile.jsx';
import Login from './views/Login/login.jsx';

import ProfileHistoryContainer from './components/ProfileHistoryContainer/ProfileHistoryContainer.jsx';
import ProfileFavoritesContainer from './components/ProfileFavoritesContainer/ProfileFavoritesContainer.jsx';

import { ThemeProvider } from '@mui/material';
import Detail from './views/Detail/Detail.jsx';
import Cart from './views/Cart/Cart.jsx';
import AdminDashboard from './views/AdminDashboard/AdminDashboard.jsx';
import AdminProducts from './views/AdminProducts/AdminProducts.jsx';
import AdminUsers from './views/AdminUsers/AdminUsers.jsx';
import CreateProduct from './views/CreateProduct/CreateProduct.jsx';
import Faqs from './views/Faqs/Faqs.jsx';
import CategoryFaqs from './views/CategoryFaqs/CategoryFaqs.jsx';
import DetailFaq from './views/DetailFaq/DetailFaq.jsx';

import SupplierDashboard from './views/SupplierDashboard/SupplierDashboard.jsx';
import SupplierSettings from './components/SupplierComponents/SupplierSettings/SupplierSettings.jsx';
import SupplierPoints from './components/SupplierComponents/SupplierPoints/SupplierPoints.jsx';

import Toasts from './components/Toast/Toasts.jsx';
import { theme } from './utils/muiTheme.js';
import AdminNav from './components/AdminNav/AdminNav.jsx';
import { useDispatch, useSelector } from 'react-redux';
import { createToast } from './store/slices/toastSlice.js';

function ProtectedRoute({ Component }) {
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth);
  if (token !== null) return <Component />;
  dispatch(createToast('Debes iniciar sesión para acceder a esta página'));
  return <Navigate to='/login' />;
}

function CheckAlreadyLoggedIn({ Component }) {
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth);
  if (!token) return <Component />;
  dispatch(createToast('Ya has iniciado sesión'));
  return <Navigate to='/store' />;
}

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
  const [filtrosActivos, setFiltrosActivos] = useState({});

  const isDetailPage = useMatch('/Detail/:id');
  const isCartPage = useMatch('/Cart');
  const isAdminPage = useMatch('/admin/*');

  return (
    <ThemeProvider theme={theme}>
      <div className='min-h-[calc(100vh-55px)]'>
        <Toasts />
        {!isDetailPage && !isCartPage && !isAdminPage && (
          <Nav filtrosActivos={filtrosActivos} setFiltrosActivos={setFiltrosActivos} />
        )}
        {isAdminPage && <AdminNav />}

        <Routes>
          <Route path='/' element={<Landing />} />

          <Route
            path='/store'
            element={
              <Store filtrosActivos={filtrosActivos} setFiltrosActivos={setFiltrosActivos} />
            }
          />
          <Route path='/contact' element={<Contact />} />
          <Route path='/favorites' element={<ProtectedRoute Component={Favorites} />} />
          <Route path='/detail/:id' element={<Detail />} />

          <Route path='/register' element={<Register />} />
          <Route path='/recover_password' element={<RecoveryPassword />} />
          <Route path='/new_password' element={<NewPassword />} />

          <Route path='/cart' element={<Cart />} />
          <Route path='/login/:id?' element={<CheckAlreadyLoggedIn Component={Login} />} />

          <Route path='/profile' element={<ProtectedRoute Component={Profile} />}>
            <Route path='/profile/history' element={<ProfileHistoryContainer />}></Route>
            <Route path='/profile/favorites' element={<ProfileFavoritesContainer />}></Route>
          </Route>

          <Route path='/faqs' element={<Faqs />} />
          <Route path='/faqs/:category/page?/:page?' element={<CategoryFaqs />} />
          <Route path='/faqs/detail/:id' element={<DetailFaq />} />

          <Route path='/admin' element={<AdminDashboard />} />
          <Route
            path='/admin/products'
            element={<AdminProducts products={products} setProducts={setProducts} />}
          />
          <Route
            path='/admin/products/create'
            element={<CreateProduct products={products} setProducts={setProducts} />}
          />
          <Route path='/admin/users' element={<AdminUsers />} />

          <Route path='/supplier' element={<SupplierDashboard />}>
            <Route path='/supplier/settings' element={<SupplierSettings />} />
            <Route path='/supplier/points' element={<SupplierPoints />} />
          </Route>
        </Routes>
      </div>
    </ThemeProvider>
  );
}

export default App;
