import './App.css';
import { ThemeProvider } from '@mui/material';
import { theme } from './utils/muiTheme.js';

const VITE_API_URL = import.meta.env.VITE_API_URL;
import { Routes, Route, useMatch, Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { createToast } from './store/slices/toastSlice.js';
import { getAllFavorite } from './store/thunks/favoritesThuks.js';
import { logout } from './store/thunks/authThunks.js';

import ProfileHistoryContainer from './components/ProfileHistoryContainer/ProfileHistoryContainer.jsx';
import ProfileFavoritesContainer from './components/ProfileFavoritesContainer/ProfileFavoritesContainer.jsx';
import SupplierSettings from './components/SupplierComponents/SupplierSettings/SupplierSettings.jsx';
import SupplierPoints from './components/SupplierComponents/SupplierPoints/SupplierPoints.jsx';
import Toasts from './components/Toast/Toasts.jsx';
import AdminNav from './components/AdminNav/AdminNav.jsx';
import Nav from './components/Nav/Nav.jsx';

import Landing from './views/Landing/Landing.jsx';
import Store from './views/Store/Store.jsx';
import Contact from './views/Contact/Contact.jsx';
import Favorites from './views/Favorites/Favorites.jsx';
import Register from './views/Register/Register.jsx';
import RecoveryPassword from './views/RecoveryPassword/RecoveryPassword.jsx';
import NewPassword from './views/NewPassword/NewPassword.jsx';
import PageNotFound from './views/PageNotFound/PageNotFound.jsx';
import AdminPoints from './views/AdminPoints/AdminPoints.jsx';
import Profile from './views/Profile/Profile.jsx';
import Login from './views/Login/login.jsx';
import AdminProductDetail from './views/AdminProductDetail/AdminProductDetail.jsx';
import SupplierDashboard from './views/SupplierDashboard/SupplierDashboard.jsx';
import UserDetail from './views/UserDetail/UserDetail.jsx';
import EditProduct from './views/EditProduct/EditProduct.jsx';
import PoliticaCookies from './views/PoliticaCookies/PoliticaCookies.jsx';
import AvisoLegal from './views/AvisoLegal/AvisoLegal.jsx';
import Detail from './views/Detail/Detail.jsx';
import Cart from './views/Cart/Cart.jsx';
import AdminDashboard from './views/AdminDashboard/AdminDashboard.jsx';
import AdminProducts from './views/AdminProducts/AdminProducts.jsx';
import AdminUsers from './views/AdminUsers/AdminUsers.jsx';
import CreateProduct from './views/CreateProduct/CreateProduct.jsx';
import Faqs from './views/Faqs/Faqs.jsx';
import CategoryFaqs from './views/CategoryFaqs/CategoryFaqs.jsx';
import DetailFaq from './views/DetailFaq/DetailFaq.jsx';
import PoliticaPrivacidad from './views/PoliticaPrivacidad/PoliticaPrivacidad.jsx';
import PasarelaDePago from './views/PasarelaDePago/PasarelaDePago.jsx';
import Providers from './views/Providers/Providers.jsx';
import PaymentSuccess from './views/PasarelaDePago/PaymentSuccess.jsx';
import PaymentError from './views/PasarelaDePago/PaymentError.jsx';
import PointDetail from './views/PointDetail/PointDetail.jsx';
import ProviderDetail from './views/ProviderDetail/ProviderDetail.jsx';
import AdminFaqs from './views/AdminFaqs/AdminFaqs.jsx';
import AdminDetailCategory from './views/AdminDetailCategory/AdminDetailCategory.jsx';

function ProtectedRoute({ Component }) {
  const { token } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  useEffect(() => {
    if (!token) {
      dispatch(createToast('Debes iniciar sesión para acceder a esta página'));
    }
  }, [dispatch, token]);

  if (!token) {
    return <Navigate to='/login' />;
  }

  return <Component />;
}

function AdminProtectedRoute({ Component }) {
  const { token, rol } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  useEffect(() => {
    if (!(token !== null && rol === 'admin')) {
      dispatch(createToast('Este contenido es solo para administradores.'));
    }
  }, [dispatch, token, rol]);

  if (!(token !== null && rol === 'admin')) {
    return <Navigate to='/store' />;
  }

  return <Component />;
}

function SupplierProtectedRoute({ Component }) {
  const { token, rol } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  useEffect(() => {
    if (!(token !== null && rol === 'proveedor')) {
      dispatch(createToast('Este contenido es solo para proveedores.'));
    }
  }, [dispatch, token, rol]);

  if (!(token !== null && rol === 'proveedor')) {
    return <Navigate to='/store' />;
  }

  return <Component />;
}

function CheckAlreadyLoggedIn({ Component }) {
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth);

  useEffect(() => {
    if (token) {
      dispatch(createToast('Tu sesión ya está activa.'));
    }
  }, [dispatch, token]);

  if (token) {
    return <Navigate to='/store' />;
  }

  return <Component />;
}

