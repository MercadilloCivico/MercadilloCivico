import AdminCardList from '../Card/AdminCardList';
import AdminGridCard from '../Card/AdminGridCard';
import CardsBar from '../CardsBar/CardsBar';
import { useSelector } from 'react-redux';

function AdminCards() {
  const { showListCard } = useSelector((state) => state.admin);

  const products = [
    {
      id: 1,
      name: 'Plátano con nombre extremadamente largo que supera el límite de caracteres establecido',
      image: 'https://www.pngkey.com/png/full/932-9328480_apples-png-image-red-apple-fruit.png',
      calification: 4,
      sales: 100,
      proveedor: [],
      marca: 'frutal',
      reseñas: [],
      inventario: 45,
      costo: 100,
      disabled: false,
    },
  ];

  return (
    <div className='py-3 flex justify-center flex-wrap space-between xsm:px-0 sm:px-10 max-w-[1366px] mx-auto'>
      {!showListCard ? (
        <div className='max-h-[55vh] overflow-y-auto'>
          <CardsBar />
          <div className='flex flex-col'>
            {products.map((product) => (
              <AdminCardList key={product.id} {...product} />
            ))}
          </div>
        </div>
      ) : (
        <div className='max-h-[55vh] overflow-y-auto'>
          <div className='flex flex-wrap justify-center items-center'>
            {products.map((product) => (
              <AdminGridCard key={product.id} {...product} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default AdminCards;
