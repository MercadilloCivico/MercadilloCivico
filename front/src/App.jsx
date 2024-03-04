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
import AdminProductDetail from './views/AdminProductDetail/AdminProductDetail.jsx';

import SupplierDashboard from './views/SupplierDashboard/SupplierDashboard.jsx';
import SupplierSettings from './components/SupplierComponents/SupplierSettings/SupplierSettings.jsx';
import SupplierPoints from './components/SupplierComponents/SupplierPoints/SupplierPoints.jsx';

import Toasts from './components/Toast/Toasts.jsx';
import { theme } from './utils/muiTheme.js';
import AdminNav from './components/AdminNav/AdminNav.jsx';
import UserDetail from './views/UserDetail/UserDetail.jsx';
import EditProduct from './views/EditProduct/EditProduct.jsx';
import { useDispatch, useSelector } from 'react-redux';
import { createToast } from './store/slices/toastSlice.js';
import PoliticaCookies from './views/PoliticaCookies/PoliticaCookies.jsx';
import AvisoLegal from './views/AvisoLegal/AvisoLegal.jsx';
import PoliticaPrivacidad from './views/PoliticaPrivacidad/PoliticaPrivacidad.jsx';
import PasarelaDePago from './views/PasarelaDePago/PasarelaDePago.jsx';
import { useEffect } from 'react';

import { getAllFavorite } from './store/thunks/favoritesThuks.js';

function ProtectedRoute({ Component }) {
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth);
  if (token !== null) return <Component />;
  dispatch(createToast('Debes iniciar sesión para acceder a esta página'));
  return <Navigate to='/login' />;
}

function CheckAlreadyLoggedIn({ Component }) {
  // const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth);
  if (!token) return <Component />;
  // dispatch(createToast('Ya has iniciado sesión'));
  return <Navigate to='/store' />;
}

function App() {
  const dispatch = useDispatch();
  //Estado temporal
  const [products, setProducts] = useState([]);

  const isDetailPage = useMatch('/detail/:id');
  const isCartPage = useMatch('/cart');
  const isAdminPage = useMatch('/admin/*');
  const isUserDetailPage = useMatch('/admin/users/detail/:id');
  const isProductDetailPage = useMatch('/admin/products/detail/:id');

  useEffect(() => {
    dispatch(getAllFavorite());
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <div className='min-h-[calc(100vh-55px)]'>
        <Toasts />
        {!isDetailPage && !isCartPage && !isAdminPage && <Nav />}
        {isAdminPage && !isUserDetailPage && !isProductDetailPage && <AdminNav />}

        <Routes>
          <Route path='/' element={<Landing />} />

          <Route path='/store' element={<Store />} />

          <Route path='/contact' element={<Contact />} />
          <Route path='/favorites' element={<ProtectedRoute Component={Favorites} />} />
          <Route path='/detail/:id' element={<Detail />} />

          <Route path='/register' element={<Register />} />
          <Route path='/recover_password' element={<RecoveryPassword />} />
          <Route path='/new_password' element={<NewPassword />} />

          <Route path='/cart' element={<Cart />} />
          <Route path='/login/:id?' element={<CheckAlreadyLoggedIn Component={Login} />} />
          <Route path='/pasarela_de_pago' element={<PasarelaDePago />} />

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
          <Route
            path='/admin/products/edit/:id'
            element={<EditProduct products={products} setProducts={setProducts} />}
          />
          <Route path='/admin/products/detail/:id' element={<AdminProductDetail />} />
          <Route path='/admin/users' element={<AdminUsers />} />
          <Route path='/admin/users/detail/:id' element={<UserDetail />} />

          <Route path='/supplier' element={<SupplierDashboard />}>
            <Route path='/supplier/settings' element={<SupplierSettings />} />
            <Route path='/supplier/points' element={<SupplierPoints />} />
          </Route>

          <Route path='/politica_de_cookies' element={<PoliticaCookies />} />
          <Route path='/aviso_legal' element={<AvisoLegal />} />
          <Route path='/politica_de_privacidad' element={<PoliticaPrivacidad />} />
        </Routes>
      </div>
    </ThemeProvider>
  );
}

export default App;