function App() {
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth);
  const [open, setOpen] = useState(true);

  useEffect(() => {
    const checkAuthentication = async () => {
      if (open) {
        try {
          await axios(`${VITE_API_URL}/auth/token`, {
            withCredentials: true,
          });
        } catch (error) {
          if (error.response.data.redirectToLogin) {
            setOpen(false);

            await dispatch(logout());
          }
        }
      }
    };
    const timerId = setInterval(checkAuthentication, 1000 * 60 * 5);
    return () => clearInterval(timerId);
  }, [dispatch, open]);

  //Estado temporal
  const [products, setProducts] = useState([]);

  const isDetailPage = useMatch('/detail/:id');
  const isCartPage = useMatch('/cart');
  const isAdminPage = useMatch('/admin/*');
  const isUserDetailPage = useMatch('/admin/users/detail/:id');
  const isProductDetailPage = useMatch('/admin/products/detail/:id');

  useEffect(() => {
    (async () => {
      if (token) await dispatch(getAllFavorite());
    })();
  }, [dispatch, token]);

  return (
    <ThemeProvider theme={theme}>
      <div className='min-h-[calc(100vh-55px)]'>
        <Toasts />
        {!isDetailPage && !isCartPage && !isAdminPage && <Nav />}
        {isAdminPage && !isUserDetailPage && !isProductDetailPage && <AdminNav />}

        <Routes>
          <Route path='*' element={<PageNotFound />} />

          <Route path='/:token?' element={<Landing />} />

          <Route path='/store' element={<Store />} />
          <Route path='/store/:puntoId' element={<Store />} />

          <Route path='/contact' element={<Contact />} />
          <Route path='/favorites' element={<ProtectedRoute Component={Favorites} />} />
          <Route path='/detail/:id' element={<Detail />} />

          <Route path='/register' element={<CheckAlreadyLoggedIn Component={Register} />} />
          <Route path='/login/:id?' element={<CheckAlreadyLoggedIn Component={Login} />} />

          <Route
            path='/recover_password'
            element={<CheckAlreadyLoggedIn Component={RecoveryPassword} />}
          />
          <Route path='/new_password' element={<CheckAlreadyLoggedIn Component={NewPassword} />} />

          <Route path='/cart' element={<Cart />} />
          <Route path='/pasarela_de_pago' element={<PasarelaDePago />} />
          <Route path='/payment_success' element={<PaymentSuccess />} />
          <Route path='/payment_error' element={<PaymentError />} />

          <Route path='/profile' element={<ProtectedRoute Component={Profile} />}>
            <Route
              path='/profile/history'
              element={<ProtectedRoute Component={ProfileHistoryContainer} />}></Route>
            <Route
              path='/profile/favorites'
              element={<ProtectedRoute Component={ProfileFavoritesContainer} />}></Route>
          </Route>

          <Route path='/faqs' element={<Faqs />} />
          <Route path='/faqs/detail/:id' element={<DetailFaq />} />
          <Route path='/faqs/detail' element={<Navigate replace to='/faqs' />} />
          <Route path='/faqs/:category/page?/:page?' element={<CategoryFaqs />} />

          <Route path='/admin' element={<AdminProtectedRoute Component={AdminDashboard} />} />
          <Route
            path='/admin/products'
            element={
              <AdminProtectedRoute
                Component={AdminProducts}
                products={products}
                setProducts={setProducts}
              />
            }
          />
          <Route
            path='/admin/products/create'
            element={
              <AdminProtectedRoute
                Component={CreateProduct}
                products={products}
                setProducts={setProducts}
              />
            }
          />
          <Route
            path='/admin/products/edit/:id'
            element={
              <AdminProtectedRoute
                Component={EditProduct}
                products={products}
                setProducts={setProducts}
              />
            }
          />
          <Route
            path='/admin/products/detail/:id'
            element={<AdminProtectedRoute Component={AdminProductDetail} />}
          />
          <Route path='/admin/provider' element={<AdminProtectedRoute Component={Providers} />} />
          <Route path='/admin/users' element={<AdminProtectedRoute Component={AdminUsers} />} />
          <Route
            path='/admin/users/detail/:id'
            element={<AdminProtectedRoute Component={UserDetail} />}
          />
          <Route
            path='/admin/provider/:id'
            element={<AdminProtectedRoute Component={ProviderDetail} />}
          />
          <Route path='/admin/points' element={<AdminProtectedRoute Component={AdminPoints} />} />
          <Route
            path='/admin/point/detail/:id'
            element={<AdminProtectedRoute Component={PointDetail} />}
          />
          <Route path='/admin/faqs' element={<AdminFaqs />} />
          <Route path='/admin/faqs/:category/:faq?' element={<AdminDetailCategory />} />

          <Route
            path='/supplier'
            element={<SupplierProtectedRoute Component={SupplierDashboard} />}>
            <Route
              path='/supplier/settings'
              element={<SupplierProtectedRoute Component={SupplierSettings} />}
            />
            <Route
              path='/supplier/points'
              element={<SupplierProtectedRoute Component={SupplierPoints} />}
            />
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
