import './App.css';
import { Routes, Route, useMatch } from 'react-router-dom';
import Home from './views/Home/Home.jsx';
import Store from './views/Store/Store.jsx';
import Contact from './views/Contact/Contact.jsx';
import Nav from './components/Nav/Nav.jsx';
import Favorites from './views/Favorites/Favorites.jsx';
import Profile from './views/Profile/Profile.jsx';
import ProfileHistoryContainer from './components/ProfileHistoryContainer/ProfileHistoryContainer.jsx';
import ProfileFavoritesContainer from './components/ProfileFavoritesContainer/ProfileFavoritesContainer.jsx';

import { ThemeProvider, createTheme } from '@mui/material';
import Detail from './views/Detail/Detail.jsx';
import Cart from './views/Cart/Cart.jsx';

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
  const isDetailPage = useMatch('/Detail/:id');
  const isCartPage = useMatch('/Cart');

  return (
    <ThemeProvider theme={theme}>
      <div className=''>
        {!isDetailPage && !isCartPage && <Nav />}

        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/Store' element={<Store />} />
          <Route path='/Contact' element={<Contact />} />
          <Route path='/Favorites' element={<Favorites />} />
          <Route path='/Detail/:id' element={<Detail />} />
          <Route path='Cart' element={<Cart />} />
          <Route path='/Profile' element={<Profile />}>
            <Route path='/Profile/history' element={<ProfileHistoryContainer />}></Route>
            <Route path='/Profile/favorites' element={<ProfileFavoritesContainer />}></Route>
          </Route>
        </Routes>
      </div>
    </ThemeProvider>
  );
}

export default App;
