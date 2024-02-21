import './App.css';
import { Routes, Route } from 'react-router-dom';
import Footer from './components/Footer/Footer.jsx';
import Home from './views/Home/Home.jsx';
import Store from './views/Store/Store.jsx';
import Contact from './views/Contact/Contact.jsx';
import Nav from './components/Nav/Nav.jsx';
//import { Button } from '@mui/material';
//import Card from './components/Card/Card.jsx';

function App() {
  return (
    <div className=''>
      <Nav/>
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
      </Routes>

      <Footer />
    </div>
  );
}

export default App;
