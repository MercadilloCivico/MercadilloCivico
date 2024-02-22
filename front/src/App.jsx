import './App.css';
import { Routes, Route, useMatch } from 'react-router-dom';
import Footer from './components/Footer/Footer.jsx';
import Home from './views/Home/Home.jsx';
import Store from './views/Store/Store.jsx';
import Contact from './views/Contact/Contact.jsx';
import Nav from './components/Nav/Nav.jsx';
import Favorites from './views/Favorites/Favorites.jsx';
//import { Button } from '@mui/material';
//import Card from './components/Card/Card.jsx';
import { ThemeProvider, createTheme } from '@mui/material';
import Detail from './views/Detail/Detail.jsx';

const theme = createTheme({
  components: {
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
            borderColor: '#568a3f',
          },
        },
      },
    },
  },
});
function App() {
  const isDetailPage = useMatch('/Detail/:id');

  return (
    <ThemeProvider theme={theme}>
      <div className=''>
        {isDetailPage ? null : <Nav />}

        {/**
       * 
       <p className='text-3xl '>Mercadillo Cívico</p>
       <Button variant='contained' className=''>
         Comprar
       </Button>
       <Card
        product={{
          name: 'Pack agua mineral 900 ml. 9 unidades',
          price: '11.999',
          provider: 'Manzanas Proovedor',
          stock: 'Último disponible!',
          variant: 'Normal',
          weight: '340g',
          calories: '250',
        }}
        />
      */}

        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/Store' element={<Store />} />
          <Route path='/Contact' element={<Contact />} />
          <Route path='/Favorites' element={<Favorites />} />
          <Route path='/Detail/:id' element={<Detail />} />
        </Routes>

        {isDetailPage ? null : <Footer />}
      </div>
    </ThemeProvider>
  );
}

export default App;
