import './App.css';
import { Button } from '@mui/material';
import Footer from './components/Footer/Footer.jsx';
import Card from './components/Card/Card.jsx';

function App() {
  return (
    <div className=''>
      <p className='text-3xl '>Mercadillo Cívico</p>
      <Button variant='contained' className=''>
        Comprar
      </Button>
      <Footer />
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
    </div>
  );
}

export default App;
